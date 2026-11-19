require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const Swipe = require('../models/Swipe');
const Match = require('../models/Match');
const mockProfiles = require('./profilesData');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/coy-discover';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log('🧹 Clearing existing collections...');
    await Profile.deleteMany({});
    await Swipe.deleteMany({});
    await Match.deleteMany({});

    console.log(`🌱 Seeding ${mockProfiles.length} mock profiles...`);
    const inserted = await Profile.insertMany(mockProfiles);

    const preLikedCount = inserted.filter(p => p.hasLikedUser).length;
    console.log(`✅ Successfully seeded ${inserted.length} profiles!`);
    console.log(`✨ ${preLikedCount} profiles pre-configured to match when liked by user.`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
