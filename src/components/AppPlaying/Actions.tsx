import { useDataStore } from "../../context/DataStoreContext";

const Actions = () => {
  const { endGame, driveNext, explore, hasExplored } = useDataStore();
  return (
    <div className='actions'>
      <button className="drive-btn" onClick={() => driveNext()}>Drive North</button>
      <button disabled={hasExplored} className={hasExplored ? "disabled explor-btn" : "explor-btn"} onClick={() => explore()}>Explore Town</button>
      <button className="end-game-btn" onClick={() => endGame()}>End Journey</button>
    </div>
  )
}

export default Actions;