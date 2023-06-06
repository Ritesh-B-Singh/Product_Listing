import { useSelector } from 'react-redux';
import { Badge, Box, IconButton, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const cartItems = useSelector(state => state.cart.items);
    const cartCount = cartItems.length;
    const navigate = useNavigate()

    return (
        <Box
            className="navbar"
            style={{
                backgroundColor: '#ffede3',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
            }}
        >
            <Box style={{ textAlign: 'center', flex: 1 }}>
                <Box onClick={() => navigate('/')} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <Typography variant="h4">Products</Typography>
                    <Typography variant="subtitle1" sx={{ pb: 1 }}>100 products</Typography>
                </Box>
            </Box>
            <Box pr={2}>
                <IconButton onClick={() => navigate('/cart')}>
                    <Badge badgeContent={cartCount} color="primary">
                        <ShoppingCartIcon fontSize="large" />
                    </Badge>
                </IconButton>
            </Box>
        </Box>
    );
};

export default Navbar;
