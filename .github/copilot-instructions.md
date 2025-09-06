# Copilot Instructions for ss_Websitte Project

## Project Overview
This is a React-based web application built with Vite, focused on a philosophical blog/website exploring consciousness, language, and AI. Key features include dynamic article loading from Markdown files, Supabase authentication, a custom visual editor for inline content editing during development, and comprehensive SEO optimization. The app emphasizes clean, modern UI with Tailwind CSS and animations via Framer Motion.

## Architecture
- **Core Structure**: Entry point at `src/main.jsx` wraps the app in `AuthProvider` and `BrowserRouter`. `App.jsx` handles routing to `HomePage.jsx` and `ArticlePage.jsx`.
- **Components**: Modular structure in `src/components/` with subfolders like `layout/`, `sections/`, `ui/`. Uses Radix UI primitives (e.g., Button, Toast) composed with Tailwind via `cn` utility in `src/lib/utils.js`.
- **Data Flow**: Articles defined in `src/data/articles.js` with lazy-loaded Markdown content using dynamic imports. Example: `contentModule: () => import('@/articles/article-slug.md?raw')`.
- **Supabase Integration**: Authentication via `src/lib/customSupabaseClient.js` and context in `src/contexts/SupabaseAuthContext.jsx`. Provides signUp, signIn, signOut methods with toast notifications.
- **Visual Editor**: Custom Vite plugins in `plugins/visual-editor/` enable inline editing. `vite-plugin-react-inline-editor.js` injects `data-edit-id` attributes into JSX during dev builds. Edits are applied via AST manipulation using Babel.
- **SEO & LLM Integration**: Extensive metadata implementation via Helmet component in pages, with pre-build tools generating `sitemap.xml` and `llms.txt` to optimize search engine visibility and LLM parsing.
- **Why This Structure?**: Separates concerns for scalability—pages for routes, sections for reusable content blocks, custom plugins for dev productivity without runtime overhead.

## Developer Workflows
- **Development**: Run `npm run dev` to start Vite server with HMR and visual editor enabled (via conditional plugins in `vite.config.js`).
- **Build**: `npm run build` executes both `tools/generate-llms-improved.js` and `tools/generate-seo-files.js` (extracts article metadata and generates SEO files) then runs Vite build. Outputs to `dist/`.
- **Preview**: `npm run preview` for local production preview.
- **Editing**: In dev mode, editable elements (defined in `EDITABLE_HTML_TAGS` constant) get `data-edit-id`. Changes post to `/api/apply-edit` endpoint, updating source files via Babel AST traversal.
- **SEO Generation**: The build process automatically generates `sitemap.xml` and updates `llms.txt` for LLM parsing based on article metadata. All pages use `react-helmet` for comprehensive meta tags.
- **Debugging**: Vite's error overlay handling is customized in `vite.config.js` with enhanced error formatting. For Supabase issues, check auth context and toast notifications.
- **Error Handling**: Custom error handlers in `vite.config.js` improve dev experience with better-formatted error messages and custom error overlays.

## Conventions and Patterns
- **Folder Structure**: `src/pages/` for route components, `src/articles/` for Markdown files, `src/data/` for article metadata. Aliases: `@` resolves to `src/`.
- **Styling**: Tailwind with custom themes in `tailwind.config.js` (e.g., gradient-text, glass-effect). Avoid inline styles; use `cn` for conditional classes.
- **Articles**: Each article in `src/articles/*.md` imported as raw string in `src/data/articles.js`. Rendered with `ReactMarkdown` and `remarkGfm` in `ArticlePage.jsx`. Articles have metadata including slug, title, subtitle, themes, and keyTakeaways for SEO and categorization.
- **SEO Pattern**: Each page component includes a `<Helmet>` section with comprehensive meta tags (standard, Open Graph, Twitter). Article pages dynamically generate metadata from article properties, including themes as keywords.
- **Auth**: All auth flows (signUp, signIn, signOut) in `SupabaseAuthContext.jsx` with toast feedback. Use `useAuth` hook for access to auth functions and user state.
- **PDF Export**: In `ArticlePage.jsx`, uses jsPDF and html2canvas for downloading articles—capture ref'd content and generate PDF.
- **Animation**: Framer Motion used for transitions and animations, particularly in section components like `HeroSection.jsx`.

## Integrations and Dependencies
- **Supabase**: Auth and potential DB via `supabase-js`. Config in `src/lib/customSupabaseClient.js`.
- **Markdown**: `react-markdown` with GFM for articles; custom components override rendering (e.g., styled headings, links).
- **UI Components**: Uses Radix UI primitives (`@radix-ui/react-*`) with Tailwind styling, composed with the `cn` utility.
- **Routing**: React Router for slug-based article pages. Routes are defined in `App.jsx`.
- **External Libs**: Framer Motion for animations, Lucide for icons, Radix for UI primitives. Install via npm as listed in `package.json`.
- **Cross-Component**: Toasts via `use-toast.js` for global notifications. Scroll handling in `ScrollToTop.js`.

## Key Files Reference
- **`vite.config.js`**: Build setup and plugin config, including conditional loading of visual editor plugins
- **`src/data/articles.js`**: Article metadata and dynamic content loading
- **`src/pages/ArticlePage.jsx`**: Article rendering and PDF export functionality
- **`plugins/visual-editor/`**: Custom editor implementation for inline content editing
- **`src/contexts/SupabaseAuthContext.jsx`**: Authentication flows and user state management
- **`tools/generate-llms-improved.js`**: Extracts article metadata for LLM parsing
- **`tools/generate-seo-files.js`**: Generates sitemap.xml and LLM-specific content
- **`public/robots.txt`**: Configures web crawler access with specific rules for LLMs
- **`public/llms.txt`**: Structured content specifically for language model parsing

