const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from your frontend domain
app.use(cors({
  origin: 'https://portfolio-backend-phi-three.vercel.app/', // Replace with your actual frontend URL
 }));

// MongoDB connection URI
const uri = 'mongodb+srv://user1:Chamu123@cluster0.alycqcg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'db1'; // Replace 'db1' with your actual database name

// Function to get MongoDB database instance
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

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)
