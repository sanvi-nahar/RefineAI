document.addEventListener('DOMContentLoaded', () => {
    // Bubble generation
    const bubbleContainer = document.querySelector('.bubbles');
    const bubbles = 15;
    for (let i = 0; i < bubbles; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = `${Math.random() * 80 + 20} px`;
        const duration = `${Math.random() * 20 + 15}s`;
        const delay = ` ${Math.random() * 10}s`;
        const xStart = `${Math.random() * 100 - 50}vw`;
        const xEnd = `${Math.random() * 100 - 50}vw`;
        bubble.style.setProperty('--size', size);
        bubble.style.setProperty('--duration', duration);
        bubble.style.animationDelay = delay;
        bubble.style.setProperty('--x-start', xStart);
        bubble.style.setProperty('--x-end', xEnd);
        bubbleContainer.appendChild(bubble);
    }
    // Scroll animations
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = ` ${entry.target.dataset.delay || index * 100} ms`;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.feature-card, .contact-section > *').forEach((el, index) => {
        el.dataset.delay = index * 120;
        observer.observe(el);
    });
});