(() => {
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const toggle = document.querySelector("[data-symbols-toggle]");
  if (toggle) {
    const target = document.getElementById(toggle.getAttribute("aria-controls"));
    toggle.addEventListener("click", () => {
      const on = toggle.getAttribute("aria-checked") !== "true";
      toggle.setAttribute("aria-checked", String(on));
      target.classList.toggle("symbols-on", on);
    });
  }

  const tocLinks = [...document.querySelectorAll(".toc a")];
  if (tocLinks.length && "IntersectionObserver" in window) {
    const byId = new Map(tocLinks.map((a) => [a.hash.slice(1), a]));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        tocLinks.forEach((a) => a.classList.remove("active"));
        byId.get(entry.target.id)?.classList.add("active");
      }
    }, { rootMargin: "-80px 0px -70% 0px" });
    byId.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  const demo = document.getElementById("demo");
  if (demo) playable(demo);

  /**
   * The same rule as Player.Arrive in the game: the square starts on the row below the board,
   * sliding along that row is free, and the first landing picks a colour up without leaving one.
   */
  function playable(root) {
    const N = 7;
    const PAR = 9;
    const COLORS = ["red", "green", "blue", "yellow", "purple", "orange", "brown"];
    // Found by a breadth-first solver: optimal in 9 (UUUULRUDR).
    const START = [
      2, 3, 0, 2, 5, 1, 1,
      6, 5, 0, 0, 1, 2, 4,
      6, 2, 2, 3, 4, 1, 0,
      4, 6, 2, 1, 5, 4, 4,
      1, 6, 1, 0, 1, 2, 6,
      3, 2, 5, 6, 4, 2, 4,
      4, 2, 4, 5, 6, 1, 1,
    ];
    const GOAL = new Map([[3 * N + 2, 1], [3 * N + 3, 3], [3 * N + 4, 2]]);
    const paint = (c) => `var(--${COLORS[c]})`;

    const board = root.querySelector(".board");
    const startRow = root.querySelector(".start-row");
    const goalMap = root.querySelector(".goal-map");
    const goalCount = root.querySelector("[data-goal]");
    const moveCount = root.querySelector("[data-moves]");
    const parNote = root.querySelector("[data-par]");
    const msg = root.querySelector(".demo-msg");
    const panel = root.querySelector(".demo-panel");

    const tiles = [];
    for (let i = 0; i < N * N; i++) {
      const t = document.createElement("div");
      t.className = "tile";
      t.dataset.i = i;
      board.appendChild(t);
      tiles.push(t);

      const dot = document.createElement("i");
      if (GOAL.has(i)) dot.style.background = paint(GOAL.get(i));
      goalMap.appendChild(dot);
    }
    const slots = [];
    for (let x = 0; x < N; x++) {
      const s = document.createElement("div");
      s.className = "slot";
      s.dataset.x = x;
      startRow.appendChild(s);
      slots.push(s);
    }
    const player = document.createElement("div");
    player.className = "player empty";
    player.appendChild(document.createElement("i"));
    board.appendChild(player);

    let grid, x, y, carry, moves, won;

    function reset() {
      grid = START.slice();
      x = 3; y = 0; carry = -1; moves = 0; won = false;
      msg.textContent = matchMedia("(pointer: coarse)").matches
        ? "Swipe on the board, or tap a neighboring cell."
        : "Arrow keys, or click a neighboring cell.";
      msg.classList.remove("win");
      render();
    }

    const index = () => (N - y) * N + x;

    function move(dx, dy) {
      if (won) return;
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || nx >= N) return;
      if (dy === 1 && y >= N) return;
      if (dy === -1 && y <= 1) return;
      x = nx; y = ny;
      if (y >= 1) {
        moves++;
        const i = index();
        if (grid[i] !== carry) {
          const picked = grid[i];
          if (carry !== -1) grid[i] = carry;
          carry = picked;
          tiles[i].classList.remove("pop");
          void tiles[i].offsetWidth;
          tiles[i].classList.add("pop");
        }
        won = [...GOAL].every(([i, c]) => grid[i] === c);
      }
      render();
    }

    function render() {
      let done = 0;
      tiles.forEach((t, i) => {
        t.style.setProperty("--c", paint(grid[i]));
        const target = GOAL.has(i);
        const right = target && grid[i] === GOAL.get(i);
        if (right) done++;
        t.classList.toggle("target", target);
        t.classList.toggle("done", right);
        t.classList.toggle("dim", !target);
        t.setAttribute("aria-label", COLORS[grid[i]]);
      });

      const cell = tiles[0].getBoundingClientRect();
      const origin = board.getBoundingClientRect();
      const anchor = y === 0 ? slots[x] : tiles[index()];
      const at = anchor.getBoundingClientRect();
      player.style.width = cell.width + "px";
      player.style.height = cell.height + "px";
      player.style.transform = `translate(${at.left - origin.left}px, ${at.top - origin.top}px)`;
      player.style.setProperty("--c", carry === -1 ? "var(--gray)" : paint(carry));
      player.style.setProperty("--under", y === 0 ? "transparent" : paint(grid[index()]));
      player.classList.toggle("empty", y === 0);

      goalCount.textContent = `${done} of ${GOAL.size}`;
      moveCount.textContent = moves;
      const left = PAR - moves;
      parNote.textContent = left > 0 ? `${left} left for par` : left === 0 ? "on par" : `${-left} over par`;

      if (won) {
        msg.classList.add("win");
        msg.textContent = moves <= PAR
          ? `Solved in ${moves} — that's par. Gold tile.`
          : `Solved in ${moves}. Par is ${PAR} — try again?`;
      }
    }

    const DIRS = { ArrowUp: [0, 1], ArrowDown: [0, -1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
    panel.addEventListener("keydown", (e) => {
      const d = DIRS[e.key];
      if (!d) return;
      e.preventDefault();
      move(...d);
    });

    let down = null;
    panel.addEventListener("pointerdown", (e) => {
      down = { x: e.clientX, y: e.clientY };
    });
    panel.addEventListener("pointerup", (e) => {
      if (!down) return;
      const dx = e.clientX - down.x, dy = e.clientY - down.y;
      down = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) > 24) {
        if (Math.abs(dx) > Math.abs(dy)) move(Math.sign(dx), 0);
        else move(0, -Math.sign(dy));
        return;
      }
      const hit = e.target.closest(".tile, .slot");
      if (!hit) return;
      const tx = hit.dataset.x !== undefined ? +hit.dataset.x : +hit.dataset.i % N;
      const ty = hit.dataset.x !== undefined ? 0 : N - Math.floor(+hit.dataset.i / N);
      if (Math.abs(tx - x) + Math.abs(ty - y) === 1) move(tx - x, ty - y);
    });
    panel.addEventListener("pointercancel", () => { down = null; });

    root.querySelector("[data-reset]").addEventListener("click", reset);
    window.addEventListener("resize", render);
    reset();
  }
})();
