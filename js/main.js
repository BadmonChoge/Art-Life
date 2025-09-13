// Fade out elements based on distance from bottom of page
function initDistanceBasedFade() {
  const menuBar = document.querySelector('.menu-bar');
  const skyline = document.querySelector('.skyline-container');
  const hoverText = document.getElementById('hover-text');
  const searchIcon = document.getElementById('search-icon-container');
  
  let ticking = false;
  let lastScrollY = window.scrollY;
  
  function updateFade() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate distance from bottom of page
    const distanceFromBottom = documentHeight - (scrollY + windowHeight);
    
    // Start fading when 1000px from bottom, complete fade at 300px from bottom
    const fadeStart = 1000; // Start fading when 1000px from bottom
    const fadeEnd = 300;    // Complete fade when 300px from bottom
    
    let opacity = 1;
    if (distanceFromBottom < fadeStart) {
      opacity = Math.max(0, distanceFromBottom - fadeEnd) / (fadeStart - fadeEnd);
    }
    
    // Apply opacity to elements
    if (menuBar) menuBar.style.opacity = opacity;
    if (skyline) skyline.style.opacity = opacity;
    if (hoverText) hoverText.style.opacity = opacity;
    
    // Hide elements completely when opacity is very low
    const visibility = opacity > 0.1 ? 'visible' : 'hidden';
    if (menuBar) menuBar.style.visibility = visibility;
    if (hoverText) hoverText.style.visibility = visibility;
    
    // Always keep search icon visible
    if (searchIcon) {
      searchIcon.style.opacity = 1;
      searchIcon.style.visibility = 'visible';
    }
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateFade);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', () => {
    if (Math.abs(window.scrollY - lastScrollY) > 5) {
      requestTick();
      lastScrollY = window.scrollY;
    }
  });
  
  window.addEventListener('resize', updateFade);
  
  // Initial call
  updateFade();
}

// Modern JavaScript - Safe, non-conflicting functionality only
document.addEventListener('DOMContentLoaded', () => {
  // Partner ticker hover pause (safe - no conflicts)
  const tickerTrack = document.getElementById('tickerTrack');
  if (tickerTrack) {
    tickerTrack.addEventListener('mouseenter', () => {
      tickerTrack.style.animationPlayState = 'paused';
    });
    
    tickerTrack.addEventListener('mouseleave', () => {
      tickerTrack.style.animationPlayState = 'running';
    });
  }
  
  // Safe title container shrinking (no opacity changes)
  window.addEventListener('scroll', () => {
    const titleContainer = document.querySelector('.title-container');
    if (titleContainer && window.scrollY > 100) {
      titleContainer.classList.add('shrink');
    } else if (titleContainer) {
      titleContainer.classList.remove('shrink');
    }
  });
  
  // Mobile header behavior only (no opacity changes)
  const mobileHeader = document.querySelector('.mobile-header');
  let lastScrollTop = 0;
  const scrollThreshold = 100;
  
  if (mobileHeader) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Mobile behavior - hide logo when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
          mobileHeader.style.transform = 'translateY(0)';
        } else if (scrollTop > scrollThreshold) {
          mobileHeader.style.transform = 'translateY(-100%)';
        } else {
          mobileHeader.style.transform = 'translateY(0)';
        }
      }
      
      lastScrollTop = scrollTop;
    });
  }

  // Set current date and year
  const yearElement = document.getElementById('current-year');
  const dateElement = document.getElementById('current-date');
  
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  if (dateElement) {
    dateElement.textContent = new Date().toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  }

  // Search functionality
  const searchToggle = document.getElementById('search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const closeSearch = document.querySelector('.close-search');
  
  if (searchToggle && searchOverlay && closeSearch) {
    searchToggle.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      document.getElementById('search-input').focus();
    });
    
    closeSearch.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
    });
    
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
      }
    });
  }

  // Initialize people carousel if it exists on the page
  if (document.querySelector('.person')) {
    initPeopleCarousel();
  }  

});
