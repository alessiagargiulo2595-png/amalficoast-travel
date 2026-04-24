#!/usr/bin/env python3
"""
Genera blog en-us / de-de / es-es da sorgente it-it usando Claude Haiku.
Uso: ANTHROPIC_API_KEY=sk-... python generate_blog_multilang.py
"""
import os, sys, re, json, time
from pathlib import Path

try:
    import anthropic
except ImportError:
    sys.exit("pip install anthropic")

BASE  = Path(__file__).parent
PAGES = BASE / "src" / "pages"
DATA  = BASE / "src" / "data"

# ── Source data (it-it) ───────────────────────────────────────────────────────

POSTS_IT = {
  "grotta-dello-smeraldo": {
    "id": "01", "category": "SCOPERTE", "readTime": "6 min",
    "image": "/images/grotta-smeraldo-hero.webp",
    "imageAlt": "Grotta dello Smeraldo - Conca dei Marini, Costiera Amalfitana",
    "title": "Grotta dello Smeraldo",
    "subtitle": "Guida Completa alla Perla di Conca dei Marini",
    "metaTitle": "Grotta dello Smeraldo: Guida Completa 2026 | Conca dei Marini",
    "metaDescription": "Guida alla Grotta dello Smeraldo di Conca dei Marini: come arrivare, orari, prezzi, il presepe sommerso e il segreto del colore smeraldo.",
    "breadcrumb_name": "Grotta dello Smeraldo",
    "excerpt": "Scoperta nel 1932 da un pescatore locale: un mondo sommerso di stalattiti, riflessi smeraldini e un presepe sotto l'acqua.",
    "authorRole": "Guide locali · Costiera Amalfitana",
    "keyTakeaways": [],
    "quickInfo": [
      {"label": "Scoperta", "value": "1932 - Luigi Buonocore"},
      {"label": "Comune", "value": "Conca dei Marini (SA)"},
      {"label": "Dimensioni", "value": "60m larghezza · 24m altezza"},
      {"label": "Apertura subacquea", "value": "~8 metri di profondità"},
      {"label": "Orari", "value": "9:00 - 16:00 (ca.)"},
      {"label": "Biglietto", "value": "ca. €7 a persona"},
      {"label": "Durata visita", "value": "20-30 minuti"},
      {"label": "Periodo migliore", "value": "Mattina (10-12)"},
    ],
    "faq": [
      {"q": "Come si arriva alla Grotta dello Smeraldo?", "a": "Ci sono due modi: via mare con i taxi-boat da Amalfi (circa 10 minuti, partenze frequenti in alta stagione), oppure via terra lungo la Statale Amalfitana — a Conca dei Marini si imbocca un ascensore panoramico che scende direttamente all'imbarcadero della grotta."},
      {"q": "Quando è il periodo migliore per visitarla?", "a": "Le ore mattutine tra le 10 e le 12 sono le più magiche: la luce del sole filtra più direttamente attraverso l'apertura subacquea, amplificando l'effetto smeraldo. Evitate le giornate di mare mosso."},
      {"q": "Quanto costa il biglietto d'ingresso?", "a": "Il biglietto d'ingresso alla grotta è di circa 7 euro a persona (2026). Il costo del taxi-boat da Amalfi si aggiunge separatamente (circa 10-12 euro a/r). Se si arriva via terra, il costo dell'ascensore è incluso nel biglietto."},
      {"q": "Cos'è il Presepe Sommerso?", "a": "È un presepe in ceramica posizionato sul fondale della grotta nel 1956 a circa 4 metri di profondità, opera dell'artista Attilio Pentone. Ogni anno il 24 dicembre i sub aggiungono nuove statuine."},
      {"q": "Perché l'acqua è di colore smeraldo?", "a": "La grotta ha un'apertura subacquea a circa 8 metri di profondità. La luce solare penetra attraverso questa fessura, viene rifratta dall'acqua e illumina la caverna dal basso verso l'alto, creando un'intensa luminescenza verde-smeraldo."},
      {"q": "Quanto dura la visita?", "a": "La visita in barca all'interno della grotta dura mediamente 20-30 minuti. Tenendo conto dei trasferimenti via mare da Amalfi, è consigliabile prevedere circa 1,5-2 ore totali."},
      {"q": "Si può fare snorkeling o immersioni nella grotta?", "a": "Le immersioni guidate sono possibili con dive center autorizzati della zona. L'accesso in snorkeling autonomo non è consentito per motivi di sicurezza e tutela del sito."},
    ],
  },
  "alici-di-cetara": {
    "id": "02", "category": "FOOD", "readTime": "7 min",
    "image": "/images/alici-cetara-hero.jpg",
    "imageAlt": "Alici di Cetara e Colatura DOP - Costiera Amalfitana",
    "title": "Le Alici di Cetara",
    "subtitle": "L'Oro d'Argento della Costiera Amalfitana",
    "metaTitle": "Alici di Cetara: Colatura DOP e Spaghetto alla Colatura | Guida 2026",
    "metaDescription": "La storia della Colatura di Alici DOP di Cetara, erede del Garum romano: pesca con le lampare, maturazione nei terzigni, ricetta originale dello Spaghetto alla Colatura.",
    "breadcrumb_name": "Alici di Cetara",
    "excerpt": "Dal terzigno di rovere alla tavola: la storia della Colatura DOP, erede del Garum romano, e dello Spaghetto alla Colatura, piatto cult di un borgo di 2.000 anime.",
    "authorRole": "Food & Travel Specialist · Costiera Amalfitana",
    "keyTakeaways": [
      "La Colatura di Alici di Cetara DOP è l'erede diretta del Garum romano, recuperata dai monaci medievali e oggi riconosciuta presidio di eccellenza mondiale.",
      "Le alici vengono pescate con le lampare di notte, tra marzo e agosto, e lavorate a mano lo stesso giorno della cattura.",
      "La maturazione nei terzigni di rovere dura almeno 9 mesi per disciplinare DOP; le riserve migliori invecchiano per diversi anni.",
      "Lo Spaghetto alla Colatura si condisce sempre a crudo e senza sale nell'acqua: la colatura è già naturalmente sapidissima.",
      "Una sola goccia di colatura è sufficiente per insaporire pasta, verdure bollite e zuppe di legumi — mai scaldarla per preservarne il bouquet aromatico.",
    ],
    "quickInfo": [
      {"label": "Prodotto", "value": "Alici sotto sale · Colatura DOP"},
      {"label": "Località", "value": "Cetara (SA)"},
      {"label": "Stagione di pesca", "value": "Marzo - Agosto"},
      {"label": "Maturazione DOP", "value": "Min. 9 mesi in terzigno"},
      {"label": "Piatto cult", "value": "Spaghetti alla Colatura"},
      {"label": "Da sapere", "value": "Mai salare l'acqua della pasta"},
      {"label": "Consiglio acquisto", "value": "Botteghe artigianali sul corso"},
      {"label": "Certificazione", "value": "DOP - Denominazione Origine Protetta"},
    ],
    "faq": [
      {"q": "Quanto tempo devono maturare le alici per fare la colatura?", "a": "Il disciplinare DOP prevede un invecchiamento minimo di 9 mesi, ma le riserve migliori possono maturare nei terzigni di legno anche per diversi anni, acquisendo note più complesse e scure."},
      {"q": "La colatura è molto salata?", "a": "Sì, è estremamente sapida. Per questo motivo, quando la si usa come condimento, non va mai aggiunto sale all'acqua di cottura della pasta o alle pietanze."},
      {"q": "È vero che le alici di Cetara fanno bene alla salute?", "a": "Assolutamente sì. Essendo pesce azzurro, sono ricchissime di Omega-3, proteine di alta qualità e sali minerali. La lavorazione sotto sale ne preserva le proprietà nutrizionali senza l'uso di conservanti chimici."},
      {"q": "Dove si acquista la Colatura DOP originale?", "a": "Lungo il corso principale di Cetara ci sono laboratori artigianali e botteghe storiche dove acquistare i terzigni originali. Cercate sempre il marchio DOP in confezione: molte imitazioni usano pesce proveniente da altri mari."},
      {"q": "Qual è il periodo migliore per visitare Cetara?", "a": "La stagione di pesca va da marzo ad agosto, con il picco notturno delle lampare in primavera. In questo periodo i ristoranti del borgo servono il pesce più fresco."},
      {"q": "Come si conservano le alici sotto sale a casa?", "a": "Le alici sotto sale nei barattoli di vetro vanno tenute sempre coperte dal loro liquido o da un filo d'olio per evitare che si secchino. Conservarle in frigorifero dopo l'apertura e consumarle entro poche settimane."},
      {"q": "Cosa si intende per tecnica 'testa-coda'?", "a": "È il metodo tradizionale di disposizione delle alici nel terzigno: ogni strato viene alternato capovolgendo l'orientamento dei pesci, così da massimizzare la compattezza e favorire una salatura uniforme durante la maturazione."},
    ],
  },
  "valle-delle-ferriere": {
    "id": "03", "category": "SCOPERTE", "readTime": "8 min",
    "image": "/images/valle-ferriere-hero.jpg",
    "imageAlt": "Cascata nella Valle delle Ferriere, Amalfi - Costiera Amalfitana",
    "title": "Valle delle Ferriere",
    "subtitle": "Trekking nel Cuore Verde e Selvaggio di Amalfi",
    "metaTitle": "Valle delle Ferriere Amalfi: Trekking, Cascate e Felci Preistoriche 2026",
    "metaDescription": "Guida completa al trekking nella Valle delle Ferriere di Amalfi: percorso, felci giganti preistoriche, antiche cartiere medievali, cascate e consigli pratici per visitare la riserva naturale.",
    "breadcrumb_name": "Valle delle Ferriere",
    "excerpt": "Felci preistoriche, cascate e rovine di antiche cartiere medievali: il segreto meglio custodito della Costiera, a pochi minuti a piedi dal centro di Amalfi.",
    "authorRole": "Nature & Trekking Guide · Costiera Amalfitana",
    "keyTakeaways": [
      "La Valle delle Ferriere ospita la Woodwardia radicans, una felce gigante preistorica sopravvissuta dal Terziario grazie a un microclima unico al Mediterraneo.",
      "Il nome deriva dalle antiche ferriere medievali che sfruttavano il torrente Canneto; lungo il sentiero si trovano le rovine delle storiche cartiere che producevano la celebre Carta di Amalfi.",
      "Il sentiero è classificato E (Escursionistico): circa 6 km, 3-4 ore con soste. Partenza consigliata da Pontone per procedere in discesa verso Amalfi.",
      "La zona delle cascate e delle felci rare è una riserva integrale protetta: prenotazione e contributo (~€5) obbligatori.",
      "Periodo migliore: primavera (aprile-giugno) per cascate al massimo e verde esplosivo; autunno per i colori caldi del bosco.",
    ],
    "quickInfo": [
      {"label": "Punto di partenza", "value": "Pontone o Amalfi (centro)"},
      {"label": "Difficoltà", "value": "E - Escursionistico (Facile/Medio)"},
      {"label": "Durata", "value": "Circa 3-4 ore (con soste)"},
      {"label": "Lunghezza", "value": "6 km circa"},
      {"label": "Costo riserva", "value": "ca. €5 a persona"},
      {"label": "Equipaggiamento", "value": "Scarpe da trekking obbligatorie"},
      {"label": "Cosa vedere", "value": "Cascate, felci preistoriche, antiche cartiere"},
      {"label": "Periodo migliore", "value": "Aprile - Giugno / Autunno"},
    ],
    "faq": [
      {"q": "Il sentiero è adatto ai bambini?", "a": "Sì, il sentiero principale è ben tracciato e non presenta pericoli estremi. Tuttavia, non è percorribile con i passeggini a causa dei gradini e delle radici affioranti. Con bambini piccoli è consigliabile partire da Pontone (discesa) anziché da Amalfi (salita)."},
      {"q": "Si può fare il bagno nel torrente?", "a": "Sebbene l'acqua sia limpidissima e invitante, è estremamente fredda (circa 12-14°C) e, trattandosi di una zona protetta, è bene evitare per non disturbare l'ecosistema locale."},
      {"q": "Qual è il periodo migliore per la visita?", "a": "La primavera (aprile-giugno) è il momento magico: le cascate sono al massimo della portata e la vegetazione è di un verde esplosivo. L'autunno offre colori caldi meravigliosi. In estate la valle resta fresca grazie al microclima, ma la portata delle cascate si riduce."},
      {"q": "C'è campo per il cellulare nella valle?", "a": "In molti punti della valle il segnale è assente o molto debole. È l'occasione perfetta per un digital detox, ma ricordate di scaricare la mappa offline e di avvisare qualcuno del vostro percorso prima di partire."},
      {"q": "Come si prenota l'accesso alla riserva integrale?", "a": "L'accesso alla zona protetta delle cascate e delle felci rare è spesso gestito da associazioni locali o dal comune di Amalfi. Verificate prima della visita sul sito del comune o chiamate il punto informazioni turistiche di Amalfi. Il contributo è di circa €5 a persona."},
      {"q": "Cosa si intende per Woodwardia radicans?", "a": "È una rarissima felce gigante risalente all'epoca preistorica (Terziario), sopravvissuta nelle valli umide del Mediterraneo grazie a microclimi particolari. Le sue fronde possono raggiungere i 2 metri."},
      {"q": "Serve una guida o si può fare da soli?", "a": "Il sentiero principale è ben segnalato e percorribile in autonomia. Tuttavia, per scoprire i dettagli storici delle cartiere e i punti di osservazione migliori, una guida locale aggiunge un valore enorme all'esperienza."},
    ],
  },
  "delizia-al-limone": {
    "id": "04", "category": "FOOD", "readTime": "7 min",
    "image": "/images/delizia-limone-hero.jpg",
    "imageAlt": "Delizia al Limone - dolce simbolo della Costiera Amalfitana",
    "title": "Delizia al Limone",
    "subtitle": "Storia e Segreti della Cupola più Amata della Costiera",
    "metaTitle": "Delizia al Limone: Storia, Ricetta e Dove Mangiarla | Costiera Amalfitana 2026",
    "metaDescription": "La storia della Delizia al Limone inventata da Carmine Marzuillo nel 1978, i segreti della ricetta originale con limoni IGP e i tre indirizzi imperdibili sulla Costiera Amalfitana.",
    "breadcrumb_name": "Delizia al Limone",
    "excerpt": "Inventata nel 1978 da un maestro pasticciere sorrentino, la Delizia al Limone è l'essenza del sole della Costiera racchiusa in una cupola di pan di spagna e crema profumata.",
    "authorRole": "Food Critic & Local Expert · Costiera Amalfitana",
    "keyTakeaways": [],
    "quickInfo": [
      {"label": "Creatore", "value": "Carmine Marzuillo (1978)"},
      {"label": "Ingrediente chiave", "value": "Limone IGP (Sfusato o Femminiello)"},
      {"label": "Preparazione", "value": "45 min + 2 ore riposo"},
      {"label": "Cottura", "value": "20 minuti"},
      {"label": "Porzioni", "value": "8 cupoline"},
      {"label": "Difficoltà", "value": "Media (precisione nella crema)"},
      {"label": "Abbinamento", "value": "Limoncello ghiacciato o passito di Tramonti"},
      {"label": "Dove mangiarla", "value": "Sal De Riso (Minori) · Pansa (Amalfi)"},
    ],
    "faq": [
      {"q": "Qual è la differenza tra la Delizia al Limone e un normale Pan di Spagna al limone?", "a": "La struttura della Delizia è molto più complessa: prevede una doppia crema (pasticcera e chantilly al limone) e una glassatura esterna che la mantiene umida e soffice, a differenza di una classica torta che tende ad asciugarsi."},
      {"q": "Posso usare limoni comuni del supermercato?", "a": "Puoi, ma il risultato non sarà lo stesso. Il segreto della Delizia è negli oli essenziali della buccia dei limoni IGP di Sorrento o Amalfi, che non sono trattati e hanno un profumo infinitamente più persistente."},
      {"q": "Esiste una versione della Delizia per celiaci?", "a": "Molte pasticcerie artigianali in Costiera ora offrono versioni gluten-free utilizzando farine di riso o amidi, mantenendo intatta la magia della crema al limone."},
      {"q": "Chi ha inventato la Delizia al Limone?", "a": "Il maestro pasticciere sorrentino Carmine Marzuillo, che la presentò per la prima volta nel 1978 a un concorso gastronomico a Formia. In pochi anni divenne il dolce simbolo dell'intera Costiera Amalfitana."},
      {"q": "Dove si mangia la migliore Delizia al Limone della Costiera?", "a": "I luoghi più celebri sono: la Pasticceria Sal De Riso a Minori (probabilmente la più famosa al mondo), la Pasticceria Pansa accanto al Duomo di Amalfi e l'Antico Francischiello a Massa Lubrense, luogo d'origine della ricetta."},
    ],
  },
  "atrani": {
    "id": "05", "category": "SCOPERTE", "readTime": "6 min",
    "image": "/images/atrani-hero.jpg",
    "imageAlt": "Atrani - il borgo più piccolo d'Italia sulla Costiera Amalfitana",
    "title": "Atrani",
    "subtitle": "Il Borgo Più Piccolo d'Italia Dove il Tempo si è Fermato",
    "metaTitle": "Atrani: Il Borgo Più Piccolo d'Italia sulla Costiera Amalfitana | Guida 2026",
    "metaDescription": "Guida ad Atrani, comune più piccolo d'Italia: storia dei Dogi della Repubblica di Amalfi, la leggenda di Masaniello, set di Ripley su Netflix e consigli pratici per visitarlo.",
    "breadcrumb_name": "Atrani",
    "excerpt": "A 700 metri da Amalfi, il comune più piccolo d'Italia (0,12 km²): un anfiteatro medievale di vicoli bianchi, la chiesa dei Dogi e il set di Ripley su Netflix.",
    "authorRole": "Amalfi Coast Specialist · Costiera Amalfitana",
    "keyTakeaways": [],
    "quickInfo": [
      {"label": "Record", "value": "Comune più piccolo d'Italia (0,12 km²)"},
      {"label": "Distanza da Amalfi", "value": "700 m · 10-15 min a piedi"},
      {"label": "Accesso", "value": "Piedi da Amalfi · Bus SITA"},
      {"label": "Parcheggio", "value": "Quasi assente — usare Amalfi"},
      {"label": "Evento cult", "value": "Festa S. Maria Maddalena (22 luglio)"},
      {"label": "Piatto tipico", "value": "Sarchiapone"},
      {"label": "Set cinematografico", "value": "Ripley (Netflix, 2024)"},
      {"label": "Atmosfera", "value": "Autentica, medievale, silenziosa"},
    ],
    "faq": [
      {"q": "Quanto dista Atrani da Amalfi?", "a": "Sono separate da soli 700 metri. Si possono percorrere a piedi in circa 10-15 minuti attraverso il tunnel pedonale o seguendo la strada costiera."},
      {"q": "È difficile parcheggiare ad Atrani?", "a": "Sì, il parcheggio è estremamente limitato e riservato quasi esclusivamente ai residenti. Si consiglia vivamente di parcheggiare ad Amalfi (parcheggio Luna Rossa) e raggiungere Atrani a piedi."},
      {"q": "Atrani è adatta per una vacanza tranquilla?", "a": "Assolutamente sì. Rispetto ad Amalfi o Positano, Atrani offre ritmi molto più lenti e silenziosi, pur essendo a un passo dai principali collegamenti della Costiera."},
      {"q": "Perché Atrani è stata scelta come set di Ripley?", "a": "La serie Netflix Ripley (2024) ha scelto Atrani per la sua capacità di evocare un'Italia sospesa nel tempo, con i suoi archi sulla statale, i vicoli medievali e una piazza a pochi metri dal mare. Il borgo è rimasto quasi invariato rispetto ai decenni scorsi."},
      {"q": "Cos'è il Sarchiapone di Atrani?", "a": "È la specialità gastronomica locale, preparata tradizionalmente per la festa di Santa Maria Maddalena il 22 luglio: una zucca lunga farcita con carne, formaggi e uova, poi fritta e ripassata al forno."},
      {"q": "Cosa si intende per 'birecto' e perché è legato ad Atrani?", "a": "Il birecto era il copricapo ducale dei Dogi della Repubblica Marinara di Amalfi. Ad Atrani, nella Chiesa di San Salvatore de' Birecto, avveniva l'investitura solenne dei Dogi: il borgo era il centro del potere aristocratico della Repubblica."},
    ],
  },
  "vini-costa-amalfi": {
    "id": "06", "category": "FOOD", "readTime": "8 min",
    "image": "/images/vini-costa-amalfi-hero.jpg",
    "imageAlt": "Vigneti eroici della Costa d'Amalfi - Tramonti e Scala",
    "title": "Vini della Costa d'Amalfi",
    "subtitle": "Viaggio tra i Vigneti Eroici di Tramonti e Scala",
    "metaTitle": "Vini Costa d'Amalfi DOC: Tintore, Tramonti e Viticoltura Eroica | Guida 2026",
    "metaDescription": "La DOC Costa d'Amalfi tra Tramonti e Scala: viti pre-fillossera di 200 anni, vitigni autoctoni (Tintore, Fenile, Ripoli), viticoltura eroica e guida alle degustazioni.",
    "breadcrumb_name": "Vini Costa d'Amalfi",
    "excerpt": "Viti pre-fillossera di 200 anni, vitigni autoctoni quasi scomparsi e una vendemmia a mano su terrazzamenti a picco: la storia della DOC Costa d'Amalfi tra Tramonti e Scala.",
    "authorRole": "Wine & Territory Expert · Costiera Amalfitana",
    "keyTakeaways": [],
    "quickInfo": [
      {"label": "DOC", "value": "Costa d'Amalfi (Tramonti, Ravello, Furore)"},
      {"label": "Vitigno star", "value": "Tintore di Tramonti"},
      {"label": "Bianchi autoctoni", "value": "Fenile · Ripoli · Ginestra"},
      {"label": "Rossi", "value": "Tintore · Piedirosso · Aglianico"},
      {"label": "Vendemmia", "value": "Fine Ottobre / Inizio Novembre"},
      {"label": "Abbinamento", "value": "Provolone del Monaco DOP"},
      {"label": "Viti più antiche", "value": "Oltre 200 anni (pre-fillossera)"},
      {"label": "Metodo", "value": "Esclusivamente manuale"},
    ],
    "faq": [
      {"q": "Cosa significa 'Viticoltura Eroica'?", "a": "Si definisce tale quando la pendenza del terreno è superiore al 30%, le vigne sono su terrazzamenti o ad altitudini elevate. In Costiera, tutto il lavoro — dalla potatura alla vendemmia — deve essere fatto a mano perché i macchinari non possono accedere ai terrazzamenti."},
      {"q": "Qual è la differenza tra il vino di mare e quello di montagna in Costiera?", "a": "I vini della costa (Furore, Positano) tendono a essere più sapidi e solari. Quelli di Tramonti e Scala hanno una freschezza e un'acidità più marcata, con note minerali più profonde dovute alla vicinanza dei monti e all'escursione termica."},
      {"q": "Si possono acquistare i vini direttamente in cantina?", "a": "Assolutamente sì. Anzi, è il modo migliore per scoprire piccole produzioni limitate (spesso poche migliaia di bottiglie) che non arrivano mai alla grande distribuzione. Molte cantine di Tramonti accettano visite su prenotazione."},
      {"q": "Cos'è il Tintore di Tramonti?", "a": "È un vitigno autoctono unico al mondo, con ceppi che possono superare i 150-200 anni di età. Sopravvissuto alla fillossera grazie al terreno vulcanico e sabbioso, produce un vino dal colore rosso impenetrabile, quasi violaceo, con note di frutti di bosco e un tannino potente."},
      {"q": "Quando si vendemmia nella DOC Costa d'Amalfi?", "a": "La vendemmia avviene tra fine ottobre e inizio novembre, una delle più tardive d'Italia. Le temperature più fresche in quota e l'escursione termica prolungata permettono ai grappoli di maturare lentamente, sviluppando complessità aromatica."},
      {"q": "Quali sono i vitigni bianchi autoctoni della DOC?", "a": "I principali vitigni bianchi autoctoni sono Fenile, Ripoli e Ginestra — nomi rarissimi anche nel panorama enologico campano. Regalano vini dai profumi di ginestra, erbe aromatiche e una spiccata sapidità marina."},
    ],
  },
}

