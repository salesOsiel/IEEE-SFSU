(function () {
  const content = window.siteContent;

  if (!content) {
    return;
  }

  const currentFile = getCurrentFile();

  function getCurrentFile() {
    const path = window.location.pathname;
    const file = path.substring(path.lastIndexOf("/") + 1);
    return file || "index.html";
  }

  function fileFromHref(href) {
    const file = href.split("#")[0];
    return file || "index.html";
  }

  function isActiveHref(href) {
    return fileFromHref(href) === currentFile;
  }

  function hashFromHref(href) {
    const hashIndex = href.indexOf("#");
    return hashIndex === -1 ? "" : href.slice(hashIndex);
  }

  function isActiveDropdownLink(href) {
    if (fileFromHref(href) !== currentFile) {
      return false;
    }

    const hash = hashFromHref(href);
    return hash ? window.location.hash === hash : !window.location.hash;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderHeader() {
    const header = document.querySelector("[data-site-header]");

    if (!header) {
      return;
    }

    const desktopLinks = content.navigation.map(renderDesktopNavItem).join("");
    const mobileLinks = content.navigation.map(renderMobileNavItem).join("");

    header.innerHTML = `
      <div class="sticky top-0 z-50 border-b border-white/10 bg-[#081627]/80 backdrop-blur-xl">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <a href="index.html" class="flex items-center gap-3">
            <span class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 p-1 shadow-glow">
              <img src="ieee-logo.svg" alt="IEEE at SFSU logo" class="h-full w-full rounded-[0.8rem] object-cover" />
            </span>
            <span class="flex flex-col">
              <span class="text-sm font-semibold uppercase tracking-[0.22em] text-white">IEEE at SFSU</span>
              <span class="text-xs text-slate-400">Hardware, robotics, research</span>
            </span>
          </a>

          <nav aria-label="Primary" class="hidden items-center gap-3 lg:flex">
            ${desktopLinks}
          </nav>

          <div class="hidden items-center gap-3 lg:flex">
            <a
              href="membership.html"
              class="rounded-full border border-sfsu-400/25 bg-sfsu-500/15 px-5 py-2.5 text-sm font-semibold text-sfsu-100 transition hover:border-sfsu-300/40 hover:bg-sfsu-500/25"
            >
              Join IEEE
            </a>
          </div>

          <button
            type="button"
            class="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 shadow-sm transition hover:border-ieee-300/40 hover:text-white lg:hidden"
            data-menu-toggle
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label="Open navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        <div id="mobile-menu" class="hidden border-t border-white/10 bg-[#081627]/95 px-6 py-5 lg:hidden" data-mobile-menu>
          <nav aria-label="Mobile" class="grid gap-3">
            ${mobileLinks}
            <a
              href="membership.html"
              class="mt-2 rounded-2xl bg-ieee-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-ieee-600"
            >
              Join IEEE
            </a>
          </nav>
        </div>
      </div>
    `;
  }

  function renderDesktopNavItem(item) {
    if (!item.links) {
      const active = isActiveHref(item.href);
      const classes = active
        ? "rounded-full bg-ieee-500/15 px-4 py-2 text-sm font-semibold text-ieee-100"
        : "rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white";

      return `<a href="${item.href}" class="${classes}" ${active ? 'aria-current="page"' : ""}>${item.label}</a>`;
    }

    const childActive = item.links.some((link) => isActiveHref(link.href));
    const triggerClasses = childActive
      ? "bg-ieee-500/15 text-ieee-100"
      : "text-slate-300 hover:bg-white/5 hover:text-white";
    const primaryHref = item.links[0]?.href || "index.html";

    return `
      <div class="desktop-nav-dropdown relative">
        <a
          href="${primaryHref}"
          class="desktop-nav-trigger flex list-none cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${triggerClasses}"
          aria-haspopup="true"
        >
          <span>${item.label}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="dropdown-icon h-4 w-4 transition" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </a>
        <div class="desktop-dropdown-menu absolute left-0 top-full mt-3 w-60 rounded-3xl border border-white/10 bg-slate-950/95 p-2 shadow-panel">
          ${item.links
            .map((link, index) => {
              const active = isActiveDropdownLink(link.href);
              return `
                <a
                  href="${link.href}"
                  style="--dropdown-index: ${index};"
                  class="desktop-dropdown-item block rounded-2xl px-4 py-3 text-sm transition ${
                    active
                      ? "bg-ieee-500/15 font-semibold text-ieee-100"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }"
                >
                  ${link.label}
                </a>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  function renderMobileNavItem(item) {
    if (!item.links) {
      const active = isActiveHref(item.href);
      return `
        <a
          href="${item.href}"
          class="rounded-2xl px-4 py-3 text-sm transition ${
            active
              ? "bg-ieee-500/15 font-semibold text-ieee-100"
              : "border border-white/10 bg-slate-900/70 text-slate-300 hover:border-ieee-300/40 hover:text-white"
          }"
          ${active ? 'aria-current="page"' : ""}
        >
          ${item.label}
        </a>
      `;
    }

    const childActive = item.links.some((link) => isActiveHref(link.href));

    return `
      <details class="nav-dropdown rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-2">
        <summary class="flex list-none cursor-pointer items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold ${
          childActive ? "text-ieee-100" : "text-slate-200"
        }">
          <span>${item.label}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="dropdown-icon h-4 w-4 transition" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </summary>
        <div class="mt-2 grid gap-1 px-1 pb-1">
          ${item.links
            .map((link) => {
              const active = isActiveDropdownLink(link.href);
              return `
                <a
                  href="${link.href}"
                  class="rounded-2xl px-3 py-3 text-sm transition ${
                    active
                      ? "bg-ieee-500/15 font-semibold text-ieee-100"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }"
                >
                  ${link.label}
                </a>
              `;
            })
            .join("")}
        </div>
      </details>
    `;
  }

  function renderFooter() {
    const footer = document.querySelector("[data-site-footer]");

    if (!footer) {
      return;
    }

    footer.innerHTML = `
      <div class="border-t border-white/10 bg-[#040b15] text-slate-200">
        <div class="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-signal-300">${content.site.shortName}</p>
            <h2 class="mt-3 text-2xl font-bold text-white">${content.site.fullName}</h2>
            <p class="mt-4 max-w-xl text-sm leading-7 text-slate-300">${content.site.tagline}</p>
          </div>

          <div>
            <h3 class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Quick links</h3>
            <div class="mt-4 grid gap-3 text-sm">
              ${content.site.footerLinks
                .map(
                  (link) => `
                    <a href="${link.href}" class="text-slate-300 transition hover:text-white">${link.label}</a>
                  `
                )
                .join("")}
            </div>
          </div>

          <div>
            <h3 class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Contact</h3>
            <address class="mt-4 not-italic text-sm leading-7 text-slate-300">
              <p>${content.site.location}</p>
              <p>${content.site.meetingTime}</p>
              <p><a href="mailto:${content.site.email}" class="transition hover:text-white">${content.site.email}</a></p>
            </address>
            <div class="mt-4 flex flex-wrap gap-3 text-sm">
              ${content.site.social
                .map(
                  (item) => `
                    <a
                      href="${item.href}"
                      class="rounded-full border border-white/10 px-4 py-2 text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                    >
                      ${item.label}
                    </a>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="border-t border-white/10">
          <div class="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p>&copy; ${new Date().getFullYear()} ${content.site.fullName}</p>
            <p>Placeholder info for location, email, and social links can be updated in content.js.</p>
          </div>
        </div>
      </div>
    `;
  }

  function renderAboutCopy() {
    const target = document.getElementById("about-copy");

    if (target) {
      target.textContent = content.aboutCopy;
    }
  }

  function renderQuickFacts() {
    const target = document.getElementById("quick-facts");

    if (!target) {
      return;
    }

    target.innerHTML = content.quickFacts
      .map(
        (item) => `
          <article class="rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-ieee-200">${item.label}</p>
            <h3 class="mt-3 text-xl font-bold text-white">${item.title}</h3>
            <p class="mt-3 text-sm leading-7 text-slate-300">${item.description}</p>
          </article>
        `
      )
      .join("");
  }

  function renderStats() {
    const target = document.getElementById("stats-grid");

    if (!target) {
      return;
    }

    target.innerHTML = content.chapterStats
      .map(
        (item) => `
          <article class="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 shadow-panel">
            <p class="text-4xl font-black text-white">
              <span data-count="${item.value}">0</span>${item.suffix}
            </p>
            <p class="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">${item.label}</p>
          </article>
        `
      )
      .join("");
  }

  function renderPillars() {
    const target = document.getElementById("pillars-grid");

    if (!target) {
      return;
    }

    target.innerHTML = content.pillars
      .map(
        (item, index) => `
          <article class="rounded-[1.9rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel" data-reveal>
            <p class="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
              index % 2 === 0 ? "bg-ieee-500/15 text-ieee-100" : "bg-sfsu-500/15 text-sfsu-100"
            }">
              ${item.title}
            </p>
            <p class="mt-5 text-sm leading-7 text-slate-300">${item.description}</p>
            <div class="mt-5 flex flex-wrap gap-2">
              ${item.details
                .map(
                  (detail) => `
                    <span class="rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-xs font-medium text-slate-300">
                      ${detail}
                    </span>
                  `
                )
                .join("")}
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderFeatureStories() {
    const target = document.getElementById("spotlight-grid");

    if (!target) {
      return;
    }

    target.innerHTML = content.featureStories
      .map(
        (item, index) => `
          <article class="rounded-[1.9rem] border border-white/10 bg-slate-900/75 p-7 shadow-panel" data-reveal>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] ${
              index === 1 ? "text-signal-300" : index === 2 ? "text-sfsu-300" : "text-ieee-200"
            }">
              ${item.label}
            </p>
            <h3 class="mt-3 text-2xl font-bold text-white">${item.title}</h3>
            <p class="mt-4 text-sm leading-7 text-slate-300">${item.description}</p>
            <a href="${item.href}" class="mt-6 inline-flex items-center text-sm font-semibold text-ieee-200 transition hover:text-white">
              Learn more
            </a>
          </article>
        `
      )
      .join("");
  }

  function renderHomeEvents() {
    const target = document.getElementById("home-events-grid");

    if (!target) {
      return;
    }

    target.innerHTML = content.upcomingEvents
      .slice(0, 3)
      .map(
        (event) => `
          <article class="rounded-[1.9rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel" data-reveal>
            <div class="overflow-hidden rounded-[1.5rem] border border-white/10">
              <img src="${event.image}" alt="${event.alt}" class="h-52 w-full object-cover" loading="lazy" />
            </div>
            <div class="mt-6 flex items-center justify-between gap-3">
              <span class="rounded-full bg-ieee-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-ieee-100">${event.category}</span>
              <span class="text-sm font-medium text-slate-400">${event.date}</span>
            </div>
            <h3 class="mt-4 text-xl font-bold text-white">${event.title}</h3>
            <p class="mt-3 text-sm leading-7 text-slate-300">${event.description}</p>
            <a href="event-calendar.html#${event.slug}" class="mt-6 inline-flex items-center text-sm font-semibold text-ieee-200 transition hover:text-white">
              See event details
            </a>
          </article>
        `
      )
      .join("");
  }

  function renderFaq() {
    const target = document.getElementById("faq-list");

    if (!target) {
      return;
    }

    target.innerHTML = content.faqItems
      .map(
        (item) => `
          <details class="rounded-[1.5rem] border border-white/10 bg-slate-900/75 p-5 shadow-panel">
            <summary class="flex list-none cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold text-white">
              <span>${item.question}</span>
              <span class="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">Open</span>
            </summary>
            <p class="mt-4 text-sm leading-7 text-slate-300">${item.answer}</p>
          </details>
        `
      )
      .join("");
  }

  function renderMembershipBenefits() {
    const target = document.getElementById("membership-benefits");

    if (!target) {
      return;
    }

    target.innerHTML = content.membershipBenefits
      .map(
        (item, index) => `
          <article class="rounded-[1.8rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel" data-reveal>
            <p class="text-xs font-semibold uppercase tracking-[0.22em] ${
              index % 2 === 0 ? "text-ieee-200" : "text-sfsu-300"
            }">
              Benefit ${index + 1}
            </p>
            <h3 class="mt-3 text-xl font-bold text-white">${item.title}</h3>
            <p class="mt-3 text-sm leading-7 text-slate-300">${item.description}</p>
          </article>
        `
      )
      .join("");
  }

  function renderJoinSteps() {
    const target = document.getElementById("join-steps");

    if (!target) {
      return;
    }

    target.innerHTML = content.joinSteps
      .map(
        (item) => `
          <article class="rounded-[1.8rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel" data-reveal>
            <p class="text-sm font-black text-ieee-200">${item.step}</p>
            <h3 class="mt-3 text-xl font-bold text-white">${item.title}</h3>
            <p class="mt-3 text-sm leading-7 text-slate-300">${item.description}</p>
          </article>
        `
      )
      .join("");
  }

  function renderHeroSlideshow() {
    const target = document.getElementById("hero-slideshow");

    if (!target) {
      return;
    }

    const slides = content.heroSlides;

    target.innerHTML = `
      <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-glow">
        <div class="absolute inset-0 bg-hero-mesh opacity-90"></div>
        <div class="relative aspect-[4/3]">
          ${slides
            .map(
              (slide, index) => `
                <figure class="slide absolute inset-0 ${index === 0 ? "is-active" : ""}" data-slide="${index}" aria-hidden="${index === 0 ? "false" : "true"}">
                  <img src="${slide.image}" alt="${slide.alt}" class="h-full w-full object-cover opacity-85" />
                  <figcaption class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6 text-white sm:p-8">
                    <p class="text-xs font-semibold uppercase tracking-[0.24em] text-signal-300">Homepage slideshow</p>
                    <h2 class="mt-3 text-2xl font-bold sm:text-3xl">${slide.title}</h2>
                    <p class="mt-3 max-w-xl text-sm leading-7 text-slate-200">${slide.caption}</p>
                  </figcaption>
                </figure>
              `
            )
            .join("")}
        </div>

        <div class="absolute bottom-5 left-6 flex items-center gap-2 sm:left-8">
          ${slides
            .map(
              (_, index) => `
                <button
                  type="button"
                  class="h-3 w-3 rounded-full border border-white/60 ${index === 0 ? "bg-white" : "bg-transparent"}"
                  data-slide-dot="${index}"
                  aria-label="Show slide ${index + 1}"
                ></button>
              `
            )
            .join("")}
        </div>

        <div class="absolute bottom-5 right-6 flex gap-2 sm:right-8">
          <button
            type="button"
            class="rounded-full border border-white/15 bg-slate-950/60 p-3 text-white transition hover:bg-slate-950/75"
            data-slide-prev
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            class="rounded-full border border-white/15 bg-slate-950/60 p-3 text-white transition hover:bg-slate-950/75"
            data-slide-next
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    `;

    let currentIndex = 0;
    const slideElements = target.querySelectorAll("[data-slide]");
    const dotElements = target.querySelectorAll("[data-slide-dot]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timerId;

    function updateSlide(nextIndex) {
      currentIndex = (nextIndex + slides.length) % slides.length;

      slideElements.forEach((slide, index) => {
        const isActive = index === currentIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      dotElements.forEach((dot, index) => {
        dot.classList.toggle("bg-white", index === currentIndex);
        dot.classList.toggle("bg-transparent", index !== currentIndex);
      });
    }

    function startTimer() {
      if (reducedMotion) {
        return;
      }

      stopTimer();
      timerId = window.setInterval(() => {
        updateSlide(currentIndex + 1);
      }, 5200);
    }

    function stopTimer() {
      window.clearInterval(timerId);
    }

    target.querySelector("[data-slide-prev]").addEventListener("click", function () {
      updateSlide(currentIndex - 1);
      startTimer();
    });

    target.querySelector("[data-slide-next]").addEventListener("click", function () {
      updateSlide(currentIndex + 1);
      startTimer();
    });

    dotElements.forEach((dot) => {
      dot.addEventListener("click", function () {
        updateSlide(Number(this.dataset.slideDot));
        startTimer();
      });
    });

    target.addEventListener("mouseenter", stopTimer);
    target.addEventListener("mouseleave", startTimer);

    startTimer();
  }

  function renderEventsPage() {
    const listTarget = document.getElementById("events-list");
    const filtersTarget = document.getElementById("event-filters");

    if (!listTarget || !filtersTarget) {
      return;
    }

    const categories =
      content.eventFilters || Array.from(new Set(content.upcomingEvents.map((event) => event.category)));
    let activeCategory = "";

    function renderFilters() {
      filtersTarget.innerHTML = categories
        .map(
          (category) => `
            <button
              type="button"
              class="rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? "border-ieee-300/40 bg-ieee-500/15 text-ieee-100"
                  : "border-white/10 bg-slate-900/80 text-slate-300 hover:border-white/20 hover:text-white"
              }"
              data-category="${category}"
            >
              ${category}
            </button>
          `
        )
        .join("");

      filtersTarget.querySelectorAll("[data-category]").forEach((button) => {
        button.addEventListener("click", function () {
          activeCategory = activeCategory === this.dataset.category ? "" : this.dataset.category;
          renderFilters();
          renderCards();
        });
      });
    }

    function renderCards() {
      const visibleEvents =
        !activeCategory
          ? content.upcomingEvents
          : content.upcomingEvents.filter((event) => event.category === activeCategory);

      if (!visibleEvents.length) {
        const emptyCategoryLabel = activeCategory || "Future event";

        listTarget.innerHTML = `
          <article class="rounded-[1.9rem] border border-dashed border-white/15 bg-slate-900/55 p-6 text-center shadow-panel lg:col-span-2">
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">No upcoming events yet</p>
            <h3 class="mt-3 text-2xl font-bold text-white">${escapeHtml(emptyCategoryLabel)} placeholders can be added next.</h3>
            <p class="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Add a new event object in content.js using this category name, and it will appear here automatically.
            </p>
          </article>
        `;
        return;
      }

      listTarget.innerHTML = visibleEvents
        .map(
          (event) => `
            <article id="${event.slug}" class="rounded-[1.9rem] border border-white/10 bg-slate-900/80 p-6 shadow-panel">
              <div class="overflow-hidden rounded-[1.5rem] border border-white/10">
                <img src="${event.image}" alt="${event.alt}" class="h-56 w-full object-cover" loading="lazy" />
              </div>
              <div class="mt-6 flex flex-wrap items-center justify-between gap-3">
                <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200">${event.category}</span>
                <span class="text-sm font-medium text-slate-400">${event.date}</span>
              </div>
              <h3 class="mt-4 text-2xl font-bold text-white">${event.title}</h3>
              <p class="mt-3 text-sm leading-7 text-slate-300">${event.description}</p>
              <div class="mt-5 grid gap-2 text-sm text-slate-300">
                <p><span class="font-semibold text-white">Time:</span> ${event.time}</p>
                <p><span class="font-semibold text-white">Location:</span> ${event.location}</p>
              </div>
              <p class="mt-5 rounded-[1.4rem] bg-slate-950/70 p-4 text-sm leading-7 text-slate-300">${event.details}</p>
              <div class="mt-6 flex flex-wrap gap-3">
                <a href="${event.registerLink}" class="rounded-full bg-ieee-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-ieee-800">
                  ${event.ctaText}
                </a>
                <a href="membership.html" class="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-ieee-300/40 hover:bg-white/10">
                  Get involved
                </a>
              </div>
            </article>
          `
        )
        .join("");

      highlightHashTarget();
    }

    renderFilters();
    renderCards();
  }

  function renderGoogleCalendar() {
    const target = document.getElementById("google-calendar-panel");

    if (!target) {
      return;
    }

    const settings = content.googleCalendar || {};

    if (!settings.apiKey || !settings.calendarId) {
      target.innerHTML = `
        <div class="rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-panel">
          <div class="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Google Calendar API</p>
              <h2 class="mt-3 text-3xl font-bold text-white">Chapter calendar connection</h2>
              <p class="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Add your Google Calendar API key and calendar ID in content.js to show live calendar items here.
              </p>
            </div>
            <div class="grid gap-3 text-sm">
              <div class="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4">
                <p class="font-semibold text-white">apiKey</p>
                <p class="mt-1 text-slate-400">content.googleCalendar.apiKey</p>
              </div>
              <div class="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4">
                <p class="font-semibold text-white">calendarId</p>
                <p class="mt-1 text-slate-400">content.googleCalendar.calendarId</p>
              </div>
            </div>
          </div>
        </div>
      `;
      return;
    }

    target.innerHTML = `
      <div class="rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-panel">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Google Calendar API</p>
        <h2 class="mt-3 text-3xl font-bold text-white">Loading calendar events...</h2>
      </div>
    `;

    const params = new URLSearchParams({
      key: settings.apiKey,
      singleEvents: "true",
      orderBy: "startTime",
      timeMin: new Date().toISOString(),
      maxResults: String(settings.maxResults || 6)
    });

    fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(settings.calendarId)}/events?${params}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Calendar request failed");
        }
        return response.json();
      })
      .then((data) => {
        const items = data.items || [];

        target.innerHTML = `
          <div class="rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-panel">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Google Calendar API</p>
                <h2 class="mt-3 text-3xl font-bold text-white">Live chapter calendar</h2>
              </div>
              <p class="max-w-xl text-sm leading-7 text-slate-300">
                Events below are pulled from the configured Google Calendar.
              </p>
            </div>
            <div class="mt-8 grid gap-4 lg:grid-cols-2">
              ${
                items.length
                  ? items.map(renderGoogleCalendarItem).join("")
                  : '<p class="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">No upcoming Google Calendar events found.</p>'
              }
            </div>
          </div>
        `;
      })
      .catch(() => {
        target.innerHTML = `
          <div class="rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-panel">
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Google Calendar API</p>
            <h2 class="mt-3 text-3xl font-bold text-white">Calendar could not load</h2>
            <p class="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              Check the API key, calendar ID, public calendar access, and browser console details.
            </p>
          </div>
        `;
      });
  }

  function renderGoogleCalendarItem(item) {
    const start = item.start || {};
    const date = start.dateTime || start.date || "";
    const dateFormatOptions = start.dateTime
      ? { dateStyle: "medium", timeStyle: "short" }
      : { dateStyle: "medium" };
    const formattedDate = date
      ? new Date(date).toLocaleString("en-US", dateFormatOptions)
      : "Date TBD";

    return `
      <article class="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
        <p class="text-sm font-semibold text-ieee-200">${escapeHtml(formattedDate)}</p>
        <h3 class="mt-3 text-xl font-bold text-white">${escapeHtml(item.summary || "Untitled event")}</h3>
        ${
          item.location
            ? `<p class="mt-3 text-sm leading-7 text-slate-300">${escapeHtml(item.location)}</p>`
            : ""
        }
      </article>
    `;
  }

  function renderOfficers() {
    const target = document.getElementById("officer-grid");

    if (!target) {
      return;
    }

    target.innerHTML = content.officers
      .map(
        (officer) => `
          <article class="overflow-hidden rounded-[1.9rem] border border-white/10 bg-slate-900/80 shadow-panel" data-reveal>
            <div class="overflow-hidden border-b border-white/10">
              <img src="${officer.image}" alt="${officer.alt}" class="h-72 w-full object-cover" loading="lazy" />
            </div>
            <div class="p-6">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-ieee-200">${officer.role}</p>
              <h3 class="mt-3 text-2xl font-bold text-white">${officer.name}</h3>
              <p class="mt-2 text-sm text-slate-400">${officer.major}</p>
              <p class="mt-4 text-sm leading-7 text-slate-300">${officer.focus}</p>
              <details class="mt-5 rounded-[1.4rem] bg-slate-950/70 p-4">
                <summary class="list-none cursor-pointer text-sm font-semibold text-white">Bio and contact</summary>
                <div class="mt-3 space-y-3 text-sm leading-7 text-slate-300">
                  <p>${officer.bio}</p>
                  <p><span class="font-semibold text-white">Email:</span> <a href="mailto:${officer.email}" class="text-ieee-200 transition hover:text-white">${officer.email}</a></p>
                </div>
              </details>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderArchives() {
    const jumpTarget = document.getElementById("archive-jump-links");
    const sectionTarget = document.getElementById("archive-sections");

    if (!jumpTarget || !sectionTarget) {
      return;
    }

    jumpTarget.innerHTML = content.archiveYears
      .map(
        (year) => `
          <a
            href="past-events.html#${year.id}"
            class="rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-ieee-300/40 hover:text-white"
          >
            ${year.year}
          </a>
        `
      )
      .join("");

    sectionTarget.innerHTML = content.archiveYears
      .map(
        (year) => `
          <section id="${year.id}" class="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-panel" data-reveal>
            <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.24em] text-ieee-200">Academic year</p>
                <h2 class="mt-2 text-3xl font-bold text-white">${year.year}</h2>
              </div>
              <p class="max-w-2xl text-sm leading-7 text-slate-300">${year.summary}</p>
            </div>
            <div class="mt-8 grid gap-5 md:grid-cols-2">
              ${year.events
                .map(
                  (event) => `
                    <article class="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
                      <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sfsu-300">${event.season}</p>
                      <h3 class="mt-3 text-xl font-bold text-white">${event.title}</h3>
                      <p class="mt-3 text-sm leading-7 text-slate-300">${event.description}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          </section>
        `
      )
      .join("");
  }

  function bindNavigationUi() {
    const menuToggle = document.querySelector("[data-menu-toggle]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", function () {
        const isExpanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", String(!isExpanded));
        mobileMenu.classList.toggle("hidden", isExpanded);
      });

      mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function () {
          menuToggle.setAttribute("aria-expanded", "false");
          mobileMenu.classList.add("hidden");
        });
      });
    }

    document.addEventListener("click", function (event) {
      document.querySelectorAll("details.nav-dropdown[open]").forEach((details) => {
        if (!details.contains(event.target)) {
          details.removeAttribute("open");
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        document.querySelectorAll("details.nav-dropdown[open]").forEach((details) => {
          details.removeAttribute("open");
        });

        if (menuToggle && mobileMenu) {
          menuToggle.setAttribute("aria-expanded", "false");
          mobileMenu.classList.add("hidden");
        }
      }
    });
  }

  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");

    if (!items.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    items.forEach((item) => observer.observe(item));
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");

    if (!counters.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach((counter) => {
        counter.textContent = counter.dataset.count;
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const counter = entry.target;
          const targetValue = Number(counter.dataset.count);
          const duration = 900;
          const start = performance.now();

          function step(timestamp) {
            const progress = Math.min((timestamp - start) / duration, 1);
            counter.textContent = String(Math.floor(progress * targetValue));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              counter.textContent = String(targetValue);
            }
          }

          window.requestAnimationFrame(step);
          observer.unobserve(counter);
        });
      },
      { threshold: 0.45 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function initDigitalRain() {
    const background = document.querySelector(".circuit-bg");

    if (!background || background.querySelector(".page-digital-rain")) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.className = "page-digital-rain";
    canvas.setAttribute("aria-hidden", "true");
    background.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const columnWidth = 18;
    const fontSize = 16;
    const chars = "IEEE SFSU 0101010110 <>[]{} / +-*";
    let drops = [];
    let animationFrameId;
    let lastFrame = 0;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({ length: Math.ceil(width / columnWidth) }, () => Math.random() * -36);
      drawFrame();
    }

    function drawFrame() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.fillStyle = "rgba(2, 6, 23, 0.14)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px "Fira Code", "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < drops.length; i++) {
        const x = i * columnWidth;
        const y = drops[i] * fontSize;
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const isLead = Math.random() > 0.968;

        ctx.fillStyle = isLead
          ? "rgba(226, 232, 240, 0.82)"
          : `rgba(${Math.random() > 0.66 ? "125, 211, 252" : "16, 134, 214"}, ${0.32 + Math.random() * 0.22})`;
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.965) {
          drops[i] = Math.random() * -28;
        } else {
          drops[i] += 0.72 + Math.random() * 0.38;
        }
      }
    }

    function animate(timestamp) {
      if (timestamp - lastFrame > 46) {
        drawFrame();
        lastFrame = timestamp;
      }

      animationFrameId = window.requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (!reducedMotion) {
      animationFrameId = window.requestAnimationFrame(animate);
    }

    window.addEventListener("pagehide", function () {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    });
  }

  function initLoader() {
    const loader = document.getElementById("loader");
    const siteShell = document.getElementById("site-shell");

    if (!loader || !siteShell) {
      return;
    }

    let hasRevealed = false;

    function revealSite() {
      if (hasRevealed) {
        return;
      }

      hasRevealed = true;
      window.setTimeout(function () {
        loader.classList.add("is-hidden");
        siteShell.classList.remove("opacity-0");
      }, 750);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", revealSite, { once: true });
    } else {
      revealSite();
    }

    window.addEventListener("load", revealSite, { once: true });
  }

  function highlightHashTarget() {
    const id = window.location.hash.replace("#", "");

    if (!id) {
      return;
    }

    window.requestAnimationFrame(function () {
      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      target.classList.add("hash-target");
      window.setTimeout(function () {
        target.classList.remove("hash-target");
      }, 2200);
    });
  }

  function init() {
    initDigitalRain();
    renderHeader();
    renderFooter();
    renderAboutCopy();
    renderHeroSlideshow();
    renderQuickFacts();
    renderStats();
    renderPillars();
    renderFeatureStories();
    renderHomeEvents();
    renderFaq();
    renderMembershipBenefits();
    renderJoinSteps();
    renderEventsPage();
    renderGoogleCalendar();
    renderOfficers();
    renderArchives();
    bindNavigationUi();
    initReveal();
    initCounters();
    initLoader();
    highlightHashTarget();
    window.addEventListener("hashchange", highlightHashTarget);
  }

  init();
})();
