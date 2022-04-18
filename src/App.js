import React, { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import Confetti from "react-confetti";
const defaultTitle = "Tenzies";
const defaultDescription = "Roll until all dice are the same. Click each die to freeze it at its current value between rolls.";

function App() {
  const [count, setCount] = useState(0);
  const [tenzies, setTenzies] = useState(false);
  const [gameTitle, setGameTitle] = useState(defaultTitle);
  const [gameDescription, setGameDescription] = useState(defaultDescription);

  /**
   * Generate an array of 10 numbers between 1 and 6, including both these values
   * @returns Array of 10 random numbers between 1 and 6
   */
  const generateDice = () => {
    const newDice = [];
    for (let index = 0; index < 10; index++) {
      let dieNum = Math.floor(Math.random() * 6) + 1;
      newDice.push({id: index, value : dieNum, isHeld: false});
    }
    return newDice;
  }
  const [dice, setDice] = useState(generateDice());
  
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
        setTenzies(true);
        setGameTitle("You Win!");
        setGameDescription(`You won the game in ${count} tries!`);
    }
  }, [dice])

  /**
   * Toggle the state of the isHeld property of the individual die face
   * @param id Integer value denoting the current clicked die face
   */
  const toggleHeldDice = (id) => {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} : die
      })
    )
  }
  
  /**
   * Create the die faces with all the required props being passed
   */
  const diceFaces = dice.map((die) => 
    <Die key={die.id} toggleHeldDice={() => toggleHeldDice(die.id)} value={die.value} isHeld={die.isHeld}/>
  )

  /**
   * Reset the game state, to start a new game.
   */
  function resetGame() {
    setCount(0);
    setGameTitle(defaultTitle);
    setGameDescription(defaultDescription);
    setTenzies(false);
    setDice(generateDice());
  }

  /**
   * Randomizes the numbers which are not held.
   * Called after the user wins, to reset the board.
   */
  const rollDice = () => {
    if(tenzies){
      resetGame();
      return;
    }

    let copyDice = [...dice];
    for (let index = 0; index < copyDice.length; index++) {
      let currentDie = copyDice[index];
      if(!currentDie.isHeld){
        currentDie.value = Math.floor(Math.random() * 6) + 1;
      }
      
    }
    setDice(copyDice);
    setCount(prevCount =>  prevCount + 1);
  }
  

  return (
    <div className="main">
      {/* <div className="player-select">
        <button className="roll-button">P1</button>
        <button className="roll-button">P2</button>
      </div> */}
      { tenzies && <Confetti className="canvas" />}
      <h1 className="title">{ gameTitle }</h1>
      <p className="instructions">{ gameDescription }</p>
      <div className="dice-container">
          {diceFaces}
      </div>
      <button className="roll-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll Dice"}
      </button>
    </div>
  );
}

export default App;