# ── Language config ────────────────────────────────────────────────────────────

LANGS = {
  "en-us": {
    "name": "American English",
    "date": "April 22, 2026",
    "slugs": {
      "grotta-dello-smeraldo": "emerald-grotto",
      "alici-di-cetara":       "cetara-anchovies",
      "valle-delle-ferriere":  "ferriere-valley",
      "delizia-al-limone":     "lemon-delight",
      "atrani":                "atrani",
      "vini-costa-amalfi":     "amalfi-coast-wines",
    },
    "cat_map": {"SCOPERTE": "DISCOVERIES", "FOOD": "FOOD"},
    "home": "Home", "blog": "Blog",
    "editorial_title": "Why a Blog about the Amalfi Coast?",
    "editorial_body": "There are thousands of tourist guides about the Coast. This blog was born to tell what the guides don't say: the caves discovered by chance, the authentic flavors far from tourist menus, the trails that locals still walk every morning. Each article is written as if told to a friend.",
  },
  "de-de": {
    "name": "German",
    "date": "22. April 2026",
    "slugs": {
      "grotta-dello-smeraldo": "smaragd-grotte",
      "alici-di-cetara":       "cetara-sardellen",
      "valle-delle-ferriere":  "ferriere-tal",
      "delizia-al-limone":     "zitronen-koestlichkeit",
      "atrani":                "atrani",
      "vini-costa-amalfi":     "amalfi-weine",
    },
    "cat_map": {"SCOPERTE": "ENTDECKUNGEN", "FOOD": "KULINARIK"},
    "home": "Startseite", "blog": "Blog",
    "editorial_title": "Warum ein Blog über die Amalfiküste?",
    "editorial_body": "Es gibt tausende Reiseführer über die Küste. Dieser Blog wurde gegründet, um zu erzählen, was die Reiseführer nicht sagen: die zufällig entdeckten Grotten, die authentischen Aromen fernab der Touristenmenüs, die Pfade, die die Einheimischen noch jeden Morgen gehen. Jeder Artikel ist geschrieben, als würde man ihn einem Freund erzählen.",
  },
  "es-es": {
    "name": "Spanish from Spain",
    "date": "22 de abril de 2026",
    "slugs": {
      "grotta-dello-smeraldo": "gruta-esmeralda",
      "alici-di-cetara":       "anchoas-cetara",
      "valle-delle-ferriere":  "valle-ferriere",
      "delizia-al-limone":     "delizia-limon",
      "atrani":                "atrani",
      "vini-costa-amalfi":     "vinos-costa-amalfi",
    },
    "cat_map": {"SCOPERTE": "DESCUBRIMIENTOS", "FOOD": "GASTRONOMÍA"},
    "home": "Inicio", "blog": "Blog",
    "editorial_title": "¿Por qué un blog sobre la Costa Amalfitana?",
    "editorial_body": "Existen miles de guías turísticas sobre la Costa. Este blog nació para contar lo que las guías no dicen: las cuevas descubiertas por casualidad, los sabores auténticos lejos de los menús para turistas, los senderos que los lugareños recorren cada mañana. Cada artículo está escrito como si se lo contaras a un amigo.",
  },
}

