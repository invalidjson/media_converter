import { FileUpload } from '@/components/file-upload'
import { ConversionHistory } from '@/components/conversion-history'
import { ThemeToggle } from '@/components/theme-toggle'
import { Settings, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header with theme toggle */}
      <header className="border-b gruvbox-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Media Converter</h1>
                <p className="text-xs text-muted-foreground">FFMPEG-powered conversion</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="gruvbox-hover"
              >
                <a
                  href="https://github.com/invalidjson/media_converter"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Convert Your Media Files
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional video and audio conversion powered by FFMPEG.wasm. 
            Fast, secure, and runs entirely in your browser.
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2 xl:gap-12">
          <div className="space-y-6 animate-slide-in">
            <FileUpload />
          </div>
          
          <div className="space-y-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <ConversionHistory />
          </div>
        </div>

        {/* Features section */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="p-6 rounded-lg gruvbox-bg-subtle gruvbox-border text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">⚡</span>
            </div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Client-side conversion with real-time progress tracking
            </p>
          </div>
          
          <div className="p-6 rounded-lg gruvbox-bg-subtle gruvbox-border text-center">
            <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-secondary font-bold">🔒</span>
            </div>
            <h3 className="font-semibold mb-2">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">
              Your files never leave your device. No uploads required
            </p>
          </div>
          
          <div className="p-6 rounded-lg gruvbox-bg-subtle gruvbox-border text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-accent font-bold">🎯</span>
            </div>
            <h3 className="font-semibold mb-2">Multiple Formats</h3>
            <p className="text-sm text-muted-foreground">
              Support for MP4, AVI, MKV, GIF, MP3, FLAC and more
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t gruvbox-border bg-card/30">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          <p>Built with Next.js, FFMPEG.wasm, and Gruvbox theme • Open Source</p>
        </div>
      </footer>
    </main>
  )
}