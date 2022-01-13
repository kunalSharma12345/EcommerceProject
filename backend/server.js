const app = require('./app');

const dotenv = require('dotenv');

const connectDatabase = require('./config/database');


// Handling Uncaught Exceptions...
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1);
});



//config 
// to use the PORT variable created in config.env file...
dotenv.config({path:"backend/config/config.env"});
 
// Connecting to the database...
connectDatabase();



 
const server =  app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});

// Unhandled Promise Rejection....

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to the unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });

});