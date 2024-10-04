import * as locationService from '../domain/location.service.js';
import HttpStatusCodes from '../../../shared/utils/httpStatusCodes.js';

export async function addLocation(req, res, next) {
    const { user } = req;
    const { body: locationData } = req;

    locationData.userId = user.id;

    try {
        const location = await locationService.addLocation(locationData);

        res.status(HttpStatusCodes.CREATED).json(location);
    } catch (error) {
        return next(error);
    }
}
