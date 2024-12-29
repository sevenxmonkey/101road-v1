import { useDataStore } from "../../context/DataStoreContext";
import playerImage from "../../assets/ch2.png";

const PlayerStatus = () => {
  const { player } = useDataStore();
  return (
    <div className="status">
      <div className="player">
      <div className="player-photo">
  <img src={playerImage} alt="Player" />
</div>
        <div className="player-hp player-point" style={{ width: `calc(${player.hp}% - 10px)` }}></div>
        <div className="player-ap player-point" style={{ width: `calc(${player.ap}% - 10px)` }}></div>
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