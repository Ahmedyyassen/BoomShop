import { Product } from "@/model/productModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Product[] = localStorage.getItem("fav") ? 
        JSON.parse(localStorage.getItem("fav")!) : [];


const favSlice = createSlice({
    initialState,
    name: "favSlice",
    reducers:{
        addFavItem:(state, action:PayloadAction<Product>)=>{
                state.push(action.payload);
                localStorage.setItem("fav", JSON.stringify(state));
                return state;
        },
        removeFanItem(state, action:PayloadAction<Product>){
                state = state.filter((i)=> i.id !== action.payload.id);
                localStorage.setItem("fav", JSON.stringify(state));
                return state;
        }
    }
})

export const { addFavItem, removeFanItem } = favSlice.actions;
export default favSlice.reducer