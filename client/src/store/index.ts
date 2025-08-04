import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from './slices/categorySlice';
import ProductSlice from"./slices/productSlice";
import cartSlice from './slices/cartSlice'
import favSlice from "./slices/favSlice";

export const store = configureStore({
    reducer:{
        cat: CategorySlice,
        product: ProductSlice,
        cart: cartSlice,
        fav: favSlice
    }
})

export type RootApp = ReturnType<typeof store.getState> ;
export type dispatchApp = typeof store.dispatch;