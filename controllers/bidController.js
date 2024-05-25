const Bid = require('../models/Bid');
const Project = require('../models/Project');

// Submit a bid
exports.submitBid = async (req, res) => {
  const { proposal, estimatedCost, estimatedTime } = req.body;

  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const bid = new Bid({
      freelancer: req.user.id,
      project: req.params.projectId,
      proposal,
      estimatedCost,
      estimatedTime,
    });

    await bid.save();
    project.bids.push(bid);
    await project.save();

    res.json(bid);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all bids for a project
exports.getBidsForProject = async (req, res) => {
  try {
    const bids = await Bid.find({ project: req.params.projectId }).populate('freelancer', 'name');
    res.json(bids);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Accept a bid
exports.acceptBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);
    if (!bid) {
      return res.status(404).json({ msg: 'Bid not found' });
    }

    const project = await Project.findById(bid.project);
    if (project.client.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    bid.status = 'accepted';
    await bid.save();

    res.json(bid);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Reject a bid
exports.rejectBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);
    if (!bid) {
      return res.status(404).json({ msg: 'Bid not found' });
    }

    const project = await Project.findById(bid.project);
    if (project.client.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    bid.status = 'rejected';
    await bid.save();

    res.json(bid);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
