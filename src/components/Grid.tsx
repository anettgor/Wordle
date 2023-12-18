import Row from "./Row";
import { type Guess } from "./../hooks/useWordle";

function Grid({
  currentGuess,
  turn,
  guesses,
}: {
  currentGuess: string;
  turn: number;
  guesses: Array<Guess[]> | undefined;
}) {
  return (
    <div>
      {guesses &&
        guesses.map((g, i) => {
          if (turn === i) {
            return <Row key={i} currentGuess={currentGuess}></Row>;
          }
          return <Row key={i} guess={g} />;
        })}
    </div>
  );
}

export default Grid;
