import { IProduct } from './product.interface';

export interface CartItem extends IProduct {
  quantity: number;
}