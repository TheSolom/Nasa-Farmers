import { Router } from 'express';

import { addLocation } from './location.controller.js';
import { addLocationParamsValidation } from '../domain/location.validation.js';
import validateRequest from '../../../shared/middleware/validation.js';
import { isAuthenticated } from '../../../shared/middleware/auth.js';

const router = Router();

router.post('/', isAuthenticated, validateRequest({ body: addLocationParamsValidation }), addLocation);

export default router;
