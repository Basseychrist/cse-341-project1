const dotenv = require("dotenv");
dotenv.config();

// Import the MongoDB client
const { MongoClient, ObjectId } = require("mongodb");
// const db = require("../dataBase/db"); // Correct path to db.js
let db;

const initDb = async (callback) => {
  try {
    // Define the MongoDB URI and create a new MongoClient instance
    const url = process.env.MONGODB_URL;
    if (!url) {
      throw new Error("MONGODB_URL is not defined in your .env file");
    }
    const client = new MongoClient(url);

    // Connect to the database
    await client.connect();
    db = client.db(); // Get the database instance

    console.log("Connected to MongoDB");
    return callback(null);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return callback(err);
  }
};
const getDb = () => {
  if (db) {
    return db;
  }
  throw new Error("Database not initialized. Call initDb first.");
};

// Export the initDb and getDb functions for use in other modules
// This allows you to initialize the database connection and retrieve the db instance later.
module.exports = {
  initDb,
  getDb,
  ObjectId,
};
