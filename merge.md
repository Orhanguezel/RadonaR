
---

# 🚀 **Merge eines Pull Requests (GitHub)**

---

✅ **Was du aktuell siehst:**

* Titel: `github documantation ergestelt wird`
* Kommentar: `ich habe etwas gemacht`
* Status: 🟢 **No conflicts with base branch** (Keine Konflikte → Automatisches Mergen möglich)

👉 Ganz unten siehst du den blauen Button:
**„Merge pull request“**

---

# 🔥 **WAS MUSST DU TUN?**

1️⃣ Klicke auf den Button **„Merge pull request“**.

2️⃣ Es öffnet sich ein kleines Fenster → dort klickst du auf **„Confirm merge“**.

3️⃣ GitHub führt den Merge durch ✅
Du siehst danach eine Meldung wie:
**„Pull request successfully merged and closed“**

(Optional) Danach erscheint ein Button:
**„Delete branch“** → Wenn du den Branch nicht mehr brauchst, kannst du ihn hier löschen. (Z.B. den `orhan`-Branch). Wenn du ihn behalten möchtest, brauchst du nichts zu tun.

---

# ✅ **DANACH (Lokal dev synchronisieren)**

Damit dein lokales Repository aktuell ist, bitte:

```bash
git checkout dev
git pull
```

💡 Wenn du auch deinen eigenen Branch mit dem neuesten Stand von `dev` synchronisieren möchtest:

```bash
git checkout orhan
git pull origin dev
git push
```

---

# 🎯 **Zusammenfassung:**

| SCHRITT                                    | WAS TUN?                                                  |
| ------------------------------------------ | --------------------------------------------------------- |
| 1️⃣ Merge                                  | „Merge pull request“ → „Confirm merge“                    |
| 2️⃣ Optional: Branch löschen               | „Delete branch“ klicken (nur wenn du willst)              |
| 3️⃣ Lokal dev aktualisieren                | `git checkout dev` + `git pull`                           |
| 4️⃣ Optional: Eigenen Branch aktualisieren | `git checkout orhan` + `git pull origin dev` + `git push` |

---
