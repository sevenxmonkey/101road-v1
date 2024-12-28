import React, { createContext, useContext, ReactNode } from 'react';
import { DataStoreContextType, } from '../interfaces';

const DataStoreContext = createContext<DataStoreContextType | undefined>(undefined);

export const DataStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const contextValue: DataStoreContextType = {
    Player: {
      name: 'Seven X',
    },
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