import express from "express";
import teams from "./controller/teams.js";
import games from "./controller/games.js";
import livescore from "./controller/liveScore.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.set("trust proxy", 1); // trust first proxy if 0 then it will not trust any proxy

// app.use(
//   session({
//     name: "session",
//     secret: "1234",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false, // only send cookie over https if true
//       maxAge: 6000000,
//     },
//   })
// );

app.use("/api/teams/", teams);
app.use("/api/games/", games);
app.use("/api/livescore/", livescore);
app.use("/uploads", express.static("uploads"));

app.listen(3000);
