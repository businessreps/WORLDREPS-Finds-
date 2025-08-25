const menuBtn=document.getElementById("menuBtn");
const sidebar=document.getElementById("sidebar");
const closeSidebar=document.getElementById("closeSidebar");
menuBtn.addEventListener("click",()=>sidebar.classList.add("active"));
closeSidebar.addEventListener("click",()=>sidebar.classList.remove("active"));
function renderCategories(){
  const menu=document.getElementById("categoryMenu");
  menu.innerHTML="";
  categories.forEach(cat=>{
    const li=document.createElement("li");
    const a=document.createElement("a");
    a.textContent=cat.name;a.href="#";li.appendChild(a);
    if(cat.subcategories.length){
      const ul=document.createElement("ul");
      cat.subcategories.forEach(sub=>{const subLi=document.createElement("li");const subA=document.createElement("a");subA.textContent="— "+sub;subA.href="#";subLi.appendChild(subA);ul.appendChild(subLi)});
      li.appendChild(ul);
    }
    menu.appendChild(li);
  });
}
document.addEventListener("DOMContentLoaded",()=>{renderCategories();animate()});
// Animación básica con planetas extra
const canvas=document.getElementById("galaxy"),ctx=canvas.getContext("2d");
function resize(){canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight||420}resize();window.addEventListener("resize",resize);
function animate(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle="black";ctx.fillRect(0,0,canvas.width,canvas.height);
 // estrellas
 for(let i=0;i<150;i++){ctx.fillStyle="white";ctx.fillRect(Math.random()*canvas.width,Math.random()*canvas.height,1,1)}
 // tierra
 ctx.beginPath();ctx.arc(canvas.width/3,canvas.height/2,60,0,Math.PI*2);ctx.fillStyle="#1e90ff";ctx.fill();
 // cnfans orbit
 let t=Date.now()/1000;let orbit=120;let x=canvas.width/3+orbit*Math.cos(t);let y=canvas.height/2+orbit*Math.sin(t);
 ctx.beginPath();ctx.arc(x,y,25,0,Math.PI*2);ctx.fillStyle="red";ctx.fill();
 requestAnimationFrame(animate);
}