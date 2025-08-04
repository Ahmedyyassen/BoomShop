import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/apiCall";
import { CATEGORY_LIST } from "../../utils/constants";

export const getCategoryList = createAsyncThunk(
  "categorySlice/getCategoryList",
  async () => {
    const res = await API.get(CATEGORY_LIST);
    return res.data as string[];
  }
);
