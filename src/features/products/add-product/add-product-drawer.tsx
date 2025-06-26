'use client'

import { useState } from 'react'

import { Button } from '@/components/atoms/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/atoms/sheet'

import { AddProductForm } from './add-product-form'

export function AddProductDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button onClick={open}>Agregar producto</Button>
      </SheetTrigger>
      <SheetContent className="h-screen overflow-y-auto gap-0">
        <div className="sticky top-0 z-10 bg-black border-b border-input">
          <SheetHeader>
            <SheetTitle>Agregar producto</SheetTitle>
          </SheetHeader>
        </div>
        <div className="px-5 py-8">
          <AddProductForm onSubmit={close} onCancel={close} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
