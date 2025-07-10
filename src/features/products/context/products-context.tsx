'use client'

import { createContext, type ReactNode } from 'react'
import type { ProductSheetRecord } from '../types'

type ProductsContextType = {
  products: ProductSheetRecord[]
  rawProducts: string[][]
}

export const ProductsContext = createContext<ProductsContextType | null>(null)

type ProductsProviderProps = {
  products: ProductSheetRecord[]
  rawProducts: string[][]
  children: ReactNode
}

export function ProductsProvider({ products, rawProducts, children }: ProductsProviderProps) {
  return <ProductsContext.Provider value={{ products, rawProducts }}>{children}</ProductsContext.Provider>
}
