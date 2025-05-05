
---

## 📄 **README.md**

```md
# 🚲 Bike Commerce Frontend

Ein modernes E-Commerce-Frontend für Fahrräder, erstellt mit:

- React + Vite ⚡
- Styled-Components 🎨
- Redux Toolkit (RTK) für State-Management 🛠️
- i18n (Englisch + Deutsch) 🌐
- Zentrale API-Verwaltung (api.js & apiCall.js) 🔗
- Theme-System (Light, Dark, Retro) 🌗

---

## 🔥 Technologien & Struktur

| **Technologie**        | **Beschreibung**                                           |
|------------------------|------------------------------------------------------------|
| React + Vite           | Blitzschnelles React-Setup                                 |
| Styled-Components      | Modularisierte Styles mit Theme-Unterstützung              |
| Redux Toolkit (RTK)    | State-Management & CRUD über `createAsyncThunk`            |
| i18n                   | Internationalisierung (DE & EN)                            |
| Axios + apiCall.js     | Zentrale API-Verwaltung                                    |
| Router                 | React Router DOM für Navigation                            |
| Theme + Locale Storage | Aktuelles Theme wird lokal gespeichert (nur Theme!)       |

---

## 📁 Projektstruktur (Hauptordner)

```

src/
│
├── api/
│   ├── api.js
│   └── apiCall.js
│
├── app/
│   └── store.js
│
├── components/
│   └── layout/
│       ├── Layout.jsx
│       ├── Navbar.jsx
│       └── Footer.jsx
│
├── features/
│   ├── auth/
│   │   └── authSlice.js
│   ├── cart/
│   │   └── cartSlice.js
│   └── product/
│       └── productSlice.js
│
├── hooks/
│   ├── useAppDispatch.js
│   ├── useAppSelector.js
│   └── useThemeMode.js
│
├── pages/
│   ├── admin/
│   │   └── Dashboard.jsx
│   ├── user/
│   │   ├── Account.jsx
│   │   └── Cart.jsx
│   └── visitor/
│       ├── About.jsx
│       ├── Contact.jsx
│       ├── Home.jsx
│       ├── ProductDetail.jsx
│       └── Products.jsx
│
├── styles/
│   ├── GlobalStyles.js
│   └── theme.js
│
└── translations/
├── de/
│   ├── admin.json
│   ├── cart.json
│   ├── common.json
│   ├── footer.json
│   ├── home.json
│   ├── navbar.json
│   └── products.json
└── en/
└── (gleich wie oben)

````

---

## 🚀 Starten

### 1️⃣ Klonen & Installieren:

```bash
git clone <repository-url>
cd bike-commerce-frontend
npm install
````

### 2️⃣ `.env` Datei erstellen:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3️⃣ Starten:

```bash
npm run dev
```

---

## 🌐 Sprache ändern

* Wechseln über die Navbar (EN/DE).
* Alle Texte sind modular in `/translations/en` & `/translations/de`.

---

## 🎨 Theme ändern

* Wechseln über die Navbar (Light/Dark/Retro).
* Theme wird in `localStorage` gespeichert.

---

## 🔑 Auth & API

* JWT Token wird **via Cookie** verwaltet (withCredentials = true).
* Auth-Flow:

  * Login: `/auth/login`
  * Register: `/auth/register`
  * Fetch Current User: `/auth/me`
  * Logout: `/auth/logout`

---

## 🛠 Verfügbare Slices

| **Slice**    | **Thunks (Aktionen)**                                                                         |
| ------------ | --------------------------------------------------------------------------------------------- |
| productSlice | `fetchProducts`, `fetchProductById`, `createProduct`, `updateProduct`, `deleteProduct`        |
| cartSlice    | `getCart`, `addToCart`, `increaseQuantity`, `decreaseQuantity`, `removeFromCart`, `clearCart` |
| authSlice    | `login`, `register`, `fetchCurrentUser`, `logout`                                             |

---

## ✅ Nächste Schritte (Team)

* [ ] Login/Register Seiten UI fertigstellen
* [ ] Cart- und Account-Seiten funktional testen
* [ ] Admin Panel: Produkt-Management erweitern (CRUD)
* [ ] Protected Routes (nur für eingeloggte User/Admin)
* [ ] Responsive & UX-Feinschliff

---

## 👥 Teamhinweis

* Bitte **keine deutschen Texte hart codieren** → alles in die `/translations/de/` packen!
* Für neue API-Calls bitte immer über `apiCall.js` gehen.
* Neue Slices am besten nach dem bestehenden Muster erstellen (modular & sauber).

---

Viel Spaß & happy coding! 🚴‍♂️

```

---
