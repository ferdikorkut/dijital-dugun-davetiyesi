# Dijital Düğün Davetiyesi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static, scroll-based digital wedding invitation site (HTML/CSS/JS, CDN libraries, no build step) per the approved design spec (`docs/superpowers/specs/2026-06-15-dijital-dugun-davetiyesi-design.md`).

**Architecture:** A single `index.html` contains all markup (opening overlay, 7 content sections, fixed music-disc/bottom-nav elements). One global `css/styles.css` holds the gold-on-dark design system. Two JS files drive behavior: `js/config.js` (the one tunable value — countdown target date) and `js/main.js` (Lenis smooth scroll, GSAP opening timeline, ScrollTrigger reveals/parallax, countdown, nav highlighting, music toggle, `?to=` personalization). All real content (names, dates, venues, photos, quote, music) is left as clearly-marked bracketed Turkish placeholders (e.g. `[Gelin Adı]`) for the couple to fill in later; generated placeholder images/audio make the page fully functional out of the box.

**Tech Stack:** UIkit 3.16.24, GSAP 3.12.2 + ScrollTrigger, Lenis 1.0.29, Font Awesome 6.4.0, Google Fonts (Cinzel Decorative, Pinyon Script, Cormorant Garamond) — all via CDN, no build tooling. Verification uses `python3 -m http.server` plus `curl`/`grep` checks (no JS test framework — this is a static decorative site, so "tests" are resource-load and structure checks per the spec's Doğrulama Planı).

---

## Task 1: Placeholder görseller, ses dosyası ve boş kaynak dosyaları

Bu görev, sonraki adımların referans vereceği tüm dosyaların **var olmasını** sağlar (gerçek arka plan fotoğrafı + üretilen placeholder görsel/ses), böylece `index.html` yazıldığında hiçbir kaynak 404 vermez.

**Files:**
- Create: `assets/images/background.jpg` (proje kökündeki `hg.jpg`'nin kopyası)
- Create: `assets/images/bride.svg`
- Create: `assets/images/groom.svg`
- Create: `assets/images/gallery-1.svg`, `gallery-2.svg`, `gallery-3.svg`, `gallery-4.svg`
- Create: `assets/audio/silence.wav`
- Create: `css/styles.css` (boş stub)
- Create: `js/config.js` (boş stub)
- Create: `js/main.js` (boş stub)

- [ ] **Step 1: Klasörleri oluştur ve arka plan fotoğrafını kopyala**

```bash
mkdir -p assets/images assets/audio css js
cp hg.jpg assets/images/background.jpg
```

- [ ] **Step 2: Doğrula**

```bash
file assets/images/background.jpg
```

Expected: `assets/images/background.jpg: JPEG image data ... 1472x2576`

- [ ] **Step 3: Gelin fotoğrafı placeholder'ını oluştur (`assets/images/bride.svg`)**

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="360" height="520" viewBox="0 0 360 520">
  <rect width="360" height="520" fill="#1a1a1a"/>
  <rect x="6" y="6" width="348" height="508" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="10 8"/>
  <text x="180" y="250" font-family="Georgia, serif" font-size="22" fill="#D4AF37" text-anchor="middle">Gelin Fotoğrafı</text>
  <text x="180" y="282" font-family="Georgia, serif" font-size="13" fill="#8E6E22" text-anchor="middle">buraya eklenecek</text>
</svg>
```

- [ ] **Step 4: Damat fotoğrafı placeholder'ını oluştur (`assets/images/groom.svg`)**

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="360" height="520" viewBox="0 0 360 520">
  <rect width="360" height="520" fill="#1a1a1a"/>
  <rect x="6" y="6" width="348" height="508" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="10 8"/>
  <text x="180" y="250" font-family="Georgia, serif" font-size="22" fill="#D4AF37" text-anchor="middle">Damat Fotoğrafı</text>
  <text x="180" y="282" font-family="Georgia, serif" font-size="13" fill="#8E6E22" text-anchor="middle">buraya eklenecek</text>
</svg>
```

- [ ] **Step 5: Galeri placeholder'larını oluştur (4 adet, 600x600)**

Create `assets/images/gallery-1.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <rect width="600" height="600" fill="#1a1a1a"/>
  <rect x="8" y="8" width="584" height="584" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="12 10"/>
  <text x="300" y="310" font-family="Georgia, serif" font-size="28" fill="#D4AF37" text-anchor="middle">Fotoğraf 1</text>
</svg>
```

Create `assets/images/gallery-2.svg`, `gallery-3.svg`, `gallery-4.svg` identically, only changing `Fotoğraf 1` → `Fotoğraf 2` / `Fotoğraf 3` / `Fotoğraf 4` in the `<text>` element.

- [ ] **Step 6: Sessiz ses dosyasını oluştur (`assets/audio/silence.wav`)**

```bash
python3 - <<'EOF'
import wave
import struct

with wave.open("assets/audio/silence.wav", "w") as f:
    f.setnchannels(1)
    f.setsampwidth(2)
    f.setframerate(44100)
    f.writeframes(struct.pack("<h", 0) * 44100)  # 1 second of silence
EOF
```

- [ ] **Step 7: Boş stub dosyalarını oluştur**

```bash
printf '/* styles will be added in Task 3 */\n' > css/styles.css
printf '/* config will be added in Task 4 */\n' > js/config.js
printf '/* behavior will be added in Task 4 */\n' > js/main.js
```

- [ ] **Step 8: Tüm dosyaların oluştuğunu doğrula**

```bash
ls -la assets/images assets/audio css js
```

Expected: `background.jpg`, `bride.svg`, `groom.svg`, `gallery-1.svg`..`gallery-4.svg`, `silence.wav`, `styles.css`, `config.js`, `main.js` all present.

- [ ] **Step 9: Commit**

```bash
git add assets css js
git commit -m "Placeholder görseller, ses dosyası ve boş kaynak dosyalarını ekle"
```

---

## Task 2: `index.html` — sayfa iskeleti ve tüm bölümlerin markup'ı

Tüm sayfa tek dosyada: açılış katmanı (opening overlay), 7 içerik bölümü ve
sabit elemanlar (müzik diski, alt nav). Tüm içerik placeholder'ları köşeli
parantez (`[Gelin Adı]` gibi) ile işaretli — çift bunları daha sonra
düzenleyecek. CSS/JS dosyaları Task 1'de stub olarak oluşturulduğu için hiçbir
kaynak 404 vermeyecek.

**Files:**
- Create: `index.html`

- [ ] **Step 1: `index.html` dosyasını oluştur**

```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#000000">
    <meta name="format-detection" content="telephone=no">
    <title>[Gelin Adı] & [Damat Adı] - Düğün Davetiyesi</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.16.24/dist/css/uikit.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <audio id="bgMusic" loop src="assets/audio/silence.wav"></audio>
    <div class="music-disc" id="musicBtn"><i class="fas fa-compact-disc"></i></div>

    <div id="bg-opening" class="bg-layer">
        <div class="dark-overlay" style="background: rgba(0,0,0,0.3);"></div>
        <img src="assets/images/background.jpg" class="bg-img" id="img-opening" alt="">
    </div>

    <div id="opening-content">
        <div class="uk-container">
            <p class="opening-eyebrow">Evleniyoruz</p>
            <h1 class="shimmer-gold hero-title-name">[Gelin Adı]<br><span class="font-script amp">&amp;</span><br>[Damat Adı]</h1>
            <div class="guest-box">
                <p class="guest-label">Sayın:</p>
                <h3 id="guestName" class="guest-name">Değerli Dostumuz</h3>
            </div>
            <div><button class="btn-open" id="openBtn" type="button">Davetiyeyi Aç</button></div>
        </div>
    </div>

    <div id="bg-main" class="bg-layer">
        <div class="dark-overlay"></div>
        <img src="assets/images/background.jpg" class="bg-img" id="img-main" alt="">
    </div>

    <nav class="nav-bar" id="navbar">
        <a href="#home" class="nav-item active"><i class="fas fa-home"></i></a>
        <a href="#couple" class="nav-item"><i class="fas fa-heart"></i></a>
        <a href="#event" class="nav-item"><i class="fas fa-calendar-alt"></i></a>
        <a href="#gallery" class="nav-item"><i class="fas fa-images"></i></a>
    </nav>

    <main id="main-content">
        <section id="home" class="full-screen uk-flex uk-flex-middle uk-flex-center uk-text-center">
            <div class="uk-container">
                <div class="gs-anim"><span class="vertical-line"></span></div>
                <p class="hero-subtitle gs-anim">Düğün Merasimi</p>
                <h1 class="hero-title-name shimmer-gold gs-anim">[Gelin Adı] <span class="font-script amp-inline">&amp;</span> [Damat Adı]</h1>
                <div class="gs-anim divider-line"></div>
                <p class="hero-date gs-anim">[DÜĞÜN GÜNÜ], [DÜĞÜN TARİHİ]</p>
                <p class="hero-location gs-anim">[ŞEHİR], TÜRKİYE</p>
                <p class="hero-quote gs-anim">
                    "[Buraya birbirinize dair özel bir söz, şiir<br>
                    veya anı yazabilirsiniz.<br>
                    Bu satırlar sizin hikayenizi anlatsın.]"
                </p>
                <div class="scroll-indicator gs-anim">
                    <p>AŞAĞI KAYDIR</p>
                    <i class="fas fa-chevron-down fa-bounce"></i>
                </div>
            </div>
        </section>

        <section id="couple" class="uk-section">
            <div class="uk-container">
                <h2 class="text-title gs-anim">Gelin &amp; Damat</h2>
                <div class="mini-couple-grid">
                    <div class="couple-divider">&amp;</div>
                    <div class="mini-card gs-anim-left">
                        <div class="mini-frame">
                            <div class="mini-img-wrapper"><img src="assets/images/bride.svg" alt="[Gelin Adı]"></div>
                        </div>
                        <h3 class="mini-name">[Gelin Adı]</h3>
                        <p class="mini-parent">[Gelin Annesi] &amp; [Gelin Babası]'nın Kızı</p>
                    </div>
                    <div class="mini-card gs-anim-right">
                        <div class="mini-frame">
                            <div class="mini-img-wrapper"><img src="assets/images/groom.svg" alt="[Damat Adı]"></div>
                        </div>
                        <h3 class="mini-name">[Damat Adı]</h3>
                        <p class="mini-parent">[Damat Annesi] &amp; [Damat Babası]'nın Oğlu</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="uk-section uk-padding-remove-top">
            <div class="uk-container uk-container-small uk-text-center">
                <h3 class="text-title countdown-title gs-anim">Büyük Güne Kalan</h3>
                <div class="countdown-wrapper gs-anim">
                    <div class="cd-box"><div class="cd-number" id="cd-days">00</div><div class="cd-label">GÜN</div></div>
                    <div class="cd-box"><div class="cd-number" id="cd-hours">00</div><div class="cd-label">SAAT</div></div>
                    <div class="cd-box"><div class="cd-number" id="cd-minutes">00</div><div class="cd-label">DK</div></div>
                    <div class="cd-box"><div class="cd-number" id="cd-seconds">00</div><div class="cd-label">SN</div></div>
                </div>
            </div>
        </section>

        <section id="event" class="uk-section">
            <div class="uk-container uk-container-small uk-text-center">
                <h2 class="text-title gs-anim">Merasim Detayları</h2>
                <div class="glass-box event-grid-wrap gs-anim">
                    <div class="uk-grid-divider uk-child-width-1-1 uk-child-width-1-2@s event-grid" uk-grid>
                        <div class="event-card">
                            <i class="fas fa-ring event-icon"></i>
                            <h3 class="event-title">Kına</h3>
                            <div class="event-datetime">
                                <span class="event-date">[KINA TARİHİ]</span><br>
                                <span class="font-script event-time">[KINA SAATİ]</span><br>
                                <span class="event-day">[KINA GÜNÜ]</span>
                            </div>
                            <p class="event-venue">
                                <strong>[KINA MEKAN ADI]</strong><br>
                                <span class="event-address">[KINA ADRES]</span>
                            </p>
                            <div class="event-cta">
                                <!-- DÜZENLE: Google Maps konum linkini buraya yapıştırın -->
                                <a href="#" target="_blank" class="map-btn">
                                    <i class="fas fa-map-marker-alt"></i> Konum Gör
                                </a>
                            </div>
                        </div>
                        <div class="event-card">
                            <i class="fas fa-glass-cheers event-icon"></i>
                            <h3 class="event-title">Düğün Merasimi</h3>
                            <div class="event-datetime">
                                <span class="event-date">[DÜĞÜN TARİHİ]</span><br>
                                <span class="font-script event-time">[DÜĞÜN SAATİ]</span><br>
                                <span class="event-day">[DÜĞÜN GÜNÜ]</span>
                            </div>
                            <p class="event-venue">
                                <strong>[DÜĞÜN MEKAN ADI]</strong><br>
                                <span class="event-address">[DÜĞÜN ADRES]</span>
                            </p>
                            <div class="event-cta">
                                <!-- DÜZENLE: Google Maps konum linkini buraya yapıştırın -->
                                <a href="#" target="_blank" class="map-btn">
                                    <i class="fas fa-map-marker-alt"></i> Konum Gör
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="gallery" class="uk-section">
            <div class="uk-container">
                <h2 class="text-title gs-anim">Hatıralarımız</h2>
                <div class="gallery-grid">
                    <div class="gallery-item gs-gallery">
                        <div class="gallery-frame">
                            <img src="assets/images/gallery-1.svg" alt="Fotoğraf 1">
                            <div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>
                        </div>
                    </div>
                    <div class="gallery-item gs-gallery">
                        <div class="gallery-frame">
                            <img src="assets/images/gallery-2.svg" alt="Fotoğraf 2">
                            <div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>
                        </div>
                    </div>
                    <div class="gallery-item gs-gallery">
                        <div class="gallery-frame">
                            <img src="assets/images/gallery-3.svg" alt="Fotoğraf 3">
                            <div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>
                        </div>
                    </div>
                    <div class="gallery-item gs-gallery">
                        <div class="gallery-frame">
                            <img src="assets/images/gallery-4.svg" alt="Fotoğraf 4">
                            <div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="footer-section">
            <div class="uk-container uk-container-small">
                <div class="footer-ornament">❖</div>
                <p class="footer-subtitle">Sizleri de Aramızda Görmekten Onur Duyarız</p>
                <div class="footer-divider"></div>
                <h2 class="footer-names">[Gelin Adı] &amp; [Damat Adı]</h2>
                <div class="footer-family">
                    <p>Bu mutlu günümüzde yanımızda olacak tüm dostlarımıza şimdiden teşekkür ederiz.</p>
                    <p class="footer-italic">Sevgi ve Saygılarımızla...</p>
                </div>
                <div class="footer-ornament">❖</div>
                <div class="footer-host">
                    <p class="footer-subtitle footer-host-label">Davet Edenler</p>
                    <p class="footer-host-title">Aileleri</p>
                    <p class="footer-host-names"><strong>[Gelin Annesi] &amp; [Gelin Babası] - [Damat Annesi] &amp; [Damat Babası]</strong></p>
                </div>
            </div>
            <div class="spacer-100"></div>
        </footer>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/uikit@3.16.24/dist/js/uikit.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="https://unpkg.com/@studio-freight/lenis@1.0.29/dist/lenis.min.js"></script>
    <script src="js/config.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Yapısal kontrol — gerekli ID/section'lar mevcut mu**

```bash
grep -oE 'id="[a-zA-Z0-9_-]+"' index.html | sort -u
```

Expected output includes (among others): `id="bg-main"`, `id="bg-opening"`, `id="bgMusic"`, `id="cd-days"`, `id="cd-hours"`, `id="cd-minutes"`, `id="cd-seconds"`, `id="couple"`, `id="event"`, `id="gallery"`, `id="guestName"`, `id="home"`, `id="img-main"`, `id="img-opening"`, `id="main-content"`, `id="musicBtn"`, `id="navbar"`, `id="openBtn"`, `id="opening-content"`.

- [ ] **Step 3: Yerel sunucu üzerinden aç ve konsol hatası olmadığını doğrula**

```bash
python3 -m http.server 8000 &
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/assets/images/background.jpg
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/assets/audio/silence.wav
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/css/styles.css
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/js/config.js
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/js/main.js
```

Expected: every line prints `200`. Open `http://localhost:8000/` in a browser — page renders as unstyled (no CSS yet) but content-only HTML, with no 404s in the DevTools console. Stop the server afterwards:

```bash
kill %1
```

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "index.html: tüm bölümlerin markup'ını ekle (placeholder içerikli)"
```

---

## Task 3: `css/styles.css` — tasarım sistemi ve bölüm stilleri

Spec'teki gold palet, tipografi (Cinzel Decorative / Pinyon Script /
Cormorant Garamond), arka plan fotoğraf+overlay ve her bölümün görsel
stilini tanımlar. `index.html`'deki tüm sınıf adlarıyla bire bir eşleşir.

**Files:**
- Modify: `css/styles.css` (Task 1'de oluşturulan stub'ın üzerine yazılır)

- [ ] **Step 1: `css/styles.css` içeriğini yaz**

```css
:root {
    --gold-light: #F9E29C;
    --gold-mid: #D4AF37;
    --gold-dark: #8E6E22;
    --gold-gradient: linear-gradient(135deg, #F9E29C, #D4AF37, #8E6E22);
    --glass-bg: rgba(20, 20, 20, 0.85);
    --glass-border: 1px solid rgba(255, 255, 255, 0.15);
}

* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    background: #000;
    color: #eee;
    font-family: 'Cormorant Garamond', serif;
    overflow-x: hidden;
}

h1, h2, h3 { font-family: 'Cinzel Decorative', cursive; color: var(--gold-light); text-align: center; }

.font-script { font-family: 'Pinyon Script', cursive; color: var(--gold-mid); line-height: 1.2; }

.uk-section { padding-top: 60px; padding-bottom: 60px; }
.spacer-100 { height: 80px; }
.text-title { margin-bottom: 30px; }

/* Background layers */
.full-screen { width: 100%; height: 100dvh; position: relative; }
.bg-layer { position: fixed; inset: 0; width: 100%; height: 100dvh; z-index: -1; overflow: hidden; pointer-events: none; }
.bg-img { width: 100%; height: 100%; object-fit: cover; object-position: center; opacity: 0.32; transform: scale(1.05); }
#bg-opening { z-index: 800; background: #000; }
#bg-opening .bg-img { opacity: 0.45; transform: scale(1.15); }
#bg-main { z-index: -5; }
.dark-overlay { position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(0,0,0,0.2), #000 85%); pointer-events: none; }

/* Shimmer gold text */
.shimmer-gold {
    background: linear-gradient(to right, #8E6E22 0%, #fff 50%, #8E6E22 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: shine 4s linear infinite;
}
@keyframes shine { to { background-position: 200% center; } }

/* Opening overlay (Hero) */
#opening-content {
    position: fixed;
    inset: 0;
    z-index: 801;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    text-align: center;
}
#main-content { opacity: 0; pointer-events: none; }
.opening-eyebrow { text-transform: uppercase; letter-spacing: 3px; font-size: 0.75rem; opacity: 0.8; }
.hero-title-name { font-size: clamp(2.8rem, 9vw, 5.5rem); line-height: 1.1; margin: 10px 0; }
#opening-content .hero-title-name { font-size: clamp(2.4rem, 11vw, 4rem); }
.amp { font-size: 0.6em; color: #fff; }
.amp-inline { font-size: 0.5em; color: #fff; vertical-align: middle; }

.guest-box {
    margin-top: 30px;
    border: var(--glass-border);
    padding: 12px 30px;
    display: inline-block;
    border-radius: 50px;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(8px);
}
.guest-label { margin: 0; font-size: 0.8rem; }
.guest-name {
    font-family: 'Cormorant Garamond';
    font-size: 1.3rem;
    color: var(--gold-light);
    margin: 5px 0 0 0;
    text-transform: capitalize;
}

.btn-open {
    background: transparent;
    border: 1px solid var(--gold-light);
    color: var(--gold-light);
    padding: 12px 35px;
    border-radius: 50px;
    font-size: 0.9rem;
    font-family: 'Cinzel Decorative';
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 25px;
    transition: 0.3s;
    cursor: pointer;
}
.btn-open:hover { background: var(--gold-light); color: #000; }

/* Section: Düğün Merasimi Girişi */
.hero-subtitle { font-size: clamp(0.7rem, 3vw, 0.9rem); letter-spacing: 5px; text-transform: uppercase; color: #ccc; }
.vertical-line { width: 1px; height: 60px; background: linear-gradient(to bottom, transparent, var(--gold-mid)); margin: 0 auto 20px; display: block; }
.divider-line { width: 80px; height: 1px; background: var(--gold-mid); margin: 20px auto; opacity: 0.6; }
.hero-date { font-size: clamp(1rem, 4vw, 1.2rem); letter-spacing: 3px; color: var(--gold-light); margin-top: 15px; }
.hero-location { font-size: 0.85rem; letter-spacing: 2px; opacity: 0.7; }
.hero-quote {
    font-family: 'Cormorant Garamond';
    font-style: italic;
    font-size: clamp(1.3rem, 4vw, 2rem);
    color: var(--gold-light);
    text-shadow: 2px 2px 8px rgba(0,0,0,0.9);
    line-height: 1.5;
    margin-top: 25px;
}
.scroll-indicator { margin-top: 50px; opacity: 0.6; }
.scroll-indicator p { font-size: 0.6rem; letter-spacing: 2px; margin-bottom: 5px; }
.scroll-indicator i { color: var(--gold-light); }

/* Section: Gelin & Damat */
.mini-couple-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 500px; margin: 0 auto; position: relative; }
.mini-card { background: rgba(30, 30, 30, 0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px 100px 10px 10px; padding: 8px; text-align: center; transition: transform 0.5s ease; }
.mini-frame { width: 100%; aspect-ratio: 9 / 13; border-radius: 90px 90px 5px 5px; overflow: hidden; position: relative; margin-bottom: 10px; border: 1px solid var(--gold-dark); }
.mini-img-wrapper { width: 100%; height: 120%; position: absolute; top: 0; left: 0; }
.mini-img-wrapper img { width: 100%; height: 100%; object-fit: cover; filter: sepia(10%); transition: 0.5s; }
.mini-name { font-family: 'Cinzel Decorative'; font-size: 1.1rem; color: var(--gold-light); margin: 5px 0 0 0; }
.mini-parent { font-family: 'Cormorant Garamond'; font-size: 0.75rem; color: #ccc; line-height: 1.2; margin-bottom: 10px; font-style: italic; }
.couple-divider {
    position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%);
    background: var(--gold-mid); color: #000; width: 30px; height: 30px;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-family: 'Pinyon Script'; font-size: 1.2rem; z-index: 10;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
}
.mini-card:hover { transform: translateY(-5px); border-color: var(--gold-mid); }
.mini-card:hover img { filter: sepia(0%); }

/* Section: Geri Sayım */
.countdown-title { font-size: 1.5rem; margin-bottom: 15px; }
.countdown-wrapper { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-top: 20px; }
.cd-box { width: 70px; padding: 10px 0; background: rgba(255,255,255,0.03); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 10px; text-align: center; backdrop-filter: blur(5px); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
.cd-number { font-family: 'Cinzel Decorative'; font-size: 1.6rem; color: var(--gold-light); line-height: 1; margin-bottom: 5px; }
.cd-label { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.7; }
.countdown-done { width: 100%; color: var(--gold-light); text-align: center; }

/* Section: Merasim Detayları */
.glass-box { background: var(--glass-bg); backdrop-filter: blur(20px); border: var(--glass-border); padding: 25px; border-radius: 15px; box-shadow: 0 15px 35px rgba(0,0,0,0.4); width: 100%; max-width: 450px; margin: 0 auto; }
.event-grid-wrap { padding: 30px 20px; }
.event-grid { border-color: rgba(212, 175, 55, 0.3); }
.event-icon { font-size: 1.5rem; color: var(--gold-mid); margin-bottom: 15px; }
.event-title { margin: 0; font-family: 'Cinzel Decorative'; font-size: 1.4rem; color: var(--gold-light); }
.event-datetime { margin: 10px 0; }
.event-date { font-size: 0.9rem; letter-spacing: 2px; opacity: 0.8; }
.event-time { font-size: 2.5rem; line-height: 1; display: inline-block; }
.event-day { font-size: 0.7rem; opacity: 0.6; }
.event-venue { margin-top: 10px; line-height: 1.6; font-size: 1rem; }
.event-address { opacity: 0.7; }
.event-cta { margin-top: 15px; }
.map-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--gold-gradient);
    color: #000;
    border-radius: 30px;
    padding: 10px 25px;
    font-weight: bold;
    text-decoration: none;
    font-family: 'Cormorant Garamond';
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
    transition: transform 0.3s;
}
.map-btn:hover { transform: translateY(-2px); }

/* Section: Fotoğraf Galerisi */
.gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; max-width: 600px; margin: 0 auto; }
.gallery-item { position: relative; overflow: hidden; border-radius: 15px; aspect-ratio: 1; }
.gallery-frame { width: 100%; height: 100%; position: relative; overflow: hidden; border: 2px solid rgba(212, 175, 55, 0.2); border-radius: 15px; background: rgba(20, 20, 20, 0.5); backdrop-filter: blur(5px); }
.gallery-frame img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.6s ease; filter: grayscale(20%) brightness(0.9); }
.gallery-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(212, 175, 55, 0.8), rgba(142, 110, 34, 0.8)); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s ease; }
.gallery-overlay i { font-size: 2rem; color: #fff; transform: scale(0); transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.gallery-item:hover .gallery-frame { border-color: var(--gold-mid); }
.gallery-item:hover .gallery-frame img { transform: scale(1.15); filter: grayscale(0%) brightness(1); }
.gallery-item:hover .gallery-overlay { opacity: 1; }
.gallery-item:hover .gallery-overlay i { transform: scale(1); }
@media (max-width: 640px) { .gallery-grid { gap: 10px; } }

/* Footer */
.footer-section { background: linear-gradient(180deg, transparent, rgba(0,0,0,0.8)); padding: 60px 20px 40px; text-align: center; position: relative; }
.footer-ornament { font-size: 1.5rem; color: var(--gold-mid); margin: 20px 0; opacity: 0.6; }
.footer-subtitle { font-family: 'Cormorant Garamond', serif; font-size: 0.9rem; letter-spacing: 3px; text-transform: uppercase; opacity: 0.7; margin: 10px 0; }
.footer-divider { width: 80px; height: 2px; background: var(--gold-gradient); margin: 0 auto 30px; opacity: 0.8; }
.footer-names { font-family: 'Pinyon Script', cursive; font-size: clamp(2rem, 6vw, 3.5rem); color: var(--gold-light); margin: 20px 0; line-height: 1.2; }
.footer-family { font-size: 1rem; line-height: 1.8; color: #ccc; margin: 25px 0; max-width: 500px; margin-left: auto; margin-right: auto; }
.footer-italic { font-style: italic; font-size: 0.95rem; opacity: 0.8; }
.footer-host { margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(212, 175, 55, 0.2); }
.footer-host-label { font-size: 0.75rem; margin-bottom: 8px; }
.footer-host-title { font-family: 'Cinzel Decorative'; color: var(--gold-light); font-size: 0.9rem; margin-bottom: 5px; }
.footer-host-names { font-size: 1.1rem; margin: 5px 0; }

/* Fixed elements: music disc + bottom nav */
.music-disc {
    position: fixed; top: 25px; right: 20px; width: 40px; height: 40px;
    z-index: 5000; border-radius: 50%; border: 1px solid var(--gold-mid);
    background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;
    color: var(--gold-mid); cursor: pointer;
    animation: spin 8s linear infinite paused;
}
.music-disc.playing { animation-play-state: running; background: rgba(212, 175, 55, 0.1); }
@keyframes spin { 100% { transform: rotate(360deg); } }

.nav-bar {
    position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%) translateY(100px);
    display: flex; gap: 5px; padding: 6px;
    background: rgba(10, 10, 10, 0.9); backdrop-filter: blur(15px);
    border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 50px;
    z-index: 4000; opacity: 0; transition: 0.8s;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.nav-item { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #888; font-size: 1rem; transition: 0.4s; text-decoration: none; }
.nav-item.active { color: #000; background: var(--gold-gradient); box-shadow: 0 0 10px rgba(212, 175, 55, 0.6); }

/* Responsive tweaks */
@media (max-width: 640px) {
    .event-grid-wrap { padding: 20px 12px; }
    .glass-box { padding: 16px; }
}
```

- [ ] **Step 2: Yerel sunucuda görsel kontrol**

```bash
python3 -m http.server 8000 &
```

Open `http://localhost:8000/` in a browser. Expected:
- Full-bleed background photo (the floral image) with a dark radial overlay
- Opening overlay shows "EVLENİYOUZ"-style eyebrow, large shimmering gold
  `[Gelin Adı] & [Damat Adı]` title, "Sayın: Değerli Dostumuz" pill, and the
  "Davetiyeyi Aç" outline button
- Gold music-disc icon fixed top-right
- No console errors

Stop the server:

```bash
kill %1
```

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "css/styles.css: gold tasarım sistemini ve bölüm stillerini ekle"
```

---

## Task 4: `js/config.js` ve `js/main.js` — etkileşim ve animasyonlar

Açılış GSAP timeline'ı, Lenis smooth scroll, ScrollTrigger parallax/reveal,
geri sayım, alt nav vurgulama, müzik aç/kapa ve `?to=` kişiselleştirmesini
ekler.

**Files:**
- Modify: `js/config.js` (Task 1'de oluşturulan stub'ın üzerine yazılır)
- Modify: `js/main.js` (Task 1'de oluşturulan stub'ın üzerine yazılır)

- [ ] **Step 1: `js/config.js` içeriğini yaz**

```js
// Düğün Davetiyesi - Ayarlar
//
// countdownTarget: Geri sayımın hedef tarihi/saati.
// Format: "Ay Gün, Yıl Saat:Dakika:Saniye" (örnek: "Sep 12, 2026 20:00:00")
// Not: Bu tarih, index.html'deki "Merasim Detayları" bölümünde
// [DÜĞÜN TARİHİ] / [DÜĞÜN SAATİ] olarak yazılan değerlerle aynı olmalıdır.
const WEDDING_CONFIG = {
    countdownTarget: "Sep 12, 2026 20:00:00"
};
```

- [ ] **Step 2: `js/main.js` içeriğini yaz**

```js
// --- Smooth scroll (Lenis) ---
try {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
} catch (e) {
    console.log("Native scroll used");
}

gsap.registerPlugin(ScrollTrigger);

// --- Opening sequence ---
let invitationOpened = false;

function openInvitation() {
    if (invitationOpened) return;
    invitationOpened = true;

    const openingContent = document.querySelector("#opening-content");
    const bgOpening = document.querySelector("#bg-opening");
    const mainContent = document.querySelector("#main-content");
    const navbar = document.querySelector("#navbar");

    const audio = document.getElementById("bgMusic");
    audio?.play()
        .then(() => document.getElementById("musicBtn")?.classList.add("playing"))
        .catch(() => {});

    const tl = gsap.timeline();

    if (openingContent) {
        tl.to(openingContent, {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => {
                openingContent.style.pointerEvents = "none";
                openingContent.style.display = "none";
            }
        });
    }

    if (bgOpening) {
        tl.to(bgOpening, {
            yPercent: -100,
            duration: 1.5,
            ease: "power4.inOut",
            onComplete: () => bgOpening.remove()
        }, "-=0.4");
    }

    if (mainContent) {
        tl.to(mainContent, { opacity: 1, pointerEvents: "all", duration: 0.5 }, "-=0.8");
    }

    tl.from(".gs-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
    }, "-=0.5");

    if (navbar) {
        tl.to(navbar, { y: 0, opacity: 1, duration: 1 }, "-=0.8");
    }

    initParallax();
}

// --- Scroll-triggered parallax & reveals ---
function initParallax() {
    gsap.to("#img-main", {
        scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 },
        y: 100
    });

    gsap.from(".gs-anim-left", {
        scrollTrigger: { trigger: ".mini-couple-grid", start: "top 85%" },
        x: -30, opacity: 0, duration: 1, ease: "back.out(1.2)"
    });

    gsap.from(".gs-anim-right", {
        scrollTrigger: { trigger: ".mini-couple-grid", start: "top 85%" },
        x: 30, opacity: 0, duration: 1, delay: 0.2, ease: "back.out(1.2)"
    });

    gsap.utils.toArray(".mini-img-wrapper img").forEach((img) => {
        gsap.to(img, {
            y: "10%",
            ease: "none",
            scrollTrigger: {
                trigger: img.closest(".mini-card"),
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    gsap.utils.toArray(".gs-gallery").forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
            scale: 0.8,
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.4)"
        });
    });
}

// --- Countdown ---
const targetDate = new Date(WEDDING_CONFIG.countdownTarget).getTime();
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        const wrapper = document.querySelector(".countdown-wrapper");
        if (wrapper) wrapper.innerHTML = '<div class="countdown-done">Büyük Gün Geldi Çattı</div>';
        return;
    }

    const pad = (n) => (n < 10 ? "0" + n : n);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("cd-days").innerText = pad(days);
    document.getElementById("cd-hours").innerText = pad(hours);
    document.getElementById("cd-minutes").innerText = pad(minutes);
    document.getElementById("cd-seconds").innerText = pad(seconds);
}, 1000);

// --- Bottom nav: highlight active section on scroll ---
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) current = section.getAttribute("id");
    });
    navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${current}`) item.classList.add("active");
    });
});

// --- Music toggle ---
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
        musicBtn.classList.add("playing");
    } else {
        bgMusic.pause();
        musicBtn.classList.remove("playing");
    }
});

// --- Guest name personalization (?to=) ---
const params = new URLSearchParams(window.location.search);
if (params.has("to")) {
    document.getElementById("guestName").innerText = params.get("to");
}

// --- Open invitation button ---
document.getElementById("openBtn").addEventListener("click", openInvitation);
```

