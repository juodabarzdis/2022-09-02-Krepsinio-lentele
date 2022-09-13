import { useEffect, useState, useRef } from "react";
import "./App.css";
import Axios from "axios";
import Modal from "./components/Modal";
import convertDate from "./utils/Date";
import LiveGif from "./images/live.gif";
import { BsArrowRightSquare } from "react-icons/bs";
import { BsArrowLeftSquare } from "react-icons/bs";
import Slideshow from "./components/Slideshow";

const Home = () => {
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
  const [endedGames, setEndedGames] = useState([]);
  const containerRef = useRef(null);

  const scroll = (scrollOffset) => {
    containerRef.current.scrollLeft += scrollOffset;
  };

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

  useEffect(() => {
    Axios.get("http://localhost:3000/api/games/ended")
      .then((res) => {
        setEndedGames(res.data);
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
    // eslint-disable-next-line
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
    }, 5000);
  }, []);

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
  }, []);

  const containerStyles = {
    width: "100%",
    height: "480px",
    margin: "0 auto",
  };

  return (
    <div className="App">
      <div style={containerStyles}>
        <Slideshow />
      </div>

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
      <div className="scroll-container">
        <div>
          <button className="scroll-btn" onClick={() => scroll(-250)}>
            <BsArrowLeftSquare />
          </button>
        </div>
        <div className="games-container" ref={containerRef}>
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
        <div>
          <button className="scroll-btn" onClick={() => scroll(250)}>
            <BsArrowRightSquare />
          </button>
        </div>
      </div>

      <div className="scroll-container finished">
        {/* <div>
          <button className="scroll-btn" onClick={() => scroll(-100)}>
            <BsArrowLeftSquare />
          </button>
        </div> */}
        <div className="games-container">
          {endedGames.map((game) => {
            return (
              <div className="game-card ended" key={game.id}>
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
        {/* <div>
          <button className="scroll-btn" onClick={() => scroll(100)}>
            <BsArrowRightSquare />
          </button>
        </div> */}
      </div>

      <div className="live-score-container">
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
                      index < 10 &&
                      game.id === score.GameId && (
                        <div className="score" key={score.id}>
                          [{score.attack_time}], {score.attacking_team_name},{" "}
                          {score.attack_score}
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
  );
};

export default Home;
