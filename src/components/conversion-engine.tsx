'use client'

import { useEffect, useRef, useState } from 'react'
import { ffmpegService } from '@/lib/services/ffmpeg-service'

interface ConversionEngineProps {
  inputFile: File
  outputFormat: string
  onProgress: (progress: number) => void
  onComplete: (result: { url: string; filename: string }) => void
  onError: (error: string) => void
  isActive: boolean
}

export function ConversionEngine({
  inputFile,
  outputFormat,
  onProgress,
  onComplete,
  onError,
  isActive
}: ConversionEngineProps) {
  const [isInitializing, setIsInitializing] = useState(false)
  const conversionRef = useRef<boolean>(false)

  useEffect(() => {
    if (!isActive || !inputFile || !outputFormat || conversionRef.current) return

    const startConversion = async () => {
      conversionRef.current = true
      
      try {
        setIsInitializing(true)
        onProgress(0)

        // Initialize FFMPEG (this may take a moment on first load)
        await ffmpegService.initialize()
        setIsInitializing(false)
        
        onProgress(5) // Show that initialization is complete

        // Start the actual conversion
        const result = await ffmpegService.convert({
          inputFile,
          outputFormat,
          onProgress: (progress) => {
            // Map progress from 5-95% (leaving 5% for init, 5% for cleanup)
            const adjustedProgress = Math.min(95, 5 + (progress * 0.9))
            onProgress(adjustedProgress)
          },
          onLog: (message) => {
            console.log('[Conversion]', message)
          }
        })

        if (result.success && result.blob && result.filename) {
          onProgress(100)
          
          // Create download URL
          const url = URL.createObjectURL(result.blob)
          
          onComplete({
            url,
            filename: result.filename
          })
        } else {
          throw new Error(result.error || 'Conversion failed')
        }
      } catch (error) {
        console.error('Conversion error:', error)
        onError(error instanceof Error ? error.message : 'Conversion failed')
      } finally {
        conversionRef.current = false
        setIsInitializing(false)
      }
    }

    startConversion()

    // Cleanup function
    return () => {
      conversionRef.current = false
    }
  }, [isActive, inputFile, outputFormat, onProgress, onComplete, onError])

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup will be handled by the parent component when it revokes URLs
    }
  }, [])

  // This component doesn't render anything visible
  // It's purely for handling the conversion logic
  return null
}