import { Router } from 'express';

import {
    getUser,
    getLocations,
} from './user.controller.js';
import {
    getUserParamsValidation,
    getUserLocationsParamsValidation,
} from '../domain/user.validation.js';
import validateRequest from '../../../shared/middleware/validation.js';

const router = Router();

router.get('/:userId/profile', validateRequest({ params: getUserParamsValidation }), getUser);

router.get('/:userId/locations', validateRequest({ params: getUserLocationsParamsValidation }), getLocations);

export default router;
