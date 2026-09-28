const form = document.getElementById("register-form");
const errorSummary = document.getElementById("form-errors");
const errorList = document.getElementById("form-error-list");
const successNotice = document.getElementById("form-success");
const passwordToggle = document.getElementById("password-toggle");
const detailsToggle = document.getElementById("details-toggle");
const detailsPanel = document.getElementById("details-panel");
const nameInput = document.getElementById("full-name");
const nameCount = document.getElementById("name-count");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const termsCheckbox = document.getElementById("terms");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");

const roleInputs = [
  document.getElementById("role-buy"),
  document.getElementById("role-sell"),
  document.getElementById("role-both")
];

const NAME_MAX = 60;
const PASSWORD_MIN = 8;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^0[17][0-9]{8}$/;

function isBlank(value) {
  return value.trim() === "";
}

function hasLetter(value) {
  return /[a-z]/.test(value) || /[A-Z]/.test(value);
}

function hasDigit(value) {
  return /[0-9]/.test(value);
}

function wordCount(value) {
  return value.trim().split(/\s+/).length;
}

function checkName() {
  const value = nameInput.value;

  if (isBlank(value)) {
    return "Enter your full name.";
  }

  if (wordCount(value) < 2) {
    return "Enter both your first and last name.";
  }

  return "";
}

function checkEmail() {
  const value = emailInput.value;

  if (isBlank(value)) {
    return "Enter an email address.";
  }

  if (!EMAIL_PATTERN.test(value.trim())) {
    return "That does not look like an email address yet.";
  }

  return "";
}

function checkPhone() {
  const value = phoneInput.value.replace(/[\s-]/g, "");

  if (isBlank(value)) {
    return "Enter a phone number.";
  }

  if (!PHONE_PATTERN.test(value)) {
    return "Use a Kenyan mobile number, like 0712345678.";
  }

  return "";
}

function checkPassword() {
  const value = passwordInput.value;

  if (isBlank(value)) {
    return "Choose a password.";
  }

  if (value.length < PASSWORD_MIN) {
    return "Use at least " + PASSWORD_MIN + " characters.";
  }

  if (!hasLetter(value) || !hasDigit(value)) {
    return "Mix in at least one letter and one number.";
  }

  return "";
}

function checkConfirm() {
  const value = confirmInput.value;

  if (isBlank(value)) {
    return "Type the password again.";
  }

  if (value !== passwordInput.value) {
    return "The two passwords do not match.";
  }

  return "";
}

function checkRole() {
  for (const radio of roleInputs) {
    if (radio.checked) {
      return "";
    }
  }

  return "Choose whether you want to buy, sell, or both.";
}

function checkTerms() {
  if (termsCheckbox.checked) {
    return "";
  }

  return "You need to accept the pickup-only rule.";
}

const fieldList = [
  { key: "name", controlId: "full-name", control: nameInput, errorId: "name-error", check: checkName, live: "input" },
  { key: "email", controlId: "email", control: emailInput, errorId: "email-error", check: checkEmail, live: "input" },
  { key: "phone", controlId: "phone", control: phoneInput, errorId: "phone-error", check: checkPhone, live: "input" },
  { key: "password", controlId: "password", control: passwordInput, errorId: "password-error", check: checkPassword, live: "input" },
  { key: "confirm", controlId: "confirm-password", control: confirmInput, errorId: "confirm-error", check: checkConfirm, live: "input" },
  { key: "role", controlId: "role-buy", control: roleInputs[0], errorId: "role-error", check: checkRole, live: "change" },
  { key: "terms", controlId: "terms", control: termsCheckbox, errorId: "terms-error", check: checkTerms, live: "change" }
];

function getWrapper(control) {
  return control.closest("[data-field]");
}

function showFieldError(field, message) {
  const errorElement = document.getElementById(field.errorId);
  errorElement.textContent = message;
  errorElement.hidden = false;
  field.control.setAttribute("aria-invalid", "true");

  const wrapper = getWrapper(field.control);

  if (wrapper) {
    wrapper.dataset.invalid = "true";
  }
}

function clearFieldError(field) {
  document.getElementById(field.errorId).hidden = true;
  field.control.removeAttribute("aria-invalid");

  const wrapper = getWrapper(field.control);

  if (wrapper) {
    delete wrapper.dataset.invalid;
  }
}

