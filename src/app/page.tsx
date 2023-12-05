import { Products, StaticMessages } from '@/components/fetch-data'
import { DataList } from '@/components/data-list'
import Link from 'next/link'
import React from 'react'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: { page: string }
}
export default function Home({ searchParams }: Props) {
  const page = parseInt(searchParams.page)
  if (isNaN(page)) {
    redirect('/?page=1')
  }
  if (page <= 0) {
    redirect('/?page=1')
  }
  return (
    <>
      <Link
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        href={`?page=${page - 1}`}
      >
        Previous Page
      </Link>
      <Link
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        href={`?page=${page + 1}`}
      >
        Next Page
      </Link>

      <StaticMessages page={searchParams.page} />
    </>
  )
}
