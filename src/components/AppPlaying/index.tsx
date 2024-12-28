import { useDataStore } from "../../context/DataStoreContext";
import './AppPlaying.scss';
const AppPlaying = () => {
  const { GameState, endGame, driveNext } = useDataStore();
  const { Player } = GameState;
  return (
    <div className="playing-container">
      <div className="status">
        <div className="player">
          <div className="player-photo">{Player.name}</div>
          <div className="player-hp player-point" style={{ width: `calc(${Player.hp}% - 10px)` }}></div>
          <div className="player-ap player-point" style={{ width: `calc(${Player.ap}% - 10px)` }}></div>
        </div>
        <div className="location">
          <div className="loc-mile">{Player.currentLocation.mileageToSF} miles</div>
          <div className="loc-name">{Player.currentLocation.name}</div>
          <div className="loc-desc">{Player.currentLocation.description}</div>
        </div>
      </div>
      <div className="history">Player History</div>
      <div className="control">
        <div className="inventory">
          <div className="weapons">
            {Player.inventory.weapons.map(({ weapon, quantity }, index) => (
              <div key={index}>{weapon.name} - {weapon.ap} (${quantity})</div>
            ))}
          </div>
          <div>
            {Player.inventory.supplies.map(({ supply, quantity }, index) => (
              <div key={index}>{supply.name} - {supply.hp} (${quantity})</div>
            ))}
          </div>
        </div>
        <div className='actions'>
          <button className="drive-btn" onClick={() => driveNext()}>Drive to Next Town</button>
          <button className="explore-btn">Explore Town</button>
          <button className="end-game-btn" onClick={() => endGame()}>End Journey</button>
        </div>
      </div>
    </div>
  );
}

export default AppPlaying;