import { useContext, useEffect, useRef, useState } from "react";
import {SocketContext} from "../context/socketContext";
import ChatMessage from "./ChatMessage";


function Chat(props) {

  const socket = useContext(SocketContext);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("newGuessResponse", (data) => setMessages(prev => [...prev, data]));
  }, [socket])

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages])

  useEffect(() => {
    if(props.roundInProgress) {
      setMessages([]);
    }
  }, [props.roundInProgress])
  

  function handleNewGuessSubmit(e) {
    e.preventDefault();
    if(inputValue === "") return;
    socket.emit("newGuess", inputValue);
    setInputValue("");
    inputRef.current.focus();
  }


  return (
    <div className={`chat ${props.isMobile ? "hidden" : ""}`}>
      <div className={props.roundInProgress && !props.chooseWord ? "chat__timer" : "hidden"} style={{"animationDuration": props.roundDuration}}></div>
      <div className="messages" ref={messagesRef}>

        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            message={message}
          />
        ))}

      </div>
      <form onSubmit={handleNewGuessSubmit} className={`chat__compose ${props.isCurrentPlayer || props.guessedCorrectly ? "hidden" : ""}`}>
        <input 
          ref={inputRef}
          className={`chat-input`} 
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text">
        </input>
        <button 
          className={`send-message-btn`}>
            <img src="./assets/images/send_icon.svg" alt="arrow icon"></img>
        </button>
      </form>
    </div>
  )
}


export default Chat;