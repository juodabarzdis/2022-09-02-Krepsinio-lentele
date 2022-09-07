// import express from "express";
// import db from "../database/connect.js";
// import { Op } from "sequelize";

// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const games = await db.LiveScore.findAll();
//     res.json(games);
//   } catch (error) {
//     res.status(500).send("Ivyko klaida");
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     new db.LiveScore(req.body).save();
//     res.send("Attack added");
//   } catch {
//     res.status(500).send("Ivyko klaida");
//   }
// });

// router.get("/:gameid", async (req, res) => {
//   try {
//     const games = await db.LiveScore.findByPk(req.params.id, {
//       include: db.Games,
//     });
//     res.json(games);
//   } catch (error) {
//     res.status(500).send("Ivyko klaida");
//   }
// });

// export default router;

//

import express from "express";

import db from "../database/connect.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await db.LiveScore.create(req.body);
    res.send("Attack added");
  } catch (error) {
    console.log("error");
    res.status(500).send("Įvyko klaida");
  }
});

export default router;
