const express = require('express');
const router = express.Router();
const { submitBid, getBidsForProject, acceptBid, rejectBid } = require('../controllers/bidController');
const auth = require('../middleware/authMiddleware');

router.post('/:projectId', auth, submitBid);
router.get('/:projectId', auth, getBidsForProject);
router.put('/:bidId/accept', auth, acceptBid);
router.put('/:bidId/reject', auth, rejectBid);

module.exports = router;
