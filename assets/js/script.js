'use strict';

/* =========================
   ELEMENT TOGGLE UTILITY
========================= */
const elementToggleFunc = (elem) => {
  if (elem) elem.classList.toggle("active");
};

/* =========================
   SIDEBAR (STATIC, NO TOGGLE)
========================= */
const sidebar = document.querySelector("[data-sidebar]");

// always keep sidebar visible
if (sidebar) {
  sidebar.classList.add("active");
}

/* =========================
   PAGE NAVIGATION (CV / CONTACTS)
========================= */
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

function showPage(pageName) {
  pages.forEach(page => {
    page.classList.toggle("active", page.dataset.page === pageName);
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.page === pageName);
  });

  window.scrollTo(0, 0);
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const page = link.dataset.page;
    if (page) showPage(page);
  });
});

/* =========================
   FILTER SYSTEM (SAFE OPTIONAL)
   (ONLY WORKS IF PRESENT IN HTML)
========================= */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

function filterFunc(selectedValue) {
  filterItems.forEach(item => {
    const category = item.dataset.category;

    if (selectedValue === "all" || selectedValue === category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

if (select && selectValue) {
  select.addEventListener("click", () => {
    elementToggleFunc(select);
  });

  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      const value = item.innerText.toLowerCase();
      selectValue.innerText = item.innerText;
      elementToggleFunc(select);
      filterFunc(value);
    });
  });
}

let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const value = this.innerText.toLowerCase();

    if (selectValue) selectValue.innerText = this.innerText;

    filterFunc(value);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

/* =========================
   CONTACT FORM (SAFE OPTIONAL)
========================= */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}
