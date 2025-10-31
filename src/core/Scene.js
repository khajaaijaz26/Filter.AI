/**
 * Scene base class
 */
export class Scene {
  constructor(name) {
    this.name = name;
    this.manager = null;
  }

  /**
   * Set the game manager reference
   */
  setManager(manager) {
    this.manager = manager;
  }

  /**
   * Called once when scene initializes
   */
  init() {
    // Override in subclass
  }

  /**
   * Called when entering this scene
   */
  onEnter() {
    // Override in subclass
  }

  /**
   * Called when leaving this scene
   */
  onExit() {
    // Override in subclass
  }

  /**
   * Update scene logic
   */
  update(deltaTime) {
    // Override in subclass
  }

  /**
   * Render scene
   */
  render(renderer) {
    // Override in subclass
  }

  /**
   * Handle window resize
   */
  onResize() {
    // Override in subclass
  }

  /**
   * Get input manager from game manager
   */
  getInputManager() {
    return this.manager ? this.manager.getInputManager() : null;
  }

  /**
   * Get renderer from game manager
   */
  getRenderer() {
    return this.manager ? this.manager.getRenderer() : null;
  }

  /**
   * Change to another scene
   */
  changeScene(sceneName) {
    if (this.manager) {
      this.manager.changeScene(sceneName);
    }
  }
}

export default Scene;
