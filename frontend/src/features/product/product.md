
---

# 1️⃣ **GESAMTEN STATE VERWENDEN:**

```jsx
import { useAppSelector } from '@/hooks/useAppSelector'

const { products, product, loading, error, message } = useAppSelector((state) => state.product)
```

➡️ Damit holst du:

* `products`: die gesamte Produktliste
* `product`: ein einzelnes Produkt
* `loading`: true während des API-Calls
* `error`: Fehlermeldung
* `message`: Erfolgsmeldung

---

# 2️⃣ **ALLE PRODUKTE LADEN:**

```jsx
import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchProducts } from '@/features/product/productSlice'

const dispatch = useAppDispatch()

useEffect(() => {
  dispatch(fetchProducts())
}, [dispatch])
```

➡️ Wird in `useEffect` beim Laden der Seite ausgeführt.

---

# 3️⃣ **PRODUKT NACH ID LADEN:**

```jsx
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchProductById } from '@/features/product/productSlice'

const { id } = useParams()
const dispatch = useAppDispatch()

useEffect(() => {
  if (id) {
    dispatch(fetchProductById(id))
  }
}, [dispatch, id])
```

➡️ Ideal für die Produkt-Detailseite.

---

# 4️⃣ **PRODUKT ERSTELLEN:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { createProduct } from '@/features/product/productSlice'

const dispatch = useAppDispatch()

const handleSubmit = (e) => {
  e.preventDefault()

  const newProduct = {
    name: 'Road Bike',
    price: 1000,
    description: 'Hochwertiges Rennrad',
  }

  dispatch(createProduct(newProduct))
}
```

➡️ Für Formular-Submit geeignet.

---

# 5️⃣ **PRODUKT AKTUALISIEREN:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { updateProduct } from '@/features/product/productSlice'

const dispatch = useAppDispatch()

const handleUpdate = () => {
  const id = 'PRODUCT_ID_HERE'

  const updatedData = {
    name: 'Updated Bike',
    price: 1200,
    description: 'Aktualisierte Beschreibung',
  }

  dispatch(updateProduct({ id, data: updatedData }))
}
```

➡️ Für Admin-Bereich / Editieren.

---

# 6️⃣ **PRODUKT LÖSCHEN:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { deleteProduct } from '@/features/product/productSlice'

const dispatch = useAppDispatch()

const handleDelete = (id) => {
  dispatch(deleteProduct(id))
}
```

➡️ Für Listenansichten geeignet.

**Beispiel:**

```jsx
products.map((item) => (
  <div key={item._id}>
    <h3>{item.name}</h3>
    <button onClick={() => handleDelete(item._id)}>Löschen</button>
  </div>
))
```

---

# 7️⃣ **FEHLERMELDUNGEN UND ERFOLGSMELDUNGEN:**

```jsx
const { message, error } = useAppSelector((state) => state.product)

return (
  <>
    {message && <div style={{ color: 'green' }}>{message}</div>}
    {error && <div style={{ color: 'red' }}>{error}</div>}
  </>
)
```

➡️ Zeigt z.B. nach erfolgreichem Erstellen oder bei einem Fehler die passende Meldung.

---

# 8️⃣ **NACHRICHTEN ZURÜCKSETZEN:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { clearProductMessages } from '@/features/product/productSlice'

const dispatch = useAppDispatch()

// Beispiel: wenn ein Modal geschlossen wird
const handleClose = () => {
  dispatch(clearProductMessages())
}
```

---

# 🔄 **KOMPLETTES BEISPIEL (fetch + delete + Fehlerbehandlung):**

```jsx
import React, { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
  fetchProducts,
  deleteProduct,
  clearProductMessages,
} from '@/features/product/productSlice'

const ProductList = () => {
  const dispatch = useAppDispatch()
  const { products, loading, error, message } = useAppSelector((state) => state.product)

  useEffect(() => {
    dispatch(fetchProducts())

    return () => {
      dispatch(clearProductMessages())
    }
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }

  if (loading) return <p>Laden...</p>

  return (
    <div>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {products.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <button onClick={() => handleDelete(item._id)}>Löschen</button>
        </div>
      ))}
    </div>
  )
}

export default ProductList
```

---

# ✅ ZUSAMMENFASSUNG:

| OPERATION                | THUNK                         | WIE VERWENDEN                                            |
| ------------------------ | ----------------------------- | -------------------------------------------------------- |
| Alle Produkte laden      | `fetchProducts()`             | in `useEffect`                                           |
| Einzelnes Produkt laden  | `fetchProductById(id)`        | in Produkt-Detail-Seite                                  |
| Produkt erstellen        | `createProduct(data)`         | beim Form-Submit                                         |
| Produkt aktualisieren    | `updateProduct({ id, data })` | beim Editieren                                           |
| Produkt löschen          | `deleteProduct(id)`           | mit einem Button in der Liste                            |
| Nachrichten zurücksetzen | `clearProductMessages()`      | z.B. beim Schließen von Modals oder nach der Anzeige     |
| Redux-State verwenden    | `useAppSelector`              | `{ products, product, loading, error, message }` abrufen |

---
