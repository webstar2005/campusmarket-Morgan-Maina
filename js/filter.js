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

const galleryFrame = document.getElementById("gallery-frame");
const galleryKicker = document.getElementById("gallery-kicker");
const galleryCaption = document.getElementById("gallery-caption");
const galleryTitle = galleryCaption ? galleryCaption.querySelector("h3") : null;
const galleryMeta = galleryCaption ? galleryCaption.querySelector(".product-card__meta") : null;
const galleryLink = document.getElementById("gallery-link");
const galleryDots = document.getElementById("gallery-dots");
const galleryPrevBtn = document.querySelector("[data-gallery-prev]");
const galleryNextBtn = document.querySelector("[data-gallery-next]");
const gallerySection = document.getElementById("product-gallery");

let gallerySlides = [];
let galleryCurrent = 0;

const listingData = {
  1: { name: "Scientific Calculator (Casio fx-991)", meta: "Electronics \u00b7 Like new \u00b7 KSh 1,200 \u00b7 Brian K.", img: "img/calculator.svg", link: "product.html" },
  2: { name: "Wireless Keyboard & Mouse Combo", meta: "Electronics \u00b7 Like new \u00b7 KSh 2,500 \u00b7 Grace A.", img: "img/keyboard.svg", link: "product.html" },
  3: { name: "Introduction to Algorithms (CLRS)", meta: "Textbooks \u00b7 Used \u00b7 good \u00b7 KSh 2,200 \u00b7 Faraj H.", img: "img/algorithms.svg", link: "product.html" },
  4: { name: "Calculus: Early Transcendentals (8th Ed.)", meta: "Textbooks \u00b7 Used \u00b7 good \u00b7 KSh 1,800 \u00b7 Amina W.", img: "img/calculus.svg", link: "product.html" },
  5: { name: "Mini Dorm Fridge (45L)", meta: "Dorm & living \u00b7 Used \u00b7 fair \u00b7 KSh 6,500 \u00b7 Chiara M.", img: "img/fridge.svg", link: "product.html" },
  6: { name: "LED Desk Lamp with USB Port", meta: "Dorm & living \u00b7 New \u00b7 KSh 900 \u00b7 Eva N.", img: "img/lamp.svg", link: "product.html" },
  7: { name: "Mountain Bike (Size M)", meta: "Transport \u00b7 Used \u00b7 good \u00b7 KSh 9,500 \u00b7 Denis O.", img: "img/bike.svg", link: "product.html" },
  8: { name: "Campus Hoodie (Navy, L)", meta: "Clothing \u00b7 New \u00b7 KSh 1,500 \u00b7 Ian M.", img: "img/hoodie.svg", link: "product.html" }
};

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

function buildGallery() {
  if (!galleryFrame) return;

  const visibleCards = Array.from(productCards).filter(card => card.style.display !== "none");
  gallerySlides = [];

  galleryFrame.innerHTML = "";
  if (galleryDots) galleryDots.innerHTML = "";

  if (visibleCards.length === 0) {
    if (gallerySection) gallerySection.style.display = "none";
    return;
  }

  if (gallerySection) gallerySection.style.display = "";

  for (let i = 0; i < visibleCards.length; i++) {
    const card = visibleCards[i];
    const id = card.dataset.id;
    const data = listingData[id] || { name: card.dataset.name, meta: "", img: "", link: "product.html" };

    const slide = document.createElement("img");
    slide.className = "gallery__slide" + (i === 0 ? " is-active" : "");
    slide.dataset.gallerySlide = "";
    slide.src = data.img;
    slide.width = 800;
    slide.height = 600;
    slide.alt = data.name;
    slide.setAttribute("aria-hidden", i === 0 ? "false" : "true");
    galleryFrame.appendChild(slide);
    gallerySlides.push(slide);

    if (galleryDots) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery__dot" + (i === 0 ? " is-current" : "");
      btn.dataset.galleryDot = String(i);
      btn.setAttribute("aria-label", "Show listing " + (i + 1) + ": " + data.name);
      btn.setAttribute("aria-current", i === 0 ? "true" : "false");
      btn.addEventListener("click", () => showGallerySlide(i));
      li.appendChild(btn);
      galleryDots.appendChild(li);
    }
  }

  galleryCurrent = 0;
  updateGalleryCaption();
}

function updateGalleryCaption() {
  if (!galleryKicker || !galleryCaption || gallerySlides.length === 0) return;
  const visibleCards = Array.from(productCards).filter(card => card.style.display !== "none");
  const data = listingData[visibleCards[galleryCurrent]?.dataset.id] || { name: "", meta: "" };
  galleryKicker.textContent = "Listing " + (galleryCurrent + 1) + " of " + gallerySlides.length;
  if (galleryTitle) galleryTitle.textContent = data.name;
  if (galleryMeta) galleryMeta.textContent = data.meta;
  if (galleryLink) galleryLink.href = data.link || "product.html";
}

function showGallerySlide(index) {
  if (gallerySlides.length === 0) return;
  galleryCurrent = (index + gallerySlides.length) % gallerySlides.length;
  for (let i = 0; i < gallerySlides.length; i++) {
    gallerySlides[i].classList.toggle("is-active", i === galleryCurrent);
    gallerySlides[i].setAttribute("aria-hidden", i === galleryCurrent ? "false" : "true");
  }
  if (galleryDots) {
    const dots = galleryDots.querySelectorAll("button");
    dots.forEach((dot, i) => {
      dot.setAttribute("aria-current", i === galleryCurrent ? "true" : "false");
    });
  }
  updateGalleryCaption();
}

function galleryNext() {
  showGallerySlide(galleryCurrent + 1);
}

function galleryPrev() {
  showGallerySlide(galleryCurrent - 1);
}

function handleGalleryKeydown(event) {
  if (event.key === "ArrowRight") galleryNext();
  else if (event.key === "ArrowLeft") galleryPrev();
  else return;
  event.preventDefault();
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
  buildGallery();
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

if (galleryPrevBtn) galleryPrevBtn.addEventListener("click", galleryPrev);
if (galleryNextBtn) galleryNextBtn.addEventListener("click", galleryNext);
if (galleryFrame) galleryFrame.addEventListener("keydown", handleGalleryKeydown);

applyStateFromUrl();
sortProducts();
applyFilters();
