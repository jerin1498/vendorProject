const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

const vendorRouter = require('./routes/vendorRouter');
const productRouter = require('./routes/productRouter');
const viewRouter = require('./routes/viewRouter');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')



const app = express();

// DEVELOPMENT LOGIN
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

app.set('view engine', 'ejs'); // template engine

app.set('views', path.join(__dirname, 'views')); //serving static files

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors()); // for Access-Control-Allow-Origin *

app.use(helmet()); // SET SECURITY HTTP HEADERS

app.use(express.json({ limit: '10kb' })); // BODY PARSER reading data from body into req.body

app.use(mongoSanitize()); // Data sanitization against NoSQL query injection

app.use(compression()); // for compressing the text data

//our routes
app.use('/', viewRouter);
app.use('/api/v1/vendor', vendorRouter);
app.use('/api/v1/product', productRouter);

// for unhandled routes
app.all('*', (req, res, next) => {
    next(new appError(`Cant find ${req.originalUrl} on this server`, 404))
})

// global error handler
app.use(globalErrorHandler)


module.exports = app;