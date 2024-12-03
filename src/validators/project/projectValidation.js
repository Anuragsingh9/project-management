const { body } = require('express-validator');

const projectCreateValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    // body('org_id').trim().notEmpty().withMessage('Organization id is required to create project')
];

module.exports = { projectCreateValidation }