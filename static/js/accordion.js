let acc = Array.from(document.getElementsByClassName("accordion"));
let allPanels = Array.from(document.getElementsByClassName("panel"));

[...acc].forEach(function(elem) {
  if (elem.classList.contains("active")) {
    let activePanel = elem.nextElementSibling;
    activePanel.style.maxHeight = activePanel.scrollHeight + "px";
  }
});

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    [...acc].forEach(elem => elem.classList.remove("active"));
    [...allPanels].forEach(function(elem) {
      elem.style.maxHeight = null;
    });
    this.classList.add("active");
    let panel = this.nextElementSibling;
    panel.style.maxHeight = panel.scrollHeight + "px";
  });
}
