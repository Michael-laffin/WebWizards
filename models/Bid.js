const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  proposal: {
    type: String,
    required: true,
  },
  estimatedCost: {
    type: Number,
    required: true,
  },
  estimatedTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['submitted', 'accepted', 'rejected'],
    default: 'submitted',
  },
}, { timestamps: true });

module.exports = mongoose.model('Bid', BidSchema);
