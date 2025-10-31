/**
 * Tests for ScoreSystem
 */
import { ScoreSystem } from '../src/game/ScoreSystem.js';

describe('ScoreSystem', () => {
  let scoreSystem;

  beforeEach(() => {
    scoreSystem = new ScoreSystem();
  });

  test('should calculate score for basic match', () => {
    const score = scoreSystem.calculateMatchScore(3, 0);
    expect(score).toBe(30); // 10 * 3 * 1.0 * 1.0
  });

  test('should apply combo multiplier for larger matches', () => {
    // 4 blocks: 1.2x multiplier
    expect(scoreSystem.calculateMatchScore(4, 0)).toBe(48); // 10 * 4 * 1.2 * 1.0
    
    // 6 blocks: 2.0x multiplier
    expect(scoreSystem.calculateMatchScore(6, 0)).toBe(120); // 10 * 6 * 2.0 * 1.0
    
    // 9 blocks: 3.0x multiplier
    expect(scoreSystem.calculateMatchScore(9, 0)).toBe(270); // 10 * 9 * 3.0 * 1.0
  });

  test('should apply chain multiplier', () => {
    // Chain level 1: 1.5x multiplier
    expect(scoreSystem.calculateMatchScore(3, 1)).toBe(45); // 10 * 3 * 1.0 * 1.5
    
    // Chain level 2: 2.0x multiplier
    expect(scoreSystem.calculateMatchScore(3, 2)).toBe(60); // 10 * 3 * 1.0 * 2.0
  });

  test('should apply both combo and chain multipliers', () => {
    // 6 blocks (2x combo) with chain level 1 (1.5x chain)
    const score = scoreSystem.calculateMatchScore(6, 1);
    expect(score).toBe(180); // 10 * 6 * 2.0 * 1.5
  });

  test('should track total score', () => {
    scoreSystem.addMatchScore(3, 0);
    expect(scoreSystem.getScore()).toBe(30);
    
    scoreSystem.addMatchScore(4, 0);
    expect(scoreSystem.getScore()).toBe(78); // 30 + 48
  });

  test('should add power-up bonus', () => {
    scoreSystem.addMatchScore(3, 0);
    scoreSystem.addPowerUpBonus();
    
    expect(scoreSystem.getScore()).toBe(130); // 30 + 100
    expect(scoreSystem.powerUpsTriggered).toBe(1);
  });

  test('should reset score', () => {
    scoreSystem.addMatchScore(5, 0);
    scoreSystem.addPowerUpBonus();
    
    scoreSystem.reset();
    
    expect(scoreSystem.getScore()).toBe(0);
    expect(scoreSystem.powerUpsTriggered).toBe(0);
    expect(scoreSystem.totalMatches).toBe(0);
  });

  test('should track statistics', () => {
    scoreSystem.addMatchScore(3, 0);
    scoreSystem.addMatchScore(6, 1);
    scoreSystem.addPowerUpBonus();
    
    const stats = scoreSystem.getStats();
    
    expect(stats.totalMatches).toBe(2);
    expect(stats.largestMatch).toBe(6);
    expect(stats.totalBlocksCleared).toBe(9); // 3 + 6
    expect(stats.powerUpsTriggered).toBe(1);
  });

  test('should calculate star rating', () => {
    const thresholds = { 1: 100, 2: 200, 3: 300 };
    
    expect(scoreSystem.calculateStars(50, thresholds)).toBe(0);
    expect(scoreSystem.calculateStars(100, thresholds)).toBe(1);
    expect(scoreSystem.calculateStars(200, thresholds)).toBe(2);
    expect(scoreSystem.calculateStars(300, thresholds)).toBe(3);
    expect(scoreSystem.calculateStars(500, thresholds)).toBe(3);
  });
});
