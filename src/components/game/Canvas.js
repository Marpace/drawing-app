import {useRef, useEffect, useState, useContext} from "react";
import {SocketContext} from "../context/socketContext";

function Canvas(props) {

  const socket = useContext(SocketContext);

  let ctx;

  const isDrawingRef = useRef(false);
  const canvasRef = useRef(null);
  const previousPoint = useRef(null);

  const [paths, setPaths] = useState([]);
  const [points, setPoints] = useState([])


  useEffect(() => {
    socket.on("drawingResponse", handleDrawingResponse);
    socket.on("clearCanvasResponse", handleClearCanvasResponse);
    socket.on("undoResponse", handleUndoResponse);
  }, [socket])

  useEffect(() => {
    ctx = canvasRef.current.getContext("2d")
    if(props.undo) undo();
  }, [props.undo])


  // handlers for incoming events from the server
  function handleDrawingResponse(data) {
    const ctx = canvasRef.current.getContext("2d");
    drawLine(data.start, data.end, ctx, data.color, data.width)
  }

  function handleClearCanvasResponse() {
    console.log("Canvas cleared")
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  function handleUndoResponse(paths) {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawPaths(paths);
  }


  //listeners for mouse and touch events
  function mouseDownListener() {
    isDrawingRef.current = true
    setPoints([]);
  }

  function mouseMoveListener(e) {
    if(isDrawingRef.current) {
      const point = getPointInCanvas(e.clientX ?? e.touches[0].clientX, e.clientY ?? e.touches[0].clientY);
      setPoints(prev => [...prev, point]);
      const ctx = canvasRef.current.getContext("2d")
      const color = props.eraserActive ? "rgb(247, 247, 247)" : props.brushColor;
      const width = props.eraserActive ? 18 : props.brushSize;
      drawLine(previousPoint.current, point, ctx, color, width);
      const data = {
        start: previousPoint.current,
        end: point,
        color: color,
        width: width
      }
      socket.emit("drawing", data);
      previousPoint.current = point;
    }
  }

  function mouseUpListener() {
    isDrawingRef.current = false;
    previousPoint.current = null;
    setPaths(prev => {
      return [
        ...prev,
        {
          points: points,
          brushColor: props.brushColor,
          brushSize: props.brushSize
        }
      ]
    })
  }


  // canvas functions 
  function getPointInCanvas(clientX, clientY) {
    if(!canvasRef.current) return null;
    const boundingRect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / boundingRect.width;
    const scaleY = canvasRef.current.height / boundingRect.height;
    return {
      x: (clientX - boundingRect.left) * scaleX,
      y: (clientY - boundingRect.top) * scaleY
    }
  }

  function drawLine(
    start,
    end,
    ctx,
    color,
    width
  ) {
    start = start ?? end
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke();
  }

  function undo() {
    paths.splice(-1, 1)
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawPaths(paths);
    socket.emit("undo", paths)
    props.setUndo(false);
  } 
  
  function drawPaths(paths) {
    const ctx = canvasRef.current.getContext("2d");
    paths.forEach(path => {
      ctx.beginPath();
      ctx.lineWidth = path.brushSize;
      ctx.strokeStyle = path.brushColor;
      ctx.moveTo(path.points[0].x, path.points[0].y)
      for(let i = 0; i < path.points.length; i++) {
        ctx.lineTo(path.points[i].x, path.points[i].y)
      }
      ctx.stroke();
    })
  }



  return (
    <canvas
      ref={canvasRef}
      className={props.isCurrentPlayer ? "canvas" : "canvas canvas-disabled"}
      width={props.width}
      height={props.height}
      onMouseDown={props.isCurrentPlayer ? mouseDownListener : null}
      onMouseMove={props.isCurrentPlayer ? mouseMoveListener : null}
      onMouseUp={props.isCurrentPlayer ? mouseUpListener : null}
      onTouchStart={props.isCurrentPlayer ? mouseDownListener : null}
      onTouchMove={props.isCurrentPlayer ? mouseMoveListener : null}
      onTouchEnd={props.isCurrentPlayer ? mouseUpListener : null}
    />
  )


}

export default Canvas;

