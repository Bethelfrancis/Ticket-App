# TicketApp — React Version

This folder contains the React + Vite implementation of TicketApp — a demo ticket management UI with mocked authentication and localStorage-backed ticket CRUD.

Overview
- Landing page with a wavy hero and decorative circles.
- Authentication (Login / Signup) using a mock token stored in localStorage under `ticketapp_session`.
- Dashboard with high-level ticket stats.
- Ticket Management: Create, Read, Update, Delete with validation and toast feedback.
- Design: full-bleed hero, card-like components, responsive layout.

Quick start
1. Install dependencies

```powershell
cd "c:\Users\USER\Documents\Ticket App\react-version"
npm install
```

2. Run dev server

```powershell
npm run dev
```

3. Open the URL from Vite (usually http://localhost:5173)

Example credentials
- Email: `test@user.com`
- Password: `password`

If you logout, log back in via the Login page or use the developer shortcut in the browser console to set the session:

```js
localStorage.setItem('ticketapp_session', JSON.stringify({ user:{email:'test@user.com'}, token:'mock-token-123' }));
location.reload();
```

Project structure (key files)
- `src/main.jsx` — app bootstrap and router setup
- `src/App.jsx` — route definitions and protected route wrapper
- `src/components/Layout.jsx` — site header, nav, and footer (applies global layout)
- `src/components/Toast.jsx` — lightweight toast notifications
- `src/pages/Landing.jsx`, `src/pages/Auth.jsx`, `src/pages/Dashboard.jsx`, `src/pages/Tickets.jsx` — main pages
- `src/utils/auth.js` — mock auth helpers (`login`, `signup`, session helpers)
- `src/utils/storage.js` — localStorage-backed ticket CRUD and `validateTicket`
- `src/styles.css` and `src/index.css` — global styles and theme
- `public/favicon.svg` — favicon used by the app

State shape & session
- Session stored under `ticketapp_session` in localStorage: { user: { email }, token }
- Tickets stored under `ticketapp_tickets_v1` as an array of objects: { id, title, status, description }

Validation rules (enforced in `storage.js`)
- `title` — required
- `status` — required and must be one of: `open`, `in_progress`, `closed`
- `description` — optional but limited in length (validated)

Accessibility notes
- Semantic HTML elements are used (`header`, `main`, `nav`, `footer`).
- Visible focus states on interactive elements.
- Color contrast chosen for readability; please test with your target devices.

Switching to Vue/Twig versions
- This repository is prepared to host separate folders for `vue-version/` and `twig-version/` implementations. Each will follow the same layout and behavior. If you want, I can scaffold those next.

Known limitations
- This is a front-end demo using `localStorage`. Replace with a real API and secure token flow for production.
- No automated tests are included yet.

If you'd like, I can:
- Scaffold the Vue and Twig versions next (matching layout and behavior).
- Add automated unit tests for critical flows (auth, ticket CRUD).
- Export PNG/ICO favicon variants.
