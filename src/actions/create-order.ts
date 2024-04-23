'use server'

import { createDB } from '@/lib/db'
import { faker } from '@faker-js/faker'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

type OrderParams = {
  total_count: number
  total_price: number
}

export async function createOrder(order: OrderParams) {
  const db = createDB()
  const newProduct = await db
    .insertInto('orders')
    .values({
      totalCount: order.total_count,
      totalPrice: order.total_price,
    })
    .returningAll()
    .executeTakeFirstOrThrow()

  console.log('Order Processed')
  revalidatePath('/product/orders')
  redirect('/product/orders')

}