# Sidebar cross-links (it-it slugs)
SIDEBAR = {
  "grotta-dello-smeraldo": ["alici-di-cetara",      "atrani"],
  "alici-di-cetara":       ["delizia-al-limone",    "vini-costa-amalfi"],
  "valle-delle-ferriere":  ["atrani",               "grotta-dello-smeraldo"],
  "delizia-al-limone":     ["alici-di-cetara",       "vini-costa-amalfi"],
  "atrani":                ["grotta-dello-smeraldo", "valle-delle-ferriere"],
  "vini-costa-amalfi":     ["alici-di-cetara",       "delizia-al-limone"],
}

# ── Helpers ────────────────────────────────────────────────────────────────────

def read_it_body(it_slug):
    path = PAGES / "it-it" / "blog" / it_slug / "index.astro"
    txt  = path.read_text(encoding="utf-8")
    m = re.search(r'\n>\n(.*?)\n</BlogPostLayout>', txt, re.DOTALL)
    return m.group(1).strip() if m else ""

CACHE_DIR = BASE / ".blog_translation_cache"
CACHE_DIR.mkdir(exist_ok=True)

def cache_path(lang_code, it_slug):
    return CACHE_DIR / f"{lang_code}_{it_slug}.json"

def translate_post(client, it_slug, post_it, body_it, lang_name):
    payload = {
        "title":          post_it["title"],
        "subtitle":       post_it["subtitle"],
        "imageAlt":       post_it["imageAlt"],
        "metaTitle":      post_it["metaTitle"],
        "metaDescription":post_it["metaDescription"],
        "breadcrumb_name":post_it["breadcrumb_name"],
        "excerpt":        post_it["excerpt"],
        "authorRole":     post_it["authorRole"],
        "quickInfo":      post_it["quickInfo"],
        "faq":            post_it["faq"],
        "body":           body_it,
    }
    if post_it["keyTakeaways"]:
        payload["keyTakeaways"] = post_it["keyTakeaways"]

    sys_prompt = (
        f"You are a professional travel content translator. "
        f"Translate the JSON values (NOT keys) to {lang_name}. "
        f"Rules: 1) Preserve all HTML tags and CSS class attributes unchanged. "
        f"2) Preserve all Astro/JSX expressions like {{keyTakeaways.map(...)}} or {{point}} unchanged. "
        f"3) Preserve brand/product names: Amalfi, Positano, Tramonti, Cetara, Tintore, Colatura, "
        f"Fenile, Ripoli, Ginestra, DOP, DOC, IGP, Sfusato, Femminiello, Woodwardia radicans, "
        f"Limoncello, Provolone del Monaco, Sarchiapone, Ripley, Netflix. "
        f"4) Keep numbers, prices, URLs unchanged. "
        f"5) The 'body' value is HTML — translate only visible text, keep all tags intact. "
        f"Return ONLY valid JSON, no markdown fences."
    )

    for attempt in range(3):
        try:
            msg = client.messages.create(
                model="claude-haiku-4-5-20251001",
                max_tokens=8096,
                temperature=0,
                system=sys_prompt,
                messages=[{"role": "user", "content": json.dumps(payload, ensure_ascii=False)}],
            )
            raw = msg.content[0].text.strip()
            if raw.startswith("```"):
                raw = raw.split("\n", 1)[1].rsplit("```", 1)[0].strip()
            result = json.loads(raw)
            # Ensure keyTakeaways present if original had it
            if post_it["keyTakeaways"] and "keyTakeaways" not in result:
                result["keyTakeaways"] = post_it["keyTakeaways"]
            return result
        except Exception as e:
            print(f"    attempt {attempt+1} failed: {e}")
            if attempt < 2:
                time.sleep(3)
    print(f"    WARNING: translation failed for {it_slug}, using Italian as fallback")
    return payload

