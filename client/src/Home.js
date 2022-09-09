import "./App.css";
import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Modal from "./components/Modal";
import convertDate from "./utils/Date";
import LiveGif from "./images/live.gif";
import MainContext from "./MainContext";

function Home() {
  const { contextRefresh } = useContext(MainContext);
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
  });
  const [games, setGames] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [gameData, setGameData] = useState([]);
  const [scores, setScores] = useState([]);
  const [liveGames, setLiveGames] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/api/teams/")
      .then((res) => {
        setTeams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    if (showModal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [showModal]);

  useEffect(() => {
    Axios.get("http://localhost:3000/api/games/upcoming")
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Modal Data
  useEffect(() => {
    if (teamName === "") return;

    Axios.get("http://localhost:3000/api/games/team/" + teamName)
      .then((res) => {
        setGameData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [teamName]);

  function lastWord(words) {
    let n = words.replace(/[\[\]?.,\/#!$%\^&\*;:{}=\\|_~()]/g, "").split(" ");
    return n[n.length - 1];
  }

  useEffect(() => {
    setInterval(() => {
      Axios.get("http://localhost:3000/api/livescore/")
        .then((res) => {
          setScores(res.data.games);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
  }, [contextRefresh]);

  useEffect(() => {
    setInterval(() => {
      Axios.get("http://localhost:3000/api/games/live")
        .then((res) => {
          setLiveGames(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
  }, [contextRefresh]);

  console.log(contextRefresh);

  return (
    <div className="App">
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          data={modalData}
          gameData={gameData}
        />
      )}
      <div className="teams-container">
        {teams.map((team) => {
          return (
            <div
              className="team-card"
              key={team.id}
              onClick={() => {
                setTeamName(lastWord(team.team_name));
                setModalData({
                  team_name: team.team_name,
                  logo: team.team_logo,
                });
                openModal();
              }}
            >
              <img className="team-logo" src={team.team_logo} alt="team logo" />
              <h1>{team.team_name}</h1>
            </div>
          );
        })}
      </div>
      <div className="games-container">
        {games.map((game) => {
          return (
            <div className="game-card" key={game.id}>
              <div className="game-date">{convertDate(game.game_date)}</div>
              <div className="upcoming-games">
                <div className="game-teams">
                  <h2>{game.team_one_name}</h2>
                  <h3>{game.team_one_score}</h3>
                </div>
                <div className="game-teams">
                  <h2>{game.team_two_name}</h2>
                  <h3>{game.team_two_score}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="live-score-container">
        <div className="live-games">
          {liveGames.map((game) => {
            return (
              <div className="live-game-card" key={game.id}>
                <div className="live-game-top">
                  <div className="game-live-logo">
                    <img src={LiveGif} alt="" />
                  </div>

                  <div className="game-teams">
                    <h2>{game.team_one_name}</h2>
                    <h3>{game.team_one_score}</h3>
                  </div>
                  <div className="game-teams">
                    <h2>{game.team_two_name}</h2>
                    <h3>{game.team_two_score}</h3>
                  </div>
                </div>

                <div className="live-score">
                  <div>
                    <h1>Live Score</h1>
                  </div>

                  {scores
                    .slice(0)
                    .reverse()
                    .map((score, index) => {
                      return (
                        index < 12 &&
                        game.id === score.GameId && (
                          <div className="score" key={score.id}>
                            <div>
                              [{score.attack_time}], {score.attacking_team_name}
                              , {score.attack_score}
                            </div>
                          </div>
                        )
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
