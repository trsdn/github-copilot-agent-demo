<!--
SYNC IMPACT REPORT
==================
Version Change: Initial → 1.0.0
Ratification: 2025-11-13 (initial adoption)

Modified Principles: N/A (initial creation)
Added Sections:
  - User Experience First
  - Accessibility by Design (WCAG 2.1 AA)
  - Clean Code Architecture
  - Performance & Responsiveness
  - Progressive Enhancement
  - Technology Stack Standards
  - Quality Gates & Testing
  
Templates Status:
  ✅ plan-template.md - Constitution Check section aligns with all 5 principles
  ✅ spec-template.md - User scenarios support accessibility and UX requirements
  ✅ tasks-template.md - Task structure supports incremental user story delivery
  
Follow-up TODOs: None
-->

# Calculator Web App Constitution

## Core Principles

### I. User Experience First

Every feature and interaction MUST prioritize clarity and ease of use over technical complexity.

**Non-negotiable rules**:

- Interface MUST be intuitive enough for first-time users without documentation
- Visual feedback MUST be immediate for all user interactions (<100ms response)
- Error states MUST be communicated clearly with actionable guidance
- Layout MUST remain functional across all screen sizes (mobile-first responsive design)
- No feature ships if it increases cognitive load without proportional value

**Rationale**: A calculator's primary value is in removing friction from arithmetic tasks.
Any UI complexity that slows down basic operations defeats the core purpose.

### II. Accessibility by Design (WCAG 2.1 AA)

Accessibility MUST be built-in from the start, not retrofitted. The calculator MUST be
usable by people with diverse abilities including visual, motor, and cognitive differences.

**Non-negotiable rules**:

- All interactive elements MUST be keyboard navigable with visible focus indicators
- Color contrast MUST meet WCAG 2.1 AA standards (minimum 4.5:1 for text)
- Screen readers MUST announce all operations, results, and state changes
- Touch targets MUST be minimum 44×44px for motor accessibility
- Text MUST be resizable up to 200% without loss of functionality
- No reliance on color alone to convey information

**Rationale**: 15% of the global population experiences some form of disability.
Accessible design expands reach and often improves usability for all users.

### III. Clean Code Architecture

Code MUST be modular, maintainable, and self-documenting. Complexity requires explicit
justification and documentation.

**Non-negotiable rules**:

- Separation of concerns: UI components, calculation logic, and state management
  MUST be in separate, testable modules
- Functions MUST do one thing; if a function name requires "and", refactor it
- Magic numbers and strings MUST be named constants with clear intent
- Dependencies MUST be minimal; every external library requires justification
- Code review MUST verify adherence to project style guide and architecture patterns

**Rationale**: Calculators are deceptively complex (precision, operator precedence,
edge cases). Clean architecture prevents bug accumulation and enables confident iteration.

### IV. Performance & Responsiveness

The application MUST feel instant. Perceived performance is as important as measured
performance.

**Non-negotiable rules**:

- Initial page load MUST complete in <2 seconds on 3G connections
- Calculation execution MUST complete in <16ms (60 fps threshold)
- Bundle size MUST remain under 50KB (gzipped) for core functionality
- No render-blocking resources in critical path
- Performance budgets MUST be monitored in CI; regressions block merges

**Rationale**: Users expect calculators to be faster than mental math. Any lag creates
friction and drives users away.

### V. Progressive Enhancement

Core arithmetic functionality MUST work without JavaScript. Enhanced features layer on
top for capable browsers.

**Non-negotiable rules**:

- Basic operations (+, -, ×, ÷) MUST function with JavaScript disabled
- HTML forms MUST provide fallback calculation mechanism
- CSS MUST handle all visual presentation; no inline styles in JavaScript
- Features MUST degrade gracefully when browser APIs unavailable
- Test matrix MUST include no-JS scenarios

**Rationale**: Progressive enhancement ensures reliability, improves accessibility, and
provides resilience against script failures or blockers.

## Technology Stack Standards

**Frontend Stack**:

- HTML5 with semantic markup for accessibility
- CSS3 with custom properties (variables) for theming
- Vanilla JavaScript (ES6+) or TypeScript for type safety
- No framework dependency for core calculator (justify any framework usage)

**Build Tools**:

- Module bundler: Vite or Rollup (optimized for small bundle size)
- Testing: Vitest or Jest for unit tests, Playwright for E2E
- Linting: ESLint with accessibility plugins (eslint-plugin-jsx-a11y if using JSX)
- Code formatting: Prettier with project-consistent config

**Browser Support**:

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- Graceful degradation for older browsers
- Mobile browsers: iOS Safari, Chrome Mobile

**Deployment**:

- Static hosting (CDN-friendly)
- HTTPS mandatory in production
- Service worker for offline capability (optional enhancement)

## Quality Gates & Testing

**Constitution Compliance Check** (MUST pass before Phase 0 research):

1. **User Experience First**: Does the feature spec include user scenarios with measurable
   usability criteria?
2. **Accessibility**: Are WCAG 2.1 AA requirements documented in acceptance criteria?
3. **Clean Architecture**: Is the proposed module structure clear and justified?
4. **Performance**: Are performance budgets and targets specified?
5. **Progressive Enhancement**: Is the no-JS fallback path documented?

**Testing Requirements**:

- Unit tests MUST cover all calculation logic with edge cases (divide by zero, overflow,
  precision limits)
- Integration tests MUST verify keyboard navigation and screen reader announcements
- Visual regression tests MUST catch unintended UI changes
- Performance tests MUST validate bundle size and render timing
- Accessibility audits MUST be automated (axe-core or similar)

**Definition of Done**:

- [ ] All acceptance criteria met and independently testable
- [ ] Unit test coverage ≥90% for calculation logic
- [ ] Accessibility audit passes with zero violations
- [ ] Performance budget met (bundle size, load time)
- [ ] Cross-browser testing passed on target browsers
- [ ] Code review approved by at least one maintainer
- [ ] Documentation updated (if public APIs changed)

## Governance

This constitution supersedes all other development practices. Any deviation requires
explicit justification, documentation, and approval from project maintainers.

**Amendment Process**:

1. Proposed changes MUST be documented with rationale and impact analysis
2. Changes require consensus from maintainers (or majority vote if specified)
3. Version MUST be incremented per semantic versioning rules
4. Migration plan MUST be provided for breaking governance changes
5. All dependent templates and docs MUST be updated before merge

**Versioning Policy**:

- **MAJOR**: Removal or backward-incompatible changes to core principles
- **MINOR**: Addition of new principles or material expansion of guidance
- **PATCH**: Clarifications, wording improvements, non-semantic fixes

**Compliance Review**:

- All pull requests MUST include constitution compliance checklist
- Automated checks MUST enforce performance budgets and accessibility standards
- Quarterly reviews MUST assess whether principles remain relevant and effective
- Violations MUST be documented in complexity tracking with mitigation plans

**Living Document**: This constitution evolves with the project. Principles that no longer
serve the project's goals MUST be amended rather than ignored.

**Version**: 1.0.0 | **Ratified**: 2025-11-13 | **Last Amended**: 2025-11-13
