import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Media Converter - FFMPEG Powered',
  description: 'Professional video and audio conversion powered by FFMPEG.wasm. Fast, secure, and runs entirely in your browser.',
  keywords: ['video converter', 'audio converter', 'ffmpeg', 'media conversion', 'online converter'],
  authors: [{ name: 'Media Converter Team' }],
  creator: 'Media Converter',
  publisher: 'Media Converter',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://media-converter.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Media Converter - FFMPEG Powered',
    description: 'Professional video and audio conversion powered by FFMPEG.wasm',
    url: 'https://media-converter.vercel.app',
    siteName: 'Media Converter',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Media Converter App Screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Converter - FFMPEG Powered',
    description: 'Professional video and audio conversion powered by FFMPEG.wasm',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf1c7' },
    { media: '(prefers-color-scheme: dark)', color: '#282828' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Media Converter" />
        <meta name="application-name" content="Media Converter" />
        <meta name="msapplication-TileColor" content="#282828" />
        <meta name="theme-color" content="#282828" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#fbf1c7" media="(prefers-color-scheme: light)" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}