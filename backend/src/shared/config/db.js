import mongoose from 'mongoose';
import ErrorHandler from '../utils/error.handler.js';
import HttpStatusCodes from '../utils/httpStatusCodes.js';

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        throw new ErrorHandler(error.message, HttpStatusCodes.INTERNAL_SERVER_ERROR, null, true);
    }
}

export default connect;