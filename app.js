const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const vendorRouter = require('./routes/vendorRouter');
const productRouter = require('./routes/productRouter');
const viewRouter = require('./routes/viewRouter');
const path = require('path');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')


const app = express();

// DEVELOPMENT LOGIN
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};



// template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//serving static files
app.use(express.static(path.join(__dirname, 'public')));
// SET SECURITY HTTP HEADERS
app.use(helmet());

// BODY PARSER reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

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