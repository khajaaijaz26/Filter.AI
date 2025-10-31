# MindMesh - Game Design Document

## Executive Summary

**Game Name**: MindMesh  
**Genre**: Puzzle / Match-3 Hybrid / Block Clearing  
**Platform**: Web (HTML5), Mobile (iOS/Android via wrapper)  
**Target Audience**: Casual gamers, ages 12+  
**Core Loop**: Match and clear colored blocks to achieve level objectives  
**USP**: Innovative "Mesh Combo" system allowing strategic non-adjacent block linking

---

## Game Overview

MindMesh is a puzzle game that combines traditional match-3 mechanics with innovative strategic elements. Players clear colored blocks from an 8x8 grid by matching 3 or more connected blocks of the same color. The signature "Mesh Combo" mechanic allows players to create custom paths linking blocks for massive combos and strategic depth.

### Core Pillars
1. **Easy to Learn, Hard to Master**: Intuitive tap-to-clear mechanics with deep strategic possibilities
2. **Satisfying Feedback**: Juicy animations, sound effects, and particle effects for every action
3. **Progressive Challenge**: Carefully designed difficulty curve with varied objectives
4. **Strategic Depth**: Multiple paths to victory, power-up management, combo planning
5. **Addictive Progression**: Level unlocks, upgrades, achievements, and daily content

---

## Core Gameplay Mechanics

### Grid System
- **Size**: 8x8 grid (configurable for special levels)
- **Block Types**: 5-7 different colors (adjustable for accessibility)
- **Generation**: Random with algorithm ensuring solvable states
- **Gravity**: Blocks fall downward when blocks below are cleared

### Matching Rules
- **Minimum Match**: 3 or more connected blocks (orthogonally adjacent)
- **Selection**: Tap or click on a group to select and clear
- **Visual Feedback**: Selected group highlights before clearing
- **Simultaneous Clearing**: All selected blocks clear at once

### Scoring System
```
Base Score per Block = 10 points

Combo Multiplier:
- 3 blocks: 1x
- 4 blocks: 1.2x
- 5 blocks: 1.5x
- 6-8 blocks: 2x
- 9-12 blocks: 3x
- 13+ blocks: 5x

Chain Multiplier:
- 1st chain: 1x
- 2nd chain: 1.5x
- 3rd chain: 2x
- 4th chain: 3x
- 5th+ chain: 5x

Total Score = Base Score × Combo Multiplier × Chain Multiplier

Power-up Bonus: +100 per power-up triggered
```

### Chain Reactions
When blocks are cleared and remaining blocks fall, new matches may form automatically. Each subsequent auto-match increases the chain multiplier, rewarding players for strategic setups.

### Star Rating
Each level has score thresholds for 1-3 stars:
- 1 Star: Complete objective
- 2 Stars: Score >= 1.5x threshold
- 3 Stars: Score >= 2.5x threshold

---

## Power-Ups

### Bomb (Unlocked Level 5)
- **Effect**: Clears a 3x3 area around the target block
- **Creation**: Match 6-8 blocks in one move
- **Visual**: Block with bomb icon
- **Upgrade Levels**: 
  - Level 1: 3x3 radius
  - Level 2: 5x5 radius
  - Level 3: 7x7 radius + destroys special tiles

### Line Clear (Unlocked Level 10)
- **Effect**: Clears entire row or column
- **Creation**: Match 9-11 blocks in one move
- **Visual**: Block with arrow icon (horizontal or vertical)
- **Upgrade Levels**:
  - Level 1: Single line
  - Level 2: Cross pattern (row + column)
  - Level 3: Double line (two rows or two columns)

### Color Bomb (Unlocked Level 20)
- **Effect**: Clears all blocks of one color across the board
- **Creation**: Match 12+ blocks in one move
- **Visual**: Rainbow-colored block
- **Upgrade Levels**:
  - Level 1: Clears target color
  - Level 2: Clears target color + adjacent colors
  - Level 3: Clears two colors chosen by player

### Power-Up Combinations
Combining two power-ups by matching them together triggers special effects:
- **Bomb + Bomb**: Mega explosion (5x5 → 7x7)
- **Bomb + Line**: Explosive line (destroys entire line + 3x3 at each block)
- **Bomb + Color Bomb**: All blocks of selected color become bombs and explode
- **Line + Line**: Clears entire cross + all blocks in adjacent lines
- **Color Bomb + Color Bomb**: Clears entire board

---

## Special Tiles

