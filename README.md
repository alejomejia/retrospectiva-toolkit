# Retrospectiva Toolkit

A modern toolkit for managing Retrospectiva Store using Google Sheets as a database.

## Overview

Retrospectiva Toolkit is a Next.js application that helps our team do some store normal day to day tasks. The application uses **Google Sheets as its database**, providing a familiar and accessible way to store and manage data.

## Tech Stack

- **Framework**: Next.js 15 with TypeScript and App Router
- **UI Components**: Shadcn
- **Forms**: React Hook Form with Zod validation
- **Database**: Google Sheets API
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm
- Google account for Google Sheets API setup

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd retrospectiva-toolkit
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up Google Sheets API:

- Follow the [Google Sheets API Setup Guide](./docs/setup-google-sheets-api.md)
- Configure your environment variables

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

This project uses **Google Sheets as its primary database**. This approach provides several benefits:

- ✅ **No complex database setup required**
- ✅ **Familiar interface for data management**
- ✅ **Easy backup and sharing capabilities**
- ✅ **Real-time collaboration features**
- ✅ **No hosting costs for database**

### Setup Instructions

To configure Google Sheets as your database, follow the detailed setup guide:

📖 **[Google Sheets API Setup Guide](./docs/setup-google-sheets-api.md)**

This guide includes:

- Google Cloud Console setup
- Service account creation
- API key generation
- Environment variable configuration
- Security best practices

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Sheets API Configuration
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
GOOGLE_SHEET_ID=your_sheet_id_here
```

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Project Structure

```
retrospectiva-toolkit/
├── docs/                    # Documentation
│   └── setup-google-sheets-api.md
├── src/                     # Source code
├── public/                  # Static assets
├── components.json          # UI components configuration
└── README.md               # This file
```

## License

This project is private and proprietary.

---

Built with ❤️ using Next.js and Google Sheets API
