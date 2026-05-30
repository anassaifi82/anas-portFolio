# Anas Saifi — Portfolio Website

A modern, minimalist portfolio built with **React** and **Vite**, showcasing accessibility expertise, frontend development skills, and professional experience. The site is designed with **WCAG 2.1 / 2.2 Level AA** best practices and includes a dedicated accessibility statement.

## Live pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, skills, and experience sections |
| `/contact` | Contact Us | Contact form, details, and social links |
| `/accessibility` | Accessibility Statement | Conformance and accessibility commitments |
| `/sitemap` | Sitemap | Overview of all pages and sections |

Each route sets a unique document title (for example, `Contact Us — Anas Saifi`).

## Features

- **Responsive layout** — Mobile-first design with a two-column hero on desktop
- **Light & dark themes** — Theme toggle on the hero image (home) or in the header (other pages)
- **Multi-page routing** — Client-side navigation with `react-router-dom`
- **Contact form** — FormSubmit integration with live success/error feedback
- **CV download** — View and download CV from `/cv.pdf`
- **Performance** — Lazy-loaded sections, code splitting, and self-hosted Inter font
- **CSS Modules** — Scoped component styles for maintainable UI

## Tech stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [@fontsource/inter](https://fontsource.org/fonts/inter)
- [FormSubmit](https://formsubmit.co/) (contact form backend)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm

### Installation

```bash
git clone <repository-url>
cd portfolio-website-using-react
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project structure

```
src/
├── App.jsx                 # Router and lazy-loaded pages
├── App.css                 # Global styles, theme variables, focus styles
├── layout/
│   └── Layout.jsx          # Skip link, page titles, hash scrolling
├── pages/
│   ├── HomePage.jsx
│   ├── ContactPage.jsx
│   ├── AccessibilityPage.jsx
│   └── SitemapPage.jsx
├── sections/
│   ├── Header/             # Navigation, mobile sidebar, theme toggle
│   ├── Hero/
│   ├── Skills/
│   ├── Experience/
│   ├── Contact/
│   └── Footer/
└── common/
    ├── ThemeContext.jsx    # Light/dark theme state
    ├── ThemeToggle.jsx
    ├── pageTitles.js       # Per-route document titles
    ├── useFocusTrap.js     # Mobile menu focus management
    └── useSwipeToClose.js  # Swipe-to-close for mobile nav
public/
├── hero.webp
├── cv.pdf
├── favicon.png
└── _redirects              # SPA fallback for static hosts
```

## Accessibility

This portfolio is built by an Accessibility Developer & Tester and follows inclusive design principles throughout.

### Conformance goal

The site aims to conform with **WCAG 2.1 and 2.2 at Level AA**. Reviews use manual testing, assistive technologies, and automated tools such as **axe** and **Lighthouse**.

### Accessibility features

#### Structure & semantics

- Semantic HTML5 landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<address>`
- Logical heading hierarchy (`h1` → `h2` → `h3`) on every page
- Unique page titles updated on route change
- Skip link to jump directly to main content (`#main-content`)
- Screen reader–only text (`.sr-only`) for supplementary context (for example, “opens in new tab”)

#### Keyboard & focus

- Full keyboard navigation across all interactive elements
- Visible `:focus-visible` outlines with sufficient contrast
- Mobile sidebar uses a **focus trap** while open
- Form feedback region receives focus after submission for screen reader announcement
- Skip link becomes visible on keyboard focus

#### Navigation

- Desktop navigation with clear link labels and `aria-current="page"` on the active route
- Mobile menu with `aria-expanded`, `aria-controls`, and `aria-hidden` when closed
- Swipe-right gesture to close the mobile menu
- Hash links (for example, `/#skills`) scroll smoothly to in-page sections

#### Visual design

- Light and dark themes with CSS custom properties
- Color contrast aligned with WCAG AA requirements
- Responsive typography using the Inter typeface
- Touch targets sized to at least **44×44 CSS pixels** on interactive controls (contact links, form labels, buttons)

#### Forms (Contact page)

- Visible `<label>` elements associated with every field via `htmlFor` / `id`
- Required fields marked with `*` and described in helper text
- `aria-required` on required inputs
- Live regions (`role="status"` / `role="alert"`) for submission feedback
- Honeypot field for basic spam protection (hidden from assistive tech)
- Error messages include a direct email fallback link

#### Media & content

- Descriptive `alt` text on images (logo, hero portrait, social icons)
- Decorative icons marked with `alt=""` and `aria-hidden="true"`
- External links use `rel="noopener noreferrer"` and accessible naming
- CV links indicate when content opens in a new tab

#### Assistive technology testing

The site is tested with:

- **NVDA** and **JAWS** on Windows
- **VoiceOver** on macOS and iOS
- Keyboard-only navigation
- Modern versions of Chrome, Firefox, Edge, and Safari

### Accessibility statement

A full statement is available on the site at **`/accessibility`**, linked from the footer on every page.

### Reporting accessibility issues

If you encounter a barrier on this website, please reach out:

- **Email:** [8279483892a@gmail.com](mailto:8279483892a@gmail.com)
- **Phone:** [+91 8279483892](tel:+918279483892)
- **Contact form:** [/contact](/contact)

## Contact

**Anas Saifi**  
Accessibility Developer & Tester — Frontend Developer  
Delhi, India

- GitHub: [anassaifi82](https://github.com/anassaifi82)
- LinkedIn: [anas-s-940394277](https://www.linkedin.com/in/anas-s-940394277)

## License

This project is private. All rights reserved © Anas Saifi.
