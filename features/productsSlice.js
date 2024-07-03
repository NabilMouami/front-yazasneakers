import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productList: [],
};

const productsSlice = createSlice({
  initialState,
  name: "productList",
  reducers: {
    loadAllProducts: (state, action) => {
      console.log(action.payload);
      state.productList = action.payload;
    },
  },
});

export const { loadAllProducts } = productsSlice.actions;

export const productList = (state) => state.Products.productList;

export default productsSlice.reducer;
