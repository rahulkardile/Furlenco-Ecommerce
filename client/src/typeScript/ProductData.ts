export interface ProducData {
  category: string;
  description: string;
  mainImage: string;
  discount: number;
  name: string;
  owner: {
    email: string;
    name: string;
    id: string;
  };
  price: number;
  stock: number;
  _id: string;
}

export interface FetchProduct {
    success: boolean;
    message: string;
    data: ProducData
}
