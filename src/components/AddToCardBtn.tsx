'use client'
import { useContext } from 'react'
import { ShoppingCartContext } from '@/components/shoppingCart'

type Props = {
  id: number
}

export function AddToCardBtn(props: Props) {
  const { addItem } = useContext(ShoppingCartContext)

  return (
    <button
      className="btn btn-outline btn-xs"
      onClick={() => {
        addItem(props.id)
      }}
    >
      Add to Cart
    </button>
  )
}
