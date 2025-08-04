import { Product } from "@/model/productModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Product[] = localStorage.getItem("cart") ? 
        JSON.parse(localStorage.getItem("cart")!) : [];

const cartSlice = createSlice({
    initialState,
    name:"cartSlice",
    reducers:{
        addCartItem(state,action: PayloadAction<Product>){
            const exist = state.find((item)=> item.id === action.payload.id);
            if (exist) {
                return alert("This item is aleary exist");
            }
            action.payload.quantity = 1;
            state.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state));
            return state;
        },
        deleteCartItem(state, action:PayloadAction<{id:number}>){
            const exist = state.find((item)=> item.id === action.payload.id);
            if (!exist) {
                alert("This product is not found, Error ^_^")
            }
            state = state.filter((item)=> item.id!== action.payload.id);
            localStorage.setItem("cart", JSON.stringify(state));
            return state;
        },
        increamentCartItem(state, action:PayloadAction<{mode:"add" | "remove", id: number}>){
            const exist = state.find((i)=> i.id === action.payload.id);
                if (exist) {
                    if (action.payload.mode === "add") {
                        if (exist?.quantity) {
                           exist.quantity++;
                        }
                    }else if(action.payload.mode === "remove"){
                        if (!exist?.quantity || exist.quantity === 1) {
                           return alert("this is the minitmum quantity of product")
                        }else{
                           exist.quantity--;
                        }
                    }
                    const index = state.findIndex((i)=> i.id === action.payload.id);
                    state[index] = exist;
                    return state;
                }

        }
    }
})
export const { addCartItem, deleteCartItem, increamentCartItem } = cartSlice.actions;
export default cartSlice.reducer;