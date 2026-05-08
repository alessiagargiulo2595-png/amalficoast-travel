#!/bin/bash

links=(
  "/de-de/destinations/"
  "/de-de/amalfikueste/"
  "/de-de/sorrentinische-halbinsel/"
  "/de-de/inseln/"
  "/de-de/strande/"
  "/de-de/erlebnisse/"
  "/de-de/reiserouten/"
  "/de-de/ratgeber/faehren/"
  "/de-de/ratgeber/sita-bus/"
  "/de-de/ratgeber/parken-ztl/"
  "/de-de/blog/"
  "/de-de/amalfikueste/positano/"
  "/de-de/amalfikueste/amalfi/"
  "/de-de/amalfikueste/ravello/"
  "/de-de/amalfikueste/praiano/"
  "/de-de/amalfikueste/marina-di-praia/"
  "/de-de/amalfikueste/maiori/"
  "/de-de/amalfikueste/minori/"
  "/de-de/amalfikueste/vietri-sul-mare/"
  "/de-de/erlebnisse/kochkurs/"
  "/de-de/erlebnisse/hochzeiten/"
  "/de-de/erlebnisse/sterne-restaurants/"
  "/de-de/erlebnisse/limoncello-tour/"
  "/de-de/erlebnisse/mozzarella-erlebnis/"
)

echo "❌ MISSING DE-DE LINKS:"
for link in "${links[@]}"; do
  path="dist${link}index.html"
  if [ ! -f "$path" ]; then
    echo "  $link (expected: $path)"
  fi
done
