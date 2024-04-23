import { createContext } from 'react'

type ShoppingCart = {
  items: number[]
  addItem: (item: number) => void
  removeItem: (item: number) => void
  trashItem: (item: number) => void
  itemCounts: { [key: number]: number }
}

export const ShoppingCartContext = createContext<ShoppingCart>({
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
  trashItem: (item) => {},
  itemCounts: {},
})
