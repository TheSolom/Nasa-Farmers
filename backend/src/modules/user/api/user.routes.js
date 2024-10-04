import { Router } from 'express';

import {
    getUser,
} from './user.controller.js';
import {
    getUserParamsValidation,
} from '../domain/user.validation.js';
import validateRequest from '../../../shared/middleware/validation.js';

const router = Router();

router.get('/:userId/profile', validateRequest({ params: getUserParamsValidation }), getUser);

export default router;
