import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPremieresFromAPI, type Premiere } from "./premieresService";

interface PremieresState {
  loading: boolean;
  premieres: Premiere[];
  error: string | null;
}

const initialState: PremieresState = {
  loading: false,
  premieres: [],
  error: null,
};

export const fetchPremieres = createAsyncThunk(
  "premieres/fetchPremieres",
  async () => {
    return await fetchPremieresFromAPI();
  },
);

const premieresSlice = createSlice({
  name: "premieres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPremieres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPremieres.fulfilled, (state, action) => {
        state.loading = false;
        state.premieres = action.payload;
      })
      .addCase(fetchPremieres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al cargar premieres";
      });
  },
});

export default premieresSlice.reducer;
