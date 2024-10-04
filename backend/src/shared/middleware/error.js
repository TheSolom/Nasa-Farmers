import HttpStatusCodes from '../utils/httpStatusCodes.js';

const sendError = (error, res, isProduction = false) => {
    const response = {
        message: error.message,
        ...(isProduction ? { cause: error.cause } : { error: { ...error, stack: error.stack } })
    };

    return res.status(error.statusCode).json(response);
};

const errorMiddleware = (error, _req, res, _next) => {
    // eslint-disable-next-line no-console
    console.error(error.message);

    error.statusCode = error.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    error.message = error.message && !error.isInternal ? error.message : 'Internal server error';

    const isProduction = process.env.NODE_ENV === 'production';
    sendError(error, res, isProduction);
};

export default errorMiddleware;
