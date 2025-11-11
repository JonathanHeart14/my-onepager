document.addEventListener('DOMContentLoaded', function () {
  // 🔹 Booting-Klasse nach dem ersten Render wieder entfernen:
  setTimeout(() => {
    document.documentElement.classList.remove('booting');
  }, 0);
});

/* ========= 1) Footer-Jahr ========= */
document.addEventListener('DOMContentLoaded', function () {
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
});


/* ========= 2) ?from=… an Impressum/Datenschutz ========= */
document.addEventListener('DOMContentLoaded', function () {
  (function () {
    const section =
      document.querySelector('.site-toggle a[aria-current="page"]')
        ?.textContent.replace('.', '') || 'home';

    document.querySelectorAll('a[href$="impressum.html"], a[href$="datenschutz.html"]').forEach(a => {
      try {
        const url = new URL(a.getAttribute('href'), location.href); // relativ zur aktuellen Seite
        if (!url.searchParams.has('from')) url.searchParams.set('from', section);
        const rel = url.pathname.replace(location.origin, '') + (url.search || '') + (url.hash || '');
        a.setAttribute('href', rel);
      } catch { /* ignore */ }
    });
  })();
});


/* ========= 3) Burger-Menü / Mobile Overlay ========= */
document.addEventListener('DOMContentLoaded', function () {
  (() => {
    const burger = document.querySelector('.burger');
    const srcList = document.querySelector('.site-nav .nav-list');
    if (!burger || !srcList) return;

    let overlay = null;
    let initialized = false;

    const isOpen = () => overlay && overlay.hasAttribute('data-open');

    function openMenu() {
      if (!overlay) return;
      overlay.setAttribute('data-open', '');
      overlay.removeAttribute('aria-hidden');
      document.body.classList.add('menu-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.classList.add('active');
    }
    function closeMenu(animated = true) {
      if (!overlay) return;
      if (!animated) overlay.classList.add('no-anim');
      overlay.removeAttribute('data-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.classList.remove('active');
      if (!animated) requestAnimationFrame(() => overlay.classList.remove('no-anim'));
    }

    function handleBurgerClick() { isOpen() ? closeMenu(true) : openMenu(); }
    function handleOverlayClick(e) { if (e.target.closest('a')) closeMenu(true); }
    function handleKeydown(e) { if (e.key === 'Escape' && isOpen()) closeMenu(true); }

    function initMobile() {
      if (initialized) return;

      overlay = document.getElementById('mobile-menu');
      if (!overlay) {
        overlay = document.createElement('ul');
        overlay.id = 'mobile-menu';
        overlay.className = 'nav-overlay';
        overlay.innerHTML = `${srcList.innerHTML}
          <li class="nav-footer">
            <p>© ${new Date().getFullYear()} Jonathan Heart<br>
            musician · producer · mixing engineer</p>
          </li>`;
        overlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(overlay);
      }

      burger.addEventListener('click', handleBurgerClick);
      overlay.addEventListener('click', handleOverlayClick);
      window.addEventListener('keydown', handleKeydown);

      if (!burger.hasAttribute('type')) burger.setAttribute('type', 'button');
      burger.setAttribute('aria-controls', 'mobile-menu');
      burger.setAttribute('aria-expanded', 'false');

      initialized = true;
    }

    function teardownDesktop() {
      if (!initialized) return;
      closeMenu(true);
      burger.removeEventListener('click', handleBurgerClick);
      if (overlay) overlay.removeEventListener('click', handleOverlayClick);
      window.removeEventListener('keydown', handleKeydown);
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      overlay = null;
      initialized = false;
    }

    function syncStateToViewport() {
      if (window.innerWidth <= 900) initMobile();
      else teardownDesktop();
    }

    // Home-Icon schließt ggf. Menü sofort
    const home = document.querySelector('.home-link');
    if (home) {
      const instantClose = () => { if (isOpen()) closeMenu(false); };
      home.addEventListener('click', instantClose);
      home.addEventListener('touchend', instantClose, { passive: true });
    }

        // Site-Toggle schließt ggf. Menü sofort
    const sitetoggles = document.querySelectorAll('.site-toggle a');
    if (sitetoggles.length) {
      const instantClose = () => { if (isOpen()) closeMenu(false); };
      sitetoggles.forEach((a) => {
        a.addEventListener('click', instantClose);
        a.addEventListener('touchend', instantClose, { passive: true });
    });
  }

    syncStateToViewport();
    window.addEventListener('resize', syncStateToViewport, { passive: true });
  })();
});


/* ========= 4) Gallery: mobile Page/Chunk anpassen ========= */
(function setupResponsiveGalleryControls(){
  const apply = () => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    document.querySelectorAll('.js-gallery').forEach(gal => {
      const limitedStart = ['#about', '#studio'];
      const limitedMore  = ['#about', '#studio', '#gallery'];

      if (limitedStart.some(sel => gal.closest(sel))) {
        const basePage = parseInt(gal.dataset.basePage || gal.dataset.page || '3', 10);
        gal.dataset.basePage ??= String(basePage);
        gal.dataset.page = String(isMobile ? Math.max(0, Math.ceil(basePage / 2)) : basePage);
      }
      if (limitedMore.some(sel => gal.closest(sel))) {
        const baseChunk = parseInt(gal.dataset.baseChunk || gal.dataset.chunk || '3', 10);
        gal.dataset.baseChunk ??= String(baseChunk);
        gal.dataset.chunk = String(isMobile ? Math.max(1, Math.ceil(baseChunk / 3)) : baseChunk);
      }
    });
  };
  apply();
  window.addEventListener('resize', apply, { passive: true });
})();



/* ========= 5) Autoposter für Videos (IntersectionObserver) ========= */
document.addEventListener('DOMContentLoaded', function () {
  (() => {
    const vids = [...document.querySelectorAll('video[data-autoposter]')];

    const makePoster = (vid) => {
      const srcEl = vid.querySelector('source');
      const src = srcEl ? srcEl.src : vid.currentSrc;
      if (!src) return;

      const temp = document.createElement('video');
      temp.muted = true;
      temp.playsInline = true;
      temp.preload = 'auto';
      temp.crossOrigin = 'anonymous';

      const s = document.createElement('source');
      s.src = src; s.type = 'video/mp4';
      temp.appendChild(s);

      temp.addEventListener('loadedmetadata', () => {
        try { temp.currentTime = 0.05; } catch (_) { }
      }, { once: true });

      temp.addEventListener('seeked', () => {
        try {
          const c = document.createElement('canvas');
          c.width = temp.videoWidth; c.height = temp.videoHeight;
          c.getContext('2d').drawImage(temp, 0, 0, c.width, c.height);
          const dataURL = c.toDataURL('image/jpeg', 0.72);
          vid.setAttribute('poster', dataURL);
        } catch (_) { /* CORS? ignore */ }
        temp.pause();
        temp.removeAttribute('src');
        while (temp.firstChild) temp.removeChild(temp.firstChild);
      }, { once: true });

      temp.load();
    };

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const vid = entry.target;
        obs.unobserve(vid);
        if (!vid.getAttribute('poster')) makePoster(vid);
      });
    }, { rootMargin: '200px' });

    vids.forEach(v => io.observe(v));
  })();
});


