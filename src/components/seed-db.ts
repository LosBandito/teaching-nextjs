import { createDB } from '../lib/db'
import { faker } from '@faker-js/faker'

const db = createDB()
const fs = require('fs').promises

async function readJson() {
  try {
    const jsonString = await fs.readFile('/home/igor/WebstormProjects/teaching-nextjs/src/data/data2.json', 'utf8')
    console.log('File data:', jsonString)
    return jsonString
  } catch (err) {
    console.error('File read failed:', err)
  }
}

async function createData(
  options?:
    | number
    | {
        min?: number
        max?: number
      }
) {
  const data = []
  for (let i = 0; i < 10; i++) {
    data.push({
      category: faker.number.int({ min: 1, max: 10 }),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      amount: faker.number.int({ min: 1, max: 10 }),
    })
  }

  await fs.writeFile('/home/igor/WebstormProjects/teaching-nextjs/src/data/data2.json', JSON.stringify(data, null, 2))
  return data
}

async function seedDB() {


  const dat = await createData()
  const products = await db.insertInto('product').values(dat).execute()
  const product = await db.selectFrom('product').select('id').execute()
  const reviews = await generateReviews(product)
  const ratings = await db.insertInto('rating').values(reviews).execute()
  const images = await generateImages(product)
  const addImages = await db.insertInto('images').values(images).execute()
}

async function generateReviews(product) {
  console.log('Generating')
  const reviews = []
  for (let i = 0; i < 1000; i++) {
    const random = Math.floor(Math.random() * product.length)
    reviews.push({
      productId: product[random].id,
      ratingUsername: faker.internet.userName(),
      ratingStars: faker.number.int({ min: 1, max: 5 }),
      ratingComment: faker.lorem.paragraph(),
    })
  }
  console.log('returning reviews')
  return reviews
}

async function generateImages(product) {
  console.log('Generating')
  const images = []
  for (let i = 0; i < 100; i++) {
    const random = Math.floor(Math.random() * product.length)
    images.push({
      productId: product[random].id,
      image: faker.image.urlLoremFlickr({ category: 'technics' }),
    })
  }
  console.log('returning images')

  return images
}

createData()
  .then(seedDB)
  .catch((err) => console.error(err))
