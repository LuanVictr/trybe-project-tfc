import IMatches from '../interfaces/IMatches';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

class MatchesServices {
  constructor(private matchesModel = Matches) {}

  public async getAllMatches():Promise<IMatches[]> {
    const matches = await this.matchesModel.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}

export default MatchesServices;
