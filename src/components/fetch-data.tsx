import { createDB } from '../lib/db'
import { MessagesList } from './MessagesList'
import { DataList } from "@/components/data-list";
import React from "react";

async function getProducts() {
  const db = createDB()
  const products = await db.selectFrom('Product').selectAll().execute()
  return products
}

export async function StaticMessages() {

  const product = await getProducts()
  console.log(product)
  return (
    <div>
      <ul>
        {product.map((product) => (
          <li key={product.id}>
            {product.name} {product.price} {product.description} {product.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
