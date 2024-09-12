// cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Tcart from "../../Type/Tcart";

interface CartState {
  items: Tcart[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Tcart>) => {
      const productcart = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (productcart === -1) {
        state.items.push({ ...action.payload, qty: 1 });
      } else {
        state.items[productcart].qty += 1;
      }
    },
    Deletecart: (
      state,
      action: PayloadAction<{ productId: string; cartId: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.product._id === action.payload.productId &&
            item._id === action.payload.cartId
          )
      );
    },
  },
});

export const { addToCart, Deletecart } = cartSlice.actions;

export default cartSlice.reducer; // Đây là cartReducer
