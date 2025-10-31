/**
 * MindMesh Game Configuration
 * Central configuration for game balance and settings
 */

export const GameConfig = {
  // Grid settings
  GRID: {
    WIDTH: 8,
    HEIGHT: 8,
    BLOCK_SIZE: 64,
    PADDING: 10,
    MARGIN_TOP: 100  // Space for HUD
  },

  // Canvas settings
  CANVAS: {
    WIDTH: 600,
    HEIGHT: 800,
    BACKGROUND_COLOR: '#f0f0f0'
  },

  // Matching rules
  MATCHING: {
    MIN_MATCH_SIZE: 3,
    BOMB_THRESHOLD: 6,
    LINE_THRESHOLD: 9,
    COLOR_BOMB_THRESHOLD: 12
  },

  // Scoring system
  SCORING: {
    BASE_POINTS: 10,
    COMBO_MULTIPLIERS: {
      3: 1.0,
      4: 1.2,
      5: 1.5,
      6: 2.0,
      9: 3.0,
      13: 5.0
    },
    CHAIN_MULTIPLIERS: [1.0, 1.5, 2.0, 3.0, 5.0],
    POWER_UP_BONUS: 100
  },

  // Power-up configuration
  POWER_UPS: {
    BOMB: {
      RADIUS: [1, 2, 3],  // Upgrade levels (blocks cleared in each direction)
      COLOR: '#ff4444'
    },
    LINE: {
      TYPES: ['single', 'cross', 'double'],
      COLOR: '#4444ff'
    },
    COLOR_BOMB: {
      COLORS_CLEARED: [1, 1, 2],  // How many colors cleared per upgrade level
      COLOR: '#rainbow'
    }
  },

  // Animation settings
  ANIMATIONS: {
    CLEAR_DURATION: 300,    // ms
    FALL_SPEED: 800,         // pixels per second
    SPAWN_DURATION: 200,     // ms
    SELECTION_PULSE: 500,    // ms
    COMBO_TEXT_DURATION: 1000  // ms
  },

  // Audio settings
  AUDIO: {
    MUSIC_VOLUME: 0.6,
    SFX_VOLUME: 0.8
  },

  // Color palette for blocks
  COLORS: {
    RED: '#FF4444',
    BLUE: '#4444FF',
    GREEN: '#44FF44',
    YELLOW: '#FFFF44',
    PURPLE: '#FF44FF',
    ORANGE: '#FF8844',
    PINK: '#FF88FF'
  },

  // Block colors array (used for random generation)
  BLOCK_COLORS: ['red', 'blue', 'green', 'yellow', 'purple'],

  // Special tile types
  SPECIAL_TILES: {
    LOCKED: 'locked',
    ICE: 'ice',
    METAL: 'metal',
    CRATE: 'crate'
  },

  // Game states
  GAME_STATES: {
    INIT: 'init',
    READY: 'ready',
    PLAYING: 'playing',
    CLEARING: 'clearing',
    FALLING: 'falling',
    CHECKING: 'checking',
    POWER_UP: 'power_up',
    PAUSED: 'paused',
    LEVEL_COMPLETE: 'level_complete',
    LEVEL_FAILED: 'level_failed'
  },

  // Level objective types
  OBJECTIVE_TYPES: {
    SCORE: 'score',
    CLEAR_BLOCKS: 'clear_blocks',
    DROP_ITEMS: 'drop_items',
    REMOVE_OBSTACLES: 'remove_obstacles',
    COMBO_CHALLENGE: 'combo_challenge'
  },

  // UI settings
  UI: {
    FONT_FAMILY: 'Arial, sans-serif',
    FONT_SIZE_LARGE: 32,
    FONT_SIZE_MEDIUM: 24,
    FONT_SIZE_SMALL: 18,
    BUTTON_HEIGHT: 50,
    BUTTON_PADDING: 20
  },

  // Performance settings
  PERFORMANCE: {
    TARGET_FPS: 60,
    MAX_PARTICLES: 100,
    ENABLE_SHADOWS: true,
    ENABLE_GLOW: true
  },

  // Debug settings
  DEBUG: {
    ENABLED: false,
    SHOW_FPS: false,
    SHOW_GRID_COORDINATES: false,
    LOG_STATE_CHANGES: false
  }
};

// Helper function to get combo multiplier based on match size
export function getComboMultiplier(matchSize) {
  const multipliers = GameConfig.SCORING.COMBO_MULTIPLIERS;
  const sizes = Object.keys(multipliers).map(Number).sort((a, b) => a - b);
  
  for (let i = sizes.length - 1; i >= 0; i--) {
    if (matchSize >= sizes[i]) {
      return multipliers[sizes[i]];
    }
  }
  
  return 1.0;
}

// Helper function to get chain multiplier based on chain level
export function getChainMultiplier(chainLevel) {
  const multipliers = GameConfig.SCORING.CHAIN_MULTIPLIERS;
  return multipliers[Math.min(chainLevel, multipliers.length - 1)] || 1.0;
}

// Helper function to determine power-up type from match size
export function getPowerUpType(matchSize) {
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

// Helper function to get color hex from color name
export function getColorHex(colorName) {
  return GameConfig.COLORS[colorName.toUpperCase()] || '#cccccc';
}

export default GameConfig;
