import { createDB } from '@/lib/db'
import Link from 'next/link'
import React from 'react'

export default async function OrderDisplayer() {
  async function getOD() {
    const db = createDB()
    const orders = await db.selectFrom('orders').selectAll().execute()
    return orders
  }

  const orderData = await getOD()

  return (
    <>
      <h1
        className={
          'mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'
        }
      >
        <span className={'text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'}>Previous</span>{' '}
        Orders
      </h1>
      <div className={'relative overflow-x-auto'}>
        <table className={'w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'}>
          <thead className={'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'}>
            <tr>
              <th className={'px-6 py-3'}>Order ID</th>
              <th className={'px-6 py-3'}>Total Count</th>
              <th className={'px-6 py-3'}>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order, index) => (
              <tr key={index} className={'bg-white border-b dark:bg-gray-800 dark:border-gray-700'}>
                <td className={'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'}>{order.id}</td>
                <td className={'px-6 py-4'}>{order.totalCount}</td>
                <td className={'px-6 py-4'}>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
