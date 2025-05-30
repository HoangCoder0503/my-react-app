import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};
const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const items = state.items;
            let isProductExists = false; // bien san pham nay co ton tai hay chua.
            items.map((item) => {
                if (item._id === action.payload._id) {
                    item.qty += Number(action.payload.qty);
                    isProductExists = true;
                }
                return item;
            });
            // Ktra neu la true thi cap nhat item, con la false thi push them payload vao de co item moi.
            const newItems = isProductExists ? items : [...items, action.payload];
            state.items = newItems;
        },
        updateCart: (state, action) => {
            state.items = updateItemCart(state, action.payload);
        },
        deleteItemCart: (state, action) => {
            const items = state.items;
            const newItems = items.filter((item) => item._id !== action.payload._id);
            state.items = newItems;
        },
    },
});

const updateItemCart = (state, payload) => {
    const items = state.items;
    items.map((item) => {
        if (item._id === payload._id) {
            item.qty = Number(payload.qty);
        }
        return item;
    });
    return items;
};
export const { addToCart, updateCart, deleteItemCart } = cartReducer.actions;
export default cartReducer.reducer;