const cartItems = document.querySelectorAll("[data-item]");
const quantitySelects = document.querySelectorAll("[data-quantity]");
const removeButtons = document.querySelectorAll("[data-remove]");
const updateButton = document.getElementById("cart-update");
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

function validateQuantity(value) {
  const qty = Number(value);
  if (!Number.isInteger(qty) || qty < 1) {
    return "Quantity must be a positive whole number";
  }
  if (qty > 9) {
    return "Maximum quantity is 9";
  }
  return null;
}

function updateTotal() {
  let itemCount = 0;
  let subtotal = 0;
  let allValid = true;

  for (const item of cartItems) {
    if (isRemoved(item)) {
      continue;
    }

    const quantitySelect = item.querySelector("select");
    const quantity = Number(quantitySelect.value);
    const error = validateQuantity(quantitySelect.value);

    if (error) {
      quantitySelect.setAttribute("aria-invalid", "true");
      const errorEl = item.querySelector("[data-quantity-error]");
      if (errorEl) errorEl.textContent = error;
      allValid = false;
      continue;
    }

    quantitySelect.removeAttribute("aria-invalid");
    const errorEl = item.querySelector("[data-quantity-error]");
    if (errorEl) errorEl.textContent = "";

    const lineTotal = calculateTotal(Number(item.dataset.price), quantity);
    const lineTotalElement = item.querySelector("[data-line-total]");

    itemCount = itemCount + quantity;
    subtotal = subtotal + lineTotal;
    lineTotalElement.textContent = formatMoney(lineTotal);
  }

  if (allValid) {
    summaryCount.textContent = itemCount;
    summarySubtotal.textContent = formatMoney(subtotal);
    summaryTotal.textContent = formatMoney(subtotal);
  } else {
    summaryCount.textContent = "—";
    summarySubtotal.textContent = "—";
    summaryTotal.textContent = "—";
  }
  cartEmpty.hidden = itemCount !== 0;
}

function removeItem(event) {
  const item = event.currentTarget.closest("[data-item]");
  item.dataset.removed = "true";
  item.style.display = "none";
  updateTotal();
}

for (const select of quantitySelects) {
  select.addEventListener("change", updateTotal);
}

for (const button of removeButtons) {
  button.addEventListener("click", removeItem);
}

updateButton.addEventListener("click", updateTotal);

updateTotal();
