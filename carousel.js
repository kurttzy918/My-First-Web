// Infinite Carousel
class InfiniteCarousel {
    constructor() {
        this.carouselTrack = document.getElementById('carouselTrack');
        this.carouselDots = document.getElementById('carouselDots');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.carouselItems = [];
        this.currentIndex = 0;
        this.autoScrollInterval = null;
        this.isPaused = false;
        
        this.init();
    }

    init() {
        if (!this.carouselTrack) return;
        
        this.carouselItems = this.getCarouselItems();
        this.renderCarousel();
        this.setupControls();
        this.startAutoScroll();
        this.setupHoverPause();
    }

    getCarouselItems() {
        return [
            {
                icon: 'fas fa-database',
                title: 'Inventory System Implementation',
                description: 'Complete inventory management system for retail chain with 500+ SKUs',
                tags: ['Inventory', 'ERP', 'Integration']
            },
            {
                icon: 'fas fa-file-excel',
                title: 'Data Migration Project',
                description: 'Migrated 50,000+ records from legacy system to modern database',
                tags: ['Data Migration', 'Excel', 'Automation']
            },
            {
                icon: 'fas fa-warehouse',
                title: 'Warehouse Management',
                description: 'Real-time tracking system for warehouse with barcode integration',
                tags: ['Warehouse', 'Tracking', 'Barcode']
            },
            {
                icon: 'fas fa-chart-pie',
                title: 'Sales Analytics Dashboard',
                description: 'Interactive dashboard for sales data visualization and reporting',
                tags: ['Analytics', 'Dashboard', 'Reporting']
            },
            {
                icon: 'fas fa-sync-alt',
                title: 'Process Automation',
                description: 'Automated data entry processes saving 40+ hours weekly',
                tags: ['Automation', 'Efficiency', 'Workflow']
            },
            {
                icon: 'fas fa-shipping-fast',
                title: 'Supply Chain Tracking',
                description: 'End-to-end supply chain tracking with predictive analytics',
                tags: ['Supply Chain', 'Tracking', 'Analytics']
            }
        ];
    }

    renderCarousel() {
        // Clear existing content
        this.carouselTrack.innerHTML = '';
        
        // Duplicate items for seamless infinite scroll
        const itemsToShow = [...this.carouselItems, ...this.carouselItems];
        
        itemsToShow.forEach((item, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';
            carouselItem.dataset.index = index;
            carouselItem.innerHTML = `
                <div class="carousel-icon">
                    <i class="${item.icon}"></i>
                </div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="project-tech">
                    ${item.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <a href="#" class="carousel-link">
                    View Case Study <i class="fas fa-arrow-right"></i>
                </a>
            `;
            this.carouselTrack.appendChild(carouselItem);
        });

        // Create dots
        this.createDots();
    }

    createDots() {
        if (!this.carouselDots) return;
        
        this.carouselDots.innerHTML = '';
        
        this.carouselItems.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.dataset.index = index;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.innerHTML = '<span class="sr-only">Slide ' + (index + 1) + '</span>';
            dot.addEventListener('click', () => this.goToSlide(index));
            this.carouselDots.appendChild(dot);
        });
    }

    setupControls() {
        // Previous button
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.pauseAutoScroll();
                this.prevSlide();
                this.resumeAutoScroll();
            });
        }

        // Next button
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.pauseAutoScroll();
                this.nextSlide();
                this.resumeAutoScroll();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    setupHoverPause() {
        if (this.carouselTrack) {
            this.carouselTrack.addEventListener('mouseenter', () => {
                this.pauseAutoScroll();
            });

            this.carouselTrack.addEventListener('mouseleave', () => {
                this.resumeAutoScroll();
            });
        }
    }

    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, 5000); // Change slide every 5 seconds
    }

    pauseAutoScroll() {
        this.isPaused = true;
    }

    resumeAutoScroll() {
        this.isPaused = false;
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        if (!this.carouselTrack) return;

        // Calculate scroll position
        const itemWidth = 380; // 350px + 30px gap
        const scrollPosition = this.currentIndex * itemWidth;
        
        // Smooth scroll
        this.carouselTrack.style.transition = 'transform 0.5s ease';
        this.carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
        
        // Update active dot
        this.updateActiveDot();
        
        // Handle infinite scroll
        this.handleInfiniteScroll();
    }

    updateActiveDot() {
        const dots = this.carouselDots?.querySelectorAll('.carousel-dot');
        if (!dots) return;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    handleInfiniteScroll() {
        // Reset to beginning for infinite effect
        if (this.currentIndex >= this.carouselItems.length) {
            setTimeout(() => {
                this.carouselTrack.style.transition = 'none';
                this.currentIndex = 0;
                const scrollPosition = this.currentIndex * 380;
                this.carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
                
                // Re-enable transition
                setTimeout(() => {
                    this.carouselTrack.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        }
    }

    // Responsive adjustments
    handleResize() {
        // Update carousel based on screen size
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            this.carouselTrack.style.gap = '20px';
            // Adjust item width for mobile
            document.querySelectorAll('.carousel-item').forEach(item => {
                item.style.width = '300px';
            });
        } else {
            this.carouselTrack.style.gap = '30px';
            document.querySelectorAll('.carousel-item').forEach(item => {
                item.style.width = '350px';
            });
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new InfiniteCarousel();
    
    // Handle window resize
    window.addEventListener('resize', () => carousel.handleResize());
    carousel.handleResize(); // Initial call
    
    // Add CSS for carousel items
    const style = document.createElement('style');
    style.textContent = `
        .carousel-icon {
            width: 60px;
            height: 60px;
            background: rgba(0, 217, 255, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            font-size: 1.5rem;
        }
        
        .carousel-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 600;
            margin-top: 20px;
            transition: all var(--transition-fast);
        }
        
        .carousel-link:hover {
            gap: 12px;
            color: var(--accent-color);
        }
        
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    document.head.appendChild(style);
});