### Locked Tiles (Introduced Level 15)
- **Behavior**: Cannot be cleared by normal matches
- **Clear Condition**: Match adjacent blocks OR use power-ups
- **Visual**: Block with lock icon/chain overlay
- **Variants**: 
  - Single lock: 1 adjacent match clears
  - Double lock: 2 adjacent matches needed

### Ice Blocks (Introduced Level 25)
- **Behavior**: Frozen blocks cannot move
- **Clear Condition**: Match to thaw, then match again to clear
- **Visual**: Block with ice/frost overlay
- **Spread Mechanic**: In some levels, ice spreads to adjacent blocks each turn

### Metal Obstacles (Introduced Level 35)
- **Behavior**: Immovable, unbreakable obstacles
- **Clear Condition**: Cannot be cleared (permanent obstacles)
- **Visual**: Gray metallic blocks
- **Purpose**: Creates strategic puzzle constraints

### Crate Tiles (Introduced Level 40)
- **Behavior**: Wooden crate overlay on normal blocks
- **Clear Condition**: Match adjacent blocks to destroy crate, then clear normally
- **Visual**: Wooden box overlay
- **Variants**: Single/double crate (2 hits needed for double)

---

## Level Objectives

### Score Target
- **Goal**: Reach target score within move limit
- **Stars**: Based on final score
- **Example**: "Score 5,000 points in 20 moves"

### Clear Specific Blocks
- **Goal**: Clear X number of specific colored blocks
- **Example**: "Clear 30 red blocks in 25 moves"

### Drop Items
- **Goal**: Bring special items (with star/diamond icon) to the bottom row
- **Mechanics**: Items drop when blocks beneath them are cleared
- **Example**: "Collect 5 stars in 30 moves"

### Remove Obstacles
- **Goal**: Clear all locked/ice/crate tiles
- **Example**: "Break all 15 ice blocks in 20 moves"

### Reach Score Without Power-Ups
- **Goal**: Strategic challenge, power-ups disabled
- **Example**: "Score 8,000 points without power-ups in 25 moves"

### Combo Challenge
- **Goal**: Achieve X number of 10+ block matches
- **Example**: "Make 3 mega-combos (10+ blocks) in 15 moves"

### Mix Objectives
- **Goal**: Multiple objectives simultaneously
- **Example**: "Score 6,000 points AND collect 3 stars in 20 moves"

---

## Signature Mechanic: Mesh Combos (v2.0)

### Concept
Instead of only matching orthogonally adjacent blocks, players can **draw a path** connecting blocks of the same color, even if not adjacent, to create strategic "mesh" patterns.

### Mechanics
- **Activation**: Hold and drag from one block to another of the same color
- **Path Visual**: Glowing line follows finger/cursor, connecting selected blocks
- **Rules**:
  - Minimum 3 blocks
  - All blocks must be the same color
  - Path cannot cross itself
  - Path can skip over other blocks (non-adjacent allowed)
- **Scoring Bonus**: Mesh combos receive +50% score multiplier
- **Strategic Use**: 
  - Create specific shapes for bonus multipliers (triangle, square, star)
  - Connect distant blocks to trigger multiple chain reactions
  - Plan ahead for optimal board clearing

### Shape Bonuses (Advanced Mesh)
- **Triangle** (3 blocks in triangle formation): +1 bomb
- **Square** (4 blocks in square): +2 bombs
- **Star** (5 blocks in star pattern): Line clear power-up
- **Pentagon+** (6+ blocks in closed shape): Color bomb

This mechanic adds a strategic layer, allowing skilled players to create more efficient solutions and larger combos than standard matching.

---

## Progression Systems

### Level Progression
- **Structure**: 10 worlds with 20 levels each (200 total for v1.0, 100 initially)
- **World Themes**:
  1. Garden Grove (Tutorial levels 1-20)
  2. Ocean Depths (Levels 21-40)
  3. Desert Sands (Levels 41-60)
  4. Mystic Forest (Levels 61-80)
  5. Frozen Peaks (Levels 81-100)
  6. Volcanic Cavern (Levels 101-120) [v1.2+]
  7. Space Station (Levels 121-140) [v1.3+]
  8. Candy Kingdom (Levels 141-160) [v1.4+]
  9. Ancient Ruins (Levels 161-180) [v2.0+]
  10. Digital Realm (Levels 181-200) [v2.0+]

