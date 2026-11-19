# Coy Discover 💜 – Swipe-Based Dating Discovery App

> A mobile-first, high-fidelity swipe-based discovery experience built for the **Coy SDE Intern Assignment**. Designed with a modern **Deep Purple & Lavender** palette, fluid drag gestures, mutual match privacy guarantees, and full data persistence in MongoDB.

---

## 🌟 Live Demo Preview & Architecture

- **Frontend**: [http://localhost:3000](http://localhost:3000) (React 18 + Vite + Tailwind CSS + Framer Motion)
- **Backend API**: [http://localhost:5000](http://localhost:5000) (Node.js + Express + MongoDB)

---

### Key Screens Implemented
1. **Discover Tab (Core Feature)**:
   - Full photo card deck with smooth swipe right (Like) and swipe left (Pass) drag gestures via Framer Motion.
   - Dynamic tint overlays: Soft purple gradient for Like, soft rose gradient for Pass.
   - Desktop floating buttons (❌ Pass, ⚡ Info, 💜 Like).
   - Candidate verification badge, location & distance, bio, and interest tags.
   - Full Profile Details modal on card tap.
   - Profile counter (e.g., `1 / 32`).
2. **"It's a Match!" Celebration Screen**:
   - Triggered when mutual interest is confirmed.
   - Glowing overlapping avatars, confetti particle explosion, and immediate "Chat Now" or "Keep Discovering" CTA.
3. **Matches Tab**:
   - Real-time list of mutual matches loaded from MongoDB.
   - Online status indicator and interactive instant-chat simulation modal.
4. **Home Tab**:
   - Welcoming onboarding screen with quick action banner and Coy's privacy promise overview.
5. **Empty State**:
   - Clean 3D box illustration with "Reset Feed (Demo)" button to re-seed or test anytime.

---

## 🛡️ Privacy & Backend Security (Core Promise of Coy)

1. **Strict Client-Side Privacy**:
   - The `GET /api/feed` endpoint **never** returns `hasLikedUser` (`.select('-hasLikedUser')`).
   - The user cannot inspect browser network tools to see who liked them beforehand.
2. **Compound Unique Indexes**:
   - `Swipe` collection enforces unique `(userId + targetProfileId)` preventing duplicate swipes.
   - `Match` collection enforces unique `(userId + matchedProfileId)` preventing duplicate match records.
3. **Persistence Across Reloads**:
   - All swipes and matches persist reliably in MongoDB.

---

## 📡 API Specification

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/feed` | Returns candidate profiles not yet swiped on by current user. |
| `POST` | `/api/swipe` | Records like or pass. Body: `{ "targetProfileId": "...", "action": "like" \| "pass" }`. Returns `{ isMatch: boolean, matchProfile: {...} }`. |
| `GET` | `/api/matches` | Returns all mutual matches for current user. |
| `POST` | `/api/reset` | Resets swipes and matches for current user (convenient for testing). |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (running locally or MongoDB Atlas URI)

### 2. Backend Setup
```bash
cd backend
npm install

# Seed 32 mock profiles with diverse photos and interests
npm run seed

# Start server (runs on port 5000)
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start Vite dev server (runs on port 3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

---

