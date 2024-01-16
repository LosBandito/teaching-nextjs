'use server'

import { createDB } from '@/lib/db'
import { faker } from '@faker-js/faker'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

type ProductReviewProps = {
  productId: number
  ratingUsername: string
  ratingStars: number
  ratingComment: string
}

export async function editComment(props: ProductReviewProps) {
  const db = createDB()

  const newComment = await db
    .updateTable('rating')

    .set({
      ratingComment: props.ratingComment,
      ratingStars: props.ratingStars,
    })
    .where('ratingUsername', '=', props.ratingUsername)
    .returningAll()
    .executeTakeFirstOrThrow()

  revalidatePath(`/product/${props.productId}`)
}
