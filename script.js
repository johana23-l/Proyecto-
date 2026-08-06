const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let width = 0;
let height = 0;
let particles = [];
let pointer = { x: null, y: null };

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({ length: Math.min(90, Math.floor(width / 16)) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.2,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;

    if (pointer.x !== null && pointer.y !== null) {
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const alpha = (1 - dist / 140) * 0.25;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(125, 140, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.stroke();
      }
    }

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${particle.opacity})`;
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    for (let j = index + 1; j < particles.length; j += 1) {
      const other = particles[j];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const alpha = (1 - dist / 100) * 0.08;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(122, 92, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('pointermove', (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});

window.addEventListener('pointerleave', () => {
  pointer.x = null;
  pointer.y = null;
});

const tiltItems = document.querySelectorAll('.tilt-card');

tiltItems.forEach((item) => {
  item.addEventListener('mousemove', (event) => {
    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    item.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-4px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', targetId);
    }
  });
});

resizeCanvas();
drawParticles();
