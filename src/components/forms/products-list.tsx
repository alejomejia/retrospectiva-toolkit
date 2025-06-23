'use client'

import { useLocalStorage } from '@/hooks/use-local-storage'
import { z } from 'zod'
import { clothingTypesData, getClothingStatusLabel } from './const'

// Define the product schema to match the form schema
const productSchema = z.object({
  name: z.string().min(5),
  status: z.enum(['new', 'new-with-label', 'new-without-label', 'used']),
  price: z.number().min(1),
  is_deadstock: z.boolean(),
  details: z.string().optional(),
  type: z.enum([
    'shirt',
    'vest',
    'top',
    'sweater',
    'jacket',
    'trench-coat',
    'jean',
    'pant',
    'skirt',
    'short',
    'set',
    'overall',
    'dress',
    'bodysuit'
  ]),
  size_shoulder: z.number().optional(),
  size_chest: z.number().optional(),
  size_waist: z.number().optional(),
  size_hip: z.number().optional(),
  size_rise: z.number().optional(),
  size_leg: z.number().optional(),
  size_length: z.number().optional(),
  id: z.string(),
  submittedAt: z.string()
})

type Product = z.infer<typeof productSchema>

export function ProductsList() {
  const [products] = useLocalStorage<Product[]>('products', [])

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay productos guardados aún.</p>
      </div>
    )
  }

  const getClothingTypeLabel = (typeValue: Product['type']) => {
    const type = clothingTypesData.find((t) => t.value === typeValue)
    return type?.label || typeValue
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  const getMeasurements = (product: Product) => {
    const measurements = []
    if (product.size_shoulder) measurements.push(`Hombro: ${product.size_shoulder}cm`)
    if (product.size_chest) measurements.push(`Pecho: ${product.size_chest * 2}cm`)
    if (product.size_waist) measurements.push(`Cintura: ${product.size_waist * 2}cm`)
    if (product.size_hip) measurements.push(`Cadera: ${product.size_hip * 2}cm`)
    if (product.size_rise) measurements.push(`Tiro: ${product.size_rise}cm`)
    if (product.size_leg) measurements.push(`Pierna: ${product.size_leg * 2}cm`)
    if (product.size_length) measurements.push(`Largo: ${product.size_length}cm`)
    return measurements
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Productos Guardados</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {products.length} producto{products.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{product.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{formatPrice(product.price)}</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                    {getClothingTypeLabel(product.type)}
                  </span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                    {getClothingStatusLabel(product.status)}
                  </span>
                  {product.is_deadstock && (
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
                      Deadstock
                    </span>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 text-right">
                {formatDate(product.submittedAt)}
              </div>
            </div>

            {product.details && (
              <div className="mb-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{product.details}</p>
              </div>
            )}

            {getMeasurements(product).length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Medidas:</h4>
                <div className="flex flex-wrap gap-2">
                  {getMeasurements(product).map((measurement, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                    >
                      {measurement}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
