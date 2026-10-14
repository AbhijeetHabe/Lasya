# Manual GitHub Pages Deployment

This repository is the project site `Lasya`, not a `USERNAME.github.io` root site. Vite uses `/Lasya/` for production assets and `/` during local development. The app remains a static Vite build; no GitHub Actions workflow, backend, or deployment service is used.

## Build and prepare the publishing folder

1. Confirm the supplied logo artwork is present at `public/images/lasya-logo.jpeg`. The same original file is used for the header, footer, and favicon. Do not redraw or crop it.
2. Build the production site:

   ```sh
   npm run build
   ```

3. Verify `dist/` contains `index.html`, `404.html`, `assets/`, `images/lasya-logo.jpeg`, and the static metadata files. Check that built asset URLs begin with `/Lasya/` and the logo is present at `dist/images/lasya-logo.jpeg`.
4. GitHub Pages branch publishing cannot publish `dist/` directly. This repository uses `/docs` as its publishing folder. Copy the _contents_ of `dist/` into the repository-root `docs/` directory; do not copy the `dist` directory itself and do not overwrite application source files.

   PowerShell example:

   ```powershell
   New-Item -ItemType Directory -Force docs | Out-Null
   Copy-Item -Path dist\* -Destination docs\ -Recurse -Force
   ```

   The `docs/` directory is generated publishing output. If it already contains files, first confirm they are previous build output before replacing them. Stage and push the updated `docs/` contents to the chosen branch using the repository's normal Git workflow.

## Enable branch publishing on GitHub

1. Open the existing `Lasya` repository on GitHub. Do not create a new repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the branch containing the copied build, normally `main`.
5. Choose the `/docs` folder and save.
6. Wait for GitHub Pages to publish, then use the URL displayed in **Settings → Pages** to verify the site. For a project site, the expected format is `https://YOUR-USERNAME.github.io/Lasya/`; the username and published URL must be confirmed in GitHub, not inferred here.

The generated `404.html` redirects direct deep links back through the app while restoring the requested route. `BrowserRouter` uses Vite's base path in production and normal `/` paths in development.

## Before publishing

- Replace `YOUR-USERNAME` in `public/sitemap.xml` and `public/robots.txt` with the verified account name and public site URL.
- Confirm the official logo is present in `public/images/lasya-logo.jpeg`; Vite copies public assets to the same relative path in `dist/`.
- Product and editorial photos currently use external image URLs. Confirm image-host availability and permissions for the published site.
- No commit, push, or GitHub Pages setting is performed by the build command.