/* ========= 6) Gallery + Lightbox + Hash-Nudges ========= */
document.addEventListener('DOMContentLoaded', function () {
  (() => {
    const galleries = Array.from(document.querySelectorAll('.js-gallery'));
    if (!galleries.length) return;

    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbClose = document.querySelector('.lb-close');
    const lbPrev = document.querySelector('.lb-prev');
    const lbNext = document.querySelector('.lb-next');
    const lbI = document.getElementById('lb-i');
    const lbN = document.getElementById('lb-n');
    let active = null;
    let touchX = null;

    const fullPath = (base, id, ext) => `${base}full/${id}.${ext}`;

    function makeInstance(grid) {
      const base = grid.dataset.base || '../assets/img/gallery/Studio%20Bilder/';
      const ext = grid.dataset.ext || 'jpg';
      const page = Math.max(0, parseInt(grid.dataset.page || '3', 10));


      const scope = grid.closest('.gallery-layout') || document;
      const btn = scope.querySelector('.js-gallery-more');

      let items = [];
      let rendered = 0;
      let anchors = [];
      let idx = 0;

      async function loadManifest() {
        try {
          const res = await fetch(`${base}manifest.json`);
          items = await res.json();
        } catch (e) {
          console.warn('No gallery manifest for', base, e);
          items = [];
        }
        if (lbN) lbN.textContent = String(items.length);
      }

      function refreshAnchors() {
        anchors = Array.from(grid.querySelectorAll('a.photo'));
        anchors.forEach((a, k) => a.dataset.index = String(k));
      }

      function renderNext(n) {
        const take = Math.max(0, n ?? page);
        const slice = items.slice(rendered, rendered + take);
        slice.forEach(it => {
          const id = it.id || (it.file || '').replace(/\.\w+$/, '');
          const alt = it.alt || '';

          const enableLightbox = grid.dataset.lightbox !== 'false';
          const el = enableLightbox ? document.createElement('a') : document.createElement('div');
          el.className = 'photo';

          if (enableLightbox) {
            el.href = `${base}full/${id}.${ext}`;
            el.dataset.full = el.href;
          }

          const thumbUrl = `${base}thumbs/${id}.${ext}`;
          const fullUrl  = `${base}full/${id}.${ext}`;

          // Hilfsfunktion: HEAD-Check mit kurzem Timeout
          async function thumbExists(url, ms = 2000){
            const ctl = new AbortController();
            const t = setTimeout(() => ctl.abort(), ms);
            try {
              const res = await fetch(url, { method: 'HEAD', signal: ctl.signal, cache: 'no-cache' });
              return res.ok;
            } catch (_) {
              return false;
            } finally {
              clearTimeout(t);
            }
          }

          // <img> erst erzeugen, dann je nach Existenz setzen (ohne 404 im Network)
          const img = document.createElement('img');
          img.loading = 'lazy';
          img.decoding = 'async';
          img.alt = alt;

          // optionales, leises onerror, falls doch was schiefgeht:
          img.onerror = () => { img.onerror = null; img.src = fullUrl; };

          thumbExists(thumbUrl).then(ok => {
            img.src = ok ? thumbUrl : fullUrl;
          });

          el.appendChild(img);
          grid.appendChild(el);

        });

        rendered += slice.length;
        if (btn) btn.hidden = rendered >= items.length;
        refreshAnchors();
      }

      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault(); e.stopPropagation();
          const chunk = Math.max(1, parseInt(grid.dataset.chunk || '3', 10));
          renderNext(chunk);
          btn.blur();
        });
      }

      loadManifest().then(() => {
        if (page > 0) {
          renderNext(page);

          if (window.__scrollToHashNow) {
            window.__scrollToHashNow();
            let tries = 0;
            const maxTries = 12;
            (function nudge() {
              if (++tries > maxTries) return;
              requestAnimationFrame(() => {
                window.__scrollToHashNow && window.__scrollToHashNow();
                nudge();
              });
            })();
          }
        } else {
          if (btn) btn.hidden = items.length === 0;
        }
      });

      function show(index) {
        if (!items.length) return;
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        idx = index;

        const it = items[idx];
        const id = it.id || (it.file || '').replace(/\.\w+$/, '');
        const alt = it.alt || '';
        const src = fullPath(base, id, ext);

        lbImg.src = '';
        lbImg.alt = alt;
        lbImg.src = src;

        if (lbI) lbI.textContent = String(idx + 1);
        if (lbN) lbN.textContent = String(items.length);

        const n1 = items[(idx + 1) % items.length];
        const p1 = items[(idx - 1 + items.length) % items.length];
        if (n1) { new Image().src = fullPath(base, n1.id || (n1.file || '').replace(/\.\w+$/, ''), ext); }
        if (p1) { new Image().src = fullPath(base, p1.id || (p1.file || '').replace(/\.\w+$/, ''), ext); }
      }

      function openLightbox(index) {
        active = { show, next: () => show(idx + 1), prev: () => show(idx - 1) };
        document.body.classList.add('lb-open');
        lb.hidden = false;
        show(index);
      }

      const enableLightbox = grid.dataset.lightbox !== 'false';
      grid.addEventListener('click', (e) => {
        if (!enableLightbox) return;
        const a = e.target.closest('a.photo');
        if (!a) return;
        e.preventDefault();
        openLightbox(parseInt(a.dataset.index || '0', 10));
      });

      return { openLightbox, show };
    }

    lbClose?.addEventListener('click', () => {
      lb.hidden = true;
      lbImg.src = '';
      document.body.classList.remove('lb-open');
      active = null;
    });
    lbPrev?.addEventListener('click', () => active && active.prev());
    lbNext?.addEventListener('click', () => active && active.next());
    lb?.addEventListener('click', (e) => { if (e.target === lb) lbClose?.click(); });

    window.addEventListener('keydown', (e) => {
      if (lb?.hidden) return;
      if (e.key === 'Escape' || e.key === 'Esc') { e.preventDefault(); lbClose?.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); active && active.prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); active && active.next(); }
    }, { capture: true });

    lb?.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    lb?.addEventListener('touchend', (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 40) { dx > 0 ? (active && active.prev()) : (active && active.next()); }
    });

    galleries.forEach(makeInstance);
  })();
});


