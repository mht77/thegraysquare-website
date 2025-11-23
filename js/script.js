document.addEventListener('DOMContentLoaded', function () {
    // --- Hero Grid Animation ---
    const gridContainer = document.getElementById('hero-grid');
    const gridSize = 7;
    const numCells = gridSize * gridSize;
    const cells = [];
    // Colors corresponding to CSS variables
    const colors = ['--color-red', '--color-green', '--color-blue', '--color-yellow', '--color-purple', '--color-orange', '--color-brown'];

    // Initialize Grid
    for (let i = 0; i < numCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        gridContainer.appendChild(cell);
        cells.push(cell);
    }

    // State
    const cellColors = new Array(numCells).fill(0).map(() => colors[Math.floor(Math.random() * colors.length)]);
    let cursorIndex = Math.floor(Math.random() * numCells);
    let heldColor = colors[Math.floor(Math.random() * colors.length)];

    // Apply initial colors
    cells.forEach((cell, i) => {
        cell.style.backgroundColor = `var(${cellColors[i]})`;
    });

    // Create Cursor Element
    const cursor = document.createElement('div');
    cursor.classList.add('game-cursor');
    gridContainer.appendChild(cursor);

    // Helper to get position
    function getPosition(index) {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        // 50px cell + 6px gap
        const x = col * 56;
        const y = row * 56;
        return { x, y };
    }

    // Initial Cursor State
    const startPos = getPosition(cursorIndex);
    cursor.style.transform = `translate(${startPos.x}px, ${startPos.y}px) translateZ(20px)`;
    cursor.style.backgroundColor = `var(${heldColor})`;

    function updateGrid() {
        const row = Math.floor(cursorIndex / gridSize);
        const col = cursorIndex % gridSize;
        const neighbors = [];

        if (row > 0) neighbors.push(cursorIndex - gridSize);
        if (row < gridSize - 1) neighbors.push(cursorIndex + gridSize);
        if (col > 0) neighbors.push(cursorIndex - 1);
        if (col < gridSize - 1) neighbors.push(cursorIndex + 1);

        const nextIndex = neighbors[Math.floor(Math.random() * neighbors.length)];

        // 1. Move Cursor Visual
        const nextPos = getPosition(nextIndex);
        cursor.style.transform = `translate(${nextPos.x}px, ${nextPos.y}px) translateZ(20px)`;

        // 2. Logic Update (Delayed to match movement)
        setTimeout(() => {
            const colorAtNext = cellColors[nextIndex];

            // Swap Logic:
            // The cell takes the held color
            cellColors[nextIndex] = heldColor;
            cells[nextIndex].style.backgroundColor = `var(${heldColor})`;

            // The held color becomes what was at the cell
            heldColor = colorAtNext;
            cursor.style.backgroundColor = `var(${heldColor})`;

            cursorIndex = nextIndex;
        }, 250); // Halfway through the 500ms transition
    }

    // Run animation
    setInterval(updateGrid, 800);

    // --- Scroll Animations ---
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    sections.forEach(section => observer.observe(section));

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    });

    mobileNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            hamburger.classList.remove('is-active');
            mobileNav.style.display = 'none';
        }
    });
});