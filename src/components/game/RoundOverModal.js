import {useEffect, useState} from "react";

function RoundOverModal(props) {

  const [modalHidden, setModalHidden] = useState(false);
  const [sortedPlayers, setSortedPlayers] = useState([]);
  
  useEffect(() => {
    setSortedPlayers(props.players.sort((a, b) => b.score - a.score))
  }, [props.roundInProgress])

  return (
    <div className={`game-modal ${props.roundInProgress ? "hidden" : ""}`}>

      <div className={`game-modal__body round-over-modal-body`}>
        <p className="text--medium">{props.gameOver ? "Game over!" : "Round over!"}</p>
        <p className={props.isCurrentPlayer ? "hidden" : ""}>The word was:</p>
        <p className={`text--green ${props.isCurrentPlayer ? "hidden" : ""}`}>{props.word}</p>
        <div className="game-modal__body-standings">

          {sortedPlayers.map((player, index) => (
            <div key={index} className="standings-player">
              <img className={`standings-player__avatar ${player.winner ? "winner" : ""}`} src={player.avatarUrl}></img>
              <span className="standings-player__name">{player.username}</span>
              <span className="standings-player__score">{`${player.score} pts`}</span>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}


export default RoundOverModal;