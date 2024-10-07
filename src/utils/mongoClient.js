const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =  require('../config/config').MONGO_URL;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error; 
    }
}

connectToDatabase();

module.exports = {client}; 
