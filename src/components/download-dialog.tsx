'use client'

import { useState, useCallback } from 'react'
import { Download, FileText, FolderOpen } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DownloadDialogProps {
  url: string
  originalFilename: string
  outputFormat: string
  fileSize?: number
  onDownload: (customFilename: string) => void
}

export function DownloadDialog({
  url,
  originalFilename,
  outputFormat,
  fileSize,
  onDownload
}: DownloadDialogProps) {
  const [open, setOpen] = useState(false)
  const [customFilename, setCustomFilename] = useState(
    `${originalFilename.split('.')[0]}.${outputFormat}`
  )
  const [saveLocation, setSaveLocation] = useState('Downloads')

  const handleDownload = useCallback(() => {
    onDownload(customFilename)
    setOpen(false)
  }, [customFilename, onDownload])

  const handleSelectLocation = useCallback(async () => {
    // Use the File System Access API if available
    if ('showDirectoryPicker' in window) {
      try {
        const dirHandle = await (window as any).showDirectoryPicker()
        setSaveLocation(dirHandle.name || 'Selected Folder')
      } catch (error) {
        // User cancelled or API not supported
        console.log('Directory selection cancelled or not supported')
      }
    } else {
      // Fallback - just show a message
      alert('Directory selection not supported in this browser. File will be saved to your default Downloads folder.')
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gruvbox-hover">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Download Converted File
          </DialogTitle>
          <DialogDescription>
            Customize the filename and save location for your converted file.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* File preview */}
          <div className="p-4 rounded-lg gruvbox-bg-subtle gruvbox-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{originalFilename}</p>
                <p className="text-xs text-muted-foreground">
                  Converted to {outputFormat.toUpperCase()}
                  {fileSize && ` • ${Math.round(fileSize / 1024)} KB`}
                </p>
              </div>
              <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>

          {/* Custom filename */}
          <div className="space-y-2">
            <Label htmlFor="filename">Filename</Label>
            <Input
              id="filename"
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value)}
              placeholder="Enter custom filename"
            />
          </div>

          {/* Save location */}
          <div className="space-y-2">
            <Label htmlFor="location">Save Location</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                value={saveLocation}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleSelectLocation}
                title="Select save location"
              >
                <FolderOpen className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Note: Browser security may limit save location selection
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDownload} disabled={!customFilename.trim()}>
            <Download className="h-4 w-4 mr-2" />
            Download File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}