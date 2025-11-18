# Travel Manager 🗺️

Una webapp PWA per gestire i tuoi viaggi, ottimizzata per iPhone con stile iOS 26.

## Funzionalità

- ✅ Visualizzazione tappe per giorno
- ✅ Navigazione tra giorni con pulsanti
- ✅ Import/Export file CSV (separatore `;`)
- ✅ Editing completo delle tappe (aggiungi, modifica, elimina, riordina)
- ✅ Link Google Maps cliccabili
- ✅ Riepilogo costi giornalieri e totali
- ✅ Modalità giorno/notte
- ✅ PWA installabile su iPhone
- ✅ Funzionamento offline con localStorage

## Formato CSV

Il file CSV deve usare il punto e virgola (`;`) come separatore:

```csv
Data;Orario Partenza;Orario Arrivo;Mezzo;Costo Mezzo;Luogo;Descrizione;Costi Vari;Maps
27/11;9:45;-;;;Torino;Volo Torino-Osaka;;
28/11;-;8:15;;;Osaka;Arrivo Osaka;;
```

## Deploy su GitHub + Vercel

### 1. Crea repository GitHub

```bash
# Inizializza git
cd travel-manager
git init
git add .
git commit -m "Initial commit"

# Crea repo su GitHub e collega
git remote add origin https://github.com/TUO-USERNAME/travel-manager.git
git branch -M main
git push -u origin main
```

### 2. Deploy su Vercel

1. Vai su [vercel.com](https://vercel.com) e accedi con GitHub
2. Clicca "New Project"
3. Importa il repository `travel-manager`
4. Lascia le impostazioni di default (Framework: Other)
5. Clicca "Deploy"

L'app sarà disponibile su `https://travel-manager-xxx.vercel.app`

### 3. Installa su iPhone

1. Apri Safari sul tuo iPhone
2. Vai all'URL della tua app Vercel
3. Tocca l'icona di condivisione (quadrato con freccia)
4. Scorri e tocca "Aggiungi a Home"
5. Conferma il nome e tocca "Aggiungi"

L'app apparirà come un'icona nella Home e funzionerà anche offline!

## Struttura file

```
travel-manager/
├── index.html          # App principale
├── manifest.json       # Configurazione PWA
├── sw.js              # Service Worker per offline
├── icon-192.png       # Icona PWA piccola
├── icon-512.png       # Icona PWA grande
├── esempio-viaggio.csv # File CSV di esempio
└── README.md          # Questo file
```

## Personalizzazione

### Colori
Modifica le variabili CSS in `:root` nel file `index.html` per personalizzare i colori.

### Campi CSV
Se vuoi aggiungere campi al CSV, modifica le funzioni `parseCSV`, `generateCSV` e il componente `TripModal`.

## Note tecniche

- React 18 via CDN
- CSS con variabili per tema chiaro/scuro
- LocalStorage per persistenza dati
- Service Worker per caching offline
- Safe areas per iPhone (notch e home indicator)

## Licenza

MIT - Usa liberamente!
