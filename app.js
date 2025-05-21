const form = document.getElementById('myForm');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  clearErrors();

  let isValid = true;

  if (name === '') {
    showError(nameError, 'Name is required.');
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

nameInput.addEventListener('input', () => {
  if (nameInput.value.trim() !== '') {
    hideError(nameError);
  }
});

emailInput.addEventListener('input', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(emailInput.value.trim())) {
    hideError(emailError);
  }
});

passwordInput.addEventListener('input', () => {
  const val = passwordInput.value.trim();
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val);
  const hasNumber = /\d/.test(val);
  const notSameAsName = val.toLowerCase() !== nameInput.value.trim().toLowerCase();

  if (val.length >= 6 && hasSpecialChar && hasNumber && notSameAsName) {
    hideError(passwordError);
  }
});


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
