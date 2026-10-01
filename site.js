// Discord invite, in one place. Every [data-discord] link uses it; empty hides them all.
var DISCORD = "https://discord.gg/KgQEmCaMsy";
(function () {
  document.querySelectorAll("[data-discord]").forEach(function (a) {
    if (!DISCORD) { a.hidden = true; return; }
    a.hidden = false; a.href = DISCORD; a.target = "_blank"; a.rel = "noopener";
  });
})();

// Support email, in one place. Every [data-email] element shows it.
var SUPPORT_EMAIL = "support@thumbthroughapp.com";
(function () {
  document.querySelectorAll("[data-email]").forEach(function (row) {
    if (!SUPPORT_EMAIL) return;
    row.hidden = false;
    var code = row.querySelector("code");
    if (code) code.textContent = SUPPORT_EMAIL;
    var link = row.querySelector("a[data-mailto]");
    if (link) link.href = "mailto:" + SUPPORT_EMAIL + "?subject=Thumb%20Through";
    var btn = row.querySelector("button");
    if (btn) btn.addEventListener("click", function () {
      var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(SUPPORT_EMAIL).then(done, function () {});
    });
  });
})();

// Videos with a light and a dark version, like the screenshots. The page is dark unless the
// system asks for light, so the light video plays only then. Reduced motion: no autoplay, controls.
(function () {
  var vids = document.querySelectorAll("video[data-themed]");
  if (!vids.length || !window.matchMedia) return;
  var mq = window.matchMedia("(prefers-color-scheme: light)");
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pick = function () {
    vids.forEach(function (v) {
      var base = "img/" + v.getAttribute("data-themed") + (mq.matches ? "" : "-dark");
      if (v.currentSrc && v.currentSrc.indexOf(base + ".mp4") !== -1) return;
      v.poster = base + "-poster.webp";
      v.muted = true; v.src = base + ".mp4"; v.load();
      if (still) { v.removeAttribute("autoplay"); v.controls = true; return; }
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    });
  };
  pick();
  if (mq.addEventListener) mq.addEventListener("change", pick);
})();
