const form = document.getElementById('form-registro');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const passwordStrength = document.getElementById('passwordStrength');
const passwordHelp = document.getElementById('passwordHelp');
const passwordMatch = document.getElementById('passwordMatch');
const toggles = document.querySelectorAll('.toggle-password');

function updateStrength(value) {
  let strength = 0;
  if (value.length >= 8) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;

  if (strength <= 1) {
    passwordStrength.className = 'progress-bar bg-weak';
    passwordStrength.style.width = '25%';
    passwordHelp.textContent = 'Contraseña débil. Usa más caracteres.';
  } else if (strength === 2 || strength === 3) {
    passwordStrength.className = 'progress-bar bg-medium';
    passwordStrength.style.width = '60%';
    passwordHelp.textContent = 'Contraseña media. Usa mayúsculas, números y símbolos.';
  } else {
    passwordStrength.className = 'progress-bar bg-strong';
    passwordStrength.style.width = '100%';
    passwordHelp.textContent = 'Contraseña fuerte.';
  }
}

function checkMatch() {
  if (confirmPassword.value === '') {
    passwordMatch.textContent = '';
  } else if (password.value === confirmPassword.value) {
    passwordMatch.textContent = 'Las contraseñas coinciden.';
    passwordMatch.style.color = 'limegreen';
  } else {
    passwordMatch.textContent = 'Las contraseñas no coinciden.';
    passwordMatch.style.color = 'red';
  }
}

password.addEventListener('input', () => {
  updateStrength(password.value);
  checkMatch();
});

confirmPassword.addEventListener('input', checkMatch);

toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const target = document.querySelector(toggle.dataset.target);
    target.type = target.type === 'password' ? 'text' : 'password';
    toggle.textContent = target.type === 'password' ? '👁️' : '🙈';
  });
});

// Validar al enviar
form.addEventListener('submit', e => {
  let valid = true;

  // Reset estilos
  [nombre, email, password, confirmPassword].forEach(input => {
    input.classList.remove('is-invalid');
  });

  // Validar nombre
  if (nombre.value.trim() === '') {
    nombre.classList.add('is-invalid');
    valid = false;
  }

  // Validar email
  if (email.value.trim() === '') {
    email.classList.add('is-invalid');
    valid = false;
  }

  // Validar contraseña
  if (password.value.length < 8) {
    password.classList.add('is-invalid');
    valid = false;
  }

  // Validar confirmación
  if (confirmPassword.value !== password.value || confirmPassword.value === '') {
    confirmPassword.classList.add('is-invalid');
    valid = false;
  }

  if (!valid) {
    e.preventDefault();
  }
});
