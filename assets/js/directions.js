(function () {
  const SUPABASE_URL = (window.APP_CONFIG && window.APP_CONFIG.SUPABASE_URL) || "https://zxvqgqnwbkqmopaxtqcm.supabase.co";
  const SUPABASE_KEY = (window.APP_CONFIG && window.APP_CONFIG.SUPABASE_KEY) || "sb_publishable_90CEm1Vf4QqF4p4C7DAsvw_c_eb78XE";
  const SiteRuntime = window.SiteRuntime || null;
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  const isMobile = window.innerWidth <= 768;

  const RU = {
    menu: "\u041c\u0435\u043d\u044e",
    closeMenu: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e",
    openMenu: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e",
    directions: "\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f",
    directionsTitle: "\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0438 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b",
    login: "\u0412\u0445\u043e\u0434",
    myRegistrations: "\u041c\u043e\u0438 \u0437\u0430\u043f\u0438\u0441\u0438",
    account: "\u0410\u043a\u043a\u0430\u0443\u043d\u0442",
    section: "\u0420\u0430\u0437\u0434\u0435\u043b",
    direction: "\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435",
    openMaterials: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b",
    backToList: "\u041a \u0441\u043f\u0438\u0441\u043a\u0443 \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0439",
    pageNote: "\u041d\u0430 \u044d\u0442\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u0441\u043e\u0431\u0440\u0430\u043d\u044b \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b, \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u0438 \u0438 \u043f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438 \u043f\u043e \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f\u043c \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u044f.",
    loadError: "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f.",
    noDirections: "\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b."
  };

  const list = document.getElementById("directionsPageList");
  const pageTitle = document.getElementById("directionsPageTitle");
  const pageText = document.getElementById("directionsPageText");
  const accountOpenBtn = document.getElementById("accountOpenBtn");
  const logoutTopBtn = document.getElementById("logoutTopBtn");
  const openAdminBtn = document.getElementById("openAdminBtn");
  const openRegistrationsTopBtn = document.getElementById("openRegistrationsTopBtn");
  const openMyRegistrationsBtn = document.getElementById("openMyRegistrationsBtn");
  let currentProfile = null;

  function normalizeStr(v) { return String(v || "").trim(); }
  function escapeHtml(text) { return String(text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function escapeAttribute(text) { return escapeHtml(text).replace(/"/g, "&quot;"); }
  function hasAdminRole(profile) { return normalizeStr(profile && profile.role).toLowerCase() === "admin"; }

  function getSiteFlags(content) {
    return content && content.settings && content.settings.siteFlags && typeof content.settings.siteFlags === "object"
      ? content.settings.siteFlags
      : {};
  }

  function ensureMobileShell() {
    if (document.getElementById("mobileMenuOverlay")) return;
    const bgPattern = document.querySelector(".bg-pattern");
    if (!bgPattern) return;
    bgPattern.insertAdjacentHTML("afterend", `
      <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
      <aside class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-head">
          <div class="mobile-menu-title">${RU.menu}</div>
          <button class="mobile-menu-close" id="mobileMenuCloseBtn" type="button" aria-label="${RU.closeMenu}">&times;</button>
        </div>
        <nav class="mobile-menu-nav" id="mobileMenuNav"></nav>
      </aside>
      <header class="mobile-header" id="mobileHeader">
        <button class="mobile-header-btn" id="mobileMenuBtn" type="button" aria-label="${RU.openMenu}">&#9776;</button>
        <a class="mobile-header-brand" href="index.html" id="mobileHeaderBrand">${RU.directions}</a>
        <button class="mobile-header-btn" id="mobileAccountBtn" type="button">${RU.login}</button>
      </header>
    `);
  }

  ensureMobileShell();

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuNav = document.getElementById("mobileMenuNav");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileMenuCloseBtn = document.getElementById("mobileMenuCloseBtn");
  const mobileHeaderBrand = document.getElementById("mobileHeaderBrand");
  const mobileAccountBtn = document.getElementById("mobileAccountBtn");

  function setMobileMenuOpen(nextValue) {
    const isOpen = Boolean(nextValue);
    if (mobileMenu) mobileMenu.classList.toggle("is-open", isOpen);
    if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("mobile-menu-open", isOpen);
  }

  function getMobileBrandTitle() {
    return normalizeStr(pageTitle && pageTitle.textContent) || RU.directions;
  }

  function redirectToHome(options) {
    const query = options && options.openMyRegistrations ? "?openMyRegistrations=1" : "";
    window.location.href = `index.html${query}`;
  }

  function renderMobileMenu() {
    if (!mobileMenuNav) return;
    const links = Array.from(document.querySelectorAll(".portal-nav a")).map((link) => ({
      href: link.getAttribute("href") || "#",
      label: normalizeStr(link.textContent) || RU.section,
      active: link.getAttribute("href") === "directions.html"
    }));
    if (currentProfile) links.push({ href: "index.html?openMyRegistrations=1", label: RU.myRegistrations, active: false });
    mobileMenuNav.innerHTML = links.map((item) => `
      <a class="mobile-menu-link${item.active ? " is-active" : ""}" href="${escapeAttribute(item.href)}">${escapeHtml(item.label)}</a>
    `).join("");
  }

  function renderMobileChrome() {
    if (!isMobile) return;
    document.body.classList.add("is-mobile");
    if (mobileHeaderBrand) mobileHeaderBrand.textContent = getMobileBrandTitle();
    if (mobileAccountBtn) mobileAccountBtn.textContent = currentProfile ? RU.myRegistrations : RU.login;
    renderMobileMenu();
  }

  async function fetchProfile(session) {
    if (!session?.user?.id) return null;
    const base = {
      id: session.user.id,
      email: session.user.email || "",
      role: normalizeStr(session.user.user_metadata?.role).toLowerCase()
    };
    const { data, error } = await sb.from("profiles").select("role").eq("id", session.user.id).maybeSingle();
    if (error || !data) return base;
    return { ...base, role: normalizeStr(data.role).toLowerCase() };
  }

  async function updateHeaderAuthUI() {
    const { data: { session } } = await sb.auth.getSession();
    currentProfile = await fetchProfile(session);
    if (accountOpenBtn) accountOpenBtn.textContent = session ? RU.account : RU.login;
    if (logoutTopBtn) logoutTopBtn.classList.toggle("hidden", !session);
    if (openAdminBtn) openAdminBtn.classList.toggle("hidden", !hasAdminRole(currentProfile));
    if (openRegistrationsTopBtn) openRegistrationsTopBtn.classList.toggle("hidden", !hasAdminRole(currentProfile));
    if (openMyRegistrationsBtn) openMyRegistrationsBtn.classList.toggle("hidden", !session);
    renderMobileChrome();
  }

  function safeLink(value) {
    const v = normalizeStr(value);
    return v || "#";
  }

  function makeKey(prefix, value) {
    return (prefix + "-" + normalizeStr(value).toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "")).replace(/-+/g, "-") || prefix + "-item";
  }

  function normalizeDirectionItem(item, index) {
    return {
      key: normalizeStr(item.key) || makeKey("direction", item.name || `item-${index}`),
      name: normalizeStr(item.name),
      sub: normalizeStr(item.sub),
      desc: normalizeStr(item.desc),
      content: normalizeStr(item.content || item.fullText),
      image: normalizeStr(item.image || item.cover),
      link: normalizeStr(item.link),
      linkLabel: normalizeStr(item.linkLabel || item.buttonLabel || RU.openMaterials),
      published: item && String(item.published) !== "false"
    };
  }

  async function loadDirections() {
    if (SiteRuntime && typeof SiteRuntime.showLoading === "function") {
      SiteRuntime.showLoading("Загружаем направления...");
    }
    const { data, error } = await sb.from("site_content").select("content").eq("id", 1).maybeSingle();
    if (error) {
      if (SiteRuntime && typeof SiteRuntime.hideScreen === "function") {
        SiteRuntime.hideScreen();
      }
      list.innerHTML = `<div class="muted-text">${RU.loadError}</div>`;
      return;
    }
    const content = data && data.content ? data.content : {};
    const flags = getSiteFlags(content);
    document.querySelectorAll('.portal-nav a[href="directions.html"]').forEach((link) => {
      link.classList.toggle("hidden", !!flags.directionsAdminOnly && !hasAdminRole(currentProfile));
    });
    if (flags.maintenanceMode && !hasAdminRole(currentProfile)) {
      if (SiteRuntime && typeof SiteRuntime.showMaintenance === "function") {
        SiteRuntime.showMaintenance(flags.maintenanceTitle, flags.maintenanceText);
      }
      return;
    }
    if (flags.directionsAdminOnly && !hasAdminRole(currentProfile)) {
      list.innerHTML = "";
      if (SiteRuntime && typeof SiteRuntime.showAccessDenied === "function") {
        SiteRuntime.showAccessDenied("Направления доступны только администратору", "Для обычных пользователей этот раздел сейчас скрыт.");
      }
      return;
    }
    if (SiteRuntime && typeof SiteRuntime.hideScreen === "function") {
      SiteRuntime.hideScreen();
    }
    const settings = content.settings || {};
    pageTitle.textContent = settings.directionsTitle || RU.directionsTitle;
    pageText.textContent = RU.pageNote;
    renderMobileChrome();

    const items = (Array.isArray(content.directions) ? content.directions : []).map(normalizeDirectionItem).filter((item) => item.published);
    const selectedKey = new URLSearchParams(window.location.search).get("direction");
    const ordered = selectedKey ? items.sort((a, b) => (a.key === selectedKey ? -1 : b.key === selectedKey ? 1 : 0)) : items;

    if (!ordered.length) {
      list.innerHTML = `<div class="muted-text">${RU.noDirections}</div>`;
      return;
    }

    list.innerHTML = ordered.map((item) => `
      <article class="news-page-card direction-page-card" id="${escapeHtml(item.key)}">
        <div class="news-page-card-inner">
          <div class="news-page-cover direction-page-cover"${item.image ? ` style="background-image:url('${item.image.replace(/'/g, "%27")}')"` : ""}>${item.image ? "" : escapeHtml(item.name || RU.direction)}</div>
          <div class="news-page-content">
            <div class="news-page-meta">
              <span class="head-badge">${RU.direction}</span>
              ${item.sub ? `<span class="head-badge">${escapeHtml(item.sub)}</span>` : ""}
            </div>
            <h2 class="panel-title" style="margin:0;">${escapeHtml(item.name)}</h2>
            ${item.desc ? `<p class="news-page-summary">${escapeHtml(item.desc)}</p>` : ""}
            <p class="news-page-text">${escapeHtml(item.content || item.desc || "")}</p>
            <div class="direction-page-actions">
              ${item.link && item.link !== "#" ? `<a class="direction-link" href="${safeLink(item.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.linkLabel || RU.openMaterials)}</a>` : ""}
              <a class="section-link-btn" href="index.html#directions">${RU.backToList}</a>
            </div>
          </div>
        </div>
      </article>
    `).join("");

    if (selectedKey) {
      const el = document.getElementById(selectedKey);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (isMobile) {
    document.body.classList.add("is-mobile");
    const mobileBreakpoint = window.matchMedia("(max-width: 768px)");
    const reloadForViewportMode = () => window.location.reload();
    if (typeof mobileBreakpoint.addEventListener === "function") {
      mobileBreakpoint.addEventListener("change", reloadForViewportMode);
    } else if (typeof mobileBreakpoint.addListener === "function") {
      mobileBreakpoint.addListener(reloadForViewportMode);
    }
  }

  if (accountOpenBtn) accountOpenBtn.addEventListener("click", () => { window.location.href = "index.html"; });
  if (openAdminBtn) openAdminBtn.addEventListener("click", () => { window.location.href = "index.html"; });
  if (openRegistrationsTopBtn) openRegistrationsTopBtn.addEventListener("click", () => { window.location.href = "index.html"; });
  if (openMyRegistrationsBtn) openMyRegistrationsBtn.addEventListener("click", () => { redirectToHome({ openMyRegistrations: true }); });
  if (logoutTopBtn) logoutTopBtn.addEventListener("click", async () => {
    await sb.auth.signOut();
    await updateHeaderAuthUI();
  });
  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", () => setMobileMenuOpen(true));
  if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener("click", () => setMobileMenuOpen(false));
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener("click", () => setMobileMenuOpen(false));
  if (mobileMenuNav) mobileMenuNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMobileMenuOpen(false);
  });
  if (mobileAccountBtn) mobileAccountBtn.addEventListener("click", () => {
    if (currentProfile) {
      redirectToHome({ openMyRegistrations: true });
      return;
    }
    window.location.href = "index.html";
  });

  sb.auth.onAuthStateChange(() => {
    updateHeaderAuthUI();
  });

  updateHeaderAuthUI();
  loadDirections();
})();
