import { letters } from "./../assets/keyboard";
import { type usedKeys } from "./../hooks/useWordle";
function Keypad({ usedKeys }: { usedKeys: usedKeys }) {
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
