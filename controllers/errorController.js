const AppError = require('../utils/appError');

const sendErrorProd = (err, req, res) => {
    // for api's error page
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperaional) {// operational err send to clint
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        };

        // 1) log error to the terminal
        console.error('ERROR ', err)
        // 2) sending generic message to the client
        return res.status(500).json({// programming error dont leack the err details
            status: "error",
            message: 'something went wrong! Try after sometime'
        });
        
    };
};

const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) { // for api's
        console.log(err)
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }else { // for ejs rendered templates 'website'
    res.status(err.statusCode).render('error')
}
};

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400)
};

const handleDuplicateFieldsDB = err => {
    const errorValue = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    // console.log(errorValue)
    const message = `Duplicate field value ${errorValue} please use another value`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    // console.log(errors)
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};


module.exports = (err, req, res, next) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;  
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        sendErrorProd(error, req, res)
    };
};