### Unlock System
- Complete level to unlock next
- Star requirements for world unlocks (e.g., 30 stars to unlock World 2)
- Optional: Gate some levels behind achievements

### Difficulty Curve
- **Levels 1-10**: Tutorial, easy objectives, generous move limits
- **Levels 11-30**: Introduce special tiles, tighter move limits
- **Levels 31-50**: Combine mechanics, complex objectives
- **Levels 51-70**: Advanced puzzles, strategic planning required
- **Levels 71+**: Expert level, multiple objectives, limited moves

### Economy System

#### Coins (Soft Currency)
- **Earned From**:
  - Level completion: 50-200 coins (based on stars)
  - Daily login: 100 coins
  - Daily missions: 50-150 coins each
  - Achievements: 100-500 coins
  - Watching ads (optional): 50 coins per ad
- **Spent On**:
  - Power-up purchases (pre-level): 200 coins
  - Extra moves (5 moves): 500 coins
  - Retry level: 300 coins
  - Cosmetic items: 1,000-5,000 coins

#### Gems (Hard Currency)
- **Earned From**:
  - First-time 3-star on levels: 3 gems
  - Achievement milestones: 10-50 gems
  - Daily mission streaks: 5 gems
  - IAP purchases (if implemented)
- **Spent On**:
  - Permanent upgrades: 50-200 gems
  - Coin packs: 50 gems = 2,000 coins
  - Premium cosmetics: 100-500 gems
  - Continue from failure: 10 gems

### Upgrade System
Players spend coins and gems to upgrade power-ups and abilities:

**Power-Up Upgrades** (3 levels each):
- Bomb radius increase
- Line clear expansion
- Color bomb dual-color
- Cost: 500/1,000/2,000 coins + 10/20/50 gems per level

**Starting Bonuses** (Purchasable):
- Start with extra moves: +5 moves (100 gems, permanent)
- Start with free bomb (50 gems per use)
- Multiplier boost: 1.5x score (75 gems per use)

**Permanent Upgrades**:
- Hint system: Shows best move (200 gems unlock)
- Undo last move: Can undo once per level (150 gems unlock)
- Chain vision: Highlights potential chains (250 gems unlock)

---

## Meta-Game Systems

### Daily Missions (v1.2+)
3 daily missions refresh every 24 hours:
- "Clear 50 red blocks"
- "Complete 3 levels with 3 stars"
- "Use 5 power-ups"
- "Achieve a 5x combo"
- "Score 15,000 points in a single level"

**Rewards**: Coins, gems, progress toward weekly mission

### Achievements
- **Completion**: "Complete World 1" (500 coins)
- **Mastery**: "Get 3 stars on 50 levels" (1,000 coins, 20 gems)
- **Skill**: "Achieve a 10x combo" (300 coins)
- **Collection**: "Unlock all power-ups" (50 gems)
- **Social**: "Share score 5 times" (100 coins)

### Leaderboards (v1.0 local, v1.2 global)
- **Overall**: Total score across all levels
- **World**: Best scores per world
- **Daily Challenge**: Daily puzzle rankings
- **Weekly Tournament**: Special event leaderboard (v2.0+)

### Daily Puzzle (v1.2+)
- **Format**: One unique puzzle per day, same for all players
- **Objective**: Achieve highest score or solve in fewest moves
- **Rewards**: Ranking on leaderboard, coins based on performance
- **Persistence**: Can attempt multiple times, best score counts

### Season Pass (v2.0+)
- **Duration**: 30-day seasons
- **Free Track**: Rewards every 5 levels (coins, power-ups)
- **Premium Track**: Enhanced rewards (gems, exclusive cosmetics)
- **Progression**: Earn XP from playing levels, completing missions
- **Exclusive**: Premium cosmetics only available during season

---

## User Interface

### Main Menu
- **Play Button**: Enter level map
- **Daily Puzzle**: (v1.2+) Enter today's challenge
- **Shop**: Purchase coins, gems, cosmetics
- **Upgrades**: View and purchase power-up upgrades
- **Achievements**: View progress
- **Settings**: Sound, music, effects, language, privacy
- **Profile**: (v2.0+) Stats, friends, level progress

### Level Map
- **Visual**: Scrollable map with nodes for each level
- **Node States**:
  - Locked: Gray, shows lock icon
  - Available: Colored, animated
  - Completed: Shows star count (1-3)
  - Current: Highlighted, pulsing
- **World Gates**: Special nodes between worlds showing star requirement
- **Navigation**: Scroll/swipe, tap level to see details, tap again to play

