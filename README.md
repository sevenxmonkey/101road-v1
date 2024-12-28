# Road 101
Road 101 is a post-apocalyptic survival game where players navigate through various locations, manage resources, and combat enemies to reach a safe haven. The game is built using React and TypeScript, and it leverages Vite for fast development and build processes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Game Mechanics](#game-mechanics)
  - [Player Actions](#player-actions)
  - [Game Actions](#game-actions)
  - [Inventory](#inventory)
  - [Logs](#logs)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/road-101.git
    cd road-101
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

To start the development server, run:
```sh
npm run dev
```

To build the project for production, run:
```sh
npm run build
```

To preview the production build, run:
```sh
npm run preview
```

## Game Mechanics
### Player Actions
- **Drive North**: Move to the next location.
- **Consume Supply**: Use a supply item to restore health.
- **Loot Supply**: Search the current location for supplies.

### Game Actions
- **Start Game**: Begin a new game session.
- **End Game**: End the current game session.

### Inventory
- **Weapons**: Manage the weapons the player has collected.
- **Supplies**: Manage the supplies the player has collected.

### Logs
The game maintains a log of events that occur during gameplay, such as moving to a new location, looting supplies, and consuming supplies.