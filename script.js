document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Flip Cards Logic --- */
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Remove flipped class from all other cards
            projectCards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('flipped');
                }
            });
            // Add flipped class to current card
            card.classList.add('flipped');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('flipped');
        });
    });


    /* --- 2. Skills Circular Layout Logic --- */
    const skillsData = {
        "Backend": [
            { name: "NodeJS", icon: "N" },
            { name: "Express", icon: "E" },
            { name: "Python", icon: "Py" },
            { name: "Java", icon: "J" }
        ],
        "Frontend": [
            { name: "React", icon: "R" },
            { name: "HTML/CSS", icon: "HC" },
            { name: "Tailwind", icon: "T" },
            { name: "JavaScript", icon: "JS" }
        ],
        "Database": [
            { name: "MongoDB", icon: "M" },
            { name: "MySQL", icon: "SQL" },
            { name: "PostgreSQL", icon: "PG" }
        ],
        "Mobile": [
            { name: "Flutter", icon: "F" },
            { name: "React Native", icon: "RN" }
        ],
        "AI/ML": [
            { name: "TensorFlow", icon: "TF" },
            { name: "PyTorch", icon: "PT" },
            { name: "Pandas", icon: "Pd" }
        ],
        "IoT": [
            { name: "Arduino", icon: "Ar" },
            { name: "Raspberry Pi", icon: "RPi" }
        ],
        "Other": [
            { name: "Git", icon: "G" },
            { name: "Docker", icon: "D" },
            { name: "AWS", icon: "AWS" }
        ]
    };

    const orbitContainer = document.getElementById('skills-orbit');
    if (!orbitContainer) return; // Guard clause

    const contentTitle = document.getElementById('skill-category-title');
    const contentList = document.getElementById('skill-list');
    const categories = Object.keys(skillsData);
    const totalCategories = categories.length;

    // Updated dimensions based on new HTML (340x340)
    const containerSize = 340;
    const center = containerSize / 2; // 170
    const btnSize = 50;
    const radius = 135; // Adjusted to fit within 340px container (170 + 135 + 25 = 330 < 340)

    // Render Orbit Buttons
    categories.forEach((category, index) => {
        const btn = document.createElement('div');
        btn.classList.add('skill-orbit-btn');
        btn.textContent = category; // Full name
        btn.setAttribute('title', category);

        // Calculate position
        const angle = (index / totalCategories) * 2 * Math.PI; // radians


        const x = Math.cos(angle) * radius + center - (btnSize / 2);
        const y = Math.sin(angle) * radius + center - (btnSize / 2);

        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;

        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.skill-orbit-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Render Content
            renderSkills(category);
        });

        orbitContainer.appendChild(btn);
    });

    // Initial Render
    if (categories.length > 0) {
        // Select first one after a small delay to ensure DOM is ready? No, immediate is fine.
        const firstBtn = orbitContainer.querySelector('.skill-orbit-btn');
        if (firstBtn) firstBtn.click();
    }

    function renderSkills(category) {
        contentTitle.textContent = category;
        contentList.innerHTML = ''; // Clear existing
        const skills = skillsData[category];

        // Simple animation class reset
        const rightCol = document.getElementById('skills-content');
        rightCol.classList.remove('animate-fade-in-up');
        void rightCol.offsetWidth; // Trigger reflow
        rightCol.classList.add('animate-fade-in-up');

        // Layout: Horizontal row, wrapping if needed, centered
        contentList.className = "flex flex-wrap justify-center gap-6 w-full";

        skills.forEach(skill => {
            const skillCard = document.createElement('div');
            // Use the new .tech-card class defined in extra.css
            skillCard.className = "tech-card min-w-[120px] h-[140px] flex flex-col items-center justify-center gap-3 p-4 rounded-xl cursor-pointer group relative overflow-hidden";

            skillCard.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="w-12 h-12 rounded-lg bg-[#0f172a]/80 flex items-center justify-center text-2xl font-bold text-cyan-400 border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-300 z-10">
                    ${skill.icon}
                </div>
                <span class="font-medium text-slate-300 text-sm tracking-wide group-hover:text-white transition-colors z-10">${skill.name}</span>
            `;
            contentList.appendChild(skillCard);
        });
    }


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
