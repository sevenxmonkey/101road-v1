export interface DataStoreContextType {
  /* Game Actions */
  gameStatus: GameStatus;
  gameDefeat: () => void;
  startGame: () => void;
  endGame: () => void;
  /* Player Actions */
  player: Player;
  hasExplored: boolean;
  driveNext: () => void;
  consumeSupply: (supplyId: string) => void;
  throwAwaySupply: (supplyId: string) => void;
  throwAwayWeapon: (weaponId: string) => void;
  explore: () => void;
  equipWeapon: (weaponId: string) => void;
  unequipWeapon: (weaponId: string) => void;
  wonFight: () => void;
  runAway: () => void;
  onFighting: () => void;
  /* Inventory */
  inventory: Inventory
  /** Fight */
  fight: Fight;
  /* Logs */
  logs: Event[];
}

export enum FightStatus {
  MeetEnemy = 'meetEnemy',
  Fighting = 'fighting',
  Won = 'won',
  Lost = 'lost',
  None = 'none',
}

export interface Fight {
  fightStatus: FightStatus;
  enemy?: Enemy;
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
  ThrowAwayWeapon = 'throwAwayWeapon',
  GameVictory = 'gameVictory',
  GameDefeat = 'gameDefeat',
  // Fight events
  MeetEnemy = 'meetEnemy',
  Fighting = 'fighting',
  FightWon = 'fightWon',
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
    ThrowAwayWeaponEvent?: {
      weapon: Weapon;
    },
    LootSupplyEvent?: {
      location: Location;
      supplies: { supply: Supply, quantity: number }[];
    },
    LootWeaponEvent?: {
      location: Location;
      weapon: Weapon;
    },
    EquipWeaponEvent?: {
      weapon: Weapon;
    },
    UnequipWeaponEvent?: {
      weapon: Weapon;
    },
    MeetEnemyEvent?: {
      location: Location;
      enemy: Enemy;
    },
    FightingEvent?: {
      location: Location;
      enemy: Enemy;
    },
    FightWonEvent?: {
      location: Location;
      enemy?: Enemy;
    },
  }
}

export interface Enemy {
  name: string;
  hp: number; /* Health Points */
  ap: number; /* Attack Points */
  description: string;
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