import { useDataStore } from "../../context/DataStoreContext";
import './AppPlaying.scss';
const AppPlaying = () => {
  const { player, inventory, endGame, logs, driveNext, consumeSupply } = useDataStore();
  return (
    <div className="playing-container">
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
      <div className="history">
        {[...logs].reverse().map((log, index) => (
          <p key={index} className={index === 0 ? "active log" : "log"}>
            {log.message}
          </p>
        ))}
      </div>
      <div className="control">
        <div className="inventory">
          <div className="weapons">
            {inventory.weapons.map(({ weapon, quantity }, index) => (
              <div key={index}>{weapon.name} - {weapon.ap} (${quantity})</div>
            ))}
          </div>
          <div className="supplies">
            {inventory.supplies.map(({ supply, quantity }, index) => (
              <div className="supply-item" key={index} onClick={() => consumeSupply(supply.id)}>
                {supply.name}
                <span style={{ color: 'green' }}>+{supply.hp}</span>
                <span style={{ color: "white" }}>[{quantity}]</span>
              </div>
            ))}
          </div>
        </div>
        <div className='actions'>
          <button className="drive-btn" onClick={() => driveNext()}>Drive North</button>
          <button className="explore-btn">Explore Town</button>
          <button className="end-game-btn" onClick={() => endGame()}>End Journey</button>
        </div>
      </div>
    </div>
  );
}

export default AppPlaying;