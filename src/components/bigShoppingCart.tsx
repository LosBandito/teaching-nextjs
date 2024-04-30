'use client'
import { useContext, useEffect, useState } from 'react'
import { ShoppingCartContext } from '@/components/shoppingCart'
import { GetProduct } from '@/actions/get-products'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { IoBanOutline } from 'react-icons/io5'
import { IoAddCircleOutline } from 'react-icons/io5'
import { createOrder } from '@/actions/create-order'
import { redirect } from 'next/navigation'

export function BigShoppingCart() {
  const { items, itemCounts } = useContext(ShoppingCartContext)
  const [productData, setProductData] = useState([])

  const { addItem } = useContext(ShoppingCartContext)
  const { removeItem } = useContext(ShoppingCartContext)
  const { trashItem } = useContext(ShoppingCartContext)
  const { removeAllItems } = useContext(ShoppingCartContext)

  useEffect(() => {
    const fetchProductData = async () => {
      const uniqueItems = items.reduce((acc, item) => {
        if (!acc.includes(item)) {
          acc.push(item)
        }
        return acc
      }, [])

      const data = await Promise.all(uniqueItems.map((item) => GetProduct({ id: item })))
      setProductData(data)
    }
    fetchProductData()
  }, [items])
  console.log(productData)

  const processOrder = async () => {
    const order = {
      items: itemCounts,
      total_price: productData.reduce((acc, product) => acc + product.price * (itemCounts[product.id] || 0), 0),
      total_count: productData.reduce((acc, product) => acc + (itemCounts[product.id] || 0), 0),
    }

    console.log(order)
    await createOrder(order)
    removeAllItems()
  }
  return (
    <>
      <table className={'w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'}>
        <thead className={'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'}>
          <tr>
            <th className={'px-6 py-3'}>Item ID</th>
            <th className={'px-6 py-3'}>Count</th>
            <th className={'px-6 py-3'}>Product Name</th>
            <th className={'px-6 py-3'}>Product Description</th>
            <th className={'px-6 py-3'}>Price</th>
            <th className={'px-6 py-3'}></th>
            <th className={'px-6 py-3'}></th>
            <th className={'px-6 py-3'}></th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product) => (
            <tr
              key={product.id}
              className={
                'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
              }
            >
              <td className={'px-6 py-4'}>{product.id}</td>
              <td className={'px-6 py-4'}>{itemCounts[product.id] || 0}</td>
              <td className={'px-6 py-4'}>{product.name}</td>
              <td className={'px-6 py-4'}>{product.description}</td>
              <td className={'px-6 py-4'}>{product.price}</td>

              <td className={'px-6 py-4'}>
                <button onClick={() => addItem(product.id)} className={'text-sky-500'}>
                  <IoAddCircleOutline />
                </button>
              </td>
              <td className={'px-6 py-4'}>
                <button onClick={() => removeItem(product.id)} className={'text-red-500'}>
                  <IoIosRemoveCircleOutline />
                </button>
              </td>
              <td className={'px-6 py-4'}>
                <button onClick={() => trashItem(product.id)} className={'text-red-500'}>
                  <IoBanOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <h1
          className={
            'mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'
          }
        >
          Price Total:{' '}
          <span className={'bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent'}>
            {productData.reduce((acc, product) => acc + product.price * (itemCounts[product.id] || 0), 0)}
          </span>
        </h1>
      </table>
      <div className={'mt-4'}>
        <button
          className={
            'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          }
          onClick={processOrder}
        >
          Chcekout
        </button>
      </div>
    </>
  )
}
