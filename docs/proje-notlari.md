# Dijital Düğün Davetiyesi — Proje Notları

> Bu dosya, brainstorming sürecinde alınan kararları ve konuşulan detayları
> kayıt altına alır. Sonraki oturumlarda buradan devam edilebilir.

## Genel Konsept

- Tek sayfalık (single page), scroll tabanlı bir dijital düğün davetiyesi.
- Bir link üzerinden WhatsApp'tan misafirlere gönderilecek.
- Link açıldığında efektlerle süslenmiş, görsel olarak şık bir davetiye sayfası açılacak.

## Kapsam Kararları

- **RSVP:** Yok. Sayfa sadece bilgilendirme amaçlı, katılım formu/veritabanı yok.
- **Kişiselleştirme:** Tek link, herkese aynı genel hitap ("Sayın değerli dostumuz").
  Kişiye özel link/isim gösterimi yok.
- **Arka plan müziği:** Var. (Davranış detayı — otomatik mi, buton ile mi — henüz netleşmedi.)

## Görsel Stil

- **Ana tercih: D — Lüks Koyu (Gece).** Lacivert/siyah zemin, altın/şampanya tonları,
  dramatik serif başlıklar (Playfair Display), ışıltı/sparkle efektleri.
- **Alternatif/yedek: A — Klasik Zarif.** Krem/fildişi zemin, altın vurgular, ince
  çizgiler, zarif serif tipografi (Playfair Display + Cormorant Garamond).
- Renk/tipografi tokenları CSS değişkenleri ile tanımlanacak — ileride palet
  değişimi gerekirse kolay olur (ayrı bir "tema değiştirici" özelliği değil,
  sadece iyi bir CSS pratiği).

## Sayfa Akışı (Bölümler)

1. **Hero (Ana Ekran)**
   - "Evleniyoruz" başlığı
   - Gelin & damat isimleri (alt alta)
   - "Sayın değerli dostumuz" yazısı
   - "Davetiyeyi Aç" butonu → tıklanınca sayfa smooth scroll ile bir alttaki
     bölüme kayar (+ açılış efekti)

2. **Düğün Merasimi (Giriş)**
   - "Düğün Merasimi" başlığı
   - Gelin & damat isimleri (tekrar)
   - Ortada dekoratif ince çizgi
   - Tarih
   - Güzel bir fontla 3 satırlık yazı (şiir/alıntı — içerik sonra eklenecek)

3. **Gelin ve Damat**
   - "Gelin ve Damat" başlığı
   - Fotoğraflar
   - Fotoğrafların altında kendi isimleri
   - Altında anne-baba isimleri

4. **Geri Sayım**
   - Düğün gününe kalan süre sayacı (gün/saat/dakika/saniye)

5. **Merasim Detayları (Kart görünümü)**
   - Kart 1: "KINA" başlığı — tarih/saat/yer bilgisi + lokasyon (harita/yol tarifi)
   - Ayraç çizgi
   - Kart 2: "DÜĞÜN" — aynı yapı (tarih/saat/yer + lokasyon)

6. **Davet / Kapanış**
   - "Sizleri de aramızda görmekten onur duyarız"
   - Ayraç çizgi
   - Gelin & damat isimleri
   - "Bu mutlu günümüzde yanımızda olacak olan tüm dostlarımıza şimdiden
     teşekkür ederiz. Sevgi ve saygılarımızla."
   - Ayraç çizgi
   - "Davet Edenler" başlığı
   - Gelin & damadın anne-baba isimleri

## Efektler

- **Seçim: B — Zarif Işıltı.** Arka planda sürekli, hafif yıldız tozu/parıltı
  (sparkle) animasyonu + scroll-reveal (bölümler scroll ile yumuşak belirir).
  Konfeti/yaprak dökülmesi gibi gösterişli efektler yok.

## Müzik

- **Seçim:** "Davetiyeyi Aç" tıklanınca arka plan müziği otomatik başlar
  (tıklama browser autoplay iznini sağlar), köşede küçük bir aç/kapa
  (mute/unmute) ikonu bulunur. Müzik dosyasının kendisi sonradan eklenecek.

## Teknik Yaklaşım

- **Seçim: Sade HTML/CSS/JS (statik site, build adımı yok).**
  - `index.html` (tüm bölümler), ayrı CSS/JS dosyaları.
  - İçerik (isimler, tarihler, lokasyonlar, fotoğraf yolları, şiir metni)
    bir `config.js`/`content.js` dosyasında — kolayca düzenlenebilir.
  - Sparkle arka plan, scroll-reveal, geri sayım, smooth scroll, müzik
    kontrolü — harici kütüphanesiz vanilla JS ile.
  - Direkt GitHub Pages'e deploy edilecek (bkz. Hosting).

## Hosting

