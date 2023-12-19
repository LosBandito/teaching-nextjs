import { createDB } from '@/lib/db'
import Link from 'next/link'
import React from 'react'
import { ProductForm } from '@/components/createProduct'

export default async function ProductCreator() {
  return <ProductForm />
}
