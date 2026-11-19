const express = require('express');
const router = express.Router();
const {
  getFeed,
  recordSwipe,
  getMatches,
  resetDemo,
} = require('../controllers/discoverController');

// 1. GET /feed - Returns profiles not yet swiped on
router.get('/feed', getFeed);

// 2. POST /swipe - Records like or pass, returns if match created
router.post('/swipe', recordSwipe);

// 3. GET /matches - Returns user's mutual matches
router.get('/matches', getMatches);

// 4. POST /reset - Convenience endpoint to reset swipes & matches for demo
router.post('/reset', resetDemo);

module.exports = router;
