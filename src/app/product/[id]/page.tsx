import { createDB } from '@/lib/db'
import { id } from 'postcss-selector-parser'

async function getProductDetail(id: string) {
  const db = createDB()

  const product = await db.selectFrom('Product').where('id', '=', id).selectAll().execute()
  return product
}

async function getProductReviews(id: string) {
  const db = createDB()

  const reviews = await db.selectFrom('Rating').where('productId', '=', id).selectAll().execute()
  console.log(reviews)
  return reviews
}

export default async function ProductDetail(props: { params: { id: string } }) {
  console.log('ProductDetail')
  console.log(props.params.id)
  const product = await getProductDetail(props.params.id)
  const reviews = await getProductReviews(props.params.id)

  return (
    <div
      className={
        'block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
      }
    >
      <h1>Product details</h1>
      <div>
        {product.map((product) => (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>

      <div
        className={
          'block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
        }
      >
        {reviews.map((review) => (
          <div key={review.productId}>
            <p>User {review.ratingUsername}</p>
            <p>{review.ratingStars} out of 5 stars</p>
            <h3>Comment</h3>
            <p>{review.ratingComment}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  )
}
