// Hamburger Menu Functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const menuLinks = document.querySelectorAll('.nav-links a');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking a link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !e.target.closest('.nav-menu') && 
        !e.target.closest('.hamburger')) {
        toggleMenu();
    }
});

// Background Slideshow
const hero = document.querySelector('.hero');
const images = [
    'images/hero/img1/1.jpg',
    'images/hero/img1/2.jpg',
    'images/hero/img1/3.jpg',
    'images/hero/img1/4.jpg',
    'images/hero/img1/5.jpg'
];

let currentImageIndex = 0;

// Create background elements
function createBackgroundElements() {
    const previousBg = document.createElement('div');
    const currentBg = document.createElement('div');
    
    previousBg.className = 'hero-background previous';
    currentBg.className = 'hero-background current';
    
    hero.insertBefore(previousBg, hero.firstChild);
    hero.insertBefore(currentBg, hero.firstChild);
    
    return { previousBg, currentBg };
}

const { previousBg, currentBg } = createBackgroundElements();

function changeBackground() {
    // Update previous background
    previousBg.style.backgroundImage = currentBg.style.backgroundImage;
    previousBg.className = 'hero-background previous';
    
    // Update current background
    currentBg.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    currentBg.className = 'hero-background current';
    
    // Move to next image
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Preload images
function preloadImages() {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize the first background
currentBg.style.backgroundImage = `url('${images[0]}')`;
currentImageIndex = 1;
preloadImages();

// Change background every 5 seconds
setInterval(changeBackground, 5000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact button functionality
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        // You can customize this to show a contact form or redirect to a contact page
        alert('Contact form will be implemented here!');
    });
}

// Add active class to navigation items based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Certificate Modal Functionality
const modal = document.getElementById('certificateModal');
if (modal) {
    const modalImg = document.querySelector('.modal-img');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const closeBtn = document.querySelector('.close-btn');

    // Get all certificate items
    const certificateItems = document.querySelectorAll('.certificate-item');

    // Add click event to each certificate item
    certificateItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.certificate-img');
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;

            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
} 