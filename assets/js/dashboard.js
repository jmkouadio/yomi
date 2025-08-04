// JavaScript pour la gestion des onglets
document.addEventListener('DOMContentLoaded', function() {
    const navCards = document.querySelectorAll('.nav-card');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Fonction pour changer d'onglet
    function switchTab(targetTab) {
        // Retirer la classe active de tous les boutons
        navCards.forEach(card => card.classList.remove('active'));
        
        // Cacher tous les contenus
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Activer le bouton cliqué
        const activeCard = document.querySelector(`[data-tab="${targetTab}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
        
        // Afficher le contenu correspondant
        const activeContent = document.getElementById(`${targetTab}-content`);
        if (activeContent) {
            // Petit délai pour l'animation
            setTimeout(() => {
                activeContent.classList.add('active');
            }, 50);
        }
        
        // Animation des éléments visuels spécifiques
        animateVisualElements(targetTab);
    }
    
    // Fonction pour animer les éléments visuels
    function animateVisualElements(tab) {
        switch(tab) {
            case 'security':
                animateSecurityElements();
                break;
            case 'performance':
                animatePerformanceElements();
                break;
            case 'support':
                animateSupportElements();
                break;
            case 'innovation':
                animateInnovationElements();
                break;
        }
    }
    
    // Animations spécifiques pour chaque section
    function animateSecurityElements() {
        const rings = document.querySelectorAll('.ring');
        rings.forEach((ring, index) => {
            ring.style.animation = 'none';
            setTimeout(() => {
                ring.style.animation = `ripple 3s infinite ${index}s`;
            }, 100);
        });
    }
    
    function animatePerformanceElements() {
        const meterArc = document.querySelector('.meter-arc');
        const fills = document.querySelectorAll('.bar .fill');
        
        if (meterArc) {
            meterArc.style.animation = 'none';
            setTimeout(() => {
                meterArc.style.animation = 'spin 2s linear infinite';
            }, 100);
        }
        
        fills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = width;
            }, 200);
        });
    }
    
    function animateSupportElements() {
        const chatBubble = document.querySelector('.chat-bubble');
        const statusDot = document.querySelector('.status-dot');
        
        if (chatBubble) {
            chatBubble.style.animation = 'none';
            setTimeout(() => {
                chatBubble.style.animation = 'bounce 2s infinite';
            }, 100);
        }
        
        if (statusDot) {
            statusDot.style.animation = 'none';
            setTimeout(() => {
                statusDot.style.animation = 'blink 1.5s infinite';
            }, 100);
        }
    }
    
    function animateInnovationElements() {
        const performanceBadge = document.querySelector('.performance-badge');
        if (performanceBadge) {
            performanceBadge.style.transform = 'translateY(20px)';
            performanceBadge.style.opacity = '0';
            setTimeout(() => {
                performanceBadge.style.transform = 'translateY(0)';
                performanceBadge.style.opacity = '1';
                performanceBadge.style.transition = 'all 0.6s ease';
            }, 300);
        }
    }
    
    // Gestionnaire d'événements pour les clics sur les boutons
    navCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
        
        // Support pour la navigation au clavier
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            }
        });
    });
    
    // Navigation avec les flèches du clavier
    document.addEventListener('keydown', function(e) {
        const activeCard = document.querySelector('.nav-card.active');
        const currentIndex = Array.from(navCards).indexOf(activeCard);
        let newIndex;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                newIndex = currentIndex > 0 ? currentIndex - 1 : navCards.length - 1;
                break;
            case 'ArrowRight':
                e.preventDefault();
                newIndex = currentIndex < navCards.length - 1 ? currentIndex + 1 : 0;
                break;
            default:
                return;
        }
        
        const targetTab = navCards[newIndex].getAttribute('data-tab');
        switchTab(targetTab);
        navCards[newIndex].focus();
    });
    
    // Initialisation - Animation de la première section
    animateInnovationElements();
    
    // Gestion du redimensionnement de la fenêtre
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Réinitialiser les animations après redimensionnement
            const activeTab = document.querySelector('.nav-card.active').getAttribute('data-tab');
            animateVisualElements(activeTab);
        }, 250);
    });
    
    // Animation au scroll pour mobile
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observer les éléments pour l'animation au scroll
    const elementsToAnimate = document.querySelectorAll('.feature-item, .stat-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Gestion des préférences utilisateur
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Désactiver les animations pour les utilisateurs qui préfèrent moins de mouvement
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Fonction utilitaire pour déboguer (peut être supprimée en production)
    window.debugDashboard = function() {
        console.log('Navigation cards:', navCards.length);
        console.log('Tab contents:', tabContents.length);
        console.log('Active tab:', document.querySelector('.nav-card.active')?.getAttribute('data-tab'));
    };
});

// Fonction pour améliorer les performances sur mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// Service Worker pour la mise en cache (optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Code pour enregistrer un service worker si nécessaire
        console.log('Dashboard loaded successfully');
    });
}