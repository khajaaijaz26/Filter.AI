/**
 * GameScene - Main gameplay scene
 */
import { Scene } from '../core/Scene.js';
import { Grid } from '../game/Grid.js';
import { Block } from '../game/Block.js';
import { MatchEngine } from '../game/MatchEngine.js';
import { ScoreSystem } from '../game/ScoreSystem.js';
import { ChainDetector } from '../game/ChainDetector.js';
import { PowerUpSystem } from '../game/PowerUpSystem.js';
import GameConfig from '../config/GameConfig.js';

export class GameScene extends Scene {
  constructor() {
    super('game');
    
    this.grid = new Grid(8, 8);
    this.matchEngine = new MatchEngine();
    this.scoreSystem = new ScoreSystem();
    this.chainDetector = new ChainDetector();
    this.powerUpSystem = new PowerUpSystem();
    
    this.state = 'playing';  // 'playing', 'clearing', 'falling', 'checking'
    this.selectedBlocks = [];
    this.movesRemaining = 20;
    this.targetScore = 1000;
    
    // Grid rendering properties
    this.gridOffsetX = 0;
    this.gridOffsetY = 0;
    this.blockSize = GameConfig.GRID.BLOCK_SIZE;
    
    // Animation
    this.clearingTimer = 0;
    this.fallingTimer = 0;
    
    // Hover position
    this.hoverX = -1;
    this.hoverY = -1;
  }

  /**
   * Initialize the scene
   */
  init() {
    this.calculateGridOffset();
    this.initializeGrid();
    this.setupInputHandlers();
  }

  /**
   * Called when entering scene
   */
  onEnter() {
    this.init();
  }

  /**
   * Calculate grid offset to center it
   */
  calculateGridOffset() {
    const renderer = this.getRenderer();
    if (!renderer) return;
    
    const gridWidth = this.grid.width * this.blockSize;
    const gridHeight = this.grid.height * this.blockSize;
    
    this.gridOffsetX = (renderer.width - gridWidth) / 2;
    this.gridOffsetY = GameConfig.GRID.MARGIN_TOP;
  }

  /**
   * Initialize grid with random blocks
   */
  initializeGrid() {
    for (let y = 0; y < this.grid.height; y++) {
      for (let x = 0; x < this.grid.width; x++) {
        const color = GameConfig.BLOCK_COLORS[
          Math.floor(Math.random() * GameConfig.BLOCK_COLORS.length)
        ];
        const block = new Block(color);
        block.x = this.gridOffsetX + x * this.blockSize;
        block.y = this.gridOffsetY + y * this.blockSize;
        this.grid.setBlock(x, y, block);
      }
    }

    // Ensure no initial matches
    this.clearInitialMatches();
  }

  /**
   * Clear any matches that exist on initial board
   */
  clearInitialMatches() {
    let hadMatches = true;
    let iterations = 0;
    const maxIterations = 10;

    while (hadMatches && iterations < maxIterations) {
      hadMatches = false;
      iterations++;

      for (let y = 0; y < this.grid.height; y++) {
        for (let x = 0; x < this.grid.width; x++) {
          const connected = this.matchEngine.getConnectedBlocks(this.grid, x, y);
          if (this.matchEngine.isValidMatch(connected)) {
            // Replace one block to break the match
            const block = this.grid.getBlock(x, y);
            if (block) {
              const newColor = this.getDifferentColor(block.color);
              block.color = newColor;
              hadMatches = true;
            }
          }
        }
      }
    }
  }

  /**
   * Get a color different from the given one
   */
  getDifferentColor(currentColor) {
    const availableColors = GameConfig.BLOCK_COLORS.filter(c => c !== currentColor);
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  }

  /**
   * Setup input event handlers
   */
  setupInputHandlers() {
    const input = this.getInputManager();
    if (!input) return;

    input.on('click', (pointer) => {
      if (this.state === 'playing') {
        this.handleClick(pointer.x, pointer.y);
      }
    });

    input.on('pointermove', (pointer) => {
      this.updateHover(pointer.x, pointer.y);
    });
  }

  /**
   * Update hover position
   */
  updateHover(x, y) {
    const gridPos = this.screenToGrid(x, y);
    if (gridPos) {
      this.hoverX = gridPos.x;
      this.hoverY = gridPos.y;
    } else {
      this.hoverX = -1;
      this.hoverY = -1;
    }
  }

