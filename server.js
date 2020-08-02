const dotenv = require('dotenv');
const mongoose = require('mongoose');



// uncaughtExpection for sync code err
process.on('uncaughtException', err => {
    console.log(err.name, err.message)
    console.log('UNCAUGHT EXPECTION Shutting down');
    console.log(err);
        process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(connection => console.log('database connected successful'))

const port = process.env.PORT || 3001;    // env variable check in config.env file
const server = app.listen(port, () => {
    console.log(`app is running at port ${port}`);
});

// unhandledRejection for async code forgot to set catch method
process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('UNHANDLED REJECTION Shutting down');
    console.log(err);
    server.close(() => {
        process.exit(1);
    });   
});