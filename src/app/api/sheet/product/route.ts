import { GoogleSheetsService } from '@/lib/googleapis/sheets-service'
import { GOOGLE_SHEETS_RANGES } from '@/features/products/const'

export async function GET() {
  try {
    const sheets = new GoogleSheetsService()
    const data = await sheets.get(GOOGLE_SHEETS_RANGES.PRODUCTS)

    return Response.json({ status: 200, data })
  } catch (e) {
    console.log('ERROR: GET api/sheets/', e)
    return Response.json({ status: 400, message: 'Error getting spreadsheet data' })
  }
}
