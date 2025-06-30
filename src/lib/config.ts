export const NODE_ENV = process.env.NODE_ENV ?? ''

export const JWT_SECRET = process.env.JWT_SECRET ?? ''
export const ALLOWED_USERS = process.env.ALLOWED_USERS ?? ''

export const GOOGLE_SHEETS_CLIENT_CONFIG = {
  projectId: process.env.GOOGLE_SHEETS_PROJECT_ID ?? '',
  privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY ?? '',
  clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL ?? '',
  clientId: process.env.GOOGLE_SHEETS_CLIENT_ID ?? ''
}

export const GOOGLE_SPREADSHEET_DB_ID = process.env.GOOGLE_SPREADSHEET_DB_ID ?? ''
