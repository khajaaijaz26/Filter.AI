/**
 * Block class - Represents a single block in the grid
 */
export class Block {
  constructor(color, type = 'normal') {
    this.color = color;           // 'red', 'blue', 'green', 'yellow', 'purple', etc.
    this.type = type;             // 'normal', 'bomb', 'line', 'color'
    this.state = 'idle';          // 'idle', 'selected', 'clearing', 'falling', 'spawning'
    
    // Grid position
    this.gridX = 0;
    this.gridY = 0;
    
    // Visual position (for animations)
    this.x = 0;
    this.y = 0;
    
    // Special tile overlay
    this.special = null;          // null, 'locked', 'ice', 'metal', 'crate'
    this.specialLevel = 0;        // For multi-hit specials (double locked, double crate)
    
    // Animation properties
    this.scale = 1.0;
    this.alpha = 1.0;
    this.rotation = 0;
    
    // Selection animation
    this.pulseTime = 0;
    
    // For power-ups
    this.powerUpLevel = 1;        // Upgrade level for power-ups
  }

  /**
   * Check if this block is a power-up
   */
  isPowerUp() {
    return this.type === 'bomb' || this.type === 'line' || this.type === 'color';
  }

  /**
   * Check if this block has a special overlay
   */
  isSpecial() {
    return this.special !== null;
  }

  /**
   * Check if this block can be matched (not locked by special)
   */
  canMatch() {
    // Metal blocks can never be matched
    if (this.special === 'metal') {
      return false;
    }
    
    // Locked and ice blocks can't be matched normally
    if (this.special === 'locked' || this.special === 'ice') {
      return false;
    }
    
    // Crate blocks have the block underneath, so can't match the crate itself
    if (this.special === 'crate') {
      return false;
    }
    
    return true;
  }

  /**
   * Check if this block can be cleared
   */
  canClear() {
    return this.special !== 'metal';
  }

  /**
   * Damage the special overlay (for locked, ice, crate)
   */
  damageSpecial() {
    if (!this.isSpecial()) return false;
    
    if (this.special === 'metal') {
      return false;  // Metal can't be damaged
    }
    
    this.specialLevel--;
    
    if (this.specialLevel <= 0) {
      this.special = null;
      return true;  // Special was removed
    }
    
    return false;  // Still has special overlay
  }

  /**
   * Update block position for smooth animations
   */
  updatePosition(targetX, targetY, speed, deltaTime) {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 1) {
      this.x = targetX;
      this.y = targetY;
      return true;  // Reached target
    }
    
    const moveDistance = speed * deltaTime;
    const ratio = Math.min(moveDistance / distance, 1);
    
    this.x += dx * ratio;
    this.y += dy * ratio;
    
    return false;  // Still moving
  }

  /**
   * Update selection pulse animation
   */
  updatePulse(deltaTime) {
    if (this.state === 'selected') {
      this.pulseTime += deltaTime;
      this.scale = 1.0 + Math.sin(this.pulseTime * 0.01) * 0.1;
    } else {
      this.pulseTime = 0;
      this.scale = 1.0;
    }
  }

  /**
   * Clone this block
   */
  clone() {
    const cloned = new Block(this.color, this.type);
    cloned.gridX = this.gridX;
    cloned.gridY = this.gridY;
    cloned.x = this.x;
    cloned.y = this.y;
    cloned.special = this.special;
    cloned.specialLevel = this.specialLevel;
    cloned.powerUpLevel = this.powerUpLevel;
    return cloned;
  }

  /**
   * Serialize block for saving
   */
  toJSON() {
    return {
      color: this.color,
      type: this.type,
      gridX: this.gridX,
      gridY: this.gridY,
      special: this.special,
      specialLevel: this.specialLevel,
      powerUpLevel: this.powerUpLevel
    };
  }

  /**
   * Deserialize block from JSON
   */
  static fromJSON(data) {
    const block = new Block(data.color, data.type);
    block.gridX = data.gridX;
    block.gridY = data.gridY;
    block.special = data.special || null;
    block.specialLevel = data.specialLevel || 0;
    block.powerUpLevel = data.powerUpLevel || 1;
    return block;
  }
}

export default Block;
