// Floating ambient pixel balls on start screen
const ambientBalls = Array.from({ length: 8 }, () => ({
  x: Math.random() * 160,
  y: Math.random() * 120,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  r: 3 + Math.floor(Math.random() * 3),
  color: ['#ff1493', '#ff69b4', '#ffb6c1', '#ffffff', '#4a0025'][Math.floor(Math.random() * 5)]
}));

function drawPinkPixelWorld() {
  const artCanvas = document.getElementById('skyline-art');
  if (!artCanvas) return;
  const ctx = artCanvas.getContext('2d');

  const w = artCanvas.width;   // 160px
  const h = artCanvas.height;  // 120px

  ctx.clearRect(0, 0, w, h);

  // 1. Pink Sky Gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, '#ffc0cb');
  skyGrad.addColorStop(0.5, '#ff8da1');
  skyGrad.addColorStop(1, '#d81b60');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Pixel Sun & Clouds
  ctx.fillStyle = '#fff7c2';
  ctx.fillRect(110, 15, 12, 12); // Sun

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(20, 12, 18, 5);
  ctx.fillRect(24, 9, 10, 3);
  ctx.fillRect(120, 25, 22, 6);

  // 3. Background Pixel Castle & Hills
  ctx.fillStyle = '#ad1457';
  ctx.fillRect(65, 50, 30, 25);
  ctx.fillRect(72, 42, 16, 8);
  ctx.fillRect(77, 36, 6, 6); // Castle Tower

  ctx.fillStyle = '#f06292';
  ctx.fillRect(0, 70, 160, 50);

  // 4. Foreground Pixel Trees
  ctx.fillStyle = '#880e4f';
  ctx.fillRect(10, 55, 24, 24);
  ctx.fillRect(130, 50, 26, 26);
  ctx.fillStyle = '#e91e63';
  ctx.fillRect(12, 53, 20, 20);
  ctx.fillRect(132, 48, 22, 22);

  // Tree Trunks
  ctx.fillStyle = '#4a0025';
  ctx.fillRect(20, 75, 4, 15);
  ctx.fillRect(141, 72, 4, 18);

  // 5. Update & Draw Ambient Floating Pixel Balls
  ambientBalls.forEach(b => {
    b.x += b.vx;
    b.y += b.vy;

    if (b.x < 0 || b.x > w) b.vx *= -1;
    if (b.y < 0 || b.y > h) b.vy *= -1;

    ctx.fillStyle = b.color;
    ctx.fillRect(Math.floor(b.x), Math.floor(b.y), b.r, b.r);
  });

  requestAnimationFrame(drawPinkPixelWorld);
}

function drawRedArrow(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 16, 16);

  const arrow = [
    [0,0,0,0,2,2,2,2,0,0,0,0],
    [0,0,0,0,2,1,1,2,0,0,0,0],
    [0,0,0,0,2,1,1,2,0,0,0,0],
    [0,0,0,0,2,1,1,2,0,0,0,0],
    [0,0,0,0,2,1,1,2,0,0,0,0],
    [2,2,2,2,2,1,1,2,2,2,2,2],
    [2,1,1,1,1,1,1,1,1,1,1,2],
    [0,2,1,1,1,1,1,1,1,1,2,0],
    [0,0,2,1,1,1,1,1,1,2,0,0],
    [0,0,0,2,1,1,1,1,2,0,0,0],
    [0,0,0,0,2,1,1,2,0,0,0,0],
    [0,0,0,0,0,2,2,0,0,0,0,0]
  ];

  for (let r = 0; r < arrow.length; r++) {
    for (let c = 0; c < arrow[r].length; c++) {
      if (arrow[r][c] === 1) {
        ctx.fillStyle = '#ff1493';
        ctx.fillRect(c + 2, r + 2, 1, 1);
      } else if (arrow[r][c] === 2) {
        ctx.fillStyle = '#4a0025';
        ctx.fillRect(c + 2, r + 2, 1, 1);
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  drawPinkPixelWorld();
  drawRedArrow('start-arrow-canvas');
  drawRedArrow('restart-arrow-canvas');
});