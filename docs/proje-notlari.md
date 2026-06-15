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

## Devam Noktası (Sonraki Oturum İçin)

1. Kullanıcıdan görsel tasarım sistemi (palet/tipografi/kart tasarımı) için
   onay veya değişiklik isteği al.
2. Onaylanırsa: tam tasarım dokümanını `docs/superpowers/specs/` altına yaz
   (brainstorming sürecinin son adımı), self-review yap, kullanıcıya sundur.
3. Spec onaylandıktan sonra writing-plans skill'i ile implementasyon planı
   oluştur.
4. Henüz netleşmeyen içerik detayları (gerçek isimler, tarihler, lokasyonlar,
   fotoğraflar, şiir/alıntı metni, müzik dosyası) implementasyon sırasında
   placeholder olarak bırakılacak, config dosyası üzerinden kolayca
   doldurulabilecek.

## Durum

Brainstorming devam ediyor (görsel tasarım sistemi onayı bekleniyor). Tam
tasarım dokümanı henüz yazılmadı.
