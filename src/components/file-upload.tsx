'use client'

import { useState, useCallback } from 'react'
import { Upload, FileVideo, FileAudio, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { isVideoFile, isAudioFile, getSupportedOutputFormats, formatFileSize } from '@/lib/utils'
import { ConversionEngine } from './conversion-engine'
import { DownloadDialog } from './download-dialog'

interface UploadedFile {
  file: File
  preview?: string
}

export function FileUpload() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [outputFormat, setOutputFormat] = useState<string>('')
  const [isDragOver, setIsDragOver] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [conversionProgress, setConversionProgress] = useState(0)
  const [conversionResult, setConversionResult] = useState<{url: string; filename: string} | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const file = files[0]
    
    if (file && (isVideoFile(file.name) || isAudioFile(file.name))) {
      const uploadedFile: UploadedFile = { file }
      
      // Create preview for video files
      if (isVideoFile(file.name)) {
        const url = URL.createObjectURL(file)
        uploadedFile.preview = url
      }
      
      setUploadedFile(uploadedFile)
      setOutputFormat('')
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    
    if (file && (isVideoFile(file.name) || isAudioFile(file.name))) {
      const uploadedFile: UploadedFile = { file }
      
      // Create preview for video files
      if (isVideoFile(file.name)) {
        const url = URL.createObjectURL(file)
        uploadedFile.preview = url
      }
      
      setUploadedFile(uploadedFile)
      setOutputFormat('')
    }
  }, [])

  const removeFile = useCallback(() => {
    if (uploadedFile?.preview) {
      URL.revokeObjectURL(uploadedFile.preview)
    }
    if (conversionResult?.url) {
      URL.revokeObjectURL(conversionResult.url)
    }
    setUploadedFile(null)
    setOutputFormat('')
    setConversionProgress(0)
    setConversionResult(null)
  }, [uploadedFile, conversionResult])

  const handleDownload = useCallback((customFilename: string) => {
    if (!conversionResult) return
    
    const link = document.createElement('a')
    link.href = conversionResult.url
    link.download = customFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [conversionResult])

  const startConversion = useCallback(() => {
    if (!uploadedFile || !outputFormat) return
    
    setIsConverting(true)
    setConversionProgress(0)
    
    // This will be implemented with the ConversionEngine component
    console.log('Starting conversion:', {
      file: uploadedFile.file.name,
      outputFormat
    })
  }, [uploadedFile, outputFormat])

  const supportedFormats = uploadedFile ? getSupportedOutputFormats(uploadedFile.file.name) : []

  return (
    <Card className="w-full gruvbox-shadow hover:gruvbox-shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Upload className="h-4 w-4 text-primary" />
          </div>
          File Upload
        </CardTitle>
        <CardDescription className="text-sm">
          Drag and drop your video or audio files here, or click to browse
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              isDragOver
                ? 'border-primary bg-primary/10 gruvbox-shadow scale-105'
                : 'border-border/50 hover:border-primary/50 gruvbox-hover'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Drop your files here</p>
            <p className="text-sm text-muted-foreground mb-4">
              Supports: MP4, AVI, MKV, MOV, MP3, WAV, FLAC, AAC
            </p>
            <input
              type="file"
              accept="video/*,audio/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                {isVideoFile(uploadedFile.file.name) ? (
                  <FileVideo className="h-5 w-5 mt-0.5 text-primary" />
                ) : (
                  <FileAudio className="h-5 w-5 mt-0.5 text-secondary" />
                )}
                <div>
                  <p className="font-medium">{uploadedFile.file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                  {uploadedFile.preview && (
                    <video
                      src={uploadedFile.preview}
                      className="mt-2 w-48 h-32 object-cover rounded"
                      controls
                    />
                  )}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {supportedFormats.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Output Format</label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedFormats.map((format) => (
                      <SelectItem key={format} value={format}>
                        {format.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {isConverting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Converting...</span>
                  <span>{Math.round(conversionProgress)}%</span>
                </div>
                <Progress value={conversionProgress} />
              </div>
            )}

            <div className="flex gap-2">
              {!conversionResult ? (
                <Button
                  onClick={startConversion}
                  disabled={!outputFormat || isConverting}
                  className="flex-1"
                >
                  {isConverting ? 'Converting...' : 'Start Conversion'}
                </Button>
              ) : (
                <DownloadDialog
                  url={conversionResult.url}
                  originalFilename={uploadedFile.file.name}
                  outputFormat={outputFormat}
                  fileSize={uploadedFile.file.size}
                  onDownload={handleDownload}
                />
              )}
              {!isConverting && (
                <Button variant="outline" onClick={removeFile}>
                  {conversionResult ? 'Convert Another' : 'Remove File'}
                </Button>
              )}
            </div>
          </div>
        )}

        {uploadedFile && (
          <ConversionEngine
            inputFile={uploadedFile.file}
            outputFormat={outputFormat}
            onProgress={setConversionProgress}
            onComplete={(result) => {
              setIsConverting(false)
              setConversionProgress(100)
              setConversionResult(result)
              
              // Add to conversion history
              const conversionRecord = {
                inputFilename: uploadedFile.file.name,
                outputFilename: result.filename,
                inputFormat: uploadedFile.file.name.split('.').pop()?.toLowerCase() || '',
                outputFormat: outputFormat,
                fileSize: uploadedFile.file.size,
                status: 'completed' as const,
                downloadUrl: result.url
              }
              
              // Save to localStorage for history
              const existingHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]')
              const newHistory = [conversionRecord, ...existingHistory]
              localStorage.setItem('conversionHistory', JSON.stringify(newHistory))
              
              // Trigger a custom event to notify the history component
              window.dispatchEvent(new CustomEvent('conversionComplete', { detail: conversionRecord }))
              
              console.log('Conversion complete:', result)
            }}
            onError={(error) => {
              setIsConverting(false)
              setConversionProgress(0)
              console.error('Conversion error:', error)
              
              // You could add error handling UI here
              alert(`Conversion failed: ${error}`)
            }}
            isActive={isConverting}
          />
        )}
      </CardContent>
    </Card>
  )
}