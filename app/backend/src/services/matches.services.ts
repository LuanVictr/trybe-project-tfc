import ICreatedMatch from '../interfaces/ICreatedMatch';
import ICreatedMatchInfo from '../interfaces/ICreatedMatchInfo';
import ImatchInfo from '../interfaces/IMatchInfo';
import IMatches from '../interfaces/IMatches';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

class MatchesServices {
  constructor(private matchesModel = Matches, private teamsModel = Teams) {}

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

  public async patchMatch(matchInfo:ImatchInfo, id:number):Promise<string> {
    const result = await this.matchesModel.update(
      { homeTeamGoals: matchInfo.homeTeamGoals,
        awayTeamGoals: matchInfo.awayTeamGoals },
      { where: { id } },
    );
    if (!result) {
      Object.assign(new Error('Algo deu errado'), { status: 404 });
    }
    return 'Updated';
  }

  public async createMatch(matchInfo:ICreatedMatchInfo):Promise<ICreatedMatch> {
    const homeTeam = await this.teamsModel.findByPk(matchInfo.homeTeamId);
    const awayTeam = await this.teamsModel.findByPk(matchInfo.awayTeamId);
    if (!homeTeam || !awayTeam) {
      throw Object.assign(new Error('There is no team with such id!'), { status: 404 });
    }
    const { id } = await this.matchesModel.create({ ...matchInfo, inProgress: true });
    if (matchInfo.homeTeamId === matchInfo.awayTeamId) {
      throw Object.assign(
        new Error('It is not possible to create a match with two equal teams'),
        { status: 422 },
      );
    }
    return { id, ...matchInfo, inProgress: true };
  }
}

export default MatchesServices;
