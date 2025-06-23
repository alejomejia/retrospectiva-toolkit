# Google Sheets API Setup Guide

This guide will walk you through setting up Google Sheets API access for your application.

## Prerequisites

- A Google account
- Access to Google Cloud Console

## Step-by-Step Setup

### 1. Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Create a new project or select an existing one

### 2. Enable Google Sheets API

1. From the project dashboard, navigate to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click on "Google Sheets API" from the results
4. Click **Enable**

### 3. Create a Service Account

1. From the project dashboard, go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the service account details:
   - **Service account name**: Choose a descriptive name (e.g., "sheets-api-service")
   - **Service account ID**: Will be auto-generated
   - **Description**: Optional description of the service account's purpose
4. Click **Create and Continue**
5. Skip the optional steps (grant access, grant users access) and click **Done**

### 4. Generate API Key

1. In the **Credentials** page, find your newly created service account
2. Click on the service account email (format: `your-service-name@project-id.iam.gserviceaccount.com`)
3. Go to the **Keys** tab
4. Click **Add Key** > **Create new key**
5. Select **JSON** as the key type
6. Click **Create**
7. The JSON key file will automatically download to your computer

### 5. Set Up Environment Variables

1. Open the downloaded JSON key file
2. In your project, create a `.env` file (if it doesn't exist)
3. Add the following environment variables from the downloaded JSON:

```env
GOOGLE_SHEETS_PROJECT_ID=""
GOOGLE_SHEETS_PRIVATE_KEY=""
GOOGLE_SHEETS_CLIENT_EMAIL=""
GOOGLE_SHEETS_CLIENT_ID=""
```

### 6. Create and Share Google Sheet

1. Go to [Google Sheets](https://docs.google.com/spreadsheets)
2. Create a new spreadsheet or use an existing one
3. Add some sample data to test with
4. Click the **Share** button in the top right
5. Add your service account email (from step 3) with **Editor** permissions
6. Click **Send** (no need to send an email notification)

### 7. Get Sheet ID

1. Open your Google Sheet
2. The Sheet ID is in the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
3. Copy the Sheet ID for use in your application

## Environment Variables Reference

```env
# Required
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'

# Optional (if not using service account key)
GOOGLE_API_KEY=your_api_key_here
```

## Security Best Practices

- ✅ Store your service account key securely (use environment variables)
- ✅ Never commit API keys to version control
- ✅ Use the principle of least privilege when sharing sheets
- ✅ Regularly rotate your service account keys
- ❌ Don't share your service account key publicly
- ❌ Don't hardcode API keys in your source code

## Troubleshooting

### Common Issues

1. **"Access denied" error**: Ensure the service account email has access to the sheet
2. **"API not enabled" error**: Make sure Google Sheets API is enabled in your project
3. **"Invalid credentials" error**: Verify your service account key is correctly formatted

### Getting Help

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Console Help](https://cloud.google.com/docs)
- [Service Account Best Practices](https://cloud.google.com/iam/docs/service-accounts)

---

That's it! You now have successfully set up Google Sheets API access for the application. 🎉
