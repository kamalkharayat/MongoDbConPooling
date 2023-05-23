const { MongoClient } = require('mongodb');
const poolSize = 10; 

//Specify the size of the connection pool

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: poolSize,
};

//Get connection string from the constants

const connectionString = "ConnectionString of the MongoDB";
let db = null; // Reference to the database name

// Function to establish the MongoDB connection and return the database object
function connectToDB() {
  if (db) {
    //If the connection already exists, return the existing database object
    return db;
  }
   //Else create a new connection
  const client = new MongoClient(connectionString, mongoOptions);

  try {
    client.connect();
    console.log('Connected to MongoDB');

    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

// Export the connectToDB function
module.exports = { connectToDB };
