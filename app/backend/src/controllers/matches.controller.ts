import { Response, Request } from 'express';
import MatchesServices from '../services/matches.services';

class MatchServices {
  constructor(private matchesServices = new MatchesServices()) {}

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matches = await this.matchesServices.getAllMatches();
      return res.status(200).json(matches);
    }
    const matches = await this.matchesServices.getInProgressMatches(inProgress === 'true');
    return res.status(200).json(matches);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.matchesServices.finishMatch(parseInt(id, 10));
    res.status(200).json({ message: result });
  };
}

export default MatchServices;
