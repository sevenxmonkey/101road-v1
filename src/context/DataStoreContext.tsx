import React, { createContext, useContext, ReactNode, useState } from 'react';
import { DataStoreContextType, GameStatus, Player } from '../interfaces';
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
const initialGameState = {
  Player: initialPlayer,
  GameStatus: GameStatus.MainMenu,
  Locations: DATA_LOCATIONS,
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

  const gameDefeat = () => {
    setGameState({
      ...initialGameState,
      GameStatus: GameStatus.Defeat,
    });
  }

  const driveNext = () => {
    const currentLocationIndex = DATA_LOCATIONS.indexOf(gameState.Player.currentLocation);
    if (currentLocationIndex === DATA_LOCATIONS.length - 1) {
      gameVictory();
    } else {
      const newHp = gameState.Player.hp - (Math.floor(Math.random() * 10) + 10);
      if (newHp <= 0) {
        gameDefeat();
      } else {
        setGameState({
          ...gameState,
          Player: {
            ...gameState.Player,
            currentLocation: DATA_LOCATIONS[currentLocationIndex + 1],
            hp: newHp,
          },
        });
      }
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