import { createDB } from '@/lib/db'
import React from 'react'
import link from 'next/link'
import Link from 'next/link'

async function getProducts() {
  const db = createDB()
  const products = await db
    .selectFrom('product')
    .leftJoin('images', 'product.id', 'images.productId')
    .select(['product.id', 'product.name', 'product.price', 'images.image'])
    .groupBy(['product.id'])
    .execute()
  return products
}

function Product({
  id,
  name,
  image,
  price,
  description,
}: {
  id: number
  name: string
  image: string
  price: number
  description: string
}) {
  if (!image) {
    image = 'https://via.placeholder.com/150'
  }

  return (
    <div>
      <img src={image} />
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
    <div className="grid grid-cols-3 grid-rows-5 gap-4">
      {product.map((product) => (
        <div
          key={product.id}
          className={
            'block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'
          }
        >
          <Product
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            description={product.description}
          />
        </div>
      ))}
    </div>
  )
}
