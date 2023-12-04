import { createDB } from '@/lib/db'
import { id } from 'postcss-selector-parser'

async function getProductDetail(id: string) {
  const db = createDB()

  const product = await db.selectFrom('product').where('id', '=', id).selectAll().execute()
  return product
}

async function getProductReviews(id: string) {
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

async function getAverageRating(id: string) {
  let total = 0
  const db = createDB()
  const reviews = await db.selectFrom('rating').where('productId', '=', id).selectAll().execute()
  for (let i = 0; i < reviews.length; i++) {
    total += reviews[i].ratingStars
  }
  const average = total / reviews.length
  return Math.round(average * 100) / 100
}

async function getPhotos(id: string) {
  const db = createDB()
  const photos = await db.selectFrom('images').where('productId', '=', id).selectAll().execute()
  if (photos === {}) {
    const photo = { id: 0, productId: 0, image: 'https://via.placeholder.com/150' }
    return photos
  }
  return photos
}

export default async function ProductDetail(props: { params: { id: string } }) {
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
      <h1>Product details</h1>
      <div>
        {product.map((product) => (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Product price : {product.price}</p>
            <p>Average rating of the product : {averageRating}</p>
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
