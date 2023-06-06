import { Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Rating } from '@mui/material';
import { useNavigate } from "react-router-dom"

const ProductsListing = (products) => {
    const navigate = useNavigate()
    const categories = [...new Set(products.products?.map((product) => product.category))];

    return (
        <Box>
            {categories.map((category) => (
                <Box key={category} sx={{ mt: 2 }}>
                    <Typography variant="h6" component="div" sx={{ mb: 2, textTransform: 'capitalize', fontWeight: 'bold' }}>
                        {category}
                    </Typography>
                    <Grid container spacing={3}>
                        {products.products
                            .filter((product) => product.category === category)
                            .map((product, index) => (
                                <Grid item key={index} xs={12} sm={6} md={3} lg={4}>
                                    <Card
                                        onClick={() => navigate(`/${product.id}`)}
                                        sx={{
                                            height: '100%',
                                            transition: 'box-shadow 0.3s',
                                            '&:hover': {
                                                boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
                                            },
                                        }}
                                        elevation={1}
                                    >
                                        <CardActionArea>
                                            <CardMedia component="img" height="140" image={product.thumbnail} alt="Product thumbnail" />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div" noWrap sx={{ fontWeight: 'bold' }}>
                                                    {product.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ height: 40, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {product.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
                                                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                                                    <Typography variant="subtitle1" fontWeight="bold" fontSize={16}>
                                                        $ {product.price}
                                                    </Typography>
                                                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'green', fontSize: 13 }}>
                                                        {Math.round(product.discountPercentage)}% off
                                                    </Typography>
                                                </Box>
                                                <Rating value={product.rating} precision={0.1} readOnly />
                                            </CardActions>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    );
};

export default ProductsListing;
