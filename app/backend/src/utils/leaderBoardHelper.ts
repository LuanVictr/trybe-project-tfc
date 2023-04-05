import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

class LeaderboardHelper {
  constructor(private matchesModel = Matches, private teamsModel = Teams) {}

  async getLeaderBoardHome(id:number) {
    const teamInfo = await this.teamsModel.findOne({ where: { id } });
    const matchInfo = await this.matchesModel.findAll({ where: { homeTeamId: id, inProgress: 0 } });
    return {
      name: teamInfo?.teamName,
      totalPoints: await this.calculatePoints(id),
      totalGames: matchInfo.length,
      totalVictories: await this.calculateVictories(id),
      totalDraws: await this.calculateDraws(id),
      totalLosses: await this.calculateLoses(id),
      goalsFavor: await this.calculateGoalsFavor(id),
      goalsOwn: await this.calculateGoalsOwn(id),
      goalsBalance: await this.calculateGoalsFavor(id) - await this.calculateGoalsOwn(id),
      efficiency: await this.calculateEfficiency(id),
    };
  }

  async calculateEfficiency(id:number):Promise<number> {
    const matchInfo = await this.matchesModel.findAll({ where: { homeTeamId: id, inProgress: 0 } });
    const totalPoints = await this.calculatePoints(id);
    const efficiency = (totalPoints / (matchInfo.length * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  async calculateGoalsFavor(id:number):Promise<number> {
    let goalsFavor = 0;
    const matchInfo = await this.matchesModel.findAll({ where: { homeTeamId: id, inProgress: 0 } });
    matchInfo.forEach((match) => { goalsFavor += match.homeTeamGoals; });
    return goalsFavor;
  }

  async calculateGoalsOwn(id:number):Promise<number> {
    let goalsOwn = 0;
    const matchInfo = await this.matchesModel.findAll({ where: { homeTeamId: id, inProgress: 0 } });
    matchInfo.forEach((match) => { goalsOwn += match.awayTeamGoals; });
    return goalsOwn;
  }

  async calculateVictories(id:number):Promise<number> {
    let totalVictories = 0;
    const result = await this.matchesModel.findAll({ where: { homeTeamId: id, inProgress: 0 } });
    result.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalVictories += 1;
      }
    });
    return totalVictories;
  }

  async calculateDraws(id:number):Promise<number> {
    let totalDraws = 0;
    const result = await this.matchesModel.findAll({ where: { homeTeamId: id, inProgress: 0 } });
    result.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        totalDraws += 1;
      }
    });
    return totalDraws;
  }

  async calculateLoses(id:number):Promise<number> {
    let totalLoses = 0;
    const result = await this.matchesModel.findAll({ where: { homeTeamId: id, inProgress: 0 } });
    result.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        totalLoses += 1;
      }
    });
    return totalLoses;
  }

  async calculatePoints(id:number):Promise<number> {
    const teamPoints = (await this.calculateVictories(id) * 3)
    + (await this.calculateDraws(id) * 1);

    return teamPoints;
  }
}

export default LeaderboardHelper;
