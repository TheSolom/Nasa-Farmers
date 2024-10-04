import User from '../data-access/user.model.js';
import ErrorHandler from '../../../shared/utils/error.handler.js';
import HttpStatusCodes from '../../../shared/utils/httpStatusCodes.js';

export const getUserById = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ErrorHandler('User not found', HttpStatusCodes.NOT_FOUND);
    }

    return user;
};

export const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new ErrorHandler('User not found', HttpStatusCodes.NOT_FOUND);
    }

    return user;
};

export const checkUserPassword = async (userId, userPassword) => {
    const user = await User.findById(userId);

    if (!user || !(await user.comparePassword(userPassword))) {
        throw new ErrorHandler('Invalid password', HttpStatusCodes.UNAUTHORIZED);
    }
};
