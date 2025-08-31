// controllers/templateController.js
const User = require("../models/User");

exports.useTemplate = async (req, res) => {
  const userId = req.user.id; // assuming JWT auth
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.credits <= 0) {
      return res.status(400).json({ error: "Insufficient credits. Please buy a plan." });
    }

    user.credits -= 1; // deduct 1 credit
    await user.save();

    res.json({ success: true, credits: user.credits });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
