import { useState, useContext, useEffect } from "react";
import {SocketContext} from "../context/socketContext"


function MobileKeyboard(props) {

  const socket = useContext(SocketContext);

  const word = "how to train your dragon"

  const [guess, setGuess] = useState([]);
  const [keyboardRows, setKeyboardRows] = useState([
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m", "backspace"],
    ["hint-key", ",", "space", "-", "enter"]
  ]);
  const [keyPressed, setKeyPressed] = useState("");
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setGuess([]);
  }, [props.gameInProgress])


  function handleKeyboardPress(e) {
    const key = e.target.id
    setKeyPressed(key);
    setTimeout(() => {
      setKeyPressed("");
    }, 100);
    switch (key) {
      case "space":
        if(showHint) return;
        setGuess(prev => [...prev, " "]);
        break;
      case "backspace":
        setGuess(prev => {
          prev.pop();
          return prev;
        }) 
        break
      case "enter":
        socket.emit("newGuess", guess.join(""))
        setGuess([])
        break
      case "hint-key":
        // setShowHint(prev =>  {
        //   setGuess([]);
        //   return  prev ? false : true
        // })
        break
      default:
        setGuess(prev => {
          prev.push(e.target.id)
          return prev;
        })
        break;
    }
  }



  return (
    <div className={`keyboard ${props.isMobile && !props.isCurrentPlayer ? "" : "hidden"}`}>
      <p className={`guess ${showHint ? "hidden" : ""}`}>{guess.join("")}</p>

      <div className={`hint ${showHint ? "" : "hidden"}`}>
        {word.split(" ").map((word, wordIndex) => (
          <div key={wordIndex} className="hint__word">
          {word.split("").map((letter, letterIndex) => ( 
            <div className="blank-section" key={letterIndex}>
              <span>{guess[(wordIndex === 0 ? wordIndex : wordIndex - 1) + letterIndex]}</span>
              <div className="blank-underline"></div>
            </div>
          ))}
          </div>
        ))}
      </div>

      {keyboardRows.map((row, index) => (
        <div key={index} className="keyboard__row">
          {row.map((key, index) => (
            <span 
              id={key}
              onClick={handleKeyboardPress}
              key={index} 
              className={`keyboard__row-key ${key} ${keyPressed === key ? "key-pressed" : ""}`}>
                {key.length > 1 ? "" : key}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MobileKeyboard;