'use client'

import { DataTable } from '@/components/molecules/data-table'
import { useProducts } from '@/features/products/hooks/use-products'

import { columns } from './columns'

const DEFAULT_COLUMN_VISIBILITY = {
  id: false,
  status: false,
  condition: false,
  description: false,
  size_shoulder: false,
  size_chest: false,
  size_waist: false,
  size_hip: false,
  size_rise: false,
  size_leg: false,
  size_length: false
}

export function ProductsTable() {
  const { products } = useProducts()

  return <DataTable columns={columns} data={products} defaultColumnVisibility={DEFAULT_COLUMN_VISIBILITY} />
}
