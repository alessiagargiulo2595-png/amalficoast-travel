import os
from pathlib import Path
from html.parser import HTMLParser

class LinkExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            for attr, value in attrs:
                if attr == 'href':
                    self.links.append(value)

dist_dir = Path('./dist')
pages = set()
broken = []

# Collect all pages
for root, dirs, files in os.walk(dist_dir):
    for file in files:
        if file == 'index.html':
            full_path = Path(root) / file
            rel_path = str(full_path.relative_to(dist_dir)).replace(chr(92), '/')
            url_path = rel_path.replace('index.html', '')
            pages.add(url_path)

# Check all links
for root, dirs, files in os.walk(dist_dir):
    for file in files:
        if file == 'index.html':
            filepath = Path(root) / file
            rel_path = str(filepath.relative_to(dist_dir)).replace(chr(92), '/')
            page_url = rel_path.replace('index.html', '')

            with open(filepath, 'r', encoding='utf-8') as f:
                html = f.read()

            extractor = LinkExtractor()
            try:
                extractor.feed(html)
            except:
                pass

            for href in extractor.links:
                if any(href.startswith(x) for x in ['http', '//', '#', 'mailto:', 'tel:', '.svg', '.js', '.css']):
                    continue

                if href.startswith('/'):
                    clean = href.split('?')[0].split('#')[0]
                else:
                    clean = href.split('?')[0].split('#')[0]

                if clean not in pages and (clean + '/') not in pages and '.' not in clean:
                    broken.append((page_url, href))

# Report by language
by_lang = {}
for page, href in broken:
    lang = page.split('/')[1] if len(page.split('/')) > 1 else 'root'
    if lang not in by_lang:
        by_lang[lang] = []
    by_lang[lang].append((page, href))

print("LINK VERIFICATION - ALL LANGUAGES")
print("=" * 70)
langs = ['it-it', 'en-us', 'en-gb', 'de-de', 'fr-fr', 'es-es']
for lang in langs:
    if lang in by_lang:
        print(f"\nXX {lang.upper()}: {len(by_lang[lang])} broken links")
        for page, link in by_lang[lang][:3]:
            print(f"     {page.strip('/')} -> {link}")
        if len(by_lang[lang]) > 3:
            print(f"     ... +{len(by_lang[lang])-3} more")
    else:
        print(f"OK {lang.upper()}: All links valid!")

total_broken = len(broken)
print(f"\nTOTAL: {total_broken} broken links across all languages")
