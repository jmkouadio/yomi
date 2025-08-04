  class BankingCarousel {
            constructor() {
                this.currentSlide = 0;
                this.totalSlides = 5;
                this.isPlaying = false;
                this.interval = null;
                this.slideDuration = 4000; // 4 secondes par slide
                
                this.slides = document.querySelectorAll('.background-slide');
                this.playButton = document.getElementById('playButton');
                this.progressFill = document.getElementById('progressFill');
                this.infoCard = document.querySelector('.info-card');
                
                // Contenu pour chaque slide
                this.slideContent = [
                    {
                        badge: "Assurance Santé",
                        title: "Bénéficier des soins de qualité et des patenaires de référence et surtout sans risque d'accompagement",
                        button: "En savoir plus"
                    },
                    {
                        badge: "Assurance Voyage",
                        title: "Nous vous assistons partout lorsque vous voyagez",
                        button: "Découvrir"
                    },
                    {
                        badge: "Assurance Scolaire",
                        title: "Une garantie individuelle accident et une garantie de responsabilité civile",
                        button: "Explorer"
                    },
                    {
                        badge: "Assurance Transport",
                        title: "Nous vous assistons en cas de dommage subis par vos marchandises pendant leur transport",
                        button: "Vérifier"
                    },
                    {
                        badge: "Assurance Tous Risque",
                        title: "Assurer votre chantier",
                        button: "Commencer"
                    }
                ];
                
                this.init();
            }
            
            init() {
                this.playButton.addEventListener('click', () => {
                    if (this.isPlaying) {
                        this.pause();
                    } else {
                        this.play();
                    }
                });
                
                // Démarrage automatique
                this.updateProgress();
            }
            
            play() {
                this.isPlaying = true;
                this.playButton.classList.add('paused');
                this.playButton.style.opacity = '0.7';
                
                this.interval = setInterval(() => {
                    this.nextSlide();
                }, this.slideDuration);
                
                this.startProgressAnimation();
            }
            
            pause() {
                this.isPlaying = false;
                this.playButton.classList.remove('paused');
                this.playButton.style.opacity = '1';
                
                if (this.interval) {
                    clearInterval(this.interval);
                    this.interval = null;
                }
            }
            
            nextSlide() {
                // Fade out de la carte d'info
                this.infoCard.classList.add('fade');
                
                setTimeout(() => {
                    // Changement de slide
                    this.slides[this.currentSlide].classList.remove('active');
                    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                    this.slides[this.currentSlide].classList.add('active');
                    
                    // Mise à jour du contenu
                    this.updateContent();
                    this.updateProgress();
                    
                    // Fade in de la carte d'info
                    setTimeout(() => {
                        this.infoCard.classList.remove('fade');
                    }, 100);
                }, 300);
            }
            
            updateContent() {
                const content = this.slideContent[this.currentSlide];
                
                document.getElementById('badge-text').textContent = content.badge;
                document.getElementById('main-title').textContent = content.title;
                document.getElementById('cta-button').textContent = content.button;
            }
            
            updateProgress() {
                const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
                this.progressFill.style.height = progress + '%';
            }
            
            startProgressAnimation() {
                if (!this.isPlaying) return;
                
                // Animation de la barre de progression pendant la durée de la slide
                this.progressFill.style.transition = 'none';
                const currentProgress = ((this.currentSlide) / this.totalSlides) * 100;
                const nextProgress = ((this.currentSlide + 1) / this.totalSlides) * 100;
                
                this.progressFill.style.height = currentProgress + '%';
                
                setTimeout(() => {
                    this.progressFill.style.transition = `height ${this.slideDuration}ms linear`;
                    this.progressFill.style.height = nextProgress + '%';
                }, 50);
            }
        }
        
        // Initialisation au chargement de la page
        document.addEventListener('DOMContentLoaded', () => {
            const carousel = new BankingCarousel();
            
            // Démarrage automatique après 1 seconde
            setTimeout(() => {
                carousel.play();
            }, 1000);
        });