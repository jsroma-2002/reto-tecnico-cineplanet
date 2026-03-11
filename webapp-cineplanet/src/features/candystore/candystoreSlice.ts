import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCandystoreProductsFromAPI,
  type CandystoreProduct,
} from "./candystoreService";

interface CandystoreState {
  loading: boolean;
  products: CandystoreProduct[];
  error: string | null;
}

const initialState: CandystoreState = {
  loading: false,
  products: [],
  error: null,
};

export const fetchCandystoreProducts = createAsyncThunk(
  "candystore/fetchProducts",
  async () => {
    return await fetchCandystoreProductsFromAPI();
  },
);

const candystoreSlice = createSlice({
  name: "candystore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandystoreProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandystoreProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchCandystoreProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al cargar productos";
      });
  },
});

export default candystoreSlice.reducer;
