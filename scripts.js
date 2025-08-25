// Sidebar toggle
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

menuBtn.addEventListener("click", () => sidebar.classList.add("active"));
closeSidebar.addEventListener("click", () => sidebar.classList.remove("active"));

// Render categories into the select
function renderCategories() {
  const container = document.getElementById("categoryFilter");
  container.innerHTML = '<option value="">All Categories</option>';

  categories.forEach(cat => {
    const optGroup = document.createElement("optgroup");
    optGroup.label = cat.name;

    cat.subcategories.forEach(sub => {
      const option = document.createElement("option");
      option.value = sub;
      option.textContent = sub;
      optGroup.appendChild(option);
    });

    container.appendChild(optGroup);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();

  // placeholders for your future filtering logic
  document.getElementById("categoryFilter").addEventListener("change", e => {
    console.log("Selected category:", e.target.value);
  });

  document.getElementById("mobileSearch").addEventListener("input", e => {
    console.log("Search query:", e.target.value);
  });
});