const gallery = document.querySelector("[data-gallery]");

if (gallery) {
  const MIDDLE_DOT = "\u00b7";

  const slides = Array.from(gallery.querySelectorAll("[data-gallery-slide]"));
  const dots = document.getElementById("gallery-dots");
  const kicker = document.getElementById("gallery-kicker");
  const caption = document.getElementById("gallery-caption");
  const captionTitle = caption.querySelector("h3");
  const captionMeta = caption.querySelector(".product-card__meta");
  const previousButton = gallery.querySelector("[data-gallery-prev]");
  const nextButton = gallery.querySelector("[data-gallery-next]");

  const listings = [
    { name: "Scientific Calculator (Casio fx-991)", seller: "Brian K.", category: "Electronics", condition: "Like new", price: "KSh 1,200" },
    { name: "Wireless Keyboard & Mouse Combo", seller: "Grace A.", category: "Electronics", condition: "Like new", price: "KSh 2,500" },
    { name: "Introduction to Algorithms (CLRS)", seller: "Faraj H.", category: "Textbooks", condition: "Used " + MIDDLE_DOT + " good", price: "KSh 2,200" },
    { name: "Calculus: Early Transcendentals", seller: "Nadia S.", category: "Textbooks", condition: "Used " + MIDDLE_DOT + " good", price: "KSh 1,800" },
    { name: "Mini Dorm Fridge (45L)", seller: "Tom W.", category: "Dorm & living", condition: "Used " + MIDDLE_DOT + " fair", price: "KSh 6,500" },
    { name: "LED Desk Lamp with USB Port", seller: "Eva N.", category: "Dorm & living", condition: "New", price: "KSh 900" },
    { name: "Mountain Bike (Size M)", seller: "Peter O.", category: "Transport", condition: "Used " + MIDDLE_DOT + " good", price: "KSh 9,500" },
    { name: "Campus Hoodie (Navy, L)", seller: "Amina R.", category: "Clothing", condition: "New", price: "KSh 1,500" }
  ];

  let current = 0;

  function describeMeta(listing) {
    return [listing.category, listing.condition, listing.price, listing.seller].join(" " + MIDDLE_DOT + " ");
  }

  const dotButtons = listings.map(function (listing, index) {
    const item = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.className = "gallery__dot";
    button.dataset.galleryDot = String(index);
    button.setAttribute("aria-label", "Show listing " + (index + 1) + " of " + listings.length + ": " + listing.name);
    button.addEventListener("click", function () {
      showSlide(index);
    });

    item.appendChild(button);
    dots.appendChild(item);
    return button;
  });

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    for (const [position, slide] of slides.entries()) {
      slide.classList.toggle("is-active", position === current);
      slide.setAttribute("aria-hidden", position === current ? "false" : "true");
    }

    for (const [position, dot] of dotButtons.entries()) {
      dot.setAttribute("aria-current", position === current ? "true" : "false");
    }

    kicker.textContent = "Listing " + (current + 1) + " of " + slides.length;

    const listing = listings[current];
    captionTitle.textContent = listing.name;
    captionMeta.textContent = describeMeta(listing);

    caption.classList.remove("is-refreshing");
    void caption.offsetWidth;
    caption.classList.add("is-refreshing");
  }

  function showNext() {
    showSlide(current + 1);
  }

  function showPrevious() {
    showSlide(current - 1);
  }

  function handleKeydown(event) {
    if (event.key === "ArrowRight") {
      showNext();
    } else if (event.key === "ArrowLeft") {
      showPrevious();
    } else {
      return;
    }
    event.preventDefault();
  }

  nextButton.addEventListener("click", showNext);
  previousButton.addEventListener("click", showPrevious);
  gallery.addEventListener("keydown", handleKeydown);

  showSlide(0);
}
