import { Response, Request } from 'express';
import MatchesServices from '../services/matches.services';

class MatchServices {
  constructor(private matchesServices = new MatchesServices()) {}

  public getAllMatches = async (req: Request, res: Response) => {
    const matches = await this.matchesServices.getAllMatches();
    res.status(200).send(matches);
  };
}

export default MatchServices;
