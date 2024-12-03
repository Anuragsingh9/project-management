const { body } = require('express-validator');

const validateOrganizationCreate = [
    body('org_name').trim().notEmpty().withMessage('Org name is required'),
    body('email').isEmail().withMessage('Valid email is required')
        .custom(async (email, { req }) => {
            console.log('reqqq email', req.body.email);
            const existingUser = await req.db.collection('organizations').findOne({ email: req.body.email });

            if (existingUser) {
                throw new Error('Email already exists');
            }
            return true;
        }),
];

module.exports = {
    validateOrganizationCreate,
};
