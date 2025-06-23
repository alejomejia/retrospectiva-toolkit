/**
 * Creates a custom error class factory with additional data support
 * @param {string} name - The name of the custom error class
 * @returns {Class} A custom Error class that accepts a message and additional data
 */

function createErrorFactory(name: string) {
  return class CustomError extends Error {
    data: Record<string, unknown>

    constructor(message: string, data: Record<string, unknown>) {
      super(message)
      this.name = name
      this.data = data
      this.stack = ''
    }
  }
}

export const EnvironmentVariablesError = createErrorFactory('EnvironmentVariablesError')
export const FileSystemError = createErrorFactory('FileSystemError')
export const FetchError = createErrorFactory('FetchError')
