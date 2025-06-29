'use client'

import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger
} from '@/components/atoms/alert-dialog'
import { Button } from '@/components/atoms/button'

import { DeleteProductsButton } from './delete-products-button'

export function DeleteProductsAlert() {
  const [isOpen, setIsOpen] = useState(false)

  const closeAlert = () => setIsOpen(false)

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Eliminar productos</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de querer eliminar todos los productos?</AlertDialogTitle>
          <AlertDialogDescription className="pb-2">
            Esta acción no se puede deshacer. Va a eliminar los productos de la tabla y no será posible usar la función
            de copiar y pegar descripciones.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <DeleteProductsButton onConfirm={closeAlert} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
