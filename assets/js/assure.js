  // Animation au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observer pour tous les éléments animés
        document.querySelectorAll('.assure-card, .stat-item').forEach(el => {
            observer.observe(el);
        });

        // Animation des statistiques
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = counter.textContent;
                const isPercentage = target.includes('%');
                const isPlus = target.includes('+');
                const isSlash = target.includes('/');
                
                let endValue = parseInt(target.replace(/[^\d]/g, ''));
                let startValue = 0;
                const duration = 2000;
                const increment = endValue / (duration / 16);

                const timer = setInterval(() => {
                    startValue += increment;
                    if (startValue >= endValue) {
                        startValue = endValue;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(startValue);
                    if (isPercentage) displayValue += '.9%';
                    else if (isPlus) displayValue += '+';
                    else if (isSlash) displayValue = '24/7';
                    
                    counter.textContent = displayValue;
                }, 16);
            });
        }

        // Déclencher l'animation des compteurs quand la section est visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            statsObserver.observe(statsContainer);
        }

        // Effet de parallaxe subtil sur l'image hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                const speed = scrolled * 0.1;
                heroImage.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${speed}px)`;
            }
        });

        // Ajout d'effets sonores de hover (optionnel)
        document.querySelectorAll('.assure-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Effet de pulsation sur l'icône
                const icon = card.querySelector('.assure-icon');
                icon.classList.add('pulse-animation');
                setTimeout(() => {
                    icon.classList.remove('pulse-animation');
                }, 2000);
            });
        });

        // Gestion responsive pour les animations
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        function handleMobileView(e) {
            const cards = document.querySelectorAll('.assure-card');
            if (e.matches) {
                // Vue mobile : animations plus simples
                cards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                });
            } else {
                // Vue desktop : animations complètes
                cards.forEach((card, index) => {
                    card.style.animationDelay = `${(index + 1) * 0.2}s`;
                });
            }
        }

        mediaQuery.addListener(handleMobileView);
        handleMobileView(mediaQuery);