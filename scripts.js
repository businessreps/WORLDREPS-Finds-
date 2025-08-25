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
    const a=document.createElement("a"); a.textContent=cat.name; a.href="#"; li.appendChild(a);
    if(cat.subcategories.length){
      const ul=document.createElement("ul");
      cat.subcategories.forEach(sub=>{const subLi=document.createElement("li"); const subA=document.createElement("a"); subA.textContent="— "+sub; subA.href="#"; subLi.appendChild(subA); ul.appendChild(subLi)});
      li.appendChild(ul);
    }
    menu.appendChild(li);
  });
}
document.addEventListener("DOMContentLoaded",()=>{renderCategories(); animate()});
const canvas=document.getElementById("galaxy"),ctx=canvas.getContext("2d");
function resize(){canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight||480} resize();window.addEventListener("resize",resize);

// Load Earth texture
const earth=new Image(); earth.src="earth.jpg";
const cnfans=new Image(); cnfans.src="https://i.ibb.co/5hY8bKw/cnfans.png"; // usa tu logo CNFans real

function animate(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 // background stars
 ctx.fillStyle="black"; ctx.fillRect(0,0,canvas.width,canvas.height);
 for(let i=0;i<150;i++){ctx.fillStyle="white"; ctx.fillRect(Math.random()*canvas.width,Math.random()*canvas.height,1,1)}
 const t=Date.now()/1000;
 // draw Earth rotating (simulate by shifting texture)
 const earthX=canvas.width*0.35, earthY=canvas.height*0.55, earthR=90;
 if(earth.complete){
   ctx.save();
   ctx.beginPath(); ctx.arc(earthX,earthY,earthR,0,Math.PI*2); ctx.clip();
   const shift=(t*20)%(earth.width);
   ctx.drawImage(earth,-shift,earthY-earthR,earth.width,earthR*2);
   ctx.drawImage(earth,earth.width-shift,earthY-earthR,earth.width,earthR*2);
   ctx.restore();
 }
 // CNFans orbit
 const orbitR=170; const px=earthX+orbitR*Math.cos(t*0.8), py=earthY+orbitR*Math.sin(t*0.8);
 const cnR=35;
 if(cnfans.complete){ctx.drawImage(cnfans,px-cnR,py-cnR,cnR*2,cnR*2)} else {ctx.fillStyle="red";ctx.beginPath();ctx.arc(px,py,cnR,0,Math.PI*2);ctx.fill()}
 requestAnimationFrame(animate);
}