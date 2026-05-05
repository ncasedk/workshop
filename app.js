// Holy Cow Media — Brand Workshop
// Vanilla JS app, ingen build-step. Statisk hosting på cPanel.

(function () {
  'use strict';

  const STORAGE_KEY = 'hcm-workshop-session';

  // ===================== KONFIG / DATA =====================

  const MODULES = [
    { id: 'fundament', label: 'Fundament' },
    { id: 'personlighed', label: 'Personlighed' },
    { id: 'substantiver', label: 'Logo mark' },
    { id: 'fotostil', label: 'Fotostil' },
    { id: 'farver', label: 'Farver' },
    { id: 'fontvalg', label: 'Fontvalg' },
    { id: 'designelementer', label: 'Designelementer' },
    { id: 'moodboard', label: 'Moodboard' },
    { id: 'eksport', label: 'Eksport' },
  ];

  const SLIDERS = [
    { key: 'formel', left: 'Formel', right: 'Legende' },
    { key: 'moderne', left: 'Moderne', right: 'Klassisk' },
    { key: 'varme', left: 'Varm', right: 'Skarp' },
    { key: 'premium', left: 'Premium', right: 'Folkelig' },
    { key: 'minimal', left: 'Minimalistisk', right: 'Detaljeret' },
    { key: 'serios', left: 'Seriøs', right: 'Humoristisk' },
  ];

  const NOUN_SUGGESTIONS = [
    'bjerg', 'horisont', 'cirkel', 'bølge', 'flamme', 'blad', 'sten',
    'kompas', 'nøgle', 'bro', 'frø', 'sol', 'måne', 'træ', 'vand',
    'fugl', 'trekant', 'stjerne', 'pil', 'spiral', 'linje', 'dråbe',
    'rod', 'gren', 'sti', 'port', 'lys', 'skygge', 'puls', 'tråd',
  ];

  const MOODS = [
    'Tillid', 'Energi', 'Ro', 'Luksus', 'Innovation',
    'Naturlig', 'Premium', 'Folkelig', 'Minimalistisk', 'Legende',
    'Varm', 'Klassisk', 'Modig', 'Empatisk', 'Tech',
  ];

  const PALETTES = [
    { name: 'Nordisk klarhed', desc: 'Stilren skandinavisk minimal', moods: ['Minimalistisk', 'Tillid', 'Ro', 'Premium'], colors: ['#1A1A1A', '#FAFAFA', '#D4D4D4', '#7B7B7B', '#3A86FF'] },
    { name: 'Varm jord', desc: 'Naturlig, taktil, autentisk', moods: ['Naturlig', 'Varm', 'Folkelig', 'Empatisk'], colors: ['#3D2817', '#A0522D', '#E8D5B7', '#7C9885', '#F4E4C1'] },
    { name: 'Dyb tillid', desc: 'Korporat, troværdig, solid', moods: ['Tillid', 'Premium', 'Klassisk', 'Tech'], colors: ['#0A2540', '#1F4068', '#3D5A80', '#E0FBFC', '#EE9B00'] },
    { name: 'Energisk puls', desc: 'Ungdommelig, modig, livlig', moods: ['Energi', 'Modig', 'Legende'], colors: ['#FF006E', '#FB5607', '#FFBE0B', '#3A86FF', '#1B1B1E'] },
    { name: 'Skov og mos', desc: 'Organisk, jordnær, beroligende', moods: ['Naturlig', 'Ro', 'Empatisk'], colors: ['#283618', '#606C38', '#DDA15E', '#FEFAE0', '#BC6C25'] },
    { name: 'Sort guld', desc: 'Eksklusiv, eftertragtet, mørk', moods: ['Luksus', 'Premium', 'Klassisk'], colors: ['#0B0B0B', '#1A1A1A', '#C9A227', '#F4E5C2', '#FFFFFF'] },
    { name: 'Pastel-ro', desc: 'Blød, tilgængelig, venlig', moods: ['Ro', 'Empatisk', 'Folkelig', 'Legende'], colors: ['#FFD6E0', '#FFEFCF', '#C8E7CB', '#B8D8E8', '#3D405B'] },
    { name: 'Fintech', desc: 'Moderne, klar, tech-forward', moods: ['Tech', 'Innovation', 'Tillid', 'Premium'], colors: ['#0F1923', '#1F2937', '#10B981', '#F3F4F6', '#3B82F6'] },
    { name: 'Solnedgang', desc: 'Varm, optimistisk, indbydende', moods: ['Varm', 'Energi', 'Empatisk', 'Folkelig'], colors: ['#FF7B54', '#FFB26B', '#FFD56F', '#939B62', '#1B3022'] },
    { name: 'Innovation lab', desc: 'Eksperimentel, fremadskuende', moods: ['Innovation', 'Modig', 'Tech', 'Legende'], colors: ['#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0', '#F72585'] },
    { name: 'Klassisk avis', desc: 'Tidløs, troværdig, læselig', moods: ['Klassisk', 'Tillid', 'Premium', 'Minimalistisk'], colors: ['#1A1A1A', '#F5F1E8', '#8B0000', '#5A5A5A', '#C9A227'] },
    { name: 'Frisk natur', desc: 'Levende, sundt, ærligt', moods: ['Naturlig', 'Energi', 'Ro'], colors: ['#2D5A27', '#84A98C', '#CAD2C5', '#F4F1DE', '#E07A5F'] },
  ];

  const FONT_PAIRS = [
    { name: 'Editorial klassisk', heading: 'Playfair Display', body: 'Lora', headingWeight: 700, bodyWeight: 400, vibe: 'Elegant, redaktionel, troværdig' },
    { name: 'Moderne minimal', heading: 'Inter', body: 'Inter', headingWeight: 700, bodyWeight: 400, vibe: 'Stilren, moderne, læsbar' },
    { name: 'Tech forward', heading: 'Space Grotesk', body: 'IBM Plex Sans', headingWeight: 700, bodyWeight: 400, vibe: 'Skarp, teknisk, fremadskuende' },
    { name: 'Varm humanist', heading: 'Fraunces', body: 'Nunito', headingWeight: 700, bodyWeight: 400, vibe: 'Indbydende, blød, levende' },
    { name: 'Skandi neutral', heading: 'Karla', body: 'Karla', headingWeight: 700, bodyWeight: 400, vibe: 'Nordisk, neutral, funktionel' },
    { name: 'Premium luksus', heading: 'Cormorant Garamond', body: 'Lato', headingWeight: 700, bodyWeight: 400, vibe: 'Eksklusiv, smuk, klassisk' },
    { name: 'Bold statement', heading: 'Archivo Black', body: 'Archivo', headingWeight: 400, bodyWeight: 400, vibe: 'Stærk, selvsikker, direkte' },
    { name: 'Brutalist edge', heading: 'DM Serif Display', body: 'DM Sans', headingWeight: 400, bodyWeight: 400, vibe: 'Kontrastfuld, moderne, modig' },
    { name: 'Geometrisk', heading: 'Outfit', body: 'Outfit', headingWeight: 700, bodyWeight: 400, vibe: 'Geometrisk, ren, alsidig' },
    { name: 'Friendly approachable', heading: 'Quicksand', body: 'Nunito Sans', headingWeight: 700, bodyWeight: 400, vibe: 'Venlig, tilgængelig, varm' },
    { name: 'Editorial moderne', heading: 'Tenor Sans', body: 'Source Sans 3', headingWeight: 400, bodyWeight: 400, vibe: 'Klar, moderne, balanceret' },
    { name: 'Indie kreativ', heading: 'Caveat', body: 'Work Sans', headingWeight: 700, bodyWeight: 400, vibe: 'Personlig, håndskrevet, kreativ' },
  ];

  const HEADING_SAMPLES = [
    'Et brand der bliver husket',
    'Hvor klarhed møder karakter',
    'Bygget på det vi tror på',
    'Substans frem for støj',
  ];
  const BODY_SAMPLE = 'Et stærkt visuelt sprog handler ikke om at råbe højest — men om at sige det rigtige, klart og konsekvent. Et godt fontvalg er fundamentet under det hele.';

  // ===================== STATE =====================

  const defaultState = () => ({
    meta: { client: '', date: new Date().toISOString().slice(0, 10) },
    fundament: { company: '', tagline: '', mission: '', target: '', problem: '', values: '', forbidden: '' },
    sliders: SLIDERS.reduce((acc, s) => (acc[s.key] = 50, acc), {}),
    nouns: [],
    fotostil: [],
    moodSelection: [],
    palette: [],
    selectedFontPair: '',
    designElements: [],
    canvasLayout: {},
    currentModule: 0,
  });

  let state = defaultState();

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migration: gamle sessioner havde 'moodboard' i stedet for 'fotostil'
        if (parsed.moodboard && !parsed.fotostil) {
          parsed.fotostil = parsed.moodboard;
          delete parsed.moodboard;
        }
        state = Object.assign(defaultState(), parsed);
      }
    } catch (e) { console.warn('Kunne ikke indlæse state', e); }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { console.warn('Kunne ikke gemme state', e); }
  }

  // ===================== UTILS =====================

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  function setNested(path, value) {
    const parts = path.split('.');
    let obj = state;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!obj[parts[i]]) obj[parts[i]] = {};
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;
    saveState();
  }

  function getNested(path) {
    return path.split('.').reduce((o, k) => (o ? o[k] : undefined), state);
  }

  function toast(msg, type) {
    const el = document.createElement('div');
    el.className = 'toast' + (type ? ' ' + type : '');
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ===================== NAVIGATION =====================

  function renderNav() {
    const nav = $('#nav');
    nav.innerHTML = MODULES.map((m, i) => {
      const cls = [
        i === state.currentModule ? 'active' : '',
        isModuleComplete(i) ? 'completed' : '',
      ].filter(Boolean).join(' ');
      return `<li class="${cls}" onclick="app.go(${i})">
        <span class="nav-num">${i + 1}</span>
        <span>${m.label}</span>
      </li>`;
    }).join('');
  }

  function isModuleComplete(i) {
    switch (i) {
      case 0: return !!(state.fundament.company && state.fundament.mission);
      case 1: return SLIDERS.some(s => state.sliders[s.key] !== 50);
      case 2: return state.nouns.length > 0;
      case 3: return state.fotostil.length >= 3;
      case 4: return state.palette.length > 0;
      case 5: return !!state.selectedFontPair;
      case 6: return state.designElements.length > 0;
      case 7: return hasAnyContent();
      default: return false;
    }
  }

  function hasAnyContent() {
    return !!(state.fundament.company || state.nouns.length || state.palette.length
      || state.fotostil.length || state.designElements.length || state.selectedFontPair);
  }

  function go(i) {
    state.currentModule = Math.max(0, Math.min(MODULES.length - 1, i));
    saveState();
    $$('.module').forEach(el => el.classList.toggle('active', Number(el.dataset.module) === state.currentModule));
    renderNav();
    if (state.currentModule === 5) ensureFontPairsLoaded();
    if (state.currentModule === 7) renderMoodboardSummary();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function next() { go(state.currentModule + 1); }
  function prev() { go(state.currentModule - 1); }

  // ===================== MODUL 1: FUNDAMENT =====================

  function bindFundament() {
    $$('[data-state]').forEach(input => {
      const path = input.dataset.state;
      const val = getNested(path);
      if (val != null) input.value = val;
      input.addEventListener('input', () => {
        setNested(path, input.value);
        renderNav();
      });
    });

    const clientInput = $('#client-name');
    const dateInput = $('#session-date');
    clientInput.value = state.meta.client || '';
    dateInput.value = state.meta.date || '';
    clientInput.addEventListener('input', () => { state.meta.client = clientInput.value; saveState(); });
    dateInput.addEventListener('input', () => { state.meta.date = dateInput.value; saveState(); });
  }

  // ===================== MODUL 2: SLIDERE =====================

  function renderSliders() {
    const root = $('#sliders');
    root.innerHTML = SLIDERS.map(s => {
      const v = state.sliders[s.key];
      return `
        <div class="slider-row">
          <div class="slider-labels">
            <span class="left">${s.left}</span>
            <span class="right">${s.right}</span>
          </div>
          <input type="range" min="0" max="100" value="${v}" data-slider="${s.key}">
          <div class="slider-value" id="sv-${s.key}">${v}%</div>
        </div>
      `;
    }).join('');
    $$('input[data-slider]').forEach(input => {
      input.addEventListener('input', () => {
        const k = input.dataset.slider;
        state.sliders[k] = Number(input.value);
        $('#sv-' + k).textContent = input.value + '%';
        saveState();
        renderNav();
      });
    });
  }

  // ===================== MODUL 3: SUBSTANTIVER =====================

  function renderNouns() {
    const wrap = $('#tag-wrap');
    const input = $('#tag-input');
    $$('.tag', wrap).forEach(el => el.remove());
    state.nouns.forEach(n => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.innerHTML = `${escapeHtml(n)} <span class="remove" title="Fjern">×</span>`;
      tag.querySelector('.remove').addEventListener('click', () => {
        state.nouns = state.nouns.filter(x => x !== n);
        saveState();
        renderNouns();
        renderNav();
      });
      wrap.insertBefore(tag, input);
    });
  }

  function bindNouns() {
    const input = $('#tag-input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        e.preventDefault();
        addNoun(input.value.trim());
        input.value = '';
      } else if (e.key === 'Backspace' && !input.value && state.nouns.length) {
        state.nouns.pop();
        saveState();
        renderNouns();
        renderNav();
      }
    });

    const sug = $('#noun-suggestions');
    sug.innerHTML = NOUN_SUGGESTIONS.map(n =>
      `<button class="chip" type="button">${escapeHtml(n)}</button>`
    ).join('');
    sug.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (btn) addNoun(btn.textContent);
    });
  }

  function addNoun(n) {
    if (!n) return;
    if (state.nouns.includes(n)) { toast('Findes allerede'); return; }
    state.nouns.push(n);
    saveState();
    renderNouns();
    renderNav();
  }

  // ===================== MODUL 4: FOTOSTIL (Unsplash) =====================

  let unsplashLoading = false;

  async function searchUnsplash() {
    const q = $('#mood-search').value.trim();
    if (!q) { toast('Skriv et søgeord'); return; }
    if (unsplashLoading) return;
    const key = window.HCM_CONFIG && window.HCM_CONFIG.unsplashAccessKey;
    if (!key) { toast('Mangler Unsplash API-nøgle i config.js', 'error'); return; }

    unsplashLoading = true;
    const results = $('#search-results');
    results.innerHTML = '<div style="grid-column:1/-1;padding:1rem;color:rgba(0,10,54,0.5);">Søger…</div>';
    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=24&orientation=landscape`;
      const res = await fetch(url, { headers: { Authorization: 'Client-ID ' + key } });
      if (!res.ok) throw new Error('Unsplash svarede ' + res.status);
      const data = await res.json();
      renderSearchResults(data.results || []);
    } catch (err) {
      console.error(err);
      results.innerHTML = `<div style="grid-column:1/-1;padding:1rem;color:#b3261e;">Kunne ikke søge: ${escapeHtml(err.message)}</div>`;
    } finally {
      unsplashLoading = false;
    }
  }

  function renderSearchResults(items) {
    const root = $('#search-results');
    if (!items.length) {
      root.innerHTML = '<div style="grid-column:1/-1;padding:1rem;color:rgba(0,10,54,0.5);">Ingen resultater.</div>';
      return;
    }
    root.innerHTML = items.map(p => {
      const added = state.fotostil.some(m => m.id === p.id);
      return `
        <div class="search-thumb ${added ? 'added' : ''}" data-id="${p.id}">
          <img loading="lazy" src="${p.urls.thumb}" alt="${escapeHtml(p.alt_description || '')}">
        </div>
      `;
    }).join('');
    root.querySelectorAll('.search-thumb').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.id;
        const photo = items.find(p => p.id === id);
        if (!photo) return;
        if (state.fotostil.some(m => m.id === id)) {
          state.fotostil = state.fotostil.filter(m => m.id !== id);
          el.classList.remove('added');
        } else {
          state.fotostil.push({
            id: photo.id,
            url: photo.urls.regular,
            thumb: photo.urls.small,
            photographer: photo.user.name,
            photographerUrl: photo.user.links.html + '?utm_source=hcm_workshop&utm_medium=referral',
            source: 'unsplash',
            description: photo.alt_description || '',
          });
          el.classList.add('added');
        }
        saveState();
        renderFotostil();
        renderNav();
      });
    });
  }

  function renderFotostil() {
    const root = $('#fotostil');
    root.classList.toggle('empty', state.fotostil.length === 0);
    root.innerHTML = state.fotostil.map((m, i) => `
      <div class="mood-item" data-index="${i}">
        <img src="${m.thumb || m.url}" alt="${escapeHtml(m.description || '')}">
        <button class="remove-btn" data-remove="${i}" title="Fjern">×</button>
        ${m.photographer ? `<div class="credit">Foto: <a href="${m.photographerUrl}" target="_blank" rel="noopener">${escapeHtml(m.photographer)}</a> / Unsplash</div>` : ''}
      </div>
    `).join('');

    root.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const i = Number(btn.dataset.remove);
        state.fotostil.splice(i, 1);
        saveState();
        renderFotostil();
        renderNav();
      });
    });

    if (window.Sortable && !root.dataset.sortableInit) {
      window.Sortable.create(root, {
        animation: 150,
        onEnd: () => {
          const newOrder = $$('.mood-item', root).map(el => Number(el.dataset.index));
          state.fotostil = newOrder.map(i => state.fotostil[i]);
          saveState();
          renderFotostil();
        },
      });
      root.dataset.sortableInit = '1';
    }
  }

  function uploadImages(event) {
    const files = Array.from(event.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        state.fotostil.push({
          id: 'local-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
          url: reader.result, thumb: reader.result,
          photographer: '', photographerUrl: '', source: 'upload',
          description: file.name,
        });
        saveState();
        renderFotostil();
        renderNav();
      };
      reader.readAsDataURL(file);
    });
    event.target.value = '';
  }

  function bindFotostil() {
    $('#mood-search').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') searchUnsplash();
    });
  }

  // ===================== MODUL 5: FARVER =====================

  function renderMoodChips() {
    const root = $('#mood-chips');
    root.innerHTML = MOODS.map(m => {
      const sel = state.moodSelection.includes(m);
      return `<button type="button" class="mood-chip ${sel ? 'selected' : ''}" data-mood="${escapeHtml(m)}">${escapeHtml(m)}</button>`;
    }).join('');
    root.querySelectorAll('.mood-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const m = btn.dataset.mood;
        if (state.moodSelection.includes(m)) {
          state.moodSelection = state.moodSelection.filter(x => x !== m);
        } else {
          state.moodSelection.push(m);
        }
        saveState();
        renderMoodChips();
        renderPaletteSuggestions();
      });
    });
  }

  function renderPaletteSuggestions() {
    const root = $('#palette-suggestions');
    if (!state.moodSelection.length) {
      root.innerHTML = '<p style="grid-column:1/-1;color:rgba(0,10,54,0.5);font-style:italic;">Vælg én eller flere stemninger ovenfor for at se forslag.</p>';
      return;
    }
    const ranked = PALETTES
      .map(p => ({ p, score: p.moods.filter(m => state.moodSelection.includes(m)).length }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score);

    if (!ranked.length) {
      root.innerHTML = '<p style="grid-column:1/-1;color:rgba(0,10,54,0.5);font-style:italic;">Ingen paletter matcher præcist — prøv en anden kombination eller byg en palet selv ved at klikke "Tilføj farve" nedenfor.</p>';
      return;
    }

    root.innerHTML = ranked.map(({ p }) => `
      <div class="palette-suggestion" data-palette="${escapeHtml(p.name)}">
        <div class="swatches">
          ${p.colors.map(c => `<div style="background:${c}"></div>`).join('')}
        </div>
        <div class="name">${escapeHtml(p.name)}</div>
        <div class="desc">${escapeHtml(p.desc)}</div>
      </div>
    `).join('');

    root.querySelectorAll('.palette-suggestion').forEach(el => {
      el.addEventListener('click', () => {
        const name = el.dataset.palette;
        const p = PALETTES.find(x => x.name === name);
        if (p) {
          state.palette = p.colors.slice();
          saveState();
          renderSelectedPalette();
          renderNav();
          toast('Palet indlæst — du kan finjustere farverne nedenfor');
        }
      });
    });
  }

  function renderSelectedPalette() {
    const root = $('#selected-palette');
    root.innerHTML = state.palette.map((c, i) => `
      <div class="swatch-edit">
        <div class="swatch" style="background:${c}">
          <input type="color" value="${c}" data-pi="${i}">
        </div>
        <div class="hex">${c}</div>
        <button class="remove" data-remove-color="${i}">Fjern</button>
      </div>
    `).join('') + `
      <button class="add-color" id="add-color" title="Tilføj farve">+</button>
    `;
    root.querySelectorAll('input[type=color]').forEach(inp => {
      inp.addEventListener('input', () => {
        const i = Number(inp.dataset.pi);
        state.palette[i] = inp.value.toUpperCase();
        saveState();
        renderSelectedPalette();
      });
    });
    root.querySelectorAll('[data-remove-color]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.removeColor);
        state.palette.splice(i, 1);
        saveState();
        renderSelectedPalette();
        renderNav();
      });
    });
    const add = root.querySelector('#add-color');
    if (add) add.addEventListener('click', () => {
      state.palette.push('#000A36');
      saveState();
      renderSelectedPalette();
      renderNav();
    });
  }

  // ===================== MODUL 6: FONTVALG =====================

  let fontsLoaded = false;
  function ensureFontPairsLoaded() {
    if (fontsLoaded) return;
    // Saml unikke fonte fra alle par
    const families = new Set();
    FONT_PAIRS.forEach(p => { families.add(p.heading); families.add(p.body); });
    const familySpec = Array.from(families).map(f => {
      // Loader 400 og 700 for alle for sikkerheds skyld
      return 'family=' + f.replace(/ /g, '+') + ':wght@400;700';
    }).join('&');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?' + familySpec + '&display=swap';
    document.head.appendChild(link);
    fontsLoaded = true;
  }

  function renderFontPairs() {
    const root = $('#font-pairs');
    if (!root) return;
    const sample = HEADING_SAMPLES[0];
    root.innerHTML = FONT_PAIRS.map(p => {
      const sel = state.selectedFontPair === p.name;
      return `
        <div class="font-pair ${sel ? 'selected' : ''}" data-pair="${escapeHtml(p.name)}">
          <div class="pair-name">${escapeHtml(p.name)}</div>
          <h3 class="heading-preview" style="font-family: '${p.heading}', serif; font-weight: ${p.headingWeight};">${escapeHtml(sample)}</h3>
          <p class="body-preview" style="font-family: '${p.body}', sans-serif; font-weight: ${p.bodyWeight};">${escapeHtml(BODY_SAMPLE)}</p>
          <div class="vibe">${escapeHtml(p.vibe)}</div>
          <div class="meta">${escapeHtml(p.heading)} + ${escapeHtml(p.body)}</div>
        </div>
      `;
    }).join('');
    root.querySelectorAll('.font-pair').forEach(el => {
      el.addEventListener('click', () => {
        const name = el.dataset.pair;
        state.selectedFontPair = state.selectedFontPair === name ? '' : name;
        saveState();
        renderFontPairs();
        renderSelectedFont();
        renderNav();
      });
    });
    renderSelectedFont();
  }

  function renderSelectedFont() {
    const wrap = $('#font-selected');
    const preview = $('#font-selected-preview');
    if (!wrap || !preview) return;
    if (!state.selectedFontPair) { wrap.style.display = 'none'; return; }
    const p = FONT_PAIRS.find(x => x.name === state.selectedFontPair);
    if (!p) { wrap.style.display = 'none'; return; }
    wrap.style.display = '';
    preview.innerHTML = `
      <div class="pair-name" style="font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--hcm-gold-hover);font-weight:600;margin-bottom:0.6rem;">${escapeHtml(p.name)}</div>
      <h2 class="heading-big" style="font-family:'${p.heading}', serif; font-weight: ${p.headingWeight};">${escapeHtml(state.fundament.tagline || HEADING_SAMPLES[1])}</h2>
      <p class="body-big" style="font-family:'${p.body}', sans-serif; font-weight: ${p.bodyWeight};">${escapeHtml(BODY_SAMPLE)}</p>
      <div style="font-size:0.75rem;font-family:monospace;color:rgba(0,10,54,0.5);margin-top:0.8rem;">Heading: ${escapeHtml(p.heading)} · Body: ${escapeHtml(p.body)}</div>
    `;
  }

  // ===================== MODUL 7: DESIGNELEMENTER =====================

  async function addDesignUrl() {
    const inp = $('#design-url');
    const raw = (inp.value || '').trim();
    if (!raw) { toast('Indsæt en URL'); return; }
    let url = raw;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    try { new URL(url); } catch (e) { toast('Ikke en gyldig URL', 'error'); return; }

    const id = 'url-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    const item = { id, type: 'url', url, title: extractDomain(url), image: '', loading: true };
    state.designElements.push(item);
    inp.value = '';
    saveState();
    renderDesignElements();
    renderNav();

    // Forsøg at hente og:image via microlink (gratis tier, fallback hvis fejl)
    try {
      const res = await fetch('https://api.microlink.io/?url=' + encodeURIComponent(url));
      const data = await res.json();
      const found = state.designElements.find(x => x.id === id);
      if (!found) return;
      found.loading = false;
      if (data && data.status === 'success' && data.data) {
        if (data.data.image && data.data.image.url) found.image = data.data.image.url;
        if (data.data.title) found.title = data.data.title;
      }
      saveState();
      renderDesignElements();
    } catch (err) {
      const found = state.designElements.find(x => x.id === id);
      if (found) { found.loading = false; saveState(); renderDesignElements(); }
    }
  }

  function extractDomain(url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return url; }
  }

  function uploadDesignImages(event) {
    const files = Array.from(event.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        state.designElements.push({
          id: 'img-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
          type: 'image', image: reader.result, url: '', title: file.name, loading: false,
        });
        saveState();
        renderDesignElements();
        renderNav();
      };
      reader.readAsDataURL(file);
    });
    event.target.value = '';
  }

  function renderDesignElements() {
    const root = $('#design-elements');
    if (!root) return;
    root.classList.toggle('empty', state.designElements.length === 0);
    root.innerHTML = state.designElements.map((el, i) => {
      const thumbHtml = el.loading
        ? '<div class="thumb-loading">Henter preview…</div>'
        : el.image
          ? `<img src="${el.image}" alt="${escapeHtml(el.title || '')}" referrerpolicy="no-referrer">`
          : '<div class="thumb-fallback">↗</div>';
      const meta = el.type === 'url'
        ? `<div class="title">${escapeHtml(el.title || extractDomain(el.url))}</div>
           <div class="source"><a href="${escapeHtml(el.url)}" target="_blank" rel="noopener">${escapeHtml(extractDomain(el.url))}</a></div>`
        : `<div class="title">${escapeHtml(el.title || 'Upload')}</div><div class="source">Lokal fil</div>`;
      return `
        <div class="design-item" data-index="${i}">
          <div class="thumb">${thumbHtml}</div>
          <div class="meta">${meta}</div>
          <button class="remove-btn" data-remove="${i}" title="Fjern">×</button>
        </div>
      `;
    }).join('');

    root.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const i = Number(btn.dataset.remove);
        state.designElements.splice(i, 1);
        saveState();
        renderDesignElements();
        renderNav();
      });
    });

    if (window.Sortable && !root.dataset.sortableInit) {
      window.Sortable.create(root, {
        animation: 150,
        onEnd: () => {
          const newOrder = $$('.design-item', root).map(el => Number(el.dataset.index));
          state.designElements = newOrder.map(i => state.designElements[i]);
          saveState();
          renderDesignElements();
        },
      });
      root.dataset.sortableInit = '1';
    }
  }

  function bindDesignDragDrop() {
    const root = $('#design-elements');
    if (!root) return;
    ['dragenter', 'dragover'].forEach(evt => {
      root.addEventListener(evt, (e) => {
        e.preventDefault();
        if (e.dataTransfer && e.dataTransfer.types.includes('Files')) root.classList.add('dragover');
      });
    });
    ['dragleave', 'drop'].forEach(evt => {
      root.addEventListener(evt, () => root.classList.remove('dragover'));
    });
    root.addEventListener('drop', (e) => {
      const files = Array.from(e.dataTransfer.files || []).filter(f => /^image\//.test(f.type));
      if (!files.length) return;
      e.preventDefault();
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          state.designElements.push({
            id: 'img-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
            type: 'image', image: reader.result, url: '', title: file.name, loading: false,
          });
          saveState();
          renderDesignElements();
          renderNav();
        };
        reader.readAsDataURL(file);
      });
    });
  }

  // ===================== MODUL 8: MOODBOARD (summary) =====================

  function renderMoodboardSummary() {
    const root = $('#moodboard-summary');
    if (!root) return;
    root.innerHTML = buildMoodboardHtml();
    bindCanvasInteractions();
  }

  function resetMoodboardLayout() {
    state.canvasLayout = {};
    saveState();
    renderMoodboardSummary();
    toast('Layout nulstillet');
  }

  function bindCanvasInteractions() {
    if (!window.interact) return;
    const widgets = $$('.mb-widget');
    if (!widgets.length) return;

    // Bring to front on mousedown
    widgets.forEach(w => {
      w.addEventListener('pointerdown', () => {
        const max = Math.max(0, ...$$('.mb-widget').map(el => parseInt(el.style.zIndex) || 0));
        w.style.zIndex = max + 1;
        commitWidgetLayout(w);
      });
    });

    interact('.mb-widget')
      .draggable({
        listeners: {
          move(event) {
            const t = event.target;
            const x = (parseFloat(t.dataset.x) || 0) + event.dx;
            const y = (parseFloat(t.dataset.y) || 0) + event.dy;
            t.style.transform = `translate(${x}px, ${y}px)`;
            t.dataset.x = x;
            t.dataset.y = y;
          },
          end(event) { commitWidgetLayout(event.target); }
        },
        inertia: false,
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move(event) {
            const t = event.target;
            let x = parseFloat(t.dataset.x) || 0;
            let y = parseFloat(t.dataset.y) || 0;
            t.style.width = event.rect.width + 'px';
            t.style.height = event.rect.height + 'px';
            x += event.deltaRect.left;
            y += event.deltaRect.top;
            t.style.transform = `translate(${x}px, ${y}px)`;
            t.dataset.x = x;
            t.dataset.y = y;
          },
          end(event) { commitWidgetLayout(event.target); }
        },
        modifiers: [
          interact.modifiers.restrictSize({ min: { width: 60, height: 40 } })
        ],
      });
  }

  function commitWidgetLayout(el) {
    const id = el.dataset.id;
    if (!id) return;
    if (!state.canvasLayout) state.canvasLayout = {};
    state.canvasLayout[id] = {
      x: Math.round(parseFloat(el.dataset.x) || 0),
      y: Math.round(parseFloat(el.dataset.y) || 0),
      w: Math.round(parseFloat(el.style.width) || el.offsetWidth),
      h: Math.round(parseFloat(el.style.height) || el.offsetHeight),
      z: parseInt(el.style.zIndex) || 1,
    };
    saveState();
  }

  function buildMoodboardHtml() {
    const widgets = collectMoodboardWidgets();
    if (widgets.length <= 1) {
      return `<div class="mb-empty-canvas">Udfyld modulerne for at se dit moodboard her.</div>`;
    }
    const layout = state.canvasLayout || {};
    return `
      <div class="mb-canvas-wrap">
        <div class="mb-canvas-area" id="mb-canvas-area">
          ${widgets.map(w => {
            const box = layout[w.id] || w.defaultBox;
            const z = box.z || w.defaultZ || 1;
            return `<div class="mb-widget mb-w-${w.type}" data-id="${w.id}" data-x="${box.x}" data-y="${box.y}"
              style="transform:translate(${box.x}px, ${box.y}px); width:${box.w}px; height:${box.h}px; z-index:${z};">
              ${w.html}
            </div>`;
          }).join('')}
        </div>
      </div>
    `;
  }

  function collectMoodboardWidgets() {
    const f = state.fundament;
    const fp = state.selectedFontPair ? FONT_PAIRS.find(x => x.name === state.selectedFontPair) : null;
    const photos = state.fotostil.slice(0, 8);
    const designs = state.designElements.slice(0, 8);
    const palette = state.palette || [];
    const nouns = state.nouns || [];
    const clientName = state.meta.client || f.company || 'Brand-brief';
    const year = (state.meta.date || '').slice(0, 4) || new Date().getFullYear();
    const widgets = [];

    const photoBoxes = [
      { x: 30,   y: 30,  w: 380, h: 280 },
      { x: 430,  y: 30,  w: 220, h: 280 },
      { x: 670,  y: 30,  w: 280, h: 200 },
      { x: 970,  y: 30,  w: 240, h: 200 },
      { x: 670,  y: 250, w: 220, h: 200 },
      { x: 910,  y: 250, w: 300, h: 200 },
      { x: 30,   y: 330, w: 200, h: 180 },
      { x: 250,  y: 330, w: 160, h: 180 },
    ];
    photos.forEach((p, i) => {
      widgets.push({
        id: `photo-${i}`, type: 'photo',
        defaultBox: photoBoxes[i] || { x: 30 + (i % 4) * 220, y: 540 + Math.floor(i / 4) * 200, w: 200, h: 180 },
        html: `<img src="${p.thumb || p.url}" alt="" referrerpolicy="no-referrer" draggable="false">`,
      });
    });

    if (palette.length) {
      widgets.push({
        id: 'palette', type: 'palette',
        defaultBox: { x: 1230, y: 30, w: 140, h: 480 },
        html: `
          <div class="mb-stripe-label">Palet</div>
          ${palette.map(c => `<div class="mb-stripe-swatch" style="background:${c}"><span class="mb-stripe-hex">${c.toUpperCase()}</span></div>`).join('')}
          ${state.moodSelection.length ? `<div class="mb-stripe-moods">${state.moodSelection.map(escapeHtml).join(' · ')}</div>` : ''}
        `,
      });
    }

    if (fp) {
      widgets.push({
        id: 'typography', type: 'typography',
        defaultBox: { x: 30, y: 540, w: 440, h: 200 },
        html: `
          <div class="mb-tile-label">Typografi</div>
          <div class="mb-type-stack">
            <div class="mb-type-headline" style="font-family:'${fp.heading}', Georgia, serif; font-weight:${fp.headingWeight};">${escapeHtml(f.tagline || 'Aa Bb Cc')}</div>
            <p class="mb-type-body" style="font-family:'${fp.body}', sans-serif; font-weight:${fp.bodyWeight};">Et stærkt visuelt sprog handler om klarhed og karakter.</p>
          </div>
          <div class="mb-type-meta"><span>${escapeHtml(fp.heading)}</span><em>+</em><span>${escapeHtml(fp.body)}</span></div>
        `,
      });
    }

    if (nouns.length) {
      widgets.push({
        id: 'words', type: 'words',
        defaultBox: { x: 490, y: 540, w: 240, h: 200 },
        html: `
          <div class="mb-tile-label">Logo mark</div>
          <div class="mb-words-cloud">
            ${nouns.map(n => `<span class="mb-word">${escapeHtml(n)}</span>`).join('')}
          </div>
        `,
      });
    }

    if (f.mission) {
      widgets.push({
        id: 'quote', type: 'quote',
        defaultBox: { x: 750, y: 540, w: 320, h: 200 },
        html: `
          <div class="mb-tile-label">Mission</div>
          <blockquote class="mb-quote-text">${escapeHtml(f.mission)}</blockquote>
        `,
      });
    }

    widgets.push({
      id: 'personality', type: 'personality',
      defaultBox: { x: 30, y: 760, w: 440, h: 200 },
      html: `
        <div class="mb-tile-label">Personlighed</div>
        <div class="mb-axes">
          ${SLIDERS.map(s => {
            const v = state.sliders[s.key];
            return `<div class="mb-axis">
              <span class="mb-axis-l">${escapeHtml(s.left)}</span>
              <div class="mb-axis-track"><div class="mb-axis-dot" style="left:${v}%"></div></div>
              <span class="mb-axis-r">${escapeHtml(s.right)}</span>
            </div>`;
          }).join('')}
        </div>
      `,
    });

    designs.forEach((el, i) => {
      const col = i % 6;
      const row = Math.floor(i / 6);
      const box = { x: 30 + col * 220, y: 980 + row * 200, w: 200, h: 180 };
      if (el.image) {
        widgets.push({
          id: `design-${i}`, type: 'design',
          defaultBox: box,
          html: `<img src="${el.image}" alt="" referrerpolicy="no-referrer" draggable="false">`,
        });
      } else {
        widgets.push({
          id: `design-${i}`, type: 'design-url',
          defaultBox: box,
          html: `<div class="mb-design-url-inner">${escapeHtml(extractDomain(el.url))}</div>`,
        });
      }
    });

    return widgets;
  }

  async function exportMoodboardPNG() {
    const node = $('#mb-canvas-area') || $('#moodboard-summary');
    if (!node) return;
    toast('Genererer billede…');
    try {
      await Promise.all($$('img', node).map(img => new Promise(res => {
        if (img.complete) res(); else { img.onload = res; img.onerror = res; }
      })));
      const canvas = await html2canvas(node, { scale: 2, useCORS: true, backgroundColor: '#faf8f3', logging: false, width: node.offsetWidth, height: node.offsetHeight });
      const link = document.createElement('a');
      const filename = (state.meta.client || state.fundament.company || 'moodboard')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-moodboard.png';
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast('Moodboard gemt som PNG', 'success');
    } catch (err) {
      console.error(err);
      toast('Fejl ved billede-eksport: ' + err.message, 'error');
    }
  }

  function refreshMoodboard() {
    renderMoodboardSummary();
    toast('Opdateret');
  }

  // ===================== MODUL 9: EKSPORT =====================

  function buildPdfHtml() {
    const f = state.fundament;
    const fp = state.selectedFontPair ? FONT_PAIRS.find(x => x.name === state.selectedFontPair) : null;
    const sliderRows = SLIDERS.map(s => {
      const v = state.sliders[s.key];
      return `
        <div style="margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:600;color:#000A36;margin-bottom:4px;">
            <span>${s.left}</span><span>${s.right}</span>
          </div>
          <div style="height:8px;background:#E9F9FF;border-radius:4px;position:relative;border:1px solid rgba(0,10,54,0.1);">
            <div style="position:absolute;left:${v}%;top:-4px;width:16px;height:16px;border-radius:50%;background:#E2C201;border:2px solid #000A36;transform:translateX(-50%);"></div>
          </div>
        </div>
      `;
    }).join('');

    const fotostilHtml = state.fotostil.length ? `
      <h2 style="font-family:'Playfair Display',Georgia,serif;color:#000A36;border-bottom:2px solid #E2C201;padding-bottom:6px;margin-top:32px;">Fotostil</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:14px;">
        ${state.fotostil.slice(0, 12).map(m => `
          <div style="aspect-ratio:1;background:#E9F9FF;border-radius:4px;overflow:hidden;">
            <img src="${m.url}" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;display:block;">
          </div>
        `).join('')}
      </div>
    ` : '';

    const designHtml = state.designElements.length ? `
      <h2 style="font-family:'Playfair Display',Georgia,serif;color:#000A36;border-bottom:2px solid #E2C201;padding-bottom:6px;margin-top:32px;">Designelementer</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:14px;">
        ${state.designElements.slice(0, 9).map(el => {
          if (el.image) return `<div style="aspect-ratio:16/10;background:#E9F9FF;border-radius:4px;overflow:hidden;"><img src="${el.image}" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;display:block;"></div>`;
          return `<div style="aspect-ratio:16/10;background:#000A36;color:#E9F9FF;border-radius:4px;padding:8px;font-size:10px;display:flex;align-items:center;justify-content:center;text-align:center;">${escapeHtml(extractDomain(el.url))}</div>`;
        }).join('')}
      </div>
    ` : '';

    const paletteHtml = state.palette.length ? `
      <h2 style="font-family:'Playfair Display',Georgia,serif;color:#000A36;border-bottom:2px solid #E2C201;padding-bottom:6px;margin-top:32px;">Farvepalet</h2>
      <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">
        ${state.palette.map(c => `
          <div style="text-align:center;">
            <div style="width:80px;height:80px;border-radius:6px;background:${c};border:1px solid rgba(0,10,54,0.1);"></div>
            <div style="font-size:10px;margin-top:4px;letter-spacing:0.05em;color:#000A36;">${c}</div>
          </div>
        `).join('')}
      </div>
      ${state.moodSelection.length ? `<p style="font-size:11px;color:rgba(0,10,54,0.6);margin-top:8px;">Stemninger: ${state.moodSelection.map(escapeHtml).join(' · ')}</p>` : ''}
    ` : '';

    const nounsHtml = state.nouns.length ? `
      <h2 style="font-family:'Playfair Display',Georgia,serif;color:#000A36;border-bottom:2px solid #E2C201;padding-bottom:6px;margin-top:32px;">Logo mark</h2>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;">
        ${state.nouns.map(n => `<span style="background:#000A36;color:#E9F9FF;border-radius:50px;padding:5px 12px;font-size:12px;">${escapeHtml(n)}</span>`).join('')}
      </div>
    ` : '';

    const fontsHtml = fp ? `
      <h2 style="font-family:'Playfair Display',Georgia,serif;color:#000A36;border-bottom:2px solid #E2C201;padding-bottom:6px;margin-top:32px;">Typografi</h2>
      <div style="background:#E9F9FF;border-radius:6px;padding:18px;margin-top:14px;">
        <div style="font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#C9AB01;font-weight:600;margin-bottom:6px;">${escapeHtml(fp.name)}</div>
        <div style="font-family:'${fp.heading}',serif;font-weight:${fp.headingWeight};font-size:24px;line-height:1.15;color:#000A36;margin-bottom:6px;">${escapeHtml(state.fundament.tagline || HEADING_SAMPLES[1])}</div>
        <div style="font-family:'${fp.body}',sans-serif;font-weight:${fp.bodyWeight};font-size:11px;line-height:1.5;color:rgba(0,10,54,0.8);">Et stærkt visuelt sprog handler om klarhed og karakter.</div>
        <div style="font-family:monospace;font-size:9px;color:rgba(0,10,54,0.5);margin-top:8px;">${escapeHtml(fp.heading)} + ${escapeHtml(fp.body)}</div>
      </div>
    ` : '';

    return `
      <div style="padding:50px 60px;font-family:'Raleway','Segoe UI',sans-serif;color:#000A36;background:#fff;line-height:1.6;">
        <div style="border-bottom:3px solid #000A36;padding-bottom:16px;margin-bottom:24px;">
          <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C9AB01;font-weight:600;">Brand Workshop</div>
          <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:36px;margin:6px 0 4px 0;font-weight:700;">${escapeHtml(state.meta.client || f.company || 'Brand-brief')}</h1>
          <div style="font-size:12px;color:rgba(0,10,54,0.6);">${escapeHtml(state.meta.date || '')} · Faciliteret af Holy Cow Media</div>
        </div>

        <h2 style="font-family:'Playfair Display',Georgia,serif;color:#000A36;border-bottom:2px solid #E2C201;padding-bottom:6px;">Fundament</h2>
        ${f.tagline ? `<p style="font-size:15px;font-style:italic;color:rgba(0,10,54,0.85);">"${escapeHtml(f.tagline)}"</p>` : ''}
        ${f.mission ? `<p><strong>Mission:</strong> ${escapeHtml(f.mission)}</p>` : ''}
        ${f.target ? `<p><strong>Målgruppe:</strong> ${escapeHtml(f.target)}</p>` : ''}
        ${f.problem ? `<p><strong>Problem vi løser:</strong> ${escapeHtml(f.problem)}</p>` : ''}
        ${f.values ? `<p><strong>Kerneværdier:</strong> ${escapeHtml(f.values)}</p>` : ''}
        ${f.forbidden ? `<p><strong>Brandet må aldrig være:</strong> ${escapeHtml(f.forbidden)}</p>` : ''}

        <h2 style="font-family:'Playfair Display',Georgia,serif;color:#000A36;border-bottom:2px solid #E2C201;padding-bottom:6px;margin-top:32px;">Personlighed</h2>
        ${sliderRows}

        ${nounsHtml}
        ${paletteHtml}
        ${fontsHtml}
        ${fotostilHtml}
        ${designHtml}

        <div style="margin-top:48px;padding-top:14px;border-top:1px solid rgba(0,10,54,0.1);font-size:10px;color:rgba(0,10,54,0.5);text-align:center;">
          Holy Cow Media · holycow.media · Faciliteret brand-workshop
        </div>
      </div>
    `;
  }

  async function exportPDF() {
    const container = $('#pdf-render');
    container.innerHTML = buildPdfHtml();
    toast('Genererer PDF — vent et øjeblik…');

    await Promise.all($$('img', container).map(img => new Promise(res => {
      if (img.complete) res();
      else { img.onload = res; img.onerror = res; }
    })));

    try {
      const canvas = await html2canvas(container.firstElementChild, { scale: 2, useCORS: true, backgroundColor: '#ffffff', logging: false });
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = canvas.height * (imgW / canvas.width);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

      let position = 0;
      let heightLeft = imgH;
      pdf.addImage(dataUrl, 'JPEG', 0, position, imgW, imgH);
      heightLeft -= pageH;
      while (heightLeft > 0) {
        position = heightLeft - imgH;
        pdf.addPage();
        pdf.addImage(dataUrl, 'JPEG', 0, position, imgW, imgH);
        heightLeft -= pageH;
      }

      const filename = (state.meta.client || state.fundament.company || 'brand-brief')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.pdf';
      pdf.save(filename);
      toast('PDF gemt!', 'success');
    } catch (err) {
      console.error(err);
      toast('Fejl ved PDF-generering: ' + err.message, 'error');
    } finally {
      container.innerHTML = '';
    }
  }

  function exportMarkdown() {
    const f = state.fundament;
    const fp = state.selectedFontPair ? FONT_PAIRS.find(x => x.name === state.selectedFontPair) : null;
    const lines = [];
    lines.push(`# ${state.meta.client || f.company || 'Brand-brief'}`);
    lines.push('');
    lines.push(`*Workshop-brief faciliteret af Holy Cow Media · ${state.meta.date || ''}*`);
    lines.push('');
    lines.push('## Fundament');
    if (f.tagline) lines.push(`> ${f.tagline}`);
    if (f.mission) lines.push(`- **Mission:** ${f.mission}`);
    if (f.target) lines.push(`- **Målgruppe:** ${f.target}`);
    if (f.problem) lines.push(`- **Problem vi løser:** ${f.problem}`);
    if (f.values) lines.push(`- **Kerneværdier:** ${f.values}`);
    if (f.forbidden) lines.push(`- **Brandet må aldrig være:** ${f.forbidden}`);
    lines.push('');

    lines.push('## Personlighed');
    SLIDERS.forEach(s => {
      const v = state.sliders[s.key];
      const arrow = v < 33 ? '←' : v > 67 ? '→' : '↔';
      lines.push(`- **${s.left} ${arrow} ${s.right}:** ${v}%`);
    });
    lines.push('');

    if (state.nouns.length) {
      lines.push('## Logo mark');
      lines.push(state.nouns.map(n => `\`${n}\``).join(' · '));
      lines.push('');
    }

    if (state.palette.length) {
      lines.push('## Farvepalet');
      if (state.moodSelection.length) {
        lines.push(`*Stemninger: ${state.moodSelection.join(', ')}*`);
        lines.push('');
      }
      state.palette.forEach(c => lines.push(`- \`${c}\``));
      lines.push('');
    }

    if (fp) {
      lines.push('## Typografi');
      lines.push(`- **Par:** ${fp.name}`);
      lines.push(`- **Overskrifter:** ${fp.heading}`);
      lines.push(`- **Brødtekst:** ${fp.body}`);
      lines.push(`- **Karakter:** ${fp.vibe}`);
      lines.push('');
    }

    if (state.fotostil.length) {
      lines.push('## Fotostil');
      lines.push('');
      state.fotostil.forEach((m, i) => {
        const credit = m.photographer ? ` (Foto: ${m.photographer} / Unsplash)` : '';
        lines.push(`![Fotostil ${i + 1}](${m.url})${credit}`);
        lines.push('');
      });
    }

    if (state.designElements.length) {
      lines.push('## Designelementer');
      lines.push('');
      state.designElements.forEach((el, i) => {
        if (el.image) {
          lines.push(`![${el.title || 'Designreference'}](${el.image})`);
        } else {
          lines.push(`- [${el.title || extractDomain(el.url)}](${el.url})`);
        }
        lines.push('');
      });
    }

    lines.push('---');
    lines.push('*Genereret af Holy Cow Media Brand Workshop*');

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const filename = (state.meta.client || f.company || 'brand-brief')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.md';
    download(blob, filename);
    toast('Markdown gemt — træk filen ind i Notion via Importér', 'success');
  }

  function exportSession() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const filename = (state.meta.client || state.fundament.company || 'session')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-session.json';
    download(blob, filename);
    toast('Session gemt', 'success');
  }

  function importSession(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (parsed.moodboard && !parsed.fotostil) {
          parsed.fotostil = parsed.moodboard;
          delete parsed.moodboard;
        }
        state = Object.assign(defaultState(), parsed);
        saveState();
        rerenderAll();
        toast('Session indlæst', 'success');
      } catch (e) {
        toast('Kunne ikke læse filen', 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function resetSession() {
    if (!confirm('Nulstil hele sessionen? Dette kan ikke fortrydes.')) return;
    state = defaultState();
    saveState();
    rerenderAll();
    toast('Session nulstillet');
  }

  function download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ===================== INIT =====================

  function rerenderAll() {
    $$('[data-state]').forEach(input => {
      const v = getNested(input.dataset.state);
      if (v != null) input.value = v;
    });
    $('#client-name').value = state.meta.client || '';
    $('#session-date').value = state.meta.date || '';
    renderSliders();
    renderNouns();
    renderFotostil();
    renderMoodChips();
    renderPaletteSuggestions();
    renderSelectedPalette();
    renderFontPairs();
    renderDesignElements();
    renderNav();
    go(state.currentModule);
  }

  function init() {
    loadState();
    bindFundament();
    renderSliders();
    bindNouns();
    renderNouns();
    bindFotostil();
    renderFotostil();
    renderMoodChips();
    renderPaletteSuggestions();
    renderSelectedPalette();
    renderFontPairs();
    bindDesignDragDrop();
    renderDesignElements();
    renderNav();
    go(state.currentModule);

    $('#design-url').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); addDesignUrl(); }
    });
  }

  // Public API
  window.app = {
    go, next, prev,
    searchUnsplash,
    uploadImages,
    addDesignUrl,
    uploadDesignImages,
    refreshMoodboard,
    resetMoodboardLayout,
    exportMoodboardPNG,
    exportPDF,
    exportMarkdown,
    exportSession,
    importSession,
    resetSession,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
