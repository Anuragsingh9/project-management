const { validationResult } = require('express-validator');
const { sendHttpResponse } = require('../helpers/helpers');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        sendHttpResponse(res, 400, 'error', [], errors.array());
    }
    next();
};

module.exports = handleValidationErrors;
