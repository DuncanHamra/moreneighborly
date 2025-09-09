console.log('Location drawer script loaded!');

// Simple confetti function
function createConfetti(element) {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
  const confettiCount = 30;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    
    // Get element position
    const rect = element.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    
    confetti.style.left = startX + 'px';
    confetti.style.top = startY + 'px';
    
    document.body.appendChild(confetti);
    
    // Animate confetti
    const deltaX = (Math.random() - 0.5) * 400;
    const deltaY = (Math.random() - 0.5) * 400 - 100;
    const rotation = Math.random() * 360;
    
    confetti.animate([
      {
        transform: `translate(0, 0) rotate(0deg)`,
        opacity: 1
      },
      {
        transform: `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`,
        opacity: 0
      }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }).onfinish = () => confetti.remove();
  }
}

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
      
      // Trigger confetti from the clicked element
      createConfetti(trigger);
      
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
