import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import productSlice from "./productSlice";
import shopSlice from "./shopSlice";
import wishlistSlice from "./wishlistSlice";
import categorySlice from "./categorySlice";
import productsSlice from "./productsSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    filter: filterSlice,
    shop: shopSlice,
    wishlist: wishlistSlice,
    Categories: categorySlice,
    Products: productsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
