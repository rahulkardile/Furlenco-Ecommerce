export type AllProduct = {
  message: string;
  success: boolean;
  data: [
    {
      _id: string;
      name: string;
      mainImage: string;
      discount: number;
      price: number;
      stock: number;
    }
  ];
};

export type ProductFetch = {
  quantity?: number;
  _id: string;
  name: string;
  mainImage: string;
  discount: number;
  price: number;
  stock: number;
};
