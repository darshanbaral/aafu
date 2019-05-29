var lightTheme = {
  mainBackground: "bg-white",
  skillBackground: "bg-primary",
  mainText: "text-dark",
  linkText: "text-primary",
  toggleIcon: "fa-toggle-off",
  shadow: "shadowsDark"
};

var darkTheme = {
  mainBackground: "bg-black",
  skillBackground: "bg-warning",
  mainText: "text-white",
  linkText: "text-warning",
  toggleIcon: "fa-toggle-on",
  shadow: "shadowsLight"
};

var isDark = false;

var themeColor = document.querySelector("meta[name=theme-color]");