- [ ] **Step 3: Etkileşimleri tarayıcıda doğrula**

```bash
python3 -m http.server 8000 &
```

Open `http://localhost:8000/` and check, with DevTools console open:

- No console errors on load
- Click **"Davetiyeyi Aç"**: opening overlay fades/slides away, background
  photo slides up and is removed, main content fades in with staggered
  `.gs-anim` elements, bottom nav bar slides up into view, music-disc icon
  gets the spinning `.playing` state (audio is silent but plays)
- Scroll down: "Gelin & Damat" cards animate in from left/right, gallery
  items scale+fade in as they enter the viewport, background photo shifts
  slightly (parallax)
- Countdown boxes (GÜN/SAAT/DK/SN) update every second
- Bottom nav highlights the section currently in view (Ana Sayfa → Gelin&Damat → Merasim → Galeri)
- Click the music-disc icon: toggles `.playing` class (pause/resume)
- Open `http://localhost:8000/?to=Ahmet` — "Sayın:" box shows "Ahmet" instead
  of "Değerli Dostumuz"

Stop the server:

```bash
kill %1
```

- [ ] **Step 4: Commit**

```bash
git add js/config.js js/main.js
git commit -m "js: açılış animasyonu, geri sayım, parallax, nav ve müzik etkileşimlerini ekle"
```

