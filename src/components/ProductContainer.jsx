import { useEffect, useState } from 'react';
import ProductsListing from './ProductsListing';
import { Box, Grid, Typography, Checkbox, FormControlLabel, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Navbar from './Navbar';

const ProductContainer = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [showMoreCategories, setShowMoreCategories] = useState(false);
    const [showMoreBrands, setShowMoreBrands] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch('https://dummyjson.com/products?limit=100')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products);
                setSelectedCategories(['All']);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setIsLoading(false)
    }, []);

    const categories = ['All', ...new Set(products?.map((product) => product.category))];
    const brands = ['All', ...new Set(products?.map((product) => product.brand))];

    const handleCategoryChange = (category) => (event) => {
        if (event.target.checked) {
            if (category === 'All') {
                setSelectedCategories(['All']);
                setSelectedBrands(['All']);
            } else {
                setSelectedCategories((prevSelectedCategories) => {
                    if (prevSelectedCategories.includes('All')) {
                        return [category];
                    } else {
                        return [...prevSelectedCategories, category];
                    }
                });
            }
        } else {
            setSelectedCategories((prevSelectedCategories) =>
                prevSelectedCategories.filter((cat) => cat !== category)
            );
        }

        setSelectedBrands(['All']);
    };

    const handleBrandChange = (brand) => (event) => {
        if (event.target.checked) {
            if (brand === 'All') {
                setSelectedBrands(['All']);
            } else {
                setSelectedBrands((prevSelectedBrands) => {
                    if (prevSelectedBrands.includes('All')) {
                        return [brand];
                    } else {
                        return [...prevSelectedBrands, brand];
                    }
                });
            }
        } else {
            setSelectedBrands((prevSelectedBrands) =>
                prevSelectedBrands.filter((br) => br !== brand)
            );
        }
    };

    const handleSortOptionChange = (event) => {
        setSelectedSortOption(event.target.value);
    };

    const sortedProducts = [...products];

    if (selectedSortOption === 'ratingLtoH') {
        sortedProducts.sort((a, b) => a.rating - b.rating);
    } else if (selectedSortOption === 'discountHtoL') {
        sortedProducts.sort((a, b) => b.discountPercentage - a.discountPercentage);
    } else if (selectedSortOption === 'priceLtoH') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSortOption === 'ratingHtoL') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (selectedSortOption === 'discountLtoH') {
        sortedProducts.sort((a, b) => a.discountPercentage - b.discountPercentage);
    } else if (selectedSortOption === 'priceHtoL') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    const filteredProducts = selectedCategories.includes('All')
        ? sortedProducts
        : sortedProducts.filter(
            (product) =>
                selectedCategories.includes(product.category) &&
                (selectedBrands.includes('All') || selectedBrands.includes(product.brand))
        );

    const handleShowMoreCategories = () => {
        setShowMoreCategories(!showMoreCategories);
    };

    const handleShowMoreBrands = () => {
        setShowMoreBrands(!showMoreBrands);
    };

    const visibleCategories = showMoreCategories ? categories : categories.slice(0, 8);
    const visibleBrands = showMoreBrands ? brands : brands.slice(0, 8);

    return (
        <>
        <Navbar />
            {isLoading ? <Typography>Loading...</Typography> : <Box p={'3rem 7rem'}>
                <Grid container>
                    <Grid item xs={12} lg={4}>
                        <Box>
                            <Typography variant="h5">Category</Typography>
                            <Grid container spacing={1}>
                                {visibleCategories?.map((category) => (
                                    <Grid item key={category} xs={12} sm={12} md={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedCategories.includes(category)}
                                                    onChange={handleCategoryChange(category)}
                                                />
                                            }
                                            label={category}
                                        />
                                    </Grid>
                                ))}
                                {categories.length > 4 && (
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Button onClick={handleShowMoreCategories}>
                                            {showMoreCategories ? 'Show Less' : 'Show More'}
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                        <Box>
                            <Typography variant="h5">Brands</Typography>
                            <Grid container spacing={1}>
                                {visibleBrands?.map((brand) => (
                                    <Grid item key={brand} xs={12} sm={12} md={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={handleBrandChange(brand)}
                                                />
                                            }
                                            label={brand}
                                        />
                                    </Grid>
                                ))}
                                {brands.length > 4 && (
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Button onClick={handleShowMoreBrands}>
                                            {showMoreBrands ? 'Show Less' : 'Show More'}
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Box>
                            <Box maxWidth={'10rem'}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedSortOption}
                                        onChange={handleSortOptionChange}
                                        label="Sort By"
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="ratingLtoH">Rating: Low to High</MenuItem>
                                        <MenuItem value="ratingHtoL">Rating: High to Low</MenuItem>
                                        <MenuItem value="discountLtoH">Discount: Low to High</MenuItem>
                                        <MenuItem value="discountHtoL">Discount: High to Low</MenuItem>
                                        <MenuItem value="priceLtoH">Price: Low to High</MenuItem>
                                        <MenuItem value="priceHtoL">Price: High to Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                {products.length > 0 ? (
                                    <ProductsListing products={filteredProducts} />
                                ) : (
                                    <Typography>Loading...</Typography>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>}
        
        </>
    );
};

export default ProductContainer;
