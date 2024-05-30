import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
      state.cardItems.push(action.payload);
    },
  },
});

export default ProductCart.reducer;
export const { addProduct } = ProductCart.actions
