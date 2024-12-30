import { useDataStore } from "../../context/DataStoreContext";
import { FightStatus } from "../../interfaces";
import Dialog from "../common/Dialog";
import Fighting from "../Fighting";

import './Fight.scss';


const MeetEnemy = ({ onFighting, onRunAway }: { onFighting: () => void; onRunAway: () => void }) => {
  const { fight, player } = useDataStore();

  const getWeapon = () => {
    if (player.equipped) {
      return `${player.equipped.name}(+${player.equipped.ap} Attack)`;
    } else {
      return 'Fists';
    }
  }

  return (
    <>
      <div>You encountered a <strong>{fight?.enemy?.name}</strong>!</div>
      <div>{fight?.enemy?.description}</div>
      <div className="fight-stats">
        <div className="enemy-stats">
          <div>Enemy HP: {fight?.enemy?.hp}</div>
          <div>Enemy AP: {fight?.enemy?.ap}</div>
        </div>
        <div className="player-stats">
          <div style={{ color: "greenyellow" }}>Your HP: {player.hp}</div>
          <div style={{ color: "#0070ff" }}>Your AP: {player.ap}</div>
          <div style={{ color: "#0070ff", marginTop: "10px" }}>
            <div>Weapon: </div><div>{getWeapon()}</div></div>
        </div>
      </div>
      <div className="fight-actions">
        <button className="fight-btn"
          onClick={() => onFighting()}
        >Fight</button>
        <button className="ran-away-btn"
          onClick={() => onRunAway()}
        >Run Away <span style={{ color: "red" }}>(-10HP)</span></button>
      </div>
    </>
  )
}

const Fight = () => {
  const { fight, wonFight, gameDefeat, runAway, onFighting } = useDataStore();

  const getDialogComponent = () => {
    if (fight.fightStatus === FightStatus.MeetEnemy && fight.enemy) {
      return <MeetEnemy onFighting={() => onFighting()} onRunAway={() => runAway()} />
    } else if (fight.fightStatus === FightStatus.Fighting) {
      return <Fighting onFightEnd={(isWon) => {
        isWon ? wonFight() : gameDefeat();
      }} />
    }
  }

  return (
    <Dialog
      isVisible={fight.fightStatus !== FightStatus.None}
      message={(
        <div className="fight-container">
          {getDialogComponent()}
        </div>
      )}
    />
  )
}

export default Fight;