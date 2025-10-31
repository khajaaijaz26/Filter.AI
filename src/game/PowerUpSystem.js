/**
 * PowerUpSystem - Manages power-up creation and activation
 */
import { Block } from './Block.js';
import { getPowerUpType } from '../config/GameConfig.js';
import GameConfig from '../config/GameConfig.js';

export class PowerUpSystem {
  constructor() {
    this.upgradeLevel = {
      bomb: 1,
      line: 1,
      color: 1
    };
  }

  /**
   * Check if a match should create a power-up
   */
  shouldCreatePowerUp(matchSize) {
    return getPowerUpType(matchSize) !== null;
  }

  /**
   * Get power-up type for match size
   */
  getPowerUpType(matchSize) {
    return getPowerUpType(matchSize);
  }

  /**
   * Create a power-up block
   */
  createPowerUp(grid, type, x, y) {
    const block = grid.getBlock(x, y);
    
    // If there's already a block, use its color
    const color = block ? block.color : 'red';
    
    // Create new power-up block
    const powerUp = new Block(color, type);
    powerUp.powerUpLevel = this.upgradeLevel[type] || 1;
    
    grid.setBlock(x, y, powerUp);
    
    return powerUp;
  }

  /**
   * Activate a bomb power-up
   */
  activateBomb(grid, x, y) {
    const block = grid.getBlock(x, y);
    const radius = this.getBombRadius(block ? block.powerUpLevel : 1);
    const affectedBlocks = grid.getBlocksInRadius(x, y, radius);
    
    return {
      type: 'bomb',
      affectedBlocks,
      radius
    };
  }

  /**
   * Activate a line clear power-up
   */
  activateLine(grid, x, y, direction = 'both') {
    const block = grid.getBlock(x, y);
    const level = block ? block.powerUpLevel : 1;
    
    // Determine direction based on upgrade level
    let clearDirection = 'horizontal';  // Default
    
    if (level === 1) {
      clearDirection = direction === 'vertical' ? 'vertical' : 'horizontal';
    } else if (level === 2) {
      clearDirection = 'both';  // Cross pattern
    } else {
      clearDirection = 'both';  // Enhanced for level 3
    }
    
    const affectedBlocks = grid.getBlocksInLine(x, y, clearDirection);
    
    return {
      type: 'line',
      affectedBlocks,
      direction: clearDirection,
      level
    };
  }

  /**
   * Activate a color bomb power-up
   */
  activateColorBomb(grid, targetColor) {
    const affectedBlocks = grid.getBlocksByColor(targetColor);
    
    return {
      type: 'color',
      affectedBlocks,
      color: targetColor
    };
  }

  /**
   * Check if two power-ups can be combined
   */
  canCombine(powerUp1, powerUp2) {
    return powerUp1.isPowerUp() && powerUp2.isPowerUp();
  }

  /**
   * Activate power-up combination
   */
  activateCombination(grid, powerUp1, powerUp2) {
    const type1 = powerUp1.type;
    const type2 = powerUp2.type;
    
    // Bomb + Bomb = Mega Bomb
    if (type1 === 'bomb' && type2 === 'bomb') {
      const x = powerUp1.gridX;
      const y = powerUp1.gridY;
      const radius = this.getBombRadius(powerUp1.powerUpLevel) + 2;
      return {
        type: 'mega_bomb',
        affectedBlocks: grid.getBlocksInRadius(x, y, radius)
      };
    }
    
    // Bomb + Line = Explosive Line
    if ((type1 === 'bomb' && type2 === 'line') || (type1 === 'line' && type2 === 'bomb')) {
      const lineBlock = type1 === 'line' ? powerUp1 : powerUp2;
      const affectedBlocks = grid.getBlocksInLine(lineBlock.gridX, lineBlock.gridY, 'both');
      return {
        type: 'explosive_line',
        affectedBlocks
      };
    }
    
    // Color + Bomb = Color Explosion (all blocks of color become bombs)
    if ((type1 === 'color' && type2 === 'bomb') || (type1 === 'bomb' && type2 === 'color')) {
      const colorBlock = type1 === 'color' ? powerUp1 : powerUp2;
      const targetColor = colorBlock.color;
      const colorBlocks = grid.getBlocksByColor(targetColor);
      
      // Each color block explodes like a bomb
      const allAffected = [];
      colorBlocks.forEach(cb => {
        const bombAffected = grid.getBlocksInRadius(cb.x, cb.y, 1);
        allAffected.push(...bombAffected);
      });
      
      return {
        type: 'color_explosion',
        affectedBlocks: allAffected
      };
    }
    
    // Color + Color = Clear Entire Board
    if (type1 === 'color' && type2 === 'color') {
      const allBlocks = [];
      for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
          const block = grid.getBlock(x, y);
          if (block && block.canClear()) {
            allBlocks.push({ x, y, block });
          }
        }
      }
      
      return {
        type: 'clear_all',
        affectedBlocks: allBlocks
      };
    }
    
    // Default: activate both separately
    return null;
  }

  /**
   * Get bomb radius based on upgrade level
   */
  getBombRadius(level) {
    const radii = GameConfig.POWER_UPS.BOMB.RADIUS;
    return radii[Math.min(level - 1, radii.length - 1)] || 1;
  }

  /**
   * Upgrade a power-up type
   */
  upgradePowerUp(type) {
    if (this.upgradeLevel[type] < 3) {
      this.upgradeLevel[type]++;
      return true;
    }
    return false;
  }

  /**
   * Get current upgrade level for a power-up type
   */
  getUpgradeLevel(type) {
    return this.upgradeLevel[type] || 1;
  }

  /**
   * Reset all upgrades
   */
  resetUpgrades() {
    this.upgradeLevel = {
      bomb: 1,
      line: 1,
      color: 1
    };
  }
}

export default PowerUpSystem;
