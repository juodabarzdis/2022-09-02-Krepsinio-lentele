import express from "express";
import db from "../database/connect.js";
import upload from "../middleware/multer.js";
// import { auth } from "../middleware/auth.js";

const router = express.Router();

// get all posts with validation
router.get("/", async (req, res) => {
  try {
    const teams = await db.Teams.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).send("Ivyko klaida");
    //  res.sendStatus(500)
  }
});

router.post("/teams", upload.single("team_logo"), async (req, res) => {
  console.log(req.file);
  if (req.file) {
    req.body.team_logo = "/uploads/" + req.file.filename;
  }
  try {
    console.log(req.body);
    new db.Teams(req.body).save();
    res.send("New team added");
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const book = await db.Books.findByPk(req.params.id);
//     res.json(book);
//   } catch {
//     res.status(500).send("Ivyko klaida");
//   }
// });

// router.put("/edit/:id", auth, async (req, res) => {
//   try {
//     const book = await db.Books.findByPk(req.params.id);
//     book.update(req.body);
//     res.send("Irasas sekmingai atnaujintas");
//   } catch {
//     res.status(500).send("Ivyko klaida");
//   }
// });

// router.delete("/delete/:id", auth, async (req, res) => {
//   try {
//     const book = await db.Books.findByPk(req.params.id);
//     book.destroy(req.body);
//     res.send("Knyga sekmingai istrinta");
//   } catch {
//     res.status(500).send("Ivyko klaida");
//   }
// });

// CRUD - Create, read, update, delete
//        POST    GET   PUT     DELETE

export default router;
