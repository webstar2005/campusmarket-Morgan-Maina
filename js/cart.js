const cartItems = document.querySelectorAll("[data-item]");
const summaryCount = document.getElementById("summary-count");
const summarySubtotal = document.getElementById("summary-subtotal");
const summaryTotal = document.getElementById("summary-total");
const cartEmpty = document.getElementById("cart-empty");

function calculateTotal(price, quantity) {
  return price * quantity;
}

function isRemoved(item) {
  return item.dataset.removed === "true";
}

function updateTotal() {
  let itemCount = 0;
  let subtotal = 0;

  for (const item of cartItems) {
    if (isRemoved(item)) {
      continue;
    }

    const quantitySelect = item.querySelector("select");
    const quantity = Number(quantitySelect.value);
    const lineTotal = calculateTotal(Number(item.dataset.price), quantity);
    const lineTotalElement = item.querySelector("[data-line-total]");

    itemCount = itemCount + quantity;
    subtotal = subtotal + lineTotal;
    lineTotalElement.textContent = formatMoney(lineTotal);
  }

  summaryCount.textContent = itemCount;
  summarySubtotal.textContent = formatMoney(subtotal);
  summaryTotal.textContent = formatMoney(subtotal);
  cartEmpty.hidden = itemCount !== 0;
}

function removeItem(button) {
  const item = button.closest("[data-item]");
  item.dataset.removed = "true";
  item.style.display = "none";
  updateTotal();
}
