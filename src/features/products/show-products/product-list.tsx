import { unstable_cache } from 'next/cache'
import { DataTable } from '@/components/molecules/data-table'

import { columns } from './columns'

import { transformRawProducts } from './utils'

async function getSheetProducts(): Promise<string[][]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'
  const products = await fetch(`${baseUrl}/api/sheet/product`)
  const response = await products.json()

  // The API returns { status: 200, data: Product[] }
  return response.data ?? []
}

// Cache the data fetching with a tag for revalidation
const getCachedSheetProducts = unstable_cache(getSheetProducts, ['sheet-products'], {
  tags: ['products']
})

export async function ProductList() {
  const data = await getCachedSheetProducts()
  const transformedProducts = transformRawProducts(data)

  const defaultColumnVisibility = {
    id: false,
    status: false,
    condition: false,
    details: false,
    size_shoulder: false,
    size_chest: false,
    size_waist: false,
    size_hip: false,
    size_rise: false,
    size_leg: false,
    size_length: false
  }

  return <DataTable columns={columns} data={transformedProducts} defaultColumnVisibility={defaultColumnVisibility} />
}
