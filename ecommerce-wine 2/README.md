# 🛒 E-commerce Demo - Next.js 14

Demo di applicazione e-commerce completa e pronta per il deploy!

## ✨ Caratteristiche

- ✅ Next.js 14 App Router
- ✅ TypeScript strict mode
- ✅ Design responsive
- ✅ Gestione carrello completa
- ✅ Accessibilità (a11y)
- ✅ Performance ottimizzate
- ✅ Pronto per il deploy

## 🚀 Deploy Rapido

### Opzione 1: Netlify (Consigliato)

1. **Vai su Netlify**: https://app.netlify.com
2. **"Add new site" → "Deploy manually"**
3. **Trascina questa cartella**
4. **Done!** Il sito sarà online in 1-2 minuti

### Opzione 2: Vercel

1. **Vai su Vercel**: https://vercel.com
2. **"New Project" → "Import"**
3. **Carica questa cartella o connetti GitHub**
4. **Deploy** - automatico!

### Opzione 3: GitHub Pages

```bash
# 1. Installa dipendenze
npm install

# 2. Build
npm run build

# 3. La cartella /out contiene il sito statico
# Caricala su GitHub Pages
```

## 💻 Sviluppo Locale

```bash
# Installa dipendenze
npm install

# Avvia server di sviluppo
npm run dev

# Apri http://localhost:3000
```

## 📦 Build

```bash
# Build per produzione
npm run build

# Il sito statico sarà in /out
```

## 🎯 Funzionalità Implementate

### Gestione Prodotti
- ✅ 6 prodotti di esempio
- ✅ Informazioni complete (prezzo, rating, recensioni)
- ✅ Controllo disponibilità
- ✅ Card responsive e animate

### Carrello
- ✅ Aggiunta prodotti
- ✅ Modifica quantità (+/-)
- ✅ Rimozione articoli
- ✅ Calcolo totale automatico
- ✅ Svuota carrello
- ✅ Badge contatore

### UI/UX
- ✅ Design moderno e pulito
- ✅ Animazioni smooth
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Emoji per visualizzazione prodotti
- ✅ Stati hover e feedback visivi

### Accessibilità
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Navigazione da tastiera
- ✅ Screen reader friendly

## 🛠 Tecnologie

- **Framework**: Next.js 14
- **Linguaggio**: TypeScript
- **Styling**: CSS puro (no framework)
- **Deploy**: Static Export (funziona ovunque)

## 📱 Compatibilità Browser

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 🔧 Configurazione

Il progetto è configurato per:
- Static export (`output: 'export'`)
- Immagini non ottimizzate (compatibilità hosting statico)
- TypeScript strict mode
- Next.js 14 App Router

## 📝 Note

Questo è un progetto dimostrativo che implementa gli standard di programmazione professionali per e-commerce React/Next.js.

**Pronto per il deploy!** Non servono configurazioni aggiuntive.

## 🆘 Troubleshooting

### Build fallisce su Netlify?
Assicurati che la build command sia: `npm run build`

### Pagina bianca dopo deploy?
Verifica che il sito usi `output: 'export'` in next.config.js

### Errori 404?
Con static export, tutte le route devono essere generate al build time.

## 📧 Supporto

Per problemi o domande, consulta la documentazione Next.js:
https://nextjs.org/docs
