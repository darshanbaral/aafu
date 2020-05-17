const allPanels = Array.from(document.querySelectorAll(".panel"));
const allAccordion = Array.from(document.querySelectorAll(".accordion"));
const expandAccordion = elem => {
  if (!elem.parentElement.classList.contains("active")) {
    allAccordion.forEach(acc => {
      acc.classList.remove("active");
    });
    elem.parentElement.classList.add("active");
    allPanels.forEach(function(elem) {
      elem.style.maxHeight = null;
    });
    let activePanel = elem.parentElement.nextElementSibling;
    if (
      activePanel.id != "skill-panel" &&
      document.querySelector("#skill-panel")
    ) {
      let skillBars = Array.from(document.querySelectorAll("#skill-percent"));
      skillBars.forEach(elem => {
        elem.style.width = "0";
      });
    } //else {
    //console.log("Skill Section Disabled");
    //}
    activePanel.style.maxHeight = activePanel.scrollHeight + "px";
  } // else {
  //  console.log("Already Expanded");
  //}
};
