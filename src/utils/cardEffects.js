// Global scroll reveal initiator
export const initScrollReveal = () => {
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.classList.contains('stagger-reveal')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.08}s`;
          });
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .stagger-reveal').forEach((el) => {
    observer.observe(el);
  });

  return observer;
};
