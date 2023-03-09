import { useState, useContext, useEffect } from "react";
import {SocketContext} from "../context/socketContext";

function ChooseWordModal(props) {

  const socket = useContext(SocketContext);

  const [hideModal, setHideModal] = useState(false);
  const [words, setWords] = useState([]);

  useEffect(() => {
    socket.on("wordChosenResponse", handleWordChosenResponse)
    socket.on("getWordsResponse", (data) => setWords(data))
  }, [socket])
  
  useEffect(() => {
    if(props.isCurrentPlayer) {
      socket.emit("getWords");
    } 
  }, [props.chooseWord, props.isCurrentPlayer])

  function handleWordChosenResponse(word) {
    props.setWord(word);
    props.setRoundInProgress(true)
    setHideModal(true);
    setTimeout(() => {
      props.setChooseWord(false);
    }, 300);
  }

  return (
    <div className={`game-modal ${props.chooseWord ? "" : "hidden"}`}>

      {/* shown to player who is choosing a word */}
      <div className={`game-modal__body ${hideModal ? "hide-modal" : ""} ${props.isCurrentPlayer ? "" : "hidden"}`}>
        <p className="text--medium">Its your turn!<br/>Choose a word</p>
        <div className="game-modal__body-words">

          {words.map(option => (
            <span 
              key={option.word}
              id={option.word.toLowerCase()}
              onClick={(e) => socket.emit("wordChosen", e.target.id)} 
              className="word-option text--green">
                {option.word.toLowerCase()}
            </span>
          ))}
        </div>
        <button onClick={() => socket.emit("getWords")} className="home-btn">More words</button>
      </div>
      {/* Shown to player who is guessing  */}
      <div className={`game-modal__body ${hideModal ? "hide-modal" : ""} ${props.isCurrentPlayer ? "hidden" : ""}`}>
        <img className="player-avatar" src={props.currentPlayer.avatarUrl}></img>
        <p className="game-modal__body-heading">{`${props.currentPlayer.username} is choosing a word`}</p>
      </div>
    </div>
  )
}


export default ChooseWordModal;