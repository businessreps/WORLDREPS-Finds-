// Sidebar
const menuBtn=document.getElementById("menuBtn");
const sidebar=document.getElementById("sidebar");
const closeSidebar=document.getElementById("closeSidebar");
menuBtn.addEventListener("click",()=>sidebar.classList.add("active"));
closeSidebar.addEventListener("click",()=>sidebar.classList.remove("active"));

// Categorías
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

// Hero animation using embedded images
const canvas=document.getElementById('galaxy'), ctx=canvas.getContext('2d');
function resize(){canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight||480;}
resize(); window.addEventListener('resize', resize);

const earthImg=new Image(); earthImg.src=window.__EARTH_DATA__;
const cnfansImg=new Image(); cnfansImg.src=window.__CNFANS_DATA__;
const extraImgs=(window.__EXTRA_PLANETS__||[]).map(src=>{const i=new Image(); i.src=src; return i;});

let stars=Array.from({length:160},()=>({x:Math.random(),y:Math.random(),s:Math.random()*1.2+0.2}));

function bg(){
  const g=ctx.createLinearGradient(0,0,0,canvas.height);
  g.addColorStop(0,'#071022'); g.addColorStop(1,'#000');
  ctx.fillStyle=g; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#fff';
  stars.forEach(st=>{const x=st.x*canvas.width,y=st.y*canvas.height;
    ctx.globalAlpha=0.5+Math.sin((x+y+Date.now()/700))/4;
    ctx.fillRect(x,y,st.s,st.s);
  });
  ctx.globalAlpha=1;
  // decorative planets
  const spots=[{x:0.78,y:0.22,s:0.18,idx:0},{x:0.9,y:0.6,s:0.12,idx:1},{x:0.65,y:0.8,s:0.14,idx:2}];
  spots.forEach(sp=>{
    const img=extraImgs[sp.idx]; if(!img) return;
    const w=canvas.width*sp.s; const h=w;
    ctx.drawImage(img, canvas.width*sp.x-w/2, canvas.height*sp.y-h/2, w, h);
  });
}

function draw(){
  bg();
  const earthR=Math.min(canvas.width,canvas.height)*0.16+40;
  const ex=canvas.width*0.34, ey=canvas.height*0.6;
  const size=earthR*2;
  if(earthImg.complete) ctx.drawImage(earthImg, ex-earthR, ey-earthR, size, size);
  else { ctx.fillStyle='#1e90ff'; ctx.beginPath(); ctx.arc(ex,ey,earthR,0,Math.PI*2); ctx.fill(); }

  const t=Date.now()/1000; const orbitR=earthR*1.9;
  const px=ex + orbitR*Math.cos(t*0.85);
  const py=ey + orbitR*Math.sin(t*0.85);
  const cnSize=earthR*0.65;
  if(cnfansImg.complete){ ctx.save(); ctx.translate(px,py); ctx.rotate(t*1.2); ctx.drawImage(cnfansImg,-cnSize/2,-cnSize/2,cnSize,cnSize); ctx.restore(); }
  else { ctx.fillStyle='#e22'; ctx.beginPath(); ctx.arc(px,py,cnSize/2,0,Math.PI*2); ctx.fill(); }

  requestAnimationFrame(draw);
}

document.addEventListener('DOMContentLoaded',()=>{ renderCategories(); draw(); });