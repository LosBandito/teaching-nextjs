'use server'

import { createDB } from '@/lib/db'
import { faker } from '@faker-js/faker'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

type CommentParams = {
  productId: number
  username: string
  comment: string
  stars: number
}

export async function createComment(comment: CommentParams, productId: number) {
  console.log(comment)
  console.log(productId)

  const db = createDB()
  const newProduct = await db
    .insertInto('rating')
    .values({
      productId: productId,
      ratingUsername: comment.username,
      ratingComment: comment.comment,
      ratingStars: comment.stars,
    })
    .returningAll()
    .executeTakeFirstOrThrow()

  revalidatePath(`/product/${newProduct.productId}`)
}
