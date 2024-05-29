export type FormDataSet = {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  discount: number;
};

export type ProductRes = {
  success: boolean;
  message: string;
  data: string;
};
