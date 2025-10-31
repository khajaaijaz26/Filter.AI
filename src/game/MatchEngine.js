/**
 * MatchEngine - Handles block matching logic
 */
import GameConfig from '../config/GameConfig.js';

export class MatchEngine {
  constructor() {
    this.minMatchSize = GameConfig.MATCHING.MIN_MATCH_SIZE;
  }

  /**
   * Find all connected blocks of the same color from a starting position
   */
  getConnectedBlocks(grid, x, y) {
    return grid.getConnectedGroup(x, y);
  }

  /**
   * Check if a match is valid (meets minimum size requirement)
   */
  isValidMatch(blocks) {
    return blocks && blocks.length >= this.minMatchSize;
  }

  /**
   * Check if a block can participate in matching
   */
  canMatch(block) {
    return block && block.canMatch();
  }

  /**
   * Process a match and determine if power-ups should be created
   */
  processMatch(grid, blocks) {
    if (!this.isValidMatch(blocks)) {
      return null;
    }

    const matchSize = blocks.length;
    const powerUpType = this.determinePowerUpType(matchSize);

    // Remove the matched blocks
    const positions = blocks.map(b => ({ x: b.x, y: b.y }));
    const removed = grid.removeBlocks(positions);

    return {
      matchSize,
      powerUpType,
      removed,
      positions
    };
  }

  /**
   * Determine what type of power-up should be created based on match size
   */
  determinePowerUpType(matchSize) {
    const config = GameConfig.MATCHING;

    if (matchSize >= config.COLOR_BOMB_THRESHOLD) {
      return 'color';
    } else if (matchSize >= config.LINE_THRESHOLD) {
      return 'line';
    } else if (matchSize >= config.BOMB_THRESHOLD) {
      return 'bomb';
    }

    return null;
  }

  /**
   * Detect all possible matches on the grid (for checking if moves remain)
   */
  findAllPossibleMatches(grid) {
    const matches = [];
    const checked = new Set();

    for (let y = 0; y < grid.height; y++) {
      for (let x = 0; x < grid.width; x++) {
        const key = `${x},${y}`;
        if (checked.has(key)) continue;

        const block = grid.getBlock(x, y);
        if (!block || !block.canMatch()) continue;

        const connected = this.getConnectedBlocks(grid, x, y);
        
        if (this.isValidMatch(connected)) {
          matches.push(connected);
          
          // Mark all blocks in this match as checked
          connected.forEach(b => checked.add(`${b.x},${b.y}`));
        }
      }
    }

    return matches;
  }

  /**
   * Check if any chains formed after gravity (for chain detection)
   */
  detectChains(grid) {
    const matches = this.findAllPossibleMatches(grid);
    return matches.length > 0 ? matches : null;
  }
}

export default MatchEngine;
