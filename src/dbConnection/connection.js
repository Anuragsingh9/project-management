const { MongoClient } = require('mongodb');
require('dotenv').config();
const url = "mongodb://localhost:27017";
const dbName = process.env.DB_NAME;
console.log(`db name ${dbName}`)

let dbInstance;

const connectToDatabase = async () => {
    if (dbInstance) {
        return dbInstance; // Return the existing instance if already connected
    }
    try {
        const client = await MongoClient.connect(url);
        dbInstance = client.db(dbName); // Assign the connected db instance to the singleton variable
        console.log(`connected to ${dbName}`);
        return dbInstance;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
};

module.exports = {
    getDb: async () => {
        if (!dbInstance) {
            await connectToDatabase();
        }
        return dbInstance;
    }
};
