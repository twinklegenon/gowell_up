// backend/models/WaterIntake.js
const mongoose = require('mongoose');

const waterIntakeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true } // amount of water in mL
}, { timestamps: true });

module.exports = mongoose.model('WaterIntake', waterIntakeSchema);
