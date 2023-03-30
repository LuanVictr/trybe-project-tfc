import { Router } from 'express';
import TeamsController from '../controllers/teams.controllers';

const router = Router();

const teamsController = new TeamsController();

router.get('/teams', teamsController.getAllTeams);

router.get('/teams/:id', teamsController.getTeamById);

export default router;
