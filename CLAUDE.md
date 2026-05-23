# OMG AI — Web

## Stack
HTML, CSS, JavaScript
Single page website
No frameworks, clean code

## Folder Structure
omgai-web/
  index.html
  style.css
  script.js
  favicon.ico
  favicon.png
  robots.txt
  sitemap.xml
  assets/
    portfolio/
      produktove/    (1.webp – 4.webp)
      reklamni/      (hf_*.webp — 11 souborů)
      lifestyle/     (prázdné)
      interiery/     (hf_*.webp — 5 souborů)
    logo/
      1_3.webp       (hlavní logo, 1500×500)
      1_1.png        (zdrojový soubor pro favicon)
    Hero/
      Hero.webp      (hero background, 1376×768)
    og-image.jpg     (1200×630, OG sdílení)

## Design
Dark background: #0A0A0A
Accent color: #00D4AA
Text: #FFFFFF
Secondary text: #888888
Font: Inter (Google Fonts)
Style: minimalist, modern, clean

## Logo
Image logo: assets/logo/1_3.webp
Height: 55px desktop, 44px mobile

## Sections (in order)
1. Hero
2. Jak to funguje
3. Portfolio
4. Ceník
5. O mně
6. FAQ
7. Kontakt

---

## 1. HERO
Headline: Váš produkt si zaslouží lepší fotky.
Subheadline: AI produktové fotky, lifestylové vizuály a reklamní bannery pro e-shopy.
CTA buttons: "Nezávazně poptat" → #kontakt, "Jak to funguje →" → #jak-to-funguje
Background: assets/Hero/Hero.webp with rgba(10,10,10,0.6) overlay (v CSS)
Full screen height (100svh)

## 2. JAK TO FUNGUJE
3 steps with SVG icons and dividers

Step 1: Pošlete podklady — vyplňte krátký dotazník
Step 2: My navrhneme koncepty — návrhy scén, schválení směru
Step 3: Dostanete hotové vizuály — do 2–3 pracovních dnů

## 3. PORTFOLIO
4 tabs: Produktové fotografie, Reklamní bannery, Lifestylové fotky, Interiéry

Desktop: grid s lightboxem (klik → lightbox s navigací šipkami)
Mobile: karusel se swipe gestem a tečkovými indikátory
Images defined in portfolioImages object in script.js (objekty {src, alt})
Grid shows 6 images, "Zobrazit více" button reveals rest (hidden on mobile)

## 4. CENÍK
Single column, 3 plans:
- Starter — 5 vizuálů — 2 490 Kč
- Standard — 10 vizuálů — 4 490 Kč (featured, "Nejpopulárnější")
- Premium — 20 vizuálů — 7 990 Kč

Note: formáty 1:1, 4:5, 9:16
Footer: individuální nabídka CTA → #kontakt

## 5. O MNĚ
Martin Gottvald, zakladatel VG Media (vgmedia.cz)
Max-width 720px centered block

## 6. FAQ
9 otázek, accordion (jedna otevřená najednou)

## 7. KONTAKT
Form: Jméno, Email, Popis projektu, Odeslat
Contact: info@omgai.cz, @o_mg_ai → instagram.com/o_mg_ai/

## Footer
© 2026 OMG AI · Zásady ochrany osobních údajů (opens privacy modal)

---

## Analytics & GDPR

### Google Analytics
Measurement ID: G-GK5GEYKT3G
Implementation: Consent Mode v2 (default: denied, granted after cookie accept)
Tracked events:
- `cta_click` — klik na jakýkoliv odkaz s href="#kontakt"
- `form_submit` — úspěšné odeslání kontaktního formuláře
- `portfolio_tab_click` — přepnutí záložky portfolia (parametr: tab name)

### Cookie Consent
Storage key: `omgai_cookie_consent` (localStorage)
Values: 'accepted' | 'declined'
Tlačítka: Odmítnout / Pouze nezbytné / Přijmout vše (gradient pink→purple)
Banner shows 800ms after first visit, slide-up animation

### Privacy Modal
Opens from: cookie banner link + footer link
Content: správce dat, formulář, Google Analytics, Google Fonts, cookies, práva uživatelů

---

## SEO

### Meta
- Title: "OMG AI — Profesionální produktové vizuály pro e-shopy"
- Description: "AI produktové fotky, lifestylové vizuály a reklamní bannery pro e-shopy. Hotovo do 2–3 pracovních dnů. Starter od 2 490 Kč."
- Canonical: https://www.omgai.cz/

### Open Graph & Twitter Card
- OG image: assets/og-image.jpg (1200×630)
- Vše nastaveno včetně og:image:width/height a og:site_name

### Strukturovaná data (JSON-LD)
- Organization (název, url, logo, email, Instagram, founder)
- Service (popis, areaServed: CZ, 3 offers s cenami)
- FAQPage (všech 9 otázek)

### Search Console
- Doména: omgai.cz (ověřeno DNS TXT)
- Sitemap odeslaná: https://www.omgai.cz/sitemap.xml

---

## Mobile Optimizations
- Carousel with swipe (touch listeners on .carousel element, not track)
- touch-action removed from carousel to prevent iOS Safari interference
- e.preventDefault() always called in touchmove (passive: false)
- btn-show-more hidden on mobile (display: none ≤768px)
- Nav-links hidden on mobile (display: none ≤768px)
- Tab buttons same size on mobile and desktop
- iOS Safari scroll lock in lightbox (position: fixed approach)
- Lightbox swipe support
- Responsive breakpoints: 768px, 600px, 480px
