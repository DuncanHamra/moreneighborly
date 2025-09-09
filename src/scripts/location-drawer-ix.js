console.log('Location drawer script loaded!');

// Initialize all location drawers to height 0 on page load
function initializeDrawers() {
  const drawers = document.querySelectorAll('.location-drawer');
  drawers.forEach(drawer => {
    drawer.style.height = '0';
    drawer.style.overflow = 'hidden';
    drawer.style.transition = 'height 0.1s ease';
  });
}

// Handle drawer toggle functionality
function handleDrawerToggle() {
  const triggers = document.querySelectorAll('[data-open-drawer]');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Find the parent location-card element
      const locationCard = trigger.closest('.location-card');
      
      if (locationCard) {
        // Find the location-drawer within the same location-card
        const drawer = locationCard.querySelector('.location-drawer');
        
        if (drawer) {
          // Close all other drawers first
          const allDrawers = document.querySelectorAll('.location-drawer');
          allDrawers.forEach(otherDrawer => {
            if (otherDrawer !== drawer) {
              otherDrawer.style.height = '0';
            }
          });
          
          // Toggle current drawer state
          if (drawer.style.height === '0px' || drawer.style.height === '0') {
            // Get the natural height by temporarily setting to auto
            drawer.style.height = 'auto';
            const targetHeight = drawer.scrollHeight + 'px';
            drawer.style.height = '0';
            
            // Force a reflow, then animate to target height
            drawer.offsetHeight;
            drawer.style.height = targetHeight;
          } else {
            drawer.style.height = '0';
          }
        }
      }
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initializeDrawers();
    handleDrawerToggle();
  });
} else {
  initializeDrawers();
  handleDrawerToggle();
}
