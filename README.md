# websitebuildtools.com — VectorForge

> **All-in-One SVG, Favicon & Asset Studio (100% Client-Side)**

VectorForge is a high-performance, privacy-first web application for vector manipulation, favicon generation, asset conversion, and SVG optimization running **100% in-browser** with zero server dependencies.

---

## ⚡ Features

- **Logo & Icon Studio:**
  - Shapes: Squircle, Circle, Square, Hexagon, Shield, Transparent
  - Curated gradient presets & mesh glow
  - Searchable catalog of 800+ Lucide vector icons
  - Photo / raster image uploads with shape clipping
  - Multi-word & multi-line brand typography with precise up/down positioning
  - High-DPI raster exports up to 4096px (8x Ultra-HD)
- **Production Favicon & App Icon Suite:**
  - Multi-platform live simulators: Browser Tab (Dark/Light), Google SERP, iOS Home Screen, Android Adaptive, Windows Taskbar
  - 1-Click ZIP bundle download (`favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `android-chrome`, `site.webmanifest`)
  - Copy-paste `<head>` HTML snippet generator
- **SVG Optimizer & Cleaner (SVGOMG-inspired):**
  - Strips metadata, editor tags, comments, hidden layers
  - Coordinate decimal precision rounding
  - Live byte savings counter (-50%+ reduction)
  - Side-by-side visual diff and code editor
- **Conversion Hub:**
  - SVG to PNG (High-DPI 1x-8x)
  - SVG to JPG (Custom background fill & quality slider)
  - SVG to ICO (Pure client-side multi-size binary encoder)
  - PNG to SVG (Client-side vectorization / auto-tracing)
  - SVG to CSS Data URI (URL-encoded & Base64)
  - Multi-file batch processing with ZIP export

---

## 🛠️ Tech Stack

- **Framework:** Vite + React 19 + TypeScript
- **Styling:** Tailwind CSS + custom dark-mode design system
- **Routing:** React Router v7
- **Key Libraries:** JSZip, FileSaver, Lucide React, Canvas Confetti

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/ammyskamble/websitebuildtools.com.git

# Navigate into directory
cd websitebuildtools.com

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🔒 Privacy & Security

VectorForge operates **100% client-side**. All rendering, rasterization, vector tracing, and zip bundling execute on your local device via HTML5 Canvas and Web Workers. No files or assets are uploaded to any external server.
