import { InfoInterface } from "./FromData";

interface productOrderId {
    _id: string;
    name: string;
    price: number;
    mainImage: string;
  }

  interface productOrder {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    sellingPrice: number;
    discount: number;
  }

  export type order = {
    _id: string;
    UserId: string;
    address: InfoInterface;
    productId: productOrderId[];
    products: productOrder[];
    amount: number;
    discount: number;
  };

  export type orderProduct = {
    _id: string;
    name: string;
    img: string;
    quantity: number;
    price: number;
  };

