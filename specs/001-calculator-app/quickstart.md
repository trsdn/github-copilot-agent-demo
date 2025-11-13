# Quick Start Guide

**Feature**: Web-Based Calculator (001-calculator-app)  
**Last Updated**: 2025-11-13

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: Latest version
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

## Initial Setup

### 1. Clone and Navigate

```bash
git checkout 001-calculator-app
cd /path/to/project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development Server

```bash
npm run dev
```

Opens at `http://localhost:5173`

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Production build (output to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm test` | Run all tests (unit + integration) |
| `npm run test:unit` | Run unit tests only (Vitest) |
| `npm run test:e2e` | Run E2E tests (Playwright) |
| `npm run test:a11y` | Run accessibility audits (axe-core) |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Project Structure

```
src/
├── index.html          # Entry point
├── scripts/
│   ├── main.js         # Application init
│   ├── calculator/     # Core logic
│   ├── state/          # State management
│   ├── ui/             # UI components
│   └── input/          # Event handlers
├── styles/
│   └── main.css        # Styles
tests/
├── unit/               # Unit tests
├── integration/        # Integration tests
└── e2e/                # End-to-end tests
```

## Development Workflow

1. **Create Feature Branch**: Already on `001-calculator-app`
2. **Make Changes**: Edit files in `src/`
3. **Test Locally**: `npm run dev` to see changes
4. **Run Tests**: `npm test` before committing
5. **Check Accessibility**: `npm run test:a11y`
6. **Build**: `npm run build` to verify production build

## Testing

### Unit Tests (Vitest)

```bash
# Run all unit tests
npm run test:unit

# Watch mode
npm run test:unit -- --watch

# Coverage
npm run test:unit -- --coverage
```

### E2E Tests (Playwright)

```bash
# Run E2E tests
npm run test:e2e

# Debug mode
npm run test:e2e -- --debug

# Specific browser
npm run test:e2e -- --project=chromium
```

## Constitution Compliance Checks

Before committing, verify:

- ✅ **UX First**: <100ms interaction feedback
- ✅ **Accessibility**: Run `npm run test:a11y` (must pass 100%)
- ✅ **Performance**: Bundle size <50KB (`npm run build` shows size)
- ✅ **Clean Code**: No lint errors (`npm run lint`)

## Troubleshooting

### Dev Server Won't Start

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tests Failing

```bash
# Update snapshots if UI changed
npm run test:unit -- -u
```

### Build Size Too Large

```bash
# Analyze bundle
npm run build
# Check dist/bundle.js.gz size (must be <50KB)
```

## Next Steps

1. Review `/specs/001-calculator-app/spec.md` for requirements
2. Check `/specs/001-calculator-app/data-model.md` for state structure
3. See `/specs/001-calculator-app/contracts/` for interfaces
4. Run `/speckit.tasks` to generate task breakdown
5. Start implementing per task priorities

## Support

- **Spec**: `/specs/001-calculator-app/spec.md`
- **Plan**: `/specs/001-calculator-app/plan.md`
- **Constitution**: `/.specify/memory/constitution.md`
