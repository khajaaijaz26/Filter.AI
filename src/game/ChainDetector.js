/**
 * ChainDetector - Tracks chain reactions
 */
export class ChainDetector {
  constructor() {
    this.chainLevel = 0;
    this.currentTurnChains = 0;
    this.maxChainLevel = 0;
  }

  /**
   * Start a new turn (reset chain counter)
   */
  startNewTurn() {
    this.chainLevel = 0;
    this.currentTurnChains = 0;
  }

  /**
   * Record a match (manual player match, chain level 0)
   */
  recordMatch() {
    this.chainLevel = 0;
  }

  /**
   * Increment chain level (auto-match after gravity)
   */
  incrementChain() {
    this.chainLevel++;
    this.currentTurnChains++;
    
    if (this.chainLevel > this.maxChainLevel) {
      this.maxChainLevel = this.chainLevel;
    }
  }

  /**
   * Get current chain level
   */
  getChainLevel() {
    return this.chainLevel;
  }

  /**
   * Get total chains this turn
   */
  getCurrentTurnChains() {
    return this.currentTurnChains;
  }

  /**
   * Get max chain level achieved
   */
  getMaxChainLevel() {
    return this.maxChainLevel;
  }

  /**
   * Reset all chain tracking
   */
  reset() {
    this.chainLevel = 0;
    this.currentTurnChains = 0;
    this.maxChainLevel = 0;
  }

  /**
   * Get chain multiplier text for display
   */
  getChainText() {
    if (this.chainLevel === 0) return '';
    if (this.chainLevel === 1) return 'Chain!';
    if (this.chainLevel === 2) return 'Double Chain!';
    if (this.chainLevel === 3) return 'Triple Chain!';
    if (this.chainLevel === 4) return 'Mega Chain!';
    return 'Ultra Chain!';
  }
}

export default ChainDetector;
