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

  public async getInProgressMatches(inProgress:boolean)
    :Promise<IMatches[]> {
    const matches = await this.matchesModel.findAll({
      where: { inProgress },
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async finishMatch(id:number):Promise<string> {
    const result = await this.matchesModel.update(
      { inProgress: false },
      { where: { id } },
    );
    if (!result) {
      Object.assign(new Error('Algo deu errado'), { status: 404 });
    }
    return 'Finished';
  }
}

export default MatchesServices;
