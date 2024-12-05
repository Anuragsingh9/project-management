// dbMiddleware.js

const { getDb } = require('../dbConnection/connection');
const { sendHttpResponse } = require('../helpers/helpers');

async function dbMiddleware(req, res, next) {
    try {
        const db = await getDb();
        req.db = db;
        next();
    } catch (error) {
        console.error("Error connecting to the database:", error);
        sendHttpResponse(res, 500, 'error', [], 'Error connecting to the database');
    }
}

module.exports = dbMiddleware;
