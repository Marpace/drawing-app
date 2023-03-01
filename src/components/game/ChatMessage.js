function ChatMessage(props) {
  return (
    <div className="message">
      <span 
        className={`message__author ${props.message.guessedCorrectly ? "hidden" : ""}`}>
          {`${props.message.author}:`}
      </span>
      <span 
        className={`message__content text--green ${props.message.guessedCorrectly ? "hidden" : ""}`}>
          {props.message.content}
      </span>
      <span 
        className={`text--green ${props.message.guessedCorrectly ? "" : "hidden"}`}>
          {`${props.message.author} guessed correctly!`}
      </span>
    </div>
  )
}

export default ChatMessage;