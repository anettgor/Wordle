import { useState } from "react";
import { wordList } from "./../assets/wordList";
import toast from "react-hot-toast";

export type Guess = {
  key: string;
  color: "green" | "yellow" | "gray";
};

export type usedKeys = {
  [key: string]: string;
};
const useWordle = () => {
  const generateSolution = (): string => {
    return wordList[Math.floor(Math.random() * wordList.length)];
  };

  const [turn, setTurn] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<Array<Guess[]> | undefined>([
    ...Array(6),
  ]);
  const [history, setHistory] = useState<Array<string>>([]);
  const [isCorrect, setIsCorect] = useState<boolean>(false);
  const [usedKeys, setUsedKeys] = useState<usedKeys>({ c: "gray" });
  const [solution, setSolution] = useState<string>(generateSolution());
  const [showModal, setShowModal] = useState(false);

  const formatGuess = () => {
    const solutionArray: Array<string | null> = [...solution];

    const formattedGuess: Guess[] = [...currentGuess].map((l: string) => {
      return {
        key: l,
        color: "gray",
      };
    });
    console.log(formattedGuess);
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
      }
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess: Array<Guess>) => {
    if (currentGuess === solution) {
      setIsCorect(true);
    }
    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => [...prevHistory, currentGuess]);
    setTurn((prevTurn) => prevTurn + 1);

    setUsedKeys((prev) => {
      const newKeys: usedKeys = { ...prev };
      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];

        if (l.color === "green") {
          newKeys[l.key] = "green";
          console.log(newKeys);
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if (
          l.color === "gray" &&
          currentColor !== "yellow" &&
          currentColor !== "green"
        ) {
          newKeys[l.key] = "gray";
          return;
        }
      });
      return newKeys;
    });
    setCurrentGuess("");
  };

  const handleKeyup = ({ key }: { key: string }) => {
    if (key === "Enter") {
      if (turn > 5) {
        toast.error("Submitted all guesses");

        const formatted = formatGuess();
        addNewGuess(formatted);
        return;
      }
      if (history.includes(currentGuess)) {
        toast.error("you already tried that word");

        return;
      }
      if (currentGuess.length < 5) {
        toast.error("word must be 5 characters long");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };
  console.log(solution);
  const resetGame = () => {
    setTurn(0);
    setCurrentGuess("");
    setGuesses([...Array(6)]);
    setHistory([]);
    setIsCorect(false);
    setUsedKeys({});
    setShowModal(false);
    setSolution(generateSolution());
  };

  return {
    solution,
    turn,
    currentGuess,
    guesses,
    isCorrect,
    handleKeyup,
    usedKeys,
    resetGame,
    showModal,
    setShowModal,
  };
};

export default useWordle;
