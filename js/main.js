// Fixed fade out elements based on distance from bottom of page
function initDistanceBasedFade() {
  const menuBar = document.querySelector('.menu-bar');
  const skyline = document.querySelector('.skyline-container');
  const hoverText = document.getElementById('hover-text');
  const searchIcon = document.getElementById('search-icon-container');
  
  // Debug: Check if elements exist
  console.log('Menu bar:', menuBar);
  console.log('Skyline:', skyline);
  console.log('Hover text:', hoverText);
  console.log('Search icon:', searchIcon);
  
  let ticking = false;
  let lastScrollY = window.scrollY;
  
  function updateFade() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate distance from bottom of page
    const distanceFromBottom = documentHeight - (scrollY + windowHeight);
    
    // Debug: Log values to see what's happening
    console.log('Scroll Y:', scrollY, 'Window height:', windowHeight, 
                'Doc height:', documentHeight, 'Distance from bottom:', distanceFromBottom);
    
    // Start fading when 1000px from bottom, complete fade at 300px from bottom
    const fadeStart = 1000; // Start fading when 1000px from bottom
    const fadeEnd = 300;    // Complete fade when 300px from bottom
    
    let opacity = 1;
    if (distanceFromBottom < fadeStart) {
      opacity = Math.max(0, (distanceFromBottom - fadeEnd) / (fadeStart - fadeEnd));
      console.log('Opacity:', opacity);
    }
    
    // Apply opacity to elements
    if (menuBar) {
      menuBar.style.opacity = opacity;
      menuBar.style.transition = 'opacity 0.3s ease';
    }
    if (skyline) {
      skyline.style.opacity = opacity;
      skyline.style.transition = 'opacity 0.3s ease';
    }
    if (hoverText) {
      hoverText.style.opacity = opacity;
      hoverText.style.transition = 'opacity 0.3s ease';
    }
    
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
  
  // Add scroll event listener
  window.addEventListener('scroll', () => {
    if (Math.abs(window.scrollY - lastScrollY) > 5) {
      requestTick();
      lastScrollY = window.scrollY;
    }
  });
  
  // Add resize event listener
  window.addEventListener('resize', updateFade);
  
  // Initial call
  updateFade();
  
  // Check if function is being called
  console.log('initDistanceBasedFade function called');
}