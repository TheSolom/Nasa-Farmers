import HttpStatusCodes from './shared/utils/httpStatusCodes.js';
import ErrorHandler from './shared/utils/error.handler.js';
import authRoutes from './modules/auth/api/auth.routes.js';
import userRoutes from './modules/user/api/user.routes.js';

const setupRoutes = (app, prefix = '') => {
    app.get([prefix, '/', '/api', '/api/v1'], (_req, res, _next) => {
        res.status(HttpStatusCodes.OK).json({
            message: 'Welcome to Nasa Farmers API V1',
            repo: 'https://github.com/TheSolom/Nasa-Farmers',
        });
    });

    app.use(`${prefix}/auth`, authRoutes);
    app.use(`${prefix}/users`, userRoutes);

    app.all('*', (req, _res, next) => {
        next(new ErrorHandler('Route not found', HttpStatusCodes.BAD_REQUEST, `${req.method} ${req.url}`));
    });
};

export default setupRoutes;
