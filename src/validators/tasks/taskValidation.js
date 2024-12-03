const { body } = require('express-validator');

const taskCreationValidation = [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 3 }).withMessage('Title should be atleast 3 characters'),
    body('description').trim().notEmpty().withMessage('Description is required').isLength({min: 3}).withMessage('Description should be atleast 3 characters'),
    body('status').trim().notEmpty().withMessage('Status is required').isIn(['pending','in_progress','done']).withMessage('Invalid status code'),
];

module.exports = { taskCreationValidation }