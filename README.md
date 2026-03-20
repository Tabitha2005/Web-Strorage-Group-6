# Web Storage Mechanisms — E-Commerce Demo
### Group 6 | Group Activity

A fully functional e-commerce demo application built to demonstrate the practical use of **Cookies**, **localStorage**, and **sessionStorage** in a real-world frontend context. The project also implements security measures including XSS prevention and CSRF token protection.

---

## 🎯 Objective

Apply knowledge of the three browser web storage mechanisms to build a secure and functional e-commerce demo that covers user authentication, theme preferences, a session-specific shopping cart, and client-side security.

---

## 📁 Project Structure

```
Web-Storage-Group-6/
├── index.html                  # Single entry point — all sections gated behind login
├── .gitignore                  # Excludes doc_and_planning/ and other local files
├── app/
│   ├── auth.js                 # Task 1 — Cookie-based login/logout
│   ├── theme.js                # Task 2 — localStorage theme & settings
│   ├── cart.js                 # Task 3 — sessionStorage shopping cart
│   └── security.js             # Task 4 — XSS prevention, CSRF tokens, CryptoJS
├── styles/
    └── main.css                # Light and dark theme styles
```

---

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Tabitha2005/Web-Strorage-Group-6.git
   ```

2. Open the project folder and launch `index.html` using a local development server such as **Live Server** in VS Code.

3. Open your browser and navigate to `http://127.0.0.1:5500/index.html`

> ⚠️ Do **not** open `index.html` directly as a file (`file://`) — some cookie behaviours require a server context.

---

## ✅ Tasks Implemented

### Task 1 — User Authentication with Cookies (`app/auth.js`)
- Login form with `username` and `password` fields
- Sets a cookie named `authToken` with value `user123` on successful login
- Cookie expiration set to **7 days** from login date
- `HttpOnly` and `Secure` flags documented as server-side requirements (cannot be enforced from client-side JavaScript on HTTP)
- Logout deletes the `authToken` cookie and returns to the login view
- All main content sections are **hidden until the user logs in**

### Task 2 — Theme Preferences with localStorage (`app/theme.js`)
- Light / dark mode toggle button in the header
- Selected theme stored in `localStorage` and applied automatically on every page load
- Settings stored as a JSON object `{ theme, fontSize }` using `JSON.stringify` and `JSON.parse`
- Font size slider persists across sessions via `localStorage`
- Handles `QuotaExceededError` gracefully

### Task 3 — Session-Specific Shopping Cart (`app/cart.js`)
- Five products displayed with individual **Add to Cart** buttons
- Cart stored in `sessionStorage` — resets automatically when the browser tab is closed
- Duplicate products increment quantity instead of creating a duplicate entry
- Cart total and item count updated in real time
- **Remove** individual items or **Clear Cart** entirely
- Correct implementation uses `JSON.parse(sessionStorage.getItem('cart')) || []`

### Task 4 — Security Implementation (`app/security.js`)
- **XSS Prevention:** User input sanitized using `encodeURIComponent` before display; inserted into the DOM via `textContent` only — never `innerHTML`
- **CSRF Protection:** Token generated once on page load using `Math.random().toString(36).substr(2)`, stored in `sessionStorage`, and injected as a hidden input into all forms. Submission is blocked if the token does not match.
- **CryptoJS Challenge:** Sensitive data (user email) encrypted with `CryptoJS.AES.encrypt` before being saved to `localStorage`. Raw stored value is unreadable without the secret key. Decrypted on demand using `CryptoJS.AES.decrypt`.

### Task 5 — Reflection & Comparison
See `doc_and_planning/05_task5_reflection_and_comparison.md` for the completed comparison table, discussion question answers, scenario matching, and incognito mode testing observations.

### Final Challenge — Full Integration
All tasks are combined into a single page application:
- Login with cookies → unlocks the full application
- Theme toggle persists via `localStorage`
- Cart resets on tab close via `sessionStorage`
- All forms protected with CSRF tokens and sanitized input

---

## 🔒 Security Notes

| Feature | Implementation | Limitation |
|---------|---------------|------------|
| `HttpOnly` cookie flag | Cannot be set from JavaScript | Must be set server-side in production |
| `Secure` cookie flag | Omitted for local HTTP development | Required on HTTPS in production |
| CSRF token | Simulated client-side with `Math.random()` | In production, tokens should be generated server-side |
| XSS prevention | `encodeURIComponent` + `textContent` | No third-party sanitization library used |
| Data encryption | CryptoJS AES in localStorage | Secret key is hardcoded — use environment variables in production |

---

## 🛠️ Technologies Used

- HTML5, CSS3, Vanilla JavaScript (ES6)
- [CryptoJS 4.1.1](https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js) — AES encryption for the localStorage challenge
- Live Server (VS Code extension) — local development server

---

## 👥 Group 6 Members

| Name | Task |
|------|------|
| Benigne Uwitonze | Task 1 — Authentication, Task 2 — Theme / localStorage, Task 5 — Reflection |
| Tabitha Kuir | Task 3 — Shopping Cart, Task 4 — Security, Task 5 — Integration |

---

## 📝 License

This project was created for academic purposes as part of a group activity on Web Storage Mechanisms.
