
    function showRuntimeError(message) {
      const box = document.getElementById("runtimeErrorBox");
      const text = document.getElementById("runtimeErrorText");
      if (box && text) {
        text.textContent = String(message || "Неизвестная ошибка");
        box.style.display = "block";
      }
    }

    window.addEventListener("error", function(e) {
      showRuntimeError((e && e.message ? e.message : "JS error") + (e && e.filename ? "\n" + e.filename + ":" + e.lineno : ""));
    });

    window.addEventListener("unhandledrejection", function(e) {
      showRuntimeError(e && e.reason ? (e.reason.message || String(e.reason)) : "Unhandled promise rejection");
    });

    const SUPABASE_URL = (window.APP_CONFIG && window.APP_CONFIG.SUPABASE_URL) || "https://zxvqgqnwbkqmopaxtqcm.supabase.co";
    const SUPABASE_KEY = (window.APP_CONFIG && window.APP_CONFIG.SUPABASE_KEY) || "sb_publishable_90CEm1Vf4QqF4p4C7DAsvw_c_eb78XE";
    const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const monthNames = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

    const defaultState = {
      settings: {
        headerTitle: "Запись, мероприятия и команда центра карьеры",
        headerText: "Площадка для студентов и выпускников: запись на консультации, карьерные события и страницы с материалами по направлениям обучения.",
        infoTitle: "Инфо",
        infoText: "Центр карьеры помогает студентам с поиском практики, подготовкой резюме и карьерными консультациями. На сайте можно записаться на нужный формат помощи, посмотреть мероприятия и открыть страницы с материалами по направлениям.",
        infoMark: "Запись и полезные ссылки доступны онлайн",
        jobsTitle: "Запись в центр карьеры",
        eventsTitle: "Мероприятия",
        teamTitle: "Команда центра",
        directionsTitle: "Направления и материалы",
        newsTitle: "Последние новости",
        internshipsTitle: "Стажировки"
      },
      jobs: [
        {
          key: "resume-consultation",
          title: "Консультация по резюме",
          direction: "Резюме",
          desc: "Помощь с оформлением резюме, структурой, подачей навыков и опытом. Оставлено место под описание, зачем нужна эта запись.",
          capacity: 10,
          slots: ["Понедельник 12:00", "Среда 15:30"],
          note: "После отправки заявки с вами свяжутся по email."
        },
        {
          key: "internship-help",
          title: "Помощь с поиском практики",
          direction: "Практика",
          desc: "Консультация по поиску практики и стажировок. Можно рассказать, на что откликаться и как подготовиться к первому этапу отбора.",
          capacity: 8,
          slots: ["Вторник 14:00", "Четверг 16:00"],
          note: "Подготовьте список интересующих вакансий."
        },
        {
          key: "career-consultation",
          title: "Карьерная консультация",
          direction: "Карьера",
          desc: "Индивидуальная запись для обсуждения карьерного маршрута, портфолио, подготовки к собеседованию и плана развития.",
          capacity: 6,
          slots: ["Пятница 13:00", "Пятница 15:00"],
          note: "Можно указать желаемую тему консультации при личном обращении."
        }
      ],
      internships: [
        { key: "frontend-intern", title: "Стажировка по фронтенд-разработке", company: "IT-направление", desc: "Практика с наставником для студентов, которые хотят развиваться в веб-разработке и собрать первые кейсы в портфолио.", link: "#", format: "Гибкий график" },
        { key: "design-intern", title: "Стажировка по графическому дизайну", company: "Дизайн", desc: "Участие в реальных задачах по оформлению материалов, баннеров и интерфейсных макетов.", link: "#", format: "Проектная работа" }
      ],
      events: [
        { key: "job-fair-2026", title: "Ярмарка вакансий", year: 2026, month: 3, day: 14, time: "14:00", place: "Актовый зал, регистрация для студентов 2–4 курса", color: "blue", capacity: 80, slots: ["14 апреля 14:00"], note: "Регистрация обязательна." },
        { key: "resume-workshop-2026", title: "Как составить резюме", year: 2026, month: 3, day: 18, time: "16:30", place: "Аудитория 212, практический мастер-класс", color: "green", capacity: 30, slots: ["18 апреля 16:30"], note: "Возьмите черновик резюме." },
        { key: "interview-training-2026", title: "Тренинг по собеседованию", year: 2026, month: 3, day: 18, time: "18:00", place: "Аудитория 305, для выпускных групп", color: "orange", capacity: 24, slots: ["18 апреля 18:00"], note: "Количество мест ограничено." }
      ],
      news: [
        { key: "career-forum-2026", title: "Открыта регистрация на карьерный форум", summary: "Студенты могут зарегистрироваться на весенний карьерный форум и выбрать интересующие компании для общения.", content: "Весенний карьерный форум объединит работодателей, студентов и выпускников колледжа. В программе — презентации компаний, консультации по резюме и быстрые собеседования.", date: "14.04.2026", cover: "", video_url: "", published: true },
        { key: "resume-week-2026", title: "Стартовала неделя карьерных консультаций", summary: "В центре карьеры открыта дополнительная запись на консультации по резюме, портфолио и подготовке к собеседованию.", content: "В течение недели студенты могут получить индивидуальные рекомендации по резюме, портфолио и подготовке к поиску практики. Запись доступна на главной странице сайта.", date: "10.04.2026", cover: "", video_url: "", published: true },
        { key: "partners-video-2026", title: "Опубликован видеоролик о партнёрах колледжа", summary: "На сайте размещён новый видеоролик о работодателях и возможностях стажировки для студентов разных направлений.", content: "Центр карьеры подготовил новость с видеороликом о партнёрских организациях колледжа. В новости собраны краткие рекомендации по выбору стажировки и практики.", date: "05.04.2026", cover: "", video_url: "", published: true }
      ],
      members: [
        { name: "Иванова Анастасия Петровна", role: "Руководитель центра", desc: "Координирует карьерные мероприятия, консультации и работу с работодателями.", photo: "" },
        { name: "Смирнов Павел Игоревич", role: "Карьерный консультант", desc: "Помогает с резюме, собеседованиями и маршрутами трудоустройства.", photo: "" }
      ],
      directions: [
        { key: "isip", name: "ИСИП", sub: "Информационные системы", desc: "Материалы по практике, вакансиям и карьерному развитию для студентов направления.", content: "На странице направления можно разместить подробную информацию о профиле подготовки, полезные материалы, подборки работодателей, советы по резюме и ссылки на внешние ресурсы.", image: "", link: "#", linkLabel: "Открыть материалы" },
        { key: "design", name: "Дизайн", sub: "Графика и интерфейсы", desc: "Материалы по стажировкам, портфолио и развитию в сфере дизайна.", content: "Используйте эту страницу для публикации подборок по портфолио, конкурсам, стажировкам, вакансиям и карьерным мероприятиям по направлению дизайна.", image: "", link: "#", linkLabel: "Открыть материалы" },
        { key: "economics", name: "Экономика", sub: "Аналитика и финансы", desc: "Материалы по аналитике, стажировкам и карьерным возможностям для студентов направления.", content: "На странице можно собрать полезные ссылки, рекомендации по отклику и материалы по развитию компетенций в области экономики и финансов.", image: "", link: "#", linkLabel: "Открыть материалы" },
        { key: "law", name: "Юриспруденция", sub: "Правовые дисциплины", desc: "Материалы по практике, стажировкам и юридическим карьерным маршрутам.", content: "Эта страница подходит для публикации стажировок, подборок организаций, методических материалов и рекомендаций по развитию в юридической сфере.", image: "", link: "#", linkLabel: "Открыть материалы" }
      ]
    };

    let state = JSON.parse(JSON.stringify(defaultState));
    let currentCalendarYear = 2026;
    let currentCalendarMonth = 3;
    let currentProfile = null;
    let editingJobIndex = null;
    let editingEventIndex = null;
    let editingMemberIndex = null;
    let editingDirectionIndex = null;
    let editingNewsIndex = null;
    let editingInternshipIndex = null;
    let pendingMemberPhotoData = "";
    let bookingContext = null;
    let slotStatsMap = new Map();
    let bookingCalendarState = { groups: [], fallbackSlots: [], month: null, year: null, selectedDayKey: "" };
    let registrationsRows = [];
    let myRegistrationsRows = [];

    const headerTitle = document.getElementById("headerTitle");
    const headerText = document.getElementById("headerText");
    const infoTitle = document.getElementById("infoTitle");
    const infoText = document.getElementById("infoText");
    const infoMark = document.getElementById("infoMark");
    const jobsTitle = document.getElementById("jobsTitle");
    const eventsTitle = document.getElementById("eventsTitle");
    const teamTitle = document.getElementById("teamTitle");
    const directionsTitle = document.getElementById("directionsTitle");
    const newsTitle = document.getElementById("newsTitle");
    const internshipsTitle = document.getElementById("internshipsTitle");

    const teamGrid = document.getElementById("teamGrid");
    const jobsGrid = document.getElementById("jobsGrid");
    const directionsGrid = document.getElementById("directionsGrid");
    const internshipsGrid = document.getElementById("internshipsGrid");
    const newsGrid = document.getElementById("newsGrid");
    const calendarGrid = document.getElementById("calendarGrid");
    const calendarMonthTitle = document.getElementById("calendarMonthTitle");

    const accountModal = document.getElementById("accountModal");
    const adminModal = document.getElementById("adminModal");
    const dayEventsModal = document.getElementById("dayEventsModal");
    const bookingModal = document.getElementById("bookingModal");
    const registrationsModal = document.getElementById("registrationsModal");
    const myRegistrationsModal = document.getElementById("myRegistrationsModal");

    const accountOpenBtn = document.getElementById("accountOpenBtn");
    const logoutTopBtn = document.getElementById("logoutTopBtn");
    const openAdminBtn = document.getElementById("openAdminBtn");
    const closeAccountBtn = document.getElementById("closeAccountBtn");
    const closeAdminBtn = document.getElementById("closeAdminBtn");
    const closeDayEventsBtn = document.getElementById("closeDayEventsBtn");
    const closeBookingBtn = document.getElementById("closeBookingBtn");
    const closeRegistrationsBtn = document.getElementById("closeRegistrationsBtn");
    const closeMyRegistrationsBtn = document.getElementById("closeMyRegistrationsBtn");
    const openRegistrationsTopBtn = document.getElementById("openRegistrationsTopBtn");
    const openMyRegistrationsBtn = document.getElementById("openMyRegistrationsBtn");

    const loginView = document.getElementById("loginView");
    const accountView = document.getElementById("accountView");
    const accountInfoText = document.getElementById("accountInfoText");

    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const loginError = document.getElementById("loginError");

    const adminSuccess = document.getElementById("adminSuccess");
    const adminError = document.getElementById("adminError");

    const sHeaderTitle = document.getElementById("sHeaderTitle");
    const sHeaderText = document.getElementById("sHeaderText");
    const sInfoTitle = document.getElementById("sInfoTitle");
    const sInfoText = document.getElementById("sInfoText");
    const sInfoMark = document.getElementById("sInfoMark");
    const sJobsTitle = document.getElementById("sJobsTitle");
    const sEventsTitle = document.getElementById("sEventsTitle");
    const sTeamTitle = document.getElementById("sTeamTitle");
    const sDirectionsTitle = document.getElementById("sDirectionsTitle");
    const sNewsTitle = document.getElementById("sNewsTitle");
    const sInternshipsTitle = document.getElementById("sInternshipsTitle");

    const jobTitleInput = document.getElementById("jobTitle");
    const jobDirection = document.getElementById("jobDirection");
    const jobDesc = document.getElementById("jobDesc");
    const jobCapacity = document.getElementById("jobCapacity");
    const jobSlots = document.getElementById("jobSlots");
    const jobNote = document.getElementById("jobNote");
    const jobEditNote = document.getElementById("jobEditNote");

    const eventTitleInput = document.getElementById("eventTitle");
    const eventYear = document.getElementById("eventYear");
    const eventMonth = document.getElementById("eventMonth");
    const eventDate = document.getElementById("eventDate");
    const eventTime = document.getElementById("eventTime");
    const eventPlace = document.getElementById("eventPlace");
    const eventCapacity = document.getElementById("eventCapacity");
    const eventSlots = document.getElementById("eventSlots");
    const eventNote = document.getElementById("eventNote");
    const eventColor = document.getElementById("eventColor");
    const eventEditNote = document.getElementById("eventEditNote");

    const memberName = document.getElementById("memberName");
    const memberRole = document.getElementById("memberRole");
    const memberDesc = document.getElementById("memberDesc");
    const memberPhoto = document.getElementById("memberPhoto");
    const memberPhotoFile = document.getElementById("memberPhotoFile");
    const memberPhotoStatus = document.getElementById("memberPhotoStatus");
    const memberPhotoPreviewWrap = document.getElementById("memberPhotoPreviewWrap");
    const memberPhotoPreview = document.getElementById("memberPhotoPreview");
    const memberEditNote = document.getElementById("memberEditNote");

    const directionName = document.getElementById("directionName");
    const directionSub = document.getElementById("directionSub");
    const directionDesc = document.getElementById("directionDesc");
    const directionContent = document.getElementById("directionContent");
    const directionImage = document.getElementById("directionImage");
    const directionLink = document.getElementById("directionLink");
    const directionLinkLabel = document.getElementById("directionLinkLabel");

    const newsTitleInput = document.getElementById("newsTitleInput");
    const newsDateInput = document.getElementById("newsDateInput");
    const newsSummaryInput = document.getElementById("newsSummaryInput");
    const newsContentInput = document.getElementById("newsContentInput");
    const newsCoverInput = document.getElementById("newsCoverInput");
    const newsVideoInput = document.getElementById("newsVideoInput");
    const newsPublishedInput = document.getElementById("newsPublishedInput");
    const newsEditNote = document.getElementById("newsEditNote");

    const internshipTitleInput = document.getElementById("internshipTitleInput");
    const internshipCompanyInput = document.getElementById("internshipCompanyInput");
    const internshipDescInput = document.getElementById("internshipDescInput");
    const internshipLinkInput = document.getElementById("internshipLinkInput");
    const internshipFormatInput = document.getElementById("internshipFormatInput");
    const internshipEditNote = document.getElementById("internshipEditNote");
    const directionEditNote = document.getElementById("directionEditNote");

    const bookingModalTitle = document.getElementById("bookingModalTitle");
    const bookingModalText = document.getElementById("bookingModalText");
    const bookingCapacityText = document.getElementById("bookingCapacityText");
    const bookingCalendarMonthTitle = document.getElementById("bookingCalendarMonthTitle");
    const bookingCalendarGrid = document.getElementById("bookingCalendarGrid");
    const bookingCalendarHelp = document.getElementById("bookingCalendarHelp");
    const bookingPrevMonthBtn = document.getElementById("bookingPrevMonthBtn");
    const bookingNextMonthBtn = document.getElementById("bookingNextMonthBtn");
    const bookingSlotSelect = document.getElementById("bookingSlotSelect");
    const bookingSlotStatus = document.getElementById("bookingSlotStatus");
    const bookingNoteText = document.getElementById("bookingNoteText");
    const bookingSelectedDayTitle = document.getElementById("bookingSelectedDayTitle");
    const bookingSelectedDayMeta = document.getElementById("bookingSelectedDayMeta");
    const bookingTimeList = document.getElementById("bookingTimeList");
    const bookingDayEmpty = document.getElementById("bookingDayEmpty");
    const bookingFullName = document.getElementById("bookingFullName");
    const bookingEmail = document.getElementById("bookingEmail");
    const bookingStudyGroup = document.getElementById("bookingStudyGroup");
    const submitBookingBtn = document.getElementById("submitBookingBtn");
    const bookingSuccess = document.getElementById("bookingSuccess");
    const bookingError = document.getElementById("bookingError");

    const registrationsFilterType = document.getElementById("registrationsFilterType");
    const registrationsSearch = document.getElementById("registrationsSearch");
    const registrationsTableWrap = document.getElementById("registrationsTableWrap");
    const registrationsError = document.getElementById("registrationsError");
    const registrationsSuccess = document.getElementById("registrationsSuccess");
    const refreshRegistrationsBtn = document.getElementById("refreshRegistrationsBtn");
    const myRegistrationsTableWrap = document.getElementById("myRegistrationsTableWrap");
    const myRegistrationsError = document.getElementById("myRegistrationsError");
    const myRegistrationsSuccess = document.getElementById("myRegistrationsSuccess");
    const refreshMyRegistrationsBtn = document.getElementById("refreshMyRegistrationsBtn");

    applyMaskedValue(eventYear, (value) => normalizeDatePartValue(value, 4));
    applyMaskedValue(eventDate, (value) => normalizeDatePartValue(value, 2));
    applyMaskedValue(eventTime, normalizeTimeMaskValue);
    [jobSlots, eventSlots].forEach((textarea) => {
      if (!textarea) return;
      textarea.addEventListener("blur", () => {
        textarea.value = formatSlotTextareaValue(textarea.value);
      });
    });

    function normalizeStr(value) {
      return String(value || "").trim();
    }

    function safeLink(url) {
      const x = normalizeStr(url);
      if (!x) return "#";
      try {
        const parsed = new URL(x, window.location.origin);
        if (parsed.protocol === "http:" || parsed.protocol === "https:") return parsed.href;
        return "#";
      } catch {
        return "#";
      }
    }

    function renderRichText(value) {
      const source = normalizeStr(value);
      if (!source) return "";
      const escaped = escapeHtml(source);
      const withMarkdownLinks = escaped.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gi, function(_, label, url) {
        const href = safeLink(url);
        return href === "#" ? escapeHtml(label) : `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
      });
      const withAutoLinks = withMarkdownLinks.replace(/(^|[\s(>])((https?:\/\/|www\.)[^\s<]+)/gi, function(match, prefix, url) {
        const href = safeLink(/^https?:\/\//i.test(url) ? url : `https://${url}`);
        if (href === "#") return match;
        return `${prefix}<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a>`;
      });
      return withAutoLinks
        .split(/\n{2,}/)
        .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
        .join("");
    }

    function clampCapacity(value, fallback) {
      const num = Number(value);
      return Number.isFinite(num) && num > 0 ? Math.round(num) : fallback;
    }

    function slugify(value) {
      return normalizeStr(value)
        .toLowerCase()
        .replace(/[^a-zа-я0-9]+/gi, "-")
        .replace(/^-+|-+$/g, "") || ("item-" + Date.now());
    }

    function makeKey(prefix, title) {
      return prefix + "-" + slugify(title) + "-" + Math.random().toString(36).slice(2, 7);
    }

    function normalizeSlots(value, fallbackSlot) {
      let list = [];
      if (Array.isArray(value)) {
        list = value.map(normalizeStr).filter(Boolean);
      } else if (typeof value === "string") {
        list = value.split(/\r?\n/).map(normalizeStr).filter(Boolean);
      }
      if (!list.length && fallbackSlot) list = [fallbackSlot];
      return [...new Set(list)];
    }

    function pad2(value) {
      return String(value).padStart(2, "0");
    }

    function buildCanonicalSlot(dateObj, hour, minute) {
      return `${pad2(dateObj.getDate())}.${pad2(dateObj.getMonth() + 1)}.${dateObj.getFullYear()} ${pad2(hour)}:${pad2(minute)}`;
    }

    function parseFlexibleSlotLine(value) {
      const raw = normalizeStr(value);
      if (!raw) return null;

      const direct = raw.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\s+(\d{1,2}):(\d{2}))?$/);
      if (direct) {
        const day = Number(direct[1]);
        const month = Number(direct[2]);
        const year = Number(direct[3]);
        const hour = Number(direct[4] || 0);
        const minute = Number(direct[5] || 0);
        const candidate = new Date(year, month - 1, day, hour, minute);
        if (candidate.getFullYear() === year && candidate.getMonth() === month - 1 && candidate.getDate() === day && hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
          return { day, month, year, hour, minute, canonical: buildCanonicalSlot(candidate, hour, minute) };
        }
        return null;
      }

      const digits = raw.replace(/\D/g, "");
      if (digits.length === 12) {
        const day = Number(digits.slice(0, 2));
        const month = Number(digits.slice(2, 4));
        const year = Number(digits.slice(4, 8));
        const hour = Number(digits.slice(8, 10));
        const minute = Number(digits.slice(10, 12));
        const candidate = new Date(year, month - 1, day, hour, minute);
        if (candidate.getFullYear() === year && candidate.getMonth() === month - 1 && candidate.getDate() === day && hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
          return { day, month, year, hour, minute, canonical: buildCanonicalSlot(candidate, hour, minute) };
        }
      }

      return null;
    }

    function formatSlotTextareaValue(value) {
      return String(value || "")
        .split(/\r?\n/)
        .map((line) => {
          const trimmed = normalizeStr(line);
          if (!trimmed) return "";
          const parsed = parseFlexibleSlotLine(trimmed);
          return parsed ? parsed.canonical : trimmed;
        })
        .join("\n");
    }

    function normalizeTimeMaskValue(value) {
      const digits = String(value || "").replace(/\D/g, "").slice(0, 4);
      if (!digits) return "";
      if (digits.length <= 2) return digits;
      return `${digits.slice(0, 2)}:${digits.slice(2)}`;
    }

    function normalizeDatePartValue(value, maxLen) {
      return String(value || "").replace(/\D/g, "").slice(0, maxLen);
    }

    function buildEventSlotFromFields() {
      const year = normalizeDatePartValue(eventYear.value, 4);
      const month = normalizeDatePartValue(eventMonth.value, 2);
      const day = normalizeDatePartValue(eventDate.value, 2);
      const time = normalizeTimeMaskValue(eventTime.value);
      if (year.length !== 4 || !month || !day || time.length !== 5) return "";
      const parsed = parseFlexibleSlotLine(`${day}.${month}.${year} ${time}`);
      return parsed ? parsed.canonical : "";
    }

    function applyMaskedValue(input, formatter) {
      if (!input) return;
      input.addEventListener("input", () => {
        const start = input.selectionStart;
        const beforeLength = input.value.length;
        input.value = formatter(input.value);
        const delta = input.value.length - beforeLength;
        if (typeof start === "number") {
          const next = Math.max(0, start + delta);
          input.setSelectionRange(next, next);
        }
      });
      input.addEventListener("blur", () => {
        input.value = formatter(input.value);
      });
    }

    function fallbackEventSlot(item) {
      const parts = [];
      if (item.day && monthNames[Number(item.month)]) parts.push(item.day + " " + monthNames[Number(item.month)]);
      if (item.time) parts.push(item.time);
      return parts.join(" ").trim();
    }

    function normalizeJobItem(item, index) {
      const normalized = Object.assign({}, item);
      normalized.key = normalizeStr(item.key) || makeKey("job", item.title || "slot-" + index);
      normalized.title = normalizeStr(item.title);
      normalized.direction = normalizeStr(item.direction);
      normalized.desc = normalizeStr(item.desc);
      normalized.capacity = clampCapacity(item.capacity, 10);
      normalized.slots = normalizeSlots(item.slots, "");
      normalized.note = normalizeStr(item.note);
      return normalized;
    }

    function normalizeEventItem(item, index) {
      const normalized = Object.assign({}, item);
      normalized.key = normalizeStr(item.key) || makeKey("event", item.title || "slot-" + index);
      normalized.title = normalizeStr(item.title);
      normalized.year = Number(item.year) || currentCalendarYear;
      normalized.month = Number(item.month);
      if (!Number.isFinite(normalized.month)) normalized.month = currentCalendarMonth;
      normalized.day = Number(item.day) || 1;
      normalized.time = normalizeStr(item.time);
      normalized.place = normalizeStr(item.place);
      normalized.color = normalizeStr(item.color) || "blue";
      normalized.capacity = clampCapacity(item.capacity, 30);
      normalized.slots = normalizeSlots(item.slots, fallbackEventSlot(normalized));
      normalized.note = normalizeStr(item.note);
      return normalized;
    }

    function normalizeMemberItem(item) {
      return {
        name: normalizeStr(item.name),
        role: normalizeStr(item.role),
        desc: normalizeStr(item.desc),
        photo: normalizeStr(item.photo)
      };
    }

    function normalizeInternshipItem(item, index) {
      return {
        key: normalizeStr(item.key) || makeKey("internship", item.title || "card-" + index),
        title: normalizeStr(item.title),
        company: normalizeStr(item.company),
        desc: normalizeStr(item.desc),
        link: normalizeStr(item.link),
        format: normalizeStr(item.format)
      };
    }

    function normalizeNewsDate(value) {
      const raw = normalizeStr(value).replace(/[^\d]/g, "");
      if (raw.length === 8) return `${raw.slice(0,2)}.${raw.slice(2,4)}.${raw.slice(4)}`;
      const m = normalizeStr(value).match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
      if (m) return `${m[1].padStart(2,"0")}.${m[2].padStart(2,"0")}.${m[3]}`;
      return normalizeStr(value);
    }

    function normalizeNewsItem(item, index) {
      return {
        key: normalizeStr(item.key) || makeKey("news", item.title || "item-" + index),
        title: normalizeStr(item.title),
        summary: normalizeStr(item.summary),
        content: normalizeStr(item.content),
        date: normalizeNewsDate(item.date || ""),
        cover: normalizeStr(item.cover),
        video_url: normalizeStr(item.video_url || item.videoUrl),
        published: item && String(item.published) !== "false"
      };
    }



    function normalizeDirectionItem(item, index) {
      return {
        key: normalizeStr(item.key) || makeKey("direction", item.name || "item-" + index),
        name: normalizeStr(item.name),
        sub: normalizeStr(item.sub),
        desc: normalizeStr(item.desc),
        content: normalizeStr(item.content || item.fullText),
        image: normalizeStr(item.image || item.cover),
        link: normalizeStr(item.link),
        linkLabel: normalizeStr(item.linkLabel || item.buttonLabel || "Открыть материалы")
      };
    }

    function cloneDefaultState() {
      return JSON.parse(JSON.stringify(defaultState));
    }

    function getTargetTypeLabel(type) {
      return type === "event" ? "Событие" : "Запись";
    }

    function getTargetByContext(type, index) {
      return type === "event" ? state.events[index] : state.jobs[index];
    }

    function getSlotCount(targetKey, slot) {
      return slotStatsMap.get(targetKey + "||" + slot) || 0;
    }

    function setButtonLoading(btn, loading, textWhenIdle) {
      if (!btn) return;
      if (loading) {
        btn.disabled = true;
        btn.dataset.prevText = btn.textContent;
        btn.textContent = "Сохранение...";
      } else {
        btn.disabled = false;
        btn.textContent = textWhenIdle || btn.dataset.prevText || btn.textContent;
      }
    }

    function escapeHtml(text) {
      return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function renderSettings() {
      headerTitle.textContent = state.settings.headerTitle;
      headerText.textContent = state.settings.headerText;
      infoTitle.textContent = state.settings.infoTitle;
      infoText.textContent = state.settings.infoText;
      infoMark.textContent = state.settings.infoMark;
      jobsTitle.textContent = state.settings.jobsTitle;
      eventsTitle.textContent = state.settings.eventsTitle;
      teamTitle.textContent = state.settings.teamTitle;
      directionsTitle.textContent = state.settings.directionsTitle;
      if (newsTitle) newsTitle.textContent = state.settings.newsTitle || "Последние новости";
      if (internshipsTitle) internshipsTitle.textContent = state.settings.internshipsTitle || "Стажировки";
    }

    function parseTimeValue(value) {
      const match = String(value || "").match(/(\d{1,2}):(\d{2})/);
      if (!match) return Number.MAX_SAFE_INTEGER;
      return Number(match[1]) * 60 + Number(match[2]);
    }

    function formatBookingDayLabel(year, month, day) {
      return `${day} ${monthNames[month]} ${year}`;
    }

    function parseSlotToDateParts(slot, target, type) {
      const value = normalizeStr(slot);
      if (!value) return null;

      const direct = value.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\D+(\d{1,2}:\d{2}))?$/);
      if (direct) {
        return {
          year: Number(direct[3]),
          month: Number(direct[2]) - 1,
          day: Number(direct[1]),
          time: direct[4] || ""
        };
      }

      const monthMap = {
        "января": 0, "февраля": 1, "марта": 2, "апреля": 3, "мая": 4, "июня": 5,
        "июля": 6, "августа": 7, "сентября": 8, "октября": 9, "ноября": 10, "декабря": 11
      };
      const word = value.toLowerCase().match(/(\d{1,2})\s+(января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря)(?:\s+(\d{4}))?(?:\D+(\d{1,2}:\d{2}))?/i);
      if (word) {
        return {
          year: Number(word[3]) || (type === "event" ? Number(target.year) || currentCalendarYear : currentCalendarYear),
          month: monthMap[word[2].toLowerCase()],
          day: Number(word[1]),
          time: word[4] || ""
        };
      }

      if (type === "event" && Number.isFinite(Number(target.year)) && Number.isFinite(Number(target.month)) && Number.isFinite(Number(target.day))) {
        const timeMatch = value.match(/(\d{1,2}:\d{2})/);
        return {
          year: Number(target.year),
          month: Number(target.month),
          day: Number(target.day),
          time: timeMatch ? timeMatch[1] : normalizeStr(target.time)
        };
      }

      return null;
    }

    function buildBookingCalendarState(target) {
      const groupsMap = new Map();
      const fallbackSlots = [];

      (target?.slots || []).forEach((slot) => {
        const parsed = parseSlotToDateParts(slot, target, bookingContext?.type || "job");
        if (!parsed || !Number.isFinite(parsed.year) || !Number.isFinite(parsed.month) || !Number.isFinite(parsed.day)) {
          fallbackSlots.push(slot);
          return;
        }

        const dayKey = `${parsed.year}-${String(parsed.month + 1).padStart(2, "0")}-${String(parsed.day).padStart(2, "0")}`;
        if (!groupsMap.has(dayKey)) {
          groupsMap.set(dayKey, {
            dayKey,
            year: parsed.year,
            month: parsed.month,
            day: parsed.day,
            label: formatBookingDayLabel(parsed.year, parsed.month, parsed.day),
            items: []
          });
        }
        groupsMap.get(dayKey).items.push({
          slot,
          timeLabel: parsed.time || "Без указания времени",
          sortValue: parseTimeValue(parsed.time)
        });
      });

      const groups = Array.from(groupsMap.values())
        .sort((a, b) => new Date(a.year, a.month, a.day) - new Date(b.year, b.month, b.day))
        .map((group) => {
          group.items.sort((a, b) => a.sortValue - b.sortValue || a.slot.localeCompare(b.slot, 'ru'));
          return group;
        });

      const firstGroup = groups[0] || null;
      const firstDayWithSpace = groups.find((group) => group.items.some((entry) => getSlotCount(target.key, entry.slot) < target.capacity));
      bookingCalendarState = {
        groups,
        fallbackSlots,
        year: firstGroup ? firstGroup.year : currentCalendarYear,
        month: firstGroup ? firstGroup.month : currentCalendarMonth,
        selectedDayKey: firstDayWithSpace ? firstDayWithSpace.dayKey : (firstGroup ? firstGroup.dayKey : "")
      };
    }

    function getSelectedBookingDayGroup() {
      return bookingCalendarState.groups.find((group) => group.dayKey === bookingCalendarState.selectedDayKey) || null;
    }
    function getBookingSlotDisplayMeta(target, slot) {
      const count = getSlotCount(target.key, slot);
      const free = Math.max((target.capacity || 0) - count, 0);
      return {
        count,
        free,
        full: count >= target.capacity,
        text: count >= target.capacity
          ? `Свободных мест нет · занято ${count} из ${target.capacity}`
          : `Свободно ${free} · занято ${count} из ${target.capacity}`
      };
    }

    function renderBookingTimeList() {
      const target = getSelectedBookingTarget();
      const selectedDayGroup = getSelectedBookingDayGroup();
      bookingTimeList.innerHTML = '';
      bookingDayEmpty.classList.add('hidden');

      if (!target) return;

      if (bookingCalendarState.groups.length && !selectedDayGroup) {
        bookingSelectedDayTitle.textContent = 'Выберите дату';
        bookingSelectedDayMeta.textContent = 'Нажмите на день в календаре слева, чтобы увидеть доступное время и количество мест.';
        bookingDayEmpty.classList.remove('hidden');
        bookingDayEmpty.textContent = 'Дата ещё не выбрана.';
        return;
      }

      const dayLabel = selectedDayGroup ? selectedDayGroup.label : 'Доступные варианты записи';
      bookingSelectedDayTitle.textContent = dayLabel;

      const entries = bookingCalendarState.groups.length
        ? (selectedDayGroup ? selectedDayGroup.items : [])
        : (target.slots || []).map((slot) => ({ slot, timeLabel: slot }));

      if (!entries.length) {
        bookingSelectedDayMeta.textContent = 'Для выбранной даты варианты времени пока не добавлены.';
        bookingDayEmpty.classList.remove('hidden');
        bookingDayEmpty.textContent = 'Выберите другую дату или уточните информацию у администратора.';
        return;
      }

      const freeCount = entries.filter((entry) => getSlotCount(target.key, entry.slot) < target.capacity).length;
      bookingSelectedDayMeta.textContent = freeCount
        ? `Доступных вариантов времени: ${freeCount}. Выберите подходящее время в списке ниже.`
        : 'На выбранную дату свободных мест нет. Выберите другую дату.';

      entries.forEach((entry) => {
        const info = getBookingSlotDisplayMeta(target, entry.slot);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'booking-time-item' + (bookingSlotSelect.value === entry.slot ? ' is-selected' : '') + (info.full ? ' is-full' : '');
        btn.disabled = info.full;
        btn.innerHTML = `<span class="booking-time-main"><span class="booking-time-label">${escapeHtml(entry.timeLabel || entry.slot)}</span><span class="booking-time-meta">${escapeHtml(info.text)}</span></span><span>${info.full ? 'Недоступно' : 'Выбрать'}</span>`;
        btn.addEventListener('click', () => {
          bookingSlotSelect.value = entry.slot;
          updateBookingSlotStatus();
        });
        bookingTimeList.appendChild(btn);
      });
    }


    function renderBookingCalendar() {
      bookingCalendarGrid.innerHTML = "";
      bookingCalendarHelp.textContent = "";
      bookingCalendarMonthTitle.textContent = `${monthNames[bookingCalendarState.month] || ""} ${bookingCalendarState.year || ""}`.trim();

      if (!bookingCalendarState.groups.length) {
        bookingCalendarHelp.textContent = bookingCalendarState.fallbackSlots.length
          ? "Для этой записи дата указана без календарного формата. Выберите подходящий вариант времени в списке ниже."
          : "Даты и время для записи пока не добавлены.";
        return;
      }

      const firstDay = new Date(bookingCalendarState.year, bookingCalendarState.month, 1);
      const daysInMonth = new Date(bookingCalendarState.year, bookingCalendarState.month + 1, 0).getDate();
      const startIndex = (firstDay.getDay() + 6) % 7;
      const groupMap = new Map(bookingCalendarState.groups
        .filter((group) => group.year === bookingCalendarState.year && group.month === bookingCalendarState.month)
        .map((group) => [group.day, group]));

      for (let i = 0; i < startIndex; i++) {
        const blank = document.createElement('div');
        blank.className = 'booking-calendar-day empty';
        bookingCalendarGrid.appendChild(blank);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const group = groupMap.get(day);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'booking-calendar-day' + (group ? ' has-slots' : ' empty');

        if (!group) {
          btn.disabled = true;
          btn.innerHTML = `<span>${day}</span>`;
          bookingCalendarGrid.appendChild(btn);
          continue;
        }

        const availableCount = group.items.filter((entry) => getSlotCount(getSelectedBookingTarget().key, entry.slot) < getSelectedBookingTarget().capacity).length;
        if (group.dayKey === bookingCalendarState.selectedDayKey) btn.classList.add('is-selected');
        if (!availableCount) btn.classList.add('is-full');
        btn.innerHTML = `<span>${day}</span><small>${availableCount ? `вариантов: ${availableCount}` : 'мест нет'}</small>`;
        btn.addEventListener('click', () => {
          bookingCalendarState.selectedDayKey = group.dayKey;
          renderBookingCalendar();
          populateBookingSlots();
        });
        bookingCalendarGrid.appendChild(btn);
      }

      if (!groupMap.size) {
        bookingCalendarHelp.textContent = 'В этом месяце нет доступных дат для записи.';
      }
    }

    function renderPhotoPreview(src) {
      const value = normalizeStr(src);
      if (!value) {
        memberPhotoPreviewWrap.classList.add("hidden");
        memberPhotoPreview.style.backgroundImage = "";
        memberPhotoPreview.textContent = "Фото";
        return;
      }
      memberPhotoPreviewWrap.classList.remove("hidden");
      memberPhotoPreview.style.backgroundImage = "url('" + value.replace(/'/g, "%27") + "')";
      memberPhotoPreview.textContent = "";
    }

    function renderTeam() {
      if (!state.members.length) {
        teamGrid.innerHTML = '<div class="muted-text">Список сотрудников пока пуст.</div>';
        return;
      }

      teamGrid.innerHTML = state.members.map((item) => {
        const initials = item.name.split(" ").map(x => x[0]).slice(0,2).join("").toUpperCase();
        const photoStyle = item.photo ? `style="background-image:url('${item.photo.replace(/'/g, "%27")}')"` : "";
        return `
          <div class="team-card">
            <div class="team-top">
              <div class="team-photo" ${photoStyle}>${item.photo ? "" : initials}</div>
              <div>
                <h3 class="team-name">${escapeHtml(item.name)}</h3>
                <p class="team-role">${escapeHtml(item.role)}</p>
              </div>
            </div>
            <p class="team-desc">${escapeHtml(item.desc)}</p>
          </div>
        `;
      }).join("");
    }

    function renderSlotChips(item) {
      if (!item.slots.length) {
        return '<div class="booking-note">Дата и время для записи пока не добавлены.</div>';
      }
      return `<div class="slot-list">${
        item.slots.map((slot) => {
          const count = getSlotCount(item.key, slot);
          const full = count >= item.capacity;
          return `<div class="slot-chip${full ? " full" : ""}"><span>${escapeHtml(slot)}</span><span>${full ? "Мест нет" : `${count}/${item.capacity}`}</span></div>`;
        }).join("")
      }</div>`;
    }

    function renderJobs() {
      if (!state.jobs.length) {
        jobsGrid.innerHTML = '<div class="muted-text">Варианты записи пока не добавлены.</div>';
        return;
      }

      jobsGrid.innerHTML = state.jobs.map((item, index) => `
        <div class="job-card">
          <div class="job-tag">${escapeHtml(item.direction || "Запись")}</div>
          <h3 class="job-title">${escapeHtml(item.title)}</h3>
          <p class="job-text">${escapeHtml(item.desc || "Описание пока не добавлено.")}</p>
          <div class="booking-meta">Количество мест на одну дату и время: ${escapeHtml(String(item.capacity || 0))}</div>
          ${item.note ? `<div class="booking-note">${escapeHtml(item.note)}</div>` : ""}
          <button class="job-btn" type="button" onclick="openBookingModalByType('job', ${index})">Записаться</button>
        </div>
      `).join("");
    }

    function formatNewsDateDisplay(value) {
      const normalized = normalizeNewsDate(value);
      return normalized || "Дата не указана";
    }

    function newsDateToSortableValue(value) {
      const normalized = normalizeNewsDate(value);
      const match = normalized.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
      if (!match) return 0;
      return Number(match[3] + match[2] + match[1]);
    }

    function getPublishedNews(limit) {
      const items = state.news.filter((item) => item.published).sort((a, b) => newsDateToSortableValue(b.date) - newsDateToSortableValue(a.date));
      return typeof limit === 'number' ? items.slice(0, limit) : items;
    }

    function renderLatestNews() {
      if (!newsGrid) return;
      const items = getPublishedNews(3);
      if (!items.length) {
        newsGrid.innerHTML = '<div class="muted-text">Новости пока не опубликованы.</div>';
        return;
      }
      newsGrid.innerHTML = items.map((item) => `
        <article class="news-card">
          <div class="news-card-media"${item.cover ? ` style="background-image:url('${item.cover.replace(/'/g, "%27")}')"` : ''}>${item.cover ? '' : 'Новость'}</div>
          <div class="news-card-body">
            <div class="news-card-date">${escapeHtml(formatNewsDateDisplay(item.date))}</div>
            <h3 class="news-card-title">${escapeHtml(item.title)}</h3>
            <div class="news-card-text rich-text">${renderRichText(item.summary || 'Краткое описание пока не добавлено.')}</div>
            <div class="news-card-actions">
              <a class="direction-link" href="news.html?news=${encodeURIComponent(item.key)}">Открыть новость</a>
              ${item.video_url ? '<span class="news-video-mark">Есть видео</span>' : ''}
            </div>
          </div>
        </article>
      `).join('');
    }

    function renderInternships() {
      if (!internshipsGrid) return;
      if (!state.internships.length) {
        internshipsGrid.innerHTML = '<div class="muted-text">Стажировки пока не добавлены.</div>';
        return;
      }
      internshipsGrid.innerHTML = state.internships.map((item) => `
        <div class="job-card internship-card">
          <div class="job-tag">${escapeHtml(item.company || 'Стажировка')}</div>
          <h3 class="job-title">${escapeHtml(item.title)}</h3>
          <p class="job-text">${escapeHtml(item.desc || 'Описание пока не добавлено.')}</p>
          ${item.format ? `<div class="booking-note">${escapeHtml(item.format)}</div>` : ''}
          <a class="job-btn" href="${safeLink(item.link)}" target="_blank" rel="noopener noreferrer">Подробнее</a>
        </div>
      `).join('');
    }

    function renderDirections() {
      if (!state.directions.length) {
        directionsGrid.innerHTML = '<div class="muted-text">Направления пока не добавлены.</div>';
        return;
      }

      directionsGrid.innerHTML = state.directions.map((item) => `
        <div class="direction-card">
          <div class="direction-top">
            <h3 class="direction-title">${escapeHtml(item.name)}</h3>
            <p class="direction-sub">${escapeHtml(item.sub || "")}</p>
          </div>
          <div class="direction-body">
            <p>${escapeHtml(item.desc || "Описание пока не добавлено.")}</p>
            <a class="direction-link" href="directions.html?direction=${encodeURIComponent(item.key)}">Открыть страницу направления</a>
          </div>
        </div>
      `).join("");
    }

    function getEventsForDay(year, month, day) {
      return state.events.filter((item) => item.year === year && item.month === month && item.day === day);
    }

    function openDayEventsModal(year, month, day) {
      const events = getEventsForDay(year, month, day);
      if (!events.length) return;

      document.getElementById("dayEventsTitle").textContent = `${day} ${monthNames[month]} ${year}`;
      document.getElementById("dayEventsList").innerHTML = events.map((item) => {
        const index = state.events.findIndex((x) => x.key === item.key);
        return `
          <div class="day-event-card">
            <h3 class="item-title" style="margin-bottom:6px;">${escapeHtml(item.title)}</h3>
            <div class="day-event-meta">
              <div><b>Время:</b> ${escapeHtml(item.time || "Не указано")}</div>
              <div><b>Описание:</b> ${escapeHtml(item.place || "Не указано")}</div>
              <div><b>Количество мест:</b> ${escapeHtml(String(item.capacity || 0))}</div>
            </div>
            ${item.note ? `<div class="booking-note">${escapeHtml(item.note)}</div>` : ""}
            <button class="job-btn" type="button" onclick="openBookingModalByType('event', ${index})">Записаться на это событие</button>
          </div>
        `;
      }).join("");

      dayEventsModal.classList.add("show");
    }

    function renderCalendar() {
      calendarMonthTitle.textContent = `${monthNames[currentCalendarMonth]} ${currentCalendarYear}`;
      calendarGrid.innerHTML = "";

      const firstDate = new Date(currentCalendarYear, currentCalendarMonth, 1);
      const daysInMonth = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
      let startWeekday = firstDate.getDay();
      if (startWeekday === 0) startWeekday = 7;

      const totalCells = 42;
      const prevMonthDays = new Date(currentCalendarYear, currentCalendarMonth, 0).getDate();

      for (let i = 1; i <= totalCells; i++) {
        let dayNumber = 0;
        let cellMonth = currentCalendarMonth;
        let cellYear = currentCalendarYear;
        let muted = false;

        if (i < startWeekday) {
          dayNumber = prevMonthDays - (startWeekday - i - 1);
          cellMonth = currentCalendarMonth - 1;
          if (cellMonth < 0) { cellMonth = 11; cellYear--; }
          muted = true;
        } else if (i >= startWeekday + daysInMonth) {
          dayNumber = i - (startWeekday + daysInMonth) + 1;
          cellMonth = currentCalendarMonth + 1;
          if (cellMonth > 11) { cellMonth = 0; cellYear++; }
          muted = true;
        } else {
          dayNumber = i - startWeekday + 1;
        }

        const events = getEventsForDay(cellYear, cellMonth, dayNumber);
        const day = document.createElement("div");
        day.className = `day${muted ? " muted" : ""}${events.length ? " has-events" : ""}`;
        day.innerHTML = `
          <div class="day-number">${dayNumber}</div>
          <div class="day-events">
            ${events.slice(0, 2).map((item) => `<div class="mini-event event-${item.color || "blue"}">${item.time ? escapeHtml(item.time) + " · " : ""}${escapeHtml(item.title)}</div>`).join("")}
            ${events.length > 2 ? `<span class="event-more">+ ещё ${events.length - 2}</span>` : ""}
          </div>
        `;

        if (!muted && events.length) {
          day.addEventListener("click", () => openDayEventsModal(cellYear, cellMonth, dayNumber));
        }

        calendarGrid.appendChild(day);
      }
    }

    function fillMonthSelect() {
      eventMonth.innerHTML = monthNames.map((name, index) => `<option value="${index}">${name}</option>`).join("");
    }

    function fillSettingsForm() {
      sHeaderTitle.value = state.settings.headerTitle || "";
      sHeaderText.value = state.settings.headerText || "";
      sInfoTitle.value = state.settings.infoTitle || "";
      sInfoText.value = state.settings.infoText || "";
      sInfoMark.value = state.settings.infoMark || "";
      sJobsTitle.value = state.settings.jobsTitle || "";
      sEventsTitle.value = state.settings.eventsTitle || "";
      sTeamTitle.value = state.settings.teamTitle || "";
      sDirectionsTitle.value = state.settings.directionsTitle || "";
      if (sNewsTitle) sNewsTitle.value = state.settings.newsTitle || "";
      if (sInternshipsTitle) sInternshipsTitle.value = state.settings.internshipsTitle || "";
    }

    async function saveStateToDatabase(options = {}) {
      const silent = !!options.silent;
      if (!silent) {
        adminSuccess.textContent = "";
        adminError.textContent = "";
      }

      const { data: { session } } = await sb.auth.getSession();
      const profile = await fetchProfile(session);

      if (!session || !profile || profile.role !== "admin") {
        if (!silent) adminError.textContent = "Нет доступа к админке. Войдите под аккаунтом с ролью admin.";
        return false;
      }

      const payload = {
        id: 1,
        content: state
      };

      const { error } = await sb
        .from("site_content")
        .upsert(payload, { onConflict: "id" });

      if (error) {
        if (!silent) adminError.textContent = error.message || "Ошибка сохранения";
        return false;
      }

      if (!silent) adminSuccess.textContent = "Изменения сохранены в базу.";
      return true;
    }

    async function persistAfterAdminEdit(button) {
      if (!currentProfile || currentProfile.role !== "admin") return;
      setButtonLoading(button, true);
      try {
        const ok = await saveStateToDatabase({ silent: false });
        if (ok) {
          await refreshSlotStats();
        }
      } finally {
        setButtonLoading(button, false);
      }
    }

    function applySettingsFromForm() {
      state.settings.headerTitle = normalizeStr(sHeaderTitle.value);
      state.settings.headerText = normalizeStr(sHeaderText.value);
      state.settings.infoTitle = normalizeStr(sInfoTitle.value);
      state.settings.infoText = normalizeStr(sInfoText.value);
      state.settings.infoMark = normalizeStr(sInfoMark.value);
      state.settings.jobsTitle = normalizeStr(sJobsTitle.value);
      state.settings.eventsTitle = normalizeStr(sEventsTitle.value);
      state.settings.teamTitle = normalizeStr(sTeamTitle.value);
      state.settings.directionsTitle = normalizeStr(sDirectionsTitle.value);
      if (sNewsTitle) state.settings.newsTitle = normalizeStr(sNewsTitle.value);
      if (sInternshipsTitle) state.settings.internshipsTitle = normalizeStr(sInternshipsTitle.value);
      renderSettings();
    }

    function slotsToTextarea(slots) {
      return Array.isArray(slots) ? slots.join("\n") : "";
    }

    function clearJobForm() {
      editingJobIndex = null;
      jobTitleInput.value = "";
      jobDirection.value = "";
      jobDesc.value = "";
      jobCapacity.value = "10";
      jobSlots.value = "";
      jobNote.value = "";
      jobEditNote.textContent = "";
      document.getElementById("saveJobBtn").textContent = "Сохранить запись";
    }

    function clearEventForm() {
      editingEventIndex = null;
      eventTitleInput.value = "";
      eventYear.value = currentCalendarYear;
      eventMonth.value = currentCalendarMonth;
      eventDate.value = "";
      eventTime.value = "";
      eventPlace.value = "";
      eventCapacity.value = "30";
      eventSlots.value = "";
      eventNote.value = "";
      eventColor.value = "blue";
      eventEditNote.textContent = "";
      document.getElementById("saveEventBtn").textContent = "Сохранить событие";
    }

    function clearMemberForm() {
      editingMemberIndex = null;
      pendingMemberPhotoData = "";
      memberName.value = "";
      memberRole.value = "";
      memberDesc.value = "";
      memberPhoto.value = "";
      memberPhotoFile.value = "";
      memberPhotoStatus.textContent = "Можно вставить ссылку или выбрать файл. Файл сохранится прямо в content сайта.";
      renderPhotoPreview("");
      memberEditNote.textContent = "";
      document.getElementById("saveMemberBtn").textContent = "Сохранить сотрудника";
    }

    function clearDirectionForm() {
      editingDirectionIndex = null;
      directionName.value = "";
      directionSub.value = "";
      directionDesc.value = "";
      directionContent.value = "";
      directionImage.value = "";
      directionLink.value = "";
      directionLinkLabel.value = "";
      directionEditNote.textContent = "";
      document.getElementById("saveDirectionBtn").textContent = "Сохранить направление";
    }

    async function saveJobLocal() {
      const saveBtn = document.getElementById("saveJobBtn");
      jobSlots.value = formatSlotTextareaValue(jobSlots.value);
      const item = normalizeJobItem({
        key: editingJobIndex === null ? "" : state.jobs[editingJobIndex].key,
        title: jobTitleInput.value,
        direction: jobDirection.value,
        desc: jobDesc.value,
        capacity: jobCapacity.value,
        slots: jobSlots.value,
        note: jobNote.value
      }, editingJobIndex);

      if (!item.title) return;
      if (!item.slots.length) {
        adminError.textContent = "Для записи нужно указать хотя бы одну дату и время.";
        return;
      }
      if (item.slots.some((slot) => !parseFlexibleSlotLine(slot))) {
        adminError.textContent = "Проверьте даты и время для записи. Используйте формат ДД.ММ.ГГГГ ЧЧ:ММ, например 15.04.2026 12:00.";
        return;
      }

      if (editingJobIndex === null) state.jobs.push(item);
      else state.jobs[editingJobIndex] = item;

      clearJobForm();
      renderJobs();
      renderJobsAdminList();
      await persistAfterAdminEdit(saveBtn);
    }

    async function saveEventLocal() {
      const saveBtn = document.getElementById("saveEventBtn");
      eventTime.value = normalizeTimeMaskValue(eventTime.value);
      if (!normalizeStr(eventSlots.value)) {
        const generatedSlot = buildEventSlotFromFields();
        if (generatedSlot) eventSlots.value = generatedSlot;
      } else {
        eventSlots.value = formatSlotTextareaValue(eventSlots.value);
      }
      const item = normalizeEventItem({
        key: editingEventIndex === null ? "" : state.events[editingEventIndex].key,
        title: eventTitleInput.value,
        year: eventYear.value,
        month: eventMonth.value,
        day: eventDate.value,
        time: eventTime.value,
        place: eventPlace.value,
        capacity: eventCapacity.value,
        slots: eventSlots.value,
        note: eventNote.value,
        color: eventColor.value
      }, editingEventIndex);

      if (!item.title || !item.day) return;
      if (!item.slots.length) {
        adminError.textContent = "Для события нужно указать хотя бы одну дату и время.";
        return;
      }
      if (item.slots.some((slot) => !parseFlexibleSlotLine(slot))) {
        adminError.textContent = "Проверьте даты и время для события. Используйте формат ДД.ММ.ГГГГ ЧЧ:ММ, например 18.04.2026 14:00.";
        return;
      }

      if (editingEventIndex === null) state.events.push(item);
      else state.events[editingEventIndex] = item;

      clearEventForm();
      renderCalendar();
      renderEventsAdminList();
      await persistAfterAdminEdit(saveBtn);
    }

    async function saveMemberLocal() {
      const saveBtn = document.getElementById("saveMemberBtn");
      const item = normalizeMemberItem({
        name: memberName.value,
        role: memberRole.value,
        desc: memberDesc.value,
        photo: pendingMemberPhotoData || memberPhoto.value
      });
      if (!item.name) return;

      if (editingMemberIndex === null) state.members.push(item);
      else state.members[editingMemberIndex] = item;

      clearMemberForm();
      renderTeam();
      renderMembersAdminList();
      await persistAfterAdminEdit(saveBtn);
    }

    async function saveDirectionLocal() {
      const saveBtn = document.getElementById("saveDirectionBtn");
      const item = {
        key: editingDirectionIndex === null ? makeKey("direction", directionName.value || "direction") : (state.directions[editingDirectionIndex] && state.directions[editingDirectionIndex].key) || makeKey("direction", directionName.value || "direction"),
        name: normalizeStr(directionName.value),
        sub: normalizeStr(directionSub.value),
        desc: normalizeStr(directionDesc.value),
        content: normalizeStr(directionContent.value),
        image: normalizeStr(directionImage.value),
        link: safeLink(directionLink.value),
        linkLabel: normalizeStr(directionLinkLabel.value) || "Открыть материалы"
      };
      if (!item.name) return;

      if (editingDirectionIndex === null) state.directions.push(item);
      else state.directions[editingDirectionIndex] = item;

      clearDirectionForm();
      renderDirections();
      renderDirectionsAdminList();
      await persistAfterAdminEdit(saveBtn);
    }

    function renderJobsAdminList() {
      const root = document.getElementById("jobsAdminList");
      root.innerHTML = state.jobs.map((item, index) => `
        <div class="item">
          <h4 class="item-title">${escapeHtml(item.title)}</h4>
          <p class="item-text"><b>Категория:</b> ${escapeHtml(item.direction || "—")}</p>
          <p class="item-text">${escapeHtml(item.desc || "—")}</p>
          <p class="item-text"><b>Количество мест:</b> ${item.capacity}</p>
          <p class="item-text"><b>Даты и время:</b> ${item.slots.length ? item.slots.map(escapeHtml).join(" • ") : "—"}</p>
          <p class="item-text"><b>Подсказка:</b> ${escapeHtml(item.note || "—")}</p>
          <div class="item-actions">
            <button class="small-btn" type="button" onclick="startEditJob(${index})">Редактировать</button>
            <button class="small-btn delete" type="button" onclick="deleteJob(${index})">Удалить</button>
          </div>
        </div>
      `).join("");
    }

    function renderEventsAdminList() {
      const root = document.getElementById("eventsAdminList");
      root.innerHTML = state.events.map((item, index) => `
        <div class="item">
          <h4 class="item-title">${escapeHtml(item.title)}</h4>
          <p class="item-text"><b>Дата:</b> ${item.day} ${monthNames[item.month]} ${item.year}</p>
          <p class="item-text"><b>Время:</b> ${escapeHtml(item.time || "—")}</p>
          <p class="item-text"><b>Описание:</b> ${escapeHtml(item.place || "—")}</p>
          <p class="item-text"><b>Количество мест:</b> ${item.capacity}</p>
          <p class="item-text"><b>Даты и время:</b> ${item.slots.length ? item.slots.map(escapeHtml).join(" • ") : "—"}</p>
          <p class="item-text"><b>Подсказка:</b> ${escapeHtml(item.note || "—")}</p>
          <div class="item-actions">
            <button class="small-btn" type="button" onclick="startEditEvent(${index})">Редактировать</button>
            <button class="small-btn delete" type="button" onclick="deleteEvent(${index})">Удалить</button>
          </div>
        </div>
      `).join("");
    }

    function renderMembersAdminList() {
      const root = document.getElementById("membersAdminList");
      root.innerHTML = state.members.map((item, index) => `
        <div class="item">
          <h4 class="item-title">${escapeHtml(item.name)}</h4>
          <p class="item-text"><b>Должность:</b> ${escapeHtml(item.role || "—")}</p>
          <p class="item-text">${escapeHtml(item.desc || "—")}</p>
          <p class="item-text"><b>Фото:</b> ${item.photo ? "задано" : "—"}</p>
          <div class="item-actions">
            <button class="small-btn" type="button" onclick="startEditMember(${index})">Редактировать</button>
            <button class="small-btn delete" type="button" onclick="deleteMember(${index})">Удалить</button>
          </div>
        </div>
      `).join("");
    }

    function renderDirectionsAdminList() {
      const root = document.getElementById("directionsAdminList");
      root.innerHTML = state.directions.map((item, index) => `
        <div class="item">
          <h4 class="item-title">${escapeHtml(item.name)}</h4>
          <p class="item-text"><b>Подпись:</b> ${escapeHtml(item.sub || "—")}</p>
          <p class="item-text">${escapeHtml(item.desc || "—")}</p>
          <p class="item-text"><b>Материалы:</b> ${escapeHtml(item.link || "—")}</p>
          <p class="item-text"><b>Подробная страница:</b> directions.html?direction=${encodeURIComponent(item.key || "")}</p>
          <div class="item-actions">
            <button class="small-btn" type="button" onclick="startEditDirection(${index})">Редактировать</button>
            <button class="small-btn delete" type="button" onclick="deleteDirection(${index})">Удалить</button>
          </div>
        </div>
      `).join("");
    }

    function renderAll() {
      renderSettings();
      renderTeam();
      renderJobs();
      renderLatestNews();
      renderInternships();
      renderDirections();
      renderCalendar();
      fillSettingsForm();
      renderJobsAdminList();
      renderEventsAdminList();
      renderNewsAdminList();
      renderMembersAdminList();
      renderInternshipsAdminList();
      renderDirectionsAdminList();
    }


    function clearNewsForm() {
      editingNewsIndex = null;
      newsTitleInput.value = '';
      newsDateInput.value = '';
      newsSummaryInput.value = '';
      newsContentInput.value = '';
      newsCoverInput.value = '';
      newsVideoInput.value = '';
      newsPublishedInput.value = 'true';
      newsEditNote.textContent = '';
      const btn = document.getElementById('saveNewsBtn');
      if (btn) btn.textContent = 'Сохранить новость';
    }

    async function saveNewsLocal() {
      const saveBtn = document.getElementById('saveNewsBtn');
      const item = normalizeNewsItem({
        key: editingNewsIndex !== null ? state.news[editingNewsIndex].key : makeKey('news', newsTitleInput.value),
        title: newsTitleInput.value,
        summary: newsSummaryInput.value,
        content: newsContentInput.value,
        date: newsDateInput.value,
        cover: newsCoverInput.value,
        video_url: newsVideoInput.value,
        published: newsPublishedInput.value === 'true'
      }, editingNewsIndex !== null ? editingNewsIndex : state.news.length);
      if (!item.title) { adminError.textContent = 'Укажите заголовок новости.'; return; }
      if (editingNewsIndex !== null) state.news[editingNewsIndex] = item; else state.news.unshift(item);
      renderLatestNews();
      renderNewsAdminList();
      clearNewsForm();
      await persistAfterAdminEdit(saveBtn);
    }

    function renderNewsAdminList() {
      const box = document.getElementById('newsAdminList');
      if (!box) return;
      if (!state.news.length) { box.innerHTML = '<div class="muted-text">Новости пока не добавлены.</div>'; return; }
      box.innerHTML = state.news.map((item, index) => `
        <div class="item">
          <h4 class="item-title">${escapeHtml(item.title || 'Без названия')}</h4>
          <p class="item-text"><b>Дата:</b> ${escapeHtml(formatNewsDateDisplay(item.date))}</p>
          <p class="item-text"><b>Статус:</b> ${item.published ? 'Опубликовано' : 'Черновик'}</p>
          <div class="item-actions">
            <button class="small-btn" type="button" onclick="startEditNews(${index})">Редактировать</button>
            <button class="small-btn delete" type="button" onclick="deleteNews(${index})">Удалить</button>
          </div>
        </div>
      `).join('');
    }

    function startEditNews(index) {
      setAdminSection('news');
      const item = state.news[index];
      editingNewsIndex = index;
      newsTitleInput.value = item.title;
      newsDateInput.value = item.date;
      newsSummaryInput.value = item.summary;
      newsContentInput.value = item.content;
      newsCoverInput.value = item.cover;
      newsVideoInput.value = item.video_url;
      newsPublishedInput.value = item.published ? 'true' : 'false';
      newsEditNote.textContent = `Редактируется новость #${index + 1}`;
      const btn = document.getElementById('saveNewsBtn');
      if (btn) btn.textContent = 'Обновить новость';
    }

    async function deleteNews(index) {
      state.news.splice(index, 1);
      renderLatestNews();
      renderNewsAdminList();
      clearNewsForm();
      await saveStateToDatabase({ silent: false });
    }

    function clearInternshipForm() {
      editingInternshipIndex = null;
      internshipTitleInput.value = '';
      internshipCompanyInput.value = '';
      internshipDescInput.value = '';
      internshipLinkInput.value = '';
      internshipFormatInput.value = '';
      internshipEditNote.textContent = '';
      const btn = document.getElementById('saveInternshipBtn');
      if (btn) btn.textContent = 'Сохранить стажировку';
    }

    async function saveInternshipLocal() {
      const saveBtn = document.getElementById('saveInternshipBtn');
      const item = normalizeInternshipItem({
        key: editingInternshipIndex !== null ? state.internships[editingInternshipIndex].key : makeKey('internship', internshipTitleInput.value),
        title: internshipTitleInput.value,
        company: internshipCompanyInput.value,
        desc: internshipDescInput.value,
        link: internshipLinkInput.value,
        format: internshipFormatInput.value
      }, editingInternshipIndex !== null ? editingInternshipIndex : state.internships.length);
      if (!item.title) { adminError.textContent = 'Укажите название стажировки.'; return; }
      if (editingInternshipIndex !== null) state.internships[editingInternshipIndex] = item; else state.internships.unshift(item);
      renderInternships();
      renderInternshipsAdminList();
      clearInternshipForm();
      await persistAfterAdminEdit(saveBtn);
    }

    function renderInternshipsAdminList() {
      const box = document.getElementById('internshipsAdminList');
      if (!box) return;
      if (!state.internships.length) { box.innerHTML = '<div class="muted-text">Стажировки пока не добавлены.</div>'; return; }
      box.innerHTML = state.internships.map((item, index) => `
        <div class="item">
          <h4 class="item-title">${escapeHtml(item.title || 'Без названия')}</h4>
          <p class="item-text"><b>Организация:</b> ${escapeHtml(item.company || 'Не указана')}</p>
          <p class="item-text">${escapeHtml(item.format || '')}</p>
          <div class="item-actions">
            <button class="small-btn" type="button" onclick="startEditInternship(${index})">Редактировать</button>
            <button class="small-btn delete" type="button" onclick="deleteInternship(${index})">Удалить</button>
          </div>
        </div>
      `).join('');
    }

    function startEditInternship(index) {
      setAdminSection('internships');
      const item = state.internships[index];
      editingInternshipIndex = index;
      internshipTitleInput.value = item.title;
      internshipCompanyInput.value = item.company;
      internshipDescInput.value = item.desc;
      internshipLinkInput.value = item.link;
      internshipFormatInput.value = item.format;
      internshipEditNote.textContent = `Редактируется стажировка #${index + 1}`;
      const btn = document.getElementById('saveInternshipBtn');
      if (btn) btn.textContent = 'Обновить стажировку';
    }

    async function deleteInternship(index) {
      state.internships.splice(index, 1);
      renderInternships();
      renderInternshipsAdminList();
      clearInternshipForm();
      await saveStateToDatabase({ silent: false });
    }

    function startEditJob(index) {
      setAdminSection("jobs");
      const item = state.jobs[index];
      editingJobIndex = index;
      jobTitleInput.value = item.title;
      jobDirection.value = item.direction;
      jobDesc.value = item.desc;
      jobCapacity.value = item.capacity;
      jobSlots.value = formatSlotTextareaValue(slotsToTextarea(item.slots));
      jobNote.value = item.note || "";
      jobEditNote.textContent = `Редактируется вариант записи #${index + 1}`;
      document.getElementById("saveJobBtn").textContent = "Обновить запись";
    }

    function startEditEvent(index) {
      setAdminSection("events");
      const item = state.events[index];
      editingEventIndex = index;
      eventTitleInput.value = item.title;
      eventYear.value = item.year;
      eventMonth.value = item.month;
      eventDate.value = pad2(item.day);
      eventTime.value = normalizeTimeMaskValue(item.time);
      eventPlace.value = item.place;
      eventCapacity.value = item.capacity;
      eventSlots.value = formatSlotTextareaValue(slotsToTextarea(item.slots));
      eventNote.value = item.note || "";
      eventColor.value = item.color;
      eventEditNote.textContent = `Редактируется событие #${index + 1}`;
      document.getElementById("saveEventBtn").textContent = "Обновить событие";
    }

    function startEditMember(index) {
      setAdminSection("members");
      const item = state.members[index];
      editingMemberIndex = index;
      pendingMemberPhotoData = "";
      memberName.value = item.name;
      memberRole.value = item.role;
      memberDesc.value = item.desc;
      memberPhoto.value = item.photo || "";
      memberPhotoFile.value = "";
      memberPhotoStatus.textContent = item.photo ? "Текущее фото загружено. Можно заменить ссылкой или новым файлом." : "Можно вставить ссылку или выбрать файл. Файл сохранится прямо в content сайта.";
      renderPhotoPreview(item.photo || "");
      memberEditNote.textContent = `Редактируется сотрудник #${index + 1}`;
      document.getElementById("saveMemberBtn").textContent = "Обновить сотрудника";
    }

    function startEditDirection(index) {
      setAdminSection("directions");
      const item = state.directions[index];
      editingDirectionIndex = index;
      directionName.value = item.name;
      directionSub.value = item.sub;
      directionDesc.value = item.desc;
      directionContent.value = item.content || "";
      directionImage.value = item.image || "";
      directionLink.value = item.link || "";
      directionLinkLabel.value = item.linkLabel || "Открыть материалы";
      directionEditNote.textContent = `Редактируется направление #${index + 1}`;
      document.getElementById("saveDirectionBtn").textContent = "Обновить направление";
    }

    async function deleteJob(index) {
      state.jobs.splice(index, 1);
      if (editingJobIndex === index) clearJobForm();
      renderJobs();
      renderJobsAdminList();
      await persistAfterAdminEdit();
    }

    async function deleteEvent(index) {
      state.events.splice(index, 1);
      if (editingEventIndex === index) clearEventForm();
      renderCalendar();
      renderEventsAdminList();
      await persistAfterAdminEdit();
    }

    async function deleteMember(index) {
      state.members.splice(index, 1);
      if (editingMemberIndex === index) clearMemberForm();
      renderTeam();
      renderMembersAdminList();
      await persistAfterAdminEdit();
    }

    async function deleteDirection(index) {
      state.directions.splice(index, 1);
      if (editingDirectionIndex === index) clearDirectionForm();
      renderDirections();
      renderDirectionsAdminList();
      await persistAfterAdminEdit();
    }

    async function fetchProfile(session) {
      if (!session) return null;
      const { data, error } = await sb
        .from("profiles")
        .select("id,email,role")
        .eq("id", session.user.id)
        .single();

      if (error) return null;
      return data;
    }

    async function updateAuthUI() {
      const { data: { session } } = await sb.auth.getSession();
      currentProfile = await fetchProfile(session);

      if (!session) {
        accountOpenBtn.textContent = "Войти";
        logoutTopBtn.classList.add("hidden");
        openAdminBtn.classList.add("hidden");
        openRegistrationsTopBtn.classList.add("hidden");
        openMyRegistrationsBtn.classList.add("hidden");
        accountInfoText.textContent = "";
        loginView.classList.remove("hidden");
        accountView.classList.add("hidden");
        return;
      }

      accountOpenBtn.textContent = "Аккаунт";
      logoutTopBtn.classList.remove("hidden");
      accountInfoText.textContent = `Вы вошли как ${currentProfile?.email || session.user.email}. Роль: ${currentProfile?.role || "не определена"}`;
      loginView.classList.add("hidden");
      accountView.classList.remove("hidden");
      openAdminBtn.classList.toggle("hidden", currentProfile?.role !== "admin");
      openRegistrationsTopBtn.classList.toggle("hidden", currentProfile?.role !== "admin");
      openMyRegistrationsBtn.classList.remove("hidden");

      if (bookingFullName && !normalizeStr(bookingFullName.value)) {
        bookingFullName.value = normalizeStr(currentProfile?.full_name || session.user.user_metadata?.full_name || session.user.user_metadata?.name);
      }
      if (bookingEmail && !normalizeStr(bookingEmail.value)) {
        bookingEmail.value = normalizeStr(currentProfile?.email || session.user.email);
      }
    }

    async function login() {
      loginError.textContent = "";
      const email = normalizeStr(emailInput.value);
      const password = passwordInput.value;

      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) {
        loginError.textContent = error.message || "Ошибка входа";
        return;
      }

      accountModal.classList.remove("show");
      passwordInput.value = "";
      await updateAuthUI();
    }

    async function logout() {
      await sb.auth.signOut();
      adminModal.classList.remove("show");
      accountModal.classList.remove("show");
      registrationsModal.classList.remove("show");
      await updateAuthUI();
    }

    async function loadStateFromDatabase() {
      const { data, error } = await sb
        .from("site_content")
        .select("content")
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        showRuntimeError("Ошибка чтения site_content: " + (error.message || error));
        state = cloneDefaultState();
        renderAll();
        return;
      }

      if (data && data.content) {
        const raw = data.content;
        state = {
          settings: Object.assign({}, defaultState.settings, raw.settings || {}),
          jobs: Array.isArray(raw.jobs) ? raw.jobs.map(normalizeJobItem) : cloneDefaultState().jobs.map(normalizeJobItem),
          internships: Array.isArray(raw.internships) ? raw.internships.map(normalizeInternshipItem) : cloneDefaultState().internships.map(normalizeInternshipItem),
          events: Array.isArray(raw.events) ? raw.events.map(normalizeEventItem) : cloneDefaultState().events.map(normalizeEventItem),
          news: Array.isArray(raw.news) ? raw.news.map(normalizeNewsItem) : cloneDefaultState().news.map(normalizeNewsItem),
          members: Array.isArray(raw.members) ? raw.members.map(normalizeMemberItem) : cloneDefaultState().members,
          directions: Array.isArray(raw.directions) ? raw.directions.map(normalizeDirectionItem) : cloneDefaultState().directions.map(normalizeDirectionItem)
        };
      } else {
        state = {
          settings: Object.assign({}, defaultState.settings),
          jobs: cloneDefaultState().jobs.map(normalizeJobItem),
          internships: cloneDefaultState().internships.map(normalizeInternshipItem),
          events: cloneDefaultState().events.map(normalizeEventItem),
          news: cloneDefaultState().news.map(normalizeNewsItem),
          members: cloneDefaultState().members.map(normalizeMemberItem),
          directions: cloneDefaultState().directions.map(normalizeDirectionItem)
        };
      }

      const firstEvent = state.events[0];
      if (firstEvent) {
        currentCalendarYear = Number(firstEvent.year) || currentCalendarYear;
        currentCalendarMonth = Number(firstEvent.month) || currentCalendarMonth;
      }

      renderAll();
    }

    async function refreshSlotStats() {
      const { data, error } = await sb
        .from("registration_slot_stats")
        .select("target_key,selected_slot,registrations_count");

      if (error) {
        slotStatsMap = new Map();
        return;
      }

      const nextMap = new Map();
      (data || []).forEach((row) => {
        nextMap.set(String(row.target_key) + "||" + String(row.selected_slot), Number(row.registrations_count) || 0);
      });
      slotStatsMap = nextMap;
      renderJobs();
      renderCalendar();
      if (bookingContext) populateBookingSlots();
      if (registrationsModal.classList.contains("show")) renderRegistrationsTable();
    }

    function getSelectedBookingTarget() {
      if (!bookingContext) return null;
      return getTargetByContext(bookingContext.type, bookingContext.index);
    }

    function populateBookingSlots() {
      const target = getSelectedBookingTarget();
      if (!target) return;

      const selectedDayGroup = getSelectedBookingDayGroup();
      const optionsSource = bookingCalendarState.groups.length
        ? (selectedDayGroup ? selectedDayGroup.items.map((entry) => entry.slot) : [])
        : target.slots;

      if (!optionsSource.length) {
        bookingSlotSelect.innerHTML = '<option value="">Даты и время пока не добавлены</option>';
        bookingSlotSelect.value = '';
        renderBookingTimeList();
        updateBookingSlotStatus();
        return;
      }

      bookingSlotSelect.innerHTML = optionsSource.map((slot) => {
        const info = getBookingSlotDisplayMeta(target, slot);
        return `<option value="${escapeHtml(slot)}" ${info.full ? "disabled" : ""}>${escapeHtml(slot)} ${info.full ? "— мест нет" : `— ${info.text}`}</option>`;
      }).join('');

      const currentValueStillValid = Array.from(bookingSlotSelect.options).some((option) => option.value === bookingSlotSelect.value && !option.disabled);
      if (!currentValueStillValid) {
        const firstEnabledOption = Array.from(bookingSlotSelect.options).find((option) => !option.disabled);
        bookingSlotSelect.value = firstEnabledOption ? firstEnabledOption.value : '';
      }
      renderBookingTimeList();
      updateBookingSlotStatus();
    }

    function updateBookingSlotStatus() {
      const target = getSelectedBookingTarget();
      if (!target) return;
      const slot = bookingSlotSelect.value;
      const selectedDayGroup = getSelectedBookingDayGroup();

      if (bookingCalendarState.groups.length) {
        if (!selectedDayGroup) {
          bookingSlotStatus.textContent = 'Сначала выберите дату в календаре.';
          renderBookingTimeList();
          return;
        }
        const freeCount = selectedDayGroup.items.filter((entry) => getSlotCount(target.key, entry.slot) < target.capacity).length;
        if (!slot) {
          bookingSlotStatus.textContent = freeCount
            ? `На выбранную дату доступно вариантов времени: ${freeCount}.`
            : 'На выбранную дату свободных мест нет.';
          renderBookingTimeList();
          return;
        }
      } else if (!slot) {
        bookingSlotStatus.textContent = bookingCalendarState.fallbackSlots.length
          ? 'Выберите дату и время из списка.'
          : 'Нет доступных вариантов времени.';
        renderBookingTimeList();
        return;
      }

      const info = getBookingSlotDisplayMeta(target, slot);
      bookingSlotStatus.textContent = info.full
        ? 'На выбранные дату и время свободных мест больше нет.'
        : info.text;
      renderBookingTimeList();
    }

    async function openBookingModalByType(type, index) {
      bookingContext = { type, index };
      bookingSuccess.textContent = '';
      bookingError.textContent = '';
      const target = getSelectedBookingTarget();
      if (!target) return;

      await refreshSlotStats();
      buildBookingCalendarState(target);
      renderBookingCalendar();

      bookingModalTitle.textContent = target.title;
      bookingModalText.textContent = `${getTargetTypeLabel(type)}: ${target.desc || target.place || 'Выберите дату в календаре слева, затем укажите удобное время и заполните форму.'}`;
      bookingCapacityText.textContent = `Количество мест на одну дату и время: ${target.capacity}`;
      bookingNoteText.textContent = target.note || '';
      populateBookingSlots();
      bookingModal.classList.add('show');
    }

    async function submitBooking() {
      bookingSuccess.textContent = '';
      bookingError.textContent = '';
      const target = getSelectedBookingTarget();
      if (!target || !bookingContext) return;

      const { data: { session } } = await sb.auth.getSession();
      const fullName = normalizeStr(bookingFullName.value);
      const email = normalizeStr(bookingEmail.value);
      const studyGroup = normalizeStr(bookingStudyGroup.value);
      const selectedSlot = normalizeStr(bookingSlotSelect.value);

      if (!fullName || !email || !selectedSlot) {
        bookingError.textContent = 'Заполните имя, электронную почту и выберите дату и время.';
        return;
      }

      await refreshSlotStats();
      const count = getSlotCount(target.key, selectedSlot);
      if (count >= target.capacity) {
        bookingError.textContent = 'На выбранные дату и время свободных мест уже нет. Выберите другой вариант.';
        buildBookingCalendarState(target);
        renderBookingCalendar();
        populateBookingSlots();
        return;
      }

      submitBookingBtn.disabled = true;
      submitBookingBtn.classList.add('is-loading');
      submitBookingBtn.dataset.prevText = submitBookingBtn.textContent;
      submitBookingBtn.textContent = 'Отправка заявки...';
      try {
        const { error } = await sb.rpc('create_registration_safe', {
          p_target_type: bookingContext.type,
          p_target_id: target.key,
          p_target_title: target.title,
          p_target_key: target.key,
          p_selected_slot: selectedSlot,
          p_full_name: fullName,
          p_email: email,
          p_study_group: studyGroup || null,
          p_user_id: session?.user?.id || null
        });

        if (error) {
          bookingError.textContent = error.message || 'Не удалось отправить заявку.';
          await refreshSlotStats();
          buildBookingCalendarState(target);
          renderBookingCalendar();
          populateBookingSlots();
          return;
        }

        bookingSuccess.textContent = session?.user?.id
          ? 'Заявка отправлена. Её можно посмотреть и при необходимости отменить в разделе «Мои заявки».'
          : 'Заявка отправлена.';
        bookingFullName.value = '';
        bookingEmail.value = '';
        bookingStudyGroup.value = '';
        await refreshSlotStats();
        buildBookingCalendarState(target);
        renderBookingCalendar();
        populateBookingSlots();
        if (session?.user?.id && myRegistrationsModal.classList.contains('show')) {
          await loadMyRegistrations();
        }
      } finally {
        submitBookingBtn.disabled = false;
        submitBookingBtn.classList.remove('is-loading');
        submitBookingBtn.textContent = submitBookingBtn.dataset.prevText || 'Отправить заявку';
      }
    }

    function filterRegistrationsRows() {
      const typeFilter = registrationsFilterType.value;
      const query = normalizeStr(registrationsSearch.value).toLowerCase();
      return registrationsRows.filter((row) => {
        const matchesType = typeFilter === "all" || row.target_type === typeFilter;
        const hay = [
          row.full_name,
          row.email,
          row.study_group,
          row.target_title,
          row.selected_slot,
          row.target_type
        ].join(" ").toLowerCase();
        return matchesType && (!query || hay.includes(query));
      });
    }

    function renderRegistrationsTable() {
      const rows = filterRegistrationsRows();
      if (!rows.length) {
        registrationsTableWrap.innerHTML = '<div class="registrations-empty">Заявки не найдены.</div>';
        return;
      }

      registrationsTableWrap.innerHTML = `
        <table class="registrations-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Тип</th>
              <th>Название</th>
              <th>Дата и время</th>
              <th>ФИО</th>
              <th>Email</th>
              <th>Группа</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td>${escapeHtml(new Date(row.created_at).toLocaleString("ru-RU"))}</td>
                <td>${escapeHtml(getTargetTypeLabel(row.target_type))}</td>
                <td>${escapeHtml(row.target_title || "—")}</td>
                <td>${escapeHtml(row.selected_slot || "—")}</td>
                <td>${escapeHtml(row.full_name || "—")}</td>
                <td>${escapeHtml(row.email || "—")}</td>
                <td>${escapeHtml(row.study_group || "—")}</td>
                <td><button class="small-btn delete" type="button" onclick="cancelRegistrationById(${row.id}, 'admin')">Отменить</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }

    function renderMyRegistrationsTable() {
      if (!myRegistrationsRows.length) {
        myRegistrationsTableWrap.innerHTML = '<div class="registrations-empty">У вас пока нет заявок, созданных из этого аккаунта.</div>';
        return;
      }

      myRegistrationsTableWrap.innerHTML = `
        <table class="registrations-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Тип</th>
              <th>Название</th>
              <th>Дата и время</th>
              <th>ФИО</th>
              <th>Email</th>
              <th>Группа</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            ${myRegistrationsRows.map((row) => `
              <tr>
                <td>${escapeHtml(new Date(row.created_at).toLocaleString("ru-RU"))}</td>
                <td>${escapeHtml(getTargetTypeLabel(row.target_type))}</td>
                <td>${escapeHtml(row.target_title || "—")}</td>
                <td>${escapeHtml(row.selected_slot || "—")}</td>
                <td>${escapeHtml(row.full_name || "—")}</td>
                <td>${escapeHtml(row.email || "—")}</td>
                <td>${escapeHtml(row.study_group || "—")}</td>
                <td><button class="small-btn delete" type="button" onclick="cancelRegistrationById(${row.id}, 'my')">Отменить</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }

    async function loadMyRegistrations() {
      myRegistrationsError.textContent = "";
      myRegistrationsSuccess.textContent = "";
      myRegistrationsTableWrap.innerHTML = '<div class="registrations-empty">Загрузка заявок...</div>';

      const { data: { session } } = await sb.auth.getSession();
      if (!session?.user?.id) {
        myRegistrationsError.textContent = "Для просмотра своих заявок нужно войти в аккаунт.";
        myRegistrationsTableWrap.innerHTML = '<div class="registrations-empty">Войдите в аккаунт.</div>';
        return;
      }

      const { data, error } = await sb
        .from("registrations")
        .select("id,target_type,target_title,target_key,selected_slot,full_name,email,study_group,created_at")
        .order("created_at", { ascending: false });

      if (error) {
        myRegistrationsError.textContent = error.message || "Не удалось загрузить ваши заявки.";
        myRegistrationsTableWrap.innerHTML = '<div class="registrations-empty">Ошибка загрузки.</div>';
        return;
      }

      myRegistrationsRows = data || [];
      myRegistrationsSuccess.textContent = `Найдено заявок: ${myRegistrationsRows.length}`;
      renderMyRegistrationsTable();
    }

    async function cancelRegistrationById(id, scope) {
      const scopeType = scope === "admin" ? "admin" : "my";
      const ok = window.confirm("Отменить эту заявку?");
      if (!ok) return;

      if (scopeType === "admin") {
        registrationsError.textContent = "";
        registrationsSuccess.textContent = "";
      } else {
        myRegistrationsError.textContent = "";
        myRegistrationsSuccess.textContent = "";
      }

      const { error } = await sb
        .from("registrations")
        .delete()
        .eq("id", id);

      if (error) {
        if (scopeType === "admin") {
          registrationsError.textContent = error.message || "Не удалось отменить заявку.";
        } else {
          myRegistrationsError.textContent = error.message || "Не удалось отменить заявку.";
        }
        return;
      }

      await refreshSlotStats();

      if (scopeType === "admin" && registrationsModal.classList.contains("show")) {
        await loadRegistrations();
        registrationsSuccess.textContent = "Заявка отменена.";
      } else if (scopeType === "my" && myRegistrationsModal.classList.contains("show")) {
        await loadMyRegistrations();
        myRegistrationsSuccess.textContent = "Заявка отменена.";
      }
    }

    async function loadRegistrations() {
      registrationsError.textContent = "";
      registrationsSuccess.textContent = "";
      registrationsTableWrap.innerHTML = '<div class="registrations-empty">Загрузка заявок...</div>';

      const { data: { session } } = await sb.auth.getSession();
      const profile = await fetchProfile(session);
      if (!session || !profile || profile.role !== "admin") {
        registrationsError.textContent = "Нет доступа к заявкам.";
        registrationsTableWrap.innerHTML = '<div class="registrations-empty">Доступ запрещён.</div>';
        return;
      }

      const { data, error } = await sb
        .from("registrations")
        .select("id,target_type,target_title,target_key,selected_slot,full_name,email,study_group,created_at")
        .order("created_at", { ascending: false });

      if (error) {
        registrationsError.textContent = error.message || "Не удалось загрузить заявки.";
        registrationsTableWrap.innerHTML = '<div class="registrations-empty">Ошибка загрузки.</div>';
        return;
      }

      registrationsRows = data || [];
      registrationsSuccess.textContent = `Найдено заявок: ${registrationsRows.length}`;
      renderRegistrationsTable();
    }

    function openAccountModal() {
      updateAuthUI().then(() => {
        accountModal.classList.add("show");
      });
    }

    function setAdminSection(sectionName) {
      const tabs = Array.from(document.querySelectorAll('[data-admin-tab]'));
      const panels = Array.from(document.querySelectorAll('[data-admin-panel]'));
      tabs.forEach((btn) => btn.classList.toggle('active', btn.dataset.adminTab === sectionName));
      panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.adminPanel === sectionName));
    }

    function openAdminModal() {
      if (!currentProfile || currentProfile.role !== "admin") {
        adminError.textContent = "Нет доступа к админке. Войдите под аккаунтом с ролью admin.";
        accountModal.classList.add("show");
        return;
      }
      adminError.textContent = "";
      adminSuccess.textContent = "";
      fillSettingsForm();
      setAdminSection("settings");
      adminModal.classList.add("show");
    }

    async function openRegistrationsModal() {
      if (!currentProfile || currentProfile.role !== "admin") {
        registrationsError.textContent = "Нет доступа к заявкам.";
        return;
      }
      registrationsModal.classList.add("show");
      await loadRegistrations();
    }

    async function openMyRegistrationsModal() {
      const { data: { session } } = await sb.auth.getSession();
      if (!session?.user?.id) {
        accountModal.classList.add("show");
        return;
      }
      myRegistrationsModal.classList.add("show");
      await loadMyRegistrations();
    }

    function closeModals() {
      accountModal.classList.remove("show");
      adminModal.classList.remove("show");
      dayEventsModal.classList.remove("show");
      bookingModal.classList.remove("show");
      registrationsModal.classList.remove("show");
      myRegistrationsModal.classList.remove("show");
    }

    function changeMonth(step) {
      currentCalendarMonth += step;
      if (currentCalendarMonth < 0) {
        currentCalendarMonth = 11;
        currentCalendarYear--;
      } else if (currentCalendarMonth > 11) {
        currentCalendarMonth = 0;
        currentCalendarYear++;
      }
      renderCalendar();
    }

    async function fileToDataUrl(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    memberPhoto.addEventListener("input", () => {
      if (normalizeStr(memberPhoto.value)) {
        pendingMemberPhotoData = "";
        renderPhotoPreview(memberPhoto.value);
        memberPhotoStatus.textContent = "Используется ссылка на фото.";
      } else if (!pendingMemberPhotoData) {
        renderPhotoPreview("");
        memberPhotoStatus.textContent = "Можно вставить ссылку или выбрать файл. Файл сохранится прямо в content сайта.";
      }
    });

    memberPhotoFile.addEventListener("change", async () => {
      const file = memberPhotoFile.files && memberPhotoFile.files[0];
      if (!file) return;
      try {
        pendingMemberPhotoData = await fileToDataUrl(file);
        memberPhoto.value = "";
        renderPhotoPreview(pendingMemberPhotoData);
        memberPhotoStatus.textContent = `Файл выбран: ${file.name}`;
      } catch (err) {
        memberPhotoStatus.textContent = "Не удалось прочитать файл.";
      }
    });

    bookingSlotSelect.addEventListener("change", updateBookingSlotStatus);
    bookingPrevMonthBtn.addEventListener("click", () => {
      const current = new Date(bookingCalendarState.year, bookingCalendarState.month, 1);
      current.setMonth(current.getMonth() - 1);
      bookingCalendarState.year = current.getFullYear();
      bookingCalendarState.month = current.getMonth();
      renderBookingCalendar();
      populateBookingSlots();
    });
    bookingNextMonthBtn.addEventListener("click", () => {
      const current = new Date(bookingCalendarState.year, bookingCalendarState.month, 1);
      current.setMonth(current.getMonth() + 1);
      bookingCalendarState.year = current.getFullYear();
      bookingCalendarState.month = current.getMonth();
      renderBookingCalendar();
      populateBookingSlots();
    });
    submitBookingBtn.addEventListener("click", submitBooking);

    document.getElementById("applySettingsBtn").addEventListener("click", async (e) => {
      applySettingsFromForm();
      renderSettings();
      await persistAfterAdminEdit(e.currentTarget);
    });

    document.getElementById("saveJobBtn").addEventListener("click", saveJobLocal);
    document.getElementById("saveEventBtn").addEventListener("click", saveEventLocal);
    document.getElementById("saveMemberBtn").addEventListener("click", saveMemberLocal);
    document.getElementById("saveDirectionBtn").addEventListener("click", saveDirectionLocal);
    const saveNewsBtn = document.getElementById("saveNewsBtn"); if (saveNewsBtn) saveNewsBtn.addEventListener("click", saveNewsLocal);
    const saveInternshipBtn = document.getElementById("saveInternshipBtn"); if (saveInternshipBtn) saveInternshipBtn.addEventListener("click", saveInternshipLocal);

    document.getElementById("cancelJobEditBtn").addEventListener("click", clearJobForm);
    document.getElementById("cancelEventEditBtn").addEventListener("click", clearEventForm);
    document.getElementById("cancelMemberEditBtn").addEventListener("click", clearMemberForm);
    document.getElementById("cancelDirectionEditBtn").addEventListener("click", clearDirectionForm);
    const cancelNewsEditBtn = document.getElementById("cancelNewsEditBtn"); if (cancelNewsEditBtn) cancelNewsEditBtn.addEventListener("click", clearNewsForm);
    const cancelInternshipEditBtn = document.getElementById("cancelInternshipEditBtn"); if (cancelInternshipEditBtn) cancelInternshipEditBtn.addEventListener("click", clearInternshipForm);

    document.querySelectorAll('[data-admin-tab]').forEach((btn) => {
      btn.addEventListener('click', () => setAdminSection(btn.dataset.adminTab));
    });

    document.getElementById("saveAllBtn").addEventListener("click", async () => {
      const ok = await saveStateToDatabase({ silent: false });
      if (ok) await refreshSlotStats();
    });

    accountOpenBtn.addEventListener("click", openAccountModal);
    openAdminBtn.addEventListener("click", openAdminModal);
    openRegistrationsTopBtn.addEventListener("click", openRegistrationsModal);
    openMyRegistrationsBtn.addEventListener("click", openMyRegistrationsModal);
    closeAccountBtn.addEventListener("click", closeModals);
    closeAdminBtn.addEventListener("click", closeModals);
    closeDayEventsBtn.addEventListener("click", closeModals);
    closeBookingBtn.addEventListener("click", closeModals);
    closeRegistrationsBtn.addEventListener("click", closeModals);
    closeMyRegistrationsBtn.addEventListener("click", closeModals);

    logoutBtn.addEventListener("click", logout);
    logoutTopBtn.addEventListener("click", logout);
    loginBtn.addEventListener("click", login);

    accountModal.addEventListener("click", (e) => { if (e.target === accountModal) accountModal.classList.remove("show"); });
    adminModal.addEventListener("click", (e) => { if (e.target === adminModal) adminModal.classList.remove("show"); });
    dayEventsModal.addEventListener("click", (e) => { if (e.target === dayEventsModal) dayEventsModal.classList.remove("show"); });
    bookingModal.addEventListener("click", (e) => { if (e.target === bookingModal) bookingModal.classList.remove("show"); });
    registrationsModal.addEventListener("click", (e) => { if (e.target === registrationsModal) registrationsModal.classList.remove("show"); });
    myRegistrationsModal.addEventListener("click", (e) => { if (e.target === myRegistrationsModal) myRegistrationsModal.classList.remove("show"); });

    document.getElementById("prevMonthBtn").addEventListener("click", () => changeMonth(-1));
    document.getElementById("nextMonthBtn").addEventListener("click", () => changeMonth(1));

    registrationsFilterType.addEventListener("change", renderRegistrationsTable);
    registrationsSearch.addEventListener("input", renderRegistrationsTable);
    refreshRegistrationsBtn.addEventListener("click", loadRegistrations);
    refreshMyRegistrationsBtn.addEventListener("click", loadMyRegistrations);

    sb.auth.onAuthStateChange(() => {
      updateAuthUI();
      if (myRegistrationsModal.classList.contains("show")) {
        loadMyRegistrations();
      }
    });

    window.startEditJob = startEditJob;
    window.startEditEvent = startEditEvent;
    window.startEditMember = startEditMember;
    window.startEditDirection = startEditDirection;
    window.deleteJob = deleteJob;
    window.deleteEvent = deleteEvent;
    window.deleteMember = deleteMember;
    window.deleteDirection = deleteDirection;
    window.openBookingModalByType = openBookingModalByType;
    window.cancelRegistrationById = cancelRegistrationById;

    fillMonthSelect();
    clearJobForm();
    clearEventForm();
    clearMemberForm();
    clearDirectionForm();

    (async function init() {
      await updateAuthUI();
      await loadStateFromDatabase();
      await refreshSlotStats();
    })();
  