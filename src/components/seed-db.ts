import { createDB } from '../lib/db'
import { faker } from '@faker-js/faker'

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

async function createData(options?: number | { min?: number; max?: number }) {
  const data = []
  for (let i = 0; i < 10; i++) {
    data.push({
      category: faker.number.int({ min: 1, max: 10 }),
      name: faker.commerce.productName(),
      img: faker.image.url(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      amount: faker.number.int({ min: 1, max: 10 }),
    })
  }
  await fs.writeFile('/home/igor/WebstormProjects/teaching-nextjs/src/data/data2.json', JSON.stringify(data, null, 2))
  return data
}

async function seedDB() {
  const db = createDB()
  const dat = await createData()
  const products = await db.insertInto('Product').values(dat).execute()
  const reviews = await generateReviews(db)
  const ratings = await db.insertInto('Rating').values(reviews).execute()
}

async function generateReviews(db) {
  const products = await db.selectFrom('Product').select('id').execute()

  console.log('Generating')
  console.log(products)
  const reviews = []
  for (let i = 0; i < 100; i++) {
    const random = Math.floor(Math.random() * products.length)
    reviews.push({
      productId: products[random].id,
      ratingStars: faker.number.int({ min: 1, max: 5 }),
      ratingComment: faker.lorem.paragraph(),
    })
  }
  console.log(reviews)
  return reviews
}

createData()
  .then(seedDB)
  .catch((err) => console.error(err))
