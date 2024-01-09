import { createDB } from '@/lib/db'
import Link from 'next/link'
import React from 'react'
import { EditProductForm } from '@/components/editProduct'

async function getProductDetail(id: number) {
  const db = createDB()

  const product = await db.selectFrom('product').where('id', '=', id).selectAll().executeTakeFirstOrThrow()
  return product
}

export default async function ProductCreator(props: { params: { id: number } }) {
  const product = await getProductDetail(props.params.id)
  const pid = props.params.id
  return (
    <EditProductForm
      name={product.name}
      description={product.description}
      price={product.price}
      productId={pid}
    ></EditProductForm>
  )
}
