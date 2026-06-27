# The Gray Square

*A mind-bending puzzle game of colors and pathfinding*

<img src="icon.png" width="120" alt="The Gray Square Icon">

Welcome to **The Gray Square**, an elegant, minimalist grid puzzle where every single move alters the board. Guide the cursor, swap colors as you navigate, and plan your path steps ahead to rebuild complex patterns.

---

## 🎮 Game Concept & Mechanics

The goal of the game is simple: **recreate the target pattern on the grid**. However, the path to the solution requires meticulous planning.

### The Core Rule: Color Swapping
* You take control of the **Gray Square** (the cursor).
* As you slide the Gray Square across the grid (Up, Down, Left, Right), it instantly **swaps its currently held color with the tile it lands on**.
* You must navigate the grid, pick up colors from one location, transport them, and drop them where they belong to form the target shape.
* Every move leaves a trail that alters the puzzle state.

<img src="pattern-selection.png" width="400" alt="Pattern Selection Examples">

### Complexity Progression
Puzzles scale from basic to advanced across different level packs:
1. **Mono / Simple Lines**: Single-color horizontal or vertical stripes.
2. **Alternating Pairs**: Lines of repeating, dual-color sequences.
3. **Symmetrical Accents & Trios**: Patterns with mirrored accent tiles in the middle.
4. **Mosaics & Crosses**: Intricate, rainbow-colored structures that require multiple color pickups and drop-offs.

<img src="gameplay.png" width="300" alt="Gameplay Demo">

---

## ⚙️ The Solver Algorithm

Behind the scenes, the game uses a customized **A\* Search Algorithm** to verify that every puzzle is mathematically solvable and to compute the optimal move count.

* **Heuristic (Transportation Cost):** The solver estimates the lower bound of moves required by calculating the distance needed to fetch correct colors from the grid (or the cursor) and transport them to the mismatched slots.
* **Optimal Path Verification:** The procedural generator ensures levels are challenging but fair by verifying they can be completed in a reasonable number of moves (typically between 7 and 25 moves).

---

## 📄 Privacy Policy
For the Privacy Policy of the game, see [Privacy Policy](https://gist.github.com/mht77/2cf33813b2cb057497a8a619cfced4fa).
