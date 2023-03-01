import { useState } from "react";

function ToolBar(props) {

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
  const [showPalette, setShowPalette] = useState(false);
  const [showBrushSet, setShowBrushSet] = useState(false);
  const [pencilActive, setPencilActive] = useState(true);

  function toggleColorPicker() {
    setShowPalette( prev => prev ? false : true)
    setShowBrushSet(false)
  }

  function toggleBrushSizePicker() {
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
  }

  function handleEraserClick() {
    props.setEraserActive(true);
    setPencilActive(false);
    setShowBrushSet(false);
    setShowPalette(false);
  }

  return (
    <div className={`tool-bar ${props.isCurrentPlayer ? "" : "hidden"}`}>

      <div 
        onClick={toggleColorPicker} 
        className={`color-picker`} 
        style={{"backgroundColor": props.brushColor}}>
          <div className={`color-picker__palette ${showPalette ? "" : "hidden"}`}>
            {colors.map( color => (
              <span 
                onClick={() => props.setBrushColor(color)}
                key={color} 
                className="palette-color" 
                style={{"backgroundColor": color}}>
              </span>
            ))}
          </div>
      </div>

      <div 
        onClick={toggleBrushSizePicker}
        className={`brush-size-picker ${pencilActive ? "option-active" : ""}`}>
          <img src="./assets/images/pencil_icon.svg" alt="pencil icon"></img>
          <div className={`brush-size-picker__set ${showBrushSet ? "" : "hidden"}`}>
              <span onClick={handlebrushClick} id="18" className="brush-1" style={{"backgroundColor" : props.brushColor}}></span>
              <span onClick={handlebrushClick} id="14" className="brush-2" style={{"backgroundColor" : props.brushColor}}></span>
              <span onClick={handlebrushClick} id="10" className="brush-3" style={{"backgroundColor" : props.brushColor}}></span>
              <span onClick={handlebrushClick} id="6" className="brush-4" style={{"backgroundColor" : props.brushColor}}></span>
              <span onClick={handlebrushClick} id="3" className="brush-5" style={{"backgroundColor" : props.brushColor}}></span>
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
        onClick={() => props.setClearCanvas(prev => prev ? false : true)} 
        className="clear-btn">
          Clear
      </span> 

    </div>
  )
} 

export default ToolBar;