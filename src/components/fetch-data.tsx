import { createDB } from '../lib/db'
import React from 'react'

async function getProducts() {
  const db = createDB()
  const products = await db.selectFrom('Product').fullJoin('Rating', 'productId', 'id').selectAll().execute()
  return products
}


export async function StaticMessages() {
  const product = await getProducts()
  return (
    <div>
      <ul>
        {product.map((product) => (
          <li key={product.id}>
            {product.name} {product.price} {product.description} {product.amount} {product.ratingComment} {product.ratingStars}
          </li>
        ))}
      </ul>
    </div>
  )
}
