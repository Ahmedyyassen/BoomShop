import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSingleProduct } from "../apiCalls/productsApiCalls";
import { Product } from "../../model/productModel";

const productSlice = createSlice({
  initialState: {} as Product,
  name: "productSlice",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getSingleProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state = action.payload;
        return state;
      }
    );
  },
});
export default productSlice.reducer;
