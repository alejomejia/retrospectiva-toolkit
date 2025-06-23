export const GOOGLE_SHEETS_CONFIG = {
  projectId: process.env.GOOGLE_SHEETS_PROJECT_ID ?? '',
  privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY ?? '',
  clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL ?? '',
  clientId: process.env.GOOGLE_SHEETS_CLIENT_ID ?? ''
}

export const GOOGLE_SPREADSHEET_DB_ID = process.env.GOOGLE_SPREADSHEET_DB_ID ?? ''
