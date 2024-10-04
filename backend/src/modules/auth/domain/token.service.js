import jwt from 'jsonwebtoken';
import ErrorHandler from '../../../shared/utils/error.handler.js';
import HttpStatusCodes from '../../../shared/utils/httpStatusCodes.js';

export const verifyToken = (token, secretKey) => {
    return jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            throw new ErrorHandler('Invalid token', HttpStatusCodes.UNAUTHORIZED);
        }
        return decoded;
    });
};

export const createToken = (payload, secretKey, expiresIn) => {
    return jwt.sign(payload, secretKey, { expiresIn });
};

export const createLoginTokens = async (payload) => {
    const {
        ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_EXPIRES_IN, // In seconds
    } = process.env;

    const accessToken = createToken(payload, ACCESS_TOKEN_SECRET, parseInt(ACCESS_TOKEN_EXPIRES_IN));

    return accessToken;
};
