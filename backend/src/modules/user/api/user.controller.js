import * as userService from '../domain/user.service.js';
import HttpStatusCodes from '../../../shared/utils/httpStatusCodes.js';

export async function getUser(req, res, _next) {
    const { params: { userId } } = req;

    try {
        const user = await userService.getUserById(userId);

        res.status(HttpStatusCodes.OK).json({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            job: user.job,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({
            message: error.message
        });
    }
}
