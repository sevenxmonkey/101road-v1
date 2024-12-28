import React from 'react';
import { useDataStore } from '../../context/DataStoreContext';
import AppMainMenu from '../AppMainMenu';
import AppPlaying from '../AppPlaying';
import AppGameOver from '../AppGaveOver';

import './App.scss';

const App: React.FC = () => {
  const { gameStatus } = useDataStore();
  const getGameComponent = () => {
    if (gameStatus === 'mainMenu') {
      return <AppMainMenu />;
    } else if (gameStatus === 'playing') {
      return <AppPlaying />;
    } else {
      return <AppGameOver />;
    }
  }
  return (
    <div className='container'>
      {getGameComponent()}
    </div>
  )

};

export default App;