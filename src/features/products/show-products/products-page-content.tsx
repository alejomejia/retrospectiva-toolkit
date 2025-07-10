import { unstable_cache } from 'next/cache'

import { getProducts } from '../services'
import { ProductsProvider } from '../context/products-context'

import { transformRawProducts } from './utils'
import { ProductsTable } from './products-table.client'

// Cache the data fetching with a tag for revalidation
const getCachedSheetProducts = unstable_cache(getProducts, ['sheet-products'], {
  tags: ['products']
})

export async function ProductsPageContent() {
  const rawProducts = await getCachedSheetProducts()
  const transformedProducts = transformRawProducts(rawProducts)

  return (
    <ProductsProvider products={transformedProducts} rawProducts={rawProducts}>
      <ProductsTable />
    </ProductsProvider>
  )
}
