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
      price: '',
      condition: 'perfect',
      size: 'm',
      description: '',
      type: 'shirt',
      size_shoulder: '',
      size_chest: '',
      size_waist: '',
      size_hip: '',
      size_rise: '',
      size_leg: '',
      size_length: ''
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

    form.setValue('size_shoulder', '')
    form.setValue('size_chest', '')
    form.setValue('size_waist', '')
    form.setValue('size_hip', '')
    form.setValue('size_rise', '')
    form.setValue('size_leg', '')
    form.setValue('size_length', '')
  }, [productType, form])

  async function onFormSubmit(values: z.infer<typeof addProductSchema>) {
    const submitProduct = async () => {
      try {
        await addProduct(transformProductBeforeAdd(values))

        form.reset()
        onSubmit?.()

        return `${values.name} agregado correctamente`
      } catch {
        throw new Error('Error al agregar producto')
      }
    }

    // store the promise in a variable to avoid form state issues
    const submissionPromise = submitProduct()

    toast.promise(submissionPromise, {
      loading: 'Agregando producto...',
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
