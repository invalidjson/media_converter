import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

export interface ConversionOptions {
  inputFile: File
  outputFormat: string
  onProgress?: (progress: number) => void
  onLog?: (message: string) => void
}

export interface ConversionResult {
  success: boolean
  blob?: Blob
  filename?: string
  error?: string
}

class FFmpegService {
  private ffmpeg: FFmpeg | null = null
  private isLoaded = false

  async initialize(): Promise<void> {
    if (this.isLoaded) return

    this.ffmpeg = new FFmpeg()
    
    // Set up progress and log handlers
    this.ffmpeg.on('progress', ({ progress }) => {
      // Progress events will be handled per conversion
    })

    this.ffmpeg.on('log', ({ message }) => {
      console.log('[FFMPEG]', message)
    })

    // Load FFMPEG with WASM files from CDN
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    await this.ffmpeg.load({
      coreURL: `${baseURL}/ffmpeg-core.js`,
      wasmURL: `${baseURL}/ffmpeg-core.wasm`,
      workerURL: `${baseURL}/ffmpeg-core.worker.js`
    })

    this.isLoaded = true
  }

  async convert(options: ConversionOptions): Promise<ConversionResult> {
    const { inputFile, outputFormat, onProgress, onLog } = options

    try {
      // Initialize FFMPEG if not already done
      await this.initialize()

      if (!this.ffmpeg) {
        throw new Error('FFMPEG not initialized')
      }

      // Generate unique filenames
      const inputFilename = `input.${inputFile.name.split('.').pop()}`
      const outputFilename = `output.${outputFormat}`

      // Set up progress handler for this conversion
      const progressHandler = ({ progress }: { progress: number }) => {
        onProgress?.(Math.round(progress * 100))
      }

      // Set up log handler for this conversion
      const logHandler = ({ message }: { message: string }) => {
        onLog?.(message)
      }

      this.ffmpeg.on('progress', progressHandler)
      this.ffmpeg.on('log', logHandler)

      try {
        // Write input file to FFMPEG file system
        await this.ffmpeg.writeFile(inputFilename, await fetchFile(inputFile))

        // Run conversion based on format
        const conversionArgs = this.getConversionArgs(inputFilename, outputFilename, outputFormat)
        await this.ffmpeg.exec(conversionArgs)

        // Read the converted file
        const data = await this.ffmpeg.readFile(outputFilename) as Uint8Array
        
        // Create blob with appropriate MIME type
        const mimeType = this.getMimeType(outputFormat)
        const blob = new Blob([new Uint8Array(data)], { type: mimeType })

        // Clean up files
        await this.ffmpeg.deleteFile(inputFilename)
        await this.ffmpeg.deleteFile(outputFilename)

        return {
          success: true,
          blob,
          filename: `${inputFile.name.split('.')[0]}.${outputFormat}`
        }
      } finally {
        // Remove event listeners
        this.ffmpeg.off('progress', progressHandler)
        this.ffmpeg.off('log', logHandler)
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Conversion failed'
      }
    }
  }

  private getConversionArgs(inputFilename: string, outputFilename: string, outputFormat: string): string[] {
    const baseArgs = ['-i', inputFilename]

    switch (outputFormat) {
      case 'mp4':
        return [...baseArgs, '-c:v', 'libx264', '-c:a', 'aac', '-preset', 'fast', outputFilename]
      
      case 'avi':
        return [...baseArgs, '-c:v', 'libx264', '-c:a', 'mp3', outputFilename]
      
      case 'mkv':
        return [...baseArgs, '-c:v', 'libx264', '-c:a', 'aac', outputFilename]
      
      case 'gif':
        return [
          ...baseArgs,
          '-vf', 'fps=10,scale=320:-1:flags=lanczos,palettegen',
          '-t', '10', // Limit to 10 seconds
          'palette.png',
          '-i', inputFilename,
          '-i', 'palette.png',
          '-filter_complex', 'fps=10,scale=320:-1:flags=lanczos[v];[v][1:v]paletteuse',
          '-t', '10',
          outputFilename
        ]
      
      case 'mp3':
        return [...baseArgs, '-c:a', 'libmp3lame', '-b:a', '192k', outputFilename]
      
      case 'flac':
        return [...baseArgs, '-c:a', 'flac', outputFilename]
      
      default:
        return [...baseArgs, outputFilename]
    }
  }

  private getMimeType(format: string): string {
    const mimeTypes: Record<string, string> = {
      mp4: 'video/mp4',
      avi: 'video/x-msvideo',
      mkv: 'video/x-matroska',
      gif: 'image/gif',
      mp3: 'audio/mpeg',
      flac: 'audio/flac'
    }
    
    return mimeTypes[format] || 'application/octet-stream'
  }

  async terminate(): Promise<void> {
    if (this.ffmpeg) {
      await this.ffmpeg.terminate()
      this.ffmpeg = null
      this.isLoaded = false
    }
  }
}

// Export singleton instance
export const ffmpegService = new FFmpegService()