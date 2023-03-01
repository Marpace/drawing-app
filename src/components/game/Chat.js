import { useContext, useEffect, useRef, useState } from "react";
import {SocketContext} from "../context/socketContext";
import ChatMessage from "./ChatMessage";


function Chat(props) {

  const socket = useContext(SocketContext);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);

  useEffect(() => {
    socket.on("newGuessResponse", (data) => setMessages(prev => [...prev, data]));
    socket.on("guessedCorrectly", () => setGuessedCorrectly(true))
  }, [socket])

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages])

  useEffect(() => {
    if(props.roundInProgress) {
      setGuessedCorrectly(false);
      setMessages([]);
    }
  }, [props.roundInProgress])
  

  function handleSendMessageClick() {
    if(inputValue === "") return;
    socket.emit("newGuess", inputValue);
    setInputValue("");
    inputRef.current.focus();
  }


  return (
    <div className={`chat`}>
      <div className={props.roundInProgress && !props.chooseWord ? "chat__timer" : "hidden"} style={{"animationDuration": props.roundDuration}}></div>
      <div className="messages" ref={messagesRef}>
        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            message={message}
          />
        ))}
      </div>
      <div className={`chat__compose ${props.isCurrentPlayer || guessedCorrectly ? "hidden" : ""}`}>
        <input 
          ref={inputRef}
          className={`chat-input`} 
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text">
        </input>
        <button 
          onClick={handleSendMessageClick} 
          className={`send-message-btn`}>
            <img src="./assets/images/send_icon.svg" alt="arrow icon"></img>
        </button>
      </div>
    </div>
  )
}


export default Chat;