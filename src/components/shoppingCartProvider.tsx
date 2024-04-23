'use client'

import { useState } from 'react'
import { ShoppingCartContext } from '@/components/shoppingCart'

type Props = {
  children: any
}

export function ShoppingCartProvider({ children }: Props) {
  const [items, setItems] = useState<number[]>(JSON.parse(localStorage.getItem('items') || '[]'))
  const [itemCounts, setItemCounts] = useState<{ [key: number]: number }>({})

  const addItem = (item: number) => {
    const newItems = [...items, item]
    setItems(newItems)
    console.log("Toto su itemy")
    console.log(items)
    setItemCounts((prevCounts) => ({ ...prevCounts, [item]: (prevCounts[item] || 0) + 1 }))
    localStorage.setItem('items', JSON.stringify(newItems))
  }

  const removeItem = (item: number) => {
    const index = items.indexOf(item)
    if (index > -1) {
      const newItems = [...items]
      newItems.splice(index, 1)
      setItems(newItems)
      setItemCounts((prevCounts) => {
        const newCounts = { ...prevCounts }
        newCounts[item]--
        if (newCounts[item] <= 0) {
          delete newCounts[item]
        }
        return newCounts
      })
      localStorage.setItem('items', JSON.stringify(newItems))
    }
  }

  const trashItem = (item: number) => {
    const newItems = items.filter((i) => i !== item)
    setItems(newItems)
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts }
      delete newCounts[item]
      return newCounts
    })
    localStorage.setItem('items', JSON.stringify(newItems))
  }

  return (
    <ShoppingCartContext.Provider value={{ items, addItem, removeItem, trashItem, itemCounts }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
