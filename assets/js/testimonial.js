   class TestimonialCarousel {
            constructor() {
                this.track = document.getElementById('carouselTrack');
                this.cards = document.querySelectorAll('.testimonial-card');
                this.prevBtn = document.getElementById('btnprevBtn');
                this.nextBtn = document.getElementById('btnnextBtn');
                this.currentIndex = 0;
                this.cardsToShow = this.getCardsToShow();
                this.cardWidth = this.getCardWidth();
                
                this.init();
                this.setupResponsive();
            }

            init() {
                this.updateCarousel();
                this.bindEvents();
                this.startAutoPlay();
            }

            getCardsToShow() {
                const screenWidth = window.innerWidth;
                if (screenWidth >= 992) {
                    return 2; // Desktop: show 2 cards
                } else {
                    return 1; // Mobile/Tablet: show 1 card
                }
            }

            getCardWidth() {
                const screenWidth = window.innerWidth;
                if (screenWidth >= 992) {
                    return this.track.offsetWidth / 2; // Half width for 2 cards
                } else {
                    return this.track.offsetWidth; // Full width for 1 card
                }
            }

            setupResponsive() {
                let resizeTimer;
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(() => {
                        this.cardsToShow = this.getCardsToShow();
                        this.cardWidth = this.getCardWidth();
                        
                        // Reset index if it's out of bounds
                        if (this.currentIndex >= this.cards.length - this.cardsToShow) {
                            this.currentIndex = Math.max(0, this.cards.length - this.cardsToShow);
                        }
                        
                        this.updateCarousel();
                    }, 250);
                });
            }

            bindEvents() {
                this.prevBtn.addEventListener('click', () => this.prev());
                this.nextBtn.addEventListener('click', () => this.next());
                
                // Pause autoplay on hover
                this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
                this.track.addEventListener('mouseleave', () => this.startAutoPlay());
                
                // Touch events for mobile
                let startX = 0;
                let endX = 0;
                
                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    this.stopAutoPlay();
                });
                
                this.track.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) { // Minimum swipe distance
                        if (diff > 0) {
                            this.next(); // Swipe left
                        } else {
                            this.prev(); // Swipe right
                        }
                    }
                    
                    this.startAutoPlay();
                });
            }

            updateCarousel() {
                // Remove active class from all cards
                this.cards.forEach(card => card.classList.remove('active'));
                
                // Add active class to visible cards
                for (let i = this.currentIndex; i < this.currentIndex + this.cardsToShow && i < this.cards.length; i++) {
                    if (this.cards[i]) {
                        this.cards[i].classList.add('active');
                    }
                }
                
                // Calculate transform
                const offset = -this.currentIndex * (100 / this.cardsToShow);
                this.track.style.transform = `translateX(${offset}%)`;
                
                // Update button states
                this.updateButtons();
            }

            updateButtons() {
                this.prevBtn.disabled = this.currentIndex === 0;
                this.nextBtn.disabled = this.currentIndex >= this.cards.length - this.cardsToShow;
            }

            prev() {
                if (this.currentIndex > 0) {
                    this.currentIndex = Math.max(0, this.currentIndex - 1);
                    this.updateCarousel();
                }
            }

            next() {
                if (this.currentIndex < this.cards.length - this.cardsToShow) {
                    this.currentIndex = Math.min(this.cards.length - this.cardsToShow, this.currentIndex + 1);
                    this.updateCarousel();
                }
            }

            startAutoPlay() {
                this.stopAutoPlay(); // Clear any existing interval
                this.autoPlayInterval = setInterval(() => {
                    if (this.currentIndex >= this.cards.length - this.cardsToShow) {
                        this.currentIndex = 0;
                    } else {
                        this.currentIndex++;
                    }
                    this.updateCarousel();
                }, 4000);
            }

            stopAutoPlay() {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                }
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new TestimonialCarousel();
            
            // Add stagger animation to cards on load
            const cards = document.querySelectorAll('.testimonial-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            });
        });