### Pre-Level Screen
- **Level Info**: Number, objective, move limit
- **Best Score**: Player's high score and star count
- **Boosters**: Option to purchase starting power-ups
- **Play Button**: Start level

### In-Game HUD
- **Top Bar**:
  - Level number
  - Objective progress (e.g., "Score: 3,450 / 5,000")
  - Moves remaining
  - Pause button
- **Game Grid**: 8x8 centered
- **Bottom**: Next available power-up preview (if any)
- **Side (optional)**: Power-up inventory

### Post-Level Screen
- **Victory**:
  - Stars earned (animated)
  - Score breakdown
  - Coins/gems earned
  - "Next Level" / "Replay" / "Main Menu" buttons
- **Failure**:
  - "So close!" message
  - Score achieved vs target
  - Options: "Retry" (free or cost) / "Extra Moves" (cost) / "Main Menu"

### Pause Menu
- **Resume**
- **Restart Level**
- **Settings**
- **Quit to Menu**

### Settings
- **Audio**: Music volume, SFX volume
- **Visuals**: Particles on/off, colorblind mode
- **Account**: (v2.0+) Login, cloud save
- **Help**: Tutorial replay, FAQ
- **Privacy**: Data usage policy
- **About**: Version, credits, licenses

---

## Art Style

### Visual Direction
- **Style**: Clean, modern, vibrant
- **Colors**: Bright, distinct color palette for blocks
- **UI**: Minimalist, flat design with subtle shadows and gradients
- **Animations**: Smooth, snappy, juicy (bounce, squash/stretch)
- **Particles**: Abundant for feedback (sparkles, explosions, trails)

### Block Design
- **Shape**: Rounded squares, slightly 3D
- **Colors**: Distinct hues with slight gradient
  - Red, Blue, Green, Yellow, Purple, Orange, Pink (7 colors max)
- **Power-Up Icons**: Clear, recognizable symbols
- **Special Tiles**: Visual overlays (chains, ice, cracks)

### World Themes
Each world has unique background and subtle block variations:
- **Garden Grove**: Grass, flowers, butterflies
- **Ocean Depths**: Water, bubbles, fish
- **Desert Sands**: Sand dunes, sun, cacti
- **Mystic Forest**: Trees, fireflies, mushrooms
- **Frozen Peaks**: Snow, icicles, northern lights

### Accessibility
- **Colorblind Mode**: Patterns/symbols on blocks in addition to colors
- **High Contrast**: Option for increased contrast
- **Scalable UI**: Elements scale for different screen sizes

---

## Audio Design

### Music
- **Main Menu**: Upbeat, welcoming loop
- **In-Game**: Calm, focused background music (varies by world theme)
- **Victory**: Triumphant jingle
- **Defeat**: Gentle, encouraging tune

### Sound Effects
- **Block Select**: Soft click
- **Block Clear**: Satisfying "pop" (pitch varies by combo size)
- **Chain Reaction**: Ascending chime with each chain
- **Power-Up Creation**: Special "charge up" sound
- **Power-Up Activation**: Explosion, whoosh, or magical sound
- **Level Complete**: Success fanfare
- **Star Earned**: Distinct chime for each star
- **UI Navigation**: Subtle button press sounds
- **Error**: Gentle negative feedback

### Audio Strategy
- **Layering**: Multiple SFX can play simultaneously without clashing
- **Dynamic Music**: Intensity increases with combo multiplier (optional v2.0)
- **Settings**: Independent volume controls for music and SFX

---

## Technical Requirements

### Performance Targets
- **Frame Rate**: 60 FPS on target devices (desktop, modern mobile)
- **Load Time**: <3 seconds initial load, <1 second level load
- **Memory**: <100MB RAM usage
- **Battery**: Efficient rendering to minimize battery drain on mobile

### Platform Support
- **Web Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari 13+, Android Chrome 80+
- **Screen Sizes**: 320px width minimum, responsive up to 4K
- **Input**: Mouse, touch, keyboard (arrow keys + space for accessibility)

### Data Management
- **Save Data**: localStorage for web, native storage for mobile
- **Save Contents**:
  - Level progress (completion, stars, scores)
  - Currency balances (coins, gems)
  - Upgrade purchases
  - Settings preferences
  - Achievement progress
- **Cloud Save** (v2.0+): Sync across devices with account

