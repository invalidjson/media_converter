import { FileUpload } from '@/components/file-upload'
import { ConversionHistory } from '@/components/conversion-history'

export default function Home() {
  return (
    <main className="min-h-screen bg-background-dark text-foreground-dark p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Media Converter
          </h1>
          <p className="text-muted-foreground text-lg">
            Convert your video and audio files with ease using FFMPEG
          </p>
        </header>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <FileUpload />
          </div>
          
          <div className="space-y-6">
            <ConversionHistory />
          </div>
        </div>
      </div>
    </main>
  )
}