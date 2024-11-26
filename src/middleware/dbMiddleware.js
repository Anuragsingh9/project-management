// dbMiddleware.js

const { getDb } = require('../dbConnection/connection');

async function dbMiddleware(req, res, next) {
    try {
        const db = await getDb(); // Get the reusable db instance
        req.db = db; // Attach db instance to the request object
        // req.collection = db.collection('test'); // Attach the 'test' collection to the request object
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error("Error connecting to the database:", error);
        res.status(500).json({ message: 'Error connecting to the database' });
    }
}

module.exports = dbMiddleware;
