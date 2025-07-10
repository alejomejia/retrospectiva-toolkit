'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/atoms/sheet'

import { UpdateProductForm } from './update-product-form'
import type { ProductSheetRecord } from '../types'

type UpdateProductDrawerProps = {
  product: ProductSheetRecord
  children: React.ReactNode
}

export function UpdateProductDrawer({ product, children }: UpdateProductDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div onClick={open}>{children}</div>
      </SheetTrigger>
      <SheetContent className="h-screen overflow-y-auto gap-0">
        <div className="sticky top-0 z-10 bg-black border-b border-input">
          <SheetHeader>
            <SheetTitle>Actualizar producto</SheetTitle>
          </SheetHeader>
        </div>
        <div className="px-5 py-8">
          <UpdateProductForm data={product} onSubmit={close} onCancel={close} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
