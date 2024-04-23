'use client'
import { useContext, useEffect, useState } from 'react'
import { ShoppingCartContext } from '@/components/shoppingCart'
import { GetProduct } from '@/actions/get-products'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { IoBanOutline } from 'react-icons/io5'
import { IoAddCircleOutline } from 'react-icons/io5'

export function BigShoppingCart() {
  const { items, itemCounts } = useContext(ShoppingCartContext)
  const [productData, setProductData] = useState([])

  const { addItem } = useContext(ShoppingCartContext)
  const { removeItem } = useContext(ShoppingCartContext)
  const { trashItem } = useContext(ShoppingCartContext)

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

  return (
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
            <td className={'px-6 py-4'}>{itemCounts[product.id]}</td>
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
    </table>
  )
}
