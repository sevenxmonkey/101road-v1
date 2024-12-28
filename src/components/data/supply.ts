import { Supply } from "../../interfaces";
import { getRandomInt } from "../utils";

const DATA_SUPPLIES_FOOD: Supply[] = [
  {
    id: "food_001",
    name: "Canned Beans",
    hp: 15,
    description: "A reliable source of nutrition. Restores a decent amount of health and hunger."
  },
  {
    id: "food_002",
    name: "Dried Meat",
    hp: 10,
    description: "Lightweight and long-lasting. Restores moderate health but requires water to digest efficiently."
  },
  {
    id: "food_003",
    name: "Energy Bar",
    hp: 8,
    description: "A quick snack that restores a small amount of health and energy."
  },
  {
    id: "food_004",
    name: "Fresh Bread",
    hp: 12,
    description: "A rare find in the apocalypse. Restores health and reduces hunger significantly."
  },
  {
    id: "food_005",
    name: "Instant Noodles",
    hp: 10,
    description: "Quick and easy to prepare if you have water. Restores health and thirst slightly."
  },
  {
    id: "food_006",
    name: "Jerky Pack",
    hp: 8,
    description: "Tough but satisfying. Restores a small amount of health but is very portable."
  },
  {
    id: "food_007",
    name: "Bag of Rice",
    hp: 20,
    description: "Can be cooked for a nutritious meal. Restores a significant amount of health when prepared properly."
  },
  {
    id: "food_008",
    name: "MRE (Meal Ready-to-Eat)",
    hp: 25,
    description: "A military-grade survival meal. Highly effective at restoring health and hunger."
  },
  {
    id: "food_009",
    name: "Stale Crackers",
    hp: 5,
    description: "Barely edible, but better than nothing. Restores a small amount of health."
  },
  {
    id: "food_010",
    name: "Rotten Fruit",
    hp: -5,
    description: "Spoiled and potentially harmful. Eating this could reduce health instead of restoring it."
  },
  {
    id: "food_011",
    name: "Bottle of Water",
    hp: 0,
    description: "Does not restore health but quenches thirst and aids digestion."
  },
  {
    id: "food_012",
    name: "Chocolate Bar",
    hp: 10,
    description: "A small treat that restores health and provides a temporary morale boost."
  },
  {
    id: "food_013",
    name: "Canned Soup",
    hp: 15,
    description: "A hearty meal in a can. Restores health and thirst in one go."
  },
  {
    id: "food_014",
    name: "Fresh Vegetables",
    hp: 18,
    description: "A rare but healthy find. Restores health and slightly boosts energy."
  },
  {
    id: "food_015",
    name: "Bag of Chips",
    hp: 8,
    description: "Crunchy and satisfying, but not very nutritious. Restores health slightly."
  }
];

export function generateRandomSupplies(): { supply: Supply, quantity: number }[] {
  const numberOfSupplies = getRandomInt(1, 3);
  const selectedSupplies: { supply: Supply, quantity: number }[] = [];

  for (let i = 0; i < numberOfSupplies; i++) {
    const randomSupply = DATA_SUPPLIES_FOOD[getRandomInt(0, DATA_SUPPLIES_FOOD.length - 1)];
    const quantity = getRandomInt(1, 5);
    selectedSupplies.push({ supply: randomSupply, quantity });
  }

  return selectedSupplies;
}