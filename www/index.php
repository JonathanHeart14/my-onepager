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
        <figure class="choice-figure" style="--bg:url('assets/img/Background.png')">
          <img src="assets/img/Background.png" alt="" loading="eager" />
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


  </body>
</html>
