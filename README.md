# MongoDbConPooling
This code block explains the usage of Mongo DB connection pooling using both MongoClient and mongoose library from Node Js.
When using MongoDb from node js, sometimes its very critical to use connecting pooling as its necessary to limit the number of connections to the DB and at the same time we want to make sure that, there are no connection which are not closed.

If you want to know more about connecting pooling, please visit the following link.

https://www.mongodb.com/docs/manual/administration/connection-pool-overview/#:~:text=A%20connection%20pool%20helps%20reduce,return%20to%20the%20pool%20automatically.

In the code sample here, we have used two major libraries used to connect to the MongoDb from node application.

1. Mongoose 
2. MongoClient

The application demonstrates the use of the above libraries from a centralized code for all db operations, also at the same time, it utilizes the connection pooling feature to improve performance.
