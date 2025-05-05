
---

# 🚀 **RADONAR Projekt: Branch- und Git-Management (Team-Leitfaden)**

---

## 🔥 **ALLGEMEINE STRATEGIE:**

| BRANCH      | ZWECK                                                                  |
| ----------- | ---------------------------------------------------------------------- |
| `main`      | Stabilste Version (Produktivsystem).                                   |
| `dev`       | Entwicklungsbereich – hier werden alle neuen Features zusammengeführt. |
| `andre`     | Arbeitsbereich von André.                                              |
| `radoslawa` | Arbeitsbereich von Radoslawa.                                          |
| `orhan`     | Arbeitsbereich von Orhan.                                              |

💡 **Regeln:**

* Jeder arbeitet **nur in seinem eigenen Branch.**
* **Keine direkten Pushes zu `main` oder `dev`.** Nur via **Pull Request (PR)!**

---

---

## ✅ **1️⃣ Branches anzeigen & wechseln**

**A) Alle Branches anzeigen:**

```bash
git branch -a
```

**B) Zu deinem Branch wechseln (z.B. andre):**

```bash
git checkout andre
```

👉 Falls du den Branch zum ersten Mal abrufst:

```bash
git fetch
git checkout andre
```

---

---

## ✅ **2️⃣ Änderungen machen & pushen**

1️⃣ Ändere deine Dateien
2️⃣ Terminal:

```bash
git add .
git commit -m "Andre: Neue Komponente für das Menü"
git push
```

Dies pusht **nur zu deinem eigenen Branch** (z.B. `andre`).

---

---

## ✅ **3️⃣ Aktuell bleiben (mit Pull aktualisieren)**

Wenn jemand anderes einen PR gemergt hat und `dev` aktualisiert wurde:

**Deinen Branch aktualisieren:**

```bash
git checkout andre      # dein Branch
git pull origin dev     # ziehe die neuesten Änderungen aus dev
```

So bleibst du synchron mit dem `dev` Branch.

---

---

## ✅ **4️⃣ Pull Request (PR) auf GitHub öffnen**

**Ziel:** Deine Änderungen sollen von `andre` → `dev` gemerged werden.

Schritte:

1️⃣ Gehe zu GitHub → [https://github.com/Orhanguezel/RadonaR](https://github.com/Orhanguezel/RadonaR)
2️⃣ Klicke auf den Reiter **"Pull Requests"**
3️⃣ Klicke auf **"New Pull Request"**
4️⃣ Wähle aus:

* **Base:** `dev`
* **Compare:** `andre` (oder dein eigener Branch)

5️⃣ Prüfe die Änderungen
6️⃣ Füge einen Titel + Beschreibung hinzu → **"Create Pull Request"**

✅ Der PR ist erstellt → Die Person, die für das Mergen zuständig ist, überprüft & merged.

---

---

## ✅ **5️⃣ Nach dem Merge aktualisieren**

Sobald dein PR gemerged wurde:

1️⃣ Aktualisiere den `dev` Branch:

```bash
git checkout dev
git pull
```

2️⃣ Aktualisiere deinen eigenen Branch mit den neuen Änderungen:

```bash
git checkout andre
git merge dev
git push
```

👉 So vermeidest du Konflikte in der Zukunft.

---

---

# 🚨 **KONFLIKTE (CONFLICTS) BEHANDELN**

## 📍 Wann passiert ein Konflikt?

* Wenn du und jemand anderes dieselbe Datei unterschiedlich geändert habt.
* Beim Mergen bekommst du eine Warnung z.B.:

```
CONFLICT (content): Merge conflict in src/components/Navbar.jsx
```

---

## ✅ Konflikt lokal lösen

1️⃣ Öffne die betroffene Datei (z.B. in VSCode):
Du siehst Markierungen wie:

```diff
<<<<<<< HEAD
(Code aus dev)
=======
(Code aus deinem Branch)
>>>>>>> andre
```

2️⃣ Löse den Konflikt manuell:

* Entscheide, welchen Code du behalten möchtest.
* Entferne die Markierungen (<<<<<<< ======= >>>>>>>)

3️⃣ Speichere

4️⃣ Terminal:

```bash
git add <dateiname>
git commit -m "Konflikt gelöst: Navbar.jsx"
git push
```

---

## ✅ Konflikt auf GitHub lösen

Wenn GitHub beim PR einen Konflikt meldet:

1️⃣ Im PR-Fenster auf **"Resolve conflicts"** klicken
2️⃣ Konflikt online lösen
3️⃣ Commit erstellen
4️⃣ PR mergen

---

---

# ✅ **WICHTIGE KOMMANDOS (FÜR ALLE WICHTIG)**

| ZWECK                                  | KOMMANDO                                                  |
| -------------------------------------- | --------------------------------------------------------- |
| Alle Branches anzeigen                 | `git branch -a`                                           |
| Zu einem Branch wechseln               | `git checkout <branch>`                                   |
| Remote-Branch das erste Mal abrufen    | `git fetch` + `git checkout <branch>`                     |
| Dateien ändern & pushen                | `git add .` + `git commit -m "Nachricht"` + `git push`    |
| Remote-Änderungen ziehen               | `git pull`                                                |
| Eigenen Branch mit dev synchronisieren | `git checkout andre` + `git pull origin dev`              |
| Konflikt lösen                         | Datei korrigieren → `git add` → `git commit` → `git push` |

---

# 🔒 **REGELN:**

* ✅ Jeder arbeitet **nur in seinem eigenen Branch.**
* ✅ Kein direkter Push zu `main` oder `dev`.
* ✅ PRs immer von deinem Branch → `dev`.
* ✅ Nach dem Merge: deinen Branch immer mit `dev` aktualisieren.

---

