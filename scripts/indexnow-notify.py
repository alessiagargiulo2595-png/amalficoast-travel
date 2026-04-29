#!/usr/bin/env python3
"""
Bing IndexNow notification script
Notifies Bing of URL changes to accelerate indexing
"""

import requests
import sys
from datetime import datetime

# Configuration
API_KEY = "7c1f504be0da410aa90dbecd1b4b2c55"
DOMAIN = "amalficoast-travel.com"
KEY_LOCATION = f"https://{DOMAIN}/7c1f504be0da410aa90dbecd1b4b2c55.txt"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

def notify_indexnow(urls):
    """
    Send URL change notification to Bing IndexNow

    Args:
        urls: List of URLs to notify about (e.g., ['https://amalficoast-travel.com/en-us/blog/'])
    """
    if not urls:
        print("No URLs provided. Skipping IndexNow notification.")
        return True

    payload = {
        "host": DOMAIN,
        "key": API_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }

    try:
        response = requests.post(
            INDEXNOW_ENDPOINT,
            json=payload,
            timeout=10
        )

        if response.status_code in [200, 202]:
            print(f"[SUCCESS] IndexNow notification successful ({response.status_code})")
            print(f"   URLs notified: {len(urls)}")
            return True
        else:
            print(f"[WARNING] IndexNow notification failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False

    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Error notifying IndexNow: {e}")
        return False

def get_modified_blog_urls():
    """
    Get the URLs of blog posts that were just modified
    These are the URLs that should be notified to IndexNow after a blog update
    """
    # All blog post URLs across all languages
    blog_urls = [
        # English
        "https://amalficoast-travel.com/en-us/blog/",
        "https://amalficoast-travel.com/en-us/blog/atrani/",
        "https://amalficoast-travel.com/en-us/blog/emerald-grotto/",
        "https://amalficoast-travel.com/en-us/blog/amalfi-coast-wines/",
        "https://amalficoast-travel.com/en-us/blog/cetara-anchovies/",
        "https://amalficoast-travel.com/en-us/blog/ferriere-valley/",
        "https://amalficoast-travel.com/en-us/blog/comfortable-beaches/",
        "https://amalficoast-travel.com/en-us/blog/lemon-delight/",
        "https://amalficoast-travel.com/en-us/blog/sunset-beaches/",
        "https://amalficoast-travel.com/en-us/blog/wild-remote-beaches/",
        # German
        "https://amalficoast-travel.com/de-de/blog/",
        "https://amalficoast-travel.com/de-de/blog/atrani/",
        "https://amalficoast-travel.com/de-de/blog/amalfi-weine/",
        "https://amalficoast-travel.com/de-de/blog/zitronen-koestlichkeit/",
        "https://amalficoast-travel.com/de-de/blog/smaragd-grotte/",
        "https://amalficoast-travel.com/de-de/blog/sonnenuntergang-strande/",
        "https://amalficoast-travel.com/de-de/blog/komfortable-ausgestattete-strande/",
        "https://amalficoast-travel.com/de-de/blog/wilde-abgelegene-strande/",
        # Spanish
        "https://amalficoast-travel.com/es-es/blog/",
        "https://amalficoast-travel.com/es-es/blog/atrani/",
        "https://amalficoast-travel.com/es-es/blog/delizia-limon/",
        "https://amalficoast-travel.com/es-es/blog/gruta-esmeralda/",
        "https://amalficoast-travel.com/es-es/blog/vinos-costa-amalfi/",
        "https://amalficoast-travel.com/es-es/blog/puesta-de-sol-playas/",
        "https://amalficoast-travel.com/es-es/blog/playas-comodas-equipadas/",
        "https://amalficoast-travel.com/es-es/blog/oasis-salvajes-playas/",
        # French
        "https://amalficoast-travel.com/fr-fr/blog/",
        "https://amalficoast-travel.com/fr-fr/blog/vins-cote-amalfi/",
        "https://amalficoast-travel.com/fr-fr/blog/delice-citron/",
        "https://amalficoast-travel.com/fr-fr/blog/plages-confortables-equipees/",
        "https://amalficoast-travel.com/fr-fr/blog/oasis-sauvages-plages/",
        "https://amalficoast-travel.com/fr-fr/blog/coucher-soleil-plages/",
        "https://amalficoast-travel.com/fr-fr/blog/vallee-des-ferriere/",
        "https://amalficoast-travel.com/fr-fr/blog/grotte-emeraude/",
        # Italian
        "https://amalficoast-travel.com/it-it/blog/",
        "https://amalficoast-travel.com/it-it/blog/spiagge-comode-attrezzate/",
        "https://amalficoast-travel.com/it-it/blog/oasi-selvagge-spiagge-mare/",
        "https://amalficoast-travel.com/it-it/blog/delizia-al-limone/",
        "https://amalficoast-travel.com/it-it/blog/grotta-dello-smeraldo/",
        "https://amalficoast-travel.com/it-it/blog/valle-delle-ferriere/",
        "https://amalficoast-travel.com/it-it/blog/atrani/",
    ]
    return blog_urls

if __name__ == "__main__":
    print(f"[IndexNow] Bing IndexNow Notification - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"   Domain: {DOMAIN}")

    # Check if specific URLs were provided as arguments
    if len(sys.argv) > 1:
        urls = sys.argv[1:]
        print(f"   Notifying {len(urls)} custom URL(s)")
    else:
        urls = get_modified_blog_urls()
        print(f"   Notifying all blog URLs ({len(urls)} total)")

    success = notify_indexnow(urls)
    sys.exit(0 if success else 1)
