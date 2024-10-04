import * as userService from '../domain/user.service.js';
import { getUserLocations } from '../../location/domain/location.service.js';
import HttpStatusCodes from '../../../shared/utils/httpStatusCodes.js';

export async function getUser(req, res, next) {
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
        return next(error);
    }
}

export async function getLocations(req, res, next) {
    const { params: { userId } } = req;

    try {
        const locations = await getUserLocations(userId);

        res.status(HttpStatusCodes.OK).json(locations);
    } catch (error) {
        return next(error);
    }
}