  /**
   * Handle click on grid
   */
  handleClick(x, y) {
    const gridPos = this.screenToGrid(x, y);
    if (!gridPos) return;

    const connected = this.matchEngine.getConnectedBlocks(
      this.grid,
      gridPos.x,
      gridPos.y
    );

    if (this.matchEngine.isValidMatch(connected)) {
      this.selectedBlocks = connected;
      this.processMatch();
    }
  }

  /**
   * Convert screen coordinates to grid coordinates
   */
  screenToGrid(screenX, screenY) {
    const x = Math.floor((screenX - this.gridOffsetX) / this.blockSize);
    const y = Math.floor((screenY - this.gridOffsetY) / this.blockSize);

    if (this.grid.isValid(x, y)) {
      return { x, y };
    }

    return null;
  }

  /**
   * Process a match
   */
  processMatch() {
    if (this.selectedBlocks.length === 0) return;

    // Calculate and add score
    const matchSize = this.selectedBlocks.length;
    const chainLevel = this.chainDetector.getChainLevel();
    this.scoreSystem.addMatchScore(matchSize, chainLevel);

    // Check for power-up creation
    const powerUpType = this.powerUpSystem.getPowerUpType(matchSize);
    if (powerUpType) {
      const firstBlock = this.selectedBlocks[0];
      this.powerUpSystem.createPowerUp(this.grid, powerUpType, firstBlock.x, firstBlock.y);
      this.scoreSystem.addPowerUpBonus();
    }

    // Remove blocks
    const positions = this.selectedBlocks.map(b => ({ x: b.x, y: b.y }));
    this.grid.removeBlocks(positions);
    
    this.selectedBlocks = [];
    this.movesRemaining--;
    this.chainDetector.recordMatch();

    // Start clearing animation
    this.state = 'clearing';
    this.clearingTimer = 0;
  }

  /**
   * Update scene
   */
  update(deltaTime) {
    // Update based on state
    switch (this.state) {
    case 'clearing':
      this.updateClearing(deltaTime);
      break;
    case 'falling':
      this.updateFalling(deltaTime);
      break;
    case 'checking':
      this.updateChecking();
      break;
    }

    // Update block animations
    this.updateBlockAnimations(deltaTime);

    // Check win/lose conditions
    if (this.state === 'playing') {
      this.checkGameEnd();
    }
  }

  /**
   * Update clearing state
   */
  updateClearing(deltaTime) {
    this.clearingTimer += deltaTime;
    
    if (this.clearingTimer >= GameConfig.ANIMATIONS.CLEAR_DURATION) {
      this.state = 'falling';
      this.fallingTimer = 0;
    }
  }

  /**
   * Update falling state
   */
  updateFalling(deltaTime) {
    this.fallingTimer += deltaTime;

    // Apply gravity
    this.grid.applyGravity();
    
    // Fill empty spaces
    this.grid.fillEmpty();

    // Wait for blocks to settle
    if (this.fallingTimer >= GameConfig.ANIMATIONS.FALL_SPEED / 1000) {
      this.state = 'checking';
    }
  }

  /**
   * Update checking state (check for chain reactions)
   */
  updateChecking() {
    const matches = this.matchEngine.findAllPossibleMatches(this.grid);

    if (matches.length > 0) {
      // Chain reaction detected!
      this.chainDetector.incrementChain();
      
      // Process all matches
      matches.forEach(match => {
        const matchSize = match.length;
        const chainLevel = this.chainDetector.getChainLevel();
        this.scoreSystem.addMatchScore(matchSize, chainLevel);
        
        const positions = match.map(b => ({ x: b.x, y: b.y }));
        this.grid.removeBlocks(positions);
      });

      this.state = 'clearing';
      this.clearingTimer = 0;
    } else {
      // No more chains, back to playing
      this.state = 'playing';
      this.chainDetector.startNewTurn();
    }
  }

  /**
   * Update block animations
   */
  updateBlockAnimations(deltaTime) {
    for (let y = 0; y < this.grid.height; y++) {
      for (let x = 0; x < this.grid.width; x++) {
        const block = this.grid.getBlock(x, y);
        if (!block) continue;

        // Update visual position
        const targetX = this.gridOffsetX + x * this.blockSize;
        const targetY = this.gridOffsetY + y * this.blockSize;
        
        if (block.state === 'spawning') {
          block.alpha = Math.min(1, block.alpha + deltaTime / GameConfig.ANIMATIONS.SPAWN_DURATION);
          if (block.alpha >= 1) {
            block.state = 'idle';
          }
        }

        block.x = targetX;
        block.y = targetY;
      }
    }
  }

