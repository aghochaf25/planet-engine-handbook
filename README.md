# Planet Engine Engineering Handbook Platform

This is a completely independent, production-ready Next.js App Router application that serves as the **Engineering Operating System** and Single Source of Truth for the Planet Engine ecosystem.

It is decoupled from all other codebase repositories (`backend`, `frontend`, `admin`) to allow independent deployment and static generation hosting.

---

## Architecture & Design Aesthetic

- **Design Language**: Follows the Admin OS "Ocean Intelligence" aesthetic: dark backgrounds, glassmorphic panels, glowing borders, custom telemetry badges, and custom scrollbars.
- **Static Site Generation (SSG)**: Designed for high-frequency CI compilation. All 40 pages build completely statically, generating optimized HTML, CSS, and JSON files that can be instantly served from CDNs or object stores.
- **Component Separation**: Implemented strictly with zero runtime imports or library couplings to other backend/frontend environments.

---

## Directory Topography

```
planet-engine-handbook/
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── src/
│   ├── app/
│   │   ├── globals.css              # Custom ocean variables, scrollbars, glass panels
│   │   ├── layout.tsx               # Sidebar structure, telemetry topbar
│   │   ├── page.tsx                 # Telemetry Dashboard
│   │   ├── reports/                 # Quality & verification audits
│   │   ├── roadmap/                 # Core milestones timeline
│   │   ├── adr/                     # Architecture Decision Records
│   │   ├── glossary/                # Domain dictionary & letter filtering
│   │   ├── settings/                # Telemetry sync & mock switches
│   │   ├── architecture/            # Flow charts & sequence diagram pages
│   │   └── repository/              # Topography module pages
│   └── components/
│       └── handbook/
│           ├── CodeExplorer.tsx     # Mock IDE sidebar, calls, and packages
│           ├── CommandPalette.tsx   # Cmd+K quick navigation search
│           ├── CoverageGauge.tsx    # Radial test coverage circle
│           ├── DiagramContainer.tsx # React Flow & Mermaid renderer
│           ├── FormulaBlock.tsx     # KaTeX math formula typesetter
│           ├── MetricCard.tsx       # Glowing telemetry statistic card
│           ├── Sidebar.tsx          # Collapsible navigation drawer
│           └── VerificationCard.tsx # Page-level verification stats & badge
```

---

## Reusable Components & Frameworks

### 1. Telemetry Dashboard (`page.tsx`)
Displays repository summary statuses, circular gauge progress, inventory statistics, ingestion pipeline latencies, and commit verification logs.

### 2. Verification Framework (`VerificationCard.tsx`)
A standardized component embedded across every page. It tracks code-review confidence, test coverage percentages, commit tags, verification dates, and reviewer assignments.

### 3. Diagram Rendering (`DiagramContainer.tsx`)
- **React Flow**: Client-side interactive layouts (e.g. data flows, dependency maps) powered by `@xyflow/react`.
- **Mermaid**: Sequential interaction flows rendered client-side dynamically.

### 4. Mathematical Typesetting (`FormulaBlock.tsx`)
Typesets Wave power energy flux, circular means, and advection-diffusion PDEs using `katex` for crisp, publication-quality mathematical notation.

### 5. Search Palette (`CommandPalette.tsx`)
Accessible via `Cmd+K` or `Ctrl+K`. Serves as a global index allowing fuzzy-match navigation directly to specific folders, APIs, or equations.

### 6. Code Explorer (`CodeExplorer.tsx`)
Simulates an IDE workspace featuring a folder topography tree, function lists, signature reviews, and dependency maps.

---

## Verification Gates & Quality Control

Every gate must pass before merging or deploying:

1. **TypeScript Verification**:
   ```bash
   npm run typecheck
   ```
2. **ESLint Static Analysis**:
   ```bash
   npm run lint
   ```
3. **Production Static Export**:
   ```bash
   npm run build
   ```

---

## Deployment Instructions

### Option 1: Static Hosting (Vercel, Netlify, Cloudflare Pages)
Since the application compiles 100% statically, it is highly optimized for serverless edge hosting:
1. Connect the repository to your hosting provider.
2. Configure settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` or `out` (if static export is configured in `next.config.ts`)

### Option 2: Containerized Deployments (Docker)
To run behind an Nginx proxy or standard Node server:
1. Build the production build locally or in a CI runner:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```