# ── File writers ───────────────────────────────────────────────────────────────

def write_post(lang_code, it_slug, post_it, tr, lang_cfg, all_titles):
    slug    = lang_cfg["slugs"][it_slug]
    cat     = lang_cfg["cat_map"].get(post_it["category"], post_it["category"])
    path_   = f"/{lang_code}/blog/{slug}/"
    date_   = lang_cfg["date"]

    # Sidebar links
    sidebar_slugs = SIDEBAR.get(it_slug, [])
    sidebar = []
    for s in sidebar_slugs:
        sidebar.append({
            "label": all_titles.get(s, s),
            "href":  f"/{lang_code}/blog/{lang_cfg['slugs'][s]}/",
        })

    has_kt = bool(post_it["keyTakeaways"])

    lines = [
        "---",
        "import BlogPostLayout from '../../../../layouts/BlogPostLayout.astro';",
        "",
        f"const lang = '{lang_code}';",
        "const post = {",
        f"  title: {json.dumps(tr.get('title', post_it['title']))},",
        f"  subtitle: {json.dumps(tr.get('subtitle', post_it['subtitle']))},",
        f"  category: {json.dumps(cat)},",
        f"  date: {json.dumps(date_)},",
        f"  readTime: {json.dumps(post_it['readTime'])},",
        f"  image: {json.dumps(post_it['image'])},",
        f"  imageAlt: {json.dumps(tr.get('imageAlt', post_it['imageAlt']))},",
        f"  path: {json.dumps(path_)},",
        "};",
        "",
        f"const metaTitle = {json.dumps(tr.get('metaTitle', post_it['metaTitle']))};",
        f"const metaDescription = {json.dumps(tr.get('metaDescription', post_it['metaDescription']))};",
        "",
        "const breadcrumbs = [",
        f"  {{ name: {json.dumps(lang_cfg['home'])}, url: '/{lang_code}/' }},",
        f"  {{ name: {json.dumps(lang_cfg['blog'])}, url: '/{lang_code}/blog/' }},",
        f"  {{ name: {json.dumps(tr.get('breadcrumb_name', post_it['breadcrumb_name']))}, url: {json.dumps(path_)} }},",
        "];",
        "",
        "const quickInfo = [",
    ]
    for qi in tr.get("quickInfo", post_it["quickInfo"]):
        lines.append(f"  {{ label: {json.dumps(qi['label'])}, value: {json.dumps(qi['value'])} }},")
    lines += ["];", "", "const faq = ["]
    for f_ in tr.get("faq", post_it["faq"]):
        lines.append(f"  {{ q: {json.dumps(f_['q'])}, a: {json.dumps(f_['a'])} }},")
    lines += ["];", "", "const sidebarLinks = ["]
    for sl in sidebar:
        lines.append(f"  {{ label: {json.dumps(sl['label'])}, href: {json.dumps(sl['href'])} }},")
    lines.append("];")
    lines.append(f"const authorRole = {json.dumps(tr.get('authorRole', post_it['authorRole']))};")

    if has_kt:
        lines += ["", "const keyTakeaways = ["]
        for kt in tr.get("keyTakeaways", post_it["keyTakeaways"]):
            lines.append(f"  {json.dumps(kt)},")
        lines.append("];")

    lines += [
        "---",
        "",
        "<BlogPostLayout",
        "  lang={lang}",
        "  post={post}",
        "  metaTitle={metaTitle}",
        "  metaDescription={metaDescription}",
        "  breadcrumbs={breadcrumbs}",
        "  quickInfo={quickInfo}",
        "  faq={faq}",
        "  sidebarLinks={sidebarLinks}",
        "  authorRole={authorRole}",
        ">",
        "",
        tr.get("body", ""),
        "",
        "</BlogPostLayout>",
        "",
    ]

    out_dir = PAGES / lang_code / "blog" / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "index.astro").write_text("\n".join(lines), encoding="utf-8")
    print(f"  ✓ {lang_code}/blog/{slug}/index.astro")


