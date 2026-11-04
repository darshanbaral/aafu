const html = document.documentElement;
let skillBarsInitialized = false;

const fixThemeToggleIcon = (theme) => {
  const toggles = document.querySelectorAll(".theme-toggle");

  toggles.forEach((toggle) => {
    toggle.classList.toggle("fa-sun", theme === "dark");
    toggle.classList.toggle("fa-moon", theme !== "dark");
  });
};

const setTheme = (theme) => {
  const resolvedTheme = theme === "dark" ? "dark" : "light";

  html.classList.remove("light", "dark");
  html.classList.add(resolvedTheme);
  window.localStorage.setItem("theme", resolvedTheme);
  fixThemeToggleIcon(resolvedTheme);
};

const getPreferredTheme = () => {
  const storedTheme = window.localStorage.getItem("theme");

  if (storedTheme) {
    return storedTheme;
  }

  if (html.classList.contains("dark")) {
    return "dark";
  }

  if (html.classList.contains("light")) {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getAccordionItems = () =>
  Array.from(document.querySelectorAll("[data-accordion-item]"));

const getAccordionPanel = (item) => item?.querySelector(".panel");

const getAccordionTrigger = (item) => item?.querySelector("[data-accordion-trigger]");

const syncAccordionItem = (item) => {
  const panel = getAccordionPanel(item);
  const trigger = getAccordionTrigger(item);
  const isActive = item?.classList.contains("active");

  if (!panel || !trigger) {
    return;
  }

  trigger.setAttribute("aria-expanded", isActive ? "true" : "false");

  if (isActive) {
    panel.hidden = false;
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    initializeSkillBars(panel);
  } else {
    panel.style.maxHeight = null;
    panel.hidden = true;
  }
};

const syncActiveAccordionPanel = () => {
  getAccordionItems().forEach(syncAccordionItem);
};

const initializeSkillBars = (root = document) => {
  if (skillBarsInitialized) {
    return;
  }

  const skillBars = root.querySelectorAll("[data-skill-rating]");

  if (!skillBars.length) {
    return;
  }

  skillBars.forEach((bar) => {
    bar.style.width = `${bar.dataset.skillRating}%`;
  });

  skillBarsInitialized = true;
};

const expandAccordion = (element) => {
  const item = element?.matches?.("[data-accordion-item]")
    ? element
    : element?.closest?.("[data-accordion-item]");

  if (!item) {
    return;
  }

  const items = getAccordionItems();
  const isActive = item.classList.contains("active");

  items.forEach((accordionItem) => accordionItem.classList.remove("active"));

  if (!isActive) {
    item.classList.add("active");
  }

  syncActiveAccordionPanel();
};

const initializeSearch = () => {
  const searchElement = document.querySelector("#search");

  if (!searchElement || !window.PagefindUI) {
    return;
  }

  const search = new window.PagefindUI({ element: "#search", showSubResults: false, autofocus: true, pageSize: 10 });
  const query = new URLSearchParams(window.location.search).get("q");

  if (query) {
    search.triggerSearch(query);
  }

  const syncQueryToUrl = () => {
    const input = searchElement.querySelector(".pagefind-ui__search-input");
    const url = new URL(window.location.href);
    const term = input?.value.trim() ?? "";

    if (term) {
      url.searchParams.set("q", term);
    } else {
      url.searchParams.delete("q");
    }

    window.history.replaceState(null, "", url);
  };

  searchElement.addEventListener("input", syncQueryToUrl);
  searchElement.addEventListener("click", (event) => {
    if (event.target.closest(".pagefind-ui__search-clear")) {
      window.setTimeout(() => {
        syncQueryToUrl();
        searchElement.querySelector(".pagefind-ui__search-input")?.focus();
      });
    }
  });
};

const initializePostNavigation = () => {
  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isEditable =
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

    if (isEditable) {
      return;
    }

    if (event.key === "ArrowLeft") {
      document.querySelector("[data-prev-post]")?.click();
    }

    if (event.key === "ArrowRight") {
      document.querySelector("[data-next-post]")?.click();
    }
  });
};

const initializeEventBindings = () => {
  document.querySelectorAll("[data-accordion-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetSelector = trigger.dataset.accordionTarget;
      const target = targetSelector
        ? trigger.closest(targetSelector) ?? document.querySelector(targetSelector)
        : trigger.closest("[data-accordion-item]") ?? trigger;

      expandAccordion(target);
    });
  });

  document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
    toggle.addEventListener("mousedown", (event) => event.preventDefault());
    toggle.addEventListener("click", () => {
      window.toggleTheme();
    });
  });
};

window.toggleTheme = () => {
  setTheme(html.classList.contains("dark") ? "light" : "dark");
};

setTheme(getPreferredTheme());

window.addEventListener("DOMContentLoaded", () => {
  fixThemeToggleIcon(html.classList.contains("dark") ? "dark" : "light");
  initializeEventBindings();
  initializePostNavigation();
  syncActiveAccordionPanel();
  initializeSkillBars();
  initializeSearch();
});

window.addEventListener("resize", syncActiveAccordionPanel);
