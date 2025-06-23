import { CreateProductForm } from '@/components/forms/create-product-form'
import { ProductsList } from '@/components/forms/products-list'

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto py-24 flex gap-8">
      <div className="max-w-sm border-r border-input pr-8">
        <CreateProductForm />
      </div>
      <ProductsList />
    </div>
  )
}
