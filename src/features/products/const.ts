// Google Sheets constants
export const GOOGLE_SHEETS_RANGES = {
  GET_PRODUCTS: 'products!A1:T',
  GET_CO_PRODUCTS: 'co-products!A1:T',
  DELETE_PRODUCTS: 'products!A2:T',
  DELETE_CO_PRODUCTS: 'co-products!A2:T'
}

// Products columns indexes
export const PRODUCTS_COLUMNS_INDEXES = {
  ID: 0,
  NAME: 1,
  STATUS: 2,
  PRICE: 3,
  CONDITION: 4,
  SIZE: 5,
  DESCRIPTION: 6,
  TYPE: 7,
  SIZE_SHOULDER: 8,
  SIZE_CHEST: 9,
  SIZE_WAIST: 10,
  SIZE_HIP: 11,
  SIZE_RISE: 12,
  SIZE_LEG: 13,
  SIZE_LENGTH: 14,
  CREATED_AT: 15,
  UPDATED_AT: 16,
  ARCHIVE_AT: 17,
  DELETED_AT: 18
} as const
