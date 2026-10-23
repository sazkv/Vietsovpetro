# Agent handoff — Vietsovpetro website concept

## Objective
Continue building a serious, functional, accessible, industrial corporate website, **preserving the original site's breadth and content**. User will review the result before it is proposed to Vietsovpetro. This is an independent, unofficial concept.

## Design constraints
- No generic "AI slop": no glassmorphism, floating gradients, neon blobs, abstract 3D, fake oil rigs, or noisy scroll gimmicks.
- Enterprise information architecture, honest photography, strong typographic hierarchy, fast mobile pages, restrained motion.
- Use actual brand material only where its usage is permitted.
- Vietnamese primary. English and Russian should be introduced only with validated translations and explicit translation status.

## Project layout
- `src/lib/site-map.ts` — 8 corporate information groups, detail page source mapping, service links, milestones.
- `src/components/navigation.tsx` — primary/utility navigation, dropdowns and mobile menu.
- `src/components/catalog-filter.tsx` — category live search.
- `src/components/search-client.tsx` — sitewide live catalog search.
- `src/app/page.tsx` — editorial homepage.
- `src/app/[section]/page.tsx` — section landing templates.
- `src/app/[section]/[slug]/page.tsx` — detail templates and original-source references.
- `src/app/systems/page.tsx` — verified public service entrypoints.
- `docs/CONTENT_INVENTORY.md` — audit and migration checklist.

## Implementation priorities (recommended)
1. Preserve and fix build/type checks, responsive navigation, sitemap and accessible color contrast.
2. Build a source crawl/export pipeline to structured JSON (with rate limits and caching; respect permissions).
3. Migrate **full original text**, images, tables and attachments using page-specific templates.
4. Add CMS schemas for page/news/project/service/org-unit/file/locale without losing canonical URLs.
5. Create editorial workflows for reviews and translation freshness.
6. Introduce a real photo library and optimized local media.
7. Implement search index over published content (current search covers mapped titles only).
8. Add tests for source mapping, broken links, page count, metadata, forms and language coverage.
9. Produce before/after presentation on a separate, clearly labeled concept staging domain.

## Key constraints
- No fake contact forms or employee login.
- External protected systems remain links.
- No external changes on the official site.
- Do not turn an excerpt or AI summary into a 'complete' article.
- No automatic publishing as an official Vietsovpetro site.

## Run
```bash
npm install
npm run check:structure
npm run build
npm run dev
```
The Next.js config uses static export so deployment providers can host the `out/` output. GitHub Pages may need a basePath depending on project URL. Do not enable an Actions workflow without checking the account's minutes limits.
