const { body } = require('express-validator');

const validateRegisterUser = [
    body('first_name').trim().notEmpty().withMessage('First name is required'),
    body('last_name').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required')
        .custom(async (email, { req }) => {
            console.log('reqqq email', req.body.email);
            const existingUser = await req.db.collection('users').findOne({ email: req.body.email });

            if (existingUser) {
                throw new Error('Email already exists');
            }
            return true;
        }),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

const validateLoginUser = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
    validateRegisterUser,
    validateLoginUser,
};
