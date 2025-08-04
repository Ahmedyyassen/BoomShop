import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/apiCall";
import { PRODUCTS_ITEM } from "../../utils/constants";

export const getSingleProduct = createAsyncThunk(
  "productSlice/getSingleProduct",
  async ({ id }: { id: string }) => {
    const res = await API.get(`${PRODUCTS_ITEM}/${id}`);
    return await res.data;
  }
);
