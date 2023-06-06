import { Box, Typography, Button } from '@mui/material';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from './reducer/CartReducer';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = itemId => {
        dispatch(removeFromCart(itemId));
    };

    const handleIncreaseQuantity = itemId => {
        dispatch(increaseQuantity(itemId));
    };

    const handleDecreaseQuantity = itemId => {
        dispatch(decreaseQuantity(itemId));
    };

    const calculateSubTotal = (price, quantity) => {
        return price * quantity;
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + calculateSubTotal(item.price, item.quantity), 0);
    };

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: '20px',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>Shopping Cart</Typography>
                {cartItems.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            display: 'grid',
                            gridTemplateColumns: '1fr 2fr 1fr',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Box>
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                style={{ width: '100%', maxWidth: '100px', height: 'auto' }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography variant="subtitle1">{item.brand}</Typography>
                            <Typography variant="subtitle2" sx={{ color: '#888' }}>
                                Price: ${item.price}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleDecreaseQuantity(item.id)}
                                    sx={{ color: '#888', borderRadius: '50%' }}
                                >
                                    -
                                </Button>
                                <Typography
                                    sx={{
                                        padding: '0 8px',
                                        fontWeight: 'bold',
                                        minWidth: '32px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {item.quantity}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleIncreaseQuantity(item.id)}
                                    sx={{ color: '#888', borderRadius: '50%' }}
                                >
                                    +
                                </Button>
                            </Box>
                            <Typography variant="subtitle2" sx={{ color: '#888' }}>
                                Sub-Total: ${calculateSubTotal(item.price, item.quantity)}
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="outlined"
                                onClick={() => handleRemoveFromCart(item.id)}
                                sx={{ borderColor: '#f44336', color: '#f44336' }}
                            >
                                Remove
                            </Button>
                        </Box>
                    </Box>
                ))}
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" sx={{ mt: 2 }}>Total Price: ${calculateTotalPrice()}</Typography>
                </Box>
                {/* Additional sections like checkout button, etc. */}
            </Box>
        </>
    );
};

export default Cart;
