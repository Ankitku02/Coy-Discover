const Profile = require('../models/Profile');
const Swipe = require('../models/Swipe');
const Match = require('../models/Match');

const getUserId = () => process.env.CURRENT_USER_ID || 'demo_user_coy_001';

/**
 * @route   GET /api/feed
 * @desc    Get profiles the logged-in user has not swiped on yet
 * @access  Public (Simulated single logged-in user)
 * @note    PRIVACY: 'hasLikedUser' is explicitly excluded from response
 */
exports.getFeed = async (req, res) => {
  try {
    const userId = getUserId();

    // 1. Fetch all profile IDs already swiped (liked or passed) by current user
    const swipedRecords = await Swipe.find({ userId }).select('targetProfileId');
    const swipedProfileIds = swipedRecords.map(record => record.targetProfileId);

    // 2. Fetch profiles not in swipedProfileIds
    // Crucial: EXCLUDE `hasLikedUser` field to protect Coy's privacy promise
    const feedProfiles = await Profile.find({
      _id: { $nin: swipedProfileIds },
    })
      .select('-hasLikedUser -__v')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: feedProfiles.length,
      profiles: feedProfiles,
    });
  } catch (error) {
    console.error('Error in getFeed:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching feed profiles',
      error: error.message,
    });
  }
};

/**
 * @route   POST /api/swipe
 * @desc    Record a swipe (like or pass) and evaluate mutual match
 * @access  Public
 */
exports.recordSwipe = async (req, res) => {
  try {
    const userId = getUserId();
    const { targetProfileId, action } = req.body;

    // Validate inputs
    if (!targetProfileId || !action) {
      return res.status(400).json({
        success: false,
        message: 'targetProfileId and action are required',
      });
    }

    if (!['like', 'pass'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "action must be either 'like' or 'pass'",
      });
    }

    // Check if target profile exists
    const targetProfile = await Profile.findById(targetProfileId);
    if (!targetProfile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    // Check if already swiped (prevent duplicate swipe)
    const existingSwipe = await Swipe.findOne({ userId, targetProfileId });
    if (existingSwipe) {
      return res.status(409).json({
        success: false,
        message: 'Profile has already been swiped on',
      });
    }

    // Save swipe record
    await Swipe.create({
      userId,
      targetProfileId,
      action,
    });

    let isMatch = false;
    let matchProfile = null;

    // Mutual match condition:
    // Action must be 'like' AND target profile hasLikedUser must be true
    if (action === 'like' && targetProfile.hasLikedUser) {
      isMatch = true;

      // Prevent duplicate match creation via upsert
      await Match.findOneAndUpdate(
        { userId, matchedProfileId: targetProfileId },
        { userId, matchedProfileId: targetProfileId },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      matchProfile = {
        _id: targetProfile._id,
        name: targetProfile.name,
        age: targetProfile.age,
        photo: targetProfile.photo,
        bio: targetProfile.bio,
        cityOrCollege: targetProfile.cityOrCollege,
        interests: targetProfile.interests,
      };
    }

    return res.status(200).json({
      success: true,
      action,
      isMatch,
      matchProfile,
    });
  } catch (error) {
    console.error('Error in recordSwipe:', error);
    // Handle unique compound index duplicate key error gracefully
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate swipe detected. Profile was already recorded.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error while recording swipe',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/matches
 * @desc    Get mutual matches for logged-in user
 * @access  Public
 */
exports.getMatches = async (req, res) => {
  try {
    const userId = getUserId();

    const matches = await Match.find({ userId })
      .populate('matchedProfileId', '-hasLikedUser -__v')
      .sort({ createdAt: -1 });

    // Extract populated profile objects
    const matchedProfiles = matches
      .map(m => m.matchedProfileId)
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      count: matchedProfiles.length,
      matches: matchedProfiles,
    });
  } catch (error) {
    console.error('Error in getMatches:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching matches',
      error: error.message,
    });
  }
};

/**
 * @route   POST /api/reset
 * @desc    Reset all swipes & matches for demo/testing purpose
 * @access  Public
 */
exports.resetDemo = async (req, res) => {
  try {
    const userId = getUserId();

    await Swipe.deleteMany({ userId });
    await Match.deleteMany({ userId });

    return res.status(200).json({
      success: true,
      message: 'All swipes and matches reset successfully for demo!',
    });
  } catch (error) {
    console.error('Error in resetDemo:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while resetting demo',
      error: error.message,
    });
  }
};
