const productCards = document.querySelectorAll("[data-product]");
const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("site-search");
const categorySelect = document.getElementById("filter-category");
const conditionSelect = document.getElementById("filter-condition");
const sortSelect = document.getElementById("filter-sort");
const filterForm = document.getElementById("filter-form");
const resetButton = document.getElementById("filter-reset");
const visibleCount = document.getElementById("visible-count");
const noResults = document.getElementById("no-results");

function matchesSearch(name, term) {
  if (term === "") {
    return true;
  }

  const words = term.split(" ");

  for (const word of words) {
    if (name.indexOf(word) === -1) {
      return false;
    }
  }

  return true;
}

function matchesFilters(card, term, category, condition) {
  if (!matchesSearch(card.dataset.name, term)) {
    return false;
  } else if (category && card.dataset.category !== category) {
    return false;
  } else if (condition && card.dataset.condition !== condition) {
    return false;
  } else {
    return true;
  }
}

function applyFilters() {
  const term = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const condition = conditionSelect.value;
  let visible = 0;

  for (const card of productCards) {
    if (matchesFilters(card, term, category, condition)) {
      card.style.display = "";
      visible = visible + 1;
    } else {
      card.style.display = "none";
    }
  }

  visibleCount.textContent = visible;
  noResults.hidden = visible !== 0;
}

function compareByPriceAscending(a, b) {
  return Number(a.dataset.price) - Number(b.dataset.price);
}

function compareByPriceDescending(a, b) {
  return Number(b.dataset.price) - Number(a.dataset.price);
}

function compareByName(a, b) {
  return a.dataset.name.localeCompare(b.dataset.name);
}

function compareByOriginalOrder(a, b) {
  return Number(a.dataset.order) - Number(b.dataset.order);
}

function sortProducts() {
  const sortBy = sortSelect.value;
  const cards = Array.from(productCards);

  if (sortBy === "price-asc") {
    cards.sort(compareByPriceAscending);
  } else if (sortBy === "price-desc") {
    cards.sort(compareByPriceDescending);
  } else if (sortBy === "name") {
    cards.sort(compareByName);
  } else {
    cards.sort(compareByOriginalOrder);
  }

  for (const card of cards) {
    productGrid.appendChild(card);
  }
}

function resetFilters() {
  searchInput.value = "";
  categorySelect.value = "";
  conditionSelect.value = "";
  sortSelect.value = "newest";
  sortProducts();
  applyFilters();
}

function applyStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");
  const category = params.get("category");
  const condition = params.get("condition");
  const sort = params.get("sort");

  if (query) {
    searchInput.value = query;
  }

  if (category) {
    categorySelect.value = category;
  }

  if (condition) {
    conditionSelect.value = condition;
  }

  if (sort) {
    sortSelect.value = sort;
  }
}

function applyFiltersAndSort() {
  sortProducts();
  applyFilters();
}

function handleFilterSubmit(event) {
  event.preventDefault();
  applyFiltersAndSort();
}

function handleSortChange() {
  applyFiltersAndSort();
}

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
conditionSelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", handleSortChange);
filterForm.addEventListener("submit", handleFilterSubmit);
resetButton.addEventListener("click", resetFilters);

applyStateFromUrl();
sortProducts();
applyFilters();
