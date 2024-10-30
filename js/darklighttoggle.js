document.querySelector('#dark-light').onclick = function() { 
  document.querySelector('link').disabled = this.checked;
  document.querySelectorAll('link')[1].disabled = !this.checked;
  document.body.classList.toggle("dark");
}
