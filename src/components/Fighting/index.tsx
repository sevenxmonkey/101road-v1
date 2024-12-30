import { useEffect, useMemo, useState } from "react";
import { useDataStore } from "../../context/DataStoreContext";

const targetRange = { start: 40, end: 60 }; // Target range percentage

const Fighting = ({ onFightEnd }: { onFightEnd: (isWon: boolean) => void }) => {
  const { fight, player } = useDataStore();

  const [playerHP, setPlayerHP] = useState(player.hp);
  const [enemyHP, setEnemyHP] = useState(fight.enemy?.hp || 0);
  const [playerAP, setPlayerAP] = useState(player.ap);
  const [playerWeaponAP, setPlayerWeaponAP] = useState(player.equipped?.ap || 0);
  const [enemyAP, setEnemyAP] = useState(fight.enemy?.ap || 0);

  const [sliderPosition, setSliderPosition] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const [message, setMessage] = useState<string | null>(null);
  const [isFightWon, setIsFightWon] = useState<boolean | undefined>();

  useEffect(() => {
    setPlayerHP(player.hp);
    setEnemyHP(fight.enemy?.hp || 0);
    setPlayerAP(player.ap);
    setPlayerWeaponAP(player.equipped?.ap || 0);
    setEnemyAP(fight.enemy?.ap || 0);
    setIsFightWon(undefined);
    setIsRunning(true);
  }, [fight, player]);

  // Slider speed calculation based on player and enemy stats
  const sliderSpeed = useMemo(() => {
    const speed = Math.max(2, enemyAP + enemyHP - (playerAP + playerHP));
    return speed / 3;
  }, [enemyAP, enemyHP, playerAP, playerHP]);

  // Slider movement logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSliderPosition((prev) => {
        const nextPos = (prev + sliderSpeed) % 100; // Slider loops around
        return nextPos;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [isRunning, sliderSpeed]);

  // Handle attack
  const handleAttack = () => {
    if (sliderPosition >= targetRange.start && sliderPosition <= targetRange.end) {
      const damage = playerAP + playerWeaponAP;
      setEnemyHP((prev) => Math.max(0, prev - damage));
      setMessage(`Hit! Enemy takes ${damage} damage.`);
    } else {
      setPlayerHP((prev) => Math.max(0, prev - enemyAP));
      setMessage(`Miss! You take ${enemyAP} damage.`);
    }
    setTimeout(() => setMessage(null), 1000); // Clear message after 1 second
  };

  useEffect(() => {
    if (enemyHP <= 0) {
      setIsRunning(false);
      setIsFightWon(true);
    }

    if (playerHP <= 0) {
      setIsRunning(false);
      setIsFightWon(false);
    }
  }, [enemyHP, playerHP]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Fight!</h1>
      <div>
        <h2>Player Stats</h2>
        <p>Health: {playerHP}</p>
        <p>Attack: {playerAP}</p>
        <p>Weapon Attack: {playerWeaponAP}</p>
      </div>
      <div>
        <h2>Enemy Stats</h2>
        <p>Health: {enemyHP}</p>
        <p>Attack: {enemyAP}</p>
      </div>
      <h2 style={{ height: "20px" }}>{message}</h2>

      <div style={{ margin: '20px 0' }}>
        <div
          style={{
            width: '100%',
            height: '30px',
            backgroundColor: '#ccc',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `${sliderPosition}%`,
              width: '10px',
              height: '30px',
              backgroundColor: 'red',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${targetRange.start}%`,
              width: `${targetRange.end - targetRange.start}%`,
              height: '30px',
              backgroundColor: 'green',
              opacity: 0.5,
            }}
          />
        </div>
      </div>
      {isFightWon === undefined && (
        <button onClick={handleAttack} disabled={!isRunning}>
          Attack
        </button>
      )}
      {isFightWon !== undefined && (
        <button onClick={() => onFightEnd(isFightWon)} >
          {isFightWon ? 'You won!' : 'You lost!'}
        </button>
      )}
    </div>
  );
};

export default Fighting;