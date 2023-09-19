import { createDB } from '../lib/db'

async function seedDb() {
  console.log('Seeding db')
  const db = createDB()

  await db.deleteFrom('Product').execute()

  const products = [
    {
      category: 1,
      name: 'Iphone 3G',
      img: 'https://www.gizmochina.com/wp-content/uploads/2019/09/Apple-iPhone-11-1-500x500.jpg',
      description: 'The first iphone',
      price: 10000,
      amount: 10,
    },
    {
      category: 1,
      name: 'Iphone 4G',
      img: 'https://www.gizmochina.com/wp-content/uploads/2019/09/Apple-iPhone-11-1-500x500.jpg',
      description: 'The second iphone',
      price: 50000,
      amount: 30,
    },
  ]
  await db.insertInto('Product').values(products).execute()

}
seedDb()