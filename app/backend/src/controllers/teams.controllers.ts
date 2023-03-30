import { Request, Response } from 'express';
import TeamsServices from '../services/teams.services';

class TeamsController {
  constructor(private teamsService = new TeamsServices()) {}

  public getAllTeams = async (_req: Request, res: Response) => {
    try {
      const result = await this.teamsService.getAllTeams();
      res.status(200).send(result);
    } catch (error:any) {
      res.status(error.status).json({ message: error.message });
    }
  };

  public getTeamById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const team = await this.teamsService.getTeamById(parseInt((id), 10));
      res.status(200).send(team);
    } catch (error:any) {
      res.status(error.status).json({ message: error.message });
    }
  };
}

export default TeamsController;
