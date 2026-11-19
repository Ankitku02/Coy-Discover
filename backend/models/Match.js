const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    matchedProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to prevent duplicate matches
matchSchema.index({ userId: 1, matchedProfileId: 1 }, { unique: true });

module.exports = mongoose.model('Match', matchSchema);
