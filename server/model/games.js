import { DataTypes } from "sequelize";

const Games = (sequelize) => {
  const Schema = {
    team_one_name: {
      type: DataTypes.STRING,
    },
    team_two_name: {
      type: DataTypes.STRING,
    },
    team_one_score: {
      type: DataTypes.INTEGER,
    },
    team_two_score: {
      type: DataTypes.INTEGER,
    },
    tournament: {
      type: DataTypes.STRING,
    },
    game_date: {
      type: DataTypes.DATE,
    },
    isLive: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  };
  return sequelize.define("Games", Schema);
};

export default Games;
