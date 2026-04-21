(function () {
  const SUPABASE_URL = (window.APP_CONFIG && window.APP_CONFIG.SUPABASE_URL) || "https://zxvqgqnwbkqmopaxtqcm.supabase.co";
  const SUPABASE_KEY = (window.APP_CONFIG && window.APP_CONFIG.SUPABASE_KEY) || "sb_publishable_90CEm1Vf4QqF4p4C7DAsvw_c_eb78XE";
  const SiteRuntime = window.SiteRuntime || null;
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  const isMobile = window.innerWidth <= 768;

  const RU = {
    months: [
      "\u044f\u043d\u0432\u0430\u0440\u044f",
      "\u0444\u0435\u0432\u0440\u0430\u043b\u044f",
      "\u043c\u0430\u0440\u0442\u0430",
      "\u0430\u043f\u0440\u0435\u043b\u044f",
      "\u043c\u0430\u044f",
      "\u0438\u044e\u043d\u044f",
      "\u0438\u044e\u043b\u044f",
      "\u0430\u0432\u0433\u0443\u0441\u0442\u0430",
      "\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f",
      "\u043e\u043a\u0442\u044f\u0431\u0440\u044f",
      "\u043d\u043e\u044f\u0431\u0440\u044f",
      "\u0434\u0435\u043a\u0430\u0431\u0440\u044f"
    ],
    menu: "\u041c\u0435\u043d\u044e",
    closeMenu: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e",
    openMenu: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e",
    news: "\u041d\u043e\u0432\u043e\u0441\u0442\u0438",
    login: "\u0412\u0445\u043e\u0434",
    myRegistrations: "\u041c\u043e\u0438 \u0437\u0430\u043f\u0438\u0441\u0438",
    account: "\u0410\u043a\u043a\u0430\u0443\u043d\u0442",
    section: "\u0420\u0430\u0437\u0434\u0435\u043b",
    openVideo: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432\u0438\u0434\u0435\u043e\u0440\u043e\u043b\u0438\u043a",
    loadError: "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043d\u043e\u0432\u043e\u0441\u0442\u0438.",
    defaultTitle: "\u041d\u043e\u0432\u043e\u0441\u0442\u0438 \u0446\u0435\u043d\u0442\u0440\u0430 \u043a\u0430\u0440\u044c\u0435\u0440\u044b",
    pageNote: "\u041d\u0430 \u044d\u0442\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u0441\u043e\u0431\u0440\u0430\u043d\u044b \u0432\u0441\u0435 \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u043d\u043e\u0432\u043e\u0441\u0442\u0438, \u0430\u043d\u043e\u043d\u0441\u044b \u0438 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b \u0441 \u0432\u0438\u0434\u0435\u043e\u0440\u043e\u043b\u0438\u043a\u0430\u043c\u0438.",
    noDate: "\u0414\u0430\u0442\u0430 \u043d\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u0430",
    noPublished: "\u041e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043d\u043d\u044b\u0445 \u043d\u043e\u0432\u043e\u0441\u0442\u0435\u0439 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442.",
    newsCard: "\u041d\u043e\u0432\u043e\u0441\u0442\u044c",
    videoAttached: "\u0412\u0438\u0434\u0435\u043e \u043f\u0440\u0438\u043a\u0440\u0435\u043f\u043b\u0435\u043d\u043e"
  };

  const newsList = document.getElementById("newsPageList");
  const pageTitle = document.getElementById("newsPageTitle");
  const pageText = document.getElementById("newsPageText");
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
        <a class="mobile-header-brand" href="index.html" id="mobileHeaderBrand">${RU.news}</a>
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
    return normalizeStr(pageTitle && pageTitle.textContent) || RU.news;
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
      active: link.getAttribute("href") === "news.html"
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
    if (!v) return "#";
    try {
      const url = new URL(v, window.location.origin);
      if (url.protocol === "http:" || url.protocol === "https:") return url.href;
      return "#";
    } catch {
      return "#";
    }
  }

  function renderRichText(value) {
    const source = normalizeStr(value);
    if (!source) return "";
    const escaped = escapeHtml(source);
    const withMarkdownLinks = escaped.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gi, function (_, label, url) {
      const href = safeLink(url);
      return href === "#" ? escapeHtml(label) : `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    });
    const withAutoLinks = withMarkdownLinks.replace(/(^|[\s(>])((https?:\/\/|www\.)[^\s<]+)/gi, function (match, prefix, url) {
      const href = safeLink(/^https?:\/\//i.test(url) ? url : `https://${url}`);
      if (href === "#") return match;
      return `${prefix}<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a>`;
    });
    return withAutoLinks
      .split(/\n{2,}/)
      .map(function (paragraph) { return `<p>${paragraph.replace(/\n/g, "<br>")}</p>`; })
      .join("");
  }

  function normalizeNewsDate(value) {
    const raw = normalizeStr(value).replace(/[^\d]/g, "");
    if (raw.length === 8) return `${raw.slice(0, 2)}.${raw.slice(2, 4)}.${raw.slice(4)}`;
    const m = normalizeStr(value).match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (m) return `${m[1].padStart(2, "0")}.${m[2].padStart(2, "0")}.${m[3]}`;
    return normalizeStr(value);
  }

  function newsDateToSortableValue(value) {
    const normalized = normalizeNewsDate(value);
    const match = normalized.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!match) return 0;
    return Number(match[3] + match[2] + match[1]);
  }

  function formatNewsDateDisplay(value) {
    const normalized = normalizeNewsDate(value);
    const m = normalized.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!m) return normalized || RU.noDate;
    return `${Number(m[1])} ${RU.months[Number(m[2]) - 1]} ${m[3]}`;
  }

  function normalizeNewsItem(item, index) {
    return {
      key: normalizeStr(item.key) || `news-${index + 1}`,
      title: normalizeStr(item.title),
      summary: normalizeStr(item.summary),
      content: normalizeStr(item.content),
      date: normalizeNewsDate(item.date),
      cover: normalizeStr(item.cover),
      video_url: normalizeStr(item.video_url || item.videoUrl),
      published: item && String(item.published) !== "false"
    };
  }

  function getVideoEmbedMarkup(url) {
    const value = normalizeStr(url);
    if (!value) return "";
    const yt = value.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/i);
    if (yt) return `<div class="news-video-wrap"><iframe src="https://www.youtube.com/embed/${yt[1]}" allowfullscreen loading="lazy"></iframe></div>`;
    const rutube = value.match(/rutube\.ru\/video\/([A-Za-z0-9]+)/i);
    if (rutube) return `<div class="news-video-wrap"><iframe src="https://rutube.ru/play/embed/${rutube[1]}" allowfullscreen loading="lazy"></iframe></div>`;
    if (/\.mp4($|\?)/i.test(value)) return `<div class="news-video-wrap"><video controls preload="metadata" src="${escapeHtml(value)}"></video></div>`;
    return `<a class="direction-link" href="${safeLink(value)}" target="_blank" rel="noopener noreferrer">${RU.openVideo}</a>`;
  }

  async function loadNews() {
    if (SiteRuntime && typeof SiteRuntime.showLoading === "function") {
      SiteRuntime.showLoading("Загружаем новости...");
    }
    const { data, error } = await sb.from("site_content").select("content").eq("id", 1).maybeSingle();
    if (error) {
      if (SiteRuntime && typeof SiteRuntime.hideScreen === "function") {
        SiteRuntime.hideScreen();
      }
      newsList.innerHTML = `<div class="muted-text">${RU.loadError}</div>`;
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
    if (SiteRuntime && typeof SiteRuntime.hideScreen === "function") {
      SiteRuntime.hideScreen();
    }
    const settings = content.settings || {};
    pageTitle.textContent = settings.newsTitle || RU.defaultTitle;
    pageText.textContent = RU.pageNote;
    renderMobileChrome();

    const items = (Array.isArray(content.news) ? content.news : [])
      .map(normalizeNewsItem)
      .filter((item) => item.published)
      .sort((a, b) => newsDateToSortableValue(b.date) - newsDateToSortableValue(a.date));

    const selectedKey = new URLSearchParams(window.location.search).get("news");
    const ordered = selectedKey
      ? items.sort((a, b) => (a.key === selectedKey ? -1 : b.key === selectedKey ? 1 : 0) || newsDateToSortableValue(b.date) - newsDateToSortableValue(a.date))
      : items;

    if (!ordered.length) {
      newsList.innerHTML = `<div class="muted-text">${RU.noPublished}</div>`;
      return;
    }

    newsList.innerHTML = ordered.map((item) => `
      <article class="news-page-card" id="${escapeHtml(item.key)}">
        <div class="news-page-card-inner">
          <div class="news-page-cover"${item.cover ? ` style="background-image:url('${item.cover.replace(/'/g, "%27")}')"` : ""}>${item.cover ? "" : RU.newsCard}</div>
          <div class="news-page-content">
            <div class="news-page-meta">
              <span class="head-badge">${escapeHtml(formatNewsDateDisplay(item.date))}</span>
              ${item.video_url ? `<span class="head-badge">${RU.videoAttached}</span>` : ""}
            </div>
            <h2 class="panel-title" style="margin:0;">${escapeHtml(item.title)}</h2>
            ${item.summary ? `<div class="news-page-summary rich-text">${renderRichText(item.summary)}</div>` : ""}
            <div class="news-page-text rich-text">${renderRichText(item.content || item.summary || "")}</div>
            ${getVideoEmbedMarkup(item.video_url)}
          </div>
        </div>
      </article>
    `).join("");

    if (selectedKey) {
      const selectedEl = document.getElementById(selectedKey);
      if (selectedEl) selectedEl.scrollIntoView({ behavior: "smooth", block: "start" });
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
  loadNews();
})();
