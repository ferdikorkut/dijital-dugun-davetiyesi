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

> **Not:** Yukarıdaki tabloda kısaltılmış olarak gösterilen alıntı metni
> (`[Buraya birbirinize dair özel bir söz...]`), `index.html` içinde
> `hero-quote` class'ına sahip `<p>` etiketi içinde 3 satır halinde ve
> `<br>` etiketleriyle ayrılmış olarak yer alır. Bu kısmı tek satırlık bir
> "Bul ve Değiştir" ile değil, ilgili `<p class="hero-quote ...">...</p>`
> bloğunun tamamını bularak ve içeriğini kendi 3 satırlık sözünüzle
> değiştirerek düzenleyin.

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
