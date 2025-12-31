// Parallax Effect for Images
class ParallaxEffect {
    constructor() {
        this.parallaxCards = document.querySelectorAll('.parallax-card');
        this.init();
    }

    init() {
        if (!this.parallaxCards.length) return;

        window.addEventListener('scroll', () => this.updateParallax());
        window.addEventListener('resize', () => this.updateParallax());
        
        // Add hover effects
        this.addHoverEffects();
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        this.parallaxCards.forEach(card => {
            const speed = parseFloat(card.getAttribute('data-speed')) || 0.1;
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const distanceFromCenter = Math.abs(cardCenter - windowHeight / 2);
            
            // Calculate parallax effect based on scroll position and card position
            let yPos = -(scrolled * speed);
            
            // Add subtle movement based on mouse position
            const mouseX = this.mouseX || 0;
            const mouseY = this.mouseY || 0;
            const mouseFactorX = (mouseX - window.innerWidth / 2) * 0.01;
            const mouseFactorY = (mouseY - window.innerHeight / 2) * 0.01;
            
            // Apply transforms
            card.style.transform = `
                translateY(${yPos}px)
                perspective(1000px)
                rotateX(${mouseFactorY}deg)
                rotateY(${-mouseFactorX}deg)
            `;
            
            // Update card shadow based on position
            const shadowIntensity = 1 - (distanceFromCenter / windowHeight);
            card.style.boxShadow = `
                0 ${10 + shadowIntensity * 20}px ${30 + shadowIntensity * 20}px 
                rgba(0, 217, 255, ${0.1 + shadowIntensity * 0.2})
            `;
        });
    }

    addHoverEffects() {
        this.parallaxCards.forEach(card => {
            const img = card.querySelector('.parallax-img');
            const content = card.querySelector('.parallax-content');
            
            if (img) {
                card.addEventListener('mouseenter', () => {
                    img.style.transform = 'scale(1.1)';
                    content.style.transform = 'translateY(-10px)';
                    
                    // Add glow effect
                    card.style.boxShadow = `
                        0 20px 40px rgba(0, 217, 255, 0.3),
                        0 0 60px rgba(0, 217, 255, 0.1)
                    `;
                });
                
                card.addEventListener('mouseleave', () => {
                    img.style.transform = 'scale(1)';
                    content.style.transform = 'translateY(0)';
                    card.style.boxShadow = '';
                });
            }
        });
    }

    // Track mouse position for 3D effect
    trackMouse() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateParallax();
        });
    }
}

// Initialize parallax effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const parallax = new ParallaxEffect();
    parallax.trackMouse();
});

// Additional image loading optimization
function lazyLoadImages() {
    const images = document.querySelectorAll('.parallax-img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23111111"/%3E%3C/svg%3E';
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);