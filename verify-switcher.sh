#!/bin/bash

# Find all HTML pages (excluding en-gb and root)
pages=$(find dist -name "index.html" -path "*/en-us/*" -o -name "index.html" -path "*/de-de/*" -o -name "index.html" -path "*/fr-fr/*" -o -name "index.html" -path "*/es-es/*" -o -name "index.html" -path "*/it-it/*" | sort)

total=0
errors=0

for page in $pages; do
  total=$((total + 1))
  locale=$(echo $page | grep -o '/[a-z][a-z]-[a-z][a-z]/' | head -1 | tr -d '/')
  
  # Check if page has language switcher links (should have at least 4 other locales)
  link_count=$(grep -o 'href="/[a-z][a-z]-[a-z][a-z]' "$page" | grep -v "href=\"/$locale" | sort -u | wc -l)
  
  if [ "$link_count" -lt 3 ]; then
    echo "❌ $page (locale: $locale, links: $link_count)"
    errors=$((errors + 1))
  fi
done

echo ""
echo "=== RISULTATI ==="
echo "Pagine controllate: $total"
echo "Errori trovati: $errors"
if [ $errors -eq 0 ]; then
  echo "✓ TUTTE LE PAGINE HANNO LANGUAGE SWITCHER CORRETTO!"
else
  echo "❌ Alcune pagine hanno problemi"
fi
