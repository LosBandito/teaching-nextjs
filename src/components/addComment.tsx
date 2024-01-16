'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createComment } from '@/actions/create-comment'

type FormData = {
  productId: number
  username: string
  comment: string
  stars: number
}

export function CommentForm({ productId }: { productId: number }) {
  console.log(productId)
  const { register, handleSubmit } = useForm<FormData>()
  const onSubmit = handleSubmit(async (data) => {
    await createComment(data, productId)
  })

  return (
    <>
      <form
        className={
          'block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
        }
        onSubmit={onSubmit}
      >
        <div className={'mb-5'}>
          <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
            Add your comment
            <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
              PRO
            </span>
          </h1>
        </div>
        <div className="mb-5">
          <label htmlFor="fname" className={'block mb-2 text-sm font-medium text-gray-900 dark:text-white'}>
            Username:
          </label>

          <input
            type="text"
            className={
              'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            }
            required={true}
            {...register('username')}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="fname" className={'block mb-2 text-sm font-medium text-gray-900 dark:text-white'}>
            Comment:
          </label>

          <input
            type="text"
            className={
              'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            }
            required={true}
            {...register('comment')}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="stars" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select your rating
          </label>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div className={'flex items-center me-4'}>
                <label key={i} className={'ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'}>
                  <input
                    type="radio"
                    value={i + 1}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    {...register('stars')}
                    required={true}
                  />
                  {i + 1}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <input
            type="submit"
            value="Submit"
            className={
              'ext-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            }
          />
        </div>
      </form>
    </>
  )
}
