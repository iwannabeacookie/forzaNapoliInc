import Swiper from "swiper";
export function showMenu() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }
}

export function hideMenu() {
  const navClose = document.getElementById("nav-close");
  const navMenu = document.getElementById("nav-menu");
  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }
}
export function removeMenuMobile() {
  const navLink = document.querySelectorAll(".nav__link");
  const linkAction = () => {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
  };
  navLink.forEach((n) => n.addEventListener("click", linkAction));
}
export function setupAccordionSkills() {
  const skillsHeader = document.querySelectorAll(".skills__header");
  const skillsContent = document.getElementsByClassName("skills__content");
  const toggleSkills = function () {
    let itemClass = this.parentNode.className;
    for (let i = 0; i < skillsContent.length; i++) {
      skillsContent[i].className = "skills__content skills__close";
    }
    if (itemClass === "skills__content skills__close") {
      this.parentNode.className = "skills__content skills__open";
    }
  };
  skillsHeader.forEach((el) => {
    el.addEventListener("click", toggleSkills);
  });
}
export function setupQualificationTabs() {
  const tabs = document.querySelectorAll("[data-target]");
  const tabContents = document.querySelectorAll("[data-content]");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.target);
      tabContents.forEach((tabContent) => {
        tabContent.classList.remove("qualification__active");
      });
      target.classList.add("qualification__active");
      tabs.forEach((tab) => {
        tab.classList.remove("qualification__active");
      });
      tab.classList.add("qualification__active");
    });
  });
}
export function setupServicesModal() {
  const modalViews = document.querySelectorAll(".services__modal");
  const modalBtns = document.querySelectorAll(".services__button");
  const modalCloses = document.querySelectorAll(".services__modal-close");
  const modal = function (modalClick) {
    modalViews[modalClick].classList.add("active-modal");
  };
  modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener("click", () => {
      modal(i);
    });
  });
  modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
      modalViews.forEach((modalView) => {
        modalView.classList.remove("active-modal");
      });
    });
  });
}
export function setupPortfolioSwiper() {
  new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    mousewheel: true,
    keyboard: true,
  });
}
export function setupTestimonialSwiper() {
  new Swiper(".testimonial__container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      568: {
        slidesPerView: 2,
      },
    },
  });
}
export function setupScrollSectionsActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollActive = () => {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");
      const activeLink = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]",
      );
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        activeLink.classList.add("active-link");
      } else {
        activeLink.classList.remove("active-link");
      }
    });
  };
  window.addEventListener("scroll", scrollActive);
}
export function setupScrollHeader() {
  const scrollHeader = () => {
    const nav = document.getElementById("header");
    if (window.scrollY >= 80) nav.classList.add("scroll-header");
    else nav.classList.remove("scroll-header");
  };
  window.addEventListener("scroll", scrollHeader);
}
// Muestra el botón de desplazamiento superior
export function setupShowScrollTop() {
  const scrollUp = () => {
    const scrollUp = document.getElementById("scroll-up");
    if (window.scrollY >= 560) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
  };
  window.addEventListener("scroll", scrollUp);
}
// Configura el tema oscuro / claro
export function setupDarkLightTheme() {
  const themeButton = document.getElementById("theme-button");
  const darkTheme = "dark-theme";
  const iconTheme = "uil-sun";
  const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
  const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";
  if (localStorage.getItem("selected-theme")) {
    document.body.classList.add(localStorage.getItem("selected-theme"));
    themeButton.classList.add(localStorage.getItem("selected-icon"));
  }
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
}
