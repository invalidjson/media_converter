---
task: h-video-audio-converter
branch: feature/video-audio-converter
status: in-progress
created: 2025-09-03
modules: [frontend, conversion-engine, ui-components, testing, ci-cd]
---

# Video/Audio Converter Web App

## Problem/Goal
Build a comprehensive web application that converts video and audio files using FFMPEG, with a modern UI, progress tracking, and full CI/CD pipeline.

## Success Criteria
- [ ] File upload with format detection (video: mp4, avi, mkv, gif | audio: mp3, flac)
- [ ] FFMPEG integration with real-time progress tracking
- [ ] Material Gruvbox themed UI using Next.js, Tailwind, and shadcn
- [ ] Functional progress bar during conversion
- [ ] Custom filename and save location selection
- [ ] Desktop icon generation
- [ ] Complete Jest unit test coverage
- [ ] GitHub Actions CI/CD with test requirements
- [ ] Comprehensive README with badges and screenshot
- [ ] Nested context architecture with claude.md files

## Context Files
<!-- Will be populated as we build -->

## User Notes
- Repository: git@github.com:invalidjson/media_converter.git
- Must use FFMPEG for conversions
- Demands complete honesty in status updates
- All unit tests must pass before commits
- Commit and push after each feature completion

## Work Log
- [2025-09-03] Task created, starting with project initialization and GitHub setup