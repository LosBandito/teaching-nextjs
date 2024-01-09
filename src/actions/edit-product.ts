'use server'

import { createDB } from '@/lib/db'
import { faker } from '@faker-js/faker'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

type ProductParams = {
  name: string
  description: string
  price: number
  productId: number
}

export async function editProduct(product: ProductParams) {
  const db = createDB()

  const newProduct = await db
    .updateTable('product')

    .set({
      name: product.name,
      description: product.description,
      price: product.price,
    })
    .where('id', '=', product.productId)
    .returningAll()
    .executeTakeFirstOrThrow()

  revalidatePath(`/product/${product.productId}`)
  redirect(`/product/${product.productId  }`)
}
