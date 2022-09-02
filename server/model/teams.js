import { DataTypes } from "sequelize";

const Teams = (sequelize) => {
  const Schema = {
    team_name: {
      type: DataTypes.STRING, //=VARCHAR(255)
      allowNull: true, // NOT NULL in SQL (standartine reiksme - true)
    },
    team_logo: {
      type: DataTypes.STRING, //=VARCHAR(255)
    },
    tournament: {
      type: DataTypes.STRING, //=VARCHAR(255)
    },
  };
  return sequelize.define("Teams", Schema);
};

export default Teams;
