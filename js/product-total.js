const priceElement = document.getElementById("product-price");
const quantitySelect = document.getElementById("quantity");
const lineTotalElement = document.getElementById("line-total");
const quantityError = document.getElementById("quantity-error");

const price = Number(priceElement.dataset.price);

function calculateTotal(price, quantity) {
  return price * quantity;
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

function updateLineTotal() {
  const error = validateQuantity(quantitySelect.value);
  if (error) {
    quantitySelect.setAttribute("aria-invalid", "true");
    if (quantityError) quantityError.textContent = error;
    lineTotalElement.textContent = "—";
    return;
  }

  quantitySelect.removeAttribute("aria-invalid");
  if (quantityError) quantityError.textContent = "";

  const quantity = Number(quantitySelect.value);
  const lineTotal = calculateTotal(price, quantity);
  lineTotalElement.textContent = formatMoney(lineTotal);
}

quantitySelect.addEventListener("change", updateLineTotal);

updateLineTotal();
