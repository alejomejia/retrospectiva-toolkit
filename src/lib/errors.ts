/**
 * Creates a custom error class factory with additional data support and proper stack trace handling
 * @param {string} name - The name of the custom error class
 * @returns {CustomErrorClass} A custom Error class that accepts a message and optional additional data
 *
 * @example
 * // Simple error
 * const MyError = createErrorFactory('MyError')
 * throw new MyError("Something went wrong")
 *
 * @example
 * // Error with additional data
 * const ValidationError = createErrorFactory('ValidationError')
 * throw new ValidationError("Validation failed", {
 *   field: "email",
 *   value: "invalid-email"
 * })
 *
 * @example
 * // Error with error code and data
 * const APIError = createErrorFactory('APIError')
 * throw new APIError("API request failed",
 *   { url: "/api/users", status: 404 },
 *   "USER_NOT_FOUND"
 * )
 *
 * @example
 * // Using utility methods
 * try {
 *   throw new ServiceError("Database error", { table: "users" }, "DB_CONNECTION_FAILED")
 * } catch (error) {
 *   if (error instanceof ServiceError && error.hasCode("DB_CONNECTION_FAILED")) {
 *     const table = error.getData<string>("table")
 *     console.log(`Database error on table: ${table}`)
 *     console.log(`Error occurred at: ${error.timestamp}`)
 *     console.log(`Formatted: ${error.toString()}`)
 *   }
 * }
 *
 * @example
 * // Serializing error for logging
 * const error = new FetchError("Network timeout", { timeout: 5000 })
 * console.log(JSON.stringify(error.toJSON(), null, 2))
 */
function createErrorFactory(name: string) {
  return class CustomError extends Error {
    readonly name: string
    readonly data?: Record<string, unknown>
    readonly timestamp: string
    readonly errorCode?: string

    constructor(message: string, data?: Record<string, unknown>, errorCode?: string) {
      super(message)
      this.name = name
      this.data = data
      this.timestamp = new Date().toISOString()
      this.errorCode = errorCode

      // Maintains proper prototype chain for instanceof checks
      Object.setPrototypeOf(this, new.target.prototype)

      // Capture stack trace, excluding constructor call from it (if supported)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError)
      }
    }

    /**
     * Returns a structured representation of the error
     */
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        data: this.data,
        timestamp: this.timestamp,
        errorCode: this.errorCode,
        stack: this.stack
      }
    }

    /**
     * Returns a formatted string representation of the error
     */
    toString(): string {
      const baseString = `${this.name}: ${this.message}`
      const details = []

      if (this.errorCode) {
        details.push(`Code: ${this.errorCode}`)
      }

      if (this.data && Object.keys(this.data).length > 0) {
        details.push(`Data: ${JSON.stringify(this.data)}`)
      }

      return details.length > 0 ? `${baseString} (${details.join(', ')})` : baseString
    }

    /**
     * Checks if this error matches a specific error code
     */
    hasCode(code: string): boolean {
      return this.errorCode === code
    }

    /**
     * Gets a specific data property with type safety
     */
    getData<T = unknown>(key: string): T | undefined {
      return this.data?.[key] as T | undefined
    }
  }
}

// Error class type for better TypeScript support
export type CustomErrorClass = new (message: string, data?: Record<string, unknown>, errorCode?: string) => Error & {
  readonly name: string
  readonly data?: Record<string, unknown>
  readonly timestamp: string
  readonly errorCode?: string
  toJSON(): object
  toString(): string
  hasCode(code: string): boolean
  getData<T = unknown>(key: string): T | undefined
}

export const EnvironmentVariablesError = createErrorFactory('EnvironmentVariablesError')
export const FileSystemError = createErrorFactory('FileSystemError')
export const FetchError = createErrorFactory('FetchError')
export const ServiceError = createErrorFactory('ServiceError')
export const AuthenticationError = createErrorFactory('AuthenticationError')
