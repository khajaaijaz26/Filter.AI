/**
 * Grid class - Represents the game board
 */
import { Block } from './Block.js';
import GameConfig from '../config/GameConfig.js';

export class Grid {
  constructor(width = 8, height = 8) {
    this.width = width;
    this.height = height;
    this.blocks = [];
    this.initialize();
  }

  /**
   * Initialize empty grid
   */
  initialize() {
    this.blocks = [];
    for (let y = 0; y < this.height; y++) {
      const row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(null);
      }
      this.blocks.push(row);
    }
  }

  /**
   * Get block at grid position
   */
  getBlock(x, y) {
    if (!this.isValid(x, y)) {
      return null;
    }
    return this.blocks[y][x];
  }

  /**
   * Set block at grid position
   */
  setBlock(x, y, block) {
    if (!this.isValid(x, y)) {
      return false;
    }
    
    this.blocks[y][x] = block;
    
    if (block) {
      block.gridX = x;
      block.gridY = y;
    }
    
    return true;
  }

  /**
   * Check if position is empty
   */
  isEmpty(x, y) {
    return this.isValid(x, y) && this.blocks[y][x] === null;
  }

  /**
   * Check if position is valid
   */
  isValid(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  /**
   * Remove blocks at given positions
   */
  removeBlocks(positions) {
    const removed = [];
    
    for (const pos of positions) {
      const block = this.getBlock(pos.x, pos.y);
      if (block) {
        removed.push({ x: pos.x, y: pos.y, block });
        this.setBlock(pos.x, pos.y, null);
      }
    }
    
    return removed;
  }

  /**
   * Apply gravity - make blocks fall down
   * Returns true if any blocks moved
   */
  applyGravity() {
    let blocksMoved = false;
    
    // Process each column from bottom to top
    for (let x = 0; x < this.width; x++) {
      let writeY = this.height - 1;  // Position to write next non-null block
      
      // Scan from bottom to top
      for (let y = this.height - 1; y >= 0; y--) {
        const block = this.getBlock(x, y);
        
        if (block !== null) {
          if (y !== writeY) {
            // Move block down
            this.setBlock(x, writeY, block);
            this.setBlock(x, y, null);
            blocksMoved = true;
          }
          writeY--;
        }
      }
    }
    
    return blocksMoved;
  }

  /**
   * Fill empty spaces with new blocks
   */
  fillEmpty(availableColors = GameConfig.BLOCK_COLORS) {
    const newBlocks = [];
    
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.isEmpty(x, y)) {
          const color = availableColors[Math.floor(Math.random() * availableColors.length)];
          const block = new Block(color, 'normal');
          this.setBlock(x, y, block);
          block.state = 'spawning';
          newBlocks.push({ x, y, block });
        }
      }
    }
    
    return newBlocks;
  }

  /**
   * Get all connected blocks of the same color from a starting position
   * Uses flood-fill algorithm
   */
  getConnectedGroup(x, y) {
    const startBlock = this.getBlock(x, y);
    if (!startBlock || !startBlock.canMatch()) {
      return [];
    }
    
    const targetColor = startBlock.color;
    const visited = new Set();
    const connected = [];
    const queue = [{ x, y }];
    
    while (queue.length > 0) {
      const pos = queue.shift();
      const key = `${pos.x},${pos.y}`;
      
      if (visited.has(key)) continue;
      visited.add(key);
      
      if (!this.isValid(pos.x, pos.y)) continue;
      
      const block = this.getBlock(pos.x, pos.y);
      if (!block || block.color !== targetColor || !block.canMatch()) {
        continue;
      }
      
      connected.push({ x: pos.x, y: pos.y, block });
      
      // Check 4 directions (orthogonal only)
      queue.push({ x: pos.x + 1, y: pos.y });
      queue.push({ x: pos.x - 1, y: pos.y });
      queue.push({ x: pos.x, y: pos.y + 1 });
      queue.push({ x: pos.x, y: pos.y - 1 });
    }
    
    return connected;
  }

  /**
   * Get all blocks in a radius around a position (for bomb power-up)
   */
  getBlocksInRadius(x, y, radius) {
    const blocks = [];
    
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        
        if (this.isValid(nx, ny)) {
          const block = this.getBlock(nx, ny);
          if (block && block.canClear()) {
            blocks.push({ x: nx, y: ny, block });
          }
        }
      }
    }
    
    return blocks;
  }

  /**
   * Get all blocks in a line (for line clear power-up)
   */
  getBlocksInLine(x, y, direction) {
    const blocks = [];
    
    if (direction === 'horizontal' || direction === 'both') {
      for (let nx = 0; nx < this.width; nx++) {
        const block = this.getBlock(nx, y);
        if (block && block.canClear()) {
          blocks.push({ x: nx, y, block });
        }
      }
    }
    
    if (direction === 'vertical' || direction === 'both') {
      for (let ny = 0; ny < this.height; ny++) {
        const block = this.getBlock(x, ny);
        if (block && block.canClear()) {
          blocks.push({ x, y: ny, block });
        }
      }
    }
    
    return blocks;
  }

  /**
   * Get all blocks of a specific color (for color bomb power-up)
   */
  getBlocksByColor(color) {
    const blocks = [];
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const block = this.getBlock(x, y);
        if (block && block.color === color && block.canClear()) {
          blocks.push({ x, y, block });
        }
      }
    }
    
    return blocks;
  }

  /**
   * Convert grid to 2D array (for debugging/serialization)
   */
  toArray() {
    return this.blocks.map(row => 
      row.map(block => block ? { color: block.color, type: block.type } : null)
    );
  }

  /**
   * Clone the grid
   */
  clone() {
    const cloned = new Grid(this.width, this.height);
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const block = this.getBlock(x, y);
        if (block) {
          cloned.setBlock(x, y, block.clone());
        }
      }
    }
    
    return cloned;
  }

  /**
   * Count blocks by type
   */
  countBlocks(predicate) {
    let count = 0;
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const block = this.getBlock(x, y);
        if (block && predicate(block)) {
          count++;
        }
      }
    }
    
    return count;
  }

  /**
   * Check if there are any valid moves remaining
   */
  hasValidMoves(minMatchSize = 3) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const block = this.getBlock(x, y);
        if (block && block.canMatch()) {
          const connected = this.getConnectedGroup(x, y);
          if (connected.length >= minMatchSize) {
            return true;
          }
        }
      }
    }
    
    return false;
  }

  /**
   * Clear entire grid
   */
  clear() {
    this.initialize();
  }
}

export default Grid;
