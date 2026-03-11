import { configureStore } from "@reduxjs/toolkit";
import premieresReducer from "../features/premieres/premieresSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    premieres: premieresReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
