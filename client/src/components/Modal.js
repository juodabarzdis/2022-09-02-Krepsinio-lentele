import React, { useRef } from "react";
import "./Modal.css";
import convertDate from "../utils/Date";

const Modal = ({ showModal, setShowModal, data, gameData }) => {
  const modalRef = useRef(null);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  console.log(gameData);

  return (
    <>
      {showModal ? (
        <div className="modal-wrapper" ref={modalRef} onClick={closeModal}>
          <div className="modal">
            <div className="modal-left">
              <img src={data.logo} alt="" />
            </div>
            <div className="modal-right">
              <div
                onClick={() => setShowModal((prev) => !prev)}
                className="modal-exit"
              >
                X
              </div>
              <div className="modal-content">
                {gameData.map((game) => {
                  return (
                    <div className="game-card " key={game.id}>
                      <div className="game-date">
                        {convertDate(game.game_date)}
                      </div>
                      <div className="game-teams game-teams-modal">
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
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
