import { GoogleSheetsService } from '@/lib/googleapis/sheets-service'
import { ServiceError } from '@/lib/errors'

import { GOOGLE_SHEETS_RANGES } from './const'

/**
 * Fetches products from Google Sheets based on user role
 *
 * @param userRole - The user's role ('col' or other)
 * @returns Promise<string[][]> - Raw products data from Google Sheets
 */
export async function getProductsByRole(userRole: string | undefined): Promise<string[][]> {
  const range = userRole === 'col' ? GOOGLE_SHEETS_RANGES.GET_CO_PRODUCTS : GOOGLE_SHEETS_RANGES.GET_PRODUCTS

  try {
    const sheets = new GoogleSheetsService()
    return await sheets.get(range)
  } catch (e) {
    throw new ServiceError('Error fetching products', {
      error: e
    })
  }
}
