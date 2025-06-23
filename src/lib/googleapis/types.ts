import { z } from 'zod'
import { addProductFormSchema } from '@/components/forms/create-product-form'

export type Product = z.infer<typeof addProductFormSchema>
