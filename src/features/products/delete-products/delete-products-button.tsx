'use client'

import { toast } from 'sonner'

import { Button } from '@/components/atoms/button'

import { deleteProducts as deleteProductsAction } from '../actions'

type DeleteProductsButtonProps = {
  onConfirm: () => void
}

export function DeleteProductsButton({ onConfirm }: DeleteProductsButtonProps) {
  async function onDeleteProducts() {
    const deleteProducts = async () => {
      try {
        await deleteProductsAction()
        onConfirm()
      } catch {
        throw new Error('Error al eliminar productos')
      }
    }

    toast.promise(deleteProducts(), {
      loading: 'Eliminando productos...',
      success: () => 'Productos eliminados correctamente',
      error: (error) => ({
        message: error.message,
        action: {
          label: 'Reintentar',
          onClick: () => onDeleteProducts()
        }
      })
    })
  }

  return <Button onClick={onDeleteProducts}>Eliminar productos</Button>
}
