# Produktions-Dashboard

Modernes Produktions-Dashboard auf Basis der älteren Projekte `blister-rechner` und `proDash` – komplett neu aufgebaut.

## Features

- **Rechner**: Blister-Berechnung (Pillen ÷ Teiler) mit Rest-Anzeige, Schicht- und Chargen-Erfassung, Sonderfall-Handling (z. B. Qlaira)
- **Statistik**: KPI-Karten (Blister gesamt/heute, Rest-Pillen) und Balkendiagramme pro Produkt, pro Schicht und 7-Tage-Trend
- **Verlauf**: Durchsuchbare, filterbare Tabelle aller Berechnungen mit CSV-Export (Excel-kompatibel, Semikolon-getrennt)
- **Produkte**: Produkte anlegen, bearbeiten, löschen – Teiler und Farbe frei konfigurierbar
- **Persistenz**: Alles wird in `localStorage` gespeichert (kein Backend nötig)

## Stack

- React 18
- Vite 5
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Plain JavaScript (kein TypeScript)

## Entwicklung

```bash
npm install
npm run dev
```

## Build & Deployment

```bash
npm run build      # erzeugt dist/
npm run preview    # lokale Vorschau des Builds
```

`vite.config.js` nutzt `base: './'`, daher funktioniert der Build direkt auf **GitHub Pages**, Netlify, Vercel oder jedem statischen Host:

- **GitHub Pages**: `dist/` in den `gh-pages`-Branch pushen (oder GitHub Action)
- **Netlify/Vercel**: Repo verbinden, Build-Command `npm run build`, Output `dist`

## Projektstruktur

```
src/
  App.jsx                  # Shell, Tabs, State + Persistenz
  components/
    Rechner.jsx            # Blister-Rechner
    Statistik.jsx          # KPIs + Charts
    Verlauf.jsx            # Historie + CSV-Export
    Produkte.jsx           # Produktverwaltung
  lib/
    storage.js             # localStorage-Helfer + Default-Daten
    csv.js                 # CSV-Export
```
