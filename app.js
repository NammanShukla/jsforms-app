const form = document.getElementById('myForm');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  clearErrors();

  let isValid = true;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (name === '') {
    showError(nameError, 'Name is required.');
    isValid = false;
  } else if (!nameRegex.test(name)) {
    showError(nameError, 'Name can only contain alphabets.');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    showError(emailError, 'Email is required.');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError(emailError, 'Enter a valid email.');
    isValid = false;
  }

  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const notSameAsName = password.toLowerCase() !== name.toLowerCase();

  if (password.length < 6) {
    showError(passwordError, 'Password must be at least 6 characters.');
    isValid = false;
  } else if (!hasSpecialChar) {
    showError(passwordError, 'Password must contain a special character.');
    isValid = false;
  } else if (!hasNumber) {
    showError(passwordError, 'Password must include a number.');
    isValid = false;
  } else if (!notSameAsName) {
    showError(passwordError, 'Password should not be the same as the name.');
    isValid = false;
  }

  if (isValid) {
    alert('Form submitted successfully!');
    form.reset();
    clearErrors();
  }
});

const validateName = debounce(() => {
  const name = nameInput.value.trim();
  const nameRegex = /^[A-Za-z\s]+$/;

  if (name === '') {
    showError(nameError, 'Name is required.');
  } else if (!nameRegex.test(name)) {
    showError(nameError, 'Name can only contain alphabets.');
  } else {
    hideError(nameError);
  }
}, 300);

const validateEmail = debounce(() => {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === '') {
    showError(emailError, 'Email is required.');
  } else if (!emailRegex.test(email)) {
    showError(emailError, 'Enter a valid email.');
  } else {
    hideError(emailError);
  }
}, 300);

const validatePassword = debounce(() => {
  const password = passwordInput.value.trim();
  const name = nameInput.value.trim();
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const notSameAsName = password.toLowerCase() !== name.toLowerCase();

  if (password.length < 6) {
    showError(passwordError, 'Password must be at least 6 characters.');
  } else if (!hasSpecialChar) {
    showError(passwordError, 'Password must contain a special character.');
  } else if (!hasNumber) {
    showError(passwordError, 'Password must include a number.');
  } else if (!notSameAsName) {
    showError(passwordError, 'Password should not be the same as the name.');
  } else {
    hideError(passwordError);
  }
}, 300);


nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

function showError(element, message) {
  element.textContent = message;
  element.style.opacity = '1';
}

function hideError(element) {
  element.textContent = '';
  element.style.opacity = '0';
}

function clearErrors() {
  hideError(nameError);
  hideError(emailError);
  hideError(passwordError);
}
