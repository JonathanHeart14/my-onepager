<!-- Landing Page -->
<!doctype html>

<html lang="de" data-size="M">
  <head>

    <?php require $_SERVER['DOCUMENT_ROOT'].'/includes/head.php'; ?>
 
    <title>Jonathan Heart – Select</title>
    <meta name="description" content="Choose your path: Music or Film." />
    <link rel="canonical" href="https://jonasroeseberg.com/">

    <style>
      /* Kleines Reset nur für Landing-Header: wir brauchen hier keine Fix-Navigation */
      .site-nav { display:none; }
    </style>
  </head>
  <body>

    <main class="landing-chooser" aria-label="Choose domain">
      <a class="choice" href="https://jonathan-heart.com/" aria-label="Go to Music site">
        <figure class="choice-figure" style="--bg:url('assets/img/Background_blended.png')">
          <img src="assets/img/Background_blended.png" alt="" loading="eager" />
          <figcaption>music.</figcaption>
        </figure>
      </a>

      <a class="choice" href="film/" aria-label="Go to Film site">
        <figure class="choice-figure" style="--bg:url('assets/img/Background_blended.png')">
          <img src="assets/img/Background_blended.png" alt="" loading="eager" />
          <figcaption>film.</figcaption>
        </figure>
      </a>
    </main>

      <!-- Dein normaler Footer unten ohne padding-top -->
  <footer class="footer-landing">
      <p>
        <a href="impressum.html">Impressum</a> | 
        <a href="datenschutz.html">Datenschutzerklärung</a>
      </p>

      <p class="footer-credit">
        © <span id="y"></span>
        <span class="names">
        Jonathan Heart / Jonas Röseberg
        </span>
      </p>
    </footer>

        <script>document.getElementById("y").textContent = new Date().getFullYear();</script>


<script>
  (function () {
    // CONFIG — tune to your layout
    const HERO_SRC = "assets/img/Background_blended.png";      // exact hero path
    const ABOVE_FOLD_MAX_Y = 900;                               // px from top = “above the fold”
    const IFRAMES_SELECTOR = 'iframe[src*="youtube.com"],iframe[src*="spotify.com"]';
    const ABSOLUTE_TIMEOUT_MS = 2200;                           // total cap
    const IFRAMES_TIMEOUT_MS  = 1200;                           // cap for iframes
    const MICRO_STABILIZE_MS  = 120;                            // tiny delay for smoother paint

    // 1) wait for window.load (CSS, images queued, fonts, etc.)
    const onWindowLoad = new Promise(res => {
      if (document.readyState === 'complete') res();
      else window.addEventListener('load', res, { once: true });
    });

    // 2) wait for hero (so first paint looks complete)
    function waitForHero(src) {
      if (!src) return Promise.resolve();
      const img = new Image();
      img.src = src;
      return new Promise(resolve => {
        if (img.complete) return resolve();
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
        setTimeout(resolve, 1200); // safety: hero must not block too long
      });
    }

    // 3) find “above the fold” iframes and wait until they report load (with cap)
    function getAboveFoldIframes() {
      const frames = Array.from(document.querySelectorAll(IFRAMES_SELECTOR));
      return frames.filter(f => (f.getBoundingClientRect().top + window.scrollY) < ABOVE_FOLD_MAX_Y);
    }
    function waitForIframes(timeoutMs = IFRAMES_TIMEOUT_MS) {
      const targets = getAboveFoldIframes();
      if (!targets.length) return Promise.resolve();

      const waits = targets.map(f => new Promise(resolve => {
        const done = () => { f.dataset._ifrReady = '1'; resolve(); };
        f.addEventListener('load', done, { once: true });
        // Some providers are slow / don’t fire in time → cap per-frame
        setTimeout(done, Math.min(timeoutMs, 1000));
      }));

      return Promise.race([
        Promise.all(waits),
        new Promise(res => setTimeout(res, timeoutMs)) // global cap
      ]);
    }

    // 4) Master boot: window.load → hero → above-fold iframes → reveal
    const absolute = new Promise(res => setTimeout(res, ABSOLUTE_TIMEOUT_MS));

    (async function revealWhenReady() {
      try {
        await Promise.race([
          (async () => {
            await onWindowLoad;
            await waitForHero(HERO_SRC);
            await waitForIframes(IFRAMES_TIMEOUT_MS);
          })(),
          absolute
        ]);

        // tiny micro-delay so browser can commit paints
        await new Promise(r => setTimeout(r, MICRO_STABILIZE_MS));
      } finally {
        document.documentElement.classList.remove('preload');
      }
    })();
  })();
</script>






  </body>
</html>
