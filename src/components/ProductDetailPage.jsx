import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailLeft from "./ProductDetailLeft";
import ProductDetailRight from "./ProductDetailRight";
import Navbar from "./Navbar";

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();

    const handleAddToCart = (product) => console.log(product)

    useEffect(() => {
        fetch(`https://dummyjson.com/product/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <>
            <Navbar />
            <Box p={'3rem 7rem'}>
                {product ? (
                    <Box sx={{ height: '70vh', display: 'flex' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6}>
                                <ProductDetailLeft product={product} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ProductDetailRight product={product} handleAddToCart={handleAddToCart} />
                            </Grid>
                        </Grid>
                    </Box>
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </Box>
        </>
    );
};

export default ProductDetailPage;
