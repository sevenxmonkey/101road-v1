import React from 'react';
import { useDataStore } from '../../context/DataStoreContext';

import './App.scss';

const App: React.FC = () => {
  const { Player, GameStatus } = useDataStore();
  return (
    <div className="container">
      <div className='game-status-container'>GameStatus: {GameStatus} </div>
      <button>Start game</button><button>End game</button>
      <div className='player-contaner'>
        <div>Name: {Player.name}</div>
        <div>Equipped: {Player.equipped.name} - {Player.equipped.ap} </div>
        <div>Current location: {Player.currentLocation.name} - {Player.currentLocation.description}</div>
        <hr></hr>
        <div>
          <div>Attribute</div>
          <div>hp: {Player.hp}</div>
          <div>xp: {Player.xp}</div>
          <div>ap: {Player.ap}</div>
        </div>
        <hr></hr>
        <div>
          <div>Weapons</div>
          {Player.inventory.weapons.map((weapon, index) => (
            <div key={index}>{weapon.name} - {weapon.ap}</div>
          ))}
          <hr></hr>
          <div>Supplies</div>
          {Player.inventory.supplies.map((supply, index) => (
            <div key={index}>{supply.name} - {supply.hp}</div>
          ))}
        </div>
      </div>
      <div className='locations-container'></div>
      <div className='action-container'>

        <button>Drive to next town</button>
        <button>Explore town</button>
      </div>
      <div>Event logs</div>
    </div>
  );
};

export default App;