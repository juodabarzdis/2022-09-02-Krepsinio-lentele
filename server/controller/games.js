import express from "express";
import db from "../database/connect.js";
import { Op } from "sequelize";
// import { auth } from "../middleware/auth.js";

const router = express.Router();

// get all posts with validation
router.get("/", async (req, res) => {
  try {
    const games = await db.Games.findAll();
    res.json(games);
  } catch (error) {
    res.status(500).send("Ivyko klaida");
    //  res.sendStatus(500)
  }
});

router.get("/team/:team", async (req, res) => {
  console.log(req);
  try {
    const games = await db.Games.findAll({
      where: {
        [Op.or]: [
          {
            team_one_name: {
              [Op.like]: "%" + req.params.team + "%",
            },
          },
          {
            team_two_name: {
              [Op.like]: "%" + req.params.team + "%",
            },
          },
        ],
      },
    });
    res.json(games);
    console.log(games);
  } catch (error) {
    res.status(500).send("Ivyko klaida");
    //  res.sendStatus(500)
  }
});

router.get("/:id", async (req, res) => {
  try {
    const game = await db.Games.findByPk(req.params.id);
    res.json(game);
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

router.post("/", async (req, res) => {
  try {
    new db.Games(req.body).save();
    res.send("New game added");
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const game = await db.Games.findByPk(req.params.id);
    await game.update(req.body);
    res.send("Game updated");
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

export default router;
