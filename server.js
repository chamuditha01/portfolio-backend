const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { MongoClient } = require('mongodb');

const app = express();
const PORT =  5000; // Use environment variable for port

// Middleware for handling CORS
app.use(cors());

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB connection URI
const uri = 'mongodb+srv://user1:Chamu123@cluster0.alycqcg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'db1'; // Replace 'your_database_name' with your actual database name

// Function to get MongoDB database instance
async function getDb() {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  return client.db(dbName);
}

// Define production backend URL
const productionBackendUrl = 'https://personal-portfolio-rho-ruby.vercel.app1';

app.get('/getPP', async (req, res) => {
  try {
    const filter = { status: "selected" };
    const db = await getDb();
    const persons = await db.collection('PP').find(filter).toArray();
    res.status(200).json(persons);
  } catch (err) {
    console.error('Error fetching persons from MongoDB:', err);
    res.status(500).json({ error: 'Failed to fetch persons from MongoDB' });
  }
});

app.get('/getSkills', async (req, res) => {
  try {
    const db = await getDb();
    const skills = await db.collection('skills').find({}).toArray();
    res.status(200).json(skills);
  } catch (err) {
    console.error('Error fetching skills from MongoDB:', err);
    res.status(500).json({ error: 'Failed to fetch skills from MongoDB' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
