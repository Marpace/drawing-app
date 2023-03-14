import { useState, useContext } from "react";
import {SocketContext} from "../context/socketContext"

function ToolBar(props) {

  const socket = useContext(SocketContext);

  const [colors, setColors] = useState([
    "#E23D28",
    "#ED9121",
    "#FDEE00",
    "#03C03C",
    "#00B9E8",
    "#B284BE",
    "#FF91AF",
    "#111111"
  ])
  const [showPalette, setShowPalette] = useState(() => props.isMobile ? false : true);
  const [showBrushSet, setShowBrushSet] = useState(() => props.isMobile ? false : true);
  const [pencilActive, setPencilActive] = useState(() => props.isDesktop ? false : true);

  function toggleColorPicker() {
    if(props.isDesktop) return;
    setShowPalette( prev => prev ? false : true)
    setShowBrushSet(false)
  }

  function toggleBrushSizePicker() {
    if(props.isDesktop) return;
    if(props.eraserActive) {
      props.setEraserActive(false)
      setPencilActive(true)
      return;
    }
    setShowBrushSet(prev => prev ? false : true)
    setShowPalette(false)
  }

  function handlebrushClick(e) {
    props.setBrushSize(Number(e.target.id)) 
    if(props.isDesktop) props.setEraserActive(false)
  }

  function handleEraserClick() {
    props.setEraserActive(true);
    setPencilActive(false);
    if(props.isDesktop) {
      props.setBrushSize(null)
      return;
    } 
    setShowBrushSet(false);
    setShowPalette(false);
  }

  return (
    <div className={`tool-bar ${props.isCurrentPlayer && props.show ? "" : "hidden"}`}>

      {/* Heading element for desktop screens, I put it in this component
      to be able to position it absolutely on top of the canvas */}
      <div className={`game-screen__desktop-heading current-player-heading ${props.isCurrentPlayer ? "" : "hidden"}`}>
        <span>You're drawing the word</span>
        <span className={`text--green`}>{props.word}</span>
      </div>

      <div 
        onClick={toggleColorPicker} 
        className={`color-picker`} 
        style={{"backgroundColor": props.brushColor}}>
          <div className={`color-picker__palette ${showPalette ? "" : "hidden"}`}>
            {colors.map( color => (
              <span 
                onClick={() => props.setBrushColor(color)}
                key={color} 
                className={`palette-color ${props.brushColor === color ? "color-active" : ""}`} 
                style={{"backgroundColor": color}}>
              </span>
            ))}
          </div>
      </div>

      <div 
        onClick={toggleBrushSizePicker}
        className={`brush-size-picker ${pencilActive ? "option-active" : ""}`}>
          <img className="brush-size-picker__icon" src="./assets/images/pencil_icon.svg" alt="pencil icon"></img>
          <div className={`brush-size-picker__set ${showBrushSet ? "" : "hidden"}`}>
              <span onClick={handlebrushClick} id="18" className={`brush-1 ${props.brushSize === 18 ? "brush-active" : ""}`} style={{"backgroundColor" : props.brushColor}}></span>
              <span onClick={handlebrushClick} id="14" className={`brush-2 ${props.brushSize === 14 ? "brush-active" : ""}`} style={{"backgroundColor" : props.brushColor}}></span>
              <span onClick={handlebrushClick} id="10" className={`brush-3 ${props.brushSize === 10 ? "brush-active" : ""}`} style={{"backgroundColor" : props.brushColor}}></span>
              <span onClick={handlebrushClick} id="6" className={`brush-4 ${props.brushSize === 6 ? "brush-active" : ""}`} style={{"backgroundColor" : props.brushColor}}></span>
              <span onClick={handlebrushClick} id="3" className={`brush-5 ${props.brushSize === 3 ? "brush-active" : ""}`} style={{"backgroundColor" : props.brushColor}}></span>
          </div>
      </div>

      <div 
        onClick={() => props.setUndo(prev => prev ? false : true)} 
        className="undo-btn">
          <img src="./assets/images/undo_icon.svg" alt="undo icon"></img>
      </div>

      <div 
        onClick={handleEraserClick} 
        className={`eraser-btn ${props.eraserActive ? "option-active" : ""}`}>
          <img src="./assets/images/eraser_icon.svg" alt="eraser icon"></img>
      </div> 

      <span 
        onClick={() => socket.emit("clearCanvas", "cleared-by-player")} 
        className="clear-btn">
          Clear
      </span> 

    </div>
  )
} 

export default ToolBar;