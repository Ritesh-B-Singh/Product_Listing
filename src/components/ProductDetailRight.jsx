import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './reducer/CartReducer';
import { Box, Rating, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductDetailRight = ( product ) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate()

    const handleAddToCart = () => {
    dispatch(addToCart(product.product));
    navigate('/cart')
    };

    const isProductInCart = cart.items.some(item => item.id === product.product.id);
    const isButtonDisabled = isProductInCart;

    const buttonStyles = {
        backgroundColor: isButtonDisabled ? '#ccc' : '#fb6d6a',
        color: isButtonDisabled ? '#888' : '#fff',
        borderRadius: '4px'
    };

    const buttonText = isButtonDisabled ? 'Already Added' : 'Add to Cart';

    return (
        <Box style={styles.container}>
            <Typography variant="h6" component="h2" style={styles.category}>{product.product.category}</Typography>
            <Typography variant="h4" component="h1" style={styles.title}>{product.product.title}</Typography>
            <Typography variant="h5" component="h2" style={styles.brand}>{product.product.brand}</Typography>
            <Typography variant="h5" component="h2" style={styles.stock}>Stock: {product.product.stock}</Typography>
            <Typography variant="h6" component="h2" style={styles.price}>$ {product.product.price}</Typography>
            <Typography variant="h6" component="h2" style={styles.discount}>{product.product.discountPercentage}% off</Typography>
            <Rating value={product.product.rating} precision={0.1} readOnly style={styles.rating} />
            <Typography variant="body1" component="p" color="text.secondary" align="justify" style={styles.description}>
                {product.product.description}
            </Typography>
            <Button
                variant="contained"
                style={buttonStyles}
                sx={{ mt: 2 }}
                onClick={() => handleAddToCart(product)}
                disabled={isButtonDisabled}
            >
                {buttonText}
            </Button>
        </Box>
    );
};

export default ProductDetailRight;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
    },
    category: {
        color: '#888',
        marginBottom: '10px',
    },
    title: {
        marginBottom: '10px',
    },
    brand: {
        color: '#555',
        marginBottom: '10px',
    },
    stock: {
        marginBottom: '10px',
    },
    price: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    discount: {
        fontSize: '18px',
        color: '#f50057',
        marginBottom: '20px',
    },
    rating: {
        marginBottom: '20px',
    },
    description: {
        lineHeight: '1.6',
    },
    quantityBox: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    quantityButton: {
        minWidth: '36px',
        padding: 0,
    },
    quantityText: {
        margin: '0 10px',
    },
    button: {
        marginTop: '20px',
    },
};
