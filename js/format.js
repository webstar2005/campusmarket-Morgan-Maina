function formatMoney(amount) {
  const parts = String(amount).split(".");
  const whole = parts[0];
  let grouped = "";
  let count = 0;

  for (let i = whole.length - 1; i >= 0; i--) {
    grouped = whole[i] + grouped;
    count = count + 1;

    if (count % 3 === 0 && i > 0) {
      grouped = "," + grouped;
    }
  }

  if (parts.length > 1) {
    grouped = grouped + "." + parts[1];
  }

  return "KSh " + grouped;
}
