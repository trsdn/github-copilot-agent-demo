# Getting Started with Calculator App

## Quick Start Guide

### Prerequisites Check

First, verify if Node.js is installed:

```bash
node --version
npm --version
```

If not installed, install Node.js from https://nodejs.org/ (version 18.0.0 or higher).

### Installation Steps

1. **Navigate to the project directory**
   ```bash
   cd /Users/torstenmahr/GitHub/github-copilot-agent-demo-coba/spec-kit-demo/spec-kit-preinit/calculator-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install:
   - Vite (build tool)
   - Vitest (unit testing)
   - Playwright (E2E testing)
   - ESLint & Prettier (code quality)
   - And other dev dependencies

3. **Start development server**
   ```bash
   npm run dev
   ```
   The calculator will open automatically at http://localhost:3000

### Available Commands

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run unit tests
npm test:ui          # Run tests with UI
npm test:coverage    # Generate coverage report
npm test:e2e         # Run E2E tests (requires build first)
npm test:e2e:ui      # Run E2E tests with UI

# Code Quality
npm run lint         # Check for linting errors
npm run lint:fix     # Fix linting errors automatically
npm run format       # Format code with Prettier

# Accessibility
npm run accessibility # Run accessibility audit (after implementing script)
```

### First-Time Setup

After running `npm install`, you can immediately:

1. **Try the calculator**: `npm run dev`
2. **Run tests**: `npm test`
3. **Build production bundle**: `npm run build`

### Project Structure

```
calculator-app/
├── src/                    # Source code
│   ├── calculator/         # Core calculation logic
│   ├── state/             # State management
│   ├── ui/                # UI components
│   ├── input/             # Input handlers
│   ├── utils/             # Utilities
│   ├── config/            # Configuration
│   ├── styles/            # CSS
│   ├── index.html         # HTML entry
│   └── main.js            # JS entry
├── tests/                 # Test files
├── dist/                  # Build output (created after build)
└── node_modules/          # Dependencies (created after install)
```

### Testing the Calculator

Once running, try these features:

1. **Basic arithmetic**: Click numbers and operators, press =
2. **Keyboard input**: Type directly (e.g., "5+3=" or "5+3" then Enter)
3. **Memory**: Use M+, M-, MR, MC buttons
4. **History**: Click the 📋 button in top-right
5. **Keyboard shortcuts**: See README.md for full list

### Build for Production

```bash
npm run build
```

This creates optimized files in `dist/` folder:
- Minified JavaScript
- Minified CSS  
- Optimized HTML
- Source maps

Bundle size target: <50KB gzipped

### Deployment

After building, deploy the `dist/` folder to:
- **Netlify**: Drag-and-drop dist folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Push dist to gh-pages branch
- **AWS S3**: Upload dist contents to S3 bucket

### Troubleshooting

**Error: Cannot find module**
- Run `npm install` first

**Port 3000 already in use**
- Vite will automatically use next available port
- Or change port in vite.config.js

**Tests failing**
- Ensure all dependencies installed: `npm install`
- Clear cache: `rm -rf node_modules && npm install`

**Build size too large**
- Check vite.config.js terser options
- Review imported dependencies
- Run `npm run build` to see chunk sizes

### Next Steps

1. ✅ Install Node.js if needed
2. ✅ Run `npm install`
3. ✅ Run `npm run dev`
4. ✅ Open http://localhost:3000
5. ✅ Try the calculator!

For more details, see:
- `README.md` - Full documentation
- `IMPLEMENTATION_COMPLETE.md` - Implementation details
- `/specs/001-calculator-app/` - Original specifications
