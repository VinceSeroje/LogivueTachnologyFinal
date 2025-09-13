// =========================================== 
// 🚀 Enhanced Website Functionality
// =========================================== 

document.addEventListener("DOMContentLoaded", function () {
    // Initialize all functionality
    initializeLoading();
    initializeScrollAnimations();
    initializeNavigation();
    initializeScrollProgress();
    initializeBackToTop();
    initializeCounters();
    initializeParallax();
    initializeLazyLoading();
});

// =========================================== 
// 🎬 Loading Screen
// =========================================== 
function initializeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// =========================================== 
// 📊 Scroll Progress Bar
// =========================================== 
function initializeScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        progressBar.style.width = scrollPercent + '%';
    });
}

// =========================================== 
// 🚀 Enhanced Section Scroll-In Animation
// =========================================== 
function initializeScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');

                    // Add specific animations based on section
                    const sectionId = entry.target.id;
                    animateSection(sectionId, entry.target);
                }, index * 100);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// =========================================== 
// 🎨 Section-Specific Animations
// =========================================== 
function animateSection(sectionId, section) {
    switch (sectionId) {
        case 'about':
            animateStats();
            break;
        case 'team':
            animateTeamMembers(section);
            break;
        case 'projects':
            animateProjects(section);
            break;
        case 'contact':
            animateContactItems(section);
            break;
    }
}

// =========================================== 
// 📊 Animated Counters
// =========================================== 
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                if (target === 100) {
                    counter.textContent = target + '%';
                }
            }
        };

        // Store the animation function to call when section is visible
        counter.animate = updateCounter;
    });
}

function animateStats() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        if (counter.animate) {
            counter.animate();
        }
    });
}

// =========================================== 
// 👥 Team Members Animation
// =========================================== 
function animateTeamMembers(section) {
    const members = section.querySelectorAll('.member');

    members.forEach((member, index) => {
        setTimeout(() => {
            member.style.opacity = '0';
            member.style.transform = 'translateY(30px)';
            member.style.transition = 'all 0.6s ease';

            requestAnimationFrame(() => {
                member.style.opacity = '1';
                member.style.transform = 'translateY(0)';
            });
        }, index * 200);
    });
}

// =========================================== 
// 🧪 Projects Animation
// =========================================== 
function animateProjects(section) {
    const projects = section.querySelectorAll('.project-item');

    projects.forEach((project, index) => {
        setTimeout(() => {
            project.classList.add('animate-fade-up');
        }, index * 300);
    });
}

// =========================================== 
// 📞 Contact Items Animation
// =========================================== 
function animateContactItems(section) {
    const contactItems = section.querySelectorAll('.contact-item');

    contactItems.forEach((item, index) => {
        setTimeout(() => {
            if (index % 2 === 0) {
                item.classList.add('animate-fade-left');
            } else {
                item.classList.add('animate-fade-right');
            }
        }, index * 200);
    });
}

// =========================================== 
// 🍔 Enhanced Mobile Navigation
// =========================================== 
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (navToggle && navLinks) {
        // Toggle menu on button click
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu when clicking on nav links
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
                updateActiveNavLink(link);
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', updateActiveNavOnScroll);
    }

    function toggleMenu() {
        const isOpen = navLinks.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        navLinks.classList.add('open');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closeMenu() {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scroll
    }

    function updateActiveNavLink(activeLink) {
        navLinksItems.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    navLinksItems.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    }
}

// ⬆️ Back to Top Button (continued)
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// =========================================== 
// 🌊 Parallax Effects
// =========================================== 
function initializeParallax() {
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// =========================================== 
// 🖼️ Lazy Loading Images
// =========================================== 
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// =========================================== 
// 🎯 Smooth Scrolling for Anchor Links
// =========================================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 100;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =========================================== 
// 🎨 Dynamic Theme Switching (Optional)
// =========================================== 
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// =========================================== 
// 📱 Touch Gestures for Mobile
// =========================================== 
function initializeTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - could trigger next section
                console.log('Swiped left');
            } else {
                // Swipe right - could trigger previous section
                console.log('Swiped right');
            }
        }
    }
}

