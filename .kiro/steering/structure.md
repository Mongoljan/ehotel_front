# Project Structure

## Next.js App Router Structure
```
app/
├── (activity)/          # Activity-related pages (grouped route)
├── (blogs)/             # Blog pages (grouped route)
├── (car)/               # Car rental pages (grouped route)
├── (cruise)/            # Cruise pages (grouped route)
├── (dashboard)/         # User/vendor dashboards (grouped route)
├── (flight)/            # Flight pages (grouped route)
├── (homes)/             # Homepage variants (grouped route)
├── (hotel)/             # Hotel pages (grouped route)
├── (others)/            # Utility pages (404, about, contact, etc.)
├── (rental)/            # Property rental pages (grouped route)
├── (tour)/              # Tour pages (grouped route)
├── layout.jsx           # Root layout with providers
├── page.jsx             # Homepage (redirects to home_1)
└── not-found.jsx        # 404 page
```

## Component Organization
```
components/
├── [service-name]/      # Service-specific components (hotels, tours, etc.)
├── [service-name]-list/ # List view components for each service
├── [service-name]-single/ # Detail view components for each service
├── common/              # Shared/reusable components
├── data/                # Static data and mock data
├── header/              # Header variants and navigation
├── footer/              # Footer variants
├── hero/                # Hero section variants
├── layout/              # Layout wrapper components
└── ui/                  # Base UI components
```

## Key Directories

### `/contexts/`
- React Context providers (Translation, Theme)
- Global state management outside Redux

### `/data/` & `/components/data/`
- Static data files (hotels.js, tours.js, etc.)
- Mock data for development
- Duplicate structure (legacy - prefer `/data/`)

### `/locales/`
- Translation files (en.json, mn.json)
- Structured JSON for internationalization

### `/services/`
- API integration layers
- External service connections

### `/store/`
- Redux store configuration
- Feature slices (currently minimal)

### `/features/`
- Redux Toolkit slices organized by feature
- Currently only hero/findPlaceSlice

### `/utils/`
- Helper functions and utilities
- Text matching, link checking, etc.

### `/public/`
- Static assets (images, fonts, sass)
- SCSS source files in `/public/sass/`

## Naming Conventions

### Files & Components
- **Components**: PascalCase (e.g., `HotelList.jsx`)
- **Pages**: lowercase with hyphens (e.g., `hotel-list-v1`)
- **Utilities**: camelCase (e.g., `isTextMatched.js`)
- **Data files**: camelCase (e.g., `hotels.js`)

### Route Groups
- Parentheses for logical grouping: `(hotel)`, `(dashboard)`
- Version suffixes: `-v1`, `-v2`, `-v3` for variants
- Dynamic routes: `[id]` for parameters

### Component Structure
- One component per file
- Default export preferred
- Co-located styles when using CSS modules
- Shared components in `/common/`

## Architecture Patterns

### Page Structure
1. **Layout**: Root layout with providers
2. **Route Groups**: Logical service grouping
3. **Page Components**: Minimal, compose from components
4. **Component Composition**: Build pages from reusable parts

### State Management
- **Global**: Redux for complex app state
- **Context**: Translations, themes, user preferences  
- **Local**: React hooks for component state
- **Server**: Next.js for data fetching

### Styling Approach
- Bootstrap classes for layout and utilities
- SCSS for custom styling
- Component-scoped styles when needed
- Responsive-first design patterns