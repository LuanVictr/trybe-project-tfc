import Teams from '../database/models/Teams';
import ITeams from '../interfaces/ITeams';

class TeamsService {
  constructor(private teamModel = Teams) {}

  public async getAllTeams():Promise<ITeams[]> {
    const result = await this.teamModel.findAll();
    return result;
  }

  public async getTeamById(id:number):Promise<ITeams> {
    const result = await this.teamModel.findByPk(id);
    if (!result) {
      throw Object.assign(
        new Error('Time não encontrado'),
        { status: 404 },
      );
    }
    return result;
  }
}

export default TeamsService;
