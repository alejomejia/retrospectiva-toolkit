'use server'

import { GoogleSheetsService } from './sheets-service'
import { GOOGLE_SHEETS_PRODUCTS_RANGE } from './const'
import type { Product } from './types'

export const addProduct = async (product: Product) => {
  const sheets = new GoogleSheetsService()

  const record = {
    id: crypto.randomUUID(),
    ...product
  }

  await sheets.append(GOOGLE_SHEETS_PRODUCTS_RANGE, [Object.values(record)])
}
