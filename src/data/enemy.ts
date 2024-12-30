import { Enemy } from "../interfaces";

const DATA_ENEMIES = [
  {
    id: "enemy_001",
    name: "Shambler",
    ap: 5,
    hp: 10,
    description: "A slow-moving zombie. Not very threatening alone but dangerous in groups."
  },
  {
    id: "enemy_002",
    name: "Sprinter",
    ap: 10,
    hp: 10,
    description: "A fast and aggressive zombie. Deals quick damage but is less durable."
  },
  {
    id: "enemy_003",
    name: "Mutant Brute",
    ap: 20,
    hp: 10,
    description: "A heavily mutated zombie with enhanced strength and resilience. Hard to take down."
  },
  {
    id: "enemy_004",
    name: "Scavenger",
    ap: 8,
    hp: 10,
    description: "A desperate survivor who will ambush for supplies. Lightly armed and unorganized."
  },
  {
    id: "enemy_005",
    name: "Bandit Leader",
    ap: 15,
    hp: 10,
    description: "A ruthless leader of bandits, armed with better weapons and tactics."
  },
  {
    id: "enemy_006",
    name: "Feral Dog",
    ap: 6,
    hp: 10,
    description: "An aggressive animal scavenging for food. Fast but not very strong."
  },
  {
    id: "enemy_007",
    name: "Infected Bear",
    ap: 25,
    hp: 10,
    description: "A zombified bear with massive strength. A formidable opponent in close combat."
  },
  {
    id: "enemy_008",
    name: "Cannibal Raider",
    ap: 12,
    hp: 10,
    description: "A survivor turned cannibal. Uses crude weapons but is highly aggressive."
  },
  {
    id: "enemy_009",
    name: "Swarm of Wasps",
    ap: 4,
    hp: 10,
    description: "A dangerous swarm of mutated wasps. Difficult to fight directly, but avoidable."
  },
  {
    id: "enemy_010",
    name: "Abomination",
    ap: 30,
    hp: 10,
    description: "A grotesque amalgamation of flesh and bones. It’s slow but deals massive damage."
  },
  {
    id: "enemy_011",
    name: "Warlord",
    ap: 20,
    hp: 10,
    description: "The leader of a hostile survivor faction. Equipped with heavy armor and deadly weapons."
  },
  {
    id: "enemy_012",
    name: "Stalker",
    ap: 10,
    hp: 10,
    description: "A stealthy predator that lurks in the shadows, waiting for the right moment to strike."
  },
  {
    id: "enemy_013",
    name: "Zombie Horde",
    ap: 15,
    hp: 10,
    description: "A group of zombies attacking together. Overwhelms through sheer numbers."
  },
  {
    id: "enemy_014",
    name: "Pyromaniac",
    ap: 18,
    hp: 10,
    description: "A deranged survivor armed with fire-based weapons, dangerous in confined areas."
  }
];

export const generateRandomEnemy = (): Enemy => {
  const randomIndex = Math.floor(Math.random() * DATA_ENEMIES.length);
  return DATA_ENEMIES[randomIndex];
}