import React, { createContext, useContext, ReactNode } from 'react';
import { DataStoreContextType, Player, Supply, Weapon, } from '../interfaces';

const DataStoreContext = createContext<DataStoreContextType | undefined>(undefined);

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
const initialLocations = [
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

export const DataStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const contextValue: DataStoreContextType = {
    GameStatus: 'mainMenu',
    Player: initialPlayer,
    Locations: initialLocations,
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