/* ========= 7) Video-States Variante 1 ========= */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('#music .embed.video video').forEach(v => {
    v.classList.add('thumb');
    v.addEventListener('play', () => { v.classList.remove('thumb'); v.classList.add('playing'); });
    v.addEventListener('pause', () => {
      if (v.currentTime === 0 || v.ended) { v.classList.remove('playing'); v.classList.add('thumb'); }
    });
    v.addEventListener('ended', () => {
      v.classList.remove('playing'); v.classList.add('thumb'); v.currentTime = 0;
    });
  });
});


/* ========= 8) Video-States Variante 2 ========= */
document.addEventListener('DOMContentLoaded', function () {
  (() => {
    const vids = Array.from(document.querySelectorAll('#music .embed.video video'));
    vids.forEach(v => v.classList.add('thumb'));

    vids.forEach(v => {
      v.addEventListener('play', () => {
        vids.forEach(o => { if (o !== v) o.pause(); });
        v.classList.add('playing'); v.classList.remove('thumb');
      });
      v.addEventListener('pause', () => {
        if (v.currentTime === 0) { v.classList.remove('playing'); v.classList.add('thumb'); }
        else { v.classList.add('playing'); v.classList.remove('thumb'); }
      });
      v.addEventListener('ended', () => {
        v.classList.add('playing'); v.classList.remove('thumb');
        // Alternative: zurück zum Poster → unten drei Zeilen nutzen
        // v.classList.remove('playing'); v.currentTime = 0; v.classList.add('thumb');
      });
    });
  })();
});


