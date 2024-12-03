const express = require('express');
const router = express.Router();
const { register, getOrganization } = require('../controllers/organizations/organizationController');
const handleValidationErrors = require('../middleware/errorHandler');
const authenticateToken = require('../middleware/authenticateToken');
const { validateOrganizationCreate } = require('../validators/org/orgValidation');

router.post('/register', authenticateToken, validateOrganizationCreate, handleValidationErrors, register);
router.get('/:orgId', authenticateToken, getOrganization);


module.exports = router;