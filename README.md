# Filter.AI

An AI-powered website and application builder that allows users to generate apps, websites, landing pages, and presentations in one place.

---

## MindMesh - Puzzle Game

**MindMesh** is a high-quality HTML5 puzzle game inspired by Block Blast, featuring innovative "mesh combo" mechanics and strategic gameplay.

### 🎮 Game Overview

MindMesh is an addictive puzzle game where players match and clear colored blocks on an 8x8 grid. The game combines classic match-3 mechanics with strategic power-ups, chain reactions, and a unique "mesh combo" system for advanced play.

**Key Features**:
- 🎯 Intuitive tap-to-clear gameplay
- 💥 Power-ups (Bombs, Line Clears, Color Bombs)
- ⛓️ Chain reaction system with multipliers
- 🏆 100+ levels with varied objectives
- 🎨 Beautiful visuals and satisfying animations
- 🔊 Immersive audio and sound effects
- 📊 Progression system with upgrades and achievements
- 🌟 Daily challenges and missions (v1.2+)

### 📚 Documentation

- **[DESIGN.md](./DESIGN.md)** - Complete game design document with mechanics, scoring, and features
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture and implementation details
- **[ROADMAP.md](./ROADMAP.md)** - Version history and feature roadmap (v0.1 → v3.0)

### 🚀 Quick Start

#### Prerequisites
- Node.js 16+ and npm

#### Installation

```bash
# Clone the repository
git clone https://github.com/khajaaijaz26/Filter.AI.git
cd Filter.AI

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:8080`

#### Build for Production

```bash
# Create optimized production build
npm run build

# Output will be in dist/ folder
```

### 🎯 Current Status

**Version**: v0.1 (Prototype in development)

**Completed**:
- ✅ Project documentation (DESIGN, ARCHITECTURE, ROADMAP)
- ✅ Project structure defined
- 🔄 Core game engine (in progress)

**Next Steps**:
- Grid system implementation
- Block matching algorithm
- Basic rendering
- Input handling

See [ROADMAP.md](./ROADMAP.md) for complete version plan.

### 🛠️ Technology Stack

- **Runtime**: JavaScript (ES6+)
- **Rendering**: HTML5 Canvas
- **Build Tool**: Webpack 5
- **Testing**: Jest
- **Linting**: ESLint
- **Backend**: Node.js/Express (for v2.0+ features)

### 📁 Project Structure

```
Filter.AI/
├── src/                    # Source code
│   ├── main.js            # Entry point
│   ├── core/              # Core systems
│   │   ├── GameManager.js
│   │   ├── SceneManager.js
│   │   ├── Renderer.js
│   │   ├── InputManager.js
│   │   ├── AudioManager.js
│   │   └── SaveManager.js
│   ├── game/              # Game logic
│   │   ├── Grid.js
│   │   ├── Block.js
│   │   ├── MatchEngine.js
│   │   ├── ScoreSystem.js
│   │   ├── PowerUpSystem.js
│   │   └── ChainDetector.js
│   ├── scenes/            # Game scenes
│   │   ├── MenuScene.js
│   │   ├── GameScene.js
│   │   └── LevelMapScene.js
│   ├── config/            # Configuration
│   │   └── GameConfig.js
│   └── utils/             # Utilities
├── assets/                # Game assets
│   ├── images/
│   ├── audio/
│   └── data/
│       └── levels/
├── dist/                  # Built files (generated)
├── tests/                 # Test files
├── docs/                  # Documentation
├── package.json
├── webpack.config.js
├── DESIGN.md
├── ARCHITECTURE.md
├── ROADMAP.md
└── README.md
```

### 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### 📝 Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run test         # Run unit tests
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
```

### 🎮 How to Play

1. **Objective**: Match 3 or more connected blocks of the same color to clear them
2. **Controls**: Tap/click on a group of matching blocks to select and clear
3. **Scoring**: Larger matches and chain reactions earn higher scores
4. **Power-Ups**: Create special blocks by matching 6+ blocks
5. **Win Condition**: Complete level objectives within the move limit

### 🏗️ Development Roadmap

- **v0.1** (Week 1-2): Prototype - Core mechanics playable
- **v0.5** (Week 3-4): Alpha - 10 levels, progression system
- **v1.0** (Week 5-8): MVP - 100 levels, full features, polish
- **v2.0+** (Week 17+): Mesh Combos, new game modes, backend features

See [ROADMAP.md](./ROADMAP.md) for detailed version plans.

### 🤝 Contributing

This project is under active development. Contributions are welcome!

### 📄 License

ISC License

### 👤 Author

Shaik Khaja Aijaz Ahmed

---

## Original Filter.AI Project

The original Filter.AI backend (user authentication, etc.) is preserved in this repository. The MindMesh game is being developed as an additional feature/project within this repo.