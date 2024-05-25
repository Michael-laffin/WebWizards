const express = require('express');
const router = express.Router();
const { createPayment, completePayment } = require('../controllers/paymentController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createPayment);
router.post('/complete', auth, completePayment);

module.exports = router;
