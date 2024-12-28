import { useDataStore } from "../../context/DataStoreContext";

const AppMainMenu: React.FC = () => {
  const { startGame } = useDataStore();
  return (
    <div>
      <div className='game-status-container'>101 Road</div>
      <button onClick={() => startGame()}>Start game</button>
    </div>
  );
}

export default AppMainMenu;