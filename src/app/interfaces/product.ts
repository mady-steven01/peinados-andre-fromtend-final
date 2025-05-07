import { Styles  } from '.././interfaces/styles';
export interface Product {
  _id?: string;
  name: string;
  description?: string
  price?: number;
  urlImage?: string;
  styles: Styles;
  state?: boolean;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}
