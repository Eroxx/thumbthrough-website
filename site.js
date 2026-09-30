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
