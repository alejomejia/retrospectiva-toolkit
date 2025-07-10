'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { transformProductBeforeAdd, extractClothingTypeFromName } from '@/features/products/utils'
import { productSchema, type ProductSheetRecord } from '@/features/products/types'
import { updateProduct } from '@/features/products/actions'
import { useProducts } from '@/features/products/hooks/use-products'

type UseUpadteProductFormProps = {
  data: ProductSheetRecord
  onSubmit?: () => void
}

export function useUpdateProductForm({ data, onSubmit }: UseUpadteProductFormProps) {
  const { rawProducts } = useProducts()

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: data?.name || '',
      status: data?.status || 'new-with-label',
      price: data?.price || '',
      condition: data?.condition || 'perfect',
      size: data?.size || 'm',
      description: data?.description || '',
      type: data?.type || 'shirt',
      size_shoulder: data?.size_shoulder || '',
      size_chest: data?.size_chest || '',
      size_waist: data?.size_waist || '',
      size_hip: data?.size_hip || '',
      size_rise: data?.size_rise || '',
      size_leg: data?.size_leg || '',
      size_length: data?.size_length || ''
    }
  })

  // Watch for changes in the name field to auto-select clothing type (only for add mode)
  const productName = form.watch('name')

  // Watch for changes in the type field
  const productType = form.watch('type')

  // Auto-select clothing type based on product name (only for add mode)
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

    form.setValue('size_shoulder', '')
    form.setValue('size_chest', '')
    form.setValue('size_waist', '')
    form.setValue('size_hip', '')
    form.setValue('size_rise', '')
    form.setValue('size_leg', '')
    form.setValue('size_length', '')
  }, [productType, form])

  async function onFormSubmit(values: z.infer<typeof productSchema>) {
    const submitProduct = async () => {
      try {
        await updateProduct(data.id, transformProductBeforeAdd(values), rawProducts)
        onSubmit?.()
        return `${values.name} actualizado correctamente`
      } catch {
        throw new Error(`Error al actualizar producto`)
      }
    }

    // store the promise in a variable to avoid form state issues
    const submissionPromise = submitProduct()

    toast.promise(submissionPromise, {
      loading: 'Actualizando producto...',
      success: (message) => message,
      error: (error) => ({
        message: error.message,
        action: {
          label: 'Reintentar',
          onClick: () => onFormSubmit(values)
        }
      })
    })

    return await submissionPromise
  }

  function onError(errors: unknown) {
    console.log('Form validation errors:', errors)
    console.log('Form state:', form.formState)
  }

  return {
    form,
    onFormSubmit,
    onError,
    productType,
    isSubmitting: form.formState.isSubmitting
  }
}
