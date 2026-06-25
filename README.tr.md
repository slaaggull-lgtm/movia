<div align="center">

# 🎬 Movia

### Ruh haline, kişisel zevkine ve izleme alışkanlıklarına göre film & dizi önerileri

🇬🇧 [Read this file in English](./README.md)

![Node](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TMDB](https://img.shields.io/badge/Powered%20by-TMDB-01B4E4?style=for-the-badge&logo=themoviedb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

</div>

---

## 📖 İçindekiler

- [✨ Movia Nedir?](#-movia-nedir)
- [🌟 Özellikler](#-özellikler)
- [🛠️ Teknoloji Yığını](#️-teknoloji-yığını)
- [📁 Proje Yapısı](#-proje-yapısı)
- [🚀 Yerel Ortamda Çalıştırma](#-yerel-ortamda-çalıştırma)
- [🔑 TMDB API Anahtarı Alma](#-tmdb-api-anahtarı-alma)
- [🗄️ MongoDB Atlas Kurulumu (Ücretsiz)](#️-mongodb-atlas-kurulumu-ücretsiz)
- [☁️ Canlıya Alma (Deployment)](#️-canlıya-alma-deployment)
- [🧭 API Referansı](#-api-referansı)
- [🐞 Sorun Giderme](#-sorun-giderme)
- [📜 Lisans](#-lisans)

---

## ✨ Movia Nedir?

**Movia**, kullanıcılara şu üç şeye göre film ve dizi önerileri sunan modern bir web platformudur:

- 🎭 **Bugün nasıl hissettiğine göre** — mutlu, üzgün, yorgun, heyecanlı, romantik veya düşünceli
- 🧠 **Kişilik testi sonuçlarına göre** — favori türler, film mi dizi mi tercihi, animasyon/anime ilgisi, ideal süre ve izleme tarzı
- 📊 **İzleme geçmişine göre** — Movia zaman içinde zevkini öğrenir ve bunu kişisel **"Film DNA'sı"** 🧬 olarak görselleştirir

Kısa bir ruh hali seçimi ve kısa bir testten sonra, anında **3 kişiselleştirilmiş öneri** alırsın: afiş, puan, süre, tür, yönetmen, oyuncular ve konu özeti ile birlikte — favorilerine ekleyebilir ⭐, sonra izlemek üzere kaydedebilir 🔖 veya izledim olarak işaretleyebilirsin ✅.

---

## 🌟 Özellikler

| Kategori | Açıklama |
|---|---|
| 👤 **Profiller** | Ad, soyad, kullanıcı adı ve profil fotoğrafıyla kayıt ol |
| 😄 **Ruh Hali Kontrolü** | "Bugün kendini nasıl hissediyorsun?" — 6 ruh hali seçeneği |
| 🧪 **Kişilik Testi** | 5 adımlı test: türler, film/dizi, animasyon/anime, süre, izleme tarzı |
| 🎯 **Akıllı Öneriler** | TMDB API üzerinden, ruh hali + test verisini birleştiren 3 özel öneri |
| 🃏 **Detaylı Öneri Kartları** | Afiş, puan, süre, tür, yönetmen, oyuncular, konu özeti |
| ⭐ **Favoriler** | Sevdiğin film/dizileri kaydet |
| 🔖 **Sonra İzle** | Kişisel izleme listesi oluştur |
| ✅ **İzlendi + Puanlama** | İzledi olarak işaretle, puan ver (0-10), kişisel not ekle |
| 📈 **Profil Sayfası** | Favori türler, favori yapımlar, izleme geçmişi, puanlar, istatistikler |
| 🧬 **Film DNA'sı** | İzlediklerine göre favori türlerinin pasta grafikle dökümü |
| 📊 **İstatistik Paneli** | Toplam izlenen, toplam süre, en çok tercih edilen türler, haftalık özet grafikleri |
| 🏆 **Başarımlar & Rozetler** | "Sinefil", "Maratoncu", "Tür Kaşifi" gibi rozetler kazan |
| 🌙 **Karanlık Mod** | Şık açık/koyu tema geçişi |
| 📱 **Mobil Uyumluluk** | Tamamen mobil uyumlu, modern arayüz |

---

## 🛠️ Teknoloji Yığını

**Frontend**
- ⚛️ React 18 + Vite
- 🎨 Tailwind CSS (özel mor/pembe gradyan tema)
- 🧭 React Router v6
- 📊 Recharts (Film DNA & haftalık grafikler)
- 🌐 Axios

**Backend**
- 🟢 Node.js + Express
- 🍃 MongoDB + Mongoose (MongoDB Atlas — ücretsiz katman)
- 🔐 JWT kimlik doğrulama + bcrypt şifre hashleme
- 🎬 Film/dizi verisi için [TMDB API](https://www.themoviedb.org/) (afiş, puan, oyuncu, yönetmen, süre, tür)

**Canlıya Alma**
- ▲ Vercel (frontend)
- 🚀 Render (backend)
- ☁️ MongoDB Atlas (veritabanı)

---

## 📁 Proje Yapısı

```
movia/
├── backend/
│   ├── config/db.js              # MongoDB bağlantısı
│   ├── models/                   # User.js, WatchItem.js
│   ├── middleware/auth.js        # JWT koruma middleware'i
│   ├── controllers/              # auth, user, recommendation, watch mantığı
│   ├── routes/                   # Express route'ları
│   ├── utils/                    # tmdb.js, moodMap.js, badges.js
│   ├── server.js                 # Uygulama giriş noktası
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/axios.js          # API istemcisi
│   │   ├── context/              # AuthContext, ThemeContext
│   │   ├── components/           # Navbar, MovieCard, BadgeToast, ProtectedRoute
│   │   ├── pages/                # Home, Login, Register, Mood, Quiz,
│   │   │                         # Recommendations, Profile, Stats,
│   │   │                         # Favorites, Watchlist, History, Badges
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
│
├── README.md                     # English version 🇬🇧
├── README.tr.md                  # Şu an buradasın 🇹🇷
└── LICENSE
```

---

## 🚀 Yerel Ortamda Çalıştırma

### 0️⃣ Ön Gereksinimler

- [Node.js](https://nodejs.org/) v18 veya üzeri
- Ücretsiz bir [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) hesabı
- Ücretsiz bir [TMDB](https://www.themoviedb.org/signup) hesabı ve API anahtarı
- [Git](https://git-scm.com/) yüklü olmalı

### 1️⃣ Repoyu klonla

```bash
git clone https://github.com/<kullanici-adin>/movia.git
cd movia
```

### 2️⃣ Backend kurulumu

```bash
cd backend
npm install
cp .env.example .env
```

`.env` dosyasını açıp şu alanları doldur:

```env
PORT=5000
MONGO_URI=<MongoDB Atlas bağlantı dizenin>
JWT_SECRET=<uzun, rastgele bir karakter dizisi>
TMDB_API_KEY=<TMDB API anahtarın>
TMDB_BASE_URL=https://api.themoviedb.org/3
CLIENT_URL=http://localhost:5173
```

Backend'i çalıştır:

```bash
npm run dev
```

Şunu görmelisin:
```
✅ MongoDB connected: ...
🚀 Movia API listening on port 5000
```

### 3️⃣ Frontend kurulumu

**Yeni bir terminal** aç:

```bash
cd frontend
npm install
cp .env.example .env
```

`.env` dosyasını açıp yerel backend'ine işaret ettiğinden emin ol:

```env
VITE_API_URL=http://localhost:5000/api
```

Frontend'i çalıştır:

```bash
npm run dev
```

**http://localhost:5173** adresine git 🎉 — Movia artık yerelde çalışıyor!

---

## 🔑 TMDB API Anahtarı Alma

1. [themoviedb.org](https://www.themoviedb.org/signup) adresinden ücretsiz bir hesap oluştur
2. **Settings → API** → [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) sayfasına git
3. "Request an API Key" altında **"Create"** butonuna tıkla → **Developer** seçeneğini seç
4. Kısa formu doldur (uygulama adı: `Movia`, uygulama URL'si: repon veya `http://localhost`, özet: "Ruh haline göre kişisel film önerisi uygulaması")
5. **API Key (v3 auth)** değerini kopyala ve `backend/.env` dosyasındaki `TMDB_API_KEY` alanına yapıştır

> 💡 TMDB API'si bu tür kişisel/ticari olmayan projeler için tamamen ücretsizdir.

---

## 🗄️ MongoDB Atlas Kurulumu (Ücretsiz)

1. [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register) adresine gidip kayıt ol
2. **Ücretsiz paylaşımlı (M0) cluster** oluştur (sana yakın herhangi bir bölgeyi seçebilirsin)
3. **Database Access** altında, kullanıcı adı ve şifreyle bir veritabanı kullanıcısı oluştur
4. **Network Access** altında **"Add IP Address" → "Allow access from anywhere"** (`0.0.0.0/0`) seçeneğine tıkla — Render'ın bağlanabilmesi için gerekli
5. **"Connect" → "Drivers"** seçeneğine tıkla, bağlantı dizesini kopyala. Şuna benzer:
   ```
   mongodb+srv://<kullaniciadi>:<sifre>@cluster0.xxxxx.mongodb.net/movia?retryWrites=true&w=majority
   ```
6. `<kullaniciadi>` ve `<sifre>` değerlerini gerçek bilgilerinle değiştir ve `.env` dosyandaki `MONGO_URI` alanına yapıştır

---

## ☁️ Canlıya Alma (Deployment)

Movia, üç ücretsiz servis kullanılarak **tamamen canlı** çalışacak şekilde tasarlandı: **Vercel** (frontend), **Render** (backend) ve **MongoDB Atlas** (veritabanı).

### 1. Adım — Kodunu GitHub'a yükle

```bash
cd movia
git init
git add .
git commit -m "İlk commit - Movia 🎬"
git branch -M main
git remote add origin https://github.com/<kullanici-adin>/movia.git
git push -u origin main
```

> 📝 `frontend` ve `backend` klasörlerini tek bir repoda tutabilirsin (bu proje böyle kuruldu) — hem Render hem Vercel bir **alt klasörden** deploy etmeyi destekler.

### 2. Adım — Backend'i Render'da Yayınla

1. [render.com](https://render.com) adresine git, GitHub ile kayıt ol / giriş yap
2. **"New +" → "Web Service"** butonuna tıkla
3. `movia` reponu seç
4. Şu şekilde yapılandır:
   - **Name:** `movia-backend`
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. **Environment Variables** altına, `backend/.env` dosyandaki tüm değerleri ekle:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `TMDB_API_KEY`
   - `TMDB_BASE_URL`
   - `CLIENT_URL` → *(frontend'i deploy ettikten sonra güncelleyeceksin, bkz. 4. Adım)*
6. **"Create Web Service"** butonuna tıkla ve build'in bitmesini bekle
7. Canlı backend URL'ini kopyala, örn: `https://movia-backend.onrender.com`

> ⚠️ Render'ın ücretsiz katmanı, 15 dakika hareketsizlik sonrası "uykuya geçer", bu yüzden uykudan sonraki ilk istek ~30 saniye sürebilir. Bu, ücretsiz hosting için normaldir.

### 3. Adım — Frontend'i Vercel'de Yayınla

1. [vercel.com](https://vercel.com) adresine git, GitHub ile kayıt ol / giriş yap
2. **"Add New..." → "Project"** butonuna tıkla
3. `movia` reponu içe aktar
4. Şu şekilde yapılandır:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite (otomatik algılanır)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. **Environment Variables** altına ekle:
   - `VITE_API_URL` = `https://movia-backend.onrender.com/api` *(Render URL'in + `/api`)*
6. **"Deploy"** butonuna tıkla
7. Bittiğinde, `https://movia.vercel.app` gibi canlı bir URL alacaksın 🎉

### 4. Adım — İkisini Birbirine Bağla (CORS)

1. **Render** panele geri dön → `movia-backend` → **Environment**
2. `CLIENT_URL` değerini Vercel URL'in ile güncelle, örn: `https://movia.vercel.app`
3. Kaydet — Render otomatik olarak yeniden deploy edecek
4. Vercel URL'ini aç — Movia artık internette **tamamen canlı**! 🌍🎬

---

## 🧭 API Referansı

Temel URL: `/api`

| Metod | Endpoint | Yetki | Açıklama |
|---|---|---|---|
| `POST` | `/auth/register` | ❌ | Yeni hesap oluştur |
| `POST` | `/auth/login` | ❌ | Giriş yap, JWT döner |
| `GET`  | `/auth/me` | ✅ | Mevcut kullanıcıyı getir |
| `POST` | `/users/quiz` | ✅ | Kişilik testi sonuçlarını kaydet |
| `POST` | `/users/mood` | ✅ | Bugünkü ruh halini kaydet |
| `PUT`  | `/users/profile` | ✅ | Profil bilgilerini güncelle |
| `GET`  | `/users/profile` | ✅ | Tüm profil özetini getir |
| `GET`  | `/users/stats` | ✅ | İstatistikleri + Film DNA'sını getir |
| `POST` | `/recommendations` | ✅ | Bir ruh haline göre 3 öneri getir |
| `POST` | `/watch` | ✅ | Favori/izleme listesi/izlendi öğesi ekle/güncelle |
| `PUT`  | `/watch/:id` | ✅ | Puan/not güncelle |
| `DELETE` | `/watch/:id` | ✅ | Bir öğeyi kaldır |
| `GET`  | `/watch/:status` | ✅ | Duruma göre liste getir (`favorite`/`watchlist`/`watched`) |
| `GET`  | `/watch/badges` | ✅ | Kazanılan rozetleri getir |

✅ = `Authorization: Bearer <token>` başlığı gerektirir

---


---

## 🐞 Sorun Giderme

<details>
<summary><strong>❌ "Öneriler alınırken hata oluştu" hatası</strong></summary>

- Backend `.env` dosyandaki `TMDB_API_KEY`'i tekrar kontrol et
- Anahtarın etrafında ekstra boşluk/tırnak olmadığından emin ol
- TMDB, yeni oluşturulmuş bir anahtarı aktifleştirmek için bazen birkaç dakika ister
</details>

<details>
<summary><strong>❌ Tarayıcı konsolunda CORS hataları</strong></summary>

- Backend'deki `CLIENT_URL`'in frontend'inin tam URL'iyle eşleştiğinden emin ol (sonunda `/` olmamalı)
- Ortam değişkenlerini değiştirdikten sonra backend'i yeniden başlat/deploy et
</details>

<details>
<summary><strong>❌ Render'da MongoDB bağlantısı başarısız oluyor</strong></summary>

- Atlas'taki Network Access ayarının `0.0.0.0/0`'a izin verdiğini doğrula
- Kullanıcı adı/şifrede kaçışsız özel karakter olmadığını kontrol et
</details>

<details>
<summary><strong>❌ Render backend'i ilk istekte yavaş çalışıyor</strong></summary>

- Bu, ücretsiz katmanda beklenen bir durumdur (hareketsizlik sonrası soğuk başlangıç). Demo için önemliyse ücretli plan veya periyodik bir "ping" servisi düşünebilirsin.
</details>

---

## 📜 Lisans

Bu proje [MIT Lisansı](./LICENSE) altında lisanslanmıştır — kullanmak, değiştirmek ve öğrenmek için ücretsizdir. 💜

<div align="center">

💜  ile yapıldı — **Movia**



</div>
