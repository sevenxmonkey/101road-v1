import Actions from "./Actions";
import Inventory from "./Inventory";
import PlayerLogs from "./PlayerLogs";
import PlayerStatus from "./PlayerStatus";
import vhImage from "../../assets/vh1.png";
import Fight from "../Fight";

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
      <div className="vh-img">
        <img src={vhImage} alt="VH" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
      <Fight />
    </div>
  );
}

export default AppPlaying;