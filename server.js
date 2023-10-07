// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./db');
const { ObjectId } = require('mongodb');
const app = express();
const port = 5000; // Replace with your desired port number
app.use(bodyParser.json());


// GET - Retrieve all temple details
app.get('/temples', async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('temples'); // Replace with your collection name
  
    try {
      const temples = await collection.find({}).toArray();
      res.json(temples);
    } catch (error) {
      console.error('Error retrieving temples:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // POST - Create a new temple
  app.post('/temples', async (req, res) => {
    console.log("hittted..")
    const db = await connectToDatabase();
    const collection = db.collection('temples'); // Replace with your collection name
    const temple = req.body;
  
    try {
      const result = await collection.insertOne(temple);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating temple:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // PUT - Update a temple by ID
  app.put('/temples/:id', async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('temples'); // Replace with your collection name
    const templeId = req.params.id;
    const updatedTemple = req.body;
  
    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(templeId) },
        { $set: updatedTemple }
      );
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Temple updated successfully' });
      } else {
        res.status(404).json({ error: 'Temple not found' });
      }
    } catch (error) {
      console.error('Error updating temple:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // DELETE - Delete a temple by ID
  app.delete('/temples/:id', async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('temples'); // Replace with your collection name
    const templeId = req.params.id;
  
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(templeId) });
  
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Temple deleted successfully' });
      } else {
        res.status(404).json({ error: 'Temple not found' });
      }
    } catch (error) {
      console.error('Error deleting temple:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

