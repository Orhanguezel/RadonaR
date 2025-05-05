

### 1️⃣ **Login:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { login } from '@/features/auth/authSlice'

const dispatch = useAppDispatch()

const handleLogin = (email, password) => {
  dispatch(login({ email, password }))
}
```

---

### 2️⃣ **Register:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { register } from '@/features/auth/authSlice'

const dispatch = useAppDispatch()

const handleRegister = (name, email, password) => {
  dispatch(register({ name, email, password }))
}
```

---

### 3️⃣ **Aktuellen Benutzer abrufen (z.B. beim Laden der App):**

```jsx
import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchCurrentUser } from '@/features/auth/authSlice'

const dispatch = useAppDispatch()

useEffect(() => {
  dispatch(fetchCurrentUser())
}, [dispatch])
```

---

### 4️⃣ **Logout:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { logout } from '@/features/auth/authSlice'

const dispatch = useAppDispatch()

const handleLogout = () => {
  dispatch(logout())
}
```

---

### 5️⃣ **Status & Nachrichten:**

```jsx
import { useAppSelector } from '@/hooks/useAppSelector'

const { user, isAuthenticated, loading, error, message } = useAppSelector((state) => state.auth)

return (
  <>
    {loading && <p>Laden...</p>}
    {message && <p style={{ color: 'green' }}>{message}</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    {isAuthenticated ? <p>Willkommen, {user.name}</p> : <p>Bitte anmelden</p>}
  </>
)
```

---

### 6️⃣ **Nachrichten zurücksetzen:**

```jsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { clearAuthMessages } from '@/features/auth/authSlice'

const dispatch = useAppDispatch()

// z.B. nach Modal-Schließen
const handleClose = () => {
  dispatch(clearAuthMessages())
}
```

---

---