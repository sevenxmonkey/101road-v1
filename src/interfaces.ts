export interface DataStoreContextType {
  /* Game Actions */
  gameStatus: GameStatus;
  startGame: () => void;
  endGame: () => void;
  /* Player Actions */
  player: Player;
  driveNext: () => void;
  /* Logs */
  logs: Event[];
}

export enum GameStatus {
  MainMenu = 'mainMenu',
  Playing = 'playing',
  Defeat = 'Defeat',
  Victory = 'victory',
}

export interface Player {
  name: string;
  /* Player Stats */
  hp: number; /* Health Points */
  xp: number; /* Experience Points */
  ap: number; /* Attack Points */
  /* Player Inventory */
  inventory: {
    weapons: { weapon: Weapon; quantity: number }[];
    supplies: { supply: Supply; quantity: number }[];
  };
  equipped?: Weapon;
  currentLocation: Location;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  mileageToSF: number;
  dangerIndex: number;
  supplyIndex: number;
}

export enum EventType {
  Driving = 'driving',
  Arrived = 'arrived',
  DeductHP = 'deductHP',
  Explore = 'explore',
  ConsumeSupply = 'consumeSupply',
  FoundSupply = 'foundSupply',
  FoundWeapon = 'foundWeapon',
  GameVictory = 'gameVictory',
  GameDefeat = 'gameDefeat',
}

export interface Event {
  type: EventType;
  message: string;
  // startTime: number;
  // endTime: number;
  data: {
    DrivingEvent?: {
      from: Location;
      to: Location;
    },
    ArrivedEvent?: {
      location: Location;
    },
    DeductHPEvent?: {
      hp: number;
    },
  }
}

export interface Enemy {
  name: string;
  hp: number; /* Health Points */
  ap: number; /* Attack Points */
  xp: number; /* Experience Points */
}

export interface Weapon {
  id: string;
  name: string;
  description: string;
  ap: number;
}

export interface Supply {
  id: string;
  name: string;
  hp: number;
  description: string;
}