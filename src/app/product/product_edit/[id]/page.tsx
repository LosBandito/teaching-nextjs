import { createDB } from '@/lib/db'
import Link from 'next/link'
import React from 'react'
import { EditProductForm } from '@/components/editProduct'
import { EditPhoto } from '@/components/editPhoto'

async function getProductDetail(id: number) {
  const db = createDB()

  const product = await db.selectFrom('product').where('id', '=', id).selectAll().executeTakeFirstOrThrow()
  return product
}

async function getPhotos(id: number) {
  const db = createDB()
  const photos = await db.selectFrom('images').where('productId', '=', id).selectAll().execute()
  if (photos === {}) {
    const photo = { id: 0, productId: 0, image: 'https://via.placeholder.com/150' }
    return photos
  }
  return photos
}

export default async function ProductCreator(props: { params: { id: number } }) {
  const photos = await getPhotos(props.params.id)
  const product = await getProductDetail(props.params.id)
  const pid = props.params.id

  return (
    <>
      <EditProductForm
        name={product.name}
        description={product.description}
        price={product.price}
        productId={pid}
      ></EditProductForm>
      <EditPhoto photos={photos} productId={pid}></EditPhoto>
    </>
  )
}
