'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createProduct } from '@/actions/create-product'

type FormData = {
  name: string
  description: string
  price: number
}



export function ProductForm() {
  const { register, handleSubmit } = useForm<FormData>()
  const onSubmit = handleSubmit(async (data) => {
    await createProduct(data)
  })

  return (
    <div className={'flex items-center justify-center h-screen'}>
      <form
        className={
          'max-w-xl w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
        }
        onSubmit={onSubmit}
      >
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Insert your new{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Stunning</span>{' '}
          Product
        </h1>
        <div className={'mb-5'}>
          <label className={'block mb-2 text-sm font-medium text-gray-900 dark:text-white'} htmlFor="name">
            Name:
          </label>
          <input
            className={
              'block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            }
            {...register('name')}
          />
        </div>
        <div className={'mb-5'}>
          <label className={'block mb-2 text-sm font-medium text-gray-900 dark:text-white'} htmlFor="lname">
            Description:
          </label>

          <input
            className={
              'block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            }
            {...register('description')}
          />
        </div>
        <div className={'mb-5'}>
          <label className={'block mb-2 text-sm font-medium text-gray-900 dark:text-white'} htmlFor="price">
            Price
          </label>

          <input
            className={
              'block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            }
            {...register('price')}
          />
        </div>

        <div className={'mb-5'}>
          <input
            className={
              'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-80'
            }
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  )
}
