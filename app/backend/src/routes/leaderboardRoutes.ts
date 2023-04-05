import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/leaderboard/home', leaderboardController.createLeaderboard);

export default router;
