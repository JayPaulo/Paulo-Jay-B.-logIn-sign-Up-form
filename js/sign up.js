document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signUpForm');
    const nameInput = document.getElementById('signUpName');
    const emailInput = document.getElementById('signUpEmail');
    const passwordInput = document.getElementById('signUpPassword');
    const passwordConfirmInput = document.getElementById('signUpPasswordConfirm');
  
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const passwordConfirmError = document.getElementById('passwordConfirmError');
    const formError = document.getElementById('formError');
    const formSuccess = document.getElementById('formSuccess');
  
    function clearErrors() {
      nameError.textContent = '';
      emailError.textContent = '';
      passwordError.textContent = '';
      passwordConfirmError.textContent = '';
      formError.textContent = '';
      formSuccess.textContent = '';
    }
  
    function validate() {
      let valid = true;
      clearErrors();
  
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required.';
        valid = false;
      }
  
      if (!emailInput.value) {
        emailError.textContent = 'Email is required.';
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
      }
  
      if (!passwordInput.value) {
        passwordError.textContent = 'Password is required.';
        valid = false;
      } else if (passwordInput.value.length< 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        valid = false;
      }
  
      if (!passwordConfirmInput.value) {
        passwordConfirmError.textContent = 'Please confirm your password.';
        valid = false;
      } else if (passwordConfirmInput.value !== passwordInput.value) {
        passwordConfirmError.textContent = 'Passwords do not match.';
        valid = false;
      }
  
      return valid;
    }
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      if (!validate()) {
        return;
      }
  
      const usersJSON = localStorage.getItem('users');
      let users = [];
      if (usersJSON) {
        try {
          users = JSON.parse(usersJSON);
        } catch {
          users = [];
        }
      }
  
      const emailLower = emailInput.value.toLowerCase();

      if (users.find(u => u.email === emailLower)) {
        formError.textContent = 'Email already registered. Please use another or log in.';
        return;
      }
  
      const newUser = {
        name: nameInput.value.trim(),
        email: emailLower,
        password: passwordInput.value
      };
  
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
  
      formSuccess.textContent = 'Registration successful! Redirecting to Log In...';
  
      form.reset();
  
      setTimeout(() => {
        window.location.href = 'logIn.html';
      }, 2000);
    });
  });
  