// On small devices, the virtual keyboard covers the list with suggestions. So, if the suggestions are shown, move up the input field to make room.
window.addEventListener('awesomplete-open', (el) => { if (window.innerWidth < 577 && window.innerHeight < 800) el.target.scrollIntoView(); });
