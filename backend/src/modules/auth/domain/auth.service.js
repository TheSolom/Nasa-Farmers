import User from '../../user/data-access/user.model.js';
import { getUserByEmail } from '../../user/domain/user.service.js';
import ErrorHandler from '../../../shared/utils/error.handler.js';
import HttpStatusCodes from '../../../shared/utils/httpStatusCodes.js';

export const registerUser = async (userData) => {
    const DUPLICATE_KEY_ERROR_CODE = 11000;

    try {
        return User.create(userData);
    } catch (error) {
        if (error.code === DUPLICATE_KEY_ERROR_CODE) {
            throw new ErrorHandler('User already exists', HttpStatusCodes.CONFLICT);
        }
        throw error;
    }
};

export const checkUserCredentials = async (userCredentials) => {
    const { email, password } = userCredentials;

    const user = await getUserByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
        throw new ErrorHandler('Incorrect email or password', HttpStatusCodes.UNAUTHORIZED);
    }

    return user;
};
