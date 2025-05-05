
---

# 🚲 **RadonaR – Projektplan & Aufgabenliste**

---

## 🟢 **Frontend Aufgaben**

### 1️⃣ Navbar + Footer

* Responsive Navbar mit Menü-Links (Home, Produkte, Kontakt, Über uns)
* Footer mit Kontaktinfos und Social Media Icons
* Styled Components verwenden
* i18n: Deutsch & Englisch berücksichtigen
* Theme-Switcher Button (Hell/Dunkel)

---

### 2️⃣ Startseite (Home)

* Hero-Banner mit großem Bild und Text
* Call-to-Action Button (Produkte ansehen)
* Styled Components für Layout
* i18n Integration (Deutsch & Englisch)

---

### 3️⃣ Produktliste-Seite

* Alle Produkte in einem Grid anzeigen
* Filter- und Suchfunktion hinzufügen
* Responsive Design sicherstellen
* Styled Components + Redux (productSlice)

---

### 4️⃣ Produktdetail-Seite

* Einzelnes Produkt mit Bild, Preis, Beschreibung
* Warenkorb-Button
* Bewertungen & Details anzeigen
* i18n Integration

---

### 5️⃣ Über uns Seite

* Text + Bilder über das Unternehmen
* Responsive Design
* Styled Components
* i18n (DE/EN)

---

### 6️⃣ Kontakt-Seite

* Kontaktformular (Name, E-Mail, Nachricht)
* Google Maps (optional)
* Styled Components + Validierung
* i18n

---

### 7️⃣ Warenkorb-Seite

* Produkte im Warenkorb anzeigen
* Menge ändern / löschen
* Gesamtpreis berechnen
* Redux Integration (cartSlice)

---

### 8️⃣ Checkout-Seite

* Formular für Adresse & Zahlung
* Bestellübersicht anzeigen
* Submit-Button (Bestellung abschließen)
* i18n + Styled Components

---

### 9️⃣ Bestellbestätigungs-Seite

* Bestellnummer + Danke-Nachricht
* Übersicht der Bestellung
* Styled Components + i18n

---

---

## 🟠 **Redux & State Management**

### productSlice

* AsyncThunk für Produkte (getAll, getById)
* State: products, loading, error
* Redux Toolkit verwenden

---

### cartSlice

* Thunks: addToCart, remove, increase, decrease
* State: items, total
* Redux Toolkit + axios API Call

---

### authSlice

* Login / Register / Logout Thunks
* User-Daten speichern
* Error & Loading-Status verwalten

---

### orderSlice

* Bestellungen abrufen + erstellen
* State: orders, loading, error
* AsyncThunk + API Call

---

### themeSlice

* Theme (Light/Dark) speichern
* localStorage Integration
* Umschalten-Action erstellen

---

---

## 🔵 **Backend Aufgaben**

### Authentifizierung & Sicherheit

* Login / Register / Token-Generierung
* Passwort-Hashing (bcrypt)
* JWT + HTTP-only Cookies
* Middleware: Auth-Schutz für Routen

---

### Produkt-API

* Endpunkte: getAllProducts, getProductById
* Admin: createProduct, updateProduct, deleteProduct
* Bild-Upload mit Multer
* Pagination & Filterung

---

### Warenkorb-API

* Endpunkte: addToCart, getCart, updateQuantity, removeFromCart, clearCart
* Authentifizierung erforderlich
* Berechnung des Gesamtpreises

---

### Bestellungen-API

* Endpunkte: createOrder, getOrders (User/Admin)
* Bestellung verwalten (Status: Pending, Completed)
* E-Mail-Benachrichtigung bei Bestellung

---

### Benutzerverwaltung

* Endpunkte: getAllUsers, getUserById (Admin)
* Benutzer bearbeiten/löschen
* Rollenverwaltung (User/Admin)

---

### Gutschein-API

* Gutscheine erstellen/bearbeiten/löschen (Admin)
* Validierung beim Checkout
* Einmaliger oder mehrfacher Gebrauch

---

### Datei-Upload für Produktbilder

* Multer-Integration für Bild-Upload
* Dateigröße & Typ validieren
* Bild-URLs speichern

---

### E-Mail-Benachrichtigungen

* Bestellbestätigung per E-Mail
* SMTP (z.B. mit Nodemailer)
* Vorlagen für E-Mail-Design

---

---

## 🟣 **Admin-Panel Aufgaben**

### Dashboard erstellen

* Übersicht: Anzahl Benutzer, Bestellungen, Umsatz
* Diagramme (z.B. mit Chart.js)
* Statistiken live abrufen

---

### Produktverwaltung

* Produktliste mit Bearbeiten/Löschen
* Neues Produkt hinzufügen (Formular)
* Bild-Upload + Validierung

---

### Benutzerverwaltung

* Alle Benutzer anzeigen
* Benutzer bearbeiten/löschen
* Rollen ändern (User/Admin)

---

### Bestellverwaltung

* Alle Bestellungen anzeigen
* Status ändern (z.B. Versandt)
* Filter nach Status/Datum

---

### Gutscheinverwaltung

* Gutscheine erstellen/bearbeiten/löschen
* Gültigkeit & Rabatthöhe einstellen
* Aktiv/Deaktiv-Funktion

---

### Übersetzungen & Einstellungen

* Übersetzungen verwalten (i18n)
* Kontakt-Infos + Footer-Inhalte pflegen
* Theme/Design-Einstellungen

---

---

## 🟡 **Extras & Erweiterungen**

### Dark/Light-Theme umschalten

* Umschalter-Button (Toggle)
* Styled-Components ThemeProvider
* localStorage für Speicherung

---

### Mehrsprachigkeit (Deutsch & Englisch)

* i18n Integration (react-i18next)
* Übersetzungsdateien für alle Seiten
* Sprache im Navbar umschaltbar

---

### Responsives Design

* Mobile-First-Design
* Breakpoints definieren (z.B. 768px, 1024px)
* Testen auf Desktop, Tablet, Mobile

---

### SEO-Optimierungen

* Title & Meta-Tags pro Seite setzen
* Open Graph & Social Media Tags
* Sitemap & robots.txt erstellen

---

### Test-Setup mit Jest/Testing Library

* Tests für Redux-Slices
* Tests für UI-Komponenten
* CI/CD Integration

---

### CI/CD mit GitHub Actions

* Workflow für Linting & Tests
* Automatisches Deployment (optional)
* Badge im Readme anzeigen

---

---

