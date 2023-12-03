// backend/routes/waterIntakeRoutes.js
const express = require('express');
const router = express.Router();
const WaterIntake = require('../models/waterIntake');

router.post('/intake', async (req, res) => {
console.log('POST /intake route hit with body:', req.body);
  const { userId, amount } = req.body;
  try {
    const newIntake = await WaterIntake.create({ userId, amount });
    res.status(201).json(newIntake);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/intake/total/:userId', async (req, res) => {
  const { userId } = req.params;
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  try {
    const totalToday = await WaterIntake.aggregate([
      { $match: { 
          userId: mongoose.Types.ObjectId(userId),
          date: { $gte: startOfDay }
      }},
      { $group: { 
          _id: null, 
          totalAmount: { $sum: "$amount" }
      }}
    ]);

    res.status(200).json({ totalAmount: totalToday[0]?.totalAmount || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
