# Dijital Düğün Davetiyesi — Tasarım Dokümanı

**Tarih:** 2026-06-15
**Durum:** Onay bekliyor

## Özet

Tek sayfalık (single-page), scroll tabanlı, efektlerle süslenmiş bir dijital
düğün davetiyesi. Bir link üzerinden WhatsApp'tan misafirlere gönderilecek.
Statik site olarak GitHub Pages üzerinde yayınlanacak.

Tasarım, kullanıcının referans olarak paylaştığı `livanaorg.com/elifpolat/`
sayfasının yapısı ve görsel diline dayanıyor (kendi içeriğimizle uyarlanmış
bir kopyası), RSVP ve "Dijital Anı Defteri" bölümleri hariç tutularak.

## Mimari & Teknik Yaklaşım

- **Statik site, build adımı yok.** `index.html` + `css/` + `js/` + `assets/`.
- Harici kütüphaneler **CDN üzerinden** yüklenir (npm/bundler gerekmez):
  - **UIkit** — grid/utility CSS sınıfları (responsive grid, container'lar)
  - **GSAP + ScrollTrigger** — açılış animasyonu, scroll-reveal, parallax
  - **Lenis** — smooth scroll
  - **Font Awesome** — ikonlar (kalp, harita işareti, takvim, müzik diski vb.)
  - **Google Fonts** — Cinzel Decorative, Pinyon Script, Cormorant Garamond
- **Hosting:** GitHub Pages (mevcut repo, `main` dalı, kök dizin).
- **İçerik yönetimi:** Metin içeriği (isimler, tarihler, adresler, alıntılar,
  Maps linkleri) doğrudan `index.html` içinde — referans şablon gibi, tek
  dosyada bulup-değiştirerek düzenlenebilir. JS tarafından kullanılan tek
  değişken değer (geri sayım hedef tarihi) `js/config.js` içinde ayrı tutulur.

## Dosya Yapısı

```
index.html
css/
  styles.css          # renk paleti, tipografi, layout, bileşen stilleri
js/
  config.js           # geri sayım hedef tarihi/saati
  main.js             # GSAP timeline, scroll-reveal, parallax, smooth scroll,
                       # müzik kontrolü, geri sayım, nav highlight
assets/
  images/
    background.jpg    # PLACEHOLDER — kullanıcı kendi fotoğrafını koyacak
    bride.jpg          # PLACEHOLDER — gelin fotoğrafı
    groom.jpg          # PLACEHOLDER — damat fotoğrafı
    gallery-1..4.jpg   # PLACEHOLDER — galeri fotoğrafları
  audio/
    background-music.mp3  # PLACEHOLDER — kullanıcı müzik dosyasını koyacak
docs/
  proje-notlari.md
  superpowers/specs/2026-06-15-dijital-dugun-davetiyesi-design.md
```

## Görsel Tasarım Sistemi

**Renk paleti** (CSS custom properties):
- `--gold-light: #F9E29C`
- `--gold-mid: #D4AF37`
- `--gold-dark: #8E6E22`
- `--gold-gradient: linear-gradient(135deg, #F9E29C, #D4AF37, #8E6E22)`
- `--glass-bg: rgba(20,20,20,0.85)`, `--glass-border: 1px solid rgba(255,255,255,0.15)`
- Temel: siyah/koyu arka plan (`#000`), açık gri gövde metni (`#eee`/`#ccc`)

**Tipografi:**
- **Cinzel Decorative** — başlıklar (h1-h3), bölüm etiketleri
- **Pinyon Script** — aksan unsurları: "&" işareti, saat gösterimleri, footer
  isimleri
- **Cormorant Garamond** — gövde metni, alıntılar, paragraflar

**Arka plan:** Kullanıcının sağlayacağı fotoğraf (`assets/images/background.jpg`),
`object-fit: cover`, üzerine koyu radial-gradient overlay (`rgba(0,0,0,0.2)`
merkezden `#000`'a doğru), GSAP ScrollTrigger ile hafif parallax (scroll'da
y ekseninde kayma).

## Sayfa Akışı (Bölümler)

### 1. Opening Overlay (Hero)
Sayfa açılır açılmaz ekranı kaplayan sabit katman:
- "EVLENİYORUZ" (uppercase, letter-spacing, küçük)
- Çift isimleri — büyük, **shimmer-gold** efektiyle (gradient text, sürekli
  kayan parlaklık animasyonu), "&" Pinyon Script ile
- Kişiselleştirme kutusu: "Sayın:" + isim. Varsayılan "Değerli Dostumuz".
  URL'e `?to=İsim` eklenirse bu isim gösterilir (opsiyonel — link tek/genel
  kalır, kişiye özel link şart değildir)
