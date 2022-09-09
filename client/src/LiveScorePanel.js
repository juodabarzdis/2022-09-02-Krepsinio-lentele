import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import "./LiveScorePanel.css";
import convertDate from "./utils/Date";
import MainContext from "./MainContext";

const LiveScorePanel = () => {
  const { contextRefresh, setContextRefresh } = useContext(MainContext);
  const [scores, setScores] = useState([]);
  const [games, setGames] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [sum, setSum] = useState({
    sum1: 0,
    sum2: 0,
  });
  const [formData, setFormData] = useState({
    GameId: 0,
    attacking_team_name: "",
    attack_score: "",
    attack_time: "",
  });
  const [game, setGame] = useState({
    id: 0,
    team_one_name: "",
    team_two_name: "",
    team_one_score: 0,
    team_two_score: 0,
    isLive: 0,
  });

  const handleForm = (e) => {
    setFormData({
      ...formData,
      GameId: game.id,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    game.id !== 0 &&
      Axios.get("http://localhost:3000/api/livescore/" + game.id)
        .then((res) => {
          setScores(res.data.games);
          setSum({
            sum1: res.data.sum1,
            sum2: res.data.sum2,
          });

          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [refresh, game]);

  useEffect(() => {
    Axios.get("http://localhost:3000/api/games/")
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sum, refresh]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/api/livescore/", formData)
      .then((res) => {
        setRefresh(!refresh);
        setContextRefresh(!contextRefresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(contextRefresh);

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
                  onClick={(e) => {
                    Axios.put("http://localhost:3000/api/games/" + game.id, {
                      isLive: 1,
                    });
                    setGame({
                      ...game,
                      id: game.id,
                      team_one_name: game.team_one_name,
                      team_two_name: game.team_two_name,
                      team_one_score: game.team_one_score,
                      team_two_score: game.team_two_score,
                      isLive: 1,
                    });
                    setRefresh(!refresh);
                  }}
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

      <section className="score-control">
        <div className="section-title">
          <h1>Live Score Panel</h1>
        </div>

        <div className="live-wrapper">
          <div className="live-left">
            {game.id !== 0 ? (
              <div className="live-score">
                <div className="live-total-score">
                  {/* <div>{game.team_one_score}</div>
            <div>{game.team_two_score}</div> */}
                  <div>{sum.sum1}</div>
                  <div>{sum.sum2}</div>
                </div>

                <form
                  className="live-score-form"
                  action=""
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
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
                      type="text"
                      name="attack_time"
                      onChange={handleForm}
                    />
                  </div>

                  <div>
                    <input
                      id="1-point"
                      className="radio-input"
                      type="radio"
                      name="attack_score"
                      value="1"
                      onChange={(e) => {
                        handleForm(e);
                      }}
                    />
                    <label htmlFor="1-point" value="1">
                      1
                    </label>
                    <input
                      id="2-points"
                      className="radio-input"
                      type="radio"
                      name="attack_score"
                      value="2"
                      onChange={(e) => {
                        handleForm(e);
                      }}
                    />{" "}
                    <label htmlFor="2-points" value="2">
                      2
                    </label>
                    <input
                      id="3-points"
                      className="radio-input"
                      type="radio"
                      name="attack_score"
                      value="3"
                      onChange={(e) => {
                        handleForm(e);
                      }}
                    />
                    <label htmlFor="3-points" value="3">
                      3
                    </label>
                  </div>
                  <div>
                    <button>Submit</button>
                    <button
                      className="finish-btn"
                      onClick={(e) => {
                        Axios.put(
                          "http://localhost:3000/api/games/" + game.id,
                          {
                            isLive: 0,
                          }
                        );
                        setGame({
                          ...game,
                          isLive: 0,
                        });
                      }}
                    >
                      Finish Game
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="start-game">
                <h2>Select game to start managing livescore.</h2>
              </div>
            )}
          </div>
          <div className="live-right">
            <div className="live-card">
              {scores &&
                scores
                  .slice(0)
                  .reverse()
                  .map((score) => {
                    return (
                      <div className="attack-row" key={score.id}>
                        <div>
                          <h2>
                            [{score.attack_time}] {score.attacking_team_name} is
                            attacking and score {score.attack_score} points.
                          </h2>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveScorePanel;
