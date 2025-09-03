import {
  formatFileSize,
  getFileExtension,
  isVideoFile,
  isAudioFile,
  getSupportedOutputFormats
} from '@/lib/utils'

describe('Utils', () => {
  describe('formatFileSize', () => {
    test('formats bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1048576)).toBe('1 MB')
      expect(formatFileSize(1073741824)).toBe('1 GB')
    })

    test('formats with decimals', () => {
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(2097152)).toBe('2 MB')
    })
  })

  describe('getFileExtension', () => {
    test('extracts file extension correctly', () => {
      expect(getFileExtension('test.mp4')).toBe('mp4')
      expect(getFileExtension('video.avi')).toBe('avi')
      expect(getFileExtension('audio.MP3')).toBe('mp3')
      expect(getFileExtension('file.with.dots.mkv')).toBe('mkv')
    })

    test('handles files without extensions', () => {
      expect(getFileExtension('filename')).toBe('')
    })
  })

  describe('isVideoFile', () => {
    test('identifies video files correctly', () => {
      expect(isVideoFile('test.mp4')).toBe(true)
      expect(isVideoFile('video.avi')).toBe(true)
      expect(isVideoFile('movie.mkv')).toBe(true)
      expect(isVideoFile('clip.mov')).toBe(true)
      expect(isVideoFile('video.MP4')).toBe(true) // case insensitive
    })

    test('rejects non-video files', () => {
      expect(isVideoFile('audio.mp3')).toBe(false)
      expect(isVideoFile('document.pdf')).toBe(false)
      expect(isVideoFile('image.jpg')).toBe(false)
    })
  })

  describe('isAudioFile', () => {
    test('identifies audio files correctly', () => {
      expect(isAudioFile('song.mp3')).toBe(true)
      expect(isAudioFile('audio.wav')).toBe(true)
      expect(isAudioFile('music.flac')).toBe(true)
      expect(isAudioFile('track.aac')).toBe(true)
      expect(isAudioFile('audio.MP3')).toBe(true) // case insensitive
    })

    test('rejects non-audio files', () => {
      expect(isAudioFile('video.mp4')).toBe(false)
      expect(isAudioFile('document.pdf')).toBe(false)
      expect(isAudioFile('image.jpg')).toBe(false)
    })
  })

  describe('getSupportedOutputFormats', () => {
    test('returns video formats for video files', () => {
      expect(getSupportedOutputFormats('test.mp4')).toEqual(['mp4', 'avi', 'mkv', 'gif'])
      expect(getSupportedOutputFormats('video.avi')).toEqual(['mp4', 'avi', 'mkv', 'gif'])
    })

    test('returns audio formats for audio files', () => {
      expect(getSupportedOutputFormats('song.mp3')).toEqual(['mp3', 'flac'])
      expect(getSupportedOutputFormats('audio.wav')).toEqual(['mp3', 'flac'])
    })

    test('returns empty array for unsupported files', () => {
      expect(getSupportedOutputFormats('document.pdf')).toEqual([])
      expect(getSupportedOutputFormats('image.jpg')).toEqual([])
    })
  })
})