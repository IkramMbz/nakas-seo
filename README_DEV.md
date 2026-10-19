# Testing `seo.gk` live (dev)

This guide explains how to test `seo.gk` in a local React project, with automatic recompilation on every change.

Two terminals are required:

- **Terminal 1**: the test project (`test-seo`)
- **Terminal 2**: the package (`seo-gk`)

## 1. Create the test project

The paths below are examples — adapt them to wherever you want to store (`test-seo`) and (`seo-gk`).

In Terminal 1:

```powershell
cd C:\Users\username\directory
npm create vite@latest test-seo -- --template react-ts
cd test-seo
pnpm install
```

## 2. Link `seo-gk` to the test project

Still in `test-seo`:

```powershell
pnpm add "link:C:\Users\username\directory\seo-gk"
```

## 3. Configure Vite

In `test-seo/vite.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        dedupe: ["react", "react-dom"]
    },
    optimizeDeps: {
        exclude: ["seo-gk"]
    },
    server: {
        watch: {
            followSymlinks: true
        }
    }
});
```

## 4. Add the `SEOChecker` component

In `test-seo/src/App.tsx`:

```tsx
import { SEOChecker } from "seo-gk";

function App() {
    return (
        <>
            <main class="main-content etc.">
                <h1>My SEO test page</h1>
                <p>Content to be analyzed by seo-gk.</p>
            </main>

            {import.meta.env.DEV && <SEOChecker />}
        </>
    );
}

export default App;
```

**N.B.: In production**, only render `<SEOChecker />` wrapped in a condition that checks for dev mode, otherwise it will be visible on the live site. For example:

```tsx
{
    import.meta.env.DEV && <SEOChecker />;
}
```

## 5. Run both projects

**Terminal 1** (in `test-seo`): start the app.

```powershell
pnpm dev
```

**Terminal 2** (in `seo-gk`): compile TypeScript continuously (`tsc --watch`).

```powershell
cd C:\Users\username\directory\seo-gk
pnpm install
pnpm dev
```

Then open the local URL shown by Vite in Terminal 1.

## Summary

1. Terminal 1: `pnpm dev` in `test-seo` (renders the app).
2. Terminal 2: `pnpm dev` in `seo-gk` (recompiles the package).
3. Edit `seo-gk`'s code, then check the result in the browser.

Tip: to avoid any interference with the design, build `seo-gk` once your changes are done, or temporarily clear the contents of `dist/styles/index.css`.

> **Warning:** this setup does not guarantee automatic reload. If compiled changes in `dist/` don't trigger a reload, additional Vite configuration will be needed.
