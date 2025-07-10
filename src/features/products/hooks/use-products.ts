import { useContext } from 'react'

import { ProductsContext } from '@/features/products/context/products-context'

export function useProducts() {
  const context = useContext(ProductsContext)

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }

  return context
}
