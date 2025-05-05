
---

# 🚀 **RADONAR Projesi Branch ve Git Yönetimi (Ekip İçin Rehber)**

---

## 🔥 **GENEL STRATEJİ:**

| BRANCH      | AMACI                                                    |
| ----------- | -------------------------------------------------------- |
| `main`      | En stabil (yayınlanabilir) sürüm.                        |
| `dev`       | Tüm yeni geliştirmelerin toplandığı, test edildiği alan. |
| `andre`     | Andre'nin çalışma alanı.                                 |
| `radoslawa` | Radoslawa'nın çalışma alanı.                             |
| `orhan`     | Orhan'ın çalışma alanı.                                  |

💡 **Kurallar:**

* Herkes **sadece kendi branch’inde çalışır.**
* **Main ve Dev branch’ine DOĞRUDAN PUSH YOK!** Sadece **Pull Request (PR)** ile merge edilir.

---

---

## ✅ **1️⃣ Branch'leri Görmek ve Geçiş Yapmak**

**A) Tüm branch’leri görmek:**

```bash
git branch -a
```

**B) Kendi branch’ine geçmek (örnek: andre):**

```bash
git checkout andre
```

👉 Eğer daha önce geçmediysen:

```bash
git fetch
git checkout andre
```

---

---

## ✅ **2️⃣ Kod Değiştirip Push Etmek**

1️⃣ Kodlarını değiştir
2️⃣ Terminal:

```bash
git add .
git commit -m "Andre: Neue Komponente für das Menü"
git push
```

Bu sadece **kendi branch’inizde** olur (örnek: `andre` branch).

---

---

## ✅ **3️⃣ Güncel Kalmak (Pull ile Çekmek)**

Başka biri PR yaptı ve `dev` branch güncellendi. Senin branch’in geri kalır.

**Güncellemek için:**

```bash
git checkout andre      # kendi branch’in
git pull origin dev     # dev branch’ten güncelle
```

Bu sayede dev’deki son değişiklikleri alırsın ve kendi branch’in güncel olur.

---

---

## ✅ **4️⃣ GitHub Üzerinden PULL REQUEST (PR) Açmak**

**Amaç:** Örneğin Andre kodunu `andre` → `dev` merge etmek istiyor.

Aşamalar:

1️⃣ GitHub’a git → [https://github.com/Orhanguezel/RadonaR](https://github.com/Orhanguezel/RadonaR)
2️⃣ "Pull Requests" sekmesine tıkla
3️⃣ "New Pull Request" butonuna bas
4️⃣ **Base → `dev`** | **Compare → `andre`** seç
5️⃣ Değişiklikleri kontrol et
6️⃣ Başlık + açıklama ekle → "Create Pull Request"

✅ PR açıldı → Merge Sorumlusu kontrol eder ve merge eder.

---

---

## ✅ **5️⃣ Merge Sonrası Güncelleme**

PR merge edildiğinde:

1️⃣ Dev branch’i güncelle:

```bash
git checkout dev
git pull
```

2️⃣ Kendi branch’ini dev ile senkronize et:

```bash
git checkout andre
git merge dev
git push
```

👉 Bu **conflict riskini azaltır** çünkü hep güncel kalırsın.

---

---

# 🚨 **ÇATIŞMA (CONFLICT) DURUMUNDA NE YAPMALI?**

## 📍 Conflict Ne Zaman Olur?

* Senin branch’in → `dev` ile aynı dosyada farklı değişiklikler yaptıysa.
* Merge sırasında GitHub ya da lokal merge sırasında **uyarı verir.**

Örnek hata:

```
CONFLICT (content): Merge conflict in src/components/Navbar.jsx
```

---

## ✅ Conflict Çözümü (Lokal)

1️⃣ **Conflict olan dosyayı aç (VSCode önerilir):**
Dosyada şu işaretler olur:

```diff
<<<<<<< HEAD
(dev branch'inde olan kod)
=======
(andre branch'inde olan kod)
>>>>>>> andre
```

2️⃣ **Kodu manuel düzelt:**

* Gereksiz olanları sil
* İstediğin kodu bırak
* Conflict işaretlerini (<<<<<<< ======= >>>>>>>) tamamen kaldır

3️⃣ Kaydet

4️⃣ Terminal:

```bash
git add <dosya_adı>
git commit -m "Conflict resolved: Navbar.jsx"
git push
```

---

## ✅ Conflict Çözümü (GitHub Üzerinden)

Eğer PR sırasında GitHub conflict uyarısı verirse:

1️⃣ GitHub’daki PR sayfasında **"Resolve conflicts"** butonuna bas
2️⃣ Conflict olan dosyayı web üzerinden düzelt
3️⃣ Commit yap
4️⃣ PR’i merge et

---

---

# ✅ **KOMUT ÖZETİ (HERKESİN BİLMESİ GEREKEN)**

| AMAÇ                                        | KOMUT                                                  |
| ------------------------------------------- | ------------------------------------------------------ |
| Branch’leri görmek                          | `git branch -a`                                        |
| Branch’e geçmek                             | `git checkout <branch>`                                |
| Remote branch’e ilk kez geçmek              | `git fetch` + `git checkout <branch>`                  |
| Kod değiştirip push etmek                   | `git add .` + `git commit -m "Mesaj"` + `git push`     |
| Remote değişiklikleri çekmek                | `git pull`                                             |
| Dev branch’ten kendi branch’ini güncellemek | `git checkout andre` + `git pull origin dev`           |
| Merge sırasında conflict çözmek             | Dosyayı düzelt → `git add` → `git commit` → `git push` |

---

# 🔒 **KURALLAR:**

* ✅ **Sadece kendi branch’inizde kod yazın.**
* ✅ Main ve Dev branch’ine doğrudan push yapılmaz.
* ✅ PR açarken Base=dev, Compare=kendi branch’iniz seçilir.
* ✅ Merge sonrası kendi branch’inizi dev ile güncel tutun.

---
