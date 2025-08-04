import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCategoryList } from "../apiCalls/categoryApiCalls";


const initialState = {
    data: [] as string[],
    isLoading: true 
};

const categorySlice = createSlice({
    initialState,
    name:"categorySlice",
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(getCategoryList.fulfilled, (state, action:PayloadAction<string[]>)=>{
                state.data = action.payload;
                state.isLoading = false;
                return state;
        })
    },
})

// export const {} = categorySlice.actions;
export default categorySlice.reducer;