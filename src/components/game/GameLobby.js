import { useContext, useEffect, useState } from "react";
import {SocketContext} from "../context/socketContext";
import LobbyPlayer from "./LobbyPlayer";

function GameLobby(props) {

  const socket = useContext(SocketContext);

  const [playerIsReady, setPlayerIsReady] = useState(false);


  function handleReadyClick() {
    socket.emit("playerReady", props.avatarUrl)
    setPlayerIsReady(true);
  }

  useEffect(() => {
    if(!props.gameStarted) setPlayerIsReady(false);
  }, [props.gameStarted])

  useEffect(() => {
    socket.on("createGameResponse", handleCreateGameResponse)
    socket.on("playerReadyResponse", (data) => props.setPlayers(data))
  }, [socket])

  function handleCreateGameResponse(players) {
    props.setPlayers(players);
  }

  return (
    <div className={`game-lobby ${props.gameStarted ? "hidden" : ""}`}>
      <p className="lobby-text">Waiting for players...</p>
      <div className="lobby-players">
        {props.players.map( player => (
          <LobbyPlayer 
            key={player.playerId}
            player={player}
          />
        ))}
      <p className={`lobby-message ${props.players.length <= 1 ? "" : "hidden"}`}>{props.lobbyMessage}</p>
      </div> 
      <p className={`game-code-info ${!props.isAdmin ? "hidden" : ""}`}>Share this game code with other players:</p>
      <p className={`game-code ${!props.isAdmin ? "hidden" : ""}`}>{props.roomCode}</p>
      <p className={`lobby-text ${!props.isAdmin ? "hidden" : ""}`}>Choose drawing time</p>
      <div className={`drawing-time ${!props.isAdmin ? "hidden" : ""}`}>
        <span 
          onClick={() => props.setRoundDuration("30s")}
          className={`drawing-time__option ${props.roundDuration === "30s" ? "text--green" : ""}`}>
          30 seconds
        </span>
        <span 
          onClick={() => props.setRoundDuration("60s")}
          className={`drawing-time__option ${props.roundDuration === "60s" ? "text--green" : ""}`}>
          1 minute
        </span>
        <span 
          onClick={() => props.setRoundDuration("90s")}
          className={`drawing-time__option ${props.roundDuration === "90s" ? "text--green" : ""}`}>
          1 ½ minute
        </span>
        <span 
          onClick={() => props.setRoundDuration("120s")}
          className={`drawing-time__option ${props.roundDuration === "120s" ? "text--green" : ""}`}>
          2 minutes
        </span>
      </div>
      <button 
        onClick={() => socket.emit("startGame", props.roundDuration)} 
        className={`lobby-btn ${!props.isAdmin ? "hidden" : ""}`}>
        Start game
      </button>
      <button 
        onClick={handleReadyClick} 
        className={`lobby-btn ${!props.isAdmin && !playerIsReady ? "" : "hidden"}`}>
        Ready
      </button>
    </div>
  )
}

export default GameLobby;