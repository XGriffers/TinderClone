require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB using environment variables
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_DB
} = process.env;

const mongoUri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`;
const dbName = 'tinderCloneDB'; // Replace with your desired database name

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const client = new MongoClient(mongoUri, {
  serverApi: ServerApiVersion.v1,
});

async function createDatabaseIfNotExists() {
  try {
    if (client.isConnected()) {
      const adminDb = client.db('admin');
      const databases = await adminDb.admin().listDatabases();

      if (!databases.databases.some(db => db.name === MONGO_DB)) {
        // Database doesn't exist, create it
        await adminDb.admin().command({ create: MONGO_DB });
        console.log(`Database "${MONGO_DB}" created successfully.`);
      }
    } else {
      console.error('MongoDB client is not connected.');
    }
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

async function run() {
  try {
    await client.connect();
    const database = client.db(MONGO_DB);
    const collection = database.collection("tinderdb");
    const docCount = await collection.countDocuments(); // Consider using the count method
    console.log(docCount);
    // perform actions using client
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

// Configure routes
app.use('/api/users', require('./routes/users'));

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/dist/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));
}

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  createDatabaseIfNotExists(); // Call the function to create the database if needed
});

run().catch(console.dir);
