export interface DataStoreContextType {
  Player: Player;
  GameStatus: 'mainMenu' | 'playing' | 'gameover' | 'victory';
  Locations: Location[];
}

export interface Player {
  name: string;
  /* Player Stats */
  hp: number; /* Health Points */
  xp: number; /* Experience Points */
  ap: number; /* Attack Points */
  /* Player Inventory */
  inventory: {
    weapons: Weapon[];
    supplies: Supply[];
  };
  equipped: Weapon;
  currentLocation: Location;
}

export interface Location {
  name: string;
  description: string;
  event: Event;
}

export interface Event {
  name: string;
  description: string;
  enemy?: Enemy;
  supplies?: Supply[];
  weapons?: Weapon[];
}

export interface Enemy {
  name: string;
  hp: number; /* Health Points */
  ap: number; /* Attack Points */
  xp: number; /* Experience Points */
}

export interface Weapon {
  name: string;
  ap: number; /* Attack Points */
}

export interface Supply {
  name: string;
  hp: number; /* Health Points */
}