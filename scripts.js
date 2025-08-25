// ----- Sidebar toggle -----
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

menuBtn.addEventListener("click", () => sidebar.classList.add("active"));
closeSidebar.addEventListener("click", () => sidebar.classList.remove("active"));

// ----- Render categories into sidebar -----
function renderCategories() {
  const menu = document.getElementById("categoryMenu");
  menu.innerHTML = "";
  categories.forEach(cat => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = cat.name;
    a.href = "#";
    li.appendChild(a);
    if (cat.subcategories.length) {
      const ul = document.createElement("ul");
      cat.subcategories.forEach(sub => {
        const subLi = document.createElement("li");
        const subA = document.createElement("a");
        subA.textContent = "— " + sub;
        subA.href = "#";
        subLi.appendChild(subA);
        ul.appendChild(subLi);
      });
      li.appendChild(ul);
    }
    menu.appendChild(li);
  });
}

// ----- Hero animation (2D) -----
const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
let W, H;
function resize(){
  W = canvas.width = canvas.clientWidth;
  H = canvas.height = canvas.clientHeight;
}
resize();
window.addEventListener('resize', resize);

// Load images
const earthImg = new Image();
earthImg.src = 'img/earth.png';
const cnfansImg = new Image();
cnfansImg.src = 'img/cnfans.png';

let stars = Array.from({length:120}, () => ({
  x: Math.random(), y: Math.random(), s: Math.random()*1.2+0.2
}));

function drawBackground(){
  // space gradient
  const g = ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0, '#070b1a');
  g.addColorStop(1, '#000');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,W,H);
  // stars
  ctx.fillStyle = '#ffffff';
  stars.forEach(st => {
    const x = st.x * W;
    const y = st.y * H;
    ctx.globalAlpha = 0.5 + Math.sin((x+y+Date.now()/700))/4;
    ctx.fillRect(x, y, st.s, st.s);
  });
  ctx.globalAlpha = 1;
}

function draw(){
  drawBackground();

  // Earth in center
  const earthR = Math.min(W,H) * 0.14 + 40;
  const earthX = W*0.32;
  const earthY = H*0.58;
  if (earthImg.complete) {
    const size = earthR*2;
    ctx.drawImage(earthImg, earthX-earthR, earthY-earthR, size, size);
  } else {
    ctx.fillStyle = '#1e90ff';
    ctx.beginPath(); ctx.arc(earthX, earthY, earthR, 0, Math.PI*2); ctx.fill();
  }

  // Orbit CNFans
  const t = Date.now()/1000;
  const orbitR = earthR*1.8;
  const px = earthX + orbitR * Math.cos(t*0.8);
  const py = earthY + orbitR * Math.sin(t*0.8);

  const cnSize = earthR*0.6;
  if (cnfansImg.complete) {
    ctx.save();
    // subtle spin
    ctx.translate(px, py);
    ctx.rotate(t*0.8);
    ctx.drawImage(cnfansImg, -cnSize/2, -cnSize/2, cnSize, cnSize);
    ctx.restore();
  } else {
    ctx.fillStyle = '#e22';
    ctx.beginPath(); ctx.arc(px, py, cnSize/2, 0, Math.PI*2); ctx.fill();
  }

  requestAnimationFrame(draw);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  draw();
});