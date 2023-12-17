import React from "react";

type Guess = {
  key: string;
  color: "green" | "yellow" | "gray";
};
interface RowProps {
  guess?: Guess[];
  currentGuess?: string;
}
function Row({ guess, currentGuess }: RowProps) {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((l, i: number) => {
          return (
            <div className={l.color} key={i}>
              {l.key}
            </div>
          );
        })}
      </div>
    );
  }

  if (currentGuess) {
    const letters = currentGuess.split("");
    return (
      <div className="row current">
        {letters.map((letter: string, i: number) => {
          return (
            <div key={i} className="filled">
              {letter}
            </div>
          );
        })}
        {[...Array(5 - letters.length)].map((_, i) => {
          return <div key={i}></div>;
        })}
      </div>
    );
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Row;