---

## Task 5: Responsive düzeltmeler ve son kontrol

`?to=` ile gelen uzun misafir adlarının "Sayın:" kutusunu taşırmamasını
sağlar ve mobil/masaüstü genişliklerde son görsel kontrolü yapar.

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: `.guest-box` / `.guest-name` kurallarını güncelle (uzun isimler taşmasın)**

In `css/styles.css`, replace:

```css
.guest-box {
    margin-top: 30px;
    border: var(--glass-border);
    padding: 12px 30px;
    display: inline-block;
    border-radius: 50px;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(8px);
}
.guest-label { margin: 0; font-size: 0.8rem; }
.guest-name {
    font-family: 'Cormorant Garamond';
    font-size: 1.3rem;
    color: var(--gold-light);
    margin: 5px 0 0 0;
    text-transform: capitalize;
}
```

with:

```css
.guest-box {
    margin-top: 30px;
    border: var(--glass-border);
    padding: 12px 30px;
    display: inline-block;
    border-radius: 50px;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(8px);
    max-width: 90vw;
}
.guest-label { margin: 0; font-size: 0.8rem; }
.guest-name {
    font-family: 'Cormorant Garamond';
    font-size: 1.3rem;
    color: var(--gold-light);
    margin: 5px 0 0 0;
    text-transform: capitalize;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
```

