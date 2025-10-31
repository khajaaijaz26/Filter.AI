/**
 * InputManager - Handles mouse and touch input
 */
export class InputManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.pointer = {
      x: 0,
      y: 0,
      isDown: false,
      wasPressed: false,
      wasReleased: false
    };
    
    this.lastPointer = {
      x: 0,
      y: 0,
      isDown: false
    };

    this.keys = {};
    this.lastKeys = {};
    
    this.listeners = new Map();
    
    this.setupEventListeners();
  }

  /**
   * Setup event listeners for input
   */
  setupEventListeners() {
    // Mouse events
    this.canvas.addEventListener('mousedown', this.handlePointerDown.bind(this));
    this.canvas.addEventListener('mouseup', this.handlePointerUp.bind(this));
    this.canvas.addEventListener('mousemove', this.handlePointerMove.bind(this));
    this.canvas.addEventListener('mouseleave', this.handlePointerLeave.bind(this));

    // Touch events
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.canvas.addEventListener('touchcancel', this.handleTouchCancel.bind(this), { passive: false });

    // Keyboard events
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));

    // Prevent context menu on canvas
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  /**
   * Handle mouse down
   */
  handlePointerDown(e) {
    e.preventDefault();
    this.updatePointerPosition(e.clientX, e.clientY);
    this.pointer.isDown = true;
    this.emit('pointerdown', this.pointer);
  }

  /**
   * Handle mouse up
   */
  handlePointerUp(e) {
    e.preventDefault();
    this.updatePointerPosition(e.clientX, e.clientY);
    this.pointer.isDown = false;
    this.emit('pointerup', this.pointer);
    
    // Only emit click if pointer didn't move much
    const dx = this.pointer.x - this.lastPointer.x;
    const dy = this.pointer.y - this.lastPointer.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 10) {
      this.emit('click', this.pointer);
    }
  }

  /**
   * Handle mouse move
   */
  handlePointerMove(e) {
    e.preventDefault();
    this.updatePointerPosition(e.clientX, e.clientY);
    this.emit('pointermove', this.pointer);
  }

  /**
   * Handle mouse leave
   */
  handlePointerLeave(e) {
    this.pointer.isDown = false;
  }

  /**
   * Handle touch start
   */
  handleTouchStart(e) {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      this.updatePointerPosition(touch.clientX, touch.clientY);
      this.pointer.isDown = true;
      this.emit('pointerdown', this.pointer);
    }
  }

  /**
   * Handle touch end
   */
  handleTouchEnd(e) {
    e.preventDefault();
    this.pointer.isDown = false;
    
    if (e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      this.updatePointerPosition(touch.clientX, touch.clientY);
      this.emit('pointerup', this.pointer);
      
      // Emit click for tap
      const dx = this.pointer.x - this.lastPointer.x;
      const dy = this.pointer.y - this.lastPointer.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 10) {
        this.emit('click', this.pointer);
      }
    }
  }

  /**
   * Handle touch move
   */
  handleTouchMove(e) {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      this.updatePointerPosition(touch.clientX, touch.clientY);
      this.emit('pointermove', this.pointer);
    }
  }

  /**
   * Handle touch cancel
   */
  handleTouchCancel(e) {
    e.preventDefault();
    this.pointer.isDown = false;
  }

  /**
   * Handle key down
   */
  handleKeyDown(e) {
    this.keys[e.key] = true;
    this.emit('keydown', { key: e.key });
  }

  /**
   * Handle key up
   */
  handleKeyUp(e) {
    this.keys[e.key] = false;
    this.emit('keyup', { key: e.key });
  }

  /**
   * Update pointer position relative to canvas
   */
  updatePointerPosition(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = clientX - rect.left;
    this.pointer.y = clientY - rect.top;
  }

  /**
   * Update input state (call once per frame)
   */
  update() {
    // Update pointer press/release state
    this.pointer.wasPressed = this.pointer.isDown && !this.lastPointer.isDown;
    this.pointer.wasReleased = !this.pointer.isDown && this.lastPointer.isDown;

    // Store last frame state
    this.lastPointer.x = this.pointer.x;
    this.lastPointer.y = this.pointer.y;
    this.lastPointer.isDown = this.pointer.isDown;

    // Update key state
    for (const key in this.keys) {
      this.lastKeys[key] = this.keys[key];
    }
  }

  /**
   * Get current pointer position
   */
  getPointerPosition() {
    return { x: this.pointer.x, y: this.pointer.y };
  }

  /**
   * Check if pointer is down
   */
  isPointerDown() {
    return this.pointer.isDown;
  }

  /**
   * Check if pointer was just pressed
   */
  wasPointerPressed() {
    return this.pointer.wasPressed;
  }

  /**
   * Check if pointer was just released
   */
  wasPointerReleased() {
    return this.pointer.wasReleased;
  }

  /**
   * Check if key is down
   */
  isKeyDown(key) {
    return this.keys[key] === true;
  }

  /**
   * Check if key was just pressed
   */
  wasKeyPressed(key) {
    return this.keys[key] === true && this.lastKeys[key] !== true;
  }

  /**
   * Check if key was just released
   */
  wasKeyReleased(key) {
    return this.keys[key] !== true && this.lastKeys[key] === true;
  }

  /**
   * Register event listener
   */
  on(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  /**
   * Emit event to listeners
   */
  emit(eventType, data) {
    if (this.listeners.has(eventType)) {
      this.listeners.get(eventType).forEach(callback => callback(data));
    }
  }

  /**
   * Remove event listener
   */
  off(eventType, callback) {
    if (this.listeners.has(eventType)) {
      const callbacks = this.listeners.get(eventType);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * Clear all event listeners
   */
  clearListeners() {
    this.listeners.clear();
  }

  /**
   * Cleanup
   */
  destroy() {
    this.clearListeners();
    // Remove event listeners would go here if needed
  }
}

export default InputManager;
