# Ștefan Drăgan — therapist website

Romanian landing page and blog built with Next.js App Router, React, TypeScript, and Lucide icons. Styling is in CSS; the shared header and footer are mounted in the root layout.

## Local setup

Use the Node version in `.nvmrc` and npm with the committed `package-lock.json`.

```sh
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. `next dev`, `next build`, and `next typegen` generate `next-env.d.ts` and route types; these generated files are intentionally ignored by Git.

## Validation

```sh
npm run check
npm run build
```

`check` runs ESLint and generates Next.js route types before running TypeScript. The GitHub Actions workflow runs these checks and a production build on pushes and pull requests.

The production build exports the site to `out/`. To preview those files locally:

```sh
npx serve out
```

If your local environment blocks Turbopack's worker processes, use `npm run build -- --webpack`. Both builds may need network access to download Google Fonts; the fonts are self-hosted in the resulting application.

## Structure

```text
app/
  page.tsx              Landing page
  layout.tsx            Shared shell, fonts, and metadata
  globals.css           Site styling
  blog.css              Blog and article styling
  blog/page.tsx         Blog listing
  blog/[slug]/          Article page and article-specific 404
  not-found.tsx         Site-wide 404
  robots.ts             Search crawler rules
  sitemap.ts            Production URLs, including non-demo articles
components/             Reusable site and content components
lib/
  contact.ts            Booking, phone, and social destinations
  posts.ts              Article content, images, and optional galleries
  site.ts               Production URL and indexing configuration
public/                 Portrait, workshop photos, and logo assets
.github/workflows/      Automated project validation
```

## Editing content

- Edit landing-page copy in `app/page.tsx`.
- Edit contact destinations once in `lib/contact.ts`; shared components use them throughout the site.
- Add a `BlogPost` entry in `lib/posts.ts` for each article. Include a unique slug, title, description, category, main image with alt text, and body sections. Section headings, sources, linked tags, and galleries are optional.
- Article URLs are generated from the slug. Preserve existing slugs when revising copy so shared links continue working.
- Set `isDemo: true` for demonstration content. Demo articles display a label, stay out of the sitemap, and receive `noindex` metadata. Omit the flag for final content.
- The portrait is `public/terapeutProfilePic.jpeg`; the current activity post uses `workshop1_1.jpeg` as its main photo.

## Deployment and search indexing

### Cloudflare Pages

Connect the GitHub repository and use these build settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | Leave blank (repository root) |
| `NODE_VERSION` | `22.23.1` (also pinned in `.nvmrc`) |

The site uses `output: "export"`. Articles, robots rules, and the sitemap are generated at build time. Images are served as static files; Next.js server image optimization and `next start` are unavailable with this output mode. Push changes to `main` to trigger a production deployment; other branches produce previews.

Configure environment variables in your hosting provider before building:

| Variable | Development / preview | Public production |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Blank | Confirmed absolute website origin |
| `SITE_INDEXABLE` | `false` | `true` when ready for indexing |

Rebuild after changing these values: canonical links, social metadata, robots rules, and the sitemap are generated from them. Indexing requires both a domain and `SITE_INDEXABLE=true`. Previews disallow crawling and return an empty sitemap. Their `noindex` metadata is a crawler instruction, not access control.

On production, check `/robots.txt`, `/sitemap.xml`, an article's social preview, booking links, and the phone link. The site currently offers online sessions only; the address in the external professional directory is not a consulting location.

Keep `.env.local`, dependencies, and build output out of Git. Commit source files, `.env.example`, and `package-lock.json`.
