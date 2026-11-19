const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 99,
    },
    photo: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    cityOrCollege: {
      type: String,
      required: true,
      trim: true,
    },
    interests: {
      type: [String],
      default: [],
    },
    // Internal seed flag: profiles that have pre-liked the user
    // CRITICAL PRIVACY: Never expose this to the client in /feed API!
    hasLikedUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', profileSchema);
