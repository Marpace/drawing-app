import {SocketContext} from "../context/socketContext";
import {useState, useContext, useEffect} from "react";

function MobileGuess() {

  const socket = useContext(SocketContext)

  const [guessShownIndex, setGuessShownIndex] = useState(0);
  const [guesses, setGuesses] = useState([]);


  useEffect(() => {
    socket.on("newGuessResponse", handleNewGuessResponse)
  }, [socket])

  useEffect(() => {
    if(guesses.length > 0) showGuess();
  }, [guesses])

  function handleNewGuessResponse(data) {
    setGuesses(prev => [...prev, data])
  }

  function showGuess() {
    // if(guessShownIndex === (guesses.length - 1)) {
    //   setGuessShownIndex(guesses.length);
    // }
    // else {
    //   setTimeout(() => {
    //     setGuessShownIndex(guesses.length - 1)
    //   }, (guesses.length - (guessShownIndex + 1)) * 1500 );
    // }
    setTimeout(() => {
      setGuessShownIndex(guesses.length - 1)
    }, (guesses.length - (guessShownIndex + 1)) * 1500 );
  }

  return (
    <div className={`mobile-guesses ${props.isMobile ? "" : "hidden"}`}>
      {guesses.map((guess, index) => (
        <span 
          key={index}
          className={`mobile-guesses__item ${guess.guessedCorrectly ? "correct-guess" : ""} ${index === guessShownIndex ? "show-guess" : ""}` }>
          {guess.guessedCorrectly ? `${guess.author} guessed correctly!` : `${guess.author}: ${guess.content}`}
        </span>
      ))}
    </div>
  )
}



export default MobileGuess;