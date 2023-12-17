import React from "react";

function Modal({
  isCorrect,
  turn,
  solution,
  resetGame,
}: {
  isCorrect: boolean;
  turn: number;
  solution: string;
  resetGame: () => void;
}) {
  return (
    <div className="modal">
      {isCorrect && (
        <div className="modal-text">
          <h1>Congrats! 🎉</h1>

          <p>
            Solution: <span className="modal-solution">{solution}</span>{" "}
          </p>

          <p>You found it in {turn} turns</p>

          <button onClick={resetGame} className="reset-button">
            Reset game
          </button>
        </div>
      )}

      {!isCorrect && (
        <div className="modal-text">
          <h1>You lost! 🙁</h1>

          <p>
            Solution: <span className="modal-solution">{solution}</span>{" "}
          </p>

          <p>No worries! Better luck next time! 🍀</p>

          <button onClick={resetGame} className="reset-button">
            Reset game
          </button>
        </div>
      )}
    </div>
  );
}

export default Modal;
