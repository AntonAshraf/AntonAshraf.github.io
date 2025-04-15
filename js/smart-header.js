/**
 * Smart Header Behavior
 * Hides header when scrolling down, shows it when scrolling up
 */
(function() {
    // Variables
    var header = document.getElementById('fh5co-nav');
    var lastScrollTop = 0;
    var scrollThreshold = 10; // Minimum scroll amount before toggle
    var isHeaderVisible = true;
    
    // Function to handle scroll events
    function handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Check if we've scrolled more than threshold
        if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
            // Scrolling down & past the header
            if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
                if (isHeaderVisible) {
                    header.classList.add('nav-hidden');
                    header.classList.remove('nav-visible');
                    isHeaderVisible = false;
                }
            } 
            // Scrolling up or at top
            else {
                if (!isHeaderVisible || scrollTop === 0) {
                    header.classList.remove('nav-hidden');
                    header.classList.add('nav-visible');
                    isHeaderVisible = true;
                }
            }
            lastScrollTop = scrollTop;
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add visible class on initial load
    document.addEventListener('DOMContentLoaded', function() {
        header.classList.add('nav-visible');
    });
})();