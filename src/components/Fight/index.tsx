import { useState } from "react";
import { useDataStore } from "../../context/DataStoreContext";
import { FightStatus } from "../../interfaces";
import Dialog from "../common/Dialog";

import './Fight.scss';

enum FightingStatus {
  EncounterEnemy = 'encounterEnemy',
  Fighting = 'fighting',
}

const Fighting = () => {
  const { fight, player, wonFight, gameDefeat, runAway } = useDataStore();

  const [fightingStatus, setFightingStatus] = useState(FightingStatus.EncounterEnemy);

  const encounterEnemy = () => {
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
            onClick={() => setFightingStatus(FightingStatus.Fighting)}
          >Fight</button>
          <button className="ran-away-btn"
            onClick={() => runAway()}
          >Run Away <span style={{ color: "red" }}>(-10HP)</span></button>
        </div>
      </>
    )
  }

  const ifPlayerWon = (): boolean => {
    if (!fight.enemy) return true;
    const weaponAp = player.equipped ? player.equipped.ap : 0;

    const playerAttack = Math.floor(Math.random() * (player.ap + weaponAp));
    const enemyAttack = Math.floor(Math.random() * fight.enemy.ap);

    const playerEffectiveHp = player.hp - enemyAttack;
    const enemyEffectiveHp = fight.enemy.hp - playerAttack;

    if (enemyEffectiveHp <= 0) return true;
    if (playerEffectiveHp <= 0) return false;

    return playerAttack > enemyAttack;
  };

  const fightResult = () => {
    const playerWon = ifPlayerWon();
    return (
      <>
        <div>{playerWon ? 'You won!' : 'You lost!'}</div>
        <button className="fight-result-btn"
          onClick={() => {
            if (playerWon) {
              wonFight();
            } else {
              gameDefeat();
            }
          }}
        >Continue</button>
      </>
    )
  }

  return (
    <div className="fight-container">
      {fightingStatus === FightingStatus.EncounterEnemy && encounterEnemy()}
      {fightingStatus === FightingStatus.Fighting && fightResult()}
    </div>
  )
}

const Fight = () => {
  const { fight } = useDataStore();

  const getDialogComponent = () => {
    if (fight.fightStatus === FightStatus.Fighting && fight.enemy) {
      return <Fighting />
    } else if (fight.fightStatus === FightStatus.Won) {
      return <div>You win!</div>
    } else if (fight.fightStatus === FightStatus.Lost) {
      return <div>You lose!</div>
    }
  }

  return (
    <Dialog
      isVisible={fight.fightStatus !== FightStatus.None}
      message={getDialogComponent()}
    />
  )
}

export default Fight;