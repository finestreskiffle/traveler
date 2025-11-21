# ✅ Test Meteo v2.2 - Checklist Rapida

## 🎯 Test Base (5 minuti)

### Test 1: Meteo con Google Maps
```
1. Apri index.html
2. Crea nuova tappa:
   ├─ Data: 15/12
   ├─ Luogo: Tokyo Tower
   ├─ Maps: https://www.google.com/maps/place/Tokyo+Tower/@35.6585805,139.7432442,17z
   └─ Salva
3. VERIFICA nella card:
   ✅ Icona meteo appare (☀️/⛅/🌧️/ecc)
   ✅ Temperature mostrate (es: 24° / 18°)
   ✅ Label "Meteo" o "Weather"
```

### Test 2: Meteo senza Google Maps
```
1. Crea nuova tappa:
   ├─ Data: 16/12
   ├─ Luogo: Paris
   ├─ Maps: [vuoto]
   └─ Salva
2. VERIFICA:
   ✅ Meteo appare comunque
   ✅ Usa geocoding di "Paris"
   ✅ Temperature corrette per Parigi
```

### Test 3: Stesso Giorno, Città Diverse
```
1. Crea 3 tappe per 20/12:
   ├─ Tappa 1: Milano (con/senza Maps)
   ├─ Tappa 2: Roma (con/senza Maps)
   └─ Tappa 3: Napoli (con/senza Maps)
2. VERIFICA:
   ✅ Ogni card mostra meteo DIVERSO
   ✅ Milano ≠ Roma ≠ Napoli
   ✅ Tutte per lo stesso giorno (20/12)
```

### Test 4: Giorni Diversi, Stessa Città
```
1. Crea 2 tappe per Tokyo:
   ├─ Tappa 1: Data 15/12
   └─ Tappa 2: Data 16/12
2. VERIFICA:
   ✅ Meteo DIVERSO per ogni tappa
   ✅ 15/12 ≠ 16/12
   ✅ Stessa città, giorni diversi
```

---

## 🔧 Test Avanzati (10 minuti)

### Test 5: Formati Data
```
Prova questi formati:
✅ 15/12       → Assume anno corrente
✅ 15/12/2024  → Anno specifico
✅ 5/1         → Funziona con singole cifre
❌ 2024-12-15  → Non supportato
❌ 15-12       → Non supportato
```

### Test 6: Link Google Maps Vari
```
Testa questi formati di link:
✅ https://www.google.com/maps/@35.6585,139.7432,15z
✅ https://www.google.com/maps/place/Nome/@35.6585,139.7432,15z
✅ https://maps.app.goo.gl/xyz (con coordinate nel URL)
✅ https://www.google.com/maps?q=35.6585,139.7432
```

### Test 7: Cambio Lingua
```
1. Vai in Settings
2. Cambia lingua da IT a EN
3. VERIFICA:
   ✅ Label "Meteo" → "Weather"
   ✅ Temperature invariate
   ✅ Icone invariate
```

### Test 8: Dark Mode
```
1. Attiva Dark Mode
2. VERIFICA:
   ✅ Widget meteo si adatta
   ✅ Testo leggibile
   ✅ Icone visibili
```

---

## 🐛 Test Errori

### Test 9: Senza Luogo né Maps
```
1. Crea tappa:
   ├─ Data: 15/12
   ├─ Luogo: [vuoto]
   ├─ Maps: [vuoto]
   └─ Salva
2. VERIFICA:
   ✅ Card appare normalmente
   ❌ Meteo NON appare (corretto!)
```

### Test 10: Data Non Valida
```
1. Crea tappa con date strane:
   ├─ "domani"
   ├─ "15"
   ├─ "abc"
2. VERIFICA:
   ⚠️ Meteo potrebbe non apparire
   ✅ App non crasha
```

### Test 11: API Lenta/Non Disponibile
```
1. Disattiva WiFi temporaneamente
2. Crea tappa
3. Riattiva WiFi
4. Ricarica pagina
5. VERIFICA:
   ✅ Meteo si carica dopo ricarica
   ✅ Nessun errore bloccante
```

---

## 📊 Risultati Attesi

