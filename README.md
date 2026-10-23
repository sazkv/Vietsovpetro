# Vietsovpetro — website redesign concept

> Independent demonstration project. Not owned, endorsed or commissioned by Vietsovpetro.

A source-mapped Vietnamese-first Next.js website concept for an industrial corporate information portal. The aim is to preserve the existing navigation and original content while modernizing visual presentation.

## Current implementation

- Responsive industrial-style homepage, mobile nav and deep section dropdown navigation.
- 56 mapped public content-route records organized under company, operating units, products and services, projects, resources, news, careers and contact.
- Search by directory titles and categories.
- Detail-page templates with canonical source links, original date where known, migration status and navigation to related pages.
- Historical milestone timeline, corporate contact information and external systems directory.
- Static export configuration, robots noindex, editorial handoff and content-preservation audit.

**Important:** Most route bodies are deliberately *not* marked migrated. Full articles, media, tables, archives and downloads must be extracted and reviewed from their original sources. The original Vietsovpetro site remains authoritative.

## Local development

Requires Node 22+.

```bash
npm install
npm run check:structure
npm run dev
```

Visit http://localhost:3000.

```bash
npm run build
```

Outputs a static build to `out/` for hosting. `NEXT_PUBLIC_SITE_URL` may be set to the concept's final URL when generating sitemap links.

## Project docs

- [Original site inventory](docs/CONTENT_INVENTORY.md)
- [Instructions for a coding agent](docs/AGENT_HANDOFF.md)

### Why no official login, forms or CMS yet?

This is a public demonstration. Employee logins, mail, tender, medical and staffing systems must remain on official infrastructure. A CMS and publishing workflow should be added after thorough content migration and editorial review.
