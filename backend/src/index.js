import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import mongoose from 'mongoose';
import setupRoutes from './routes.js';
import ErrorHandler from './shared/utils/error.handler.js';
import HttpStatusCodes from './shared/utils/httpStatusCodes.js';
import errorMiddleware from './shared/middleware/error.js';

const inProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan(inProduction ? 'combined' : 'dev'));

setupRoutes(app, '/api/v1');

try {
    await mongoose.connect(process.env.MONGO_URI);
} catch (error) {
    throw new ErrorHandler(error.message, HttpStatusCodes.INTERNAL_SERVER_ERROR, null, true);
}

app.use(errorMiddleware);

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));