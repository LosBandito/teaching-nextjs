import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Product {
  id: Generated<number | null>;
  category: number;
  name: string;
  img: string;
  description: string;
  price: number;
  amount: number;
  dateAddded: Generated<string | null>;
}

export interface Rating {
  productId: number;
  ratingStars: number;
  ratingComment: string;
}

export interface DB {
  Product: Product;
  Rating: Rating;
}
