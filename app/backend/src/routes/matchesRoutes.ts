import { Router } from 'express';
import authenticate from '../middlewares/Auth.middleware';

import MatchesController from '../controllers/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', matchesController.getAllMatches);
router.patch('/matches/:id/finish', authenticate, matchesController.finishMatch);
router.patch('/matches/:id', authenticate, matchesController.patchMatch);
router.post('/matches', authenticate, matchesController.createMatch);

export default router;
