const express = require('express');
const router = express.Router();
const { createProject, getAllProjects, getProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createProject);
router.get('/', getAllProjects);
router.get('/:id', getProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
