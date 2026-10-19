# Tester `seo-gk` en temps réel (dev)

Ce guide explique comment tester `seo-gk` dans un projet React local, avec recompilation automatique à chaque modification.

Deux terminaux sont nécessaires :

- **Terminal 1** : le projet de test (`test-seo`)
- **Terminal 2** : le package (`seo-gk`)

## 1. Créer le projet de test

Les chemins ci-dessous sont des exemples, à adapter en fonction de là où vous souhaitez stocker (`test-seo`) et (`seo-gk`).

Dans le Terminal 1 :

```powershell
cd C:\Users\nom_utilisateur\directory
npm create vite@latest test-seo -- --template react-ts
cd test-seo
pnpm install
```

## 2. Lier `seo-gk` au projet de test

Toujours dans `test-seo` :

```powershell
pnpm add "link:C:\Users\nom_utilisateur\directory\seo-gk"
```

## 3. Configurer Vite

Dans `test-seo/vite.config.ts` :

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

## 4. Ajouter le composant `SEOChecker`

Dans `test-seo/src/App.tsx` :

```tsx
import { SEOChecker } from "seo-gk";

function App() {
    return (
        <>
            <main class="main-content etc.">
                <h1>Ma page de test SEO</h1>
                <p>Contenu à analyser par seo.gk.</p>
            </main>

            {import.meta.env.DEV && <SEOChecker />}
        </>
    );
}

export default App;
```

**N.B. : En production** n'afficher `<SEOChecker />` qu'encaplusé dans une condition qui vérifie le mode développement, sinon il sera visible sur le site en ligne. Par exemple :

```tsx
{
    import.meta.env.DEV && <SEOChecker />;
}
```

## 5. Lancer les deux projets

**Terminal 1** (dans `test-seo`) : démarrer l'application.

```powershell
pnpm dev
```

**Terminal 2** (dans `seo-gk`) : compiler TypeScript en continu (`tsc --watch`).

```powershell
cd C:\Users\nom_utilisateur\directory\seo-gk
pnpm install
pnpm dev
```

Ouvrir ensuite l'URL locale affichée par Vite dans le Terminal 1.

## Résumé

1. Terminal 1 : `pnpm dev` dans `test-seo` (affiche l'application).
2. Terminal 2 : `pnpm dev` dans `seo-gk` (recompile le package).
3. Modifier le code de `seo-gk`, puis vérifier le résultat dans le navigateur.

Tips : Pour éviter toute interférence avec le design, il est conseillé de builder nakas-seo une fois les modifications terminées ou, le cas échéant, de vider temporairement le contenu du fichier `dist/styles/index.css`.

> **Attention :** cette configuration ne garantit pas le rafraîchissement automatique. Si les changements compilés dans `dist/` ne déclenchent pas de rechargement, une configuration supplémentaire de Vite sera nécessaire.
