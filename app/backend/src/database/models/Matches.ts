import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  declare id:number;
  declare homeTeamId:number;
  declare homeTeamGoals:number;
  declare awayTeamId:number;
  declare awayTeamGoals:number;
  declare inProgress:boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_id',
    primaryKey: true,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'home_team_id', as: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'home_team_id', as: 'homeTeam' });

Matches.belongsTo(Teams, { foreignKey: 'away_team_id', as: 'awayTeam' });
Teams.hasMany(Matches, { foreignKey: 'away_team_id', as: 'awayTeam' });

export default Matches;
