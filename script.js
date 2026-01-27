const form = document.getElementById("registrationForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const ageInput = document.getElementById("age");
const termsInput = document.getElementById("terms");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const mobileError = document.getElementById("mobileError");
const ageError = document.getElementById("ageError");
const genderError = document.getElementById("genderError");
const termsError = document.getElementById("termsError");
const entriesList = document.getElementById("entriesList");
const entriesEmpty = document.getElementById("entriesEmpty");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^\d{10}$/;
const agePattern = /^\d+$/;

const entries = [];

function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  mobileError.textContent = "";
  ageError.textContent = "";
  genderError.textContent = "";
  termsError.textContent = "";
}

function renderEntries() {
  entriesList.innerHTML = "";

  if (entries.length === 0) {
    entriesEmpty.style.display = "block";
    return;
  }

  entriesEmpty.style.display = "none";

  entries.forEach((entry, index) => {
    const item = document.createElement("li");
    const serial = entries.length - index;
    item.textContent = `${serial}. ${entry.name} - ${entry.mobile}`;
    entriesList.appendChild(item);
  });
}

form.addEventListener("submit", (event) => {
  clearErrors();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const mobileValue = mobileInput.value.trim();
  const ageValue = ageInput.value.trim();
  const genderValue = document.querySelector("input[name='gender']:checked");

  let isValid = true;

  if (nameValue.length < 3) {
    nameError.textContent = "Name must be at least 3 characters.";
    isValid = false;
  }

  if (!emailPattern.test(emailValue)) {
    emailError.textContent = "Enter a valid email address.";
    isValid = false;
  }

  if (!mobilePattern.test(mobileValue)) {
    mobileError.textContent = "Mobile number must be 10 digits.";
    isValid = false;
  }

  if (!agePattern.test(ageValue) || Number(ageValue) < 1 || Number(ageValue) > 120) {
    ageError.textContent = "Age must be a valid number between 1 and 120.";
    isValid = false;
  }

  if (!genderValue) {
    genderError.textContent = "Please select a gender.";
    isValid = false;
  }

  if (!termsInput.checked) {
    termsError.textContent = "You must agree to the Terms & Conditions.";
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
    alert("Please fix the errors in the form.");
    return;
  }

  event.preventDefault();
  entries.unshift({ name: nameValue, mobile: mobileValue });
  renderEntries();
  form.reset();
  alert("Form submitted successfully.");
});
