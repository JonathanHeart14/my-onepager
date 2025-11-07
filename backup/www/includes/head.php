<?php require $_SERVER['DOCUMENT_ROOT'].'/includes/version.php'; ?>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="/styles.css?v=<?= htmlspecialchars($ASSET_VERSION) ?>">
<script src="/assets/js/main.js?v=<?= htmlspecialchars($ASSET_VERSION) ?>" defer></script>
<script>
  // Block early: before CSS paints
  document.documentElement.classList.add('preload');
</script>

<style>
  /* Global fade-in (YouTube-style) */
  html.preload body { opacity: 0; }
  body { opacity: 1; transition: opacity .28s ease; }

  /* No-JS fallback: make sure page is visible for bots/users w/o JS */
  noscript html.preload body { opacity: 1; }
</style>

<!-- Preload your hero image (adjust path!) -->
<link rel="preload" as="image" href="assets/img/Background_blended.png" imagesizes="100vw">




