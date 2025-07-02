'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/button'

import { deleteProducts as deleteProductsAction } from '../actions'

type DeleteProductsButtonProps = {
  onConfirm: () => void
}

export function DeleteProductsButton({ onConfirm }: DeleteProductsButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function onDeleteProducts() {
    const deleteProducts = async () => {
      try {
        setIsDeleting(true)

        await deleteProductsAction()
        onConfirm()
      } catch {
        throw new Error('Error al eliminar productos')
      } finally {
        setIsDeleting(false)
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

  return (
    <Button onClick={onDeleteProducts} disabled={isDeleting}>
      Eliminar productos
    </Button>
  )
}
