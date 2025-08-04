  // Slider functionality
        let currentSlide = 0;
        const totalSlides = 3;
        const sliderTrack = document.getElementById('sliderTrack');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        function updateSlider() {
            const translateX = -currentSlide * (100 / totalSlides);
            sliderTrack.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlider();
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        // Auto-slide functionality
        let autoSlideInterval = setInterval(nextSlide, 4000);

        // Pause auto-slide on hover
        const storyImage = document.querySelector('.story-image');
        storyImage.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        storyImage.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 4000);
        });

        // Animation au scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.fade-in-element');
            const windowHeight = window.innerHeight;
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        }

        // Animation des cartes au survol avec effet de groupe
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                // Effet subtil sur les autres cartes
                featureCards.forEach((otherCard, otherIndex) => {
                    if (otherIndex !== index) {
                        otherCard.style.transform = 'scale(0.95)';
                        otherCard.style.opacity = '0.7';
                    }
                });
            });
            
            card.addEventListener('mouseleave', function() {
                // Retour à l'état normal
                featureCards.forEach(otherCard => {
                    otherCard.style.transform = '';
                    otherCard.style.opacity = '';
                });
            });
        });

        // Animation des boutons
        const buttons = document.querySelectorAll('.btn-primary-custom, .btn-outline-custom');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-2px) scale(1)';
            });
            
            button.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(0) scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-2px) scale(1)';
            });
        });

        // Effet parallax léger sur l'image active
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const activeSlide = document.querySelector('.slide img');
            if (activeSlide) {
                activeSlide.style.transform = `translateY(${scrolled * 0.05}px) scale(1.1)`;
            }
            
            animateOnScroll();
        });

        // Animation d'entrée progressive
        window.addEventListener('load', function() {
            const elements = document.querySelectorAll('.story-title, .story-subtitle, .story-description');
            elements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                }, index * 200);
            });
        });

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            animateOnScroll();
            
            // Animation de typing pour le titre
            const title = document.querySelector('.story-title');
            const originalText = title.textContent;
            title.textContent = '';
            
            setTimeout(() => {
                let i = 0;
                const typeInterval = setInterval(() => {
                    title.textContent += originalText.charAt(i);
                    i++;
                    if (i >= originalText.length) {
                        clearInterval(typeInterval);
                    }
                }, 100);
            }, 500);
        });