const express = require('express');
const router = express.Router();
const { taskCreationValidation } = require('../validators/tasks/taskValidation');
const { createTask, getUserTaskById, getProjectTasks } = require('../controllers/tasks/taskController');
const handleValidationErrors = require('../middleware/errorHandler');
const authenticateToken = require('../middleware/authenticateToken');
const isAdminUser = require('../middleware/isAdminUser');

router.post('/:projectId/create', authenticateToken, taskCreationValidation, handleValidationErrors, isAdminUser, createTask);
/**
 * @deprecated
 */
// router.get('/:userId/user-tasks', authenticateToken, isAdminUser, getUserTaskById); 

router.get('/:projectId/project-tasks', authenticateToken, isAdminUser, getProjectTasks);

module.exports = router;