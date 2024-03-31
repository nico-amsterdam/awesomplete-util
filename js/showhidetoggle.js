  var toggle = function(id) {
    var el = document.querySelector(id), cl = el.classList, c = 'slide-down', add = c, rem = 'slide-up';
    if (cl.contains(c)) {
       add = rem;
       rem = c;
    }
    cl.remove(rem);
    cl.add(add);
    return false;
  };
