// Main JavaScript für jonashartmann.org
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation highlighting
    highlightCurrentPage();
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Copy code blocks functionality
    addCopyButtons();
    
    // Image lazy loading and optimization
    setupImageOptimization();
    
    // Dark mode toggle (optional)
    setupDarkMode();
    
    // Search functionality
    setupSearch();
    
    // Animation on scroll
    setupScrollAnimations();
    
    console.log('🚀 jonashartmann.org loaded successfully!');
});

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === currentPath || 
            (currentPath.startsWith('/posts/') && link.getAttribute('href') === '/blog/')) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add copy buttons to code blocks
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock, index) => {
        const pre = codeBlock.parentElement;
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        wrapper.style.position = 'relative';
        
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '📋';
        copyButton.title = 'Code kopieren';
        copyButton.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #e2e8f0;
            border-radius: 0.25rem;
            padding: 0.25rem 0.5rem;
            cursor: pointer;
            font-size: 0.75rem;
            z-index: 10;
            transition: all 0.2s ease;
        `;
        
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                copyButton.innerHTML = '✅';
                copyButton.title = 'Kopiert!';
                
                setTimeout(() => {
                    copyButton.innerHTML = '📋';
                    copyButton.title = 'Code kopieren';
                }, 2000);
            } catch (err) {
                console.error('Fehler beim Kopieren:', err);
                copyButton.innerHTML = '❌';
                setTimeout(() => {
                    copyButton.innerHTML = '📋';
                }, 2000);
            }
        });
        
        wrapper.appendChild(copyButton);
    });
}

// Image optimization and lazy loading
function setupImageOptimization() {
    const images = document.querySelectorAll('img');
    
    // Intersection Observer für Lazy Loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Fade-in animation
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Click to zoom for images
    images.forEach(img => {
        if (img.closest('.post-content')) {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                openImageModal(img);
            });
        }
    });
}

// Image modal for zooming
function openImageModal(img) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: zoom-out;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 0.5rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    `;
    
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    
    // Fade in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close on click or ESC
    modal.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    document.addEventListener('keydown', function closeModal(e) {
        if (e.key === 'Escape') {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
            document.removeEventListener('keydown', closeModal);
        }
    });
}

// Dark mode toggle (optional feature)
function setupDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.title = 'Dark Mode umschalten';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        background: var(--bg-white);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.25rem;
        box-shadow: var(--shadow-md);
        z-index: 1000;
        transition: all 0.2s ease;
    `;
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isNowDark = document.body.classList.contains('dark-mode');
        
        darkModeToggle.innerHTML = isNowDark ? '☀️' : '🌙';
        localStorage.setItem('darkMode', isNowDark);
    });
    
    document.body.appendChild(darkModeToggle);
}

// Simple search functionality
function setupSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="search-input" placeholder="Suche..." style="
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            font-size: 1rem;
            margin-bottom: 1rem;
            display: none;
        ">
        <div id="search-results"></div>
    `;
    
    // Add search to blog page
    const blogPage = document.querySelector('.blog-page');
    if (blogPage) {
        const pageHeader = blogPage.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.appendChild(searchContainer);
            
            // Show search input
            const searchInput = document.getElementById('search-input');
            searchInput.style.display = 'block';
            
            // Search functionality
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    performSearch(e.target.value);
                }, 300);
            });
        }
    }
}

function performSearch(query) {
    const posts = document.querySelectorAll('.post-item');
    const searchResults = document.getElementById('search-results');
    
    if (query.length < 2) {
        posts.forEach(post => post.style.display = 'block');
        searchResults.innerHTML = '';
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    let visibleCount = 0;
    
    posts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        
        if (title.includes(lowerQuery) || excerpt.includes(lowerQuery)) {
            post.style.display = 'block';
            visibleCount++;
        } else {
            post.style.display = 'none';
        }
    });
    
    searchResults.innerHTML = `<p style="color: var(--text-light); font-size: 0.875rem; margin-bottom: 1rem;">
        ${visibleCount} Ergebnis${visibleCount !== 1 ? 'se' : ''} für "${query}"
    </p>`;
}

// Scroll animations
function setupScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const animateOnScrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Animate post cards and items
        document.querySelectorAll('.post-card, .post-item').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animateOnScrollObserver.observe(element);
        });
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some CSS for dark mode
const darkModeStyles = `
    .dark-mode {
        --text-dark: #e2e8f0;
        --text-light: #94a3b8;
        --bg-light: #1e293b;
        --bg-white: #0f172a;
        --border-color: #334155;
    }
    
    .dark-mode .navbar {
        background: rgba(15, 23, 42, 0.95);
    }
    
    .dark-mode .hero {
        background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
    }
    
    .dark-mode .post-card,
    .dark-mode .post-item {
        background: var(--bg-light);
        border-color: var(--border-color);
    }
    
    .dark-mode .footer {
        background: var(--bg-light);
    }
`;

// Inject dark mode styles
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);