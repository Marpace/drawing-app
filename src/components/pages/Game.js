import { useContext, useEffect, useState } from "react";
import {SocketContext} from "../context/socketContext";
import GameLobby from "../game/GameLobby";
import GameInProgress from "../game/GameInProgress";
import { useNavigate } from "react-router-dom";


function Game(props) {

  const navigate = useNavigate();

  const socket = useContext(SocketContext); 
  const [isCurrentPlayer, setIsCurrentPlayer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [chooseWord, setChooseWord] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [roundDuration, setRoundDuration] = useState("60s");
  const [players, setPlayers] = useState([]);
  const [roundInProgress, setRoundInProgress] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [lobbyMessage, setLobbyMessage] = useState("");
  const [currentPlayerDisconnected, setCurrentPlayerDisconnected] = useState(false);

  useEffect(() => {
    // window.onbeforeunload = () => {
    //   return true;
    // }


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
    socket.on("isAdmin", handleIsAdmin);
    socket.on("joinGameResponse", (data) => setPlayers(data))
    socket.on("roundOver", handleRoundOver)
    socket.on("gameOver", handleGameOver)
    socket.on("playerDisconnected", (players) => setPlayers(players))
    socket.on("updateGamePlayers", (players) => setPlayers(players))
     
  }, [socket])

  useEffect(() => {
    if(!props.username) navigate("/")
  }, [props.username])

  function handleGameOver(data) {
    setPlayers(data)
    setGameStarted(false)
  }

  function handleStartGameResponse(data) {
    if(data.playerCount <= 1) {
      setLobbyMessage("Not enough players to start the game");
      return;
    }
    setCurrentPlayer(data.player);
    setChooseWord(true);
    setGameStarted(true);
    setRoundInProgress(true);
  }

  function handleIsAdmin(code) {
    console.log("is admin")
    setIsAdmin(true);
    setRoomCode(code)
  }

  function handleRoundOver(data) {
    setRoundInProgress(false);
    setPlayers(data.players);
    setIsCurrentPlayer(false);
    setGameOver(data.gameOver);
    setCurrentPlayerDisconnected(data.playerDisconnected)
    setLobbyMessage("")
  }

  return (
    <main className="game-main">
      <GameLobby 
        roomCode={roomCode}
        isAdmin={isAdmin}
        gameStarted={gameStarted}
        avatarUrl={props.avatarUrl}
        roundDuration={roundDuration} 
        players={players}
        lobbyMessage={lobbyMessage}
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
        currentPlayerDisconnected={currentPlayerDisconnected}
        setPlayers={setPlayers}
        setRoundInProgress={setRoundInProgress}
        setChooseWord={setChooseWord}
      />
    </main>
  )
}

export default Game;