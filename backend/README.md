# Coy Discover - Backend API

Robust, secure, and clean Node.js + Express + MongoDB backend for the **Coy Discover** swipe-based discovery feature.

---

## 🚀 Features & Architecture

1. **Clean Mongoose Data Modeling**:
   - `Profile`: 30+ seeded diverse profiles with photos, college/city, bio, and interests.
   - `Swipe`: Records likes and passes. Uses a **compound unique index** `(userId + targetProfileId)` to prevent duplicate swipes.
   - `Match`: Records mutual matches. Uses a **compound unique index** `(userId + matchedProfileId)` to prevent duplicate matches.

2. **Core Privacy Protection (Coy Principle)**:
   - The `GET /api/feed` endpoint strictly strips the internal `hasLikedUser` field (`.select('-hasLikedUser')`) so client apps never know who liked them beforehand.
   - Matches are created and revealed **only** when mutual interest is confirmed during `POST /api/swipe`.

3. **Single Logged-in User Simulation**:
   - Controlled via `CURRENT_USER_ID` in `.env`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/feed` | Returns profiles not yet swiped on by current user. |
| `POST` | `/api/swipe` | Records like or pass. Body: `{ "targetProfileId": "...", "action": "like" \| "pass" }`. Returns `{ isMatch: true/false, matchProfile: {...} }`. |
| `GET` | `/api/matches` | Returns mutual matches for current user. |
| `POST` | `/api/reset` | Resets swipes and matches for current user (handy for demos). |

---

## 🛠️ Setup & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` file (or copy `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/coy-discover
CURRENT_USER_ID=demo_user_coy_001
```

### 3. Seed Database (30+ Profiles)
```bash
npm run seed
```

### 4. Start Server
```bash
# Production mode
npm start

# Development mode (nodemon)
npm run dev
```
