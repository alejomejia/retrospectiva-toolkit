'use server'

import { revalidateTag } from 'next/cache'
import { GoogleSheetsService } from '@/lib/googleapis/sheets-service'
import { getCurrentUser } from '@/features/users/utils.server'

import { GOOGLE_SHEETS_RANGES, PRODUCTS_COLUMNS_INDEXES } from './const'
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

  const user = await getCurrentUser()
  const sheets = new GoogleSheetsService()

  const record: ProductSheetRecord = {
    id: crypto.randomUUID(),
    ...product,
    created_at: new Date().toISOString(),
    updated_at: null,
    archive_at: null,
    deleted_at: null
  }

  const range = user?.role === 'col' ? GOOGLE_SHEETS_RANGES.GET_CO_PRODUCTS : GOOGLE_SHEETS_RANGES.GET_PRODUCTS
  await sheets.append(range, [Object.values(record)])

  // Revalidate the cache for products data
  revalidateTag('products')
}

/**
 * Updates an existing product in the Google Sheets database
 *
 * This function finds a product by ID and updates it with new data,
 * preserving the original creation timestamp and updating the updated_at field.
 *
 * @param productId - The unique ID of the product to update
 * @param product - The updated product data
 * @param rawProducts - The raw products data from the context (to avoid fetching again)
 * @returns Promise<void> - Resolves when the product has been successfully updated
 *
 * @throws {Error} If the product is not found or the update fails
 */
export const updateProduct = async (productId: string, product: Product, rawProducts: string[][]) => {
  if (!isProduct(product)) {
    throw new Error('Invalid product data')
  }

  const user = await getCurrentUser()
  const sheets = new GoogleSheetsService()

  if (!rawProducts || rawProducts.length === 0) {
    throw new Error('No products found')
  }

  // Find the product row by ID (assuming first row is headers)
  const productRowIndex = rawProducts.findIndex((row, index) => {
    if (index === 0) return false

    return row[PRODUCTS_COLUMNS_INDEXES.ID] === productId
  })

  if (productRowIndex === -1) {
    throw new Error('Product not found')
  }

  // Get the original product data
  const originalProduct = rawProducts[productRowIndex]

  const updatedRecord: ProductSheetRecord = {
    id: productId,
    ...product,
    created_at: originalProduct[PRODUCTS_COLUMNS_INDEXES.CREATED_AT], // Preserve original creation timestamp
    updated_at: new Date().toISOString(),
    archive_at: originalProduct[PRODUCTS_COLUMNS_INDEXES.ARCHIVE_AT] || null,
    deleted_at: originalProduct[PRODUCTS_COLUMNS_INDEXES.DELETED_AT] || null
  }

  // Update the specific row (adding 1 to convert from 0-based index to 1-based sheet row)
  const rowNumber = productRowIndex + 1
  const sheetName = user?.role === 'col' ? 'co-products' : 'products'
  const range = `${sheetName}!A${rowNumber}:T${rowNumber}`

  await sheets.update(range, [Object.values(updatedRecord)])

  // Revalidate the cache for products data
  revalidateTag('products')
}

/**
 * Deletes all products from the Google Sheets database
 *
 * This function deletes all products from the configured Google Sheets range for products.
 *
 * @returns Promise<void> - Resolves when the products have been successfully deleted
 */
export const deleteProducts = async () => {
  const user = await getCurrentUser()
  const sheets = new GoogleSheetsService()

  const range = user?.role === 'col' ? GOOGLE_SHEETS_RANGES.DELETE_CO_PRODUCTS : GOOGLE_SHEETS_RANGES.DELETE_PRODUCTS
  await sheets.delete(range)

  // Revalidate the cache for products data
  revalidateTag('products')
}
