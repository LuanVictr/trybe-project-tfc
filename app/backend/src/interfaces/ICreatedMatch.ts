import ICreatedMatchInfo from './ICreatedMatchInfo';

interface ICreatedMatch extends ICreatedMatchInfo {
  id: number;
  inProgress:boolean;
}

export default ICreatedMatch;
