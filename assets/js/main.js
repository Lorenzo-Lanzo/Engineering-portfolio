(() => {
  const themeButton = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = () => document.documentElement.dataset.theme || (systemTheme.matches ? 'dark' : 'light');
  function updateThemeLabel() {
    if (themeButton) themeButton.setAttribute('aria-label', `Switch to ${currentTheme() === 'dark' ? 'light' : 'dark'} theme`);
  }
  if (themeButton) {
    themeButton.hidden = false;
    updateThemeLabel();
    themeButton.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('portfolio-theme', next); } catch (_) { /* Optional preference storage. */ }
      updateThemeLabel();
    });
    systemTheme.addEventListener('change', updateThemeLabel);
  }
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  if (menuButton && navigation) {
    menuButton.hidden = false;
    document.documentElement.classList.add('navigation-enhanced');
    function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      navigation.classList.toggle('is-open', !expanded);
    });
    navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
    document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
    window.matchMedia('(max-width: 720px)').addEventListener('change', closeMenu);
  }
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const section = group.closest('section');
    const cards = [...section.querySelectorAll('.project-card')];
    const status = section.querySelector('[data-filter-status]');
    const empty = section.querySelector('[data-filter-empty]');
    group.hidden = false;
    group.addEventListener('click', event => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      const category = button.dataset.filter;
      group.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let visible = 0;
      cards.forEach(card => { card.hidden = category !== 'all' && !card.dataset.categories.split(' ').includes(category); if (!card.hidden) visible++; });
      if (status) status.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} shown.`;
      if (empty) empty.hidden = visible !== 0;
    });
  });
  document.querySelectorAll('[data-current-year]').forEach(element => { element.textContent = new Date().getFullYear(); });

  // Read shared content over HTTP/HTTPS; static HTML remains available offline.
  if (location.protocol === 'http:' || location.protocol === 'https:') {
    document.querySelectorAll('[data-toolbox-source]').forEach(async toolbox => {
      try {
        const sourceURL = new URL(toolbox.dataset.toolboxSource, document.baseURI);
        if (sourceURL.origin !== location.origin) return;
        const response = await fetch(sourceURL.href, { cache: 'no-cache' });
        if (!response.ok) return;
        const page = new DOMParser().parseFromString(await response.text(), 'text/html');
        const skills = [...page.querySelectorAll('[data-toolbox] > section')].map(section => ({
          heading: section.querySelector('h3'),
          details: section.querySelector('p')
        }));
        if (!skills.length || skills.some(skill => !skill.heading || !skill.details)) return;
        const items = skills.map((skill, index) => {
          const item = document.createElement('div');
          const number = document.createElement('span');
          number.className = 'skill-index';
          number.textContent = String(index + 1).padStart(2, '0');
          item.append(number, document.importNode(skill.heading, true), document.importNode(skill.details, true));
          return item;
        });
        toolbox.replaceChildren(...items);
      } catch (_) { /* Keep the static skills when the About page cannot load. */ }
    });

    // Fetch each case study once per overview page.
    const projectPages = new Map();
    document.querySelectorAll('.project-card .card-image, .hero-visual').forEach(async link => {
      const image = link.querySelector('img');
      if (!image) return;
      try {
        const projectURL = new URL(link.getAttribute('href'), document.baseURI);
        if (projectURL.origin !== location.origin) return;
        if (!projectPages.has(projectURL.href)) {
          projectPages.set(projectURL.href, fetch(projectURL.href, { cache: 'no-cache' }).then(async response => {
            if (!response.ok) throw new Error('Project page unavailable');
            return { page: new DOMParser().parseFromString(await response.text(), 'text/html'), url: response.url };
          }));
        }
        const project = await projectPages.get(projectURL.href);
        const cover = project.page.querySelector('.project-cover img');
        if (!cover || !cover.getAttribute('src')) return;
        const mainURL = new URL(cover.getAttribute('src'), project.url);
        const galleryLink = link.matches('.card-image') && [...project.page.querySelectorAll('.gallery a[href]')]
          .find(anchor => new URL(anchor.getAttribute('href'), project.url).href === mainURL.href);
        const thumbnail = galleryLink && galleryLink.querySelector('img[src]');
        const source = thumbnail || cover;
        const imageURL = new URL(source.getAttribute('src'), project.url);
        if (imageURL.href !== image.src) {
          const preview = new Image();
          preview.src = imageURL.href;
          await preview.decode();
          image.width = preview.naturalWidth;
          image.height = preview.naturalHeight;
          image.src = imageURL.href;
        }
        image.alt = cover.getAttribute('alt') || source.getAttribute('alt') || image.alt;
        const badge = link.querySelector('.image-badge');
        if (badge) {
          const label = cover.dataset.mediaLabel;
          badge.hidden = !label;
          if (label) badge.textContent = label;
        }
      } catch (_) { /* Keep the static preview when a page or image cannot load. */ }
    });
  }
})();