  /**
   * Check if game has ended
   */
  checkGameEnd() {
    if (this.scoreSystem.getScore() >= this.targetScore) {
      console.log('Level Complete!');
      // TODO: Show victory screen
    } else if (this.movesRemaining <= 0) {
      console.log('Out of moves!');
      // TODO: Show defeat screen
    }
  }

  /**
   * Render scene
   */
  render(renderer) {
    // Draw background
    renderer.drawRect(0, 0, renderer.width, renderer.height, '#f5f5f5');

    // Draw header
    this.renderHeader(renderer);

    // Draw grid
    this.renderGrid(renderer);

    // Draw hover highlight
    if (this.hoverX >= 0 && this.hoverY >= 0 && this.state === 'playing') {
      this.renderHoverHighlight(renderer);
    }

    // Draw selected blocks preview
    if (this.selectedBlocks.length > 0) {
      this.renderSelectionPreview(renderer);
    }
  }

  /**
   * Render header (HUD)
   */
  renderHeader(renderer) {
    const y = 20;
    
    // Score
    renderer.drawText(`Score: ${this.scoreSystem.getScore()}`, 20, y, {
      font: `${GameConfig.UI.FONT_SIZE_LARGE}px ${GameConfig.UI.FONT_FAMILY}`,
      color: '#333333'
    });

    // Target
    renderer.drawText(`Target: ${this.targetScore}`, 20, y + 40, {
      font: `${GameConfig.UI.FONT_SIZE_MEDIUM}px ${GameConfig.UI.FONT_FAMILY}`,
      color: '#666666'
    });

    // Moves
    renderer.drawText(`Moves: ${this.movesRemaining}`, renderer.width - 150, y, {
      font: `${GameConfig.UI.FONT_SIZE_LARGE}px ${GameConfig.UI.FONT_FAMILY}`,
      color: '#333333'
    });

    // Chain indicator
    if (this.chainDetector.getChainLevel() > 0) {
      const chainText = this.chainDetector.getChainText();
      renderer.drawText(chainText, renderer.width / 2, y, {
        font: `${GameConfig.UI.FONT_SIZE_LARGE}px ${GameConfig.UI.FONT_FAMILY}`,
        color: '#FF4444',
        align: 'center',
        stroke: true,
        strokeColor: '#ffffff',
        strokeWidth: 3
      });
    }
  }

  /**
   * Render grid
   */
  renderGrid(renderer) {
    renderer.drawGrid(this.grid, this.gridOffsetX, this.gridOffsetY, this.blockSize);
  }

  /**
   * Render hover highlight
   */
  renderHoverHighlight(renderer) {
    const connected = this.matchEngine.getConnectedBlocks(this.grid, this.hoverX, this.hoverY);
    
    if (this.matchEngine.isValidMatch(connected)) {
      connected.forEach(item => {
        const x = this.gridOffsetX + item.x * this.blockSize;
        const y = this.gridOffsetY + item.y * this.blockSize;
        
        renderer.drawRoundedRect(
          x + 2,
          y + 2,
          this.blockSize - 4,
          this.blockSize - 4,
          6,
          '#ffffff',
          0.3
        );
        
        renderer.ctx.strokeStyle = '#ffffff';
        renderer.ctx.lineWidth = 2;
        renderer.ctx.strokeRect(x + 2, y + 2, this.blockSize - 4, this.blockSize - 4);
      });

      // Show match size
      const centerX = this.gridOffsetX + this.hoverX * this.blockSize + this.blockSize / 2;
      const centerY = this.gridOffsetY + this.hoverY * this.blockSize - 20;
      
      renderer.drawText(`${connected.length}`, centerX, centerY, {
        font: `bold ${GameConfig.UI.FONT_SIZE_MEDIUM}px ${GameConfig.UI.FONT_FAMILY}`,
        color: '#333333',
        align: 'center',
        stroke: true,
        strokeColor: '#ffffff',
        strokeWidth: 2
      });
    }
  }

  /**
   * Render selection preview
   */
  renderSelectionPreview(renderer) {
    // This is shown during the brief moment after click before clearing
    // Currently we process instantly, but this could be used for confirmation UI
  }

  /**
   * Handle window resize
   */
  onResize() {
    this.calculateGridOffset();
  }
}

export default GameScene;
