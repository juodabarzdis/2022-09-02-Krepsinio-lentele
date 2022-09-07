import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "./components/Modal";
import convertDate from "./utils/Date";
import Nav from "./Nav";

function Home() {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
  });
  const [games, setGames] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [gameData, setGameData] = useState([]);

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
    Axios.get("http://localhost:3000/api/games/")
      .then((res) => {
        //console.log(res.data);
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
        console.log(res.data);
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

  return (
    <div className="App">
      <Nav />
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
              <div className="game-teams">
                <div className="team-game">
                  <h2>{game.team_one_name}</h2>
                  <h3>{game.team_one_score}</h3>
                </div>
                <div className="team-game">
                  <h2>{game.team_two_name}</h2>
                  <h3>{game.team_two_score}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