- [ ] **Step 2: Mobil ve masaüstü genişliklerde manuel kontrol**

```bash
python3 -m http.server 8000 &
```

Open `http://localhost:8000/` in a browser, open DevTools, and use responsive
design mode to check both widths:

**375px (mobil):**
- Opening overlay ve hero metinleri taşmıyor, yatay kaydırma çubuğu yok
- "Gelin & Damat" kartları yan yana (grid 1fr 1fr) sığıyor
- Geri sayım kutuları (4 adet) sarmadan veya düzgün sararak görünüyor
- "Merasim Detayları" kartları tek sütun (KINA üstte, DÜĞÜN altta)
- Galeri 2 sütun olarak görünüyor
- Alt nav çubuğu ortada, taşmıyor
- `http://localhost:8000/?to=Çok+Uzun+Bir+Misafir+Adı` ile "Sayın:" kutusu
  taşmadan satır kırıyor

**1440px (masaüstü):**
- İçerik ortalanmış, `uk-container`/`uk-container-small` genişlikleri aşırı
  yayılmıyor
- "Merasim Detayları" kartları yan yana (2 sütun)
- Arka plan fotoğrafı tüm genişliği kaplıyor, overlay düzgün

Console'da hata olmamalı. Sunucuyu durdur:

```bash
kill %1
```

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "css: uzun misafir isimleri için guest-box taşma düzeltmesi"
```

---

## Task 6: `README.md` — içerik düzenleme kılavuzu + GitHub Pages yayını

Çiftin (teknik bilgisi olmayan kullanıcı) `index.html`/`js/config.js`
içindeki tüm `[...]` placeholder'larını nasıl dolduracağını, fotoğraf/müzik
nasıl ekleyeceğini ve siteyi GitHub Pages'te nasıl yayınlayacağını anlatan
bir kılavuz. Sonra her şeyi push eder.

**Files:**
- Create: `README.md`

- [ ] **Step 1: `README.md` içeriğini yaz**

```markdown
# [Gelin Adı] & [Damat Adı] — Dijital Düğün Davetiyesi