def write_data_ts(lang_code, posts_order, all_data, lang_cfg):
    iface = lang_code.replace("-", "").capitalize()
    lines = [
        f"export interface BlogPost{iface} {{",
        "  id: string;",
        "  title: string;",
        "  slug: string;",
        "  excerpt: string;",
        "  category: string;",
        "  date: string;",
        "  readTime: string;",
        "  image: string;",
        "  path: string;",
        "}",
        "",
        f"export const blogPosts{iface}: BlogPost{iface}[] = [",
    ]
    for it_slug in posts_order:
        post_it = POSTS_IT[it_slug]
        tr      = all_data[it_slug]
        slug    = lang_cfg["slugs"][it_slug]
        cat     = lang_cfg["cat_map"].get(post_it["category"], post_it["category"])
        lines += [
            "  {",
            f"    id: {json.dumps(post_it['id'])},",
            f"    title: {json.dumps(tr.get('title', post_it['title']))},",
            f"    slug: {json.dumps(slug)},",
            f"    excerpt: {json.dumps(tr.get('excerpt', post_it['excerpt']))},",
            f"    category: {json.dumps(cat)},",
            f"    date: {json.dumps(lang_cfg['date'])},",
            f"    readTime: {json.dumps(post_it['readTime'])},",
            f"    image: {json.dumps(post_it['image'])},",
            f"    path: {json.dumps(f'/{lang_code}/blog/{slug}/')},",
            "  },",
        ]
    lines += ["];", ""]
    out = DATA / f"blog-{lang_code[:2]}.ts"
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"  ✓ data/blog-{lang_code[:2]}.ts")


