const User = require("../models/User");

exports.buyPlan = async (req, res) => {
  const { plan } = req.body;
  const userId = req.user.id; // JWT auth should provide this

  const planCredits = { monthly: 2, semiannual: 6, annual: 12 };
  const planExpiryDays = { monthly: 30, semiannual: 182, annual: 365 };

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.credits = planCredits[plan];
    user.subscription = {
      plan,
      expiry: new Date(Date.now() + planExpiryDays[plan] * 24 * 60 * 60 * 1000),
    };

    await user.save();
    res.json({ success: true, credits: user.credits, subscription: user.subscription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
