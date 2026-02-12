
// Scroll Reveal Animation
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .tech-pill, .hero-content, .code-block').forEach((el) => {
  el.classList.add('hidden-element');
  observer.observe(el);
});

// Dynamic Orb Movement on Mouse Move
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  
  if (orb1 && orb2) {
    orb1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
    orb2.style.transform = `translate(-${x * 50}px, -${y * 50}px)`;
  }
});

// Typing Effect for Code Block (Simulated)
const codeBlock = document.querySelector('code');
if (codeBlock) {
  const originalText = codeBlock.textContent;
  codeBlock.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < originalText.length) {
      codeBlock.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 10 + (Math.random() * 20)); // Random typing speed
    } else {
      // Re-add language class after typing complete for highlighting if any
      codeBlock.classList.add('language-yaml');
    }
  }
  
  // Start typing when code block is in view
  const codeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeWriter();
        codeObserver.unobserve(entry.target);
      }
    });
  });
  
  codeObserver.observe(document.querySelector('.code-block'));
}

// Inject necessary styles for animations
const style = document.createElement('style');
style.innerHTML = `
  .hidden-element {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
  }
  
  .reveal {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
