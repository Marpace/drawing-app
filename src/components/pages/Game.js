import { useContext, useEffect, useState } from "react";
import {SocketContext} from "../context/socketContext";
import GameLobby from "../game/GameLobby";
import GameInProgress from "../game/GameInProgress";
import { useNavigate } from "react-router-dom";


function Game(props) {

  const navigate = useNavigate();

  const socket = useContext(SocketContext); 
  const [isCurrentPlayer, setIsCurrentPlayer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [chooseWord, setChooseWord] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [roundDuration, setRoundDuration] = useState("60s");
  const [players, setPlayers] = useState([]);
  const [roundInProgress, setRoundInProgress] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    window.onbeforeunload = () => {
      return true;
    }


    if(props.createGame) {
      socket.emit("createGame", {
        username: props.username, 
        avatarUrl: props.avatarUrl
      })
    } 
    if(props.joinGame) {
      socket.emit("joinGame", {
        username: props.username,
        avatarUrl: props.avatarUrl,
        code: props.code
      })
    }
    socket.on("startGameResponse", handleStartGameResponse)
    socket.on("currentPlayer", () => setIsCurrentPlayer(true))
    socket.on("joinGameResponse", (data) => setPlayers(data))
    socket.on("roundOver", handleRoundOver)
    socket.on("gameOver", handleGameOver)
  }, [socket])

  useEffect(() => {
    if(!props.username) navigate("/")
  }, [props.username])

  function handleGameOver(data) {
    setPlayers(data)
    setGameStarted(false)
  }

  function handleStartGameResponse(player) {
    setGameStarted(true);
    setChooseWord(true);
    setCurrentPlayer(player);
    setRoundInProgress(true);
  }

  function handleRoundOver(data) {
    setRoundInProgress(false);
    setPlayers(data.players);
    setIsCurrentPlayer(false);
    setGameOver(data.gameOver);
    socket.emit("clearCanvas")
  }

  return (
    <main className="game-main">
      <GameLobby 
        gameStarted={gameStarted}
        avatarUrl={props.avatarUrl}
        joinGame={props.joinGame}
        roundDuration={roundDuration}
        players={players}
        setPlayers={setPlayers}
        setGameStarted={setGameStarted}
        setRoundDuration={setRoundDuration}
        setRoundInProgress={setRoundInProgress}
      />

      <GameInProgress 
        username={props.username}
        isCurrentPlayer={isCurrentPlayer}
        chooseWord={chooseWord}
        currentPlayer={currentPlayer}
        gameStarted={gameStarted}
        roundDuration={roundDuration}
        players={players} 
        roundInProgress={roundInProgress}
        gameOver={gameOver}
        setPlayers={setPlayers}
        setRoundInProgress={setRoundInProgress}
        setChooseWord={setChooseWord}
      />
    </main>
  )
}

export default Game;