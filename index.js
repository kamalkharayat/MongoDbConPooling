const { dbConnector, connection }  = require('./dbconnectors/mongoose-connector')
const dbSchema = require('./dbconnectors/dbSchema')
const logger = require('./logger')()
const { connectToDB } = require('./dbconnectors/mongoclient-connector');

//This method connects to the database and uses the mongoose common connection with connection pool to retrive the data from DB.
let findUserByEmailAndUsername = function (userData) {
    return new Promise((resolve, reject) => {
        dbConnector.then(()=>{
            console.log('DB Connected via mongoose');
            const userRecord = mongoose.model("user",dbSchema.User_model);
            userRecord.findOne({username:userData.username,token: userData.email})
            .then(result=>{
                if (result !== null) {
                    return resolve(result);
                }
                else{
                    return resolve(null);
                }
            }).catch(err=>{ logger.error("findUserByEmailAndUsername error: "+ err);});
        }).catch((error)=>{
            logger.error("Database connection error: "+ err)
        })
    });
}

findUserByEmailAndUsername();

//This method searches the user database by connecting via mongo client and connection pooling.
const searchUserByNameAndEmail=(userData)=>{
    return new Promise((resolve, reject)=>{
        let result={};
        const db = connectToDB();
        const collection = db.collection("users"); 
            if (collection != undefined)
            {
                collection.find({username:userData.username,token: userData.email}).toArray( function (err, result) {
                    
                    if (null != result) {
                        result={ 'found': result.length, result: result }
                    }else{
                        result={ 'found': 0, result: result }
                    }
        
        
                    if (err) {
                        logger.log({ level: 'error', message: err });
                       
                        reject({status: constants.BadRequest,'message': err})
                    }else{
                        resolve(result);
                    }
                });
            }
            else {
                logger.log({ level: 'error', message: 'DB network error' });
                reject({status: "Bad Request",'message': 'DB network error'})
            }
        });
}

searchUserByNameAndEmail();
