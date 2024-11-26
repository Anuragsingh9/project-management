const express = require('express');
const router = express.Router();
const { registerUser, login, getUser, updateUser } = require('../controllers/users/userController');
const { validateRegisterUser, validateLoginUser } = require('../validators/users/userValidation');
const handleValidationErrors = require('../middleware/errorHandler');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/register', validateRegisterUser, handleValidationErrors, registerUser);
router.post('/login', validateLoginUser, handleValidationErrors, login);
router.get('/', authenticateToken, getUser);
router.put('/', authenticateToken, updateUser);

module.exports = router;