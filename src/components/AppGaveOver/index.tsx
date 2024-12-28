import { useDataStore } from "../../context/DataStoreContext";

const AppGameOver = () => {
  const { GameState, endGame } = useDataStore();
  return (
    <div>
      <h1>{GameState.GameStatus}</h1>
      <button onClick={() => endGame()}>Main manu</button>
    </div>
  );
}

export default AppGameOver;