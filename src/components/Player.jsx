import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = "";
  }

  function keyPress(e) {
    if (e.key == "Enter") {
      setEnteredPlayerName(playerName.current.value);
      playerName.current.value = "";
    }
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input
          ref={playerName}
          placeholder="Insert your name"
          type="text"
          onKeyDown={keyPress}
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
