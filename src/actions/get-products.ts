
'use server'


import { createDB } from '@/lib/db'
import { faker } from '@faker-js/faker'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

type Product={
  id: number
}

export async function GetProduct(product: Product) {
    console.log(product)


  const db = createDB()
  const productData = await db.selectFrom('product').where('id', '=', product.id).selectAll().executeTakeFirst()

  return productData
}


