import React, { useEffect, useState, useParams } from "react";
import Axios from "axios";
import "./LiveScorePanel.css";
import convertDate from "./utils/Date";

const LiveScorePanel = () => {
  const [scores, setScores] = useState([]);
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    attacking_team_name: "",
    attack_score: "",
  });
  const [game, setGame] = useState({
    id: 0,
    team_one_name: "",
    team_two_name: "",
    team_one_score: 0,
    team_two_score: 0,
  });

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3000/api/livescore/")
      .then((res) => {
        setScores(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3000/api/games/")
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/api/livescore/", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   Axios.put("http://localhost:3000/api/games/" + game.id, formData)
  //     .then((res) => {
  //       // console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const onClick = (e) => {
    setGame({
      ...game,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formData);
  return (
    <div className="container">
      <div className="all-games">
        <h1>All Games</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Game Date</th>
              <th>Team One</th>
              <th>Team Two</th>
              <th>Team One Score</th>
              <th>Team Two Score</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => {
              return (
                <tr
                  key={game.id}
                  onClick={(e) =>
                    onClick(
                      setGame({
                        id: game.id,
                        team_one_name: game.team_one_name,
                        team_two_name: game.team_two_name,
                        team_one_score: game.team_one_score,
                        team_two_score: game.team_two_score,
                      })
                    )
                  }
                >
                  <td>{convertDate(game.game_date)}</td>
                  <td>{game.team_one_name}</td>
                  <td>{game.team_two_name}</td>
                  <td>{game.team_one_score}</td>
                  <td>{game.team_two_score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <h1>Live Score Panel</h1>
      </div>
      {game.id !== 0 ? (
        <div className="live-score">
          <form className="live-score-form" action="" onSubmit={handleSubmit}>
            <div>
              <input
                className="radio-input"
                id="team-one"
                type="radio"
                name="attacking_team_name"
                value={game.team_one_name}
                onChange={(e) => {
                  handleForm(e);
                }}
              />
              <label htmlFor="team-one" value={game.team_one_name}>
                {game.team_one_name}
              </label>
              <input
                className="radio-input"
                id="team-two"
                type="radio"
                name="attacking_team_name"
                value={game.team_two_name}
                onChange={(e) => {
                  handleForm(e);
                }}
              />
              <label htmlFor="team-two" value={game.team_two_name}>
                {game.team_two_name}
              </label>
            </div>
            <div>
              <input
                className="text-input"
                type="number"
                name="attack_score"
                onChange={(e) => {
                  handleForm(e);
                }}
              />
              <button>Submit</button>
            </div>
          </form>
        </div>
      ) : (
        <h2>Select game to start managing livescore</h2>
      )}

      {/* <div className="score-input">
        <div>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => handleForm(e)}
              name="attacking_team_name"
              type="text"
              placeholder="Team Name"
            />
            <input
              onChange={(e) => handleForm(e)}
              name="attack_score"
              type="number"
              placeholder="Attack score"
            />
            <button>Submit</button>
          </form>
        </div>
      </div> */}
      {/* 
      <div>

      </div> */}
      <div className="live-card">
        {scores &&
          scores.map((score) => {
            return (
              <div className="attack-row" key={score.id}>
                <div>
                  <h2>{score.attacking_team_name}</h2>
                </div>
                <div>
                  <h3>{score.attack_score}</h3>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LiveScorePanel;
