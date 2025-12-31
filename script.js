// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const parallaxItems = document.querySelectorAll('.parallax-item');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Carousel Data - Replace these with your own images
const carouselItems = [
    {
        title: "Data Entry Services",
        description: "Accurate and efficient data entry with 99.9% accuracy guarantee for all business formats.",
        image: "assets/images/carousel1.jpg",
        link: "pages/services.html#data-entry"
    },
    {
        title: "Inventory Management",
        description: "Advanced stock control systems with real-time tracking and forecasting capabilities.",
        image: "assets/images/carousel2.jpg",
        link: "pages/services.html#inventory"
    },
    {
        title: "Database Solutions",
        description: "Custom database design and management for efficient data organization and retrieval.",
        image: "assets/images/carousel3.jpg",
        link: "pages/services.html#database"
    },
    {
        title: "Data Analysis",
        description: "Transform raw data into actionable insights with comprehensive reports and dashboards.",
        image: "assets/images/carousel4.jpg",
        link: "pages/services.html#analysis"
    },
    {
        title: "Warehouse Control",
        description: "Complete warehouse management solutions with optimized inventory operations.",
        image: "assets/images/carousel5.jpg",
        link: "pages/services.html#warehouse"
    }
];

let currentCarouselIndex = 0;
let carouselInterval;

// Initialize Carousel
function initializeCarousel() {
    carousel.innerHTML = '';
    
    carouselItems.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'">
            <div class="carousel-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        // Add click event to navigate to service page
        carouselItem.addEventListener('click', () => {
            window.location.href = item.link;
        });
        
        carousel.appendChild(carouselItem);
    });
    
    updateCarousel();
    startAutoRotation();
}

// Update Carousel Position
function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const angle = 360 / items.length;
    
    items.forEach((item, index) => {
        const rotateY = angle * index + 'deg';
        const translateZ = 400 + 'px';
        
        // Apply transform
        item.style.transform = `rotateY(${rotateY}) translateZ(${translateZ})`;
        
        // Adjust opacity and filter
        const offset = (index - currentCarouselIndex + items.length) % items.length;
        if (offset === 0) {
            item.style.opacity = '1';
            item.style.filter = 'brightness(1)';
            item.style.zIndex = '10';
        } else {
            item.style.opacity = '0.7';
            item.style.filter = 'brightness(0.7)';
            item.style.zIndex = '5';
        }
    });
    
    // Rotate the entire carousel
    const carouselRotateY = -angle * currentCarouselIndex;
    carousel.style.transform = `rotateY(${carouselRotateY}deg)`;
}

// Carousel Navigation
nextBtn.addEventListener('click', () => {
    currentCarouselIndex = (currentCarouselIndex + 1) % carouselItems.length;
    updateCarousel();
    resetAutoRotation();
});

prevBtn.addEventListener('click', () => {
    currentCarouselIndex = (currentCarouselIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
    resetAutoRotation();
});

// Auto Rotation
function startAutoRotation() {
    carouselInterval = setInterval(() => {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselItems.length;
        updateCarousel();
    }, 4000);
}

function resetAutoRotation() {
    clearInterval(carouselInterval);
    startAutoRotation();
}

// Pause auto-rotation on hover
carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carousel.addEventListener('mouseleave', () => {
    startAutoRotation();
});

// Parallax Effect
function handleParallax() {
    const scrolled = window.pageYOffset;
    
    parallaxItems.forEach(item => {
        const speed = parseFloat(item.getAttribute('data-speed'));
        const yPos = -(scrolled * speed);
        item.style.transform = `translateY(${yPos}px)`;
    });
}

// Active Navigation Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href').split('/').pop();
        
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    setActiveNavLink();
    
    // Add parallax effect on scroll
    window.addEventListener('scroll', handleParallax);
    
    // Initial parallax setup
    handleParallax();
});