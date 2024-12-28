import { useDataStore } from "../../context/DataStoreContext";

const PlayerStatus = () => {
  const { player } = useDataStore();
  return (
    <div className="status">
      <div className="player">
        <div className="player-photo">{player.name}</div>
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