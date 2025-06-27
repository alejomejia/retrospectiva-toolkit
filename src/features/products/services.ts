import { GoogleSheetsService } from '@/lib/googleapis/sheets-service'
import { ServiceError } from '@/lib/errors'

import { GOOGLE_SHEETS_RANGES } from './const'

/**
 * Fetches all products from the Google Sheets database
 *
 * This function retrieves raw product data from the configured Google Sheets range
 * and returns it as a 2D array of strings. Each row represents a product record
 * with columns containing product information like name, description, price, etc.
 *
 * The function uses the GoogleSheetsService to connect to the Google Sheets API
 * and fetch data from the PRODUCTS range defined in the constants.
 *
 * @returns {Promise<string[][]>}
 * A promise that resolves to a 2D array of strings.
 * Each inner array represents a product row from the sheet.
 * The first row typically contains headers.
 *
 * @throws {ServiceError}
 * When there's an error connecting to Google Sheets API,
 * when the sheet is not accessible, or when the data cannot
 * be retrieved. The error includes the original error details
 * for debugging purposes.
 *
 * @example
 * ```typescript
 * try {
 *   const products = await getProducts()
 *   console.log(`Fetched ${products.length} product rows`)
 *   // products[0] contains headers
 *   // products[1] contains first product data
 * } catch (error) {
 *   console.error('Failed to fetch products:', error.message)
 * }
 * ```
 *
 * @see {@link GoogleSheetsService} The service used to interact with Google Sheets
 * @see {@link GOOGLE_SHEETS_RANGES.PRODUCTS} The sheet range being fetched
 * @see {@link ServiceError} The error type thrown on failure
 */
export async function getProducts(): Promise<string[][]> {
  try {
    const sheets = new GoogleSheetsService()
    return await sheets.get(GOOGLE_SHEETS_RANGES.PRODUCTS)
  } catch (e) {
    throw new ServiceError('Error fetching products', {
      error: e
    })
  }
}
