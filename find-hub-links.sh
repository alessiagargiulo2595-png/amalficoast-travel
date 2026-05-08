#!/bin/bash

# Cerco link che puntano direttamente ai hub (senza spiaggia specifica)
echo "🔍 Cercando link ai hub delle spiagge nel menu..."

# EN-US
grep "beaches/sorrentine-peninsula/\'" src/components/Header.astro src/components/Footer.astro | grep -v "/" | grep -v "piccola\|maronti\|pozzo\|faraglioni\|furore\|grande\|croce\|marina\|regina\|cantone\|mitigliano\|ieranto" && echo "EN-US: ✓ Hub link trovato" || echo "EN-US: ❌ Hub link NON trovato"

# DE-DE
grep "strande/sorrentiner-halbinsel/\'" src/components/Header.astro src/components/Footer.astro | grep -v "/" | grep -v "regina\|cantone\|mitigliano\|ieranto" && echo "DE-DE: ✓ Hub link trovato" || echo "DE-DE: ❌ Hub link NON trovato"
