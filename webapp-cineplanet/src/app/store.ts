import { configureStore } from "@reduxjs/toolkit";
import premieresReducer from "../features/premieres/premieresSlice";

export const store = configureStore({
  reducer: {
    premieres: premieresReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
