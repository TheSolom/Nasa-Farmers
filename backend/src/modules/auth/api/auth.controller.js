import * as authService from '../domain/auth.service.js';
import HttpStatusCodes from '../../../shared/utils/httpStatusCodes.js';
import { createLoginTokens } from '../domain/token.service.js';

export async function register(req, res, next) {
    const { body: userData } = req;

    try {
        const user = await authService.registerUser(userData);

        const accessToken = await createLoginTokens({
            user: {
                id: user._id,
                email: user.email
            }
        });

        res.status(HttpStatusCodes.CREATED).json({
            message: 'registered successfully',
            user: { id: user._id },
            accessToken: {
                token: accessToken,
                expiresInSeconds: process.env.ACCESS_TOKEN_EXPIRES_IN,
            }
        });
    } catch (error) {
        return next(error);
    }
}

export async function login(req, res, next) {
    const { body: userCredentials } = req;

    try {
        const user = await authService.checkUserCredentials(userCredentials);

        const accessToken = await createLoginTokens({
            user: {
                id: user._id,
                email: user.email
            }
        });

        res.status(HttpStatusCodes.OK).json({
            message: 'logged in successfully',
            user: { id: user._id },
            accessToken: {
                token: accessToken,
                expiresInSeconds: process.env.ACCESS_TOKEN_EXPIRES_IN,
            },
        });
    } catch (error) {
        return next(error);
    }
};
