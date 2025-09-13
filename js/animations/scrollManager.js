// js/animations/scrollManager.js
class ScrollAnimationManager {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        // Animate elements with data-animate attribute
        document.querySelectorAll('[data-animate]').forEach(el => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-active');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(el);
            this.observers.push(observer);
        });

        // Add scroll-based fade to specific elements
        this.setupScrollFading();
    }

    setupScrollFading() {
        const elementsToFade = [
            document.querySelector('.skyline-container'),
            document.querySelector('.featured-events'),
            document.querySelector('.newsletter')
        ].filter(el => el !== null);
        
        if (elementsToFade.length === 0) return;
        
        let ticking = false;
        let lastScrollY = window.scrollY;
        
        const updateOpacity = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            elementsToFade.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const elementTop = rect.top + scrollY;
                const elementHeight = rect.height;
                
                const fadeStart = windowHeight * 0.25;
                const scrollPercent = Math.max(0, Math.min(1, 
                    (scrollY - (elementTop - fadeStart)) / (elementHeight + fadeStart)
                ));
                
                const opacity = Math.max(0, 1 - scrollPercent * 1.5);
                el.style.opacity = opacity;
                el.style.pointerEvents = opacity < 0.3 ? 'none' : 'auto';
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateOpacity);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', () => {
            if (Math.abs(window.scrollY - lastScrollY) > 5) {
                requestTick();
                lastScrollY = window.scrollY;
            }
        });
        
        updateOpacity();
    }
}