Statik bir HTML/CSS/JS sitesi (build adımı yok). WhatsApp'tan
paylaşılacak link açıldığında bu tek sayfalık davetiye gösterilir.

## 1. Metinleri Düzenleme

`index.html` dosyasını bir metin editörüyle açın ve aşağıdaki köşeli
parantez `[...]` yer tutucularını "Bul ve Değiştir" ile kendi
bilgilerinizle değiştirin:

| Yer tutucu | Nerede kullanılıyor |
|---|---|
| `[Gelin Adı]`, `[Damat Adı]` | Sayfa başlığı, açılış ekranı, "Düğün Merasimi" başlığı, "Gelin & Damat" kartları, footer |
| `[Gelin Annesi]`, `[Gelin Babası]` | "Gelin & Damat" kartı ve footer "Davet Edenler" |
| `[Damat Annesi]`, `[Damat Babası]` | "Gelin & Damat" kartı ve footer "Davet Edenler" |
| `[DÜĞÜN GÜNÜ]`, `[DÜĞÜN TARİHİ]` | "Düğün Merasimi" girişindeki tarih satırı ve "Merasim Detayları" → Düğün kartı |
| `[ŞEHİR]` | "Düğün Merasimi" girişindeki konum satırı |
| `"[Buraya birbirinize dair özel bir söz...]"` | "Düğün Merasimi" girişindeki 3 satırlık alıntı |
| `[KINA TARİHİ]`, `[KINA SAATİ]`, `[KINA GÜNÜ]` | "Merasim Detayları" → Kına kartı |
| `[KINA MEKAN ADI]`, `[KINA ADRES]` | "Merasim Detayları" → Kına kartı |
| `[DÜĞÜN SAATİ]`, `[DÜĞÜN MEKAN ADI]`, `[DÜĞÜN ADRES]` | "Merasim Detayları" → Düğün kartı |

