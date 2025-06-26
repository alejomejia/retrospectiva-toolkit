import { z } from 'zod'
import { clothingConditionsValues, clothingSizesValues, clothingStatusValues, clothingTypesValues } from './utils'

// Collections
const statusCollection = ['new-with-label', 'new-without-label', 'used'] as const
const conditionCollection = ['perfect', 'very-good', 'good'] as const
const clothingSizeCollection = ['xs', 's', 'm', 'l', 'xl', 'xxl'] as const
const categoryCollection = ['upper', 'lower', 'complete'] as const
const measurementCollection = ['shoulder', 'chest', 'waist', 'hip', 'rise', 'leg', 'length'] as const
const clothingTypeCollection = [
  // upper body
  'shirt',
  'vest',
  'top',
  'sweater',
  'jacket',
  'trench-coat',
  // lower body
  'jean',
  'pant',
  'skirt',
  'short',
  // complete
  'set',
  'overall',
  'dress',
  'bodysuit'
] as const

// Define the clothing type values as a union type for better type safety
export type ProductStatus = (typeof statusCollection)[number]
export type ProductCondition = (typeof conditionCollection)[number]
export type ProductSize = (typeof clothingSizeCollection)[number]
export type ProductCategory = (typeof categoryCollection)[number]
export type ProductMeasurement = (typeof measurementCollection)[number]
export type ProductType = (typeof clothingTypeCollection)[number]

// Define the clothing type structure
export interface ClothingType {
  label: string
  value: ProductType
  category: ProductCategory
  measurements: ProductMeasurement[]
}

// Define the clothing status structure
export type ClothingStatus = {
  label: string
  value: ProductStatus
}

// Define the clothing size structure
export interface ClothingSize {
  label: string
  value: ProductSize
}

// Define the clothing condition structure
export interface ClothingCondition {
  label: string
  value: ProductCondition
}

// Zod Schemas
export const addProductSchema = z.object({
  name: z.string().min(5, {
    message: 'El nombre del producto debe tener al menos 5 caracteres'
  }),
  status: z.enum(clothingStatusValues as [ProductStatus], {
    required_error: 'Debes seleccionar un estado'
  }),
  price: z.coerce.number().min(1, {
    message: 'El precio del producto debe ser mayor a 0'
  }),
  condition: z.enum(clothingConditionsValues as [ProductCondition]),
  size: z.enum(clothingSizesValues as [ProductSize]),
  is_deadstock: z.boolean(),
  details: z.string().optional(),
  type: z.enum(clothingTypesValues as [ProductType]),
  size_shoulder: z.coerce.number().optional(),
  size_chest: z.coerce.number().optional(),
  size_waist: z.coerce.number().optional(),
  size_hip: z.coerce.number().optional(),
  size_rise: z.coerce.number().optional(),
  size_leg: z.coerce.number().optional(),
  size_length: z.coerce.number().optional()
})

export type Product = z.infer<typeof addProductSchema>

export type ProductSheetRecord = Product & {
  id: string
  created_at: string
  updated_at: string | null
  archive_at: string | null
  deleted_at: string | null
}

// Type guard to check if is Product
export const isProduct = (product: unknown): product is Product => {
  return addProductSchema.safeParse(product).success
}
