import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {SocketContext} from "../context/socketContext";

function Home(props) {

  const socket = useContext(SocketContext);
  const navigate = useNavigate();


  // const [usernameValue, setUsernameValue] = useState("");
  // const [avatarUrl, setAvatarUrl] = useState("");

  const [imageUrls, setImageUrls] = useState([]);
 
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [joinGameMessage, setJoinGameMessage] = useState("");
  const [joinGameCode, setJoinGameCode] = useState("");

  useEffect(() => {
    getRandomAvatars();

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


  function getRandomAvatars() { 
    let avatars = []
    for(let i = 0; i <= 8; i++) {
      const random = randomString(5);
      avatars.push(`https://robohash.org/${random}.png?set=set5&size=50x50`)
    }
    setImageUrls(avatars)
  }

  function randomString(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  return (
    <main>

      <input 
        className="username-input"
        onChange={(e) => props.setUsername(e.target.value)} 
        type="text" 
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

        <span onClick={() => getRandomAvatars()} className="avatars-container__get-more">Get more</span>
      </div>

      <button 
        onClick={handleCreateGame} 
        className={`home-btn ${props.username === "" || props.avatarUrl === "" ? "hidden" : ""}`} 
        to="/game">
        Create game
      </button>
      <button 
        onClick={() => setShowCodeInput(true)} 
        className={`home-btn ${props.username === "" || props.avatarUrl === "" ? "hidden" : ""}`}>
        Join game
      </button>
      <div className={`code-input-container ${showCodeInput ? "" : "hidden"}`}>
        <input 
          className="code-input"  
          type="text"
          maxLength="10"
          onChange={(e) => setJoinGameCode(e.target.value)}
          value={joinGameCode}>
        </input>    
        <p className="join-game-message">{joinGameMessage}</p>
        <button 
          onClick={() => socket.emit("validateCode", joinGameCode)} 
          className={`home-btn`}
          to="/game">
          Join
        </button>
      </div>

    </main>
  )
}

export default Home;