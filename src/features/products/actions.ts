'use server'

import { revalidateTag } from 'next/cache'
import { GoogleSheetsService } from '@/lib/googleapis/sheets-service'

import { GOOGLE_SHEETS_RANGES } from './const'
import { isProduct, type Product, type ProductSheetRecord } from './types'

/**
 * Adds a new product to the Google Sheets database
 *
 * This function creates a new product record with a unique ID and timestamps,
 * then appends it to the configured Google Sheets range for products.
 *
 * @param product - The product data to add, containing all required product fields
 * @returns Promise<void> - Resolves when the product has been successfully added to the sheet
 *
 * @example
 * ```typescript
 * const newProduct = {
 *   name: 'Sample Product',
 *   description: 'A sample product description',
 *   // ... other product fields
 * }
 *
 * await addProduct(newProduct)
 * ```
 *
 * @throws {Error} If the Google Sheets API call fails or the product cannot be added
 */
export const addProduct = async (product: Product) => {
  if (!isProduct(product)) {
    throw new Error('Invalid product data')
  }

  const sheets = new GoogleSheetsService()

  const record: ProductSheetRecord = {
    id: crypto.randomUUID(),
    ...product,
    created_at: new Date().toISOString(),
    updated_at: null,
    archive_at: null,
    deleted_at: null
  }

  await sheets.append(GOOGLE_SHEETS_RANGES.GET_PRODUCTS, [Object.values(record)])

  // Revalidate the cache for products data
  revalidateTag('products')
}

export const deleteProducts = async () => {
  const sheets = new GoogleSheetsService()

  await sheets.delete(GOOGLE_SHEETS_RANGES.DELETE_PRODUCTS)

  // Revalidate the cache for products data
  revalidateTag('products')
}
