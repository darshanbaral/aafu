let toggleTheme = function() {
  if (isDark) {
    for (let key in darkTheme) {
      let elems = document.querySelectorAll(`.${darkTheme[key]}`);
      elems.forEach(elem => elem.classList.add(lightTheme[key]));
      elems.forEach(elem => elem.classList.remove(darkTheme[key]));
      themeColor.content = "#fff"
    }
    isDark = !isDark;
  } else {
    for (let key in darkTheme) {
      let elems = document.querySelectorAll(`.${lightTheme[key]}`);
      elems.forEach(elem => elem.classList.add(darkTheme[key]));
      elems.forEach(elem => elem.classList.remove(lightTheme[key]));
      themeColor.content = "#2c2b2b"
    }
    isDark = !isDark;
  }
};
