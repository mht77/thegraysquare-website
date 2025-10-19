document.addEventListener('DOMContentLoaded', function() {
    // --- Hero Grid Animation ---
    const gridContainer = document.getElementById('hero-grid');
    const gridSize = 7;
    const numCells = gridSize * gridSize;
    const cells = [];
    const colors = ['--color-red', '--color-green', '--color-blue', '--color-yellow', '--color-purple', '--color-orange', '--color-brown'];

    for (let i = 0; i < numCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        gridContainer.appendChild(cell);
        cells.push(cell);
    }

    function swapCells(cellA, cellB) {
        const rectA = cellA.getBoundingClientRect();
        const rectB = cellB.getBoundingClientRect();
        const transformA = `translate(${rectB.left - rectA.left}px, ${rectB.top - rectA.top}px)`;
        const transformB = `translate(${rectA.left - rectB.left}px, ${rectA.top - rectB.top}px)`;
        cellA.style.transform = transformA;
        cellB.style.transform = transformB;
        setTimeout(() => {
            cellA.style.transform = '';
            cellB.style.transform = '';
            const tempColor = cellA.style.backgroundColor;
            cellA.style.backgroundColor = cellB.style.backgroundColor;
            cellB.style.backgroundColor = tempColor;
        }, 300);
    }

    // Set initial colors for all cells
    cells.forEach(cell => {
        cell.style.backgroundColor = `var(${colors[Math.floor(Math.random() * colors.length)]})`;
    });

    setInterval(() => {
        const cellIndex1 = Math.floor(Math.random() * numCells);
        let cellIndex2 = -1;
        const deltas = [-1, 1, -gridSize, gridSize].filter(d => {
            const newIndex = cellIndex1 + d;
            const c1_row = Math.floor(cellIndex1 / gridSize);
            const c1_col = cellIndex1 % gridSize;
            const n_row = Math.floor(newIndex / gridSize);
            const n_col = newIndex % gridSize;
            return newIndex >= 0 && newIndex < numCells && (c1_row === n_row || c1_col === n_col);
        });

        if(deltas.length > 0) {
            cellIndex2 = cellIndex1 + deltas[Math.floor(Math.random() * deltas.length)];
        } else {
            cellIndex2 = (cellIndex1 + 1) % numCells;
        }

        if (cells[cellIndex1] && cells[cellIndex2]) {
            swapCells(cells[cellIndex1], cells[cellIndex2]);
        }
    }, 1000);

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