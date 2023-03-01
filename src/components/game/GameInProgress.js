import {useRef, useState, useContext, useEffect} from "react";
import ToolBar from './ToolBar';
import Canvas from './Canvas';
import {SocketContext} from "../context/socketContext";
import ChooseWordModal from "./ChooseWordModal";
import Chat from "./Chat";
import RoundOverModal from "./RoundOverModal";
import Hint from "./Hint";


function GameScreen(props) {

  const socket = useContext(SocketContext);

  const [brushColor, setBrushColor] = useState("#111111");
  const [brushSize, setBrushSize] = useState(3);
  const [clearCanvas, setClearCanvas] = useState(false);
  const [undo, setUndo] = useState(false);
  const [eraserActive, setEraserActive] = useState(false);
  const [word, setWord] = useState("")

  useEffect(() => {
    setClearCanvas(prev => prev ? false : true)
  }, [props.roundInProgress])

  return (
    <div className={`game-screen ${props.gameStarted ? "" : "hidden"}`}>

      <div className={`game-screen__heading ${props.isCurrentPlayer ? "hidden" : ""}`}>
        <p className={`text--medium`}>{`${props.currentPlayer.username} is drawing!`}</p>
        <Hint 
          word={word}
        />
      </div>

      
      <span className={props.isCurrentPlayer ? "" : "hidden"}>You're drawing the word</span>
      <span className={`text--green ${props.isCurrentPlayer ? "" : "hidden"}`}>{word}</span>
      {/* <span className={`text--green ${props.isCurrentPlayer ? "" : "hidden"}`}>{word}</span> */}


      <Canvas 
        width={window.screen.width * .90}
        height={window.screen.width * .90}
        brushColor={brushColor}
        brushSize={brushSize}
        clearCanvas={clearCanvas}
        undo={undo}
        eraserActive={eraserActive}
        isCurrentPlayer={props.isCurrentPlayer}
      />

      <ToolBar
        isCurrentPlayer={props.isCurrentPlayer}
        brushColor={brushColor}
        brushSize={brushSize}
        eraserActive={eraserActive}
        setBrushSize={setBrushSize}
        setBrushColor={setBrushColor}
        setClearCanvas={setClearCanvas} 
        setUndo={setUndo}
        setEraserActive={setEraserActive}
      />

      <Chat 
        isCurrentPlayer={props.isCurrentPlayer}
        word={word}
        chooseWord={props.chooseWord}
        roundDuration={props.roundDuration}
        roundInProgress={props.roundInProgress}
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
        players={props.players}
        gameStarted={props.gameStarted}
        isCurrentPlayer={props.isCurrentPlayer}
      />

    </div>
  )
}

export default GameScreen;