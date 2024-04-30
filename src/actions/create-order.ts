'use server'

import { createDB } from '@/lib/db'
import { faker } from '@faker-js/faker'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

type OrderParams = {
  items: { [key: number]: number }
  total_price: number
  total_count: number
}

export async function createOrder(order: OrderParams) {
  console.log('oid')
  console.log(order.items)
  const oid = Object.entries(order.items)
  console.log(oid)

  const db = createDB()
  const newOrder = await db
    .insertInto('orders')
    .values({
      totalCount: order.total_count,
      totalPrice: order.total_price,
    })
    .returningAll()
    .executeTakeFirstOrThrow()

  const orderProducts = oid.map(([productId, productCount]) => ({
    orderId: newOrder.id,
    productId: Number(productId),
    productCount: Number(productCount),
    productPrice: faker.number.int({ min: 1, max: 1000 }),
  }))

  const insertOrderItem = await db
    .insertInto('orderProducts')
    .values(orderProducts)
    .returningAll()
    .executeTakeFirstOrThrow()
  console.log('Order succ')

  revalidatePath(`/product/orders`)
  redirect(`/product/orders`)
}

export async function addOrderItem(orderId: number, productId: number, count: number) {
  const db = createDB()
}
