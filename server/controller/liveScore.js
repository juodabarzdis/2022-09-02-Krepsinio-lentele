import express from "express";

import db from "../database/connect.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const games = await db.LiveScore.findAll();
    res.json({ games });
  } catch (error) {
    res.status(500).send("Ivyko klaida");
  }
});

router.get("/:gameId", async (req, res) => {
  try {
    const games = await db.LiveScore.findAll({
      include: db.Games,
      where: {
        gameId: req.params.gameId,
      },
    });

    const gameInfo = await db.Games.findByPk(req.params.gameId, {
      attributes: ["team_one_score", "team_two_score"],
    });

    res.json({
      games,
      sum1: gameInfo.team_one_score,
      sum2: gameInfo.team_two_score,
    });
  } catch (error) {
    res.status(500).send("Ivyko klaida");
  }
});

router.post("/", async (req, res) => {
  try {
    await db.LiveScore.create(req.body);
    const game = await db.Games.findByPk(req.body.GameId);

    const column_name =
      req.body.attacking_team_name === game.team_one_name
        ? "team_one_score"
        : "team_two_score";

    await game.update({
      [column_name]: +game[column_name] + +req.body.attack_score,
    });
    res.send("Attack added");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida");
  }
});

export default router;
