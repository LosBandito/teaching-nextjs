import { createDB } from '@/lib/db'
import Link from 'next/link'
import { revalidatePath } from "next/cache";

async function getOD() {
  const db = createDB()
  const orders = await db.selectFrom('orders').fullJoin('orderProducts', 'orderId', 'orderId').selectAll().execute()

  const aggregatedOrders = orders.reduce((acc, order) => {
    if (!acc[order.orderId]) {
      acc[order.orderId] = {}
    }
    if (!acc[order.orderId][order.productId]) {
      acc[order.orderId][order.productId] = {
        productCount: order.productCount,
        productPrice: order.productPrice,
      }
    } else {
      acc[order.orderId][order.productId].productPrice += order.productPrice
    }
    return acc
  }, {})

  console.log(aggregatedOrders)
  return aggregatedOrders
}

export default async function OrderPage() {
  const orders = await getOD()
  console.log(orders)
  return (
    <>
      <h1
        className={
          'mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'
        }
      >
        <span
          className={'text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'}>Previous</span>{' '}
        Orders
      </h1>
      <div className={'relative overflow-x-auto'}>
        <table>
          <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Product Count</th>
            <th>Product Price</th>
          </tr>
          </thead>
          <tbody>
          {Object.entries(orders).map(([orderId, products]) => {
            return Object.entries(products).map(([productId, productDetails], index) => {
              console.log(orderId, productId, productDetails)
              return (
                <tr key={index}>
                  <td>{index === 0 ? orderId : ''}</td>
                  <td>{productId}</td>
                  <td>{productDetails.productCount}</td>
                  <td>{productDetails.productPrice}</td>
                </tr>
              )
            })
          })}
          </tbody>
        </table>
      </div>
    </>
  )
}
