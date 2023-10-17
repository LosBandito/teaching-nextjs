import { createDB } from '@/lib/db'

import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const db = createDB()
  const products = await db.selectFrom('Product').select(['category', 'name', 'description', 'price']).execute()
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return NextResponse.json(products)}