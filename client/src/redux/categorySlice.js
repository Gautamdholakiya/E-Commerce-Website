import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../utills/axiosClientCreate";

export const fetchCategoryData = createAsyncThunk("/api/category", async () => {
  try {
    const response = await axiosClient.get("/categories?populate=image");
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    categories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryData.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default categorySlice.reducer;
