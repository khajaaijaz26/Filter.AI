/**
 * Renderer - Handles all canvas drawing operations
 */
import { getColorHex } from '../config/GameConfig.js';
import GameConfig from '../config/GameConfig.js';

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    
    // Set high DPI support
    this.setupHighDPI();
  }

  /**
   * Setup high DPI canvas rendering
   */
  setupHighDPI() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.ctx.scale(dpr, dpr);
    
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    
    this.width = rect.width;
    this.height = rect.height;
  }

  /**
   * Clear the canvas
   */
  clear(color = GameConfig.CANVAS.BACKGROUND_COLOR) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Draw a rectangle
   */
  drawRect(x, y, width, height, color, alpha = 1) {
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
    this.ctx.restore();
  }

  /**
   * Draw a rounded rectangle
   */
  drawRoundedRect(x, y, width, height, radius, color, alpha = 1) {
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.roundRect(x, y, width, height, radius);
    this.ctx.fill();
    this.ctx.restore();
  }

  /**
   * Draw a circle
   */
  drawCircle(x, y, radius, color, alpha = 1) {
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  /**
   * Draw text
   */
  drawText(text, x, y, options = {}) {
    const {
      font = `${GameConfig.UI.FONT_SIZE_MEDIUM}px ${GameConfig.UI.FONT_FAMILY}`,
      color = '#000000',
      align = 'left',
      baseline = 'top',
      alpha = 1,
      stroke = false,
      strokeColor = '#ffffff',
      strokeWidth = 2
    } = options;

    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;

    if (stroke) {
      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = strokeWidth;
      this.ctx.strokeText(text, x, y);
    }

    this.ctx.fillText(text, x, y);
    this.ctx.restore();
  }

  /**
   * Draw a block
   */
  drawBlock(block, x, y, size) {
    if (!block) return;

    const color = getColorHex(block.color);
    const padding = 2;
    const actualSize = size - padding * 2;

    this.ctx.save();
    this.ctx.globalAlpha = block.alpha;

    // Apply scale and rotation
    this.ctx.translate(x + size / 2, y + size / 2);
    this.ctx.rotate(block.rotation);
    this.ctx.scale(block.scale, block.scale);
    this.ctx.translate(-(x + size / 2), -(y + size / 2));

    // Draw block shadow
    if (GameConfig.PERFORMANCE.ENABLE_SHADOWS) {
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      this.ctx.shadowBlur = 4;
      this.ctx.shadowOffsetX = 2;
      this.ctx.shadowOffsetY = 2;
    }

    // Draw main block
    this.drawRoundedRect(
      x + padding,
      y + padding,
      actualSize,
      actualSize,
      6,
      color,
      1
    );

    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    // Draw highlight for 3D effect
    const gradient = this.ctx.createLinearGradient(
      x + padding,
      y + padding,
      x + padding,
      y + padding + actualSize
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');

    this.drawRoundedRect(
      x + padding,
      y + padding,
      actualSize,
      actualSize,
      6,
      gradient,
      1
    );

    // Draw power-up icon
    if (block.isPowerUp()) {
      this.drawPowerUpIcon(block, x + size / 2, y + size / 2, size * 0.4);
    }

    // Draw special tile overlay
    if (block.isSpecial()) {
      this.drawSpecialOverlay(block, x + padding, y + padding, actualSize);
    }

    // Draw selection highlight
    if (block.state === 'selected') {
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(x + padding, y + padding, actualSize, actualSize);
    }

    this.ctx.restore();
  }

  /**
   * Draw power-up icon on block
   */
  drawPowerUpIcon(block, x, y, size) {
    this.ctx.save();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 2;

    if (block.type === 'bomb') {
      // Draw bomb icon
      this.drawCircle(x, y, size / 2, '#ffffff', 0.9);
      this.ctx.strokeStyle = '#000000';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      this.ctx.stroke();
    } else if (block.type === 'line') {
      // Draw line icon
      const lineLength = size * 0.8;
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.moveTo(x - lineLength / 2, y);
      this.ctx.lineTo(x + lineLength / 2, y);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(x, y - lineLength / 2);
      this.ctx.lineTo(x, y + lineLength / 2);
      this.ctx.stroke();
    } else if (block.type === 'color') {
      // Draw color bomb icon (star)
      this.drawStar(x, y, 5, size / 2, size / 4);
    }

    this.ctx.restore();
  }

  /**
   * Draw a star shape
   */
  drawStar(x, y, points, outerRadius, innerRadius) {
    this.ctx.save();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI * i) / points - Math.PI / 2;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;

      if (i === 0) {
        this.ctx.moveTo(px, py);
      } else {
        this.ctx.lineTo(px, py);
      }
    }

    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  /**
   * Draw special tile overlay
   */
  drawSpecialOverlay(block, x, y, size) {
    this.ctx.save();

    if (block.special === 'locked') {
      // Draw lock icon
      this.ctx.strokeStyle = '#333333';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.arc(x + size / 2, y + size / 2, size / 4, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.fillStyle = '#666666';
      this.ctx.fillRect(
        x + size / 2 - size / 6,
        y + size / 2,
        size / 3,
        size / 4
      );
    } else if (block.special === 'ice') {
      // Draw ice overlay
      this.ctx.fillStyle = 'rgba(200, 230, 255, 0.6)';
      this.ctx.fillRect(x, y, size, size);
      
      // Draw ice crystals
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x + size / 2, y + size / 4);
      this.ctx.lineTo(x + size / 2, y + 3 * size / 4);
      this.ctx.moveTo(x + size / 4, y + size / 2);
      this.ctx.lineTo(x + 3 * size / 4, y + size / 2);
      this.ctx.stroke();
    } else if (block.special === 'metal') {
      // Draw metal overlay
      this.ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
      this.ctx.fillRect(x, y, size, size);
    } else if (block.special === 'crate') {
      // Draw crate overlay
      this.ctx.strokeStyle = '#8B4513';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(x, y, size, size);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + size, y + size);
      this.ctx.moveTo(x + size, y);
      this.ctx.lineTo(x, y + size);
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  /**
   * Draw the game grid
   */
  drawGrid(grid, offsetX, offsetY, blockSize) {
    for (let y = 0; y < grid.height; y++) {
      for (let x = 0; x < grid.width; x++) {
        const block = grid.getBlock(x, y);
        
        if (block) {
          const screenX = offsetX + x * blockSize;
          const screenY = offsetY + y * blockSize;
          this.drawBlock(block, screenX, screenY, blockSize);
        } else {
          // Draw empty cell background
          const screenX = offsetX + x * blockSize;
          const screenY = offsetY + y * blockSize;
          this.drawRoundedRect(
            screenX + 2,
            screenY + 2,
            blockSize - 4,
            blockSize - 4,
            4,
            '#e0e0e0',
            0.5
          );
        }
      }
    }
  }

  /**
   * Draw a button
   */
  drawButton(x, y, width, height, text, options = {}) {
    const {
      bgColor = '#4CAF50',
      textColor = '#ffffff',
      hoverColor = '#45a049',
      disabled = false,
      hover = false
    } = options;

    const color = disabled ? '#cccccc' : (hover ? hoverColor : bgColor);

    this.drawRoundedRect(x, y, width, height, 8, color);
    this.drawText(text, x + width / 2, y + height / 2, {
      color: textColor,
      align: 'center',
      baseline: 'middle',
      font: `${GameConfig.UI.FONT_SIZE_MEDIUM}px ${GameConfig.UI.FONT_FAMILY}`
    });
  }

  /**
   * Get canvas context
   */
  getContext() {
    return this.ctx;
  }

  /**
   * Resize canvas
   */
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.setupHighDPI();
  }
}

export default Renderer;