/* ========= 9) Pulse-Effekt Home-Icon ========= */
document.addEventListener('DOMContentLoaded', function () {
  (() => {
    const home = document.querySelector('.home-link');
    if (!home) return;

    const TAP_ANIM_MS = 250; // Dauer der CSS-Animation

    const pulseOn = () => {
      home.classList.add('clicked');
      clearTimeout(pulseOn._t);
      pulseOn._t = setTimeout(() => home.classList.remove('clicked'), TAP_ANIM_MS);
    };

    function nearHome(touch, expand = 14) {
      const r = home.getBoundingClientRect();
      return (
        touch.clientX >= r.left - expand &&
        touch.clientX <= r.right + expand &&
        touch.clientY >= r.top - expand &&
        touch.clientY <= r.bottom + expand
      );
    }

    window.addEventListener('touchstart', (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      if (nearHome(t, 10)) pulseOn();
    }, { passive: true });

    // Puls sofort bei Down
    home.addEventListener('pointerdown', (e) => {
      // optional: e.preventDefault() falls du iOS-Highlight komplett killen willst -> dann {passive:false}
      pulseOn();
    }, { passive: true });

    // ⬇️ NEU: Navigation nach Anim-Delay
    home.addEventListener('click', (e) => {
      const href = home.getAttribute('href');
      if (!href) return;           // nichts zu tun

      e.preventDefault();          // sofort nicht navigieren
      // optional: Mobile-Menü schließen
      try {
        const overlay = document.querySelector('.nav-overlay');
        if (overlay && overlay.hasAttribute('data-open')) {
          overlay.removeAttribute('data-open');
          document.body.classList.remove('menu-open');
        }
      } catch {}

      // warte bis die Tap-Anim fertig ist, dann navigieren
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    }, { passive: false });
  })();
});


