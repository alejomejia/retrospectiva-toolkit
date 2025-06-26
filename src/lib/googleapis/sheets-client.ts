import { google } from 'googleapis'

import { GOOGLE_SHEETS_CONFIG } from '@/lib/config'
import { EnvironmentVariablesError } from '@/lib/errors'

let sheetsClient: any = null

export async function getGoogleSheetsClient() {
  // Return cached client if already initialized
  if (sheetsClient) {
    return sheetsClient
  }

  const { projectId, privateKey, clientEmail, clientId } = GOOGLE_SHEETS_CONFIG

  if (!projectId || !privateKey || !clientEmail || !clientId) {
    throw new EnvironmentVariablesError('Missing environment variables', {
      projectId,
      privateKey,
      clientEmail,
      clientId
    })
  }

  try {
    const auth = await google.auth.getClient({
      projectId,
      credentials: {
        type: 'service_account',
        private_key: privateKey,
        client_email: clientEmail,
        client_id: clientId,
        token_url: 'https://oauth2.googleapis.com/token',
        universe_domain: 'googleapis.com'
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    sheetsClient = google.sheets({ version: 'v4', auth })
    return sheetsClient
  } catch (error) {
    throw new Error(`Failed to initialize Google Sheets client: ${error}`)
  }
}

// Client resetter, useful for testing or re-authentication
export function resetGoogleSheetsClient() {
  sheetsClient = null
}
