import React, { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { DataStoreContextType, GameStatus, Player, Event, EventType, Inventory, FightStatus } from '../interfaces';
import { DATA_LOCATIONS } from '../data/location';
import { generateRandomSupplies } from '../data/supply';
import { generateRandomWeapon } from '../data/weapon';
import { generateRandomEnemy } from '../data/enemy';

const initialPlayer: Player = {
  name: 'Seven X',
  hp: 100, xp: 0, ap: 20,
  currentLocation: DATA_LOCATIONS[0],
}

const DataStoreContext = createContext<DataStoreContextType | undefined>(undefined);

export const DataStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [player, setPlayer] = useState(initialPlayer);
  const [inventory, setInventory] = useState<Inventory>({
    weapons: [],
    supplies: generateRandomSupplies()
  });
  const [fight, setFight] = useState({ fightStatus: FightStatus.None });

  const [gameStatus, setGameStatus] = useState(GameStatus.MainMenu);
  const [logs, setLogs] = useState<Event[]>([]);

  // Game control
  const startGame = () => setGameStatus(GameStatus.Playing);
  const endGame = () => resetAll();
  const gameVictory = () => setGameStatus(GameStatus.Victory);
  const gameDefeat = () => setGameStatus(GameStatus.Defeat);
  const resetAll = () => {
    setPlayer(initialPlayer);
    setGameStatus(GameStatus.MainMenu);
    setLogs([]);
    setInventory({ weapons: [], supplies: generateRandomSupplies() })
  }

  const driveNext = () => {
    const events: Event[] = []
    const currentLocationIndex = DATA_LOCATIONS.indexOf(player.currentLocation);
    if (currentLocationIndex === DATA_LOCATIONS.length - 1) {
      gameVictory();
      // TODO: Add a log for this event
    } else {
      const from = player.currentLocation;
      const to = DATA_LOCATIONS[currentLocationIndex + 1];
      events.push({
        type: EventType.Driving,
        message: `Heading from ${from.name} to ${to.name}`,
        data: { DrivingEvent: { from, to } }
      })

      const deducHP = Math.floor(Math.random() * 10) + 10;
      events.push({
        type: EventType.DeductHP,
        message: `Deducting ${deducHP} HP`,
        data: { DeductHPEvent: { hp: deducHP } }
      });
      const newHp = player.hp - (Math.floor(Math.random() * 10) + 10);
      if (newHp <= 0) {
        gameDefeat();
        // TODO: Add a log for this event
      } else {
        setPlayer({ ...player, currentLocation: to, hp: newHp });
        events.push({
          type: EventType.Arrived,
          message: `Arrived at ${to.name}`,
          data: { ArrivedEvent: { location: to } }
        })
      }
    }
    setLogs([...logs, ...events]);
  }

  const throwAwaySupply = (supplyId: string) => {
    const supply = inventory.supplies.find(s => s.supply.id === supplyId);
    if (supply) {
      // Deduct the supply from the inventory
      const newSupplies = inventory.supplies.map(s => {
        if (s.supply.id === supplyId) {
          return { supply: s.supply, quantity: supply.quantity - 1 }
        }
        return s;
      }).filter(s => s.quantity > 0);
      setInventory({ ...inventory, supplies: newSupplies });

      // Add a log for this event
      const throwAwaySupplyEvent: Event = {
        type: EventType.ThrowAwaySupply,
        message: `Throwing away 1 ${supply.supply.name}`,
        data: { ThrowAwaySupplyEvent: { supply: supply.supply } }
      }
      setLogs([...logs, throwAwaySupplyEvent]);
    }
  }

  const equipWeapon = (weaponId: string) => {
    const weapon = inventory.weapons.find(w => w.weapon.id === weaponId);
    if (weapon) {
      setPlayer({ ...player, equipped: weapon.weapon });

      // Add a log for this event
      const equipWeaponEvent: Event = {
        type: EventType.EquipWeapon,
        message: `Equipping 1 ${weapon.weapon.name}`,
        data: { EquipWeaponEvent: { weapon: weapon.weapon } }
      }
      setLogs([...logs, equipWeaponEvent]);
    }
  }

  const unequipWeapon = () => {
    if (player.equipped) {
      setPlayer({ ...player, equipped: undefined });

      // Add a log for this event
      const unequipWeaponEvent: Event = {
        type: EventType.UnequipWeapon,
        message: `Unequipping 1 ${player.equipped.name}`,
        data: { UnequipWeaponEvent: { weapon: player.equipped } }
      }
      setLogs([...logs, unequipWeaponEvent]);
    }
  }

  const throwAwayWeapon = (weaponId: string) => {
    const weapon = inventory.weapons.find(w => w.weapon.id === weaponId);
    if (weapon) {
      // Deduct the weapon from the inventory
      const newWeapons = inventory.weapons.map(w => {
        if (w.weapon.id === weaponId) {
          return { weapon: w.weapon, quantity: weapon.quantity - 1 }
        }
        return w;
      }).filter(w => w.quantity > 0);
      setInventory({ ...inventory, weapons: newWeapons });

      // Add a log for this event
      const throwAwayWeaponEvent: Event = {
        type: EventType.ThrowAwayWeapon,
        message: `Throwing away 1 ${weapon.weapon.name}`,
        data: { ThrowAwayWeaponEvent: { weapon: weapon.weapon } }
      }
      setLogs([...logs, throwAwayWeaponEvent]);
    }
  }

  const consumeSupply = (supplyId: string) => {
    const supply = inventory.supplies.find(s => s.supply.id === supplyId);
    if (supply) {
      // Deduct the supply from the inventory
      const newSupplies = inventory.supplies.map(s => {
        if (s.supply.id === supplyId) {
          return { supply: s.supply, quantity: supply.quantity - 1 }
        }
        return s;
      }).filter(s => s.quantity > 0);
      setInventory({ ...inventory, supplies: newSupplies });
      // Restore player HP
      const newHp = Math.min(player.hp + supply.supply.hp, 100);
      setPlayer({ ...player, hp: newHp });

      // Add a log for this event
      const consumeSupplyEvent: Event = {
        type: EventType.ConsumeSupply,
        message: `Consuming ${supply.supply.name} for ${supply.supply.hp} HP`,
        data: { ConsumeSupplyEvent: { supply: supply.supply } }
      }
      setLogs([...logs, consumeSupplyEvent]);
    }
  }

  const hasExplored = useMemo(() => {
    const hasFighted = logs.some(log => log.type === EventType.FightStart && log.data.FightStartEvent?.location.id === player.currentLocation.id);
    const hasLooted = logs.some(log => log.type === EventType.LootSupply && log.data.LootSupplyEvent?.location.id === player.currentLocation.id);
    return hasFighted || hasLooted;
  }, [player.currentLocation, logs]);

  const explore = () => {
    // check if the player has already looted the location
    if (hasExplored) {
      return;
    }
    // 50% chance of trigger a fight
    if (Math.random() < 0.8) {
      onStartFight()
    } else {
      lootSupply();
    }
  }

  const onStartFight = () => {
    const fightEvents: Event[] = [];
    const enemy = generateRandomEnemy();
    setFight({ fightStatus: FightStatus.Fighting });
    fightEvents.push({
      type: EventType.FightStart,
      message: `Encounter a ${enemy.name}`,
      data: {
        FightStartEvent: { enemy, location: player.currentLocation }
      }
    })
    setLogs([...logs, ...fightEvents]);
  }

  const lootSupply = () => {
    const lootEvents: Event[] = [];

    const newSupplies = generateRandomSupplies();
    const combinedSupplies = newSupplies.reduce((acc, newSupply) => {
      const existingSupply = acc.find(s => s.supply.id === newSupply.supply.id);
      if (existingSupply) {
        existingSupply.quantity += newSupply.quantity;
      } else {
        acc.push(newSupply);
      }
      return acc;
    }, [...inventory.supplies]);
    lootEvents.push({
      type: EventType.LootSupply,
      message: `Found ${newSupplies.map(s => s.supply.name).join(', ')}`,
      data: { LootSupplyEvent: { supplies: newSupplies, location: player.currentLocation } }
    })

    let combinedWeapons = [...inventory.weapons];
    if (Math.random() < 0.5) {
      const newWeapon = generateRandomWeapon();
      combinedWeapons = inventory.weapons.map(w => {
        if (w.weapon.id === newWeapon.id) {
          return { weapon: w.weapon, quantity: w.quantity + 1 };
        }
        return w;
      });
      if (!combinedWeapons.find(w => w.weapon.id === newWeapon.id)) {
        combinedWeapons.push({ weapon: newWeapon, quantity: 1 });
      }
      lootEvents.push(
        {
          type: EventType.LootWeapon,
          message: `Found weapon ${newWeapon.name}`,
          data: { LootWeaponEvent: { weapon: newWeapon, location: player.currentLocation } }
        }
      )
    }
    setInventory({ ...inventory, supplies: combinedSupplies, weapons: combinedWeapons });
    setLogs([...logs, ...lootEvents]);
  }

  const contextValue: DataStoreContextType = {
    // Data
    player,
    inventory,
    gameStatus,
    hasExplored,
    fight,
    // Platyer actions
    driveNext,
    consumeSupply,
    throwAwaySupply,
    explore,
    throwAwayWeapon,
    equipWeapon,
    unequipWeapon,
    // Game Actions
    startGame,
    endGame,
    // logs
    logs,
  };

  return (
    <DataStoreContext.Provider value={contextValue}>
      {children}
    </DataStoreContext.Provider>
  );
};

// Create a custom hook to use the DataStoreContext
export const useDataStore = (): DataStoreContextType => {
  const context = useContext(DataStoreContext);
  if (!context) {
    throw new Error('useDataStore must be used within a DataStoreProvider');
  }
  return context;
};