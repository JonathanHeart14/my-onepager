<!-- Ton & Audio-Post Branch -->
<!DOCTYPE html>

<html data-size="M" lang="de">
<head>

<!-- Preload Hero Background -->
<link
  rel="preload"
  as="image"
  href="/assets/img/Background_blended.jpg"
  fetchpriority="high">

<?php require $_SERVER['DOCUMENT_ROOT'].'/includes/head.php'; ?>

<title>Jonas Röseberg - film.</title>
<meta name="description" content="musician · producer · mixing engineer" />
<link rel="canonical" href="https://jonasroeseberg.com/film/">

<link crossorigin="" href="https://www.youtube-nocookie.com" rel="preconnect"/>
<link crossorigin="" href="https://www.youtube.com" rel="preconnect"/>
<link crossorigin="" href="https://i.ytimg.com" rel="preconnect"/>
<link crossorigin="" href="https://open.spotify.com" rel="preconnect"/>

<style>/* consolidated inline styles */

  :root { --muted:#bdbdbd; --accent:#235ac0 }
      .home-icon { width:24px; height:24px; display:block }
      @media (hover:hover){ .home-link:hover { color: var(--accent) } }

  /* Overlay-Optik für blockierte Embeds */
    .requires-consent {
      display:block; width:100%; height:100%;
      border:0; background:#000; opacity:.25; pointer-events:none;
    }
    .embed.consent-blocked { position:relative; }
    .embed.consent-blocked::before {
      content:"Externes Medium ist blockiert (YouTube/Spotify).";
      position:absolute; inset:auto 12px 12px 12px;
      padding:10px 12px; border-radius:10px;
      background:rgba(0,0,0,.7); color:#fff; font-size:14px; line-height:1.4;
    }

    /* Mini-Popup unten rechts */
    .consent-pop {
      position: fixed; right: 16px; bottom: 16px; z-index: 9999;
      max-width: 360px; background: rgba(20,20,20,.98); color:#eee;
      border:1px solid rgba(255,255,255,.12); border-radius: 12px;
      padding: 14px 14px 12px; box-shadow: 0 10px 30px rgba(0,0,0,.4);
      font: 14px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
    }
    .consent-pop h3 { margin: 0 0 6px; font-size: 15px; }
    .consent-pop p  { margin: 0 0 10px; color:#cfcfcf; }
    .consent-pop .row { display:flex; gap:8px; flex-wrap:wrap; margin-top: 8px; }
    .consent-btn {
      appearance: none; border:1px solid rgba(255,255,255,.16);
      padding:8px 12px; border-radius:10px; background:#161616; color:#eee; cursor:pointer;
    }
    .consent-btn.primary { background:#235ac0; border-color:#235ac0; color:#fff; }
    .consent-pop a { color:#cfe1ff; text-decoration:none; }
    .consent-pop a:hover { text-decoration:underline; }

</style>

</head>

<body>

  <div id="top" style="position:relative; inset:0; height:0;"></div>

  <!-- Popup (wird per JS nur gezeigt, wenn noch keine Entscheidung vorliegt) -->
  <div class="consent-pop" hidden="" id="media-consent">
    <h3>Externe Medien</h3>
    <p>Diese Seite kann Inhalte von <strong>YouTube</strong> &amp; <strong>Spotify</strong> laden. 
            Mit „Akzeptieren“ erlaubst du die Datenübertragung an diese Anbieter. 
            Du kannst das später im Footer unter „Medien-Einstellungen“ ändern.</p>
    <div class="row">
      <button class="consent-btn" data-action="deny">Nur notwendige</button>
      <button class="consent-btn primary" data-action="allow">Akzeptieren</button>
      <a class="consent-btn" href="/datenschutz.html" style="text-decoration:none">Mehr erfahren</a>
    </div>
  </div>

  <!-- Fixed Top Navigation -->
  <header class="site-nav">
    <nav class="wrap">

      <!-- Weißes Haus-Icon als SVG links -->
      <a aria-label="Home" class="home-link" href="https://jonasroeseberg.com/">
        <svg class="home-icon" fill="currentColor" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9.5l9-7 9 7V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"></path>
        </svg>
      </a>

       <!-- zentraler Switch -->
      <div class="site-toggle" role="menubar" aria-label="Bereich wechseln">
        <a href="https://jonathan-heart.com">music.</a>
        <a href="#top" aria-current="page">film.</a>
      </div>

      <!-- Rechts: Navigation-->
      <ul class="nav-list">
        <li><a href="#work">selected work.</a></li>
        <li><a href="#services">services.</a></li>
        <li><a href="#clients">clients.</a></li>
        <li><a href="#studio">studio.</a></li>
<!--    <li><a href="#music">music.</a></li> -->
        <li><a href="#about">about.</a></li>
        <li><a href="#contact">contact.</a></li>
      </ul>

      <!-- Burger-Button (nur sichtbar auf Mobilea) -->
<button class="burger" aria-label="Menu" type="button">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
</button>

    </nav>
  </header>

  <!-- Landing Hero -->
  <section class="hero landing">
    <div class="hero-inner">
      <h1 class="hero-title">Jonathan Heart</h1>
      <p class="hero-subtitle">musician · producer · mixing engineer</p>
      <div class="social-links">
        <a aria-label="Instagram" href="https://instagram.com/itsjonathanheart" target="_blank">
        <span class="icon-mask" style="--icon: url('/assets/icons/Instagram.svg')"></span>
        </a>
        <a aria-label="Spotify" href="https://open.spotify.com/artist/4jcReINTJLZewFgkzEqmxK?si=FpjnMYeQTrChplwueQZ5Dg" target="_blank">
        <span class="icon-mask" style="--icon: url('/assets/icons/Spotify.svg')"></span>
        </a>
        <a aria-label="YouTube" href="https://youtube.com/@jonathanheartmusic" target="_blank">
        <span class="icon-mask" style="--icon: url('/assets/icons/Youtube.svg'); width:45px;"></span>
        </a>
        <a aria-label="Email" href="mailto:jonath.heart@gmail.com" target="_blank">
        <span class="icon-mask" style="--icon: url('/assets/icons/Mail.svg'); width:41px;"></span>
        </a>
      </div>
          </div>
  </section>

  <!-- Work Section -->
  <section class="wrap section" id="work">
    <h2>selected work.</h2>
    <div class="media-grid">

      <!-- YouTube Playlist (responsiv 16:9 via CSS) -->
      <div class="embed youtube">
        <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" class="requires-consent" data-src="https://www.youtube.com/embed/hkcfdRgLheQ?si=AkYb-eO_d8HOrZc8" title="YouTube video player" loading="eager">
        </iframe>
        <p class="credit">[performance, bass composition]</p>
      </div>
      <div class="embed youtube">
        <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" class="requires-consent" data-src="https://www.youtube.com/embed/EthbAJ00iqg?si=SSlg-FPbyOAa0HfJ" title="YouTube video player" loading="eager">
        </iframe>
        <p class="credit">[co-written, co-produced, mix & master]</p>
      </div>
      <div class="embed youtube">
        <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" class="requires-consent" data-src="https://www.youtube.com/embed/DV68w9O-R9E?si=RhxlV3EuEdjDJdax" title="YouTube video player" loading="eager">
        </iframe>
        <p class="credit">[co-written, co-produced]</p>
      </div>
      <div class="embed youtube">
        <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" class="requires-consent" data-src="https://www.youtube.com/embed/REbrKoZy1YI?si=v2KlKfX2F-7jrz2e" title="YouTube video player" loading="eager">
        </iframe>
        <p class="credit">[mix & master]</p>
      </div>
      <div class="embed youtube">
        <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" class="requires-consent" data-src="https://www.youtube.com/embed/Ic5oqa0zLKM?si=HDdqKrm-X4Xc3vlZ" title="YouTube video player" loading="eager">
        </iframe>
        <p class="credit">[written, produced, mix & master]</p>
      </div>
      <div class="embed youtube">
        <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" class="requires-consent" data-src="https://www.youtube.com/embed/Y3vEmhQQbto?si=yOWsaC8aVG_hCxOC" title="YouTube video player" loading="eager">
        </iframe>
        <p class="credit">[mix & master]</p>
      </div>
      <div class="embed youtube center-single">
        <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" class="requires-consent" data-src="https://www.youtube.com/embed/RtfhpJwiSDU?si=RO1D4SPHQDZPzsBt" title="YouTube video player" loading="eager">
        </iframe>
        <p class="credit">[co-produced, mix & master]</p>
      </div>

      <!-- Spotify Playlist (fixe Höhe via CSS-Variable; Größe mit .s/.m/.l steuerbar) -->
        <div class="embed spotify">
        <iframe allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowfullscreen="" class="requires-consent" data-src="https://open.spotify.com/embed/playlist/3Dx1Mv3YxzqyDBACvLPxs4?utm_source=generator&amp;theme=0">
        </iframe>
      </div>

    </div>
  </section>

  <!-- Services Section -->
  <section class="wrap section" id="services">
    <h2>services.</h2>
    <div class="services-grid">

      <!-- Mixing & Mastering -->
      <article class="service-card">
      <h3>Mixing &amp; Mastering</h3>
      <a class="service-img" href="#contact">
      <img alt="Mixing console" src="/assets/img/services/mixing.jpg" loading="lazy"/>
      </a>
      <p class="service-desc">Available for projects of any size. <br> From a quick vocal mix to a full album.
      </article>

      <!-- Recording & Producing -->
      <article class="service-card">
      <h3> Producing &amp; Recording</h3>
      <a class="service-img" href="#contact">
      <img alt="Recording session" src="/assets/img/services/recording.jpg" loading="lazy"/>
      </a>
      <p class="service-desc">Capturing your performance. <br> In the studio or on location with a mobile rig.</p>
      </article>

      <!-- Session / Live Playing -->
      <article class="service-card">
      <h3>Session &amp; Live</h3>
      <a class="service-img" href="#contact">
      <img alt="Session &amp; live playing" src="/assets/img/services/session.png" loading="lazy"/>
      </a>
      <p class="service-desc">Bass and guitar for studio or stage. <br> Tight and reliable.</p>
      </article>

    </div>

    <!-- zentraler Booking-Button -->
    <aside class="gallery-footer">
    <a class="btn-booking" href="#contact">BOOK NOW</a>
    </aside>
  </section>

  <!-- Clients Section -->
  <section class="wrap section" id="clients">
    <h2>clients.</h2>
    <ul class="clients-grid">
      <li class="client-item">
          badbadbad.
      </li>
      <li class="client-item">
          JOËL - JOÃO
      </li>
      <li class="client-item">
          TAMU
      </li>
      <li class="client-item">
          NARÎNÊ
      </li>
      <li class="client-item">
          Crime City Boyz
      </li>
      <li class="client-item">
          Jan Scharfenberg
      </li>
      <li class="client-item">
          Lost Tape
      </li>
      <li class="client-item">
          Topgolf
      </li>
      <li class="client-item">
          Zalando
      </li>
      <li class="client-item">
          AS Audio
      </li>
      <li class="client-item">
          Songsterr
      </li>
      <li class="client-item">
          Spaghettieis 
          <span class="line">(Musical)</span>
        </li>
      <li class="client-item">
            Sterben ohne Gott
            <span class="line">(Dokumentarfilm)</span>
      </li>
      <li class="client-item">Joshua Karp
        <span class="line">(LinkedIn Coaching Videos)</span>
      </li>
      <li class="client-item">
            Pur Abenteuerland -
            <span class="line">Das Musical</span>
            <span class="line">(Premiere Aftermovie)</span>
      </li>
      <li class="client-item">
            Die Landarztpraxis
      <span class="line">(Daily Soap)</span>
      </li>
      <li class="client-item">
            30 and Wild 
            <span class="line">(Spielfilm)</span>
      </li>
      <li class="client-item">
            Schlangenjunge 
            <span class="line">(Spielfilm)</span>
      </li>
            <li class="client-item">
            Popcorn Himmel
            <span class="line">(Musical)</span>
      </li>
            </li>
            <li class="client-item">
            Toni
            <span class="line">(Kurzfilm)</span>
      </li>
      <!-- … beliebig erweitern … -->
    </ul>
  </section>

  <!-- Studio Section -->
  <section class="wrap section" id="studio">
    <h2>studio.</h2>
    <div class="gallery-layout">
      <div class="media-grid js-gallery"
          data-base="/assets/img/gallery/Studio%20Bilder/"
          data-ext="jpg"
          data-page="6"
          data-chunk="3">
      </div>

      <aside class="gallery-footer">
        <button class="btn-more js-gallery-more" hidden>Load more</button>
      </aside>
    </div>

  </section>

  <!-- Music Section -->
  <!--
  <section class="wrap section" id="music">
    <h2>music.</h2>
    <div class="media-grid">
      <div class="embed video">
        <video controls="" data-autoposter="" playsinline="" preload="none" webkit-playsinline="">
        <source src="/assets/video/Day_at_the_Stu_web.mp4" type="video/mp4"/>
        </video>
      </div>
      <div class="embed video">
        <video controls="" data-autoposter="" playsinline="" preload="none" webkit-playsinline="">
        <source src="/assets/video/Just a little progression I came up with.mp4" type="video/mp4"/>
        </video>
      </div>
      <div class="embed video">
        <video controls="" data-autoposter="" playsinline="" preload="none" webkit-playsinline="">
        <source src="/assets/video/six six strings v4.mp4" type="video/mp4"/>
        </video>
      </div>
      <div class="embed video">
        <video controls="" data-autoposter="" playsinline="" preload="none" webkit-playsinline="">
        <source src="/assets/video/Bass playing/Is this hope.mp4" type="video/mp4"/>
        </video>
      </div>
      <div class="embed video">
        <video controls="" data-autoposter="" playsinline="" preload="none" webkit-playsinline="">
        <source src="/assets/video/Bass playing/melody.mp4" type="video/mp4"/>
        </video>
      </div>
      <div class="embed video">
        <video controls="" data-autoposter="" playsinline="" preload="none" webkit-playsinline="">
        <source src="/assets/video/Bass playing/Quicksand.mp4" type="video/mp4"/>
        </video>
      </div>
    </div>
  </section> -->

  <!-- About Section -->
  <section class="wrap section" id="about">
    <h2>about.</h2>

    <article class="about-flow">
      <figure class="about-photo">
        <img src="/assets/img/Rose Guitar Square.jpg" alt="Jonathan Heart" loading="lazy">
      </figure>

      <p class="slogan">clarity through distortion.</p>
      <p>Jonathan Heart is a musician, producer and mixing engineer based in Berlin, Germany. His approach is shaped as much by instruments and live playing as by the technical craft of sound.</p>
      <p>In the studio he is less interested in perfection than in presence, keeping the rough edges that carry emotion. Mixing and mastering are ways of listening closely to the stories of others and enhancing them without erasing what makes them human.</p>
      <p>As part of <em>badbadbad.</em> and in support of <em>Joël João</em>, Jonathan extends this philosophy into collaboration. On stage he is not looking for praise but for resonance, using sound as a way to connect and communicate.</p>
      <p>After years in the studio and on stage technical abilities have moved to the background and made way for an understanding of music as a means to evoke emotion.</p>
    
    </article>

      <!-- About: Gallery -->
      <div class="gallery-layout">
        <div class="media-grid js-gallery"
            data-base="/assets/img/gallery/About%20Bilder/"
            data-ext="jpg"
            data-page="0"
            data-chunk="3"
            data-lightbox="false">
        </div>
            
        <aside class="gallery-footer">
          <button class="btn-more js-gallery-more" hidden>Load more</button>
        </aside>
      </div>

  </section>

  <!-- Contact Section -->
  <section class="wrap section" id="contact">
    <h2>contact.</h2>
    <div class="contact-info">
      <p><strong>Jonathan Heart</strong></p>
      <p><a href="mailto:jonath.heart@gmail.com">jonath.heart@gmail.com</a></p>
      <p><strong>Phone / Whatsapp:</strong></p>
      <p>+49 178 406 10 20</p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <p class="social-links">
      <a aria-label="Instagram" href="https://instagram.com/itsjonathanheart" target="_blank">
      <span class="icon-mask" style="--icon: url('/assets/icons/Instagram.svg'); width: 25px;"></span>
      </a>
      <a aria-label="Spotify" href="https://open.spotify.com/artist/4jcReINTJLZewFgkzEqmxK?si=FpjnMYeQTrChplwueQZ5Dg" target="_blank">
      <span class="icon-mask" style="--icon: url('/assets/icons/Spotify.svg'); width: 25px"></span>
      </a>
      <a aria-label="YouTube" href="https://youtube.com/@jonathanheartmusic" target="_blank">
      <span class="icon-mask" style="--icon: url('/assets/icons/Youtube.svg'); width: 28px;"></span>
      </a>
      <a aria-label="Email" href="mailto:jonath.heart@gmail.com" target="_blank">
      <span class="icon-mask" style="--icon: url('/assets/icons/Mail.svg'); width: 28px;"></span>
      </a>
    </p>

    <!-- Desktop-Version -->
    <p class="footer-links desktop-only">
      <a href="/impressum.html">Impressum</a> | 
      <a href="/datenschutz.html">Datenschutzerklärung</a> | 
      <a class="media-settings-link" href="javascript:void(0)" onclick="resetMediaConsent()">Medien-Einstellungen</a>
    </p>

    <!-- Mobile-Version ohne Trennstrich hinter Datenschutzerklärung -->
    <p class="footer-links mobile-only">
      <a href="/impressum.html">Impressum</a> |
      <a href="/datenschutz.html">Datenschutzerklärung</a>
      <a class="media-settings-link" href="javascript:void(0)" onclick="resetMediaConsent()">Medien-Einstellungen</a>
    </p>

    <style>
      /* Standard: Desktop sichtbar, Mobile versteckt */
      .desktop-only { display: block; }
      .mobile-only { display: none; }

      /* Unter 900px: Mobile sichtbar, Desktop versteckt */
      @media (max-width: 900px) {
        .desktop-only { display: none; }
        .mobile-only { display: block; }
      }
    </style>

    <p>© <span id="y"></span> Jonathan Heart</p>

        <!-- Lightbox mit Navigation -->
    <div class="lightbox" hidden="" id="lightbox">
      <button aria-label="Close" class="lb-close">×</button>
      <button aria-label="Previous" class="lb-nav lb-prev">‹</button>
      <img alt="" id="lightbox-img"/>
      <button aria-label="Next" class="lb-nav lb-next">›</button>
      <div class="lb-counter"><span id="lb-i">1</span>/<span id="lb-n">1</span></div>
    </div>
    
  </footer>


</body>
</html>
