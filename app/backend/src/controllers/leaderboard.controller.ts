import { Request, Response } from 'express';
import LeaderboardServices from '../services/leaderboard.services';

class LeaderboardController {
  constructor(private leaderboardServices = new LeaderboardServices()) {}

  public createLeaderboard = async (_req: Request, res:Response) => {
    try {
      const result = await this.leaderboardServices.createLeaderboard();
      res.status(200).send(result);
    } catch (error:any) {
      res.status(404).json({ message: error.message });
    }
  };

  public createLeaderBoardAway = async (req: Request, res: Response) => {
    try {
      const result = await this.leaderboardServices.createLeaderBoardAway();
      res.status(200).send(result);
    } catch (error:any) {
      res.status(404).json({ message: error.message });
    }
  };
}

export default LeaderboardController;
