function StandingsPlayer(player) {
  return (
    <div className="standings-player">
      <img className="standings-player__avatar" src={player.avatarUrl}></img>
      <span className="standings-player__name">{player.username}</span>
      <span className="standings-player__score">{player.score}</span>
    </div>
  )
}

export default StandingsPlayer;