import { useDataStore } from "../../context/DataStoreContext";
import playerImage from "../../assets/ch1.png";

const PlayerStatus = () => {
  const { player } = useDataStore();
  const attackPoint = Math.min(player.ap + (player.equipped ? player.equipped.ap : 0), 100);
  return (
    <div className="status">
      <div className="player">
        <div className="player-photo">
          <img src={playerImage} alt="Player" />
        </div>
        <div className="player-hp player-point" style={{ width: `calc(${player.hp}% - 10px)` }}></div>
        <div className="player-ap player-point" style={{ width: `calc(${attackPoint}% - 10px)` }}></div>
      </div>
      <div className="location">
        <div className="loc-mile">{player.currentLocation.mileageToSF} miles</div>
        <div className="loc-name">{player.currentLocation.name}</div>
        <div className="loc-desc">{player.currentLocation.description}</div>
      </div>
    </div>
  )

};

export default PlayerStatus