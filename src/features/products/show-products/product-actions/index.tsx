import { Button } from '@/components/atoms/button'

import type { ProductSheetRecord } from '@/features/products/types'
import { UpdateProductDrawer } from '@/features/products/update-product/update-product-drawer'

import { CopyDescriptionAction } from './actions.client'
import { PencilIcon } from 'lucide-react'

type Props = {
  product: ProductSheetRecord
}

export function ProductActions({ product }: Props) {
  return (
    <div className="flex items-center gap-2">
      <CopyDescriptionAction product={product} />
      <UpdateProductAction product={product} />
    </div>
  )
}

function UpdateProductAction({ product }: Props) {
  return (
    <UpdateProductDrawer product={product}>
      <Button className="size-8 p-0" variant="outline" size="sm">
        <PencilIcon className="size-4" />
      </Button>
    </UpdateProductDrawer>
  )
}
