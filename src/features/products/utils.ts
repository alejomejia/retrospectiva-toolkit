import {
  type ClothingType,
  type ProductType,
  type ProductMeasurement,
  type ClothingStatus,
  type ClothingSize,
  type ClothingCondition,
  Product
} from './types'

// Define clothing types with their categories and required measurements
export const clothingTypes: ClothingType[] = [
  // Upper body garments
  { label: 'Camisa', value: 'shirt', category: 'upper', measurements: ['shoulder', 'chest', 'length'] },
  { label: 'Chaleco', value: 'vest', category: 'upper', measurements: ['shoulder', 'chest', 'length'] },
  { label: 'Top', value: 'top', category: 'upper', measurements: ['shoulder', 'chest', 'length'] },
  { label: 'Jersey', value: 'sweater', category: 'upper', measurements: ['shoulder', 'chest', 'length'] },
  { label: 'Chaqueta', value: 'jacket', category: 'upper', measurements: ['shoulder', 'chest', 'length'] },
  { label: 'Gabardina', value: 'trench-coat', category: 'upper', measurements: ['shoulder', 'chest', 'length'] },

  // Lower body garments
  { label: 'Jean', value: 'jean', category: 'lower', measurements: ['waist', 'hip', 'rise', 'leg', 'length'] },
  { label: 'Pantalón', value: 'pant', category: 'lower', measurements: ['waist', 'hip', 'rise', 'leg', 'length'] },
  { label: 'Falda', value: 'skirt', category: 'lower', measurements: ['waist', 'hip', 'length'] },
  { label: 'Short', value: 'short', category: 'lower', measurements: ['waist', 'hip', 'rise', 'leg', 'length'] },

  // Complete garments
  {
    label: 'Set',
    value: 'set',
    category: 'complete',
    measurements: ['shoulder', 'chest', 'waist', 'hip', 'rise', 'leg', 'length']
  },
  {
    label: 'Mono',
    value: 'overall',
    category: 'complete',
    measurements: ['shoulder', 'chest', 'waist', 'hip', 'rise', 'leg', 'length']
  },
  {
    label: 'Vestido',
    value: 'dress',
    category: 'complete',
    measurements: ['shoulder', 'chest', 'waist', 'hip', 'length']
  },
  { label: 'Body', value: 'bodysuit', category: 'complete', measurements: [] }
]

// Export just the values for the form schema
export const clothingTypesValues = clothingTypes.map((type) => type.value)

// Helper function to get clothing types by category
export const getClothingTypesByCategory = (category: ClothingType['category']) =>
  clothingTypes.filter((type) => type.category === category)

// Helper function to get clothing type label by value
export const getClothingTypeLabel = (typeValue: ProductType): string => {
  const type = clothingTypes.find((t) => t.value === typeValue)
  return type?.label || typeValue
}

// Helper function to get required measurements for a clothing type
export const getClothingRequiredMeasurements = (clothingTypeValue: ProductType): ProductMeasurement[] => {
  const clothingType = clothingTypes.find((type) => type.value === clothingTypeValue)
  return clothingType?.measurements || []
}

// Helper function to check if a measurement is required for a clothing type
export const isClothingMeasurementRequired = (
  clothingTypeValue: ProductType,
  measurement: ProductMeasurement
): boolean => {
  return getClothingRequiredMeasurements(clothingTypeValue).includes(measurement)
}

// Define clothing statuses with their labels
export const clothingStatus: ClothingStatus[] = [
  { label: 'Nuevo con etiqueta', value: 'new-with-label' },
  { label: 'Nuevo sin etiqueta', value: 'new-without-label' },
  { label: 'Usado', value: 'used' }
]

// Export just the values for the form schema
export const clothingStatusValues = clothingStatus.map((status) => status.value)

// Helper function to get clothing status label by value
export const getClothingStatusLabel = (statusValue: ClothingStatus['value']): string => {
  const status = clothingStatus.find((s) => s.value === statusValue)
  return status?.label || statusValue
}

// Define clothing sizes with their labels
export const clothingSizes: ClothingSize[] = [
  { label: 'XS', value: 'xs' },
  { label: 'S', value: 's' },
  { label: 'M', value: 'm' },
  { label: 'L', value: 'l' },
  { label: 'XL', value: 'xl' },
  { label: 'XXL', value: 'xxl' }
]

// Export just the values for the form schema
export const clothingSizesValues = clothingSizes.map((size) => size.value)

// Helper function to get clothing size label by value
export const getClothingSizeLabel = (sizeValue: ClothingSize['value']): string => {
  const size = clothingSizes.find((s) => s.value === sizeValue)
  return size?.label || sizeValue
}

// Define clothing conditions with their labels
export const clothingConditions: ClothingCondition[] = [
  { label: 'Perfecto estado', value: 'perfect' },
  { label: 'Muy buen estado', value: 'very-good' },
  { label: 'Buen estado', value: 'good' }
]

// Export just the values for the form schema
export const clothingConditionsValues = clothingConditions.map((size) => size.value)

// Helper function to get clothing condition label by value
export const getClothingConditionsLabel = (conditionValue: ClothingCondition['value']): string => {
  const condition = clothingConditions.find((s) => s.value === conditionValue)
  return condition?.label || conditionValue
}

// Helper to multiply by 2 the following sizes: chest, waist, hip, leg
// and keep the object with the same structure
export const transformProductBeforeAdd = ({
  name,
  status,
  price,
  condition,
  size,
  description,
  type,
  size_shoulder,
  size_chest,
  size_waist,
  size_hip,
  size_rise,
  size_leg,
  size_length
}: Product) => {
  const multiplyBy2 = (size?: string): string => {
    if (size === '') return ''

    return String(Number(size) * 2)
  }

  const transformedProduct = {
    name,
    status,
    price,
    condition,
    size,
    description,
    type,
    size_shoulder,
    size_chest: multiplyBy2(size_chest),
    size_waist: multiplyBy2(size_waist),
    size_hip: multiplyBy2(size_hip),
    size_rise,
    size_leg: multiplyBy2(size_leg),
    size_length
  }

  return transformedProduct
}

// Helper function to extract clothing type from product name based on keywords
export const extractClothingTypeFromName = (productName: string): ProductType | null => {
  if (!productName) return null

  const normalizedName = productName.toLowerCase()

  // Define keywords for each clothing type
  const typeKeywords: Record<ProductType, string[]> = {
    shirt: ['camisa', 'camiseta', 'blusa'],
    vest: ['chaleco'],
    top: ['top', 'crop'],
    sweater: ['jersey', 'sweater'],
    jacket: ['chaqueta', 'jacket', 'americana', 'blazer'],
    'trench-coat': ['gabardina', 'trench'],
    jean: ['jean', 'vaquero'],
    pant: ['pantalon', 'trouser'],
    skirt: ['falda', 'skirt'],
    short: ['short', 'bermuda'],
    set: ['set', 'conjunto', 'outfit'],
    overall: ['mono', 'overall', 'peto'],
    dress: ['vestido', 'dress'],
    bodysuit: ['body', 'malla']
  }

  // Find matching clothing type
  for (const [typeValue, keywords] of Object.entries(typeKeywords)) {
    if (keywords.some((keyword) => normalizedName.includes(keyword))) {
      return typeValue as ProductType
    }
  }

  return null
}
