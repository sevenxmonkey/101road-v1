import React, { createContext, useContext, ReactNode, useState } from 'react';
import { DataStoreContextType, GameStatus, Player, Event, EventType } from '../interfaces';
import { DATA_LOCATIONS } from '../components/data/location';

const initialPlayer: Player = {
  name: 'Seven X',
  hp: 100, xp: 0, ap: 20,
  inventory: {
    weapons: [],
    supplies: [],
  },
  currentLocation: DATA_LOCATIONS[0],
}

const DataStoreContext = createContext<DataStoreContextType | undefined>(undefined);

export const DataStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [player, setPlayer] = useState(initialPlayer);
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

  const contextValue: DataStoreContextType = {
    // Data
    player,
    gameStatus,
    // logs
    logs,
    // Game Actions
    startGame,
    endGame,
    driveNext
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