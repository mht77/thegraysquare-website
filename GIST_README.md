# The Gray Square

**A Mind-Bending Puzzle Game of Colors and Pathfinding**

![The Gray Square Icon](icon.png)

Welcome to **The Gray Square**, an elegant, minimalist grid puzzle where every single move changes the board. You must think steps ahead, manage your tile inventory, and route your path perfectly to construct target patterns.

---

## 🎮 Game Concept & Mechanics

The goal of the game is simple: **recreate the target pattern on the grid**. However, the path to the solution requires meticulous planning.

### The Core Rule: Color Swapping
* You take control of the **Gray Square** (the cursor).
* As you slide the Gray Square across the grid (Up, Down, Left, Right), it instantly **swaps its currently held color with the tile it lands on**.
* You must navigate the grid, pick up colors from one location, transport them, and drop them where they belong to form the target shape.
* Every move leaves a trail that alters the puzzle state.

![Pattern Selection Examples](pattern-selection.png)

### Complexity Progression
Puzzles scale from basic to advanced across different level packs:
1. **Mono / Simple Lines**: Single-color horizontal or vertical stripes.
2. **Alternating Pairs**: Lines of repeating, dual-color sequences.
3. **Symmetrical Accents & Trios**: Patterns with mirrored accent tiles in the middle.
4. **Mosaics & Crosses**: Intricate, rainbow-colored structures that require multiple color pickups and drop-offs.

![Gameplay Demo](gameplay.png)

---

## ⚙️ The Solver Algorithm

Behind the scenes, the game uses a customized **A\* Search Algorithm** to verify that every puzzle is mathematically solvable and to compute the optimal move count.

* **Heuristic (Transportation Cost):** The solver estimates the lower bound of moves required by calculating the distance needed to fetch correct colors from the grid (or the cursor) and transport them to the mismatched slots.
* **Optimal Path Verification:** The procedural generator ensures levels are challenging but fair by verifying they can be completed in a reasonable number of moves (typically between 7 and 25 moves).

---

## 📄 Privacy Policy
For the Privacy Policy of the game, see `PRIVACY-POLICY.md` (included in this Gist).
