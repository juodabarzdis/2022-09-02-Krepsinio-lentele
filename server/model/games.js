import { DataTypes } from "sequelize";

const Games = (sequelize) => {
  const Schema = {
    team_one_name: {
      type: DataTypes.STRING, //=VARCHAR(255)
    },
    team_two_name: {
      type: DataTypes.STRING, //=VARCHAR(255)
    },
    team_one_score: {
      type: DataTypes.INTEGER, //=VARCHAR(255)
    },
    team_two_score: {
      type: DataTypes.INTEGER, //=VARCHAR(255)
    },
    tournament: {
      type: DataTypes.STRING, //=VARCHAR(255)
    },
    game_date: {
      type: DataTypes.DATE, //=VARCHAR(255)
    },
  };
  return sequelize.define("Games", Schema);
};

export default Games;
