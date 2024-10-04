import * as authService from './auth.service.js';
import ErrorHandler from '../../../shared/utils/error.handler.js';
import HttpStatusCodes from '../../../shared/utils/httpStatusCodes.js';
import { createLoginTokens } from './token.service.js';

export async function register(req, res, next) {
    const { body: userData } = req;

    try {
        const userId = await authService.registerUser(userData);

        res.status(HttpStatusCodes.CREATED).json({
            message: 'User registered successfully',
            user: { id: userId }
        });
    } catch (error) {
        return next(error);
    }
}

export async function login(req, res, next) {
    const { body: userCredentials } = req;

    try {
        const userWithoutPassword = await authService.checkUserCredentials(userCredentials);

        const accessToken = await createLoginTokens({
            user: {
                id: userWithoutPassword.id,
                email: userWithoutPassword.email
            }
        });

        res.status(HttpStatusCodes.OK).json({
            accessToken: {
                token: accessToken,
                expiresInSeconds: process.env.ACCESS_TOKEN_EXPIRES_IN,
            },
        });
    } catch (error) {
        return next(error);
    }

};
