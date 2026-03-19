
      const themeToggleButton = document.getElementById('theme-toggle-button');
      const themeToggleIcon = document.getElementById('theme-toggle-icon');
      const themeToggleLabel = document.getElementById('theme-toggle-label');
      const darkModeStylesheet = document.getElementById('dark-mode-stylesheet');

      function setTheme(theme) {
        if (theme === 'dark') {
          darkModeStylesheet.disabled = false;
          themeToggleIcon.className = 'fa fa-moon-o';
          themeToggleLabel.textContent = 'Dark mode';
          themeToggleButton.style.backgroundColor = '#333';
          themeToggleButton.style.color = '#f0f0f0';
          themeToggleButton.setAttribute('aria-label', 'Switch to light mode');
          localStorage.setItem('theme', 'dark');
        } else {
          darkModeStylesheet.disabled = true;
          themeToggleIcon.className = 'fa fa-sun-o';
          themeToggleLabel.textContent = 'Light mode';
          themeToggleButton.style.backgroundColor = '#f0f0f0';
          themeToggleButton.style.color = '#333';
          themeToggleButton.setAttribute('aria-label', 'Switch to dark mode');
          localStorage.setItem('theme', 'light');
        }
      }

      themeToggleButton.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || (darkModeStylesheet.disabled ? 'light' : 'dark');
        if (currentTheme === 'dark') {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      });

      document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
        } else {
          setTheme('dark');
        }
      });