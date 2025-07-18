// Minimal JavaScript für Professional Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation highlighting
    highlightCurrentPage();
    
    // Smooth scrolling
    setupSmoothScrolling();
    
    // Copy code blocks
    addCopyButtons();
    
    // Image enhancement
    setupImageOptimization();
    
    // Simple animations
    setupScrollAnimations();
    
    console.log('Website loaded successfully');
});

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === currentPath || 
            (currentPath.startsWith('/posts/') && href === '/blog/') ||
            (currentPath.startsWith('/blog/') && href === '/blog/') ||
            (currentPath.startsWith('/ueber-mich/') && href === '/ueber-mich/')) {
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
    
    codeBlocks.forEach((codeBlock) => {
        const pre = codeBlock.parentElement;
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        
        const copyButton = document.createElement('button');
        copyButton.innerHTML = 'Copy';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #e5e5e5;
            border-radius: 4px;
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s ease;
            z-index: 10;
        `;
        
        copyButton.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        copyButton.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0.7';
        });
        
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                copyButton.innerHTML = 'Copied!';
                copyButton.style.background = '#f0f9ff';
                copyButton.style.color = '#0066cc';
                
                setTimeout(() => {
                    copyButton.innerHTML = 'Copy';
                    copyButton.style.background = 'rgba(255, 255, 255, 0.9)';
                    copyButton.style.color = 'inherit';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                copyButton.innerHTML = 'Failed';
                setTimeout(() => {
                    copyButton.innerHTML = 'Copy';
                }, 2000);
            }
        });
        
        wrapper.appendChild(copyButton);
    });
}

// Image enhancement
function setupImageOptimization() {
    const images = document.querySelectorAll('.post-content img');
    
    images.forEach(img => {
        // Add loading animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.onload = () => {
            img.style.opacity = '1';
        };
        
        // Click to enlarge
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            openImageModal(img);
        });
    });
}

// Simple image modal
function openImageModal(img) {
    const modal = document.createElement('div');
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
        border-radius: 8px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;
    
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Fade in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close on click or ESC
    const closeModal = () => {
        modal.style.opacity = '0';
        document.body.style.overflow = '';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
    };
    
    modal.addEventListener('click', closeModal);
    
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeydown);
        }
    };
    
    document.addEventListener('keydown', handleKeydown);
}

// Simple scroll animations
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
            rootMargin: '0px 0px -30px 0px'
        });
        
        // Animate elements
        document.querySelectorAll('.post-card, .post-item').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(15px)';
            element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            animateOnScrollObserver.observe(element);
        });
    }
}

// External link handler
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        e.target.setAttribute('target', '_blank');
        e.target.setAttribute('rel', 'noopener noreferrer');
    }
});