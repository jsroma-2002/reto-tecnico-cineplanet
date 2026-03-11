import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

function loadCartFromStorage(): CartState {
  try {
    const stored = localStorage.getItem("cart");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return { items: [], total: 0 };
}

function saveCartToStorage(state: CartState) {
  localStorage.setItem("cart", JSON.stringify(state));
}

function recalcTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ id: number; name: string; price: number }>,
    ) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = recalcTotal(state.items);
      saveCartToStorage(state);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.total = recalcTotal(state.items);
      saveCartToStorage(state);
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total = recalcTotal(state.items);
        saveCartToStorage(state);
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.total = recalcTotal(state.items);
        saveCartToStorage(state);
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
      saveCartToStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
