import React, { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { DataStoreContextType, GameStatus, Player, Event, EventType, Inventory } from '../interfaces';
import { DATA_LOCATIONS } from '../components/data/location';
import { generateRandomSupplies } from '../components/data/supply';
import { generateRandomWeapon } from '../components/data/weapon';

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

  const hasLooted = useMemo(() =>
    Boolean(logs.find(log =>
      log.type === EventType.LootSupply && log.data?.LootSupplyEvent?.location.id === player.currentLocation.id
    )), [logs, player]);

  const lootSupply = () => {
    // check if the player has already looted the location
    if (hasLooted) {
      return;
    }

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
    hasLooted,
    // Platyer actions
    driveNext,
    consumeSupply,
    throwAwaySupply,
    lootSupply,
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