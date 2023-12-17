import React from "react";
import { letters } from "./../assets/keyboard";
function Keypad({ usedKeys }) {
  return (
    <div className="keypad">
      {letters &&
        letters.map((letter) => {
          const color = usedKeys[letter.key];

          return (
            <div key={letter.key} className={color}>
              {letter.key}
            </div>
          );
        })}
    </div>
  );
}

export default Keypad;
