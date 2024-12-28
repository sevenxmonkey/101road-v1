import React, { createContext, useContext, ReactNode, useState } from 'react';
import { DataStoreContextType, GameStatus, Player, Supply, Weapon, Location } from '../interfaces';

const initalWeapons: Weapon[] = [
  { name: 'Fist', ap: 1 },
  { name: 'Knife', ap: 5 },
  { name: 'Sword', ap: 10 },
  { name: 'Axe', ap: 15 },
]
const initalSupplies: Supply[] = [
  { name: 'Health Potion', hp: 10 },
  { name: 'Bandage', hp: 5 },
  { name: 'Medkit', hp: 25 },
]
const initialLocations: Location[] = [
  {
    name: 'Town 1',
    description: 'This is the first town',
    event: {
      name: 'Town 1 event',
      description: 'This is the first town event',
      supplies: initalSupplies,
      weapons: initalWeapons,
    },
  },
  {
    name: 'Town 2',
    description: 'This is the second town',
    event: {
      name: 'Town 2 event',
      description: 'This is the second town event',
      supplies: initalSupplies,
      weapons: initalWeapons,
    },
  },
  {
    name: 'Town 3',
    description: 'This is the third town',
    event: {
      name: 'Town 3 event',
      description: 'This is the third town event',
      supplies: initalSupplies,
      weapons: initalWeapons,
    },
  },
]
const initialPlayer: Player = {
  name: 'Seven X',
  hp: 100, xp: 0, ap: 10,
  inventory: {
    weapons: initalWeapons,
    supplies: initalSupplies,
  },
  equipped: { name: 'Fist', ap: 1 },
  currentLocation: initialLocations[0],
}
const initialGameState = {
  Player: initialPlayer,
  GameStatus: GameStatus.MainMenu,
  Locations: initialLocations,
}

const DataStoreContext = createContext<DataStoreContextType | undefined>(undefined);

export const DataStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState(initialGameState);

  const startGame = () => {
    setGameState({
      ...initialGameState,
      GameStatus: GameStatus.Playing,
    });
  }

  const endGame = () => {
    setGameState({
      ...initialGameState,
      GameStatus: GameStatus.MainMenu,
    });
  }

  const gameVictory = () => {
    setGameState({
      ...initialGameState,
      GameStatus: GameStatus.Victory,
    });
  }

  const driveNext = () => {
    const currentLocationIndex = initialLocations.indexOf(gameState.Player.currentLocation);
    if (currentLocationIndex === initialLocations.length - 1) {
      gameVictory();
    } else {
      setGameState({
        ...gameState,
        Player: {
          ...gameState.Player,
          currentLocation: initialLocations[currentLocationIndex + 1],
        },
      });
    }

  }

  const contextValue: DataStoreContextType = {
    GameState: gameState,
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