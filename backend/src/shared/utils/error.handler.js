import HttpStatusCodes from './httpStatusCodes.js';

class ErrorHandler extends Error {
    constructor(message, statusCode, cause, isInternal = false) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
        this.isOperational = true;
        this.isInternal = isInternal;
        if (cause) {
            if (!Array.isArray(cause)) { cause = [cause]; }
            this.cause = cause;
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;
