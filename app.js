/* ============================================================
   DMICO TERMINAL — renderer
   Reads window.TERMINAL (links.js) and builds the board.
   No frameworks, no build step, no backend.
   ============================================================ */

(function () {
  "use strict";

  var DATA = window.TERMINAL || {};
  var STATUS_LABELS = {
    "now-boarding": "Now Boarding",
    "boarding-soon": "Boarding Soon",
    "arrived": "Arrived",
    "delayed": "Delayed"
  };

  var SOCIAL_ICONS = {
    github: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    instagram: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.44c2.14 0 2.39.01 3.23.05.78.04 1.2.17 1.49.28.37.14.64.32.92.59.28.28.45.55.6.92.11.28.24.71.27 1.49.04.84.05 1.1.05 3.23s-.01 2.39-.05 3.23c-.03.78-.16 1.2-.27 1.49-.15.37-.32.64-.6.92-.28.28-.55.45-.92.6-.29.11-.71.24-1.49.27-.84.04-1.09.05-3.23.05s-2.39-.01-3.23-.05c-.78-.03-1.2-.16-1.49-.27a2.5 2.5 0 0 1-.92-.6 2.5 2.5 0 0 1-.59-.92c-.11-.29-.24-.71-.28-1.49-.04-.84-.05-1.1-.05-3.23s.01-2.39.05-3.23c.04-.78.17-1.21.28-1.49.14-.37.32-.64.59-.92.28-.27.55-.45.92-.59.28-.11.71-.24 1.49-.28.84-.04 1.09-.05 3.23-.05M8 0C5.83 0 5.55.01 4.7.05c-.85.04-1.43.17-1.94.37-.53.2-.97.48-1.42.92-.44.45-.72.89-.92 1.42-.2.51-.33 1.09-.37 1.94C.01 5.55 0 5.83 0 8s.01 2.45.05 3.3c.04.85.17 1.43.37 1.94.2.53.48.98.92 1.42.45.44.89.72 1.42.92.51.2 1.09.33 1.94.37.85.04 1.13.05 3.3.05s2.45-.01 3.3-.05c.85-.04 1.43-.17 1.94-.37a3.9 3.9 0 0 0 1.42-.92c.44-.44.72-.89.92-1.42.2-.51.33-1.09.37-1.94.04-.85.05-1.13.05-3.3s-.01-2.45-.05-3.3c-.04-.85-.17-1.43-.37-1.94-.2-.53-.48-.97-.92-1.42A3.9 3.9 0 0 0 13.24.42c-.51-.2-1.09-.33-1.94-.37C10.45.01 10.17 0 8 0z"/><path d="M8 3.89a4.11 4.11 0 1 0 0 8.22 4.11 4.11 0 0 0 0-8.22zM8 10.67a2.67 2.67 0 1 1 0-5.34 2.67 2.67 0 0 1 0 5.34zM13.23 3.73a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z"/></svg>',
    xhs: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="1" width="14" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="8" y="11" text-anchor="middle" font-size="7" font-weight="bold" fill="currentColor">红</text></svg>',
    mail: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M.05 3.56A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.56L8 8.41.05 3.56zM0 4.7v7.1A2 2 0 0 0 2 14h12a2 2 0 0 0 2-2.2V4.7L8.27 9.4a.5.5 0 0 1-.54 0L0 4.7z"/></svg>'
  };

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  function visible(item) {
    if (item.hidden) return false;
    var now = Date.now();
    if (item.showFrom && now < Date.parse(item.showFrom)) return false;
    if (item.showUntil && now > Date.parse(item.showUntil)) return false;
    return true;
  }

  function track(name) {
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: name, event: true });
    }
  }

  /* ---------- header ---------- */

  function renderHeader(root) {
    var p = DATA.profile || {};
    var header = el("header", "board-header");

    if (p.avatar) {
      var img = el("img", "avatar");
      img.src = p.avatar;
      img.alt = (p.name || "DMICO") + " avatar";
      img.width = 84; img.height = 84;
      header.appendChild(img);
    }

    header.appendChild(el("div", "board-sub", "Departures · All Works"));
    header.appendChild(el("h1", "board-title", p.name || "DMICO"));
    if (p.tagline) header.appendChild(el("p", "tagline", p.tagline));
    root.appendChild(header);
  }

  /* ---------- socials ---------- */

  function renderSocials(root) {
    var list = (DATA.socials || []).filter(visible);
    if (!list.length) return;

    var nav = el("nav", "socials");
    nav.setAttribute("aria-label", "Social links");

    list.forEach(function (s) {
      var a = el("a", "social-pill");
      a.href = s.url;
      if (!/^mailto:/.test(s.url)) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      if (s.icon && SOCIAL_ICONS[s.icon]) a.innerHTML = SOCIAL_ICONS[s.icon];
      a.appendChild(document.createTextNode(s.label));
      a.addEventListener("click", function () { track("social-" + s.label.toLowerCase()); });
      nav.appendChild(a);
    });

    root.appendChild(nav);
  }

  /* ---------- sections + cards ---------- */

  function renderCard(card, gateNo) {
    /* embed cards must be a <div> (an iframe inside an <a> is invalid),
       so the title becomes the link instead */
    var isEmbed = !!card.embed;
    var isLink = !!card.url && !isEmbed;
    var cls = "gate-card" +
      (isLink ? "" : " is-static") +
      (card.featured ? " is-featured" : "") +
      (isEmbed ? " is-embed" : "");
    var node = el(isLink ? "a" : "div", cls);

    if (isLink) {
      node.href = card.url;
      node.target = "_blank";
      node.rel = "noopener";
      node.addEventListener("click", function () { track("card-" + gateNo.toLowerCase()); });
    }

    var badge = el("div", "gate-badge");
    if (card.thumb) {
      var img = el("img");
      img.src = card.thumb;
      img.alt = "";
      badge.appendChild(img);
    } else {
      badge.textContent = card.icon || "🔗";
    }
    node.appendChild(badge);

    var info = el("div", "gate-info");
    info.appendChild(el("div", "gate-no", "Gate " + gateNo));
    var title = el("div", "gate-title");
    if (isEmbed && card.url) {
      var titleLink = el("a", "gate-title-link", card.title);
      titleLink.href = card.url;
      titleLink.target = "_blank";
      titleLink.rel = "noopener";
      titleLink.addEventListener("click", function () { track("card-" + gateNo.toLowerCase()); });
      title.appendChild(titleLink);
    } else {
      title.textContent = card.title;
    }
    info.appendChild(title);
    if (card.desc) info.appendChild(el("div", "gate-desc", card.desc));
    node.appendChild(info);

    var status = card.status || "arrived";
    var chip = el("span", "chip chip-" + status, STATUS_LABELS[status] || status);
    node.appendChild(chip);

    if (isEmbed) {
      var wrap = el("div", "embed-wrap");
      var frame = el("iframe");
      frame.src = card.embed;
      frame.setAttribute("loading", "lazy");
      frame.setAttribute("allowfullscreen", "");
      frame.setAttribute("title", card.title + " embed");
      frame.setAttribute("allow", "accelerometer; encrypted-media; picture-in-picture");
      wrap.appendChild(frame);
      node.appendChild(wrap);
    }

    return node;
  }

  function renderSections(root) {
    (DATA.sections || []).forEach(function (section) {
      var cards = (section.cards || []).filter(visible);
      if (!cards.length) return; /* empty terminals auto-hide */

      /* featured first inside its section */
      cards.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });

      var sec = el("section", "terminal-section");
      sec.id = "terminal-" + String(section.terminal).toLowerCase();
      var head = el("div", "terminal-head");
      head.appendChild(el("span", "terminal-badge", "T" + section.terminal));
      head.appendChild(el("h2", "terminal-name", section.name));
      sec.appendChild(head);

      var list = el("div", "gate-list");
      list.setAttribute("role", "list");
      cards.forEach(function (card, i) {
        list.appendChild(renderCard(card, section.terminal + (i + 1)));
      });
      sec.appendChild(list);
      root.appendChild(sec);
    });
  }

  /* ---------- analytics (GoatCounter, optional) ---------- */

  function initAnalytics() {
    var code = DATA.settings && DATA.settings.goatcounter;
    if (!code) return;
    window.goatcounter = { endpoint: "https://" + code + ".goatcounter.com/count" };
    var s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-goatcounter", "https://" + code + ".goatcounter.com/count");
    s.src = "https://gc.zgo.at/count.js";
    document.head.appendChild(s);
  }

  /* ---------- theme token overrides (settings.tokens) ---------- */

  function applyTokens() {
    var tokens = DATA.settings && DATA.settings.tokens;
    if (!tokens) return;
    Object.keys(tokens).forEach(function (key) {
      document.documentElement.style.setProperty(key, tokens[key]);
    });
  }

  /* ---------- boot ---------- */

  var root = document.getElementById("terminal");
  applyTokens();
  renderHeader(root);
  renderSocials(root);
  renderSections(root);
  initAnalytics();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js").catch(function () { /* non-fatal */ });
  }
})();
