import { Sequelize } from "sequelize";
import Teams from "../model/teams.js";
import Games from "../model/games.js";
import LiveScore from "../model/liveScore.js";
import mysql from "mysql2/promise";

const database = {};

const credentials = {
  host: "localhost",
  user: "root",
  password: "",
  database: "Basketball",
};

try {
  const connection = await mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
  });

  // Create database
  await connection.query(
    "CREATE DATABASE IF NOT EXISTS " + credentials.database
  );

  // Use database
  const sequelize = new Sequelize(
    credentials.database,
    credentials.user,
    credentials.password,
    {
      dialect: "mysql",
    }
  );

  // Create table // per egza keiciam tik sita
  database.Teams = Teams(sequelize);
  database.Games = Games(sequelize);
  database.LiveScore = LiveScore(sequelize);

  database.Games.hasMany(database.LiveScore);

  // database.Games.belongsTo(database.LiveScore);

  await sequelize.sync({ alter: true });
} catch {
  console.log("Error connecting to database");
}

export default database;
