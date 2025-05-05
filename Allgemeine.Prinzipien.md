
---

# 🚀 **RadonaR Projekt – Arbeitsanweisungen & Best Practices**

---

## 1️⃣ **Allgemeine Prinzipien**

* 📁 **Modular & Sauber:**
  ➔ Der Code muss **modular** sein (z.B. Komponenten getrennt nach Funktion).
  ➔ **Keine Duplikate** – Wiederverwendbare Teile auslagern.

* 🌐 **Sprache:**
  ➔ Das gesamte Frontend unterstützt **Deutsch & Englisch** (i18n).

* 🎨 **Design-Standards:**
  ➔ **Styled-Components** wird für alle Styles verwendet.
  ➔ Das Theme muss **umschaltbar** sein (Dark/Light).

* 🔐 **Sicherheit:**
  ➔ Backend nur über sichere Routen (JWT + Cookies).
  ➔ Sensible Daten nicht hardcoden!

---

## 2️⃣ **GitHub & Branch-Strategie**

* 🔀 **Branches:**

  * `main`: Produktion (bleibt stabil)
  * `dev`: Entwicklungsstand (hier wird alles zusammengeführt)
  * `orhan`, `andre`, `radoslawa` ➔ **je ein Branch pro Entwickler**

* ✅ **Arbeitsweise:**
  1️⃣ Arbeite immer in deinem **eigenen Branch**
  2️⃣ Push → **Pull Request** gegen `dev`
  3️⃣ PR wird geprüft + gemerged

* 🚫 **Wichtig:**
  👉 Keine Direkt-Pushes auf `dev` oder `main` (geschützt durch Ruleset)

---

## 3️⃣ **Issues & Projects**

* 📝 **Issues:**

  * Jeder Task muss als **Issue** angelegt werden.
  * Titel & Beschreibung **klar & vollständig.**

* 📊 **Project-Board:**

  * Alle Issues müssen im **Project-Board** verfolgt werden.
  * Status-Spalten: Backlog ➔ Ready ➔ In Progress ➔ In Review ➔ Done.

* 👥 **Zuweisung:**
  ➔ Jeder Issue muss einem **Teammitglied** zugewiesen werden.
  ➔ Wenn du einen Task übernimmst: **Assign dich selbst.**

---

## 4️⃣ **Code-Qualität**

* 🔧 **Code-Reviews:**
  ➔ Jeder PR muss von mindestens **1 Reviewer** geprüft werden.
  ➔ Feedback einarbeiten ➔ erst dann mergen.

* 🧹 **Linting & Format:**
  ➔ Immer `eslint` & `prettier` ausführen, bevor du pushst.
  ➔ CI/CD prüft automatisch (GitHub Actions).

* **Tests:**

* **Backend-Tests:**
  ➔ Alle Tests werden mit **Postman** durchgeführt.
  ➔ Die Postman-Kollektion ist im Projekt enthalten (Beispiele + Erklärungen dabei).
  ➔ Ihr könnt damit **alle API-Endpoints testen** (Auth, Produkte, Warenkorb usw.).

* **Frontend-Tests:**
  ➔ Momentan keine Pflicht für Unit-Tests.
  ➔ Fokus liegt auf der stabilen Integration mit dem Backend.


---

## 5️⃣ **Kommunikation & Doku**

* 💬 **Updates:**

  * Bei größeren Änderungen ➔ kurze Zusammenfassung im Chat.
  * Bei Unsicherheiten ➔ immer lieber einmal mehr nachfragen.

* 📄 **Dokumentation:**

  * Neue Funktionen sollten **kurz dokumentiert** werden.
  * Dateien wie `README.md` aktuell halten (besonders API & Setup).

---

## 6️⃣ **Wichtige Tools & Standards**

| Tool                      | Zweck                       |
| ------------------------- | --------------------------- |
| **React + Redux Toolkit** | Frontend & State-Management |
| **Styled-Components**     | Styling + Theme             |
| **i18n (react-i18next)**  | Mehrsprachigkeit            |
| **Axios**                 | API-Calls                   |
| **GitHub Projects**       | Aufgaben-Management         |
| **Postman**               | Testing                     |
| **GitHub Actions**        | CI/CD Automatisierung       |

---

## 7️⃣ **Mögliche Stolperfallen (und wie man sie vermeidet)**

* 🔄 **Merge-Konflikte:**
  ➔ Immer vor dem Pushen: `git pull origin dev`
  ➔ Konflikte? ➔ Sofort melden & gemeinsam lösen.

* 🔐 **Fehlende Zugriffsrechte:**
  ➔ Sicherstellen, dass alle Collaborators die Einladung **akzeptiert** haben.

* 🛠️ **API-Probleme:**
  ➔ Nur über zentrale `api.js` & `apiCall.js` arbeiten.
  ➔ Backend-Verbindung immer testen, bevor man Frontend-Seiten entwickelt.

---

# ✅ **Zusammenfassung:**

| Was?                  | Wer?                 | Status                    |
| --------------------- | -------------------- | ------------------------- |
| Issues erstellen      | Jeder                | Pflicht vor Arbeitsbeginn |
| Aufgaben zuweisen     | Projektleiter + Team | Immer zu Beginn           |
| PRs erstellen         | Jeder                | Immer von eigenem Branch  |
| Code-Review           | Reviewer             | Pflicht vor Merge         |
| Project-Board pflegen | Alle                 | Laufend                   |

---


Harika detay verdin Orhan 🙌 Bu durumda **Frontend tarafı için unit test zorunlu değil**, ama **Backend testleri Postman koleksiyonu ile sağlanıyor** diyebiliriz. Hemen o kısmı güncelliyorum 👇

---


---

Bu haliyle herkes **Postman üzerinden test yapabileceğini** kolayca anlar ✅ Başka bir şey ekleyelim mi? 😊
