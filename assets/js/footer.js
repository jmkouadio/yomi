   // Gestion du bouton de remontée
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        // Afficher/masquer le bouton selon la position de scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        // Fonctionnalité de remontée en haut
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Animation fade-in pour les éléments du footer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observer tous les éléments fade-in-up
        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });
        
        // Effet de hover sur les liens du footer
        document.querySelectorAll('.footer-links a').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
        
        // Animation des icônes sociales
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) rotate(5deg)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotate(0deg)';
            });
        });