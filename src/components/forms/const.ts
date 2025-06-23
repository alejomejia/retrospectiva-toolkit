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

// Define the clothing status structure
export interface ClothingStatus {
  label: string
  value: ClothingStatusValue
}

// Define clothing status values as a union type for better type safety
export type ClothingStatusValue = 'new' | 'new-with-label' | 'new-without-label' | 'used'

// Define clothing statuses with their labels
export const clothingStatusData: ClothingStatus[] = [
  { label: 'Nuevo', value: 'new' },
  { label: 'Nuevo con etiqueta', value: 'new-with-label' },
  { label: 'Nuevo sin etiqueta', value: 'new-without-label' },
  { label: 'Usado', value: 'used' }
]

// Export just the values for the form schema
export const clothingStatusValues = clothingStatusData.map((status) => status.value)

// Helper function to get clothing status label by value
export const getClothingStatusLabel = (statusValue: ClothingStatusValue): string => {
  const status = clothingStatusData.find((s) => s.value === statusValue)
  return status?.label || statusValue
}

// Define clothing sizes values as a union type for better type safety
export type ClothingSizeValue = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'

// Define the clothing size structure
export interface ClothingSize {
  label: string
  value: ClothingSizeValue
}

// Define clothing sizes with their labels
export const clothingSizesData: ClothingSize[] = [
  { label: 'XS', value: 'xs' },
  { label: 'S', value: 's' },
  { label: 'M', value: 'm' },
  { label: 'L', value: 'l' },
  { label: 'XL', value: 'xl' },
  { label: 'XXL', value: 'xxl' }
]

// Export just the values for the form schema
export const clothingSizesValues = clothingSizesData.map((size) => size.value)
