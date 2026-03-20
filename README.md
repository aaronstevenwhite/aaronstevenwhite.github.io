# aaronstevenwhite.io

Personal academic website for Aaron Steven White, built with [Astro](https://astro.build/).

## Development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # Build to dist/
```

## Editing Content

| Content | File |
|---|---|
| News | `src/data/news.yml` |
| Papers | `src/data/papers.yml` + `src/data/bibliography/aaronstevenwhite.bib` |
| Presentations | `src/data/presentations.yml` |
| Code repos | `src/data/code.yml` |
| Data products | `src/data/cv/resources.yml` |
| Teaching | `src/data/teaching.yml` |
| Syllabi | `src/data/syllabi/*.yml` |
| Featured home items | `src/data/featured.yml` |
| Reading paths | `src/data/reading_paths.yml` |
| CV sections | `src/data/cv/*.yml` |
| Co-author URLs | `src/data/coauthor_urls.yml` |
| Talk map venues | `src/data/talk_locations.yml` |

## Pre-build Scripts

```bash
npx tsx scripts/generate-slide-thumbs.ts   # Generate PDF slide thumbnails
```

GitHub language stats and commit activity are cached in `src/data/github_languages.json` and `src/data/github_stats.json`.

## Deploy

Pushes to `master` trigger a GitHub Actions workflow that builds and deploys to GitHub Pages.