- **"Davetiyeyi Aç"** butonu (outline, gold)

**Tıklama davranışı (GSAP timeline):**
1. Arka plan müziği `play()` çağrılır (tarayıcı izni bu tıklama ile sağlanır);
   başarılı olursa müzik diski ikonu "playing" durumuna geçer
2. Opening overlay yukarı kayarak ve solarak kaybolur
3. Opening arka plan görseli yukarı doğru kayıp DOM'dan kaldırılır
4. Ana içerik (`#main-content`) görünür hale gelir, `.gs-anim` sınıflı
   elemanlar staggered (kademeli) şekilde aşağıdan yukarı belirir
5. Alt navigasyon çubuğu görünür olur

### 2. Düğün Merasimi Girişi
- "Düğün Merasimi" etiketi (eyebrow)
- Çift isimleri (shimmer-gold)
- İsimlerin altında ince yatay ayraç çizgisi (gold gradient)
- Tarih ve şehir bilgisi
- 3 satırlık alıntı (Cormorant Garamond, italic, büyük font) — içerik
  placeholder, sonradan doldurulacak
- "AŞAĞI KAYDIR" göstergesi (zıplayan chevron ikonu)

### 3. Gelin & Damat
- Bölüm başlığı "Gelin & Damat"
- 2 sütunlu grid (mobilde tek sütun): her biri yuvarlatılmış köşeli foto
  kartı + isim + ebeveyn adı ("... Kızı" / "... Oğlu")
- Kartların arasında, ortada "&" rozeti (yuvarlak, gold gradient zemin)
- GSAP scroll animasyonu: sol kart soldan, sağ kart sağdan kayarak belirir;
  fotoğraflar scroll'da hafif parallax hareketi yapar

### 4. Geri Sayım
- "Büyük Güne Kalan" başlığı
- 4 kutu: GÜN / SAAT / DK / SN — `js/config.js`'deki hedef tarih/saate göre
  her saniye güncellenir (vanilla JS `setInterval`)
- Hedef tarih geçtiyse kutular yerine "Büyük Gün Geldi Çattı" mesajı

### 5. Merasim Detayları
- "Merasim Detayları" başlığı
- Glass-box (yarı saydam, blur arka planlı kutu) içinde 2 sütunlu grid
  (mobilde tek sütun, aralarında ayraç çizgisi):
  - **KINA** kartı: ikon, başlık, tarih + saat (Pinyon Script ile saat) +
    gün adı, mekan adı + adres, **"Konum Gör"** butonu (Google Maps linki,
    `target="_blank"`)
  - **DÜĞÜN** kartı: aynı yapı

### 6. Fotoğraf Galerisi ("Hatıralarımız")
- Bölüm başlığı "Hatıralarımız"
- Responsive grid (masaüstünde 2x2, mobilde tek sütun veya 2 sütun küçük)
- Her item: çerçeveli foto + hover'da renkli (gold gradient) overlay +
  büyüteç ikonu
- GSAP ScrollTrigger ile her item scroll'a girince scale+fade-in (staggered)

### 7. Footer
- Süsleme simgesi (❖)
- "Sizleri de Aramızda Görmekten Onur Duyarız"
- Ayraç çizgisi (gold gradient)
- Çift isimleri (Pinyon Script, büyük)
- Teşekkür metni: "Bu mutlu günümüzde yanımızda olacak tüm dostlarımıza
  şimdiden teşekkür ederiz." + "Sevgi ve Saygılarımızla..."
