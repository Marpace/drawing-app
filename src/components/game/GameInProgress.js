import {useRef, useState, useContext, useEffect} from "react";
import ToolBar from './ToolBar';
import Canvas from './Canvas';
import {SocketContext} from "../context/socketContext";
import ChooseWordModal from "./ChooseWordModal";
import Chat from "./Chat";
import RoundOverModal from "./RoundOverModal";
import Hint from "./Hint";
import GamePlayers from "./GamePlayers";


function GameInProgress(props) {

  const socket = useContext(SocketContext);

  const [brushColor, setBrushColor] = useState("#111111");
  const [brushSize, setBrushSize] = useState(3);
  const [undo, setUndo] = useState(false);
  const [eraserActive, setEraserActive] = useState(false);
  const [word, setWord] = useState("")
  const [isMobile, setIsMobile] = useState(() => window.screen.width < 1280 ? true : false)
  const [isDesktop, setIsDesktop] = useState(() => window.screen.width < 1280 ? false : true)
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);

  useEffect(() => {
    socket.on("guessedCorrectly", () => setGuessedCorrectly(true))
  }, [socket])


  return (
    <div className={`game-screen ${props.gameStarted ? "" : "hidden"}`}>

      <div className={`game-screen__heading ${props.isCurrentPlayer ? "hidden" : ""}`}>
        <p className={`text--medium`}>{`${props.currentPlayer.username} is drawing!`}</p>
        <Hint 
          word={word}
        />
      </div>

      <div className={`game-screen__heading current-player-heading ${props.isCurrentPlayer ? "" : "hidden"}`}>
        <span>You're drawing the word</span>
        <span className={`text--green`}>{word}</span>
      </div>

      <ToolBar
        word={word} 
        show={isDesktop}
        isDesktop={isDesktop} 
        isCurrentPlayer={props.isCurrentPlayer}
        currentPlayer={props.currentPlayer}
        brushColor={brushColor}
        brushSize={brushSize}
        eraserActive={eraserActive}
        setBrushSize={setBrushSize}
        setBrushColor={setBrushColor}
        // setClearCanvas={setClearCanvas} 
        setUndo={setUndo}
        setEraserActive={setEraserActive} 
      />

      <Canvas 
        width={600}
        height={600}
        brushColor={brushColor}
        brushSize={brushSize}
        // clearCanvas={clearCanvas}
        undo={undo}
        eraserActive={eraserActive}
        isCurrentPlayer={props.isCurrentPlayer}
        setUndo={setUndo}
      />

      <ToolBar
        word={word}
        currentPlayer={props.currentPlayer}
        show={isMobile}
        isMobile={isMobile}
        isCurrentPlayer={props.isCurrentPlayer}
        brushColor={brushColor}
        brushSize={brushSize}
        eraserActive={eraserActive}
        setBrushSize={setBrushSize}
        setBrushColor={setBrushColor}
        // setClearCanvas={setClearCanvas} 
        setUndo={setUndo}
        setEraserActive={setEraserActive}
      />

      <Chat 
        isCurrentPlayer={props.isCurrentPlayer}
        word={word}
        chooseWord={props.chooseWord}
        roundDuration={props.roundDuration}
        roundInProgress={props.roundInProgress}
        setGuessedCorrectly={setGuessedCorrectly}
      />

      <GamePlayers 
        username={props.username}
        guessedCorrectly={guessedCorrectly}
        players={props.players}
      />

      <ChooseWordModal 
        isCurrentPlayer={props.isCurrentPlayer}
        currentPlayer={props.currentPlayer}
        chooseWord={props.chooseWord}
        setChooseWord={props.setChooseWord}
        setRoundInProgress={props.setRoundInProgress}
        setWord={setWord}
      />
      <RoundOverModal 
        word={word}
        gameOver={props.gameOver}
        roundInProgress={props.roundInProgress}
        currentPlayer={props.currentPlayer}
        players={props.players}
        gameStarted={props.gameStarted}
        isCurrentPlayer={props.isCurrentPlayer}
        currentPlayerDisconnected={props.currentPlayerDisconnected}
      />

    </div>
  )
}

export default GameInProgress;