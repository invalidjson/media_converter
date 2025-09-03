import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConversionHistory } from '@/components/conversion-history'

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'mock-uuid-' + Math.random()
  }
})

describe('ConversionHistory', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test('shows empty state when no conversions exist', () => {
    render(<ConversionHistory />)
    
    expect(screen.getByText('Conversion History')).toBeInTheDocument()
    expect(screen.getByText('No conversions yet')).toBeInTheDocument()
    expect(screen.getByText('Upload and convert files to see them here')).toBeInTheDocument()
  })

  test('loads conversions from localStorage on mount', () => {
    const mockConversions = [
      {
        id: 'test-id',
        inputFilename: 'test.mp4',
        outputFilename: 'test.avi',
        inputFormat: 'mp4',
        outputFormat: 'avi',
        fileSize: 1024000,
        timestamp: new Date().toISOString(),
        status: 'completed' as const,
        downloadUrl: 'mock-url'
      }
    ]
    
    localStorage.setItem('conversionHistory', JSON.stringify(mockConversions))
    
    render(<ConversionHistory />)
    
    expect(screen.getByText('test.avi')).toBeInTheDocument()
    expect(screen.getByText('MP4 → AVI')).toBeInTheDocument()
    expect(screen.getByText('1000 KB')).toBeInTheDocument()
  })

  test('displays video and audio file icons correctly', () => {
    const mockConversions = [
      {
        id: 'video-id',
        inputFilename: 'video.mp4',
        outputFilename: 'video.avi',
        inputFormat: 'mp4',
        outputFormat: 'avi',
        fileSize: 1024000,
        timestamp: new Date().toISOString(),
        status: 'completed' as const
      },
      {
        id: 'audio-id',
        inputFilename: 'audio.wav',
        outputFilename: 'audio.mp3',
        inputFormat: 'wav',
        outputFormat: 'mp3',
        fileSize: 512000,
        timestamp: new Date().toISOString(),
        status: 'completed' as const
      }
    ]
    
    localStorage.setItem('conversionHistory', JSON.stringify(mockConversions))
    
    render(<ConversionHistory />)
    
    expect(screen.getByText('video.avi')).toBeInTheDocument()
    expect(screen.getByText('audio.mp3')).toBeInTheDocument()
  })

  test('shows download button for completed conversions with download URL', () => {
    const mockConversions = [
      {
        id: 'test-id',
        inputFilename: 'test.mp4',
        outputFilename: 'test.avi',
        inputFormat: 'mp4',
        outputFormat: 'avi',
        fileSize: 1024000,
        timestamp: new Date().toISOString(),
        status: 'completed' as const,
        downloadUrl: 'mock-download-url'
      }
    ]
    
    localStorage.setItem('conversionHistory', JSON.stringify(mockConversions))
    
    render(<ConversionHistory />)
    
    // Find the download button by finding a button that contains the download icon
    const buttons = screen.getAllByRole('button')
    const downloadButton = buttons.find(button => button.innerHTML.includes('lucide-download'))
    expect(downloadButton).toBeInTheDocument()
  })

  test('shows processing indicator for processing conversions', () => {
    const mockConversions = [
      {
        id: 'test-id',
        inputFilename: 'test.mp4',
        outputFilename: 'test.avi',
        inputFormat: 'mp4',
        outputFormat: 'avi',
        fileSize: 1024000,
        timestamp: new Date().toISOString(),
        status: 'processing' as const
      }
    ]
    
    localStorage.setItem('conversionHistory', JSON.stringify(mockConversions))
    
    render(<ConversionHistory />)
    
    // Check for processing spinner (it should have animate-spin class)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  test('clears history when clear button is clicked', async () => {
    const user = userEvent.setup()
    const mockConversions = [
      {
        id: 'test-id',
        inputFilename: 'test.mp4',
        outputFilename: 'test.avi',
        inputFormat: 'mp4',
        outputFormat: 'avi',
        fileSize: 1024000,
        timestamp: new Date().toISOString(),
        status: 'completed' as const
      }
    ]
    
    localStorage.setItem('conversionHistory', JSON.stringify(mockConversions))
    
    render(<ConversionHistory />)
    
    expect(screen.getByText('test.avi')).toBeInTheDocument()
    
    const clearButton = screen.getByText('Clear History')
    
    await act(async () => {
      await user.click(clearButton)
    })
    
    expect(screen.getByText('No conversions yet')).toBeInTheDocument()
    expect(screen.queryByText('test.avi')).not.toBeInTheDocument()
  })

  test.skip('triggers download when download button is clicked', async () => {
    const user = userEvent.setup()
    
    // Mock createElement and appendChild/removeChild
    const mockLink = {
      href: '',
      download: '',
      click: jest.fn()
    }
    
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any)
    const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any)
    const removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any)
    
    const mockConversions = [
      {
        id: 'test-id',
        inputFilename: 'test.mp4',
        outputFilename: 'test.avi',
        inputFormat: 'mp4',
        outputFormat: 'avi',
        fileSize: 1024000,
        timestamp: new Date().toISOString(),
        status: 'completed' as const,
        downloadUrl: 'mock-download-url'
      }
    ]
    
    localStorage.setItem('conversionHistory', JSON.stringify(mockConversions))
    
    render(<ConversionHistory />)
    
    // Find the download button by finding a button that contains the download icon
    const buttons = screen.getAllByRole('button')
    const downloadButton = buttons.find(button => button.innerHTML.includes('lucide-download'))
    
    if (downloadButton) {
      await act(async () => {
        await user.click(downloadButton)
      })
      
      expect(createElementSpy).toHaveBeenCalledWith('a')
      expect(mockLink.href).toBe('mock-download-url')
      expect(mockLink.download).toBe('test.avi')
      expect(mockLink.click).toHaveBeenCalled()
      expect(appendChildSpy).toHaveBeenCalledWith(mockLink)
      expect(removeChildSpy).toHaveBeenCalledWith(mockLink)
    } else {
      throw new Error('Download button not found')
    }
    
    // Cleanup
    createElementSpy.mockRestore()
    appendChildSpy.mockRestore()
    removeChildSpy.mockRestore()
  })

  test.skip('handles malformed localStorage data gracefully', () => {
    localStorage.setItem('conversionHistory', 'invalid-json')
    
    // Should not throw and should show empty state
    render(<ConversionHistory />)
    
    expect(screen.getByText('No conversions yet')).toBeInTheDocument()
  })
})