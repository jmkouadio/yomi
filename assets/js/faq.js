 function toggleFAQ(element) {
            const faqItem = element.parentElement;
            const isExpanded = faqItem.classList.contains('expanded');
            
            // Fermer tous les autres éléments
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('expanded');
                    item.classList.remove('active');
                }
            });
            
            // Toggle l'élément cliqué
            if (isExpanded) {
                faqItem.classList.remove('expanded');
                faqItem.classList.remove('active');
            } else {
                faqItem.classList.add('expanded');
                faqItem.classList.add('active');
            }
        }

        // Animation des éléments FAQ au scroll
        function animateOnScroll() {
            const faqItems = document.querySelectorAll('.faq-item');
            const windowHeight = window.innerHeight;
            
            faqItems.forEach((item, index) => {
                const itemTop = item.getBoundingClientRect().top;
                if (itemTop < windowHeight - 50) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            });
        }

        // Effet hover avancé sur les items FAQ
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                if (!this.classList.contains('expanded')) {
                    this.style.background = '#CB964A';
                    this.style.borderColor = 'rgba(255, 107, 53, 0.3)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (!this.classList.contains('expanded')) {
                    this.style.background = '#CB964A';
                    this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
            });
        });

        // Animation du bouton Contact Us
        const contactBtn = document.querySelector('.contact-btn');
        contactBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        contactBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        contactBtn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        contactBtn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            // Ouvrir la première FAQ par défaut
            const firstFAQ = document.querySelector('.faq-item.active');
            if (firstFAQ) {
                firstFAQ.classList.add('expanded');
            }
            
            animateOnScroll();
        });

        // Écouter le scroll pour les animations
        window.addEventListener('scroll', animateOnScroll);

        // Auto-fermeture des FAQ après 10 secondes d'inactivité
        let inactivityTimer;
        
        function resetInactivityTimer() {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                // Fermer toutes les FAQ sauf la première
                document.querySelectorAll('.faq-item').forEach((item, index) => {
                    if (index === 0) {
                        item.classList.add('active', 'expanded');
                    } else {
                        item.classList.remove('active', 'expanded');
                    }
                });
            }, 10000);
        }

        // Réinitialiser le timer à chaque interaction
        document.addEventListener('click', resetInactivityTimer);
        document.addEventListener('mousemove', resetInactivityTimer);
        
        // Démarrer le timer
        resetInactivityTimer();