## 2. Fotoğraf ve Müzik Ekleme

- `assets/images/background.jpg` — arka plan fotoğrafı (zaten eklendi).
  Değiştirmek isterseniz aynı dosya adıyla üzerine yazın.
- `assets/images/bride.svg`, `assets/images/groom.svg` — gelin/damat
  fotoğrafı placeholder'ları. Kendi fotoğraflarınızı `assets/images/`
  klasörüne ekleyip `index.html` içindeki ilgili `<img src="...">`
  yollarını yeni dosya adlarıyla güncelleyin.
- `assets/images/gallery-1.svg` … `gallery-4.svg` — galeri fotoğrafı
  placeholder'ları. Aynı şekilde kendi fotoğraflarınızla değiştirip
  `index.html`'deki 4 `<img>` yolunu güncelleyin.
- `assets/audio/silence.wav` — arka plan müziği placeholder'ı (sessiz).
  Kendi müzik dosyanızı `assets/audio/` klasörüne ekleyin ve
  `index.html`'de `<audio id="bgMusic" loop src="...">` satırındaki yolu
  yeni dosya adıyla güncelleyin.

## 3. Geri Sayım Tarihi

`js/config.js` içindeki `countdownTarget` değerini düğün tarih/saatinizle
güncelleyin. Bu değer, `index.html`'deki "Merasim Detayları" bölümünde
yazan `[DÜĞÜN TARİHİ]` / `[DÜĞÜN SAATİ]` ile aynı olmalıdır.

