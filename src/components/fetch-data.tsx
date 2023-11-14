import { createDB } from "@/lib/db"
import React from 'react'
import link from 'next/link'
import Link from 'next/link'

async function getProducts() {
  const db = createDB()
  const products = await db.selectFrom('Product').fullJoin('Rating', 'productId', 'id').selectAll().execute()
  return products
}

function Product({ id, name, price, description }: { id: number; name: string; price: number; description: string }) {
  return (
    <div>
      <p>
        <strong>{name}</strong>
      </p>
      <p>{price}</p>
      <p>{description}</p>
      <Link href={`/product/${id}`}>View Product</Link>
    </div>
  )
}

export async function StaticMessages() {
  const product = await getProducts()
  return (
    <div className="grid grid-cols-3 gap-4">
      {product.map((product) => (
        <div
          key={product.id}
          className={
            'block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
          }
        >
          <Product id={product.id} name={product.name} price={product.price} description={product.description} />
        </div>
      ))}
    </div>
  )
}
