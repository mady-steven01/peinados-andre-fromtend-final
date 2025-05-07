import { Catego } from "././estilos

export interface Product {
  _id?: string;
  name: string;
  description?: string
  price?: number;
  urlImage?: string;
  category: Category;
  state?: boolean;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}
