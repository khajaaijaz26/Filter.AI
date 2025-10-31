/**
 * Tests for MatchEngine
 */
import { MatchEngine } from '../src/game/MatchEngine.js';
import { Grid } from '../src/game/Grid.js';
import { Block } from '../src/game/Block.js';

describe('MatchEngine', () => {
  let engine;
  let grid;

  beforeEach(() => {
    engine = new MatchEngine();
    grid = new Grid(8, 8);
  });

  test('should detect 3-block horizontal match', () => {
    // Arrange
    grid.setBlock(0, 0, new Block('red'));
    grid.setBlock(1, 0, new Block('red'));
    grid.setBlock(2, 0, new Block('red'));

    // Act
    const connected = engine.getConnectedBlocks(grid, 0, 0);

    // Assert
    expect(connected.length).toBe(3);
    expect(engine.isValidMatch(connected)).toBe(true);
  });

  test('should detect 3-block vertical match', () => {
    // Arrange
    grid.setBlock(0, 0, new Block('blue'));
    grid.setBlock(0, 1, new Block('blue'));
    grid.setBlock(0, 2, new Block('blue'));

    // Act
    const connected = engine.getConnectedBlocks(grid, 0, 0);

    // Assert
    expect(connected.length).toBe(3);
    expect(engine.isValidMatch(connected)).toBe(true);
  });

  test('should detect L-shaped match', () => {
    // Arrange
    grid.setBlock(0, 0, new Block('green'));
    grid.setBlock(1, 0, new Block('green'));
    grid.setBlock(1, 1, new Block('green'));

    // Act
    const connected = engine.getConnectedBlocks(grid, 0, 0);

    // Assert
    expect(connected.length).toBe(3);
    expect(engine.isValidMatch(connected)).toBe(true);
  });

  test('should reject match with less than 3 blocks', () => {
    // Arrange
    grid.setBlock(0, 0, new Block('yellow'));
    grid.setBlock(1, 0, new Block('yellow'));

    // Act
    const connected = engine.getConnectedBlocks(grid, 0, 0);

    // Assert
    expect(connected.length).toBe(2);
    expect(engine.isValidMatch(connected)).toBe(false);
  });

  test('should not match different colors', () => {
    // Arrange
    grid.setBlock(0, 0, new Block('red'));
    grid.setBlock(1, 0, new Block('blue'));
    grid.setBlock(2, 0, new Block('red'));

    // Act
    const connected = engine.getConnectedBlocks(grid, 0, 0);

    // Assert
    expect(connected.length).toBe(1);
    expect(engine.isValidMatch(connected)).toBe(false);
  });

  test('should determine correct power-up type for match size', () => {
    expect(engine.determinePowerUpType(3)).toBeNull();
    expect(engine.determinePowerUpType(5)).toBeNull();
    expect(engine.determinePowerUpType(6)).toBe('bomb');
    expect(engine.determinePowerUpType(8)).toBe('bomb');
    expect(engine.determinePowerUpType(9)).toBe('line');
    expect(engine.determinePowerUpType(11)).toBe('line');
    expect(engine.determinePowerUpType(12)).toBe('color');
    expect(engine.determinePowerUpType(15)).toBe('color');
  });

  test('should detect large connected group', () => {
    // Arrange - create a 3x3 grid of same color
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        grid.setBlock(x, y, new Block('purple'));
      }
    }

    // Act
    const connected = engine.getConnectedBlocks(grid, 0, 0);

    // Assert
    expect(connected.length).toBe(9);
    expect(engine.isValidMatch(connected)).toBe(true);
  });

  test('should find all possible matches on grid', () => {
    // Arrange - create two separate groups of matches
    // Group 1: horizontal line at top
    grid.setBlock(0, 0, new Block('red'));
    grid.setBlock(1, 0, new Block('red'));
    grid.setBlock(2, 0, new Block('red'));

    // Group 2: vertical line at left
    grid.setBlock(0, 2, new Block('blue'));
    grid.setBlock(0, 3, new Block('blue'));
    grid.setBlock(0, 4, new Block('blue'));

    // Act
    const matches = engine.findAllPossibleMatches(grid);

    // Assert
    expect(matches.length).toBe(2);
  });
});
