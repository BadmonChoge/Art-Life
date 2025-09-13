// js/utils/imageLoader.js
class ImageLoader {
    static init() {
        this.checkConnection();
        this.loadBackgroundImages();
        this.lazyLoadImages();
    }

    static checkConnection() {
        if (navigator.connection) {
            const connection = navigator.connection || navigator.mozConnection;
            if (connection.effectiveType.includes('2g') || connection.saveData) {
                document.documentElement.classList.add('low-bandwidth');
            }
            
            // Monitor connection changes
            connection.addEventListener('change', () => {
                if (connection.effectiveType.includes('2g') || connection.saveData) {
                    document.documentElement.classList.add('low-bandwidth');
                } else {
                    document.documentElement.classList.remove('low-bandwidth');
                }
            });
        }
    }

    static loadBackgroundImages() {
        document.querySelectorAll('[data-bg-src]').forEach(el => {
            if (document.documentElement.classList.contains('low-bandwidth')) {
                // Skip or load low-quality versions on slow connections
                return;
            }

            const src = el.dataset.bgSrc;
            const img = new Image();
            img.src = src;
            img.onload = () => {
                el.style.backgroundImage = `url(${src})`;
                el.classList.add('bg-loaded');
            };
            img.onerror = () => {
                console.warn('Failed to load background image:', src);
            };
        });
    }

    static lazyLoadImages() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    
                    img.classList.add('lazy-loaded');
                    observer.unobserve(img);
                }
            });
        }, { 
            rootMargin: '200px 0px', // Load images 200px before they enter viewport
            threshold: 0.01 
        });

        // Observe images with data-src or data-srcset
        document.querySelectorAll('img[data-src], img[data-srcset]').forEach(img => {
            observer.observe(img);
        });
    }

    static preloadCriticalImages() {
        // Preload above-the-fold images
        const criticalImages = [
            document.querySelector('.hero img'),
            document.querySelector('.logo img')
        ].filter(img => img !== null);

        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
        });
    }
}