import { configureStore } from "@reduxjs/toolkit";
import premieresReducer from "../features/premieres/premieresSlice";
import authReducer from "../features/auth/authSlice";
import candystoreReducer from "../features/candystore/candystoreSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    premieres: premieresReducer,
    auth: authReducer,
    candystore: candystoreReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
