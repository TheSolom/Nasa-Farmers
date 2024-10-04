import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import setupRoutes from './routes.js';
import dbConnection from './shared/config/db.js';
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

await dbConnection();

app.use(errorMiddleware);

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));