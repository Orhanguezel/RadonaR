
---

# 🚀 **Beispiel: Änderungen machen & Pull Request erstellen (auf Deutsch)**

---

## ✅ 1️⃣ Branch prüfen

Zuerst sicherstellen, **auf welchem Branch du bist:**

```bash
git branch
```

Ausgabe (z.B.):

```
* andre
  dev
  main
  orhan
  radoslawa
```

👉 Wenn du in einem anderen Branch bist, z.B. `andre`, aber auf `orhan` arbeiten möchtest:

---

## ✅ 2️⃣ Zu deinem Branch wechseln

```bash
git switch orhan
```

👉 Git zeigt:

```
Switched to branch 'orhan'
Your branch is up to date with 'origin/orhan'.
```

Das bedeutet: Du bist jetzt auf dem `orhan`-Branch und alles ist aktuell ✅

---

## ✅ 3️⃣ Dateien zum Commit vorbereiten

Nachdem du Änderungen gemacht hast (z.B. neue Doku hinzugefügt), markiere alles zum Commit:

```bash
git add .
```

---

## ✅ 4️⃣ Commit erstellen

Ein gutes Commit schreiben (z.B. für Dokumentation):

```bash
git commit -m "GitHub-Dokumentation erstellt"
```

Git zeigt z.B.:

```
[orhan 4be14b3] GitHub-Dokumentation erstellt
 3 files changed, 422 insertions(+)
 create mode 100644 beispiel.githup.md
 create mode 100644 githup.de.md
 create mode 100644 githup.tr.md
```

✅ Perfekt → dein Commit ist lokal erstellt.

---

## ✅ 5️⃣ Push zum Remote-Repository

Jetzt deine Änderungen zum GitHub-Repository hochladen:

```bash
git push origin orhan
```

Git zeigt:

```
To https://github.com/Orhanguezel/RadonaR.git
   6479be1..4be14b3  orhan -> orhan
```

✅ Super → deine Änderungen sind jetzt auf GitHub!

---

---

# 🚀 **Pull Request (PR) auf GitHub erstellen**

1️⃣ Gehe zu 👉 [https://github.com/Orhanguezel/RadonaR](https://github.com/Orhanguezel/RadonaR)

2️⃣ Klicke oben auf den Tab **"Pull Requests".**

3️⃣ Drücke auf **"New Pull Request".**

4️⃣ Wähle:

| **Base:** | **Compare:** |
| --------- | ------------ |
| dev       | orhan        |

Das bedeutet: Du möchtest deine Änderungen von `orhan` in `dev` zusammenführen.

5️⃣ Prüfe die Änderungen (GitHub zeigt alle geänderten Dateien).

6️⃣ Schreibe einen Titel (z.B.: `Orhan: GitHub-Dokumentation hinzugefügt`).

7️⃣ Klicke auf **"Create Pull Request".**

✅ Jetzt ist dein PR erstellt.
Der Merge-Verantwortliche kann den PR prüfen und mergen.

---

---

# ✅ **Nach dem Merge (sehr wichtig!)**

Damit dein lokaler `orhan`-Branch **up-to-date bleibt**, bitte:

1️⃣ Den neuesten Stand von `dev` holen:

```bash
git checkout dev
git pull
```

2️⃣ Dann deinen Branch mit `dev` synchronisieren:

```bash
git checkout orhan
git pull origin dev
git push
```

✅ Jetzt ist alles aktuell und synchronisiert.

---

# 🎯 **FAZIT:**

Du hast es GENAU RICHTIG gemacht ✅

* Branch gewechselt
* Commit + Push erstellt
* PR kann jetzt eröffnet werden!

💬 Wenn du den PR geöffnet hast, sag gerne Bescheid 😊