/* ========= 10) Pulse für .site-toggle Links + visited-Hack ========= */
/* ausgeklammert, weil das ganze eigentlich über die clicked funktion läuft. damit ist auch der double tap bug entfernt, weil halt beides aufgerufen wurde. clicked und tapped klasse

document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.site-toggle > a');

  links.forEach(link => {
    const pulse = () => {
      link.classList.add('tapped');
      clearTimeout(link._t);
      link._t = setTimeout(() => link.classList.remove('tapped'), 120);
    };
    link.addEventListener('touchstart', pulse, { passive: true });
    link.addEventListener('mousedown', pulse);
  });

  const music = document.querySelector('.site-toggle > a[href="#top"]');
  if (music) {
    music.addEventListener('click', () => {
      try { history.replaceState(null, '', location.pathname + location.search); } catch { }
    });
  }
});


/* ========= 11) Smooth-Scroll mit „follow the target“ ========= */
document.addEventListener('DOMContentLoaded', function () {
  (() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = null;
    let cancelers = [];

    function easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
    }
    function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
    function durationFor(distancePx) { return clamp(Math.round(distancePx * 0.8), 420, 1800); }

    function cancelOnUserInput() {
      const stop = () => { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } cleanup(); };
      const optsPassive = { passive: true };
      const optsActive = { passive: false };
      const list = [
        ['wheel', stop, optsActive],
        ['touchstart', stop, optsPassive],
        ['touchmove', stop, optsPassive],
        ['keydown', (e) => {
          const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space', ' '];
          if (keys.includes(e.key)) stop();
        }, optsPassive],
        ['mousedown', stop, optsPassive]
      ];
      list.forEach(([ev, fn, opts]) => {
        window.addEventListener(ev, fn, opts);
        cancelers.push(() => window.removeEventListener(ev, fn, opts));
      });
      function cleanup() { cancelers.splice(0).forEach(off => off()); }
      return cleanup;
    }

    function liveTargetY(el, off) {
      const r = el.getBoundingClientRect();
      const raw = (window.scrollY || window.pageYOffset) + r.top - off;
      const doc = document.documentElement;
      const maxY = Math.max(0, (doc.scrollHeight || 0) - window.innerHeight);
      return Math.min(Math.max(0, Math.round(raw)), maxY);
    }

    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute('href');
      const id = hash.slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;

      function getScrollMarginTopPx(el) {
        const v = getComputedStyle(el).scrollMarginTop;
        const n = parseFloat(v || '0');
        return Number.isFinite(n) ? n : 0;
      }

      e.preventDefault();

      const overlay = document.getElementById('mobile-menu');
      const burger = document.querySelector('.burger');
      if (overlay && overlay.hasAttribute('data-open')) {
        overlay.removeAttribute('data-open');
        document.body.classList.remove('menu-open');
        if (burger) { burger.setAttribute('aria-expanded', 'false'); burger.classList.remove('active'); }
      }

      const startY = window.scrollY || window.pageYOffset;
      const smt = getScrollMarginTopPx(target);
      const extra = 0;
      const offset = smt + extra;

      let targetY = liveTargetY(target, offset);

      if (prefersReduced) {
        window.scrollTo(0, targetY);
      } else {
        if (rafId) cancelAnimationFrame(rafId);
        const tStart = performance.now();
        const cleanup = cancelOnUserInput();

        const step = (now) => {
          targetY = liveTargetY(target, offset);
          const elapsed = now - tStart;
          const dur = durationFor(Math.abs(targetY - startY));
          const t = Math.max(0, Math.min(1, elapsed / dur));
          const y = startY + (targetY - startY) * easeInOutQuint(t);

          window.scrollTo(0, y);

          if (t < 1 && rafId !== null) {
            rafId = requestAnimationFrame(step);
          } else {
            rafId = null;
            cleanup();

            let tries = 0;
            const maxTries = 10;
            (function nudge() {
              if (++tries > maxTries) return;
              requestAnimationFrame(() => {
                const finalY = liveTargetY(target, offset);
                window.scrollTo(0, finalY);
                nudge();
              });
            })();
          }
        };
        rafId = requestAnimationFrame(step);
      }

      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus?.({ preventScroll: true });
      if (history.pushState) history.pushState(null, '', hash);
      else location.hash = hash;
    }, { passive: false });
  })();
});


