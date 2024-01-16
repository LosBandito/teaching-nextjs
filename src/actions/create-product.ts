'use server'

import { createDB } from '@/lib/db'
import { faker } from '@faker-js/faker'
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";

type ProductParams = {
  name: string
  description: string
  price: number
}

export async function createProduct(product: ProductParams) {
  const db = createDB()
  const newProduct = await db
    .insertInto('product')
    .values({
      category: faker.number.int({ min: 1, max: 10 }),
      name: product.name,
      description: product.description,
      price: product.price,
      amount: faker.number.int({ min: 1, max: 10 }),
    })
    .returningAll()
    .executeTakeFirstOrThrow()

  revalidatePath(`/product/${newProduct.id}`)
  redirect(`/product/${newProduct.id}`)
}
