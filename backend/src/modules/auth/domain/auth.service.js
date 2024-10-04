import User from '../../user/data-access/user.model.js';
import { getUserByEmail } from '../../user/domain/user.service.js';
import ErrorHandler from '../../../shared/utils/error.handler.js';
import HttpStatusCodes from '../../../shared/utils/httpStatusCodes.js';

export const registerUser = async (userData) => {
    const { _id: userId } = await User.create(userData);

    return userId;
};

export const checkUserCredentials = async (userCredentials) => {
    const { email, password } = userCredentials;

    const user = await getUserByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
        throw new ErrorHandler('Incorrect email or password', HttpStatusCodes.UNAUTHORIZED);
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
