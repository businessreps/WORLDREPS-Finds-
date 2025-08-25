// Sidebar
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");
menuBtn.addEventListener("click", () => sidebar.classList.add("active"));
closeSidebar.addEventListener("click", () => sidebar.classList.remove("active"));

// Categorías
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

// Hero animado sin rutas externas (usa imágenes inline base64)
const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
function sizeCanvas(){
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight || 360;
}
sizeCanvas(); window.addEventListener('resize', sizeCanvas);

const earthImg = new Image();
earthImg.src = window.__EARTH_DATA__;
const cnfansImg = new Image();
cnfansImg.src = window.__CNFANS_DATA__;

let stars = Array.from({length:120}, () => ({x: Math.random(), y: Math.random(), s: Math.random()*1.2+0.2}));

function bg(){
  const g = ctx.createLinearGradient(0,0,0,canvas.height);
  g.addColorStop(0, '#070b1a'); g.addColorStop(1, '#000');
  ctx.fillStyle = g; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#fff';
  stars.forEach(st=>{ const x=st.x*canvas.width, y=st.y*canvas.height;
    ctx.globalAlpha = 0.5 + Math.sin((x+y+Date.now()/700))/4;
    ctx.fillRect(x,y, st.s, st.s);
  });
  ctx.globalAlpha=1;
}

function draw(){
  bg();
  const earthR = Math.min(canvas.width, canvas.height)*0.14 + 40;
  const ex = canvas.width*0.32, ey = canvas.height*0.58;
  const size = earthR*2;
  if (earthImg.complete) ctx.drawImage(earthImg, ex-earthR, ey-earthR, size, size);
  else { ctx.fillStyle='#1e90ff'; ctx.beginPath(); ctx.arc(ex,ey,earthR,0,Math.PI*2); ctx.fill(); }

  const t = Date.now()/1000;
  const orbitR = earthR*1.8;
  const px = ex + orbitR*Math.cos(t*0.8);
  const py = ey + orbitR*Math.sin(t*0.8);
  const cnSize = earthR*0.6;
  if (cnfansImg.complete){ ctx.save(); ctx.translate(px,py); ctx.rotate(t*0.8); ctx.drawImage(cnfansImg,-cnSize/2,-cnSize/2,cnSize,cnSize); ctx.restore(); }
  else { ctx.fillStyle='#e22'; ctx.beginPath(); ctx.arc(px,py,cnSize/2,0,Math.PI*2); ctx.fill(); }

  requestAnimationFrame(draw);
}

document.addEventListener("DOMContentLoaded", ()=>{ renderCategories(); draw(); });