import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id:number;
  declare teamName:string;
}

Teams.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: {
    field: 'team_name',
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'teams',
  underscored: true,
});

export default Teams;
