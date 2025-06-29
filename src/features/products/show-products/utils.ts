import { ProductSheetRecord } from '../types'
import { getClothingConditionsLabel, getClothingSizeLabel, getClothingStatusLabel } from '../utils'

export const transformRawProducts = (rawData: string[][]): ProductSheetRecord[] => {
  const [_headers, ...products] = rawData

  return products.map((product) => {
    const [
      id,
      name,
      status,
      price,
      condition,
      size,
      is_deadstock,
      details,
      type,
      size_shoulder,
      size_chest,
      size_waist,
      size_hip,
      size_rise,
      size_leg,
      size_length,
      created_at,
      updated_at,
      archive_at,
      deleted_at
    ] = product

    return {
      id: id as ProductSheetRecord['id'],
      name: name as ProductSheetRecord['name'],
      status: status as ProductSheetRecord['status'],
      price: parseFloat(price) || 0,
      condition: condition as ProductSheetRecord['condition'],
      size: size as ProductSheetRecord['size'],
      is_deadstock: is_deadstock === 'TRUE',
      details: details || '',
      type: type as ProductSheetRecord['type'],
      size_shoulder: size_shoulder ? parseFloat(size_shoulder) : undefined,
      size_chest: size_chest ? parseFloat(size_chest) : undefined,
      size_waist: size_waist ? parseFloat(size_waist) : undefined,
      size_hip: size_hip ? parseFloat(size_hip) : undefined,
      size_rise: size_rise ? parseFloat(size_rise) : undefined,
      size_leg: size_leg ? parseFloat(size_leg) : undefined,
      size_length: size_length ? parseFloat(size_length) : undefined,
      created_at: created_at ?? null,
      updated_at: updated_at ?? null,
      archive_at: archive_at ?? null,
      deleted_at: deleted_at ?? null
    }
  })
}

export const formatPrice = (price: ProductSheetRecord['price']) => {
  return `€${price}`
}

export const formatSize = (size: number) => {
  return size === 0 ? 'N/A' : `${size}cm`
}

export const createProductDescription = (product: ProductSheetRecord) => {
  const {
    name,
    status,
    price,
    condition,
    size,
    is_deadstock,
    details,
    size_shoulder,
    size_chest,
    size_waist,
    size_hip,
    size_rise,
    size_leg,
    size_length
  } = product

  const statusLabel = getClothingStatusLabel(status)
  const sizeLabel = getClothingSizeLabel(size)
  const priceLabel = formatPrice(price)
  const conditionLabel = getClothingConditionsLabel(condition)

  const measurements = [
    { label: 'Hombro a hombro', value: size_shoulder },
    { label: 'Pecho', value: size_chest },
    { label: 'Cintura', value: size_waist },
    { label: 'Cadera', value: size_hip },
    { label: 'Pierna', value: size_leg },
    { label: 'Tiro', value: size_rise },
    { label: 'Largo', value: size_length }
  ]
    .filter((measurement) => measurement.value !== 0)
    .map(({ label, value }) => `${label} ${value}cm`)
    .join('\n')

  const deadstockLabel = is_deadstock
    ? '✨ Esta es una prenda deadstock, es decir, de colecciones pasadas que nunca llegó a venderse ni usarse y se encuentra nueva.\n'
    : ''

  const deadstockSection = deadstockLabel ? `\n${deadstockLabel}` : ''
  const detailsSection = details ? `\n* ${details}` : ''

  return `🟢 DISPONIBLE - ${name} - ${statusLabel} - Talla ${sizeLabel}

Si te interesa envíanos un mensaje directo 😊

PRECIO: ${priceLabel}

📏 Medidas

${measurements}

* ${conditionLabel}\n${deadstockSection}${detailsSection}

📸 Las primeras fotos están editadas por estética. Las tomadas en el suelo muestran el color real.

📩 Si te interesa o tienes dudas, ¡envíanos un mensaje directo!
`
}
