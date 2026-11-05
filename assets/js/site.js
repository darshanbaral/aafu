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

const pendingPanelTransitions = new WeakMap();

const afterPanelTransition = (panel, done) => {
  panel.removeEventListener("transitionend", pendingPanelTransitions.get(panel));

  if (parseFloat(getComputedStyle(panel).transitionDuration) === 0) {
    done();
    return;
  }

  const handler = (event) => {
    if (event.target !== panel || event.propertyName !== "max-height") {
      return;
    }

    panel.removeEventListener("transitionend", handler);
    done();
  };

  pendingPanelTransitions.set(panel, handler);
  panel.addEventListener("transitionend", handler);
};

const syncAccordionItem = (item, animate = false) => {
  const panel = getAccordionPanel(item);
  const trigger = getAccordionTrigger(item);
  const isActive = item?.classList.contains("active");

  if (!panel || !trigger) {
    return;
  }

  trigger.setAttribute("aria-expanded", isActive ? "true" : "false");

  if (!isActive) {
    if (!animate || panel.hidden) {
      panel.style.maxHeight = "";
      panel.hidden = true;
      return;
    }

    panel.style.maxHeight = "0px";
    afterPanelTransition(panel, () => {
      panel.hidden = true;
      panel.style.maxHeight = "";
    });
    return;
  }

  panel.hidden = false;

  if (animate) {
    panel.style.maxHeight = "0px";
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    afterPanelTransition(panel, () => {
      panel.style.maxHeight = "";
    });
  }

  initializeSkillBars(panel);
};

const syncActiveAccordionPanel = (animate = false) => {
  getAccordionItems().forEach((item) => syncAccordionItem(item, animate));
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

  items.forEach((accordionItem) => {
    const panel = getAccordionPanel(accordionItem);

    if (panel && !panel.hidden && !panel.style.maxHeight) {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
  void document.body.offsetHeight;

  items.forEach((accordionItem) => accordionItem.classList.remove("active"));

  if (!isActive) {
    item.classList.add("active");
  }

  syncActiveAccordionPanel(true);
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

  const getThumbLink = (event) =>
    event.target
      .closest(".pagefind-ui__result-thumb")
      ?.closest(".pagefind-ui__result")
      ?.querySelector(".pagefind-ui__result-link");

  searchElement.addEventListener("input", syncQueryToUrl);
  searchElement.addEventListener("auxclick", (event) => {
    const link = getThumbLink(event);

    if (link && event.button === 1) {
      window.open(link.href, "_blank", "noopener");
    }
  });
  searchElement.addEventListener("click", (event) => {
    const link = getThumbLink(event);

    if (link) {
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        window.open(link.href, "_blank", "noopener");
      } else {
        window.location.assign(link.href);
      }
      return;
    }

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
      document.querySelector("[data-pager-prev]")?.click();
    }

    if (event.key === "ArrowRight") {
      document.querySelector("[data-pager-next]")?.click();
    }
  });

  if (!document.querySelector("[data-pager-prev], [data-pager-next]")) {
    return;
  }

  const scrollsHorizontally = (element) => {
    for (let node = element; node && node !== document.body; node = node.parentElement) {
      const overflowX = getComputedStyle(node).overflowX;
      if ((overflowX === "auto" || overflowX === "scroll") && node.scrollWidth > node.clientWidth) {
        return true;
      }
    }
    return false;
  };

  let swipe = null;

  document.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      const edge = 24;
      swipe =
        event.touches.length === 1 &&
        touch.clientX > edge &&
        touch.clientX < window.innerWidth - edge &&
        !event.target.closest("input, textarea, select, [contenteditable]") &&
        !scrollsHorizontally(event.target)
          ? { x: touch.clientX, y: touch.clientY, time: event.timeStamp }
          : null;
    },
    { passive: true },
  );

  document.addEventListener(
    "touchend",
    (event) => {
      if (!swipe || event.touches.length > 0) {
        swipe = null;
        return;
      }

      const touch = event.changedTouches[0];
      const dx = touch.clientX - swipe.x;
      const dy = touch.clientY - swipe.y;
      const elapsed = event.timeStamp - swipe.time;
      swipe = null;

      if (
        Math.abs(dx) < 80 ||
        Math.abs(dx) < Math.abs(dy) * 2 ||
        elapsed > 600 ||
        String(window.getSelection()).length > 0
      ) {
        return;
      }

      document.querySelector(dx < 0 ? "[data-pager-next]" : "[data-pager-prev]")?.click();
    },
    { passive: true },
  );

  document.addEventListener("touchcancel", () => {
    swipe = null;
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
