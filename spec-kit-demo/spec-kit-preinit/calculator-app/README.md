# Calculator Application

A modern, accessible web-based calculator with memory functions, calculation history, and full keyboard support.

## Features

- ✅ **Basic Arithmetic**: Addition, subtraction, multiplication, division with proper operator precedence
- 💾 **Memory Functions**: M+, M-, MR, MC with persistence
- 📜 **History**: Track up to 100 calculations with timestamps
- ⌨️ **Keyboard Support**: Full keyboard navigation and shortcuts
- ♿ **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🌓 **Dark Mode**: Automatic dark mode based on system preferences
- 🚀 **Fast**: <1s load time on 3G, <16ms calculation execution

## Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

```bash
# Run tests
npm test

# Run tests with UI
npm test:ui

# Run tests with coverage
npm test:coverage

# Run E2E tests
npm test:e2e

# Lint code
npm run lint

# Format code
npm run format

# Run accessibility audit
npm run accessibility
```

## Keyboard Shortcuts

### Numbers and Operators
- **0-9**: Input digits
- **. or ,**: Decimal point
- **+**: Addition
- **-**: Subtraction
- **\* or ×**: Multiplication
- **/ or ÷**: Division

### Actions
- **Enter or =**: Calculate result
- **Escape or c**: Clear current entry
- **Shift+C**: Clear all (AC)
- **Backspace or Delete**: Remove last digit

### Memory Operations
- **m**: Memory Recall (MR)
- **Shift+m**: Memory Add (M+)
- **Ctrl+m**: Memory Subtract (M-)
- **Alt+m**: Memory Clear (MC)

## Project Structure

```
calculator-app/
├── src/
│   ├── calculator/           # Core calculation logic
│   │   ├── Calculator.js     # Main calculator class
│   │   ├── OperationEngine.js # Expression evaluator
│   │   ├── MemoryManager.js  # Memory operations
│   │   └── DisplayFormatter.js # Number formatting
│   ├── state/                # State management
│   │   ├── CalculatorState.js # State machine
│   │   └── HistoryManager.js # History tracking
│   ├── ui/                   # UI components
│   │   ├── DisplayComponent.js # Display element
│   │   ├── ButtonGrid.js     # Button layout
│   │   └── HistoryPanel.js   # History panel
│   ├── input/                # Input handlers
│   │   └── KeyboardHandler.js # Keyboard support
│   ├── utils/                # Utilities
│   │   └── LocalStorage.js   # Storage abstraction
│   ├── config/               # Configuration
│   │   └── constants.js      # App constants
│   ├── styles/               # Styles
│   │   └── main.css          # Main stylesheet
│   ├── index.html            # HTML entry point
│   └── main.js               # JS entry point
├── tests/                    # Test files
│   ├── unit/                 # Unit tests
│   ├── integration/          # Integration tests
│   └── e2e/                  # E2E tests
├── package.json
├── vite.config.js
├── vitest.config.js
├── playwright.config.js
└── README.md
```

## Architecture

### State Management
- **CalculatorState**: Manages the calculator's internal state machine
- **MemoryManager**: Handles memory storage and operations
- **HistoryManager**: Tracks calculation history with persistence

### Calculation Engine
- **OperationEngine**: Two-stack algorithm for expression evaluation with operator precedence
- **DisplayFormatter**: Handles number formatting including scientific notation

### UI Components
- **DisplayComponent**: Dual-line display (expression + result) with ARIA live regions
- **ButtonGrid**: Calculator button layout with event delegation
- **HistoryPanel**: Responsive history panel (side drawer on desktop, bottom drawer on mobile)

### Input Handling
- **KeyboardHandler**: Comprehensive keyboard support with modifiers for memory operations

## Performance

- **Load Time**: <1s on 3G connection
- **Calculation**: <16ms execution time
- **Bundle Size**: <50KB gzipped
- **Accessibility**: WCAG 2.1 AA compliant

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility Features

- Semantic HTML with ARIA labels
- Keyboard navigation
- Screen reader support with live regions
- High contrast mode support
- Minimum 44×44px touch targets
- Focus indicators
- Reduced motion support

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Support

For issues and questions, please open an issue on GitHub.