def write_blog_index(lang_code, lang_cfg, all_data, posts_order):
    # Unique categories
    cats = list(dict.fromkeys(
        lang_cfg["cat_map"].get(POSTS_IT[s]["category"], POSTS_IT[s]["category"])
        for s in posts_order
    ))
    iface = lang_code.replace("-", "").capitalize()
    all_label = {"en-us": "All", "de-de": "Alle", "es-es": "Todos"}[lang_code]
    read_label = {"en-us": "read", "de-de": "Lesen", "es-es": "leer"}[lang_code]
    read_link  = {"en-us": "Read article", "de-de": "Artikel lesen", "es-es": "Leer artículo"}[lang_code]
    no_results = {"en-us": "No articles found in this category.", "de-de": "Keine Artikel in dieser Kategorie gefunden.", "es-es": "No se encontraron artículos en esta categoría."}[lang_code]
    show_all   = {"en-us": "Show all", "de-de": "Alle anzeigen", "es-es": "Mostrar todo"}[lang_code]
    coast_label = {"en-us": "Amalfi Coast", "de-de": "Amalfiküste", "es-es": "Costa Amalfitana"}[lang_code]
    subtitle_   = {"en-us": "Real stories, hidden caves, authentic flavors. The Coast beyond the postcards.", "de-de": "Wahre Geschichten, versteckte Grotten, authentische Aromen. Die Küste jenseits der Postkarten.", "es-es": "Historias reales, cuevas ocultas, sabores auténticos. La Costa más allá de las postales."}[lang_code]

    content = f"""---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import {{ blogPosts{iface} }} from '../../../data/blog-{lang_code[:2]}';

const lang = '{lang_code}';

const sortedPosts = [...blogPosts{iface}].sort((a, b) => Number(b.id) - Number(a.id));
const categories = [{json.dumps(all_label)}, ...new Set(sortedPosts.map(p => p.category))];
---

<BaseLayout
  title="Blog | Amalfi Coast Travel"
  description="{lang_cfg['editorial_body'][:160]}"
  lang={{lang}}
>

  <!-- Hero -->
  <section class="relative h-[60vh] flex items-end bg-charcoal overflow-hidden">
    <div class="absolute inset-0 bg-slate-900"></div>
    <div class="absolute inset-0 bg-cover bg-center opacity-40" style="background-image: url('/images/blog-hub-hero.jpg')"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-32 w-full">
      <nav class="flex items-center gap-2 text-white/60 text-xs mb-6">
        <a href="/{lang_code}/" class="hover:text-white transition-colors">{lang_cfg['home']}</a>
        <span>/</span>
        <span class="text-white">{lang_cfg['blog']}</span>
      </nav>
      <div class="max-w-3xl">
        <p class="text-med-gold text-sm font-medium uppercase tracking-[0.3em] mb-3">{coast_label}</p>
        <h1 class="font-serif text-display text-white mb-4">{lang_cfg['blog']}</h1>
        <p class="text-xl text-white/80 leading-relaxed mb-8">{subtitle_}</p>
        <div class="flex flex-wrap gap-3">
          {{categories.map((cat) => (
            <button data-filter={{cat}} data-active={{cat === {json.dumps(all_label)} ? 'true' : undefined}} class="filter-btn">{{cat}}</button>
          ))}}
        </div>
      </div>
    </div>
  </section>

  <!-- Grid -->
  <section class="bg-med-cream py-24 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-end mb-10">
        <p id="blog-counter" class="text-slate-400 text-sm hidden sm:block">
          {{sortedPosts.length}} {{sortedPosts.length === 1 ? 'article' : 'articles'}}
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" id="blog-grid">
        {{sortedPosts.map((post) => (
          <div data-category={{post.category}} class="blog-card">
            <a href={{post.path}} class="group block">
              <div class="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-5 shadow-lg">
                <img src={{post.image}} alt={{post.title}} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <div class="absolute top-5 left-5">
                  <span class="bg-med-gold text-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">{{post.category}}</span>
                </div>
              </div>
              <div class="px-1">
                <div class="flex items-center gap-3 text-slate-400 text-xs mb-3">
                  <span>{{post.date}}</span><span>·</span><span>{{post.readTime}} {read_label}</span>
                </div>
                <h2 class="font-serif text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-med-blue transition-colors">{{post.title}}</h2>
                <p class="text-slate-500 text-sm leading-relaxed">{{post.excerpt}}</p>
                <div class="mt-4 flex items-center gap-1 text-med-gold text-sm font-medium">
                  {read_link}
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </a>
          </div>
        ))}}
      </div>
      <div id="blog-empty" class="hidden text-center py-20">
        <p class="text-slate-400 text-lg mb-6">{no_results}</p>
        <button data-filter={json.dumps(all_label)} class="filter-btn" id="reset-btn">{show_all}</button>
      </div>
    </div>
  </section>

  <!-- Editorial -->
  <section class="bg-white py-20 px-6 border-t border-slate-100">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="font-serif text-3xl font-bold text-slate-900 mb-6">{lang_cfg['editorial_title']}</h2>
      <p class="text-slate-600 text-lg leading-relaxed">{lang_cfg['editorial_body']}</p>
    </div>
  </section>

</BaseLayout>

<style>
  .filter-btn {{
    @apply px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer;
    background-color: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.25);
    color: white;
  }}
  .filter-btn[data-active="true"] {{
    background-color: #D4AF37;
    border-color: #D4AF37;
    color: #0f172a;
  }}
  .blog-card[data-hidden] {{ display: none; }}
</style>

<script>
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const cards   = document.querySelectorAll<HTMLElement>('[data-category]');
  const emptyMsg = document.getElementById('blog-empty');
  const counter  = document.getElementById('blog-counter');

  function applyFilter(filter: string) {{
    buttons.forEach(b => b.dataset.filter === filter ? b.setAttribute('data-active','true') : b.removeAttribute('data-active'));
    let visible = 0;
    cards.forEach(card => {{
      const match = filter === {json.dumps(all_label)} || card.dataset.category === filter;
      match ? (card.removeAttribute('data-hidden'), visible++) : card.setAttribute('data-hidden','');
    }});
    if (counter) counter.textContent = `${{visible}} article${{visible === 1 ? '' : 's'}}`;
    if (emptyMsg) emptyMsg.classList.toggle('hidden', visible > 0);
  }}

  buttons.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.filter ?? {json.dumps(all_label)})));
</script>
"""
    out_dir = PAGES / lang_code / "blog"
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "index.astro").write_text(content, encoding="utf-8")
    print(f"  ✓ {lang_code}/blog/index.astro")


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        sys.exit("Set ANTHROPIC_API_KEY env var")

    client = anthropic.Anthropic(api_key=api_key)

    # Order: newest first (by id desc for display), but iterate by it-it slug
    posts_order = ["grotta-dello-smeraldo","alici-di-cetara","valle-delle-ferriere",
                   "delizia-al-limone","atrani","vini-costa-amalfi"]

    for lang_code, lang_cfg in LANGS.items():
        print(f"\n── {lang_code} ──────────────────────────────")
        all_data = {}

        for it_slug in posts_order:
            cp = cache_path(lang_code, it_slug)
            if cp.exists():
                print(f"  (cached) {it_slug}")
                all_data[it_slug] = json.loads(cp.read_text(encoding="utf-8"))
                continue

            print(f"  translating {it_slug}...", end=" ", flush=True)
            body_it = read_it_body(it_slug)
            tr = translate_post(client, it_slug, POSTS_IT[it_slug], body_it, lang_cfg["name"])
            cp.write_text(json.dumps(tr, ensure_ascii=False, indent=2), encoding="utf-8")
            all_data[it_slug] = tr
            print("done")
            time.sleep(0.5)  # be gentle with the API

        # Build title map for sidebar labels
        all_titles = {s: all_data[s].get("title", POSTS_IT[s]["title"]) for s in posts_order}

        print(f"  generating files...")
        for it_slug in posts_order:
            write_post(lang_code, it_slug, POSTS_IT[it_slug], all_data[it_slug], lang_cfg, all_titles)

        write_data_ts(lang_code, posts_order, all_data, lang_cfg)
        write_blog_index(lang_code, lang_cfg, all_data, posts_order)

    print("\n✅ Done! All blog files generated.")
    print("Next: git add + commit + push")

if __name__ == "__main__":
    main()
