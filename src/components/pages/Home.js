import { useContext, useEffect, useState, useRef } from "react";
import {useNavigate} from "react-router-dom";
import {SocketContext} from "../context/socketContext";

function Home(props) {

  const inputRef = useRef(null);

  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const [imageUrls, setImageUrls] = useState([]);
 
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [joinGameMessage, setJoinGameMessage] = useState("");
  const [joinGameCode, setJoinGameCode] = useState("");

  useEffect(() => {
    getRandomAvatars(9);

    socket.on("validateCodeResponse", handleValidateCodeResponse)
  }, [socket])

  function handleCreateGame() {
    props.setCreateGame(true);
    navigate("/game")
  }
  
  function handleValidateCodeResponse(data) {
    if(!data.isValid) {
      setJoinGameMessage(data.message)
    } else {
      props.setCode(data.code)
      props.setJoinGame(true);
      navigate("/game");
    }
  }

  function getRandomAvatars(n) { 
    let condition;
    let randomNumbers = [];
    for(let i = 0; i < n; i++) {
      do {
        const randomNumber = Math.ceil(Math.random() * 55);
        condition = randomNumbers.includes(randomNumber)
        if(!condition) randomNumbers.push(randomNumber)
      } while (condition);
    };
    setImageUrls(() => {
      let arr = []
      randomNumbers.forEach(number => {
        arr.push(`./assets/images/meme-avatars/meme (${number}).jpg`)
      })
      return arr;
    });
  }  

  function handleCodeSubmit(e) {
    e.preventDefault();
    socket.emit("validateCode", joinGameCode)
  };

  function handleJoinGameBtnClick() {
    setShowCodeInput(true)
    inputRef.current.focus();
  }

  return (
    <main>

      <h1 className="game-title">Sketch</h1>

      <input 
        className="username-input"
        onChange={(e) => props.setUsername(e.target.value)} 
        type="text" 
        maxLength="10"
        placeholder="Enter your username"
        value={props.username}>
      </input>

      <div className="avatars-container">
        <p className="avatars-container__heading">Choose your avatar</p>
        <div className="avatars-container__grid">

          {imageUrls.map( (url, index) => (
            <img 
              className={`grid-img ${props.avatarUrl === url ? "img--selected" : ""}`}
              onClick={() => props.setAvatarUrl(url)} 
              key={index} 
              src={url}>
            </img>
          ))}
        </div>

        <span onClick={() => getRandomAvatars(9)} className="avatars-container__get-more">Get more</span>
      </div>

      <button 
        onClick={handleCreateGame} 
        className={`home-btn ${props.username === "" || props.avatarUrl === "" ? "hidden" : ""}`} 
        to="/game">
        Create game
      </button>
      <button 
        onClick={handleJoinGameBtnClick} 
        className={`home-btn ${props.username === "" || props.avatarUrl === "" ? "hidden" : ""}`}>
        Join game
      </button>
      <form onSubmit={handleCodeSubmit} className={`code-input-form ${showCodeInput ? "show-form" : ""}`}>
        <input 
          ref={inputRef}
          className="code-input"  
          type="text"
          placeholder="Enter game code"
          onChange={(e) => setJoinGameCode(e.target.value)}
          value={joinGameCode}>
        </input>    
        <p className="join-game-message">{joinGameMessage}</p>
        <button 
          className={`home-btn`}
          to="/game">
          Join
        </button>
      </form>

    </main>
  )
}

export default Home;