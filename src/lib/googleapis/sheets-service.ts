import { GOOGLE_SPREADSHEET_DB_ID } from '@/lib/config'

import { getGoogleSheetsClient } from './sheets-client'

export class GoogleSheetsService {
  private spreadsheetId: string

  constructor(spreadsheetId: string = GOOGLE_SPREADSHEET_DB_ID) {
    this.spreadsheetId = spreadsheetId
  }

  async get(range: string) {
    const sheets = await getGoogleSheetsClient()

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range
    })

    return response.data.values
  }

  async update(range: string, values: unknown[][]) {
    const sheets = await getGoogleSheetsClient()

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values
      }
    })

    return response.data
  }

  async append(range: string, values: unknown[][]) {
    const sheets = await getGoogleSheetsClient()

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values
      }
    })

    return response.data
  }

  async delete(range: string) {
    const sheets = await getGoogleSheetsClient()

    const response = await sheets.spreadsheets.values.clear({
      spreadsheetId: this.spreadsheetId,
      range
    })

    return response.data
  }
}
