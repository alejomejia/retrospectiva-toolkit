'use client'

import { useState, useEffect } from 'react'

/**
 * A custom React hook to manage state synchronized with `localStorage`.
 *
 * @template T
 * @param {string} key - The key under which the value is stored in `localStorage`.
 * @param {T} initialValue - The initial value to be set if the key does not exist in `localStorage`.
 * @returns {[T, (value: T) => void, () => void]} - Returns the current value, a function to update the value, and a function to remove the value from `localStorage`.
 *
 * @example
 * const [name, setName, removeName] = useLocalStorage<string>('name', 'John Doe');
 *
 * setName('Jane Doe'); // Updates the localStorage value
 * removeName(); // Removes the key from localStorage
 */

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // State to track if we're on the client side and avoid SSR errors
  const [isClient, setIsClient] = useState(false)

  // Initialize the state from localStorage on the client side
  useEffect(() => {
    setIsClient(true)

    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error('Error reading localStorage key:', key, error)
    }
  }, [key])

  // Update localStorage when storedValue changes
  useEffect(() => {
    if (isClient) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      } catch (error) {
        console.error('Error setting localStorage key:', key, error)
      }
    }
  }, [key, storedValue, isClient])

  const removeStoredValue = () => {
    if (isClient) {
      try {
        window.localStorage.removeItem(key)
        setStoredValue(initialValue)
      } catch (error) {
        console.error('Error removing localStorage key:', key, error)
      }
    }
  }

  return [storedValue, setStoredValue, removeStoredValue] as const
}
