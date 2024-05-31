import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface cart {
  _id: string;
  name: string;
  mainImage: string;
  price: number;
  stock: number;
  quantity?: number;
  discount: number;
}

interface Quantity {
  _id: string;
  plus?: string;
  minus?: string;
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

      if (index === -1) {
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

    quantityUpdate: (state, action: PayloadAction<Quantity>) => {
      const Products: cart[] = [];

      state.cardItems.map((i) => {
        if (i._id === action.payload._id) {
          Products.push({
            _id: i._id,
            discount: i.discount,
            mainImage: i.mainImage,
            name: i.name,
            price: i.price,
            stock: i.stock,
            quantity:
              i.quantity === undefined
                ? 1
                : action.payload.minus
                ? Number(i.quantity) - 1
                : Number(i.quantity) + 1,
          });
        } else {
          Products.push(i);
        }

        state.cardItems = [];
        state.cardItems = Products;
      });
    }
  },
});

export default ProductCart.reducer;
export const { addProduct, removeProduct, quantityUpdate } =
  ProductCart.actions;
