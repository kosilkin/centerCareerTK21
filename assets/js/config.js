window.APP_CONFIG = {
  SUPABASE_URL: "https://zxvqgqnwbkqmopaxtqcm.supabase.co",
<<<<<<< ours
  SUPABASE_KEY: "sb_publishable_90CEm1Vf4QqF4p4C7DAsvw_c_eb78XE"
};
=======
  SUPABASE_KEY: "sb_publishable_90CEm1Vf4QqF4p4C7DAsvw_c_eb78XE",
  LOG_STORAGE_KEY: "careerCenterAdminLogs",
  MAX_LOG_ENTRIES: 200
};

(function () {
  const config = window.APP_CONFIG || {};
  const LOG_STORAGE_KEY = config.LOG_STORAGE_KEY || "careerCenterAdminLogs";
  const MAX_LOG_ENTRIES = Number(config.MAX_LOG_ENTRIES) || 200;
  const PAGE_ACCESS_KEYS = ["home", "events", "services", "internships", "team", "news", "directions"];

  function normalizeStr(value) {
    return String(value || "").trim();
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function safeJsonParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function sanitizeLogValue(value, depth) {
    const nextDepth = Number(depth) || 0;
    if (value === null || typeof value === "undefined") return value;
    if (nextDepth > 3) return "[depth-limit]";
    if (value instanceof Error) {
      return {
        name: value.name || "Error",
        message: value.message || String(value),
        stack: normalizeStr(value.stack)
      };
    }
    if (Array.isArray(value)) {
      return value.slice(0, 20).map(function (item) {
        return sanitizeLogValue(item, nextDepth + 1);
      });
    }
    if (typeof value === "object") {
      const result = {};
      Object.keys(value).slice(0, 20).forEach(function (key) {
        result[key] = sanitizeLogValue(value[key], nextDepth + 1);
      });
      return result;
    }
    if (typeof value === "string") return value.slice(0, 4000);
    return value;
  }

  function stringifyLogValue(value) {
    if (typeof value === "string") return value;
    try {
      return JSON.stringify(sanitizeLogValue(value, 0), null, 2);
    } catch (error) {
      return String(value);
    }
  }

  function createDefaultPageAccess() {
    return PAGE_ACCESS_KEYS.reduce(function (acc, key) {
      acc[key] = false;
      return acc;
    }, {});
  }

  function resolveSiteFlags(source) {
    if (source && source.settings && source.settings.siteFlags) {
      return source.settings.siteFlags;
    }
    return source || {};
  }

  function getPageAccessMap(source) {
    const flags = resolveSiteFlags(source);
    const fallback = createDefaultPageAccess();
    const raw = flags && typeof flags.pageAdminOnly === "object" && !Array.isArray(flags.pageAdminOnly)
      ? flags.pageAdminOnly
      : {};
    PAGE_ACCESS_KEYS.forEach(function (key) {
      fallback[key] = Boolean(raw[key]);
    });
    if (typeof flags.directionsAdminOnly !== "undefined") {
      fallback.directions = Boolean(flags.directionsAdminOnly);
    }
    return fallback;
  }

  function isPageAdminOnly(source, pageKey) {
    return Boolean(getPageAccessMap(source)[normalizeStr(pageKey).toLowerCase()]);
  }

  function canAccessPage(source, pageKey, isAdmin) {
    return !isPageAdminOnly(source, pageKey) || Boolean(isAdmin);
  }

  function summarizeLogs(items) {
    const logs = Array.isArray(items) ? items : [];
    const summary = {
      total: logs.length,
      errors: 0,
      warnings: 0,
      info: 0,
      debug: 0,
      bySource: {},
      lastErrorAt: "",
      lastDbErrorAt: "",
      lastCriticalMessage: ""
    };

    logs.forEach(function (item) {
      const level = normalizeStr(item && item.level).toLowerCase() || "info";
      const source = normalizeStr(item && item.source).toLowerCase() || "runtime";
      if (level === "error") {
        summary.errors += 1;
        if (!summary.lastErrorAt) {
          summary.lastErrorAt = item.createdAt || "";
          summary.lastCriticalMessage = item.message || "";
        }
        if (source === "db" && !summary.lastDbErrorAt) {
          summary.lastDbErrorAt = item.createdAt || "";
        }
      } else if (level === "warn" || level === "warning") {
        summary.warnings += 1;
      } else if (level === "debug") {
        summary.debug += 1;
      } else {
        summary.info += 1;
      }
      summary.bySource[source] = (summary.bySource[source] || 0) + 1;
    });

    return summary;
  }

  function ensureSiteStateScreen() {
    if (typeof document === "undefined") return null;
    let root = document.getElementById("siteStateScreen");
    if (root) return root;

    root = document.createElement("div");
    root.id = "siteStateScreen";
    root.className = "site-state-screen hidden";
    root.innerHTML = [
      '<div class="site-state-card">',
      '  <div class="site-state-badge" id="siteStateBadge">Состояние сайта</div>',
      '  <h2 class="site-state-title" id="siteStateTitle">Загрузка...</h2>',
      '  <p class="site-state-text" id="siteStateText">Подождите, данные подгружаются.</p>',
      '  <div class="site-state-spinner" id="siteStateSpinner" aria-hidden="true"></div>',
      '</div>'
    ].join("");

    document.body.appendChild(root);
    return root;
  }

  function setScreenState(options) {
    const root = ensureSiteStateScreen();
    if (!root) return;
    const badge = document.getElementById("siteStateBadge");
    const title = document.getElementById("siteStateTitle");
    const text = document.getElementById("siteStateText");
    const spinner = document.getElementById("siteStateSpinner");

    root.classList.remove("hidden", "is-loading", "is-maintenance", "is-access");
    root.classList.add(options.mode || "is-loading");

    if (badge) badge.textContent = options.badge || "Состояние сайта";
    if (title) title.textContent = options.title || "";
    if (text) text.textContent = options.text || "";
    if (spinner) spinner.classList.toggle("hidden", !options.spinner);
  }

  function hideScreen() {
    const root = ensureSiteStateScreen();
    if (!root) return;
    root.classList.add("hidden");
  }

  function readLogs() {
    try {
      const parsed = safeJsonParse(localStorage.getItem(LOG_STORAGE_KEY), []);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeLogs(items) {
    try {
      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify((Array.isArray(items) ? items : []).slice(0, MAX_LOG_ENTRIES)));
    } catch (error) {
      return;
    }
  }

  function addLog(level, message, details) {
    const entry = {
      id: "log-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      level: normalizeStr(level) || "info",
      message: normalizeStr(message) || "Событие без описания",
      details: normalizeStr(details),
      page: typeof document !== "undefined" ? normalizeStr(document.body && document.body.dataset && document.body.dataset.page) : "",
      url: typeof window !== "undefined" && window.location ? window.location.href : "",
      createdAt: new Date().toISOString()
    };
    const items = [entry].concat(readLogs()).slice(0, MAX_LOG_ENTRIES);
    writeLogs(items);
    return entry;
  }

  function clearLogs() {
    writeLogs([]);
  }

  window.SiteRuntime = {
    normalizeStr,
    escapeHtml,
    readLogs,
    writeLogs,
    addLog,
    clearLogs,
    showLoading: function (text) {
      setScreenState({
        mode: "is-loading",
        badge: "Загрузка",
        title: "Сайт загружается",
        text: normalizeStr(text) || "Подождите, данные подгружаются.",
        spinner: true
      });
    },
    showMaintenance: function (title, text) {
      setScreenState({
        mode: "is-maintenance",
        badge: "Технические работы",
        title: normalizeStr(title) || "Сайт временно недоступен",
        text: normalizeStr(text) || "Сейчас ведутся технические работы. Попробуйте зайти позже.",
        spinner: false
      });
    },
    showAccessDenied: function (title, text) {
      setScreenState({
        mode: "is-access",
        badge: "Ограничение доступа",
        title: normalizeStr(title) || "Раздел недоступен",
        text: normalizeStr(text) || "Этот раздел доступен только администратору.",
        spinner: false
      });
    },
    hideScreen: hideScreen
  };
})();
>>>>>>> theirs