// =========================================== 
// 🔍 Search Functionality (if needed)
// =========================================== 
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchResults) {
        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.toLowerCase().trim();

            searchTimeout = setTimeout(() => {
                if (query.length > 2) {
                    performSearch(query);
                } else {
                    clearSearchResults();
                }
            }, 300);
        });
    }

    function performSearch(query) {
        // Search through content
        const sections = document.querySelectorAll('.section');
        const results = [];

        sections.forEach(section => {
            const content = section.textContent.toLowerCase();
            if (content.includes(query)) {
                const title = section.querySelector('h1, h2, h3')?.textContent || 'Section';
                results.push({
                    title: title,
                    id: section.id,
                    snippet: getSearchSnippet(content, query)
                });
            }
        });

        displaySearchResults(results);
    }

    function getSearchSnippet(content, query) {
        const index = content.indexOf(query);
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + query.length + 50);
        return content.substring(start, end) + '...';
    }

    function displaySearchResults(results) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found</p>';
            return;
        }

        const resultsHTML = results.map(result => `
            <div class="search-result" onclick="scrollToSection('${result.id}')">
                <h4>${result.title}</h4>
                <p>${result.snippet}</p>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
    }

    function clearSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.innerHTML = '';
        }
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// =========================================== 
// 📊 Performance Monitoring
// =========================================== 
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');

        // Monitor largest contentful paint
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime, 'ms');
            });

            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    });
}

// =========================================== 
// 🎪 Easter Eggs and Fun Interactions
// =========================================== 
function initializeEasterEggs() {
    // Konami Code Easter Egg
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function triggerEasterEgg() {
        // Add rainbow animation to logo
        const logo = document.querySelector('.logo-text');
        if (logo) {
            logo.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
            logo.style.backgroundSize = '400% 400%';
            logo.style.animation = 'gradientBG 2s ease-in-out infinite';
            logo.style.webkitBackgroundClip = 'text';
            logo.style.webkitTextFillColor = 'transparent';

            // Show celebration message
            showNotification('🎉 Easter egg activated! You found the secret!', 'success');

            // Reset after 5 seconds
            setTimeout(() => {
                logo.style.background = '';
                logo.style.animation = '';
                logo.style.webkitBackgroundClip = '';
                logo.style.webkitTextFillColor = '';
            }, 5000);
        }
    }
}

// =========================================== 
// 📢 Notification System
// =========================================== 
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--card-bg);
                border: 1px solid var(--accent);
                border-radius: var(--border-radius);
                padding: 1rem;
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            
            .notification-success {
                border-color: var(--success);
            }
            
            .notification-warning {
                border-color: var(--warning);
            }
            
            .notification-error {
                border-color: var(--error);
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            
            .notification-message {
                color: var(--light);
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--secondary);
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                transition: var(--transition);
            }
            
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: var(--light);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

// =========================================== 
// 🔧 Utility Functions
// =========================================== 

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// =========================================== 
// 🚀 Initialize Enhanced Features
// =========================================== 
document.addEventListener("DOMContentLoaded", function () {
    // Initialize all enhanced features
    initializePerformanceMonitoring();
    initializeEasterEggs();
    initializeTouchGestures();

    // Add loading complete event
    window.addEventListener('load', () => {
        showNotification('Welcome to Logivue Technology! 🚀', 'success', 2000);
    });

    // Add error handling
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
        showNotification('Still Working.', 'error');
    });

    // Add unhandled promise rejection handling
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        showNotification('An unexpected error occurred.', 'error');
    });
});

// =========================================== 
// 📱 PWA Support (Optional)
// =========================================== 
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// =========================================== 
// 🎯 Analytics Integration (Optional)
// =========================================== 
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Custom analytics
    console.log('Event tracked:', eventName, eventData);
}

// Track navigation clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('navigation_click', {
            section: link.getAttribute('href')
        });
    });
});

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('button_click', {
            button_text: button.textContent.trim()
        });
    });
});

// =========================================== 
// 🔒 Security Enhancements
// =========================================== 
function initializeSecurity() {
    // Disable right-click context menu (optional)
    // document.addEventListener('contextmenu', e => e.preventDefault());

    // Disable F12 and other dev tools shortcuts (optional)
    // document.addEventListener('keydown', (e) => {
    //     if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
    //         e.preventDefault();
    //     }
    // });

    // Add CSP meta tag programmatically if needed
    const csp = document.createElement('meta');
    csp.httpEquiv = 'Content-Security-Policy';
    csp.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:;";
    document.head.appendChild(csp);
}

// Initialize security features
// initializeSecurity();

console.log('🚀 Logivue Technology website loaded successfully!');
