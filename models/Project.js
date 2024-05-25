const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skillsRequired: {
    type: [String],
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'in progress', 'completed', 'closed'],
    default: 'open',
  },
  bids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bid',
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
