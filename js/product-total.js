const priceElement = document.getElementById("product-price");
const quantitySelect = document.getElementById("quantity");
const lineTotalElement = document.getElementById("line-total");

const price = Number(priceElement.dataset.price);

function calculateTotal(price, quantity) {
  return price * quantity;
}

function updateLineTotal() {
  const quantity = Number(quantitySelect.value);
  const lineTotal = calculateTotal(price, quantity);
  lineTotalElement.textContent = formatMoney(lineTotal);
}
