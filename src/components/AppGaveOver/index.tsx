import { useDataStore } from "../../context/DataStoreContext";
import './AppGameOver.scss';

const AppGameOver = () => {
  const { GameState, endGame } = useDataStore();
  return (
    <div className="game-over-container">
      <h1>{GameState.GameStatus}</h1>
      <button onClick={() => endGame()}>Main manu</button>
    </div>
  );
}

export default AppGameOver;