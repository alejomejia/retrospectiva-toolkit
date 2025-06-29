import { Suspense } from 'react'

import { PageTitle } from '@/components/molecules/page-title'

import { AddProductDrawer } from '@/features/products/add-product/add-product-drawer'
import { ProductList } from '@/features/products/show-products/product-list'
import { DeleteProductsAlert } from '@/features/products/delete-products/delete-products-alert'

export default function ProductsPage() {
  return (
    <>
      <PageTitle title="Productos" right={<PageTitleRight />} />
      <main className="max-w-7xl mx-auto p-6">
        <Suspense fallback={<div className="flex items-center justify-center p-8">Cargando productos...</div>}>
          <ProductList />
        </Suspense>
      </main>
    </>
  )
}

function PageTitleRight() {
  return (
    <div className="flex gap-3">
      <AddProductDrawer />
      <DeleteProductsAlert />
    </div>
  )
}
