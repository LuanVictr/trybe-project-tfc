import LeaderboardHelper from '../utils/leaderBoardHelper';
import Matches from '../database/models/Matches';
/* import IMatches from '../interfaces/IMatches'; */
import Teams from '../database/models/Teams';
import LeaderboardHelperAway from '../utils/leaderBoardHelperAway';
import ISortedTeams from '../interfaces/ISortedTeams';

class LeaderboardServices {
  private leaderboardHelper = new LeaderboardHelper();
  private leaderboardHelperAway = new LeaderboardHelperAway();
  constructor(private teamsModel = Teams, private matchesModel = Matches) {}

  static sortArray(result:ISortedTeams[]) {
    return result.sort((b, a) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance === b.goalsBalance) {
          return a.goalsFavor - b.goalsFavor;
        } return a.goalsBalance - b.goalsBalance;
      } return a.totalPoints - b.totalPoints;
    });
  }

  public async createLeaderboard() {
    const teams = await this.teamsModel.findAll();
    const result = Promise.all(
      teams.map((team) => this.leaderboardHelper.getLeaderBoardHome(team.id)),
    );
    const response = await result;
    const resultSorted = LeaderboardServices.sortArray(response);
    return resultSorted;
  }

  public async createLeaderBoardAway() {
    const teams = await this.teamsModel.findAll();
    const result = Promise.all(
      teams.map((team) => this.leaderboardHelperAway.getLeaderBoardAway(team.id)),
    );
    const response = await result;
    const resultSort = LeaderboardServices.sortArray(response);
    return resultSort;
  }
}

export default LeaderboardServices;
