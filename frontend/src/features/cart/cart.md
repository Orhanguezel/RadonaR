

### 1️⃣ **Warenkorb holen:**

```jsx
import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getCart } from '@/features/cart/cartSlice'

const dispatch = useAppDispatch()

useEffect(() => {
  dispatch(getCart())
}, [dispatch])
```

---

### 2️⃣ **Produkt zum Warenkorb hinzufügen:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { addToCart } from '@/features/cart/cartSlice'

const dispatch = useAppDispatch()

const handleAdd = (productId) => {
  dispatch(addToCart({ productId, quantity: 1 }))
}
```

---

### 3️⃣ **Menge erhöhen:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { increaseQuantity } from '@/features/cart/cartSlice'

const dispatch = useAppDispatch()

const handleIncrease = (productId) => {
  dispatch(increaseQuantity(productId))
}
```

---

### 4️⃣ **Menge verringern:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { decreaseQuantity } from '@/features/cart/cartSlice'

const dispatch = useAppDispatch()

const handleDecrease = (productId) => {
  dispatch(decreaseQuantity(productId))
}
```

---

### 5️⃣ **Produkt entfernen:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { removeFromCart } from '@/features/cart/cartSlice'

const dispatch = useAppDispatch()

const handleRemove = (productId) => {
  dispatch(removeFromCart(productId))
}
```

---

### 6️⃣ **Warenkorb leeren:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { clearCart } from '@/features/cart/cartSlice'

const dispatch = useAppDispatch()

const handleClear = () => {
  dispatch(clearCart())
}
```

---

### 7️⃣ **Nachrichten / Fehler behandeln:**

```jsx
import { useAppSelector } from '@/hooks/useAppSelector'

const { cart, loading, error, message } = useAppSelector((state) => state.cart)

return (
  <>
    {loading && <p>Laden...</p>}
    {message && <p style={{ color: 'green' }}>{message}</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </>
)
```

---

### 8️⃣ **Nachrichten zurücksetzen:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { clearCartMessages } from '@/features/cart/cartSlice'

const dispatch = useAppDispatch()

// z.B. nach Modal-Schließen
const handleClose = () => {
  dispatch(clearCartMessages())
}
```
