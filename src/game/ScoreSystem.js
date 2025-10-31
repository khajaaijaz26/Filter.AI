/**
 * ScoreSystem - Handles score calculation and tracking
 */
import { getComboMultiplier, getChainMultiplier } from '../config/GameConfig.js';
import GameConfig from '../config/GameConfig.js';

export class ScoreSystem {
  constructor() {
    this.score = 0;
    this.moveScore = 0;  // Score from current move
    this.powerUpsTriggered = 0;
    this.totalMatches = 0;
    this.largestMatch = 0;
    this.totalBlocksCleared = 0;
  }

  /**
   * Calculate score for a match
   */
  calculateMatchScore(matchSize, chainLevel = 0) {
    const basePoints = GameConfig.SCORING.BASE_POINTS;
    const comboMult = getComboMultiplier(matchSize);
    const chainMult = getChainMultiplier(chainLevel);

    return Math.floor(basePoints * matchSize * comboMult * chainMult);
  }

  /**
   * Add score from a match
   */
  addMatchScore(matchSize, chainLevel = 0) {
    const score = this.calculateMatchScore(matchSize, chainLevel);
    this.score += score;
    this.moveScore += score;
    this.totalMatches++;
    this.totalBlocksCleared += matchSize;
    
    if (matchSize > this.largestMatch) {
      this.largestMatch = matchSize;
    }

    return score;
  }

  /**
   * Add bonus for power-up creation
   */
  addPowerUpBonus() {
    const bonus = GameConfig.SCORING.POWER_UP_BONUS;
    this.score += bonus;
    this.moveScore += bonus;
    this.powerUpsTriggered++;
    return bonus;
  }

  /**
   * Reset move score (call at start of each move)
   */
  startNewMove() {
    this.moveScore = 0;
  }

  /**
   * Get current total score
   */
  getScore() {
    return this.score;
  }

  /**
   * Get score from current move
   */
  getMoveScore() {
    return this.moveScore;
  }

  /**
   * Get combo multiplier for display
   */
  getComboMultiplier(matchSize) {
    return getComboMultiplier(matchSize);
  }

  /**
   * Get chain multiplier for display
   */
  getChainMultiplier(chainLevel) {
    return getChainMultiplier(chainLevel);
  }

  /**
   * Reset all scores
   */
  reset() {
    this.score = 0;
    this.moveScore = 0;
    this.powerUpsTriggered = 0;
    this.totalMatches = 0;
    this.largestMatch = 0;
    this.totalBlocksCleared = 0;
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      score: this.score,
      totalMatches: this.totalMatches,
      largestMatch: this.largestMatch,
      totalBlocksCleared: this.totalBlocksCleared,
      powerUpsTriggered: this.powerUpsTriggered
    };
  }

  /**
   * Calculate star rating based on score and thresholds
   */
  calculateStars(score, starThresholds) {
    if (score >= starThresholds[3]) return 3;
    if (score >= starThresholds[2]) return 2;
    if (score >= starThresholds[1]) return 1;
    return 0;
  }
}

export default ScoreSystem;
