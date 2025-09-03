# 🎬 Media Converter

[![CI](https://github.com/invalidjson/media_converter/actions/workflows/ci.yml/badge.svg)](https://github.com/invalidjson/media_converter/actions/workflows/ci.yml)
[![Deploy](https://github.com/invalidjson/media_converter/actions/workflows/deploy.yml/badge.svg)](https://github.com/invalidjson/media_converter/actions/workflows/deploy.yml)
[![Codecov](https://codecov.io/gh/invalidjson/media_converter/branch/main/graph/badge.svg)](https://codecov.io/gh/invalidjson/media_converter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![FFMPEG.wasm](https://img.shields.io/badge/FFMPEG.wasm-0.12-green?logo=ffmpeg)](https://ffmpegwasm.netlify.app/)

> **Professional video and audio conversion powered by FFMPEG.wasm. Fast, secure, and runs entirely in your browser.**

[🚀 **Live Demo**](https://media-converter.vercel.app) • [📋 **Features**](#features) • [🛠 **Installation**](#installation) • [🎯 **Usage**](#usage)

![Media Converter Screenshot](./public/screenshot.png)

---

## ✨ Features

### 🎥 **Media Conversion**
- **Video Formats**: MP4, AVI, MKV, MOV, GIF
- **Audio Formats**: MP3, WAV, FLAC, AAC
- **Real-time Progress**: Live conversion tracking with percentage
- **Format Detection**: Automatic input format recognition

### 🎨 **User Experience**
- **Drag & Drop**: Intuitive file upload interface
- **Custom Filenames**: Rename output files before download
- **Save Location**: Choose download directory with File System Access API
- **Conversion History**: Track all your conversions with timestamps
- **Responsive Design**: Works perfectly on desktop and mobile

### 🛡️ **Security & Privacy**
- **Client-Side Processing**: Files never leave your device
- **No Uploads**: Zero server dependency for conversion
- **HTTPS Secure**: End-to-end encrypted connections
- **No Data Collection**: Complete privacy protection

### 🎯 **Technical Excellence**
- **PWA Ready**: Install as desktop app
- **Dark/Light Theme**: Gruvbox material design
- **TypeScript**: Full type safety
- **Unit Tested**: Comprehensive test coverage
- **CI/CD Pipeline**: Automated testing and deployment

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern browser with SharedArrayBuffer support

### Installation

```bash
# Clone the repository
git clone https://github.com/invalidjson/media_converter.git
cd media_converter

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Development

### Available Scripts

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build
npm start

# Testing
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Code quality
npm run lint          # ESLint check
npx tsc --noEmit     # TypeScript check
```

### Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework | 14.2.32 |
| **TypeScript** | Type safety | 5.0+ |
| **Tailwind CSS** | Styling | 3.3+ |
| **shadcn/ui** | Component library | Latest |
| **FFMPEG.wasm** | Media processing | 0.12.15 |
| **Radix UI** | Headless components | Latest |
| **Jest** | Testing framework | 29.7+ |
| **Lucide React** | Icon library | 0.294+ |

### Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout with PWA config
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles with Gruvbox theme
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── file-upload.tsx   # Main upload interface
│   ├── conversion-engine.tsx # FFMPEG integration
│   ├── download-dialog.tsx   # Custom download UI
│   ├── conversion-history.tsx # History tracking
│   └── theme-toggle.tsx  # Dark/light mode switch
├── lib/                  # Utility functions
│   ├── services/        # Business logic
│   │   └── ffmpeg-service.ts # FFMPEG wrapper
│   └── utils.ts         # Helper functions
└── __tests__/           # Unit tests
```

---

## 🎯 Usage Guide

### Basic Conversion

1. **Upload File**: Drag and drop or click to select video/audio file
2. **Select Format**: Choose output format from supported options
3. **Start Conversion**: Click "Start Conversion" to begin processing
4. **Download**: Use custom filename and save location options

### Advanced Features

#### Custom Save Location
```javascript
// Uses File System Access API when available
const dirHandle = await window.showDirectoryPicker()
const fileHandle = await dirHandle.getFileHandle(filename, { create: true })
```

#### Conversion History
All conversions are automatically saved to localStorage and displayed in the history panel with:
- Input/output filenames
- File formats and sizes
- Conversion timestamps
- Download links (until page refresh)

#### PWA Installation
Click the install prompt or use browser's "Install App" option to add to desktop/home screen.

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage

- **Components**: UI component testing with React Testing Library
- **Services**: Business logic and FFMPEG integration
- **Utils**: Helper functions and format detection
- **E2E**: Critical user flows (planned)

Current coverage: **90%+** across all modules.

---

## 🚀 Deployment

### Automatic Deployment

The project uses GitHub Actions for CI/CD:

1. **CI Pipeline**: Runs on every push/PR
   - Lint checking
   - Type checking 
   - Unit tests with coverage
   - Security audit
   - Build verification

2. **Deploy Pipeline**: Runs on main branch
   - Production build
   - Vercel deployment
   - Lighthouse performance audit

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

---

## 🎨 Theming

### Gruvbox Material Design

The application uses a custom Gruvbox theme implementation with:

- **Dark Mode**: Warm, low-contrast colors for extended use
- **Light Mode**: High-contrast variant for bright environments
- **CSS Custom Properties**: Full shadcn/ui compatibility
- **Smooth Transitions**: Animated theme switching

### Color Palette

| Color | Dark | Light | Usage |
|-------|------|-------|-------|
| Background | `#282828` | `#fbf1c7` | Main background |
| Foreground | `#ebdbb2` | `#3c3836` | Primary text |
| Primary | `#d79921` | `#b57614` | Accent color |
| Secondary | `#689d6a` | `#79740e` | Secondary actions |
| Accent | `#fe8019` | `#af3a03` | Highlights |

---

## 📈 Performance

### Optimization Features

- **Turbopack**: Lightning-fast development builds
- **Static Generation**: Pre-rendered pages for optimal loading
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Analysis**: Automated bundle size tracking
- **Code Splitting**: Lazy-loaded components and routes
- **Service Worker**: PWA caching strategies

### Lighthouse Scores

| Metric | Score |
|--------|-------|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| PWA | ✅ |

---

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with tests
4. Run the test suite: `npm test`
5. Commit changes: `git commit -m 'feat: add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended config
- **Prettier**: Consistent formatting
- **Conventional Commits**: Semantic commit messages
- **Test Coverage**: 90%+ coverage required

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **FFMPEG.wasm**: Client-side media processing
- **Next.js Team**: Outstanding React framework
- **shadcn**: Beautiful component library
- **Gruvbox**: Iconic color scheme
- **Vercel**: Seamless deployment platform

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/invalidjson/media_converter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/invalidjson/media_converter/discussions)
- **Email**: [support@media-converter.dev](mailto:support@media-converter.dev)

---

<div align="center">

**[⬆ Back to Top](#-media-converter)**

Made with ❤️ by [invalidjson](https://github.com/invalidjson)

</div>