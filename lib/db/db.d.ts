import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Messages {
  id: number;
  content: string;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  rank: string;
  rankImg: string;
  ait: string;
  dateAdded: Generated<string>;
}


export interface DB {
  messages: Messages;
  user: User;
}
