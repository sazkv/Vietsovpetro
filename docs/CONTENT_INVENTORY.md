# Vietsovpetro — source and content inventory (working document)

**Project:** independent redesign concept, not an official Vietsovpetro property.
**Last manual review:** 2026-10-23.
**Source of truth:** https://www.vietsov.com.vn/Pages/default.aspx

## Preservation principle

All original public-facing pages, documents, downloads, images, languages, news archives, and external corporate-service references must be accounted for prior to any formal handoff. **A designed route is not a completed migration.**

### Verified from navigation

| Existing section | Original URL | New route | Known detail coverage |
| --- | --- | --- | --- |
| Corporate overview | /Pages/GioiThieuCT.aspx | /company | 11 subtopics mapped |
| Organizational units | /Pages/DVTV.aspx | /units | 16 units identified via subordinate-unit pages; official overview mentions 18 total |
| Products and services | /Pages/SanPhamDV.aspx | /services | 15 groups mapped |
| Projects and partners | /Pages/DuAn.aspx | /projects | 5 projects groups + partners |
| Resources | /Pages/nguonnhanluc.aspx | /resources | HR, facilities, finance |
| News and events | /Pages/TinTuc.aspx | /news | 3 specific article URLs plus archive still to inventory |
| Recruitment / admissions | /Pages/tuyendung.aspx ; /TuyenSinh1/index.html | /careers | recruitment / Russian university admissions / training |
| Contact | /Pages/lienhe.aspx | /contact | head office and corporate contact channels |
| Employee services | various subdomains, some SharePoint-protected | /systems | known public entrypoints linked; no login replicas |

See `src/lib/site-map.ts` for the canonical source registry. Every entry has a source status (`verified-page` or `index-only`).

## Corporate subpages directly inspected

- /Pages/GioiThieuCT.aspx
- /Pages/lichsuhinhthanh.aspx
- /Pages/CoCau.aspx
- /Pages/lanhdao.aspx
- /Pages/LinhVuc.aspx
- /Pages/TiemNang.aspx
- /Pages/NhungThanhTuu.aspx
- /Pages/cacDanhHieu.aspx
- /Pages/AnToanSKMT.aspx

Photo archive and environmental-information link resolution remain open tasks.

## Existing content that MUST be retained

- Company profile, milestones, management roster, org structure and awards.
- Fifteen original service categories and their detailed pages, technical specifications and materials.
- All listed operating units and their associated sites. *The primary unit index initially displayed 12 entries; individual unit pages expose links to 16 entries. The company overview states 18. Reconcile the remaining two before declaring the directory complete.*
- Projects tables, client names, scope of work, photos and source documents.
- HR, facilities, financial-resource information.
- News article bodies, original publication dates, related news, categories, tags and media.
- Original job postings and deadlines (including expired), official admissions portal.
- External corporate services: eOffice, email, tender sales, flight/shipping schedule, HSE tests, health services, leave systems and other links.

## Critical discrepancies / verification requirements

1. Corporate overview mentions **18** subordinate units; accessible units listing contains **12** named entries.
2. HR content mentions **15** units and may be historically stale. Never silently update values across documents.
3. The current English site may lag behind the Vietnamese version. Do not automatically translate old English content as current.
4. Some links are authentication-protected SharePoint resources and cannot be mirrored without authorization.
5. Source imagery has its own rights. The concept currently references one official BK-19 photo by external URL; obtain usage authorization for public production.
6. The live news archive extends far beyond the three seed records.
7. Avoid fabricating official project, press or staff information.

## Migration-state definition

- **Mapped:** title, category, and source index identified.
- **Verified:** canonical detailed URL checked and source confirmed.
- **Extracted:** original HTML/body, inline images, attachments and metadata captured.
- **Normalized:** formatting converted without omitting factual material.
- **Reviewed:** factual content reviewed by a responsible editor.
- **Approved:** permission and publication approval obtained.

Only Mapped/Verified are implemented so far. Visible placeholders are intentional.

## Recommended content database schema

```text
page_id, section, slug, locale, original_url, original_title, title,
body_html, summary, publish_at, updated_at, author, tags,
attachments[], inline_images[], canonical_url, migration_status,
reviewer, reviewed_at, permissions_status, redirect_from[]
```

## Remaining crawl tasks for an agent

1. Crawl the Vietnamese site index and sitemap, then paginate every list (news, projects, awards, divisions).
2. Capture original URL, slug, source title, published and updated dates, HTML and metadata.
3. Identify all download links, PDFs, attached spreadsheets and media.
4. Compare each discovered page to registry, create missing routes and register redirects.
5. Extract detailed project tables without truncation; preserve source attribution.
6. Save approved images locally or to licensed storage; avoid permanent hotlinking.
7. Verify Vietnamese-English-Russian language coverage and translation status.
8. Run visual regression/accessibility/mobile tests.
9. Do not touch protected employee data or internal authentication.

## User-facing scope of the current version

A responsive site with a navigable and searchable page catalog, working detail-route templates, history and corporate contact data, active external links, original references and explicit content status. **It is not yet the complete corporate website.**
