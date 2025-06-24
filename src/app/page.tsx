import { Button } from '@/components/atoms/button'
import { CreateProductForm } from '@/components/forms/create-product-form'
import { ProductsList } from '@/components/forms/products-list'

export default function ProductsPage() {
  return (
    <>
      <header className="sticky z-10 bg-background top-0 flex justify-between gap-4 p-6 border-b border-input">
        <h1 className="text-2xl font-bold">Productos</h1>
        <div className="">
          <Button>Agregar producto</Button>
        </div>
      </header>
      <div className="max-w-3xl mx-auto py-24 flex gap-8">
        <div className="max-w-sm border-r border-input pr-8">
          <CreateProductForm />
        </div>
        <ProductsList />
      </div>
    </>
  )
}
