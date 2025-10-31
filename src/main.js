/**
 * MindMesh - Main Entry Point
 * Block Blast-inspired puzzle game
 */
import './styles/main.css';
import { GameManager } from './core/GameManager.js';
import { GameScene } from './scenes/GameScene.js';
import GameConfig from './config/GameConfig.js';

// Main application class
class MindMeshGame {
  constructor() {
    this.canvas = null;
    this.gameManager = null;
    this.loadingScreen = null;
    this.loadingProgress = null;
  }

  /**
   * Initialize the game
   */
  async init() {
    console.log('🎮 MindMesh - Initializing...');
    
    // Get canvas and loading screen
    this.canvas = document.getElementById('game-canvas');
    this.loadingScreen = document.getElementById('loading-screen');
    this.loadingProgress = document.getElementById('loading-progress');
    
    if (!this.canvas) {
      console.error('Canvas element not found!');
      return;
    }

    // Set canvas size
    this.setupCanvas();

    // Update loading progress
    this.updateLoadingProgress(20);

    // Create game manager
    this.gameManager = new GameManager(this.canvas);
    this.updateLoadingProgress(40);

    // Register scenes
    const gameScene = new GameScene();
    this.gameManager.registerScene('game', gameScene);
    this.updateLoadingProgress(60);

    // Setup window resize handler
    window.addEventListener('resize', () => {
      this.setupCanvas();
      this.gameManager.handleResize();
    });
    this.updateLoadingProgress(80);

    // Wait a moment for dramatic effect
    await this.delay(500);
    this.updateLoadingProgress(100);

    // Hide loading screen
    await this.delay(200);
    this.hideLoadingScreen();

    // Start game
    this.start();
  }

  /**
   * Setup canvas size
   */
  setupCanvas() {
    const container = this.canvas.parentElement;
    const maxWidth = Math.min(window.innerWidth, GameConfig.CANVAS.WIDTH);
    const maxHeight = Math.min(window.innerHeight, GameConfig.CANVAS.HEIGHT);
    
    // Maintain aspect ratio
    const aspectRatio = GameConfig.CANVAS.WIDTH / GameConfig.CANVAS.HEIGHT;
    let width = maxWidth;
    let height = width / aspectRatio;
    
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * Update loading progress bar
   */
  updateLoadingProgress(percent) {
    if (this.loadingProgress) {
      this.loadingProgress.style.width = `${percent}%`;
    }
  }

  /**
   * Hide loading screen
   */
  hideLoadingScreen() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('hidden');
    }
  }

  /**
   * Start the game
   */
  start() {
    console.log('🎮 MindMesh - Starting game...');
    
    // Change to game scene
    this.gameManager.changeScene('game');
    
    // Start game loop
    this.gameManager.start();
    
    console.log('🎮 MindMesh - Game running!');
    console.log('📖 Controls: Click on groups of 3+ matching blocks to clear them');
    console.log('🎯 Goal: Reach the target score before running out of moves');
    console.log('💥 Match 6+ blocks to create power-ups!');
  }

  /**
   * Utility: Delay for async operations
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Start the game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startGame);
} else {
  startGame();
}

function startGame() {
  const game = new MindMeshGame();
  game.init().catch(error => {
    console.error('Failed to initialize game:', error);
    document.body.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-family: Arial, sans-serif;
        color: white;
        text-align: center;
        padding: 20px;
      ">
        <div>
          <h1>😢 Failed to Load MindMesh</h1>
          <p>${error.message}</p>
          <button onclick="location.reload()" style="
            padding: 10px 20px;
            font-size: 16px;
            background: white;
            color: #667eea;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
          ">Reload</button>
        </div>
      </div>
    `;
  });
}

// Prevent default touch behaviors on canvas
document.addEventListener('touchmove', (e) => {
  if (e.target.tagName === 'CANVAS') {
    e.preventDefault();
  }
}, { passive: false });

// Expose game to window for debugging
if (GameConfig.DEBUG.ENABLED) {
  window.MindMesh = {
    config: GameConfig
  };
}
