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
├── index.html                    (Single entry point — all sections gated behind login)
├── app/
│   ├── auth.js                   (Task 1 — Cookie-based login/logout)
│   ├── theme.js                  (Task 2 — localStorage theme & settings)
│   ├── cart.js                   (Task 3 — sessionStorage shopping cart)
│   └── security.js               (Task 4 — XSS prevention, CSRF tokens, CryptoJS)
├── styles/
│   └── main.css                  (Light and dark theme styles)
└── README.md                     (Project documentation)
```


---

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Tabitha2005/Web-Strorage-Group-6.git

2. Open the project folder and launch index.html using a local development server such as Live Server in VS Code.

3. Open your browser and navigate to:

http://127.0.0.1:5500/index.html

⚠️ Do not open index.html directly as a file (file://) — some cookie behaviours require a server context.

---

## ✅ Tasks Implemented

### Task 1: User Authentication with Cookies (app/auth.js)

Login form with username and password fields

Sets a cookie named authToken with value user123 on successful login

Cookie expiration set to 7 days from login date

HttpOnly and Secure flags documented as server-side requirements (cannot be enforced from client-side JavaScript on HTTP)

Logout deletes the authToken cookie and returns to the login view

All main content sections are hidden until the user logs in

### Task 2: Theme Preferences with localStorage (app/theme.js)

Light / dark mode toggle button

Selected theme stored in localStorage and applied automatically on every page load

Settings stored as a JSON object { theme, fontSize } using JSON.stringify and JSON.parse

Font size preference persists across sessions

Handles storage limit errors gracefully

### Task 3:  Session-Specific Shopping Cart (app/cart.js)

Products displayed with Add to Cart functionality

Cart stored in sessionStorage — resets when browser tab is closed

Duplicate items increase quantity instead of duplicating entries

Dynamic cart updates (items, totals)

Options to remove items or clear cart

### Task 4: Security Implementation (app/security.js)

XSS Prevention: User input sanitized using encodeURIComponent and safely rendered using textContent

CSRF Protection: Token generated using Math.random() and validated during form submission

Encryption: Sensitive data (e.g., user email) encrypted using CryptoJS before storing in localStorage

---

## 🛠️ Technologies Used

1. HTML5

2. CSS3

3. JavaScript (ES6)

4. Web Storage APIs

5. CryptoJS (AES encryption)

6. Live Server (VS Code)

---

## 👥 Group 6 Members & Contributions

### Name	Contribution:
Benigne Uwitonze:	Authentication, Theme (localStorage), Integration, Documentation

Tabitha Kuir: Shopping Cart (sessionStorage), Security Implementation, Testing & Debugging

---

## 🤝 Collaboration Approach

This project was completed collaboratively, with all team members contributing to:

1. Understanding and discussing Web Storage concepts

2. Planning the implementation approach

3. Developing features together

4. Reviewing and testing each other's work

5. We followed a shared responsibility model rather than strict task separation to ensure full understanding across the team.

---

## 🕵️ Incognito Mode Observations

When testing the application in incognito/private browsing mode:

Cookies are temporary and deleted after the session

localStorage is cleared once the session ends

sessionStorage behaves the same (cleared when tab closes)

This demonstrates how browser storage behaves differently in private environments.

---

## 📎 Additional Documents

The following supporting documents are included in the repository:

[Discussion Notes](https://docs.google.com/document/d/1mbIO7QgWznKxuvrQ1mDyCNyLg_kHLRTAxY12lmOOUOg/edit?usp=sharing) — contains summaries, key concepts, and group insights

[ Group Tracking Sheet ](https://docs.google.com/spreadsheets/d/11dNBQSWjXYBib6olifYq3C8rSSsJew-9rDMyX6lRX5U/edit?usp=sharing) — shows task allocation, participation, and meeting logs

These documents demonstrate our collaborative learning process and individual contributions.
