import { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { transformProductBeforeAdd, extractClothingTypeFromName } from '../../utils'
import { addProductSchema } from '../../types'
import { addProduct } from '../../actions'

type UseAddProductFormProps = {
  onSubmit?: () => void
}

export function useAddProductForm({ onSubmit }: UseAddProductFormProps = {}) {
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: '',
      status: 'new-with-label',
      price: 0,
      condition: 'perfect',
      size: 'm',
      is_deadstock: false,
      details: '',
      type: 'shirt',
      size_shoulder: 0,
      size_chest: 0,
      size_waist: 0,
      size_hip: 0,
      size_rise: 0,
      size_leg: 0,
      size_length: 0
    }
  })

  // Watch for changes in the name field to auto-select clothing type
  const productName = form.watch('name')

  // Watch for changes in the type field
  const productType = form.watch('type')

  // Auto-select clothing type based on product name
  useEffect(() => {
    if (!productName) return

    const clothingType = extractClothingTypeFromName(productName)

    if (clothingType) {
      form.setValue('type', clothingType)
    }
  }, [productName, form])

  // Reset size_* values when type changes
  useEffect(() => {
    if (!productType) return

    form.setValue('size_shoulder', 0)
    form.setValue('size_chest', 0)
    form.setValue('size_waist', 0)
    form.setValue('size_hip', 0)
    form.setValue('size_rise', 0)
    form.setValue('size_leg', 0)
    form.setValue('size_length', 0)
  }, [productType, form])

  async function onFormSubmit(values: z.infer<typeof addProductSchema>) {
    const submitProduct = async () => {
      try {
        await addProduct(transformProductBeforeAdd(values))
        return `${values.name} agregado correctamente`
      } catch {
        throw new Error('Error al agregar producto')
      }
    }

    toast.promise(submitProduct(), {
      loading: 'Agregando producto...',
      success: (message) => {
        form.reset()
        onSubmit?.()
        return message
      },
      error: (error) => ({
        message: error.message,
        action: {
          label: 'Reintentar',
          onClick: () => onFormSubmit(values)
        }
      })
    })
  }

  function onError(errors: unknown) {
    console.log('Form validation errors:', errors)
    console.log('Form state:', form.formState)
  }

  return {
    form,
    onFormSubmit,
    onError,
    productType
  }
}
