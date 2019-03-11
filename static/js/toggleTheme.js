let toggleTheme = function() {
  if (isDark) {
    for (let key in darkTheme) {
      let elems = document.querySelectorAll(`.${darkTheme[key]}`);
      console.log(elems);
      elems.forEach(elem => elem.classList.add(lightTheme[key]));
      elems.forEach(elem => elem.classList.remove(darkTheme[key]));
    }
    isDark = !isDark;
  } else {
    for (let key in darkTheme) {
      let elems = document.querySelectorAll(`.${lightTheme[key]}`);
      console.log(elems);
      elems.forEach(elem => elem.classList.add(darkTheme[key]));
      elems.forEach(elem => elem.classList.remove(lightTheme[key]));
    }
    isDark = !isDark;
  }
};
