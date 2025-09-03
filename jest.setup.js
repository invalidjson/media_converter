import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'

// Ensure DOM is properly cleaned up after each test
afterEach(() => {
  cleanup()
})