function setDarkMode(mode) {
  document.querySelector('link').disabled = mode;
  document.querySelectorAll('link')[1].disabled = !mode;
}

function initDarkMode() {
  document.querySelector('#dark-light').onclick = function() { 
    setDarkMode(this.checked);
    document.body.classList.toggle("dark");
  }

  const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (darkMode) {
    const toggle = document.querySelector('#dark-light');
    toggle.checked = true;
    setDarkMode(true);
    document.body.classList.add("dark");
  }
}

document.addEventListener("DOMContentLoaded", initDarkMode);
