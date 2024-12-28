import { useDataStore } from "../../context/DataStoreContext";

import './AppMainMenu.scss';

const AppMainMenu: React.FC = () => {
  const { startGame } = useDataStore();
  return (
    <div className="main-menu-container">
      <h1>RUSTED 101</h1>
      <button className="start-btn" onClick={() => startGame()}>Start game</button>
    </div>
  );
}

export default AppMainMenu;