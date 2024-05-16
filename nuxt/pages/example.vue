<script setup>
import CartModal from "../src/components/cart/CartModal.vue";
import { $viewCart } from "../src/components/cart/scripts/cart";
import { useStore } from "@nanostores/vue";

// Styles
import "../src/assets/css/style.css";

//Components
import { $items } from "../src/components/cart/scripts/cart.js";
import { apiHelperPOST } from "../src/components/helpers/api.js";
const viewCart = useStore($viewCart);
</script>

<script>
import {
  showMenu,
  hideMenu,
  removeMenuMobile,
  setupAccordionSkills,
  setupQualificationTabs,
  setupServicesModal,
  setupPortfolioSwiper,
  setupTestimonialSwiper,
  setupScrollSectionsActiveLink,
  setupScrollHeader,
  setupShowScrollTop,
  setupDarkLightTheme,
} from "../src/assets/js/darkMode.js";

export default {
  mounted() {
    showMenu();
    hideMenu();
    removeMenuMobile();
    setupAccordionSkills();
    setupQualificationTabs();
    setupServicesModal();
    setupPortfolioSwiper();
    setupTestimonialSwiper();
    setupScrollSectionsActiveLink();
    setupScrollHeader();
    setupShowScrollTop();
    setupDarkLightTheme();
  },
};

// Cart Setup blyat nahui
apiHelperPOST("/cart/get", {
  user_id: "663751edeb50fc9f32cfd751",
}).then((res) => {
  const { cart } = res;
  console.info("Cart:", cart);
  $items.set(cart);
});
</script>

