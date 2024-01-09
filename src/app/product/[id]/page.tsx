import { createDB } from '@/lib/db'
import { id } from 'postcss-selector-parser'
import {CommentForm} from "@/components/addComment";
import { ProductForm } from "@/components/createProduct";
import React from "react";

async function getProductDetail(id: number) {
  const db = createDB()

  const product = await db.selectFrom('product').where('id', '=', id).selectAll().execute()
  return product
}

async function getProductReviews(id: number) {
  const db = createDB()
  const reviews = await db.selectFrom('rating').where('productId', '=', id).selectAll().execute()
  console.log(reviews)
  if (reviews === {}) {
    const review = {
      id: 0,
      productId: 0,
      ratingUsername: 'No reviews yet',
      ratingStars: 0,
      ratingComment: 'No reviews yet',
    }
    return review
  }
  return reviews
}

async function getAverageRating(id: number) {
  let total = 0
  const db = createDB()
  const reviews = await db.selectFrom('rating').where('productId', '=', id).selectAll().execute()
  for (let i = 0; i < reviews.length; i++) {
    total += reviews[i].ratingStars
  }
  const average = total / reviews.length
  return Math.round(average * 100) / 100
}

async function getPhotos(id: number) {
  const db = createDB()
  const photos = await db.selectFrom('images').where('productId', '=', id).selectAll().execute()
  if (photos === {}) {
    const photo = { id: 0, productId: 0, image: 'https://via.placeholder.com/150' }
    return photos
  }
  return photos
}

export default async function ProductDetail(props: { params: { id: number } }) {
  console.log('ProductDetail')
  console.log(props.params.id)

  const product = await getProductDetail(props.params.id)
  const reviews = await getProductReviews(props.params.id)
  const averageRating = await getAverageRating(props.params.id)
  const photos = await getPhotos(props.params.id)

  return (
    <div
      className={
        'block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
      }
    >
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.image} />
        </div>
      ))}
      <div className={"w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"}>
        {product.map((product) => (
          <div key={product.id}>
            <h1 className={'text-4xl font-extrabold dark:text-white'}>{product.name}</h1>
            <p className={'b-4 text-lg font-normal text-gray-500 dark:text-gray-400'}>{product.description}</p>
            <p className={'b-4 text-lg font-normal text-gray-500 dark:text-gray-400'}>
              Average rating of the product : {averageRating}
            </p>
            <p className={"text-5xl font-extrabold tracking-tight"}>{product.price}$</p>
          </div>
        ))}
      </div>

      <div
        className={
          'w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 '
        }
      >
        {reviews.map((review) => (
          <div key={review.productId}>
            <p className={'bg-blue-700 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded'}>
              {review.ratingStars}
            </p>
            <p className={'block text-sm text-gray-500 dark:text-gray-400'}>User {review.ratingUsername}</p>
            <p className={'text-xl font-bold text-gray-900 dark:text-white'}>{review.ratingComment}</p>
            <br />
          </div>
        ))}
      </div>

      <CommentForm productId={props.params.id} />
    </div>
  )
}
