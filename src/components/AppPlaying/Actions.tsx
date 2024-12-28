import { useDataStore } from "../../context/DataStoreContext";

const Actions = () => {
  const { endGame, driveNext, lootSupply, hasLooted } = useDataStore();
  return (
    <div className='actions'>
      <button className="drive-btn" onClick={() => driveNext()}>Drive North</button>
      <button disabled={hasLooted} className={hasLooted ? "disabled explor-btn" : "explor-btn"} onClick={() => lootSupply()}>Explore Town</button>
      <button className="end-game-btn" onClick={() => endGame()}>End Journey</button>
    </div>
  )
}

export default Actions;