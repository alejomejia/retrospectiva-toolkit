import { PageTitle } from '@/components/molecules/page-title'

import { AddProductDrawer } from '@/features/products/add-product/add-product-drawer'
import { ProductList } from '@/features/products/show-products/product-list'

export default function ProductsPage() {
  return (
    <>
      <PageTitle title="Productos" right={<AddProductDrawer />} />
      <main className="max-w-7xl mx-auto p-6">
        <ProductList />
      </main>
    </>
  )
}
