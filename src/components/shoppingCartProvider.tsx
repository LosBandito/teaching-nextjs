'use client'

import { useState } from 'react'
import { ShoppingCartContext } from '@/components/shoppingCart'

type Props = {
  children: any
}

export function ShoppingCartProvider({ children }: Props) {
  const [items, setItems] = useState<number[]>([])
  const [itemCounts, setItemCounts] = useState<{ [key: number]: number }>({})

  const addItem = (item: number) => {
    setItems([...items, item])
    setItemCounts({ ...itemCounts, [item]: (itemCounts[item] || 0) + 1 })
  }



  return <ShoppingCartContext.Provider value={{ items, addItem, itemCounts }}>{children}</ShoppingCartContext.Provider>
}