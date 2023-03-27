
function GamePlayers(props) {

  return (
    <div className="game-players">
      {props.players.map((player, index) => (
        <div key={index} className="game-players__player">
          <img className={`game-players__player-avatar ${player.guessedCorrectly ? "player--green" : ""}`} src={player.avatarUrl}></img>
          <span className="game-players__player-name">{player.username}</span>
        </div>
      ))}
      
    </div>
  )
}

export default GamePlayers;