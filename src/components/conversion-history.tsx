'use client'

import { useState, useEffect } from 'react'
import { Download, FileVideo, FileAudio, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatFileSize, isVideoFile } from '@/lib/utils'

interface ConversionRecord {
  id: string
  inputFilename: string
  outputFilename: string
  inputFormat: string
  outputFormat: string
  fileSize: number
  timestamp: Date
  status: 'completed' | 'processing' | 'failed'
  downloadUrl?: string
}

export function ConversionHistory() {
  const [conversions, setConversions] = useState<ConversionRecord[]>([])

  // Load conversion history from localStorage on mount
  useEffect(() => {
    const savedConversions = localStorage.getItem('conversionHistory')
    if (savedConversions) {
      try {
        const parsed = JSON.parse(savedConversions)
        setConversions(parsed.map((conv: any) => ({
          ...conv,
          timestamp: new Date(conv.timestamp)
        })))
      } catch (error) {
        console.error('Failed to load conversion history:', error)
      }
    }
  }, [])

  // Save to localStorage whenever conversions change
  useEffect(() => {
    if (conversions.length > 0) {
      localStorage.setItem('conversionHistory', JSON.stringify(conversions))
    }
  }, [conversions])

  const addConversion = (record: Omit<ConversionRecord, 'id' | 'timestamp'>) => {
    const newRecord: ConversionRecord = {
      ...record,
      id: crypto.randomUUID(),
      timestamp: new Date()
    }
    setConversions(prev => [newRecord, ...prev])
  }

  const downloadFile = (conversion: ConversionRecord) => {
    if (!conversion.downloadUrl) return

    const link = document.createElement('a')
    link.href = conversion.downloadUrl
    link.download = conversion.outputFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearHistory = () => {
    setConversions([])
    localStorage.removeItem('conversionHistory')
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Conversion History
            </CardTitle>
            <CardDescription>
              Track your recent file conversions
            </CardDescription>
          </div>
          {conversions.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearHistory}>
              Clear History
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {conversions.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No conversions yet</p>
            <p className="text-sm text-muted-foreground">
              Upload and convert files to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {conversions.map((conversion) => (
              <div
                key={conversion.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isVideoFile(conversion.inputFilename) ? (
                    <FileVideo className="h-4 w-4 text-primary" />
                  ) : (
                    <FileAudio className="h-4 w-4 text-secondary" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {conversion.outputFilename}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        {conversion.inputFormat.toUpperCase()} → {conversion.outputFormat.toUpperCase()}
                      </span>
                      <span>•</span>
                      <span>{formatFileSize(conversion.fileSize)}</span>
                      <span>•</span>
                      <span>{conversion.timestamp.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {conversion.status === 'completed' && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {conversion.status === 'processing' && (
                    <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  )}
                  {conversion.status === 'completed' && conversion.downloadUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadFile(conversion)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}