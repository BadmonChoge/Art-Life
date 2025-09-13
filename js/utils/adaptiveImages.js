// js/utils/adaptiveImages.js
const AdaptiveImage = {
    init: () => {
        // Check for WebP support
        this.supportsWebP().then(supportsWebP => {
            document.querySelectorAll('[data-adaptive-img]').forEach(img => {
                const src = img.dataset.adaptiveImg;
                const width = Math.min(img.offsetWidth * 2, 1920); // 2x for retina
                
                // Use WebP if supported, fallback to original format
                const format = supportsWebP ? 'webp' : this.getExtension(src);
                
                // Set optimized image source
                img.src = `${src}?format=${format}&width=${width}&quality=80`;
                img.onload = () => img.classList.add('loaded');
            });
        });
    },

    supportsWebP: () => {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    },

    getExtension: (filename) => {
        return filename.split('.').pop().toLowerCase();
    },

    supportedFormats: () => {
        return ['webp', 'jpg', 'jpeg', 'png']; // Prioritize WebP
    }
};