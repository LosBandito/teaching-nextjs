import { createDB } from '@/lib/db'
import React from 'react'
import link from 'next/link'
import Link from 'next/link'

async function getProducts(page: number) {
  console.log(page)
  const offset = (page - 1) * 9

  const db = createDB()
  const products = await db
    .selectFrom('product')
    .leftJoin('images', 'product.id', 'images.productId')
    .select(['product.id', 'product.name', 'product.price', 'images.image'])
    .groupBy(['product.id'])
    .limit(9)
    .offset(offset)
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

type Props = {
  page: number
}

export async function StaticMessages(props: Props) {
  const product = await getProducts(props.page)
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
