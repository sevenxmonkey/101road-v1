import React from 'react';
import { useDataStore } from '../../context/DataStoreContext';

const App: React.FC = () => {
  return (
    <div className="container">
      Player name: {useDataStore().Player.name}
    </div>
  );
};

export default App;