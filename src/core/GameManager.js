/**
 * GameManager - Main game coordinator
 */
import { Renderer } from './Renderer.js';
import { InputManager } from './InputManager.js';
import GameConfig from '../config/GameConfig.js';

export class GameManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.inputManager = new InputManager(canvas);
    
    this.currentScene = null;
    this.scenes = new Map();
    
    this.isRunning = false;
    this.isPaused = false;
    this.lastTime = 0;
    this.deltaTime = 0;
    this.fps = 0;
    this.frameCount = 0;
    this.fpsTime = 0;
    
    // Bind methods
    this.gameLoop = this.gameLoop.bind(this);
  }

  /**
   * Register a scene
   */
  registerScene(name, scene) {
    this.scenes.set(name, scene);
    scene.setManager(this);
  }

  /**
   * Change to a different scene
   */
  changeScene(name) {
    if (this.currentScene) {
      this.currentScene.onExit();
    }

    const scene = this.scenes.get(name);
    if (scene) {
      this.currentScene = scene;
      this.currentScene.onEnter();
    } else {
      console.error(`Scene "${name}" not found`);
    }
  }

  /**
   * Start the game loop
   */
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.gameLoop);
  }

  /**
   * Stop the game loop
   */
  stop() {
    this.isRunning = false;
  }

  /**
   * Pause the game
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * Resume the game
   */
  resume() {
    this.isPaused = false;
    this.lastTime = performance.now();
  }

  /**
   * Main game loop
   */
  gameLoop(currentTime) {
    if (!this.isRunning) return;

    // Calculate delta time
    this.deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Calculate FPS
    this.frameCount++;
    this.fpsTime += this.deltaTime;
    if (this.fpsTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.fpsTime = 0;
    }

    // Update input
    this.inputManager.update();

    // Update current scene
    if (!this.isPaused && this.currentScene) {
      this.currentScene.update(this.deltaTime);
    }

    // Render current scene
    this.renderer.clear();
    if (this.currentScene) {
      this.currentScene.render(this.renderer);
    }

    // Draw FPS if debug enabled
    if (GameConfig.DEBUG.SHOW_FPS) {
      this.renderer.drawText(`FPS: ${this.fps}`, 10, 10, {
        color: '#000000',
        font: '16px Arial'
      });
    }

    // Continue loop
    requestAnimationFrame(this.gameLoop);
  }

  /**
   * Get renderer
   */
  getRenderer() {
    return this.renderer;
  }

  /**
   * Get input manager
   */
  getInputManager() {
    return this.inputManager;
  }

  /**
   * Handle window resize
   */
  handleResize() {
    this.renderer.setupHighDPI();
    if (this.currentScene) {
      this.currentScene.onResize();
    }
  }
}

export default GameManager;
