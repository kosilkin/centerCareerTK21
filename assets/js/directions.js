(function () {
  const SUPABASE_URL = (window.APP_CONFIG && window.APP_CONFIG.SUPABASE_URL) || "https://zxvqgqnwbkqmopaxtqcm.supabase.co";
  const SUPABASE_KEY = (window.APP_CONFIG && window.APP_CONFIG.SUPABASE_KEY) || "sb_publishable_90CEm1Vf4QqF4p4C7DAsvw_c_eb78XE";
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const list = document.getElementById('directionsPageList');
  const pageTitle = document.getElementById('directionsPageTitle');
  const pageText = document.getElementById('directionsPageText');

  function normalizeStr(v) { return String(v || '').trim(); }
  function escapeHtml(text) { return String(text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function safeLink(value) {
    const v = normalizeStr(value);
    if (!v) return '#';
    try {
      const parsed = new URL(v, window.location.origin);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.href;
      return '#';
    } catch {
      return '#';
    }
  }
  function makeKey(prefix, value) {
    return (prefix + '-' + normalizeStr(value).toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-').replace(/^-+|-+$/g, '')).replace(/-+/g, '-') || prefix + '-item';
  }
  function normalizeDirectionItem(item, index) {
    return {
      key: normalizeStr(item.key) || makeKey('direction', item.name || 'item-' + index),
      name: normalizeStr(item.name),
      sub: normalizeStr(item.sub),
      desc: normalizeStr(item.desc),
      content: normalizeStr(item.content || item.fullText),
      image: normalizeStr(item.image || item.cover),
      link: normalizeStr(item.link),
      linkLabel: normalizeStr(item.linkLabel || item.buttonLabel || 'Открыть материалы')
    };
  }

  async function loadDirections() {
    const { data, error } = await sb.from('site_content').select('content').eq('id', 1).maybeSingle();
    if (error) {
      list.innerHTML = '<div class="muted-text">Не удалось загрузить направления.</div>';
      return;
    }
    const content = data && data.content ? data.content : {};
    const settings = content.settings || {};
    pageTitle.textContent = settings.directionsTitle || 'Направления и материалы';
    pageText.textContent = 'На этой странице собраны материалы, рекомендации и полезные ссылки по направлениям обучения.';
    const items = (Array.isArray(content.directions) ? content.directions : []).map(normalizeDirectionItem);
    const selectedKey = new URLSearchParams(location.search).get('direction');
    const ordered = selectedKey ? items.sort((a,b)=> (a.key===selectedKey?-1:b.key===selectedKey?1:0)) : items;
    if (!ordered.length) {
      list.innerHTML = '<div class="muted-text">Направления пока не добавлены.</div>';
      return;
    }
    list.innerHTML = ordered.map(item => `
      <article class="news-page-card direction-page-card" id="${escapeHtml(item.key)}">
        <div class="news-page-card-inner">
          <div class="news-page-cover direction-page-cover"${item.image ? ` style="background-image:url('${item.image.replace(/'/g, "%27")}')"` : ''}>${item.image ? '' : escapeHtml(item.name || 'Направление')}</div>
          <div class="news-page-content">
            <div class="news-page-meta">
              <span class="head-badge">Направление</span>
              ${item.sub ? `<span class="head-badge">${escapeHtml(item.sub)}</span>` : ''}
            </div>
            <h2 class="panel-title" style="margin:0;">${escapeHtml(item.name)}</h2>
            ${item.desc ? `<p class="news-page-summary">${escapeHtml(item.desc)}</p>` : ''}
            <p class="news-page-text">${escapeHtml(item.content || item.desc || '')}</p>
            <div class="direction-page-actions">
              ${item.link && item.link !== '#' ? `<a class="direction-link" href="${safeLink(item.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.linkLabel || 'Открыть материалы')}</a>` : ''}
              <a class="section-link-btn" href="index.html#directions">К списку направлений</a>
            </div>
          </div>
        </div>
      </article>
    `).join('');
    if (selectedKey) {
      const el = document.getElementById(selectedKey);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  loadDirections();
})();
