const menuBtn=document.getElementById("menuBtn");
const sidebar=document.getElementById("sidebar");
const closeSidebar=document.getElementById("closeSidebar");
menuBtn.addEventListener("click",()=>sidebar.classList.add("active"));
closeSidebar.addEventListener("click",()=>sidebar.classList.remove("active"));

function renderCategories(){
  const menu=document.getElementById("categoryMenu"); menu.innerHTML="";
  categories.forEach(cat=>{
    const li=document.createElement("li"); const a=document.createElement("a");
    a.textContent=cat.name; a.href="#"; li.appendChild(a);
    if(cat.subcategories.length){
      const ul=document.createElement("ul");
      cat.subcategories.forEach(sub=>{const subLi=document.createElement("li"); const subA=document.createElement("a"); subA.textContent="— "+sub; subA.href="#"; subLi.appendChild(subA); ul.appendChild(subLi)});
      li.appendChild(ul);
    }
    menu.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded",()=>{renderCategories(); draw()});

const canvas=document.getElementById('galaxy'), ctx=canvas.getContext('2d');
function resize(){canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight||500} resize();window.addEventListener('resize',resize);

const earthImg=new Image(); earthImg.src=window.__EARTH_DATA__;
const cnfansImg=new Image(); cnfansImg.src=window.__CNFANS_DATA__;

let stars=Array.from({length:180},()=>({x:Math.random(),y:Math.random(),s:Math.random()*1.2+0.2}));

function bg(){ctx.fillStyle="black";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle="#fff";
 stars.forEach(st=>{ctx.fillRect(st.x*canvas.width,st.y*canvas.height,1,1)})}

function draw(){bg();
 const t=Date.now()/1000;
 const R=Math.min(canvas.width,canvas.height)*0.16+60;
 const ex=canvas.width*0.34, ey=canvas.height*0.6, size=R*2;
 if(earthImg.complete){ctx.save();ctx.beginPath();ctx.arc(ex,ey,R,0,Math.PI*2);ctx.clip();
  const shift=((t*40)%(earthImg.width));ctx.drawImage(earthImg,ex-R-shift,ey-R,size*2,size);
  ctx.drawImage(earthImg,ex-R-shift+size*2,ey-R,size*2,size);ctx.restore();}
 else{ctx.fillStyle="#1e90ff";ctx.beginPath();ctx.arc(ex,ey,R,0,Math.PI*2);ctx.fill();}
 const orbit=R*1.9;const px=ex+orbit*Math.cos(t*0.85),py=ey+orbit*Math.sin(t*0.85),cSize=R*0.65;
 if(cnfansImg.complete){ctx.save();ctx.translate(px,py);ctx.rotate(t*1.2);ctx.drawImage(cnfansImg,-cSize/2,-cSize/2,cSize,cSize);ctx.restore();}
 else{ctx.fillStyle="#e22";ctx.beginPath();ctx.arc(px,py,cSize/2,0,Math.PI*2);ctx.fill();}
 requestAnimationFrame(draw);}
