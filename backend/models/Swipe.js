const mongoose = require('mongoose');

const swipeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    targetProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    action: {
      type: String,
      enum: ['like', 'pass'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to prevent duplicate swipes
swipeSchema.index({ userId: 1, targetProfileId: 1 }, { unique: true });

module.exports = mongoose.model('Swipe', swipeSchema);
