export type FormDataSet = {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  discount: number;
};

export interface InfoInterface {
  name: string;
  mobile: number;
  pin: number;
  address: string;
  town: string;
  city: string;
  state: string;
  of: string;
}

export type ProductRes = {
  success: boolean;
  message: string;
  data: string;
};
