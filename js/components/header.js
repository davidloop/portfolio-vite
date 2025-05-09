/**
 * Header Component
 * Renders the main header with title and subtitle
 */
import json from '../../data/header.json';

/**
 * Renders the header component
 * @param {jQuery} element - The jQuery element to render the header into
 */
export function header(element) {
    const data = json;
    
    const html = `
        <div class="parallax-container">
            <canvas id="particleCanvas" class="particle-canvas"></canvas>
        </div>
        <h1 data-aos="fade-left" data-aos-delay="400">${data.text_h1}</h1>
        <h2 data-aos="fade-left" data-aos-delay="500">${data.text_h2}</h2>
    `;
    
    $(element).html(html);
    
    // Initialize particle animation
    initParticleAnimation();
    
    // Initialize parallax effect
    initParallax();
}

/**
 * Initializes the parallax effect for the header background
 */
function initParallax() {
    const $parallaxContainer = $(".parallax-container");
    if (!$parallaxContainer.length) return;
    
    // Initial position
    let offsetY = 0;
    
    // Update parallax position on scroll
    $(window).on('scroll', function() {
        // Calculate how far we've scrolled
        const scrollY = $(window).scrollTop();
        
        // Move the container at a slower rate than the scroll (parallax effect)
        // Using a factor of 0.3 means the background moves at 30% the speed of scrolling
        offsetY = scrollY * 0.3;
        
        // Apply the transform
        $parallaxContainer.css('transform', `translate3d(0, ${offsetY}px, 0)`);
    });
}

/**
 * Initializes the particle animation on the canvas
 */
function initParticleAnimation() {
    const $canvas = $("[id=particleCanvas]");
    if (!$canvas.length) return;
    
    const canvas = $canvas[0];
    const ctx = canvas.getContext('2d');
    let particles = [];
    // Adjust particle count based on device performance
    const isMobile = $(window).width() < 768;
    const particleCount = isMobile ? 100 : 250;
    let mouseX = 0;
    let mouseY = 0;
    // For performance optimization
    let animationFrameId;
    
    // Set canvas size to match header
    function resizeCanvas() {
        const $header = $canvas.closest("header");
        canvas.width = $header.width();
        canvas.height = $header.height();
    }
    
    // Create particles
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5, // Adjusted size range
                opacity: Math.random() * 0.8 + 0.2, // Adjusted opacity range
                speedX: Math.random() * 0.4 - 0.2,
                speedY: Math.random() * 0.4 - 0.2,
                // Add slight variation to each particle
                directionX: Math.random() > 0.5 ? 1 : -1,
                directionY: Math.random() > 0.5 ? 1 : -1
            });
        }
    }
    
    // Draw particles
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        $.each(particles, function(i, particle) {
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
            
            // Update position with slight mouse influence
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only apply mouse influence if mouse is on canvas and within range
            if (mouseX > 0 && mouseY > 0 && distance < 120) {
                const force = 0.01;
                particle.x -= (dx * force);
                particle.y -= (dy * force);
            }
            
            // Regular movement
            particle.x += particle.speedX * particle.directionX;
            particle.y += particle.speedY * particle.directionY;
            
            // Occasionally change direction for more natural movement
            if (Math.random() < 0.01) {
                particle.directionX *= -1;
            }
            if (Math.random() < 0.01) {
                particle.directionY *= -1;
            }
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        });
        
        // Always continue animation regardless of visibility
        animationFrameId = requestAnimationFrame(drawParticles);
    }
    
    // Track mouse position
    $canvas.on('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    // Reset mouse position when mouse leaves
    $canvas.on('mouseleave', function() {
        mouseX = -100;
        mouseY = -100;
    });
    
    // Initialize
    $(window).on('resize', function() {
        resizeCanvas();
        createParticles();
    });
    
    resizeCanvas();
    createParticles();
    drawParticles();
    
    // Return cleanup function
    return function() {
        $(window).off('resize');
        $canvas.off('mousemove mouseleave');
        cancelAnimationFrame(animationFrameId);
    };
}
