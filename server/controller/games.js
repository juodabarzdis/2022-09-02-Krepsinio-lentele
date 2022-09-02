import express from "express";
import db from "../database/connect.js";
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

export default router;
