import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter(item => item.id !== itemId);
        },
        increaseQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find(item => item.id === itemId);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find(item => item.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
