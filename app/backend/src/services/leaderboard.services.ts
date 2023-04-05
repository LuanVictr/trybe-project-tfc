import LeaderboardHelper from '../utils/leaderBoardHelper';
import Matches from '../database/models/Matches';
/* import IMatches from '../interfaces/IMatches'; */
import Teams from '../database/models/Teams';

class LeaderboardServices {
  private leaderboardHelper = new LeaderboardHelper();
  constructor(private teamsModel = Teams, private matchesModel = Matches) {}

  public async createLeaderboard() {
    const teams = await this.teamsModel.findAll();
    const result = Promise.all(
      teams.map((team) => this.leaderboardHelper.getLeaderBoardHome(team.id)),
    );
    const resultSorted = (await result).sort((b, a) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance === b.goalsBalance) {
          return a.goalsFavor - b.goalsFavor;
        } return a.goalsBalance - b.goalsBalance;
      } return a.totalPoints - b.totalPoints;
    });
    return resultSorted;
  }
}

export default LeaderboardServices;
