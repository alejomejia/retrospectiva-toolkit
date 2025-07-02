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
      description,
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
      price: price as ProductSheetRecord['price'],
      condition: condition as ProductSheetRecord['condition'],
      size: size as ProductSheetRecord['size'],
      description: description || '',
      type: type as ProductSheetRecord['type'],
      size_shoulder: size_shoulder as ProductSheetRecord['size_shoulder'],
      size_chest: size_chest as ProductSheetRecord['size_chest'],
      size_waist: size_waist as ProductSheetRecord['size_waist'],
      size_hip: size_hip as ProductSheetRecord['size_hip'],
      size_rise: size_rise as ProductSheetRecord['size_rise'],
      size_leg: size_leg as ProductSheetRecord['size_leg'],
      size_length: size_length as ProductSheetRecord['size_length'],
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

export const formatSize = (size: string) => {
  return size === '' ? 'N/A' : `${size}cm`
}

export const productIsNew = (status: ProductSheetRecord['status']) => {
  return status === 'new-with-label' || status === 'new-without-label'
}

export const createProductDescription = (product: ProductSheetRecord) => {
  const {
    name,
    status,
    price,
    condition,
    size,
    description,
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
  const isNew = productIsNew(status)

  const measurements = [
    { label: 'Hombro a hombro', value: size_shoulder },
    { label: 'Pecho', value: size_chest },
    { label: 'Cintura', value: size_waist },
    { label: 'Cadera', value: size_hip },
    { label: 'Pierna', value: size_leg },
    { label: 'Tiro', value: size_rise },
    { label: 'Largo', value: size_length }
  ]
    .filter((measurement) => measurement.value !== '')
    .map(({ label, value }) => `${label} ${value}cm`)
    .join('\n')

  const deadstockLabel =
    '✨ Esta es una prenda deadstock, es decir, de colecciones pasadas que nunca llegó a venderse ni usarse y se encuentra nueva.\n'

  const deadstockSection = isNew ? `\n${deadstockLabel}` : ''
  const descriptionSection = description ? `\n* ${description}` : ''

  return `🟢 DISPONIBLE - ${name} - ${statusLabel} - Talla ${sizeLabel}

Si te interesa envíanos un mensaje directo 😊

PRECIO: ${priceLabel}

📏 Medidas

${measurements}

* ${conditionLabel}\n${deadstockSection}${descriptionSection}

📸 Las primeras fotos están editadas por estética. Las tomadas en el suelo muestran el color real.

🤖 La prenda es real, la modelo que la posa no. La imagen fue creada con IA y es solo una referencia para que te inspires en como combinarla. Cada pieza tiene su propio fit y estilo único 💃
`
}
