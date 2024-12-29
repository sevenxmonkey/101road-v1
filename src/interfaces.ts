export interface DataStoreContextType {
  /* Game Actions */
  gameStatus: GameStatus;
  startGame: () => void;
  endGame: () => void;
  /* Player Actions */
  player: Player;
  hasLooted: boolean;
  driveNext: () => void;
  consumeSupply: (supplyId: string) => void;
  throwAwaySupply: (supplyId: string) => void;
  lootSupply: () => void;
  /* Inventory */
  inventory: Inventory
  /* Logs */
  logs: Event[];
}

export interface Inventory {
  weapons: { weapon: Weapon; quantity: number }[];
  supplies: { supply: Supply; quantity: number }[];
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
  ThrowAwaySupply = 'throwAwaySupply',
  LootSupply = 'lootSupply',
  LootWeapon = 'foundWeapon',
  EquipWeapon = 'equipWeapon',
  UnequipWeapon = 'unequipWeapon',
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
    ConsumeSupplyEvent?: {
      supply: Supply;
    },
    ThrowAwaySupplyEvent?: {
      supply: Supply;
    }
    LootSupplyEvent?: {
      location: Location;
      supplies: { supply: Supply, quantity: number }[];
    },
    LootWeaponEvent?: {
      location: Location;
      weapon: Weapon;
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