const mongoose = require('mongoose');

//Connection options
//Add poolSize here.
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  };


//Get connection string from the constants

const connectionString = "ConnectionString of the MongoDB";

//Establishes the Db connection
const connect = async () =>{
    try{
        await mongoose.connect(connectionString,options);
        console.log('Database connected!')
    }catch(error){
        console.error('Database connection failed!',error);
    }
}

module.exports = {
    connect,
    connection: mongoose.connection, // Export the connection object
  };