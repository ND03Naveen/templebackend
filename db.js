// db.js
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://naveen:VduFNhz9DCVeyWt7@cluster0.2y94xte.mongodb.net/'; // Replace with your MongoDB connection string
const dbName = 'temple'; // Replace with your database name

async function connectToDatabase() {
  const client = new MongoClient(url, { useNewUrlParser: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

module.exports = connectToDatabase;
