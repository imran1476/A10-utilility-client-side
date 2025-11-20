# Utility Bill Management System

**Live Site:** `https://your-live-site-url.com`
**Client Repo:** `https://github.com/imran1476/A10-utilility-client-side`
**Server Repo:** `https://github.com/imran1476/A10-Utility-server-side`

---

## Project Overview

A MERN-stack single-page application for viewing and managing monthly utility bills (Electricity, Gas, Water, Internet). Users can register/login (including Google OAuth), view public bill listings, see bill details, and — if eligible — pay the current month’s bills. The app includes responsive UI, search/filtering, PDF export of a user's paid-bills report, and role-aware private routes.

## Key Features (at least five)

* Responsive SPA with dynamic routing (React Router).
* Authentication: Email/password + Google social login (Firebase Auth recommended).
* Bills browsing with category filters and `limit(6)` recent bills on Home.
* Bill Details (private) with a Pay modal — only current-month bills are payable.
* My Pay Bills: user-specific table with Update/Delete, and **Download PDF report** (jsPDF + jsPDF-AutoTable).
* Toast/SweetAlert for all CRUD actions, Loading spinner during API calls.
* Dark/Light theme toggle (optional challenge).

---

## Important Project Rules / Submission Checklist

* ✅ **Client commits:** Minimum **15 notable commits** on client repo.
* ✅ **Server commits:** Minimum **8 notable commits** on server repo.
* ✅ **README.md** must be meaningful and include the live site URL and at least five bullet features.
* ❌ **Do not use Lorem ipsum** anywhere.
* ❌ **Do not use default alert()** for error/success — use toast or SweetAlert.
* ✅ Host client on **Netlify / Surge / Firebase** and server on **Vercel** (or any preferred hosts).
* ✅ Ensure that reloading any route does **not** throw errors (add Netlify `_redirects`).
* ✅ If using Firebase + Netlify, add your Netlify domain to Firebase authorized domains.
* ✅ Logged-in users must not be redirected to Login on reload of private routes.

Add this checklist to your PR or submission notes so the examiner can verify.

---

## Project Structure (suggested)

```
client/            # React app
  public/
    _redirects     # contains: /* /index.html 200
  src/
    components/
    pages/
    services/      # axios instances
    hooks/
server/            # Node + Express
  controllers/
  routes/
  models/
  seed/             # sample bills (>= 8 bills)
```

---

## Environment Variables

Create a `.env` file in both client and server with the following variables (example names):

**Client `.env`** (React - prefix `VITE_` for Vite)

```
VITE_API_BASE_URL=https://imran-utility.vercel.app/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-app.firebaseapp.com
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

**Server `.env`**

```
MONGO_URI=mongodb+srv://imran14:imran147650@cluster0.s6lozh0.mongodb.net/utilitydb?retryWrites=true&w=majority
PORT=5000

JWT_SECRET=some_long_jwt_secret
```

---

## Run Locally (Development)

1. **Clone client & server** repos.
2. **Install dependencies**

```bash
# client
cd client
npm install

# server
cd ../server
npm install
```

3. **Start dev servers**

```bash
# server
npm run dev
# client
npm run dev
```

Client should proxy requests (or use `VITE_API_BASE_URL`) to the running server.

---

## Build & Deploy

**Client (Netlify/Vercel/Firebase/Surge)**

1. `npm run build` (React -> `build/`, Vite -> `dist/`)
2. Ensure `public/_redirects` exists containing:

```
/*    /index.html    200
```

3. Configure **Publish directory**: `build` (React) or `dist` (Vite).
4. If using Firebase Auth, add the client host to Firebase Authorized Domains.

**Server (Vercel recommended)**

1. Push to GitHub and connect repo to Vercel.
2. Set required environment variables in Vercel dashboard.
3. Ensure CORS allows your client origin.

---

## Database Seeding (Bills)

Add at least **8 realistic bills** into the `bills` collection. Example `seed/bills.json` objects should include:

* `title`, `category` (Electricity|Gas|Water|Internet), `email`(creator), `location`, `description`, `image`, `date` (YYYY-MM-DD), `amount` (number)

Example document:

```json
{
  "title": "Frequent Power Outage in Mirpur",
  "category": "Electricity",
  "email": "creator@gmail.com",
  "location": "Mirpur-10, Dhaka",
  "description": "Power cuts occur daily in the evening.",
  "image": "https://example.com/power.jpg",
  "date": "2025-10-26",
  "amount": 260
}
```

Provide a `seed` script in your server `package.json` to load these into MongoDB for easy reviewer setup.

---

## API Endpoints (suggested)

```
GET   /api/bills?category=Electricity&limit=6      # list bills, filterable
GET   /api/bills/:id                              # bill details
POST  /api/bills                                  # add bill (admin/creator)

POST  /api/payments                               # save a paid bill (myBills collection)
GET   /api/my-bills?email=user@example.com        # user-specific paid bills
PUT   /api/my-bills/:id                           # update a paid bill
DELETE/api/my-bills/:id                           # delete a paid bill
```

Protect private routes with JWT or Firebase token verification.

---

## Client Behavior Notes & Validation Rules

* **Password validation**: Must contain at least one uppercase, one lowercase and minimum 6 characters. Show inline validation errors and **prevent registration** if invalid.
* **Pay Bill button**: Only enabled if bill’s `date` month equals the current month. Otherwise show disabled state + tooltip/explanation.
* **No `alert()`**: Use React-Toastify or SweetAlert2 for success/error messages.
* **Logged in user reload**: Implement auth persistence (localStorage/session or Firebase onAuthStateChanged) so private routes remain accessible after page reload.

---

## UI & Design Guidelines

* Keep headings, buttons and card sizes consistent across pages.
* Use grid layout for bills (3-column on desktop) and equal-sized cards.
* Include a carousel with at least 3 meaningful slides on Home.
* Add two extra meaningful sections on Home (e.g., How It Works, User Testimonials, Pricing, or Latest Notices).
* Replace old Twitter bird with new X logo where applicable.

---

## Download Report (Challenge)

* Use `jsPDF` + `jspdf-autotable` to generate a PDF from the My Pay Bills table.
* Provide a `Download Report` button on My Pay Bills page that exports only the currently logged-in user’s paid bills.

---

## Extra (Optional) Features & Challenges

* Dark/Light theme toggle.
* Add animations using Lottie / Framer Motion / react-awesome-reveal.
* Implement Axios interceptors for global request handling.

---

## Testing & QA

* Test route reloads locally with `serve -s build` (or Netlify preview) to confirm `_redirects` works.
* Test Google login flow in production domain (add authorized domain in Firebase console).

---

## Submission Notes for Examiner

Include the following in your submission message:

* Client repo link and **at least 15** highlighted commit messages (short list of important commits).
* Server repo link and **at least 8** highlighted commit messages.
* Live website URL.
* Short note describing how you seeded the bills and how to run the app.

---

## Author

Your Name — `your-email@example.com`

---

## License

MIT
