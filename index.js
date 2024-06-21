const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const  app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:3000',  // Your local development frontend
  'https://personal-portfolio-fb4dnm5ny-chamuditha01s-projects.vercel.app'  // Your deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

const uri = 'mongodb+srv://user1:Chamu123@cluster0.alycqcg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'db1';

async function getDb() {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  return client.db(dbName);
}

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
