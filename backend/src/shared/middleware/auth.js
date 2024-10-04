import HttpStatusCodes from '../utils/httpStatusCodes.js';
import { verifyToken } from '../../modules/auth/domain/token.service.js';
import ErrorHandler from '../utils/error.handler.js';

export async function isAuthenticated(req, _res, next) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (!accessToken) {
        throw new ErrorHandler('Please login to continue', HttpStatusCodes.UNAUTHORIZED);
    }

    const { user: decodedUser } = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);

    req.user = decodedUser;

    next();
};
