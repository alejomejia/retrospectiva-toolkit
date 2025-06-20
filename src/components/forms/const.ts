// Define the clothing type values as a union type for better type safety
export type ClothingTypeValue =
  // upper
  | 'shirt'
  | 'vest'
  | 'top'
  | 'sweater'
  | 'jacket'
  | 'trench-coat'
  // lower
  | 'jean'
  | 'pant'
  | 'skirt'
  | 'short'
  // complete
  | 'set'
  | 'overall'
  | 'dress'
  | 'bodysuit'

// Define the measurement types
export type MeasurementType = 'shoulder' | 'chest' | 'waist' | 'hip' | 'rise' | 'leg' | 'length'

// Define the clothing type categories
export type ClothingTypeCategory = 'upper' | 'lower' | 'complete'

// Define the clothing type structure
export interface ClothingType {
  label: string
  value: ClothingTypeValue
  category: ClothingTypeCategory
  measurements: MeasurementType[]
}

// Define clothing types with their categories and required measurements
export const clothingTypesData: ClothingType[] = [
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
export const clothingTypesValues = clothingTypesData.map((type) => type.value)

// Helper function to get clothing types by category
export const getClothingTypesByCategory = (category: ClothingType['category']) =>
  clothingTypesData.filter((type) => type.category === category)

// Helper function to get required measurements for a clothing type
export const getRequiredMeasurements = (clothingTypeValue: ClothingTypeValue): MeasurementType[] => {
  const clothingType = clothingTypesData.find((type) => type.value === clothingTypeValue)
  return clothingType?.measurements || []
}

// Helper function to check if a measurement is required for a clothing type
export const isMeasurementRequired = (clothingTypeValue: ClothingTypeValue, measurement: MeasurementType): boolean => {
  return getRequiredMeasurements(clothingTypeValue).includes(measurement)
}

export const clothingStatusValues = ['new', 'new-with-label', 'new-without-label', 'used'] as const

export type ClothingStatusValue = (typeof clothingStatusValues)[number]

export const clothingStatusLabelsMap = {
  new: 'Nuevo',
  'new-with-label': 'Nuevo con etiqueta',
  'new-without-label': 'Nuevo sin etiqueta',
  used: 'Usado'
}
