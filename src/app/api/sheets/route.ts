import { GoogleSheetsService } from '@/lib/googleapis/sheets-service'
import { GOOGLE_SHEETS_PRODUCTS_RANGE } from '@/lib/googleapis/const'

export async function GET() {
  try {
    const sheets = new GoogleSheetsService()
    const data = await sheets.get(GOOGLE_SHEETS_PRODUCTS_RANGE)

    return Response.json({ status: 200, data })
  } catch (e) {
    console.log(e)
    return Response.json({ status: 400, message: 'Error getting spreadsheet data' })
  }
}
