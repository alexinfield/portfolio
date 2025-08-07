import os, datetime
BASE="https://www.alexinfield.com"; urls=['/','/info/','/archive/']
for slug in sorted(os.listdir('projects')):
    p=os.path.join('projects',slug,'index.html')
    if os.path.exists(p): urls.append(f"/projects/{slug}/")
now=datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
xml=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u in urls: xml.append(f"  <url><loc>{BASE}{u}</loc><lastmod>{now}</lastmod></url>")
xml.append('</urlset>'); open('sitemap.xml','w').write("\n".join(xml)); print("Wrote sitemap.xml with",len(urls),"urls")