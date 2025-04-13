// This file is now simplified since we're only using dark mode
(function() {
    // Wait for document ready
    $(document).ready(function() {
        // Always use dark mode
        $('html, body').css('background', '#222222');
        
        // Remove any theme toggle functionality
        $('.js-style-toggle').hide();
    });
})();
