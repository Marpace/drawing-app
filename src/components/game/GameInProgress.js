import {useState} from "react";
import ToolBar from './ToolBar';
import Canvas from './Canvas';
import ChooseWordModal from "./ChooseWordModal";
import Chat from "./Chat";
import RoundOverModal from "./RoundOverModal";
import Hint from "./Hint";
import GamePlayers from "./GamePlayers";
import MobileKeyboard from "./MobileKeyboard";
import MobileGuess from "./MobileGuess";


function GameInProgress(props) {


  const [brushColor, setBrushColor] = useState("#111111");
  const [brushSize, setBrushSize] = useState(3);
  const [eraserActive, setEraserActive] = useState(false);
  const [word, setWord] = useState("")
  const [isMobile, setIsMobile] = useState(() => window.screen.width < 1280 ? true : false)
  const [isDesktop, setIsDesktop] = useState(() => window.screen.width < 1280 ? false : true)


  return (
    <div className={`game-screen ${props.gameStarted ? "" : "hidden"}`}>

      <span className="new-mobile-guess">{}</span>

      <div className={`game-screen__heading ${props.isCurrentPlayer ? "hidden" : ""}`}>
        <p className={`text--medium`}>{`${props.currentPlayer.username} is drawing!`}</p>
        <Hint 
          isMobile={isMobile}
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
        setEraserActive={setEraserActive} 
      />

      <Canvas 
        width={600}
        height={600}
        brushColor={brushColor}
        brushSize={brushSize}
        eraserActive={eraserActive}
        isCurrentPlayer={props.isCurrentPlayer}
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
        setEraserActive={setEraserActive}
      />

      <Chat 
        isMobile={isMobile}
        isCurrentPlayer={props.isCurrentPlayer}
        word={word}
        chooseWord={props.chooseWord}
        roundDuration={props.roundDuration}
        roundInProgress={props.roundInProgress}
      />

      <MobileKeyboard 
        isMobile={isMobile}
        isCurrentPlayer={props.isCurrentPlayer}
        gameInProgress={props.gameInProgress}
      />

      <MobileGuess 
        isMobile={isMobile}
      />

      <GamePlayers 
        username={props.username}
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