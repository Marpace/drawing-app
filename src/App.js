import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Game from "./components/pages/Game";
import {SocketContext, socket} from "./components/context/socketContext"
import {useState} from "react"


function App() {

  const [username, setUsername] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [createGame, setCreateGame] = useState(false)
  const [joinGame, setJoinGame] = useState(false)
  const [code, setCode] = useState("");


  return (
    <SocketContext.Provider value={socket}>
      <HashRouter>
        <Routes>

          <Route 
            index 
            element={
              <Home 
                username={username}
                avatarUrl={avatarUrl}
                setCode={setCode}
                setUsername={setUsername}
                setAvatarUrl={setAvatarUrl}
                setCreateGame={setCreateGame}
                setJoinGame={setJoinGame}
              />
            }> 
          </Route>
          
          <Route
            path="/game"
            element={
              <Game 
                code={code}
                createGame={createGame}
                joinGame={joinGame}
                username={username}
                avatarUrl={avatarUrl}
              />
            }>
          </Route>
          
        </Routes>
      </HashRouter>
    </SocketContext.Provider>
  )



  // switch (page) {
  //   case "home":
  //     return (
  //       <SocketContext.Provider value={socket}>
  //         <Home 
  //           page={page}
  //           setPage={setPage}
  //         />
  //       </SocketContext.Provider>
  //     ) 
  //   case "game" :
  //     return (
  //       <SocketContext.Provider value={socket}>
  //         <Game 
  //           page={page}
  //           setPage={setPage}
  //         />
  //       </SocketContext.Provider>
  //     )
  //   default:
  //     break;
  // }

  // return (
  //   // <SocketContext.Provider value={socket}>
  //     <HashRouter>
  //       <Routes>
  //         <Route index element={<Home socket={socket}/>}></Route>
  //         <Route path="/game" element={<Game socket={socket}/>}></Route>
  //       </Routes>
  //     </HashRouter>
  //   // </SocketContext.Provider>
  // );
}

export default App;