- Ayraç + "Davet Edenler" başlığı + her iki ailenin anne-baba adları

### Sabit (Persistent) Elemanlar
- **Müzik diski ikonu** (sağ üst, sabit): `<audio loop>` elemanı kontrol
  eder. Çalarken döner (CSS animasyon), tıklayınca play/pause toggle.
  Açılışta otomatik başlatma denenir (adım 2'deki gibi).
- **Alt navigasyon çubuğu** (sabit, sayfanın altında, ortada): yuvarlak
  ikon butonları — Ana Sayfa / Gelin&Damat / Merasim / Galeri (RSVP ikonu
  referanstan çıkarıldı). Scroll pozisyonuna göre aktif bölüm vurgulanır
  (vanilla JS scroll listener, `IntersectionObserver` veya `scrollY`
  karşılaştırması).

## Kapsam Dışı (Bilinçli Olarak Hariç Tutulanlar)

- **RSVP / katılım formu** — kullanıcı kararı, sadece bilgilendirme amaçlı site
- **Dijital Anı Defteri** (misafir fotoğraf yükleme) — kullanıcı kararı
- **Besmele / Arapça kaligrafi + alıntı bölümü** — kullanıcı kararı, dahil
  edilmeyecek
- **Anti-devtools / sağ-tık engelleme scriptleri** — referans sayfada var
  ama gerçek bir koruma sağlamıyor, kullanıcı deneyimini bozuyor (önerimiz
  üzerine hariç tutuldu)
- **Kişiye özel link sistemi** — `?to=` parametresi opsiyonel bir "nice to
  have" olarak eklenir ama gerekli değildir; tek genel link birincil kullanım

## İçerik Placeholder'ları (Sonradan Doldurulacak)

Aşağıdakiler implementasyonda placeholder/örnek değerlerle bırakılacak,
kullanıcı `index.html` ve `assets/` içindeki dosyaları güncelleyerek
doldurabilecek:

- Çift isimleri, ebeveyn adları (her iki taraf)
- Düğün tarihi/saati, Kına tarihi/saati, şehir/mekan adları, adresler
- Google Maps linkleri (Kına ve Düğün için)
- Geri sayım hedef tarihi (`js/config.js`)
- 3 satırlık alıntı metni (Düğün Merasimi girişi)
- Arka plan fotoğrafı, gelin/damat fotoğrafları, galeri fotoğrafları (4 adet)
- Arka plan müziği dosyası

## Responsive / Mobil Öncelik

WhatsApp linki büyük olasılıkla mobil cihazda açılacağı için mobil öncelikli
tasarım:
- Font boyutları `clamp()` ile responsive
- Grid'ler mobilde tek sütuna düşer (UIkit responsive sınıfları:
  `uk-child-width-1-1 uk-child-width-1-2@s`)
- Dokunmatik hedefler (butonlar, nav ikonları) yeterli boyutta

## Doğrulama Planı

- Sayfa tarayıcıda açılır, opening overlay görünür
- "Davetiyeyi Aç" tıklanınca: overlay kaybolur, ana içerik staggered
  şekilde belirir, müzik çalmaya başlar (mute ikonuna tıklayınca durur/devam
  eder)
- Scroll edildiğinde: her bölüm GSAP ile fade/slide-in olur, parallax çalışır,
  alt nav aktif bölümü doğru gösterir
- Geri sayım her saniye güncellenir, hedef tarih geçince mesaj değişir
- "Konum Gör" butonları doğru Google Maps linklerini yeni sekmede açar
- Galeri item'larında hover efekti çalışır
- Mobil genişlikte (≈375px) ve masaüstü genişlikte (≈1440px) düzen kontrolü
- Konsol hatası olmaması
- GitHub Pages'e deploy edildiğinde canlı URL doğru yüklenir
