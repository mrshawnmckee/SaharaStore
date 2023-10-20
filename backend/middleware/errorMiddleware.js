// This creates a custom error handler

// This will be called if no other middleware handles the request
const notFound = (res, req, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Overwrite default express error handler
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message;
    
    // Check for mongoose bad objectId (ex, instead of html page if product does not exist)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = "Resource not found";
        statusCode = 404;
    }

    res.status(statusCode).json({
        message, 
        stack: process.env.NODE_ENV === 'production' ? 'pancake' : err.stack,   //if it is in development, it will send pancakes, 
    });
};

export { notFound, errorHandler };
