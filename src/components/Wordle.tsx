import { useEffect } from "react";
import useWordle from "./../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
import { Toaster } from "react-hot-toast";

function Wordle() {
  const {
    solution,
    currentGuess,
    handleKeyup,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    resetGame,
    setShowModal,
    showModal,
  } = useWordle();

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect || (!isCorrect && turn > 5)) {
      window.removeEventListener("keyup", handleKeyup);
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn, setShowModal]);

  return (
    <div>
      <Toaster position="top-right" />
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          resetGame={resetGame}
        />
      )}
    </div>
  );
}

export default Wordle;
