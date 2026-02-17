document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Flip Cards Logic --- */
    const projectCards = document.querySelectorAll('.project-card');
    let activeCard = null;

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Remove flipped class from previously active card
            if (activeCard && activeCard !== card) {
                activeCard.classList.remove('flipped');
            }
            // Add flipped class to current card
            card.classList.add('flipped');
            activeCard = card;
        });
    });

    // Remove flipped class when moving away from all cards
    document.addEventListener('mousemove', (e) => {
        const isOverCard = Array.from(projectCards).some(card => {
            const rect = card.getBoundingClientRect();
            return e.clientX >= rect.left && e.clientX <= rect.right &&
                   e.clientY >= rect.top && e.clientY <= rect.bottom;
        });
        
        if (!isOverCard && activeCard) {
            activeCard.classList.remove('flipped');
            activeCard = null;
        }
    });


    /* --- 2. Skills Grid Layout Logic --- */
    const allSkills = [
        { name: "React", icon: "R" },
        { name: "Next.js", icon: "N" },
        { name: "HTML5", icon: "H" },
        { name: "CSS3", icon: "C" },
        { name: "Tailwind", icon: "T" },
        { name: "Framer Motion", icon: "F" },
        { name: "JavaScript", icon: "JS" },
        { name: "TypeScript", icon: "TS" },
        { name: "Python", icon: "Py" },
        { name: "Node.js", icon: "N" },
        { name: "Express", icon: "E" },
        { name: "MongoDB", icon: "M" },
        { name: "PostgreSQL", icon: "PG" },
        { name: "MySQL", icon: "SQL" },
        { name: "Docker", icon: "D" },
        { name: "Git", icon: "G" },
        { name: "AWS", icon: "AWS" },
        { name: "Firebase", icon: "FB" }
    ];

    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return; // Guard clause

    // Render Skills Grid
    allSkills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = "tech-card h-[160px] flex flex-col items-center justify-center gap-3 p-4 rounded-xl cursor-pointer group relative overflow-hidden";

        skillCard.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="w-12 h-12 rounded-lg bg-[#0f172a]/80 flex items-center justify-center text-xl font-bold text-cyan-400 border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-300 z-10">
                ${skill.icon}
            </div>
            <span class="font-medium text-slate-300 text-sm tracking-wide group-hover:text-white transition-colors z-10 text-center">${skill.name}</span>
        `;
        skillsGrid.appendChild(skillCard);
    });


    /* --- 3. Show More / Show Less Logic --- */
    function setupShowMore(btnId, gridId) {
        const btn = document.getElementById(btnId);
        const grid = document.getElementById(gridId);

        if (!btn || !grid) return;

        // Store references to the items that are hidden by default
        const hiddenItems = Array.from(grid.querySelectorAll('.hidden-item'));

        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('data-expanded') === 'true';

            if (!isExpanded) {
                // Expand: Show all hidden items
                hiddenItems.forEach(item => {
                    item.classList.remove('hidden-item', 'hidden');
                    item.classList.add('animate-fade-in-up');
                });
                btn.textContent = 'Show Less';
                btn.setAttribute('data-expanded', 'true');
            } else {
                // Collapse: Hide items again
                hiddenItems.forEach(item => {
                    item.classList.add('hidden-item', 'hidden');
                    item.classList.remove('animate-fade-in-up');
                });
                btn.textContent = 'Show More';
                btn.setAttribute('data-expanded', 'false');

                // Smooth scroll back to the start of the grid or section
                // Using 'nearest' or 'center' might be better to keep context
                const section = grid.closest('section');
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    setupShowMore('show-more-projects', 'projects-grid');
    setupShowMore('show-more-blog', 'blog-grid');
    setupShowMore('show-more-activities', 'activities-grid');

});
