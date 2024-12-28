import { Weapon } from "../../interfaces";
import { getRandomInt } from "../utils";

const DATA_WEAPONS: Weapon[] = [
  {
    id: "weapon_001",
    name: "Baseball Bat",
    description: "A sturdy bat that’s easy to swing and effective for smashing zombie skulls.",
    ap: 10
  },
  {
    id: "weapon_002",
    name: "Kitchen Knife",
    description: "A sharp but short-range weapon. Useful in close combat but risky.",
    ap: 8
  },
  {
    id: "weapon_003",
    name: "Crowbar",
    description: "A versatile tool that doubles as a reliable melee weapon. Durable and powerful.",
    ap: 12
  },
  {
    id: "weapon_004",
    name: "Handgun",
    description: "A small firearm with moderate power. Effective at medium range.",
    ap: 15
  },
  {
    id: "weapon_005",
    name: "Shotgun",
    description: "A devastating weapon for close-range combat. Highly effective but consumes ammo quickly.",
    ap: 25
  },
  {
    id: "weapon_006",
    name: "Molotov Cocktail",
    description: "An improvised incendiary weapon. Deals area damage and sets zombies ablaze.",
    ap: 20
  },
  {
    id: "weapon_007",
    name: "Axe",
    description: "A heavy-duty axe capable of splitting both wood and zombie heads.",
    ap: 18
  },
  {
    id: "weapon_008",
    name: "Sniper Rifle",
    description: "A long-range firearm with high accuracy and powerful shots. Ideal for picking off zombies from a distance.",
    ap: 30
  },
  {
    id: "weapon_009",
    name: "Chainsaw",
    description: "A terrifying melee weapon that can shred multiple zombies at once. Consumes fuel.",
    ap: 35
  },
  {
    id: "weapon_010",
    name: "Pipe Wrench",
    description: "A heavy wrench that delivers strong, crushing blows. Reliable and durable.",
    ap: 12
  },
  {
    id: "weapon_011",
    name: "Crossbow",
    description: "A silent ranged weapon that’s great for avoiding attention. Ammo is reusable.",
    ap: 15
  },
  {
    id: "weapon_012",
    name: "Katana",
    description: "A sharp and fast blade with legendary slicing power. Requires skill to use effectively.",
    ap: 20
  },
  {
    id: "weapon_013",
    name: "Brick",
    description: "A basic throwable weapon. Minimal damage but useful in a pinch.",
    ap: 5
  },
  {
    id: "weapon_014",
    name: "Flamethrower",
    description: "A powerful weapon that engulfs zombies in flames. Consumes large amounts of fuel.",
    ap: 40
  },
  {
    id: "weapon_015",
    name: "Improvised Spear",
    description: "A makeshift weapon made from a sharpened stick or pipe. Useful for keeping zombies at bay.",
    ap: 8
  }
];

export function generateRandomWeapon(): Weapon {
  const randomIndex = getRandomInt(0, DATA_WEAPONS.length - 1);
  return DATA_WEAPONS[randomIndex];
}