(function () {
  const SUPABASE_URL = (window.APP_CONFIG && window.APP_CONFIG.SUPABASE_URL) || "https://zxvqgqnwbkqmopaxtqcm.supabase.co";
  const SUPABASE_KEY = (window.APP_CONFIG && window.APP_CONFIG.SUPABASE_KEY) || "sb_publishable_90CEm1Vf4QqF4p4C7DAsvw_c_eb78XE";
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const monthNames = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
  const newsList = document.getElementById('newsPageList');
  const pageTitle = document.getElementById('newsPageTitle');
  const pageText = document.getElementById('newsPageText');

  function normalizeStr(v) { return String(v || '').trim(); }
  function escapeHtml(text) { return String(text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function safeLink(value) { const v = normalizeStr(value); return v || '#'; }
  function normalizeNewsDate(value) {
    const raw = normalizeStr(value).replace(/[^\d]/g, '');
    if (raw.length === 8) return `${raw.slice(0,2)}.${raw.slice(2,4)}.${raw.slice(4)}`;
    const m = normalizeStr(value).match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (m) return `${m[1].padStart(2,'0')}.${m[2].padStart(2,'0')}.${m[3]}`;
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
    if (!m) return normalized || 'Дата не указана';
    return `${Number(m[1])} ${monthNames[Number(m[2]) - 1]} ${m[3]}`;
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
      published: item && String(item.published) !== 'false'
    };
  }
  function getVideoEmbedMarkup(url) {
    const value = normalizeStr(url);
    if (!value) return '';
    const yt = value.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/i);
    if (yt) return `<div class="news-video-wrap"><iframe src="https://www.youtube.com/embed/${yt[1]}" allowfullscreen loading="lazy"></iframe></div>`;
    const rutube = value.match(/rutube\.ru\/video\/([A-Za-z0-9]+)/i);
    if (rutube) return `<div class="news-video-wrap"><iframe src="https://rutube.ru/play/embed/${rutube[1]}" allowfullscreen loading="lazy"></iframe></div>`;
    if (/\.mp4($|\?)/i.test(value)) return `<div class="news-video-wrap"><video controls preload="metadata" src="${escapeHtml(value)}"></video></div>`;
    return `<a class="direction-link" href="${safeLink(value)}" target="_blank" rel="noopener noreferrer">Открыть видеоролик</a>`;
  }

  async function loadNews() {
    const { data, error } = await sb.from('site_content').select('content').eq('id', 1).maybeSingle();
    if (error) {
      newsList.innerHTML = '<div class="muted-text">Не удалось загрузить новости.</div>';
      return;
    }
    const content = data && data.content ? data.content : {};
    const settings = content.settings || {};
    pageTitle.textContent = settings.newsTitle || 'Новости центра карьеры';
    pageText.textContent = 'На этой странице собраны все опубликованные новости, анонсы и материалы с видеороликами.';
    const items = (Array.isArray(content.news) ? content.news : []).map(normalizeNewsItem).filter(item => item.published).sort((a,b)=>newsDateToSortableValue(b.date)-newsDateToSortableValue(a.date));
    const selectedKey = new URLSearchParams(location.search).get('news');
    const ordered = selectedKey ? items.sort((a,b)=> (a.key===selectedKey?-1:b.key===selectedKey?1:0) || newsDateToSortableValue(b.date)-newsDateToSortableValue(a.date)) : items;
    if (!ordered.length) {
      newsList.innerHTML = '<div class="muted-text">Опубликованных новостей пока нет.</div>';
      return;
    }
    newsList.innerHTML = ordered.map(item => `
      <article class="news-page-card" id="${escapeHtml(item.key)}">
        <div class="news-page-card-inner">
          <div class="news-page-cover"${item.cover ? ` style="background-image:url('${item.cover.replace(/'/g, "%27")}')"` : ''}>${item.cover ? '' : 'Новость'}</div>
          <div class="news-page-content">
            <div class="news-page-meta">
              <span class="head-badge">${escapeHtml(formatNewsDateDisplay(item.date))}</span>
              ${item.video_url ? '<span class="head-badge">Видео прикреплено</span>' : ''}
            </div>
            <h2 class="panel-title" style="margin:0;">${escapeHtml(item.title)}</h2>
            ${item.summary ? `<p class="news-page-summary">${escapeHtml(item.summary)}</p>` : ''}
            <p class="news-page-text">${escapeHtml(item.content || item.summary || '')}</p>
            ${getVideoEmbedMarkup(item.video_url)}
          </div>
        </div>
      </article>
    `).join('');
    if (selectedKey) {
      const selectedEl = document.getElementById(selectedKey);
      if (selectedEl) selectedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  loadNews();
})();
