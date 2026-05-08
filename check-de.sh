#!/bin/bash

# DE-DE links to check
links=(
  "/de-de/strande/sorrentiner-halbinsel/"
  "/de-de/sorrentinische-halbinsel/sorrento/"
  "/de-de/sorrentinische-halbinsel/vico-equense/"
  "/de-de/sorrentinische-halbinsel/massa-lubrense/"
  "/de-de/sorrentinische-halbinsel/sant-agnello/"
  "/de-de/erlebnisse/trekking/"
)

echo "Checking DE-DE specific links:"
for link in "${links[@]}"; do
  path="dist${link}index.html"
  if [ -f "$path" ]; then
    echo "✓ $link"
  else
    echo "❌ $link (missing: $path)"
  fi
done
