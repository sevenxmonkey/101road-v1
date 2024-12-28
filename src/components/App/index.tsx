import React from 'react';
import { useDataStore } from '../../context/DataStoreContext';
import AppMainMenu from '../AppMainMenu';
import AppPlaying from '../AppPlaying';
import AppGameOver from '../AppGaveOver';

import './App.scss';

const App: React.FC = () => {
  const { GameState } = useDataStore();
  const { GameStatus } = GameState;
  if (GameStatus === 'mainMenu') {
    return <AppMainMenu />;
  } else if (GameStatus === 'playing') {
    return <AppPlaying />;
  } else {
    return <AppGameOver />;
  }
};

export default App;