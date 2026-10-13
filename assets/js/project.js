(() => {
  // Image links still open the original files when JavaScript is unavailable.
  if (typeof HTMLDialogElement !== 'undefined' && typeof HTMLDialogElement.prototype.showModal === 'function') {
    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-label', 'Enlarged project image');
    dialog.innerHTML = '<div class="lightbox-head"><p></p><button type="button">Close</button></div><img alt="">';
    document.body.appendChild(dialog);
    let opener;
    const close = () => { dialog.close(); if (opener) opener.focus(); };
    dialog.querySelector('button').addEventListener('click', close);
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
    });
    document.querySelectorAll('[data-lightbox]').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        opener = link;
        const thumbnail = link.querySelector('img');
        const image = dialog.querySelector('img');
        image.src = link.href;
        image.alt = thumbnail ? thumbnail.alt : 'Project image';
        dialog.querySelector('p').textContent = link.dataset.caption || image.alt;
        dialog.showModal();
      });
    });
  }

  // The optional viewer and model are requested only after an explicit click.
  let viewerModule;
  let viewerAttempts = 0;
  const loadViewer = () => {
    if (customElements.get('model-viewer')) return Promise.resolve();
    if (!viewerModule) {
      const retry = viewerAttempts++ ? `?retry=${viewerAttempts}` : '';
      viewerModule = import(`https://cdn.jsdelivr.net/npm/@google/model-viewer@4.1.0/dist/model-viewer.min.js${retry}`)
        .catch(() => customElements.get('model-viewer') || import(`https://unpkg.com/@google/model-viewer@4.1.0/dist/model-viewer.min.js${retry}`))
        .then(() => customElements.whenDefined('model-viewer'))
        .catch(error => {
          if (customElements.get('model-viewer')) return;
          viewerModule = undefined;
          throw error;
        });
    }
    return viewerModule;
  };
  const withTimeout = async (promise, milliseconds) => {
    let timer;
    try {
      return await Promise.race([promise, new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('Viewer timed out')), milliseconds);
      })]);
    } finally { clearTimeout(timer); }
  };
  document.querySelectorAll('[data-load-model]').forEach(button => {
    const stage = button.closest('.model-stage');
    const model = stage.querySelector('model-viewer');
    const status = stage.querySelector('[data-model-status]');
    let modelAttempts = 0;
    // Browsers cannot fetch a GLB from file://, regardless of the CAD source format.
    if (location.protocol === 'file:') {
      button.disabled = true;
      status.textContent = 'To view this board in 3D, open the portfolio with Preview portfolio.cmd in the parent folder, or through a local web server. Browsers block 3D model loading from directly opened HTML files. CAD images and downloads are available below.';
      return;
    }
    button.addEventListener('click', async () => {
      button.disabled = true;
      stage.classList.add('is-loading');
      stage.setAttribute('aria-busy', 'true');
      status.textContent = 'Loading the interactive viewer…';
      let cleanup = () => {};
      try {
        await withTimeout(loadViewer(), 25000);
        // Clear a failed source so selecting Retry actually requests the model again.
        model.src = '';
        await model.updateComplete;
        status.textContent = 'Loading the board assembly…';
        const loaded = new Promise((resolve, reject) => {
          const onLoad = () => resolve();
          const onError = () => reject(new Error('Model could not load'));
          cleanup = () => {
            model.removeEventListener('load', onLoad);
            model.removeEventListener('error', onError);
          };
          model.addEventListener('load', onLoad);
          model.addEventListener('error', onError);
        });
        // Give the renderer a visible, sized viewport while the assembly loads.
        model.loading = 'eager';
        const source = new URL(model.dataset.src, document.baseURI);
        // model-viewer caches failed loads too; a fresh URL bypasses that cache.
        if (modelAttempts++) source.searchParams.set('retry', modelAttempts);
        model.src = source.href;
        await withTimeout(loaded, 45000);
        stage.classList.add('is-loaded');
        stage.querySelector('.media-placeholder').hidden = true;
        status.textContent = 'Drag to rotate. Scroll or pinch to zoom. Right-drag or use two fingers to pan. Keyboard: arrow keys rotate; Page Up / Page Down zoom.';
        model.focus();
      } catch (error) {
        cleanup();
        if (customElements.get('model-viewer')) {
          model.src = '';
          await model.updateComplete;
        } else { viewerModule = undefined; }
        stage.classList.remove('is-loaded');
        stage.querySelector('.media-placeholder').hidden = false;
        status.textContent = error.message === 'Model could not load'
          ? 'The board assembly could not load. Select Retry to try again, or use the CAD images and downloads below.'
          : 'The 3D viewer could not finish loading. Check your connection and select Retry. CAD images and downloads remain available below.';
        button.textContent = 'Retry interactive board';
        button.disabled = false;
      } finally {
        cleanup();
        stage.classList.remove('is-loading');
        stage.removeAttribute('aria-busy');
      }
    });
  });

  // No video provider is contacted until the visitor presses this button.
  document.querySelectorAll('[data-load-video]').forEach(button => {
    button.addEventListener('click', () => {
      const frame = button.closest('.media-frame');
      const videoUrl = new URL(button.dataset.videoUrl);
      const allowedHosts = ['www.youtube-nocookie.com', 'player.vimeo.com'];
      if (!allowedHosts.includes(videoUrl.hostname)) return;
      const iframe = document.createElement('iframe');
      iframe.src = videoUrl.href;
      iframe.title = button.dataset.videoTitle || 'Project video';
      iframe.loading = 'lazy';
      iframe.allow = 'fullscreen; picture-in-picture';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      frame.replaceChildren(iframe);
    });
  });
})();
