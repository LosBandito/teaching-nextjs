import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Images {
  id: Generated<number | null>;
  productId: number;
  image: string;
}

export interface OrderProducts {
  orderId: number;
  productId: number;
  productCount: number;
  productPrice: number;
}

export interface Orders {
  id: Generated<number | null>;
  totalPrice: number;
  totalCount: number;
}

export interface Product {
  id: Generated<number | null>;
  category: number;
  name: string;
  description: string;
  price: number;
  amount: number;
  dateAddded: Generated<string | null>;
}

export interface Rating {
  productId: number;
  ratingUsername: string;
  ratingStars: number;
  ratingComment: string;
}

export interface DB {
  images: Images;
  orderProducts: OrderProducts;
  orders: Orders;
  product: Product;
  rating: Rating;
}
