import { Suspense } from 'react'

import { PageTitle } from '@/components/molecules/page-title'

import { AddProductDrawer } from '@/features/products/add-product/add-product-drawer'
import { ProductsPageContent } from '@/features/products/show-products/products-page-content'
import { DeleteProductsAlert } from '@/features/products/delete-products/delete-products-alert'

export default function ProductsPage() {
  return (
    <>
      <PageTitle title="Productos" rightSlot={<PageTitleRight />} />
      <main className="max-w-7xl mx-auto p-6">
        <Suspense fallback={<div className="flex items-center justify-center p-8">Cargando productos...</div>}>
          <ProductsPageContent />
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
