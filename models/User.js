const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['freelancer', 'client'], required: true },
  bio: { type: String },
  skills: { type: [String] },
  hourlyRate: { type: Number },
  portfolio: { type: [String] },
  companyName: { type: String },
  logo: { type: String },
  description: { type: String },
  contactDetails: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
