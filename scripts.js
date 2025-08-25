// Sidebar toggle + render categories (no canvas)
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
      cat.subcategories.forEach(sub=>{const li2=document.createElement("li"); const a2=document.createElement("a"); a2.textContent="— "+sub; a2.href="#"; li2.appendChild(a2); ul.appendChild(li2);});
      li.appendChild(ul);
    }
    menu.appendChild(li);
  });
}
document.addEventListener("DOMContentLoaded",renderCategories);
