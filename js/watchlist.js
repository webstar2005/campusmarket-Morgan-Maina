const watchlistToggle = document.getElementById("watchlist-toggle");

if (watchlistToggle) {
  const watchlistBadge = document.getElementById("watchlist-badge");
  const savedLabel = "Saved to watchlist";
  const unsavedLabel = "Save to watchlist";
  let saved = false;

  function handleClick() {
    saved = !saved;
    watchlistToggle.setAttribute("aria-pressed", String(saved));
    watchlistToggle.textContent = saved ? savedLabel : unsavedLabel;
    watchlistBadge.hidden = !saved;
  }

  watchlistToggle.addEventListener("click", handleClick);
}
