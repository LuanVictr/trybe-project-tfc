import { Router } from 'express';
import authenticate from '../middlewares/Auth.middleware';

import MatchesController from '../controllers/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', matchesController.getAllMatches);
router.patch('/matches/:id', authenticate, matchesController.finishMatch);

export default router;