function isFieldInvalid(field) {
  return field.control.getAttribute("aria-invalid") === "true";
}

function showSummary(problems) {
  errorList.textContent = "";

  for (const problem of problems) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("href", "#" + problem.field.controlId);
    link.textContent = problem.message;
    item.appendChild(link);
    errorList.appendChild(item);
  }

  errorSummary.hidden = problems.length === 0;
}

function handleBlur(event) {
  const field = findField(event.currentTarget);

  if (!field) {
    return;
  }

  const message = field.check();

  if (message) {
    showFieldError(field, message);
  } else {
    clearFieldError(field);
  }
}

function handleLiveEdit(event) {
  const field = findField(event.currentTarget);

  if (!field || !isFieldInvalid(field)) {
    return;
  }

  const message = field.check();

  if (message) {
    showFieldError(field, message);
  } else {
    clearFieldError(field);
  }
}

function findField(control) {
  for (const field of fieldList) {
    if (field.control === control) {
      return field;
    }
  }

  return null;
}

function handleSubmit(event) {
  event.preventDefault();
  const problems = [];

  for (const field of fieldList) {
    const message = field.check();

    if (message) {
      showFieldError(field, message);
      problems.push({ field: field, message: message });
    } else {
      clearFieldError(field);
    }
  }

  showSummary(problems);
  successNotice.hidden = problems.length !== 0;

  if (problems.length > 0) {
    errorSummary.focus();
  }
}

function handleReset() {
  for (const field of fieldList) {
    clearFieldError(field);
  }

  errorSummary.hidden = true;
  successNotice.hidden = true;
  errorList.textContent = "";
  nameCount.textContent = "0 of " + NAME_MAX + " characters";
  strengthBar.dataset.score = "0";
  strengthText.textContent = "Not typed yet";
  passwordInput.type = "password";
  passwordToggle.textContent = "Show";
  passwordToggle.setAttribute("aria-pressed", "false");
}

function updateNameCount() {
  nameCount.textContent = nameInput.value.length + " of " + NAME_MAX + " characters";
}

function scorePassword(value) {
  let score = 0;

  if (value.length >= PASSWORD_MIN) {
    score = score + 1;
  }

  if (value.length >= 12) {
    score = score + 1;
  }

  if (hasLetter(value) && hasDigit(value)) {
    score = score + 1;
  }

  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) {
    score = score + 1;
  }

  if (/[^a-zA-Z0-9]/.test(value)) {
    score = score + 1;
  }

  return score;
}

function describeScore(score, value) {
  if (value === "") {
    return "Not typed yet";
  }

  if (score <= 1) {
    return "Too short";
  }

  if (score === 2) {
    return "Weak";
  }

  if (score === 3) {
    return "Fair";
  }

  if (score === 4) {
    return "Strong";
  }

  return "Very strong";
}

function updateStrength() {
  const value = passwordInput.value;
  const score = scorePassword(value);
  strengthBar.dataset.score = String(score);
  strengthText.textContent = describeScore(score, value);
}

function togglePasswordVisibility() {
  const willShow = passwordInput.type === "password";
  passwordInput.type = willShow ? "text" : "password";
  passwordToggle.textContent = willShow ? "Hide" : "Show";
  passwordToggle.setAttribute("aria-pressed", willShow ? "true" : "false");
}

function toggleDetails() {
  const willShow = detailsPanel.hidden;
  detailsPanel.hidden = !willShow;
  detailsToggle.setAttribute("aria-expanded", willShow ? "true" : "false");
}

for (const field of fieldList) {
  field.control.addEventListener("blur", handleBlur);
  field.control.addEventListener(field.live, handleLiveEdit);
}

for (const radio of roleInputs) {
  radio.addEventListener("change", handleLiveEdit);
}

nameInput.addEventListener("input", updateNameCount);
passwordInput.addEventListener("input", updateStrength);
passwordToggle.addEventListener("click", togglePasswordVisibility);
detailsToggle.addEventListener("click", toggleDetails);
form.addEventListener("submit", handleSubmit);
form.addEventListener("reset", handleReset);

updateNameCount();
updateStrength();