- Karar Claude'a bırakıldı → öneri: **GitHub Pages** (statik site, RSVP/backend
  olmadığı için ideal, mevcut GitHub reposu üzerinden direkt yayınlanır).

## Açık Konular (henüz netleşmedi)

- Gerçek içerikler: isimler, tarih, mekan/lokasyon bilgileri, fotoğraflar,
  şiir/alıntı metni, müzik dosyası — placeholder ile geliştirilip sonradan
  kolayca düzenlenebilecek bir yapı (config dosyası) planlanıyor.

## Görsel Tasarım Sistemi (sunuldu, geri bildirim bekliyor)

Lüks Koyu paleti gerçek tipografi/renklerle önizleme olarak sunuldu:

- Renk paleti: `#15131f` (bg-deep), `#232140` (bg-glow), `#D4AF37` (accent-gold),
  `#E8C97E` (accent-light), `#F4E4BC` (text-cream), `#8a7a4f` (divider)
- Tipografi: **Playfair Display** (başlıklar/isimler), **Cormorant Garamond**
  (gövde metni, alıntılar, etiketler)
- Önizlenen bölümler: Hero (ışıltılı arka plan + "Evleniyoruz" + isimler +
  "Sayın değerli dostumuz" + "Davetiyeyi Aç" butonu), Düğün Merasimi girişi
  (başlık + isimler + süslemeli ayraç ❀ + tarih + 3 satır alıntı), Merasim
  Detayları kartları (KINA / DÜĞÜN, "Yol Tarifi Al" linkli)

## Referans İncelemesi — livanaorg.com/elifpolat/

Kullanıcının paylaştığı örnek davetiye sayfası incelendi (kaynak obfuscate
edilmişti, decode edilerek analiz edildi). Bu sayfa bizim planladığımız
yapıyla **çok büyük oranda örtüşüyor** — akışımızı doğruluyor:

- Hero/opening overlay: "Evleniyoruz" + isimler (shimmer-gold efekti) +
  "Sayın: Değerli Dostumuz" (URL `?to=` parametresiyle özelleştirilebilir,
  yoksa varsayılan metin) + "Davetiyeyi Aç" butonu
- Düğün Merasimi giriş bölümü: isimler, ince ayraç, tarih/yer, alıntı,
  "aşağı kaydır" göstergesi
- Ek bir "dua/besmele" alıntı bölümü (glass-box + Arapça kaligrafi görseli)
- Gelin & Damat: yuvarlak köşeli foto kartları + isim + ebeveyn adı, ortada
  "&" rozeti
- Geri sayım ("Büyük Güne Kalan")
- Merasim Detayları: KINA / DÜĞÜN kartları (tarih/saat/yer + "Konum Gör"
  Google Maps linki)
- Fotoğraf galerisi ("Hatıralarımız") — 2x2 grid, hover efektli
- RSVP bölümü: "Katılım Durumu" (Google Form linki) + "Dijital Anı Defteri"
  (misafir foto yükleme linki)
- Footer: "Sizleri de Aramızda Görmekten Onur Duyarız" + teşekkür + "Davet
  Edenler" (anne-baba adları)
- Alt köşede sabit, dönen "müzik diski" ikonu (çalarken dönüyor)
- Scroll'a göre aktif bölümü vurgulayan alt navigasyon çubuğu

**Teknik yaklaşım (referans):** UIkit CSS (CDN) + GSAP + ScrollTrigger +
Lenis (smooth scroll) — hepsi CDN üzerinden, build adımı yok. Açılış
animasyonu GSAP timeline ile (opening overlay kayıp gidiyor, arka plan
fotoğrafı yukarı kayıyor, içerik staggered fade-in). Arka plan: çiftin
fotoğrafı + koyu radial overlay + hafif parallax — **"arka plan boş duruyor"
sorununu fotoğraf+overlay ile çözüyorlar**, bizim sparkle yaklaşımımıza
alternatif/ek olabilir.

**Tipografi (referans):** Cinzel Decorative (başlıklar, daha dramatik/süslü)
+ Pinyon Script (el yazısı aksanlar: "&", saatler, footer isimleri) +
Cormorant Garamond (gövde) — bizim önceki seçimimiz Playfair Display +
Cormorant Garamond'dan daha "süslü/fantastik" bir hisse sahip.

**Bizim kapsamımızda OLMAYAN ama referansta olan bölümler:** RSVP/katılım
formu, fotoğraf galerisi, "Dijital Anı Defteri", alt navigasyon menüsü.

**Dikkat — kopyalanmaması gereken kısım:** Referans sayfada sağ tık ve
F12/DevTools'u engelleyen scriptler var. Bu gerçek bir güvenlik sağlamıyor,
sadece kullanıcı deneyimini bozuyor (örn. misafir ekran görüntüsü/zoom
alamıyor) — **bunu dahil etmeyeceğiz.**