/* ========= 12) Media-Consent (LS + Cookie + Popup) ========= */
(() => {
  const KEY = 'mediaConsentV1'; // 'allow' | 'deny'
  const EXT_SRC = /^(https?:\/\/(?:www\.)?(?:youtube(?:-nocookie)?\.com|youtu\.be|open\.spotify\.com))/i;

  function setConsent(val) {
    try { localStorage.setItem(KEY, val); } catch (_) { }
    document.cookie = KEY + '=' + encodeURIComponent(val) + '; Max-Age=' + (3600 * 24 * 365) + '; Path=/; SameSite=Lax';
  }
  function getConsent() {
    let v = null;
    try { v = localStorage.getItem(KEY); } catch (_) { }
    if (!v) {
      const m = document.cookie.match(new RegExp('(?:^|; )' + KEY + '=([^;]*)'));
      if (m) v = decodeURIComponent(m[1]);
    }
    return v;
  }

  function markBlocked(ifr) {
    if (!ifr.classList.contains('requires-consent')) ifr.classList.add('requires-consent');
    const wrap = ifr.closest('.embed') || ifr.parentElement;
    if (wrap) wrap.classList.add('consent-blocked');
  }
  function unmarkBlocked(ifr) {
    ifr.classList.remove('requires-consent');
    const wrap = ifr.closest('.embed') || ifr.parentElement;
    if (wrap) wrap.classList.remove('consent-blocked');
    ifr.style.opacity = ''; ifr.style.pointerEvents = '';
  }

  function prepareIframes(root = document) {
    root.querySelectorAll('iframe').forEach(ifr => {
      const src = ifr.getAttribute('src');
      const ds = ifr.getAttribute('data-src');
      if (src && EXT_SRC.test(src)) {
        ifr.setAttribute('data-src', src);
        ifr.removeAttribute('src');
      }
      const finalDS = ifr.getAttribute('data-src');
      if (finalDS && EXT_SRC.test(finalDS)) markBlocked(ifr);
    });
  }

  function loadAll() {
    document.querySelectorAll('iframe.requires-consent[data-src]').forEach(ifr => {
      const ds = ifr.getAttribute('data-src');
      if (!ds) return;
      ifr.src = ds;
      ifr.removeAttribute('data-src');
      unmarkBlocked(ifr);
    });
  }

  function ensureEmbeds() {
    const consent = getConsent();
    if (consent === 'allow') { prepareIframes(); loadAll(); }
    else { prepareIframes(); }
  }

  function initPopup() {
    const pop = document.getElementById('media-consent');
    if (!pop) return;

    if (!pop.__wired) {
      pop.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.getAttribute('data-action'); // 'allow' | 'deny'
        setConsent(action);
        if (action === 'allow') loadAll();
        pop.hidden = true;
      });
      pop.__wired = true;
    }
    pop.hidden = (getConsent() === 'allow');
  }

  window.resetMediaConsent = () => {
    try { localStorage.removeItem('mediaConsentV1'); } catch (_) { }
    document.cookie = 'mediaConsentV1=; Max-Age=0; Path=/; SameSite=Lax';

    document.querySelectorAll('iframe').forEach(ifr => {
      const src = ifr.getAttribute('src');
      if (src && EXT_SRC.test(src)) { ifr.setAttribute('data-src', src); ifr.removeAttribute('src'); }
      if (ifr.getAttribute('data-src')) {
        ifr.classList.add('requires-consent');
        ifr.closest('.embed')?.classList.add('consent-blocked');
      }
    });

    const pop = document.getElementById('media-consent');
    if (pop) pop.hidden = false;
  };

  function boot() {
    prepareIframes();
    if (getConsent() === 'allow') loadAll();
    initPopup();

    const mo = new MutationObserver(muts => {
      let needEnsure = false;
      muts.forEach(m => {
        m.addedNodes.forEach(n => {
          if (n.nodeType === 1) {
            if (n.tagName === 'IFRAME' || n.querySelector?.('iframe')) needEnsure = true;
          }
        });
      });
      if (needEnsure) ensureEmbeds();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    setTimeout(ensureEmbeds, 50);
    setTimeout(ensureEmbeds, 300);
    window.addEventListener('load', () => setTimeout(ensureEmbeds, 0));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();


/* ========= 13) Hash-Restore/Jump nach Load + __scrollToHashNow ========= */
document.addEventListener('DOMContentLoaded', function () {
  (() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    function scrollToHash() {
      if (!location.hash) return;
      const el = document.getElementById(location.hash.slice(1));
      if (!el) return;
      try {
        el.scrollIntoView({ block: 'start', inline: 'nearest' });
      } catch {
        const rect = el.getBoundingClientRect();
        const y = window.scrollY + rect.top;
        window.scrollTo(0, Math.max(0, Math.round(y)));
      }
    }

    let pendingHash = location.hash ? location.hash : null;
    window.addEventListener('load', () => { if (pendingHash) scrollToHash(); });
    window.__scrollToHashNow = scrollToHash;
  })();
});


/* ========= 14) Scrollspy / Active-Link ========= */
document.addEventListener('DOMContentLoaded', function () {
  (() => {
    const HERO_ID = 'top';
    const hero = document.getElementById(HERO_ID);

    /* ===== Desktop-Tuning ===== */
    const MIN_RATIO_DELTA_DESKTOP = 0.99;   // Ratio praktisch aushebeln
    const IO_MID_FRAC_DESKTOP     = 0.30;   // unkritisch, nur für IO rootMargin
    // Getrennte Fallback-Fracs für Richtung:
    const FALLBACK_ANCHOR_FRAC_DESKTOP_DOWN = 0.25; // späterer Wechsel beim Runter-Scrollen
    const FALLBACK_ANCHOR_FRAC_DESKTOP_UP   = 0.45; // späterer Rücksprung beim Hoch-Scrollen
    const HYSTERESIS_PX_DESKTOP   = 32;     // kleine Totzone für Desktop

    /* ===== Mobile bleibt wie bei dir ===== */
    const MIN_RATIO_DELTA_MOBILE = 0.22;
    const IO_MID_FRAC_MOBILE = 0.50;
    const FALLBACK_DOWN_FRAC_MOBILE = 0.62;
    const FALLBACK_UP_FRAC_MOBILE = 0.58;
    const HYSTERESIS_PX_MOBILE = 24;

    const isMobile = () => window.innerWidth <= 900;

    const getHeaderH = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--header-h').trim();
      const n = parseFloat(v || '0');
      return Number.isFinite(n) ? n : 0;
    };

    const linksAll = Array.from(document.querySelectorAll('a[href^="#"]'))
      .filter(a => {
        const id = a.getAttribute('href').slice(1);
        return !!id && !!document.getElementById(id);
      });

    const sections = Array.from(document.querySelectorAll('section[id]'))
      .filter(s => s.id !== HERO_ID);

    const hasSelectedWork = !!document.getElementById('selected-work');

    const setActive = (idOrNull) => {
      linksAll.forEach(a => {
        const hit = idOrNull && a.getAttribute('href') === `#${idOrNull}`;
        a.classList.toggle('active', !!hit);
      });
    };

    const isInHeroZone = () => {
      const h = getHeaderH();
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      if (y <= (h + 4)) return true;
      if (hero) {
        const bottom = hero.offsetTop + hero.offsetHeight;
        if ((y + h + 10) < bottom) return true;
      }
      return false;
    };

    let io, currentId = null, ratios = new Map();
    let lastY = window.scrollY || 0;
    let direction = 'down';

    const ioMidFrac = () => isMobile() ? IO_MID_FRAC_MOBILE : IO_MID_FRAC_DESKTOP;
    const minRatioDelta = () => isMobile() ? MIN_RATIO_DELTA_MOBILE : MIN_RATIO_DELTA_DESKTOP;

    function buildObserver() {
      if (io) io.disconnect();
      ratios.clear();

      const h = getHeaderH();
      const mid = ioMidFrac();
      const top = Math.round(h + window.innerHeight * mid);
      const bottom = Math.round(window.innerHeight * mid);

      io = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin: `-${top}px 0px -${bottom}px 0px`,
        threshold: Array.from({ length: 21 }, (_, i) => i / 20)
      });

      sections.forEach(s => io.observe(s));
      requestAnimationFrame(updateActive);
    }

    function onIntersect(entries) {
      for (const e of entries) {
        const id = e.target.id;
        if (!id) continue;
        ratios.set(id, e.isIntersecting ? (e.intersectionRatio || 0) : 0);
      }
      requestAnimationFrame(updateActive);
    }

    function pickByProgress(dir) {
      const h = getHeaderH();
      const frac = isMobile()
        ? (dir === 'up' ? FALLBACK_UP_FRAC_MOBILE : FALLBACK_DOWN_FRAC_MOBILE)
        : (dir === 'up' ? FALLBACK_ANCHOR_FRAC_DESKTOP_UP : FALLBACK_ANCHOR_FRAC_DESKTOP_DOWN);

      const anchor = (window.scrollY || 0) + h + window.innerHeight * frac;

      let cand = null;
      for (const s of sections) {
        if (s.offsetTop <= anchor) cand = s;
      }

      if (cand && hasSelectedWork) {
        const sw = document.getElementById('selected-work');
        if (sw) {
          const center = (window.scrollY || 0) + window.innerHeight * 0.60;
          const dCand = Math.abs(center - (cand.offsetTop + cand.offsetHeight * 0.5));
          const dSW = Math.abs(center - (sw.offsetTop + sw.offsetHeight * 0.5));
          if (dSW < dCand * 0.88) cand = sw;
        }
      }
      return cand ? cand.id : null;
    }

    function applyHysteresis(chosenId) {
      // Desktop jetzt NICHT mehr ausschließen
      if (!chosenId || !currentId || chosenId === currentId) return chosenId;

      const newSec = document.getElementById(chosenId);
      const curSec = document.getElementById(currentId);
      if (!newSec || !curSec) return chosenId;

      const y = window.scrollY || 0;
      const h = getHeaderH();

      const frac = isMobile()
        ? (direction === 'down' ? FALLBACK_DOWN_FRAC_MOBILE : FALLBACK_UP_FRAC_MOBILE)
        : (direction === 'down' ? FALLBACK_ANCHOR_FRAC_DESKTOP_DOWN : FALLBACK_ANCHOR_FRAC_DESKTOP_UP);

      const anchorLine = y + h + window.innerHeight * frac;

      const newDist = Math.abs((newSec.offsetTop + newSec.offsetHeight / 2) - anchorLine);
      const curDist = Math.abs((curSec.offsetTop + curSec.offsetHeight / 2) - anchorLine);

      const hyst = isMobile() ? HYSTERESIS_PX_MOBILE : HYSTERESIS_PX_DESKTOP;
      if (newDist + hyst >= curDist) return currentId;
      return chosenId;
    }

    function updateActive() {
      const y = window.scrollY || 0;
      direction = (y > lastY) ? 'down' : (y < lastY ? 'up' : direction);
      lastY = y;

      if (isInHeroZone()) {
        if (currentId !== null) { currentId = null; setActive(null); }
        return;
      }

      let bestId = null, bestRatio = 0;
      for (const s of sections) {
        const r = ratios.get(s.id) || 0;
        if (r > bestRatio) { bestRatio = r; bestId = s.id; }
      }

      let chosen = bestId;
      if (!chosen) {
        chosen = pickByProgress(direction);
      } else if (currentId) {
        const cur = ratios.get(currentId) || 0;
        if (bestRatio < cur + minRatioDelta()) {
          const byProg = pickByProgress(direction);
          if (byProg) chosen = byProg;
        }
      } else {
        const byProg = pickByProgress(direction);
        if (byProg) chosen = byProg;
      }

      chosen = applyHysteresis(chosen);

      if (!chosen) return;
      if (chosen !== currentId) {
        currentId = chosen;
        setActive(chosen);
      }
    }

linksAll.forEach(a => {
  const triggerClickAnim = () => {
    a.classList.add('clicked');
    clearTimeout(a._clickT);
    a._clickT = setTimeout(() => a.classList.remove('clicked'), 180);
  };

  // Sofortiges, knackiges Feedback:
  a.addEventListener('pointerdown', triggerClickAnim, { passive: true });

  // Fallback bei Tastatur (Enter/Space) und Maus-Klick:
  a.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') triggerClickAnim();
  });
  a.addEventListener('click', () => {
    // 👇 dein bestehender Code
    const id = a.getAttribute('href').slice(1);
    window.__neutralSpyUntil = performance.now() + 900;
    requestAnimationFrame(updateActive);
  });
});


// === Site-Toggle (music | film) – mobile-safe, no double fire ===
(() => {
  const links = document.querySelectorAll('.site-toggle a');
  if (!links.length) return;

  const CLICK_ANIM_MS = 250; // Dauer wie in CSS (scale-Down)

  const triggerClickAnim = (a) => {
    a.classList.add('clicked');
    clearTimeout(a._clickT);
    a._clickT = setTimeout(() => a.classList.remove('clicked'), CLICK_ANIM_MS);
  };

  // Hilfsfunktion: Navigation mit optionalem Delay
  const navigateWithAnim = (a) => {
    const href = a.getAttribute('href');
    if (!href) return;

    // Kurze visuelle Rückmeldung und dann navigieren
    setTimeout(() => { window.location.href = href; }, CLICK_ANIM_MS);
  };

  links.forEach((a) => {
    // Sofortiges Tap-Feedback – nur pointerdown (verhindert double fire)
    a.addEventListener('pointerdown', (e) => {
      e.preventDefault();   // unterdrückt iOS :active/blau
      a.blur();             // nimmt sofort Fokus weg
      triggerClickAnim(a);  // Shrink-Feedback
    }, { passive: false });


    // Klicken/Tippen
    a.addEventListener('click', (e) => {
      const isCurrent = a.getAttribute('aria-current') === 'page';
      if (isCurrent) {
        // Gleiche Seite -> kein Delay, Standardverhalten ok
        return;
      }
      // Andere Seite -> Animation + Delay-Navigation
      e.preventDefault();
      navigateWithAnim(a);
    }, { passive: false });

    // Tastatur: Enter/Space verhalten wie Klick
    a.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === 'Enter' || key === ' ') {
        const isCurrent = a.getAttribute('aria-current') === 'page';
        if (isCurrent) return; // nichts tun
        e.preventDefault();
        navigateWithAnim(a);
      }
    });
  });
})();


    window.addEventListener('scroll', () => { requestAnimationFrame(updateActive); }, { passive: true });
    window.addEventListener('resize', () => { buildObserver(); requestAnimationFrame(updateActive); }, { passive: true });

    buildObserver();
    setTimeout(() => { buildObserver(); requestAnimationFrame(updateActive); }, 250);
  })();
});




