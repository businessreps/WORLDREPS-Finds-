// Aquí guardaremos los productos
const productos = [];

// Función para renderizar productos
function renderProductos(lista) {
  const grid = document.getElementById("productsGrid");
  const empty = document.getElementById("emptyState");

  grid.innerHTML = "";
  if (lista.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  lista.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" style="width:100%;border-radius:8px;">
      <h3>${p.nombre}</h3>
      <p>${p.precio}</p>
      <a href="${p.weidianLink}" target="_blank" rel="noopener noreferrer">Weidian</a> |
      <a href="${p.cnfansLink}" target="_blank" rel="noopener noreferrer">CNFans</a>
    `;
    grid.appendChild(card);
  });
}

// Búsqueda
document.getElementById("searchInput").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(q));
  renderProductos(filtrados);
});

// Inicial
renderProductos(productos);