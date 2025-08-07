# Alex Portfolio – Mirror
Static, no-build GitHub Pages site that mirrors your current Webflow structure.
- `/projects/{slug}/` pages with a slide viewer; accepts absolute Webflow URLs for images or MP4s.
- Minimal JS; good defaults for SEO; `build.py` generates `sitemap.xml` during the Actions deploy.
## Quick start
1) New public repo → upload this folder.
2) Settings → Pages → GitHub Actions (use included workflow).
3) Optional: rename `CNAME.example` to `CNAME` and set your domain in DNS, then enforce HTTPS.
## Add slides
Edit the JSON in each `projects/*/index.html` (`<script id="slides-data">`), use your Webflow `cdn.prod.website-files.com/...` URLs.
## Deep link
Add `?s=3` to open on slide 3.
## Later
Move assets off Webflow to `/assets/img/{slug}/` or a CDN; update the JSON URLs accordingly.
