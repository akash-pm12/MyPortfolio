// ── Custom Cursor ──────────────────────────────────────────────
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-pill, .project-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(1.8)';
    follower.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.opacity = '0.5';
  });
});

// ── Scroll Reveal ──────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => obs.observe(r));

// ── Active Nav Link on Scroll ──────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = (a.getAttribute('href') === '#' + current)
      ? 'var(--text)' : '';
  });
});