### Analytics Events
- `game_start`
- `level_start` (level_id, attempt_number)
- `level_complete` (level_id, score, stars, moves_used, time_taken)
- `level_fail` (level_id, score, moves_used)
- `power_up_created` (type, level_id)
- `power_up_used` (type, level_id)
- `purchase` (item_type, currency_type, amount)
- `ad_watched` (placement)
- `tutorial_complete`
- `session_length`

---

## Monetization (v1.4+, optional)

### In-App Purchases
- **Coin Packs**: $0.99 / $2.99 / $4.99 / $9.99
- **Gem Packs**: $0.99 / $4.99 / $9.99 / $19.99
- **Starter Pack**: $2.99 (discounted coins + gems)
- **Ad Removal**: $4.99 (removes all ads permanently)
- **Season Pass**: $4.99 (premium track access)

### Advertising (Optional)
- **Rewarded Video**: 
  - Extra moves mid-level
  - Coin rewards
  - Free power-up
  - Retry level
- **Interstitial** (optional, non-intrusive):
  - After level complete (frequency capped)
  - On return to main menu

### Balance Philosophy
- **Never Pay-to-Win**: All levels beatable with skill, no purchase required
- **Generous Free Path**: Free players can progress and enjoy full game
- **Value for Money**: Purchases feel worthwhile, not exploitative
- **No Dark Patterns**: Clear pricing, no hidden costs, opt-in only

---

## Quality Assurance

### Test Plan
- **Unit Tests**: Matching algorithm, scoring, power-up logic, chain detection
- **Integration Tests**: Level loading, save/load, UI flows
- **Playtest Goals**:
  - Levels 1-10 completable by 95% of new players
  - Difficulty curve feels smooth, not frustrating
  - Average player reaches level 50 within 2 hours
- **Performance Tests**: Frame rate, memory usage, load times
- **Compatibility Tests**: All target browsers and devices

### Beta Testing (v1.0)
- **Participants**: 200+ diverse players
- **Duration**: 2 weeks
- **Focus**: Balance, bugs, engagement, retention
- **Metrics**: Retention (D1, D7), session length, level completion rates

---

## Localization (v3.0+)

### Target Languages
1. English (en-US) - default
2. Spanish (es-ES)
3. French (fr-FR)
4. German (de-DE)
5. Portuguese (pt-BR)
6. Russian (ru-RU)
7. Japanese (ja-JP)
8. Korean (ko-KR)
9. Simplified Chinese (zh-CN)
10. Arabic (ar-SA)

### Localization Scope
- All UI text
- Tutorial instructions
- Achievement names and descriptions
- Error messages
- Level objective descriptions

### Technical
- String externalization (JSON locale files)
- Right-to-left (RTL) support for Arabic
- Text expansion allowance (some languages 30% longer)

---

## Competitive Analysis

### Similar Games
- **Block Blast**: Direct inspiration, focus on block clearing
- **Candy Crush**: Match-3 standard, strong progression
- **Bejeweled**: Classic match-3 puzzle
- **2048**: Merging mechanic, minimalist
- **Tetris**: Block manipulation, timeless appeal

### Differentiators
- **Mesh Combo Mechanic**: Unique to MindMesh
- **Strategic Depth**: Multiple solution paths, power-up combos
- **Polish**: Focus on satisfying feedback and juicy animations
- **Balance**: Generous free experience, no pay-to-win
- **Progression**: Rich meta-game with upgrades and achievements

---

## Success Criteria

### Player Engagement
- Average session: 5-10 minutes
- Sessions per day: 2-4
- D1 retention: 40%+
- D7 retention: 15%+
- D30 retention: 5%+

### Quality
- Crash rate: <1%
- Average rating: 4.5+ stars
- Frame rate: 60 FPS on target devices

### Business (if monetized)
- IAP conversion: 2%+
- ARPDAU: $0.05+
- LTV: $1.50+

---

## Conclusion

MindMesh is designed to be a polished, engaging puzzle game that respects players' time and intelligence. By combining intuitive core mechanics with innovative strategic elements, we create a game that appeals to both casual players and puzzle enthusiasts. The roadmap supports iterative development, allowing us to launch an MVP and continuously improve based on player feedback and data.

**Key Takeaways**:
- **Core Loop**: Match blocks → Clear → Score → Progress
- **Innovation**: Mesh Combo system adds strategic depth
- **Retention**: Daily content, progression systems, achievements
- **Quality**: 60 FPS, polished UI/UX, satisfying feedback
- **Monetization**: Optional, respectful, never pay-to-win
