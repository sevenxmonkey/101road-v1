import Actions from "./Actions";
import Inventory from "./Inventory";
import PlayerLogs from "./PlayerLogs";
import PlayerStatus from "./PlayerStatus";

import './AppPlaying.scss';

const AppPlaying = () => {
  return (
    <div className="playing-container">
      <PlayerStatus />
      <PlayerLogs />
      <div className="control">
        <Inventory />
        <Actions />
      </div>
    </div>
  );
}

export default AppPlaying;