### Açık Kararlar (referans sonrası) — YANITLANDI, bkz. aşağıdaki "Güncel Yön"

## GÜNCEL YÖN — Referans Sayfanın Uyarlanmış Kopyası

> **Bu bölüm önceki "Lüks Koyu / sparkle / vanilla JS / Playfair+Cormorant"
> spesifiklerinin yerini alır.** Kapsam kararları (RSVP yok vb.) geçerli,
> ama görsel/teknik detaylar artık referans sayfaya göre netleşti.

**Karar:** `livanaorg.com/elifpolat/` sayfasının yapısı ve stili, kendi
içeriğimizle (placeholder + sonradan doldurulacak config) uyarlanmış bir
kopyası yapılacak. RSVP ve Dijital Anı Defteri bölümleri **hariç**.

**Bölüm sırası (final):**
1. **Opening Overlay (Hero)** — "Evleniyoruz" + isimler (shimmer-gold) +
   "Sayın [Değerli Dostumuz]" (varsayılan metin; `?to=` URL parametresiyle
   override edilebilir — opsiyonel, "tek link" kararını bozmaz) +
   "Davetiyeyi Aç" butonu. Arka plan: kullanıcının sağlayacağı fotoğraf +
   koyu/altın overlay + hafif parallax.
2. **Düğün Merasimi Girişi** — isimler, ince ayraç, tarih/yer, 3 satırlık
   alıntı, "aşağı kaydır" göstergesi
3. **Gelin & Damat** — yuvarlatılmış foto kartları + isim + ebeveyn adı +
   ortada "&" rozeti
4. **Geri Sayım** — "Büyük Güne Kalan"
5. **Merasim Detayları** — KINA / DÜĞÜN kartları (tarih/saat/yer + "Konum
   Gör" Google Maps linki)
6. **Fotoğraf Galerisi** ("Hatıralarımız") — 2x2 grid, hover efektli
7. **Footer** — "Sizleri de Aramızda Görmekten Onur Duyarız" + teşekkür +
   "Davet Edenler" (anne-baba adları)

> Not: Referans sayfadaki Besmele/Arapça kaligrafi + alıntı "glass-box"
> bölümü **dahil edilmeyecek** (kullanıcı kararı).
- **Sabit elemanlar:** sağ üstte dönen müzik diski ikonu, altta scroll'a
  göre aktif bölümü gösteren navigasyon çubuğu (ikon seti RSVP'siz olacak
  şekilde güncellenecek)

**Görsel stil (referanstan):**
- Renk paleti: `--gold-light:#F9E29C`, `--gold-mid:#D4AF37`,
  `--gold-dark:#8E6E22`, `--gold-gradient`
- Tipografi: **Cinzel Decorative** (başlıklar) + **Pinyon Script** (aksanlar:
  "&", saatler, footer isimleri) + **Cormorant Garamond** (gövde)
- Arka plan: kullanıcının sağlayacağı fotoğraf + koyu radial overlay

**Teknik:** UIkit (CSS, CDN) + GSAP + ScrollTrigger + Lenis (smooth scroll,
CDN) + Font Awesome + Google Fonts — hepsi CDN, build adımı yok, statik
site, GitHub Pages'e deploy.

**Hariç tutulanlar:** RSVP/katılım formu, Dijital Anı Defteri, anti-devtools
/ sağ-tık engelleme scriptleri (kötü pratik, gerçek koruma sağlamıyor).

## Açık Konular (güncel)

- Arka plan fotoğrafı — kullanıcı sağlayacak (henüz teslim edilmedi)
- Gerçek içerikler: isimler, tarihler, lokasyonlar, galeri fotoğrafları,
  alıntı metinleri, müzik dosyası — placeholder + config dosyası ile
  sonradan doldurulacak

## Devam Noktası (Sonraki Oturum İçin)

1. ~~Tam tasarım dokümanını `docs/superpowers/specs/` altına yaz, self-review
   yap, kullanıcıya sundur.~~ ✅ Tamamlandı —
   `docs/superpowers/specs/2026-06-15-dijital-dugun-davetiyesi-design.md`
2. Kullanıcı spec'i onayladıktan sonra writing-plans skill'i ile
   implementasyon planı oluştur.
3. Henüz netleşmeyen içerik detayları (gerçek isimler, tarihler, lokasyonlar,
   arka plan fotoğrafı, galeri fotoğrafları, alıntı metinleri, müzik dosyası)
   implementasyon sırasında placeholder olarak bırakılacak, config dosyası
   üzerinden kolayca doldurulabilecek.

## Durum

Tasarım dokümanı yazıldı ve self-review tamamlandı:
`docs/superpowers/specs/2026-06-15-dijital-dugun-davetiyesi-design.md`.
Sıradaki adım: kullanıcının spec'i onaylaması, ardından writing-plans ile
implementasyon planı oluşturulması.
