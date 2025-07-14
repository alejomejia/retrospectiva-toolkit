import { unstable_cache } from 'next/cache'

import { getCurrentUser } from '@/features/users/utils.server'

import { getProductsByRole } from '../services'
import { ProductsProvider } from '../context/products-context'

import { transformRawProducts } from './utils'
import { ProductsTable } from './products-table.client'

// Cache the data fetching with a tag for revalidation
// Cache key includes user role to ensure different users get different cached results
const getCachedSheetProducts = (userRole: string | undefined) => {
  const cacheKey = ['sheet-products', userRole || 'default']
  return unstable_cache(() => getProductsByRole(userRole), cacheKey, {
    tags: ['products']
  })()
}

export async function ProductsPageContent() {
  const user = await getCurrentUser()
  const rawProducts = await getCachedSheetProducts(user?.role)
  const transformedProducts = transformRawProducts(rawProducts)

  return (
    <ProductsProvider products={transformedProducts} rawProducts={rawProducts}>
      <ProductsTable />
    </ProductsProvider>
  )
}
