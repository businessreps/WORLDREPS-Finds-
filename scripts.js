// Sidebar toggle
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

menuBtn.addEventListener("click", () => sidebar.classList.add("active"));
closeSidebar.addEventListener("click", () => sidebar.classList.remove("active"));

// Render categories into sidebar menu
function renderCategories() {
  const menu = document.getElementById("categoryMenu");
  menu.innerHTML = "";
  categories.forEach(cat => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = cat.name;
    a.href = "#";
    li.appendChild(a);
    if(cat.subcategories.length > 0){
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

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();

  document.getElementById("mobileSearch").addEventListener("input", e => {
    console.log("Buscar:", e.target.value);
  });
});

// Animación simple del hero (estrellas y planeta orbitando)
const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 300;

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Fondo estrellas
  for(let i=0;i<100;i++){
    ctx.fillStyle = 'white';
    ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 1, 1);
  }

  // Tierra
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 50, 0, Math.PI*2);
  ctx.fillStyle = '#1e90ff';
  ctx.fill();

  // Planeta pequeño orbitando
  const time = Date.now()/1000;
  const orbitRadius = 100;
  const x = canvas.width/2 + orbitRadius * Math.cos(time);
  const y = canvas.height/2 + orbitRadius * Math.sin(time);

  ctx.beginPath();
  ctx.arc(x, y, 15, 0, Math.PI*2);
  ctx.fillStyle = '#ff00ff';
  ctx.fill();

  requestAnimationFrame(draw);
}
draw();