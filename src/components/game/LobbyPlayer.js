function LobbyPlayer(props) {
  return (
    <div className={`lobby-players__player ${props.player.admin ? "player-admin" : ""}`}>
      <img src={props.player.avatarUrl} className="player-avatar"></img>
      <span className="player-name">{props.player.username}</span>
      <span className={`text--green ${props.player.ready ? "" : "hidden"}`}>Ready</span>
      <span className={`text--green admin-status ${props.player.admin ? "" : "hidden"}`}>Admin</span>
    </div>
  )
}


export default LobbyPlayer;