<template>
  <header class="header" id="header">
    <nav class="nav container">
      <a href="#" class="nav__logo">Forza Napoli Inc</a>

      <div class="nav__menu" id="nav-menu">
        <ul class="nav__list grid">
          <li class="nav__item">
            <a href="#home" class="nav__link active-link">
              <i class="uil uil-estate nav__icon"></i> Home
            </a>
          </li>
          <li class="nav__item">
            <a href="#about" class="nav__link">
              <i class="uil uil-user nav__icon"></i> About us
            </a>
          </li>
          <li class="nav__item">
            <a href="#skills" class="nav__link">
              <i class="uil uil-file-alt nav__icon"></i> Products
            </a>
          </li>
          <li class="nav__item">
            <a href="#qualification" class="nav__link">
              <i class="uil uil-graduation-cap nav__icon"></i> Calificaciones
            </a>
          </li>
          <li class="nav__item">
            <a class="nav__link cart-icon" @click="$viewCart.set(true)">
              <i class="uil uil-shopping-cart nav__icon" id="cart"></i
              ><i class="uil uil-shopping-cart change-theme"> Cart </i>
            </a>
          </li>
          <cart-modal v-if="viewCart" />
        </ul>
        <i class="uil uil-times nav__close" id="nav-close"></i>
      </div>

      <div class="nav__btns">
        <!-- Add cart -->

        <i class="uil uil-moon change-theme" id="theme-button"></i>

        <div class="nav__toggle" id="nav-toggle">
          <i class="uil uil-apps"></i>
        </div>
      </div>
    </nav>
  </header>

  <section class="home section" id="home">
    <div class="home__container container grid">
      <div class="home__content grid">
        <div class="home__social">
          <a
            href="https://linkedin.com/in/aldo-ricardo-munoz-arellano"
            target="_blank"
            class="home__social-icon"
          >
            <i class="uil uil-linkedin"></i>
          </a>
          <a
            href="https://github.com/AldoRed"
            target="_blank"
            class="home__social-icon"
          >
            <i class="uil uil-github-alt"></i>
          </a>
          <a
            href="https://www.instagram.com/aldo__munoz_/"
            target="_blank"
            class="home__social-icon"
          >
            <i class="uil uil-instagram"></i>
          </a>
        </div>

        <div class="home__img"></div>

        <div class="home__data">
          <h1 class="home__title">Forza Napoli Inc</h1>
          <h3 class="home__subtitle">Alcohol delivery</h3>
          <p class="home__description">
            We are a company dedicated to the delivery of alcoholic beverages,
            we have a wide variety of products and we deliver to your home.
          </p>
          <a href="#contact" class="button button--flex">
            Contact us <i class="uil uil-message button__icon"></i>
          </a>
        </div>
      </div>
      <div class="home__scroll">
        <a href="#about" class="home__scroll-button button--flex">
          <i class="uil uil-mouse-alt home__scroll-mouse"></i>
          <span class="home__scroll-name">Swipe Down</span>
          <i class="uil uil-arrow-down home__scroll-arrow"></i>
        </a>
      </div>
    </div>
  </section>

  <section class="about section" id="about">
    <h2 class="section__title">Acerca de mi</h2>
    <span class="section__subtitle">Mi introducción</span>

    <div class="about__container container grid">
      <div class="about__data">
        <p class="about__description">
          Además de la programación, me considero una persona tranquila y
          receptiva, siempre dispuesta a escuchar y aprender. Disfruto de la
          compañía de otros y me considero bastante sociable. En mis momentos
          libres, me gusta salir con amigos y compartir momentos significativos.
        </p>
        <div class="about__info">
          <div>
            <span class="about__info-title">10</span>
            <span class="about__info-name">Años de experiencia</span>
          </div>

          <div>
            <span class="about__info-title">09+</span>
            <span class="about__info-name">Proyectos completados</span>
          </div>

          <div>
            <span class="about__info-title">06</span>
            <span class="about__info-name">Empresas trabajadas</span>
          </div>
        </div>

        <div class="about__buttons">
          <a
            download=""
            href="assets/pdf/CV_Aldo_Munoz.pdf"
            class="button button--flex"
          >
            Descargar CV <i class="uil uil-download-alt button__icon"></i>
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="skills section" id="skills">
    <h2 class="section__title">Skills</h2>
    <span class="section__subtitle">Mis habilidades técnicas</span>

    <div class="skills__container container grid">
      <!-- Skills Desarrollo web -->
      <div class="skills__content skills__open">
        <div class="skills__header">
          <i class="uil uil-brackets-curly skills__icon"></i>

          <div>
            <h1 class="skills__titles">Desarrollo Web</h1>
            <span class="skills__subtitle">Más de 10 años</span>
          </div>

          <i class="uil uil-angle-down skills__arrow"></i>
        </div>

        <div class="skills__list grid">
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">HTML</h3>
              <span class="skills__number">90%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__html"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">PHP</h3>
              <span class="skills__number">90%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__php"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">MySQL</h3>
              <span class="skills__number">80%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__mysql"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">JavaScript</h3>
              <span class="skills__number">70%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__js"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">CSS</h3>
              <span class="skills__number">70%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__css"></span>
            </div>
          </div>

          <!-- Laravel -->
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Laravel</h3>
              <span class="skills__number">70%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__laravel"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">MongoDB</h3>
              <span class="skills__number">60%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__mongodb"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Node.js</h3>
              <span class="skills__number">50%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__node"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Express</h3>
              <span class="skills__number">40%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__express"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">React</h3>
              <span class="skills__number">40%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__react"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Backend -->
      <div class="skills__content skills__close">
        <div class="skills__header">
          <i class="uil uil-server-network skills__icon"></i>

          <div>
            <h1 class="skills__titles">Backend</h1>
            <span class="skills__subtitle">Más de 7 años</span>
          </div>

          <i class="uil uil-angle-down skills__arrow"></i>
        </div>

        <div class="skills__list grid">
          <!-- PHP -->
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">PHP</h3>
              <span class="skills__number">90%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__php"></span>
            </div>
          </div>

          <!-- Laravel -->
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Laravel</h3>
              <span class="skills__number">70%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__laravel"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Node.js</h3>
              <span class="skills__number">50%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__node"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Express</h3>
              <span class="skills__number">40%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__express"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Otros -->
      <div class="skills__content skills__close">
        <div class="skills__header">
          <i class="uil uil-web-grid skills__icon"></i>

          <div>
            <h1 class="skills__titles">Otros</h1>
            <span class="skills__subtitle">Más de 5 años</span>
          </div>

          <i class="uil uil-angle-down skills__arrow"></i>
        </div>

        <div class="skills__list grid">
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Git</h3>
              <span class="skills__number">90%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__git"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">GitHub</h3>
              <span class="skills__number">80%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__github"></span>
            </div>
          </div>

          <!-- Estructura de Datos -->
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Estructura de Datos</h3>
              <span class="skills__number">70%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__estructura"></span>
            </div>
          </div>

          <!-- Lenguajes y paradigmas de la programación -->
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">
                Lenguajes y paradigmas de la programación
              </h3>
              <span class="skills__number">60%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__lenguajes"></span>
            </div>
          </div>

          <!-- Seguridad en TI -->
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Seguridad en TI</h3>
              <span class="skills__number">60%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__seguridad"></span>
            </div>
          </div>

          <!-- Inteligencia Artificial -->
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Inteligencia Artificial</h3>
              <span class="skills__number">60%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__ia"></span>
            </div>
          </div>

          <!-- Arquitectura de Sistemas -->
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Arquitectura de Sistemas</h3>
              <span class="skills__number">60%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__arquitectura"></span>
            </div>
          </div>

          <!-- Fundamentos de Redes de Computadores -->
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Fundamentos de Redes de Computadores</h3>
              <span class="skills__number">50%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__redes"></span>
            </div>
          </div>

          <!-- Arquitectura cloud -->
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Arquitectura cloud</h3>
              <span class="skills__number">50%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__cloud"></span>
            </div>
          </div>

          <!-- Sistemas Operativos -->
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Sistemas Operativos</h3>
              <span class="skills__number">50%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__so"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Linux</h3>
              <span class="skills__number">50%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__linux"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Diseño -->
      <div class="skills__content skills__close">
        <div class="skills__header">
          <i class="uil uil-swatchbook skills__icon"></i>

          <div>
            <h1 class="skills__titles">Diseño</h1>
            <span class="skills__subtitle">Más de 3 años</span>
          </div>

          <i class="uil uil-angle-down skills__arrow"></i>
        </div>

        <div class="skills__list grid">
          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Figma</h3>
              <span class="skills__number">40%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__figma"></span>
            </div>
          </div>

          <div class="skills__data">
            <div class="skills__titles">
              <h3 class="skills__name">Photoshop</h3>
              <span class="skills__number">30%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage skills__photoshop"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="qualification section" id="qualification">
    <h2 class="section__title">Calificaciones</h2>
    <span class="section__subtitle">Mi experiencia laboral y educación</span>

    <div class="qualification__container container">
      <div class="qualification__tabs">
        <div
          class="qualification__button button--flex qualification__active"
          data-target="#education"
        >
          <i class="uil uil-graduation-cap qualification__icon"></i> Educación
        </div>
        <div class="qualification__button button--flex" data-target="#work">
          <i class="uil uil-briefcase-alt qualification__icon"></i> Experiencia
        </div>
      </div>

      <div class="qualification__sections">
        <!-- Education -->
        <div
          class="qualification__content qualification__active"
          data-content
          id="education"
        >
          <!-- Education 1 -->
          <div class="qualification__data">
            <div></div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
            <div>
              <h3 class="qualification__title">
                Associate's degree, Computer Engineering
              </h3>
              <span class="qualification__subtitle"
                >Università di Trento, Italia</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                Feb 2024 - Aug 2024
              </div>
            </div>
          </div>

          <!-- Education 2 -->
          <div class="qualification__data">
            <div>
              <h3 class="qualification__title">
                Ingeniería Civil, Informática
              </h3>
              <span class="qualification__subtitle"
                >Universidad Adolfo Ibañez, Chile</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2020 - 2024
              </div>
            </div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
          </div>

          <!-- Education 3 - EF estudios en el extranjero - Australia 2017 al 2018 -->
          <div class="qualification__data">
            <div></div>
            <div>
              <span class="qualification__rounder"></span>
              <!--<span class="qualification__line"></span>-->
            </div>
            <div>
              <h3 class="qualification__title">
                EF International Language Campuses
              </h3>
              <span class="qualification__subtitle"
                >Education First, Australia</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2016 - 2017
              </div>
            </div>
          </div>
        </div>

        <!-- Work -->
        <div class="qualification__content" data-content id="work">
          <!-- Work 1 -->
          <div class="qualification__data">
            <div>
              <h3 class="qualification__title">AldoRed</h3>
              <span class="qualification__subtitle"
                >Desarrollo de software Fullstack a medida</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2017 - 2024
              </div>
            </div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
          </div>

          <!-- Sistema e-commerce 2 -->
          <div class="qualification__data">
            <div></div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
            <div>
              <h3 class="qualification__title">Sistemas <br />e-commerce</h3>
              <span class="qualification__subtitle"
                >Desarrollo de software Fullstack a medida - PHP</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2017 - 2018
              </div>
            </div>
          </div>

          <!-- Sistema de gestion de inventario -->
          <div class="qualification__data">
            <div>
              <h3 class="qualification__title">
                Sistemas gestión de inventario
              </h3>
              <span class="qualification__subtitle"
                >Desarrollo de software Fullstack a medida - PHP</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2018 - 2019
              </div>
            </div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
          </div>

          <!-- Sistema para carta -->
          <div class="qualification__data">
            <div></div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
            <div>
              <h3 class="qualification__title">Sistemas para restaurantes</h3>
              <span class="qualification__subtitle"
                >Desarrollo de software Fullstack a medida - PHP</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2020 - 2021
              </div>
            </div>
          </div>

          <!-- Sistemas de administración -->
          <div class="qualification__data">
            <div>
              <h3 class="qualification__title">Sistemas de administración</h3>
              <span class="qualification__subtitle"
                >Desarrollo de software Fullstack a medida - PHP</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2021 - 2022
              </div>
            </div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
          </div>

          <!-- Sistemas modulares -->
          <div class="qualification__data">
            <div></div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
            <div>
              <h3 class="qualification__title">Sistemas modulares</h3>
              <span class="qualification__subtitle"
                >Desarrollo de software Fullstack a medida - PHP</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2022 - 2023
              </div>
            </div>
          </div>

          <!-- Sistemas de Gestión de documentos -->
          <div class="qualification__data">
            <div>
              <h3 class="qualification__title">
                Sistemas de Gestión de documentos
              </h3>
              <span class="qualification__subtitle"
                >Desarrollo de software Fullstack a medida - PHP</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2023 - 2024
              </div>
            </div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
          </div>

          <!-- Sistemas de gestión de reuniones -->
          <div class="qualification__data">
            <div></div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
            <div>
              <h3 class="qualification__title">
                Sistemas de gestión de reuniones
              </h3>
              <span class="qualification__subtitle"
                >Desarrollo de software Fullstack a medida - PHP</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2023 - 2024
              </div>
            </div>
          </div>

          <!-- sistema de gestión para consultora de inmobiliarias -->
          <div class="qualification__data">
            <div>
              <h3 class="qualification__title">
                Sistema de gestión para consultora de inmobiliarias
              </h3>
              <span class="qualification__subtitle"
                >Desarrollo de software Fullstack a medida - PHP</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2023 - 2024
              </div>
            </div>
            <div>
              <span class="qualification__rounder"></span>
              <!--<span class="qualification__line"></span>-->
            </div>
          </div>

          <!-- Federación de estudiantes -->
          <div class="qualification__data">
            <div></div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
            <div>
              <h3 class="qualification__title">Federación de estudiantes</h3>
              <span class="qualification__subtitle"
                >Desempeñado en la universidad adolfo ibañez</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2021 - 2023
              </div>
            </div>
          </div>

          <!-- Jefe de departamento salud mental -->
          <div class="qualification__data">
            <div>
              <h3 class="qualification__title">
                Jefe de departamento salud mental
              </h3>
              <span class="qualification__subtitle"
                >Federación de Estudiantes Universidad Adolfo Ibáñez 2023</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2022 - 2023
              </div>
            </div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
          </div>

          <!-- Coordinador departamento Investigación y excelencia académica -->
          <div class="qualification__data">
            <div></div>
            <div>
              <span class="qualification__rounder"></span>
              <!--<span class="qualification__line"></span>-->
            </div>
            <div>
              <h3 class="qualification__title">
                Coordinador departamento Investigación y excelencia académica
              </h3>
              <span class="qualification__subtitle"
                >Federación de Estudiantes Universidad Adolfo Ibáñez 2022</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2021 - 2022
              </div>
            </div>
          </div>

          <!-- Ambassador Leader Región de Valparaiso en Education First -->
          <div class="qualification__data">
            <div>
              <h3 class="qualification__title">
                Ambassador Leader Región de Valparaiso en Education First
              </h3>
              <span class="qualification__subtitle"
                >Seleccionado como ambassador leader de la región de Valparaíso,
                con más de 110 personas que son parte.</span
              >
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2019 - 2021
              </div>
            </div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
          </div>

          <!-- Ambassador en Education first -->
          <div class="qualification__data">
            <div></div>
            <div>
              <span class="qualification__rounder"></span>
              <!--<span class="qualification__line"></span>-->
            </div>
            <div>
              <h3 class="qualification__title">
                Ambassador en Education first
              </h3>
              <span class="qualification__subtitle"></span>
              <div class="qualification__calendar">
                <i class="uil uil-calendar-alt"></i>
                2017 - 2019
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="services section">
    <h2 class="section__title">Servicios</h2>
    <span class="section__subtitle">Lo que puedo hacer por ti</span>

    <div class="services__container container grid">
      <!-- Services 1 -->
      <div class="services__content">
        <div>
          <i class="uil uil-web-grid services__icon"></i>
          <h3 class="services__title">Desarrollo Web</h3>
        </div>
        <span
          class="button button--flex button--small button--link services__button"
        >
          Ver más <i class="uil uil-arrow-right button__icon"></i>
        </span>

        <div class="services__modal">
          <div class="services__modal-content">
            <h4 class="services__modal-title">
              Desarrollo Web
              <i class="uil uil-times services__modal-close"></i>
            </h4>
            <ul class="services__modal-services grid">
              <li class="services__modal-service">
                <i class="uil uil-check-circle services__modal-icon"></i>
                <p>Desarrollo de aplicaciones web</p>
              </li>
              <li class="services__modal-service">
                <i class="uil uil-check-circle services__modal-icon"></i>
                <p>Desarrollo de landing page web</p>
              </li>
              <li class="services__modal-service">
                <i class="uil uil-check-circle services__modal-icon"></i>
                <p>Desarrollo de tiendas en línea</p>
              </li>
              <li class="services__modal-service">
                <i class="uil uil-check-circle services__modal-icon"></i>
                <p>Desarrollo de sistemas web personalizados</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Services 2 -->
      <div class="services__content">
        <div>
          <i class="uil uil-mobile-android services__icon"></i>
          <h3 class="services__title">Desarrollo Blockchain</h3>
        </div>
        <span
          class="button button--flex button--small button--link services__button"
        >
          Ver más <i class="uil uil-arrow-right button__icon"></i>
        </span>

        <div class="services__modal">
          <div class="services__modal-content">
            <h4 class="services__modal-title">
              Desarrollo Blockchain
              <i class="uil uil-times services__modal-close"></i>
            </h4>
            <ul class="services__modal-services grid">
              <li class="services__modal-service">
                <i class="uil uil-check-circle services__modal-icon"></i>
                <p>Desarrollo smart contract</p>
              </li>
              <li class="services__modal-service">
                <i class="uil uil-check-circle services__modal-icon"></i>
                <p>Hardhat framework</p>
              </li>
              <!-- Solidity -->
              <li class="services__modal-service">
                <i class="uil uil-check-circle services__modal-icon"></i>
                <p>Solidity</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Services 3 -->
      <div class="services__content">
        <div>
          <i class="uil uil-pen services__icon"></i>
          <h3 class="services__title">Renovación Web</h3>
        </div>
        <span
          class="button button--flex button--small button--link services__button"
        >
          Ver más <i class="uil uil-arrow-right button__icon"></i>
        </span>

        <div class="services__modal">
          <div class="services__modal-content">
            <h4 class="services__modal-title">
              Renovación web
              <i class="uil uil-times services__modal-close"></i>
            </h4>
            <ul class="services__modal-services grid">
              <li class="services__modal-service">
                <i class="uil uil-check-circle services__modal-icon"></i>
                <p>Actualización de bases de datos</p>
              </li>
              <li class="services__modal-service">
                <i class="uil uil-check-circle services__modal-icon"></i>
                <p>Actualización de codigo base</p>
              </li>
              <!-- Mantención -->
              <li class="services__modal-service">
                <i class="uil uil-check-circle services__modal-icon"></i>
                <p>Mantención del sitio web</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="portfolio section" id="portfolio">
    <h2 class="section__title">Portafolio</h2>
    <span class="section__subtitle">Proyectos recientes</span>

    <div class="portfolio__container container swiper">
      <div class="swiper-wrapper">
        <!-- Portfolio 1 -->
        <div class="portfolio__content grid swiper-slide">
          <img
            src="https://images.unsplash.com/photo-1483792879322-696964487a67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2081&q=80"
            alt=""
            class="portfolio__img"
          />

          <div class="portofolio__data">
            <h3 class="portfolio__title">
              ¿Las mujeres son mejores diferenciando los colores que los
              hombres?
            </h3>
            <p class="portfolio__description">
              El presente trabajo tiene por objetivo desarrollar la problemática
              con respecto a la percepción de los colores por parte de ambos
              géneros, femenino y masculino. Para esto se desarrolló una
              introducción al tema donde se entregan antecedentes e información
              general para la comprensión del resto del trabajo. Seguido a esto
              se detalló el método utilizado para buscar dar una respuesta a la
              problemática planteada, además del material utilizado.
              Posteriormente se tiene la entrega de resultados en los cuales se
              consideran múltiples variables junto con la demostración gráfica
              de esto. Finalmente, se analizaron los resultados con los cuales
              se desarrolló una conclusión a la información obtenida para dar
              resultado a la problemática inicialmente planteada.
            </p>
            <a
              href="https://aldored.com/proyecto"
              class="button button--flex button--small portafolio__button"
            >
              Demo <i class="uil uil-arrow-right button__icon"></i>
            </a>
          </div>
        </div>

        <!-- Portfolio 2 -->
        <div class="portfolio__content grid swiper-slide">
          <div class="portofolio__data">
            <h3 class="portfolio__title">
              Sistema de regadío automático con sensor de humedad
            </h3>
            <p class="portfolio__description">
              El fin de este proyecto fue crear un sistema que ahorrara agua y a
              la vez mantuviera en condiciones optimas plantas regadas, de
              manera totalmente automática.
            </p>
            <a
              href="https://drive.google.com/file/d/1XK6N1DZxlapAsGsrnRTiXB64ThOG2-HE/view"
              class="button button--flex button--small portafolio__button"
            >
              Demo <i class="uil uil-arrow-right button__icon"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="swiper-button-next">
        <i class="uil uil-angle-right-b swiper-portfolio-icon"></i>
      </div>
      <div class="swiper-button-prev">
        <i class="uil uil-angle-left-b swiper-portfolio-icon"></i>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </section>

  <section class="project section">
    <div class="project__bg">
      <div class="project__container container grid">
        <div class="project__data">
          <h2 class="project__title">¿Tienes un proyecto en mente?</h2>
          <p class="project__description">
            Si tienes un proyecto en mente, no dudes en ponerte en contacto
            conmigo. Estaré encantado de ayudarte.
          </p>
          <a
            href="#contact"
            class="button button--flex button--small button--white"
          >
            Contactame <i class="uil uil-message button__icon"></i>
          </a>
          <br />
        </div>
      </div>
    </div>
  </section>

  <section class="contact section" id="contact">
    <h2 class="section__title">Contacto</h2>
    <span class="section__subtitle">Ponte en contacto conmigo</span>

    <div class="contact__container container grid">
      <div>
        <div class="contact__information">
          <i class="uil uil-phone contact__icon"></i>
          <div>
            <h3 class="contact__title">Llamame</h3>
            <span class="contact__subtitle">+56 9 1234 5678</span>
          </div>
        </div>

        <div class="contact__information">
          <i class="uil uil-envelope contact__icon"></i>
          <div>
            <h3 class="contact__title">Correo</h3>
            <span class="contact__subtitle">aldo@aldored.com</span>
          </div>
        </div>

        <div class="contact__information">
          <i class="uil uil-map-marker contact__icon"></i>
          <div>
            <h3 class="contact__title">Ubicación</h3>
            <span class="contact__subtitle">Viña del Mar, Chile</span>
          </div>
        </div>
      </div>

      <form action="" class="contact__form grid">
        <div class="contact__inputs grid">
          <div class="contact__content">
            <label for="" class="contact__label">Nombre</label>
            <input type="text" class="contact__input" />
          </div>
          <div class="contact__content">
            <label for="" class="contact__label">Correo</label>
            <input type="email" class="contact__input" />
          </div>
        </div>
        <div class="contact__content">
          <label for="" class="contact__label">Asunto</label>
          <input type="text" class="contact__input" />
        </div>
        <div class="contact__content">
          <label for="" class="contact__label">Mensaje</label>
          <textarea
            name=""
            id=""
            cols="0"
            rows="7"
            class="contact__input"
          ></textarea>
        </div>
        <div>
          <a href="#" class="button button--flex">
            Enviar mensaje <i class="uil uil-message button__icon"></i>
          </a>
        </div>
      </form>
    </div>
  </section>

  <footer class="footer">
    <div class="footer__bg">
      <div class="footer__container container grid">
        <div>
          <h1 class="footer__title">Aldo Munoz</h1>
          <span class="footer__subtitle"
            >Estudiante de Ingeniería Civil Informática</span
          >
        </div>

        <ul class="footer__links">
          <li>
            <a href="#qualification" class="footer__link">Calificaciones</a>
          </li>
          <li>
            <a href="#portfolio" class="footer__link">Portafolio</a>
          </li>
          <li>
            <a href="#contact" class="footer__link">Contacto</a>
          </li>
        </ul>

        <div class="footer__socials">
          <a
            href="https://www.linkedin.com/in/aldo-munoz-1b3b3b1b3/"
            target="_blank"
            class="footer__social"
          >
            <i class="uil uil-linkedin"></i>
          </a>
          <a href="" target="_blank" class="footer__social">
            <i class="uil uil-github-alt"></i>
          </a>
          <a href="" target="_blank" class="footer__social">
            <i class="uil uil-instagram"></i>
          </a>
        </div>
      </div>
    </div>
    <p class="footer__copy">&#169; Aldo Munoz.</p>
  </footer>

  <a href="#" class="scrollup" id="scroll-up">
    <i class="uil uil-arrow-up scrollup__icon"></i>
  </a>
</template>

<style scoped></style>
