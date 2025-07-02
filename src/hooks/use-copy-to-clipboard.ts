'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

const DEFAULT_RESET_TIMEOUT = 2000

type CopyToClipboardOptions = {
  /**
   * Custom toast message to show when copied successfully
   */
  successMessage?: string
  /**
   * Custom toast message to show when copy fails
   */
  errorMessage?: string
  /**
   * Additional callback to execute after copying
   */
  onCopy?: () => void
  /**
   * Time in milliseconds to keep the copied state active
   */
  resetTimeout?: number
}

/**
 * A custom React hook to handle copy to clipboard functionality.
 *
 * @param {CopyToClipboardOptions} options - Configuration options for the hook
 * @returns {{ isCopied: boolean, copyToClipboard: (text: string, options?: CopyToClipboardOptions) => Promise<void> }} - Returns the copied state and copy function
 *
 * @example
 * const [isCopied, copyToClipboard] = useCopyToClipboard();
 *
 * const handleCopy = () => {
 *   copyToClipboard('Hello World', {
 *     successMessage: 'Text copied!',
 *     onCopy: () => console.log('Additional action after copy')
 *   });
 * };
 */
export function useCopyToClipboard(defaultOptions: CopyToClipboardOptions = {}) {
  const { resetTimeout } = defaultOptions

  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false)
      }, resetTimeout ?? DEFAULT_RESET_TIMEOUT)

      return () => clearTimeout(timeout)
    }
  }, [isCopied, resetTimeout])

  const copyToClipboard = useCallback(
    async (text: string, options: CopyToClipboardOptions = {}) => {
      const mergedOptions = { ...defaultOptions, ...options }

      try {
        await navigator.clipboard.writeText(text)
        setIsCopied(true)

        // Show success toast
        const successMessage = mergedOptions.successMessage ?? 'Copiado al portapapeles'
        toast.success(successMessage)

        // Execute additional callback if provided
        if (mergedOptions.onCopy) {
          mergedOptions.onCopy()
        }
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)

        // Show error toast
        const errorMessage = mergedOptions.errorMessage ?? 'Error al copiar al portapapeles'
        toast.error(errorMessage)
      }
    },
    [defaultOptions]
  )

  return { isCopied, copyToClipboard } as const
}
