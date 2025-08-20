# Technology Stack

## Framework & Runtime
- **Next.js 15**: React framework with App Router
- **React 18.3**: UI library with hooks and context
- **Node.js**: Runtime environment

## Build System & Tools
- **Turbopack**: Next.js 15 build system (stable)
- **TypeScript 5.8**: Type checking (mixed JS/TS codebase)
- **ESLint**: Code linting with Next.js config
- **Prettier**: Code formatting
- **Sass**: CSS preprocessing

## State Management & Data
- **Redux Toolkit**: Global state management
- **React Context**: Local state (translations, themes)
- **React Hooks**: Component state management

## UI & Styling
- **Bootstrap 5.3**: CSS framework
- **Bootstrap Icons**: Icon library
- **SCSS/Sass**: Styling approach
- **AOS**: Scroll animations
- **React Slick**: Carousel components
- **Swiper**: Modern slider library

## Key Libraries
- **Internationalization**: Custom translation context with JSON files
- **Maps**: Google Maps React integration
- **Charts**: Chart.js with React wrapper
- **Date Handling**: Day.js and React Multi Date Picker
- **Notifications**: Sonner (toast notifications)
- **Image Gallery**: PhotoSwipe with React wrapper
- **Modals**: React Modal Video
- **Forms**: RC Slider for range inputs

## Development Commands

```bash
# Development
npm run dev              # Start dev server on port 3100
npm run build           # Production build
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format with Prettier
npm run format:check    # Check Prettier formatting
npm run type-check      # TypeScript type checking

# Utilities
npm run analyze         # Bundle analysis
npm run clean           # Clean build artifacts
```

## Configuration Notes
- Custom port 3100 for development
- Remote image patterns configured for dev.kacc.mn
- Client-side Bootstrap loading for SSR compatibility
- Mixed JavaScript/TypeScript codebase (.jsx/.tsx)
- SCSS imports from public/sass directory