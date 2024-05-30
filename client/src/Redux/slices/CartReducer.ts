import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface cart {
  _id: string;
  name: string;
  mainImage: string;
  price: number;
  stock: number;
  discount: number;
}

type ProductType = {
  loading: boolean;
  cardItems: cart[];
  subtotal: number;
  stock: number;
  total: number;
  shippingCharges: number;
};

const initialState: ProductType = {
  loading: false,
  cardItems: [],
  shippingCharges: 0,
  subtotal: 0,
  total: 0,
  stock: 0,
};

const ProductCart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<cart>) => {
      state.loading = true;
      const index = state.cardItems.findIndex(
        (i) => i._id === action.payload._id
      );

      if (index !== -1) {
        state.cardItems.push(action.payload);
        state.loading = false;
        toast.success("Item added!");
      } else {
        toast.error("Already Exist!");
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.cardItems = state.cardItems.filter((i) => i._id !== action.payload);
    },
  },
});

export default ProductCart.reducer;
export const { addProduct, removeProduct } = ProductCart.actions;
