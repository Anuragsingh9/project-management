const express = require('express');
const router = express.Router();
const { createProject, getProject, getProjectList, updateProject } = require('../controllers/projects/projectController');
const handleValidationErrors = require('../middleware/errorHandler');
const authenticateToken = require('../middleware/authenticateToken');
const isAdminUser = require('../middleware/isAdminUser');
const { projectCreateValidation } = require('../validators/project/projectValidation');

router.post('/:orgId/create', authenticateToken, projectCreateValidation, handleValidationErrors, isAdminUser, createProject);
router.get('/:projectId', authenticateToken, getProject);
router.get('/:orgId/list', authenticateToken, getProjectList);
router.put('/:projectId',authenticateToken, updateProject);

module.exports = router;