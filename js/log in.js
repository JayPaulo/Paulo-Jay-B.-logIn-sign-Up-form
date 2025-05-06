document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const loginEmailError = document.getElementById('loginEmailError');
    const loginPasswordError = document.getElementById('loginPasswordError');
    const loginError = document.getElementById('loginError');

    function clearErrors() {
      loginEmailError.textContent = '';
      loginPasswordError.textContent = '';
      loginError.textContent = '';
    }

    function validate() {
      let valid = true;
      clearErrors();
  
      if (!loginEmail.value) {
        loginEmailError.textContent = 'Email is required.';
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(loginEmail.value)) {
        loginEmailError.textContent = 'Please enter a valid email address.';
        valid = false;
      }
  
      if (!loginPassword.value) {
        loginPasswordError.textContent = 'Password is required.';
        valid = false;
      }
  
      return valid;
    }

    loginForm.addEventListener('submit', (e) => {
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
  
      const email = loginEmail.value.toLowerCase();
      const password = loginPassword.value;

      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'loggedIn.html';
      } else {
        loginError.textContent = 'Invalid email or password.';
      }
    });
  });
  