## 4. Google Maps Linkleri

`index.html` içinde `DÜZENLE: Google Maps konum linkini buraya yapıştırın`
yorumlarını arayın (Kına ve Düğün için birer adet) ve hemen altındaki
`<a href="#" ...>` etiketinin `href` değerini Google Maps'ten
kopyaladığınız konum linkiyle değiştirin.

## 5. Kişiye Özel Karşılama (opsiyonel)

Paylaşılan linkin sonuna `?to=İsim` eklenirse "Sayın:" kutusunda misafirin
adı gösterilir, örnek:

```
https://kullaniciadi.github.io/dijital-dugun-davetiyesi/?to=Ayşe%20Teyze
```

Eklenmezse varsayılan olarak "Değerli Dostumuz" gösterilir.

## 6. GitHub Pages'te Yayınlama

1. GitHub'da bu reponun **Settings → Pages** sayfasına gidin
2. "Source" altında **Deploy from a branch** seçeneğini seçin
3. Branch olarak **main**, klasör olarak **/ (root)** seçip kaydedin
4. Birkaç dakika içinde site `https://<kullaniciadi>.github.io/<repo-adi>/`
   adresinde yayında olur
```

- [ ] **Step 2: Tüm değişikliklerin durumunu kontrol et**

```bash
git status
```

Expected: `README.md` yeni dosya olarak görünür, başka bekleyen değişiklik
olmamalı (önceki task'lar zaten commit edildi).

- [ ] **Step 3: Commit ve push**

```bash
git add README.md
git commit -m "README.md: içerik düzenleme ve GitHub Pages yayın kılavuzunu ekle"
git push
```

---

## Self-Review Notu

- **Spec kapsama:** 7 bölüm + sabit elemanlar (müzik diski, alt nav) Task 2'de
  markup, Task 3'te stil, Task 4'te davranış olarak karşılanıyor. Kapsam dışı
  öğeler (RSVP, Anı Defteri, Besmele bölümü, anti-devtools script) hiçbir
  task'ta yer almıyor — kasıtlı.
- **Placeholder taraması:** Plan içindeki tüm kod blokları tamdır; `index.html`
  içindeki `[...]` placeholder'lar bilinçli içerik yer tutucularıdır (spec'in
  "İçerik Placeholder'ları" bölümüne göre) ve Task 6'daki README ile
  belgelenmiştir — plan adımlarında "TBD/sonra eklenecek" türü boşluk yoktur.
- **Tip/isim tutarlılığı:** `index.html`'deki id/sınıf adları (`#bgMusic`,
  `#musicBtn`, `#navbar`, `#main-content`, `#opening-content`, `#bg-opening`,
  `#bg-main`, `#img-main`, `#guestName`, `#cd-days/hours/minutes/seconds`,
  `.gs-anim`, `.gs-anim-left/right`, `.gs-gallery`, `.mini-img-wrapper`,
  `.countdown-wrapper`, `.nav-item`) Task 3 (CSS) ve Task 4 (JS) içinde aynı
  adlarla kullanılıyor; `WEDDING_CONFIG.countdownTarget` Task 4'te tanımlanıp
  aynı task içinde `main.js` tarafından okunuyor.
- **Sıra/bağımlılık:** Task 1 tüm asset/stub dosyaları oluşturduğu için
  Task 2'deki `index.html` hiçbir 404'e yol açmıyor; Task 3/4 mevcut stub'ları
  dolduruyor.

