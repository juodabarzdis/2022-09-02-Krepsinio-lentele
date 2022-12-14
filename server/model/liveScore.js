import { DataTypes } from "sequelize";

const LiveScore = (sequelize) => {
  const Schema = {
    attacking_team_name: {
      type: DataTypes.STRING,
    },
    attack_score: {
      type: DataTypes.INTEGER,
    },
    attack_time: {
      type: DataTypes.STRING,
    },
  };
  return sequelize.define("LiveScore", Schema);
};

export default LiveScore;