### ✅ Tutti i Test Passano
```
✓ Meteo appare su ogni card
✓ Coordinate da Google Maps funzionano
✓ Fallback su Luogo funziona
✓ Date specifiche corrette
✓ Multi-città supportato
✓ Multi-giorno supportato
✓ Traduzioni funzionanti
✓ Dark mode compatibile
```

### ⚠️ Comportamenti Normali
```
⚠️ Meteo richiede 1-3 secondi per caricare
⚠️ Senza Luogo/Maps, meteo non appare
⚠️ Date lontane (>7 giorni) potrebbero mancare
⚠️ API gratuita può essere occasionalmente lenta
```

### ❌ Problemi da Segnalare
```
❌ App crasha quando aggiungi tappa
❌ Meteo non appare MAI anche con Luogo
❌ Meteo sbagliato per TUTTE le città
❌ Traduzioni non funzionano
❌ Dark mode rompe layout
```

---

## 🚀 Test Scenario Reale

### Viaggio Tokyo - Kyoto - Osaka
```
Giorno 1 (15/12):
├─ 09:00 → Partenza Milano
│  Luogo: Milan Airport
│  Maps: [link aeroporto]
│  Meteo: ⛅ 8° / 2°
│
├─ 22:00 → Arrivo Tokyo
   Luogo: Narita Airport
   Maps: [link aeroporto]
   Meteo: ☀️ 14° / 8°

Giorno 2 (16/12):
├─ 10:00 → Tokyo Tower
│  Maps: [link tower]
│  Meteo: ☀️ 15° / 9°
│
└─ 15:00 → Shibuya
   Maps: [link Shibuya]
   Meteo: ☀️ 15° / 9° (stesso giorno)

Giorno 3 (17/12):
├─ 08:00 → Partenza per Kyoto
│  Luogo: Tokyo Station
│  Meteo: 🌧️ 13° / 7°
│
└─ 11:00 → Arrivo Kyoto
   Luogo: Kyoto Station
   Meteo: 🌧️ 12° / 6° (città diversa)

VERIFICA:
✅ Milano meteo diverso da Tokyo
✅ Tokyo giorno 1 ≠ Tokyo giorno 2
✅ Tokyo ≠ Kyoto (stesso giorno)
✅ Ogni card indipendente
```

---

## 💻 Test Console

Apri console browser (F12) e verifica:

```javascript
// Nessun errore rosso
✅ No errors in console

// Log meteo (opzionale)
// Dovresti vedere:
"Fetching weather for trip..."
"Weather data received"

// Verifica weatherData
console.log(weatherData)
// Dovrebbe mostrare:
// { 0: { tempMax: 24, tempMin: 18, ... }, 1: {...}, ... }
```

---

## 📱 Test Mobile

### iPhone/Android
```
1. Apri Safari/Chrome su mobile
2. Vai all'URL dell'app
3. Crea tappe come sopra
4. VERIFICA:
   ✅ Meteo visibile e leggibile
   ✅ Icone grandi e chiare
   ✅ Temperature ben formattate
   ✅ Touch-friendly
```

---

## ⏱️ Tempo Stimato

- Test Base: **5 minuti**
- Test Avanzati: **10 minuti**
- Test Errori: **5 minuti**
- Test Scenario Reale: **10 minuti**
- **TOTALE: 30 minuti**

---

## 🎉 Checklist Finale

Prima di considerare il test completo:

- [ ] Meteo appare su singole card ✅
- [ ] Google Maps link funziona ✅
- [ ] Fallback su Luogo funziona ✅
- [ ] Date specifiche corrette ✅
- [ ] Multi-città supportato ✅
- [ ] Multi-giorno supportato ✅
- [ ] Traduzioni IT/EN ✅
- [ ] Dark mode funziona ✅
- [ ] Mobile responsive ✅
- [ ] Nessun crash/errore ✅

---

## 📞 Segnalazione Bug

Se trovi problemi, annota:
1. Browser e versione
2. Passi per riprodurre
3. Screenshot errore console
4. Dati tappa usata (Data, Luogo, Maps)

---

**Versione Test**: 2.2  
**Ultima Modifica**: Novembre 2024  
**Status**: ✅ Pronto per test!

Buon testing! 🧪✨
