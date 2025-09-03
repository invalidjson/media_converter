import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getFileExtension(filename: string): string {
  const dotIndex = filename.lastIndexOf('.')
  if (dotIndex === -1 || dotIndex === 0) return ''
  return filename.slice(dotIndex + 1).toLowerCase()
}

export function isVideoFile(filename: string): boolean {
  const videoExtensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm', 'm4v']
  return videoExtensions.includes(getFileExtension(filename))
}

export function isAudioFile(filename: string): boolean {
  const audioExtensions = ['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg', 'wma']
  return audioExtensions.includes(getFileExtension(filename))
}

export function getSupportedOutputFormats(inputFile: string): string[] {
  if (isVideoFile(inputFile)) {
    return ['mp4', 'avi', 'mkv', 'gif']
  } else if (isAudioFile(inputFile)) {
    return ['mp3', 'flac']
  }
  return []
}