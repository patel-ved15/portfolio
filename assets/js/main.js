/* =========================================================
   Ved Patel — site renderer
   Reads window.CONTENT (assets/data/content.js) and fills
   the [data-*] containers on each page.
   ========================================================= */
(function () {
  "use strict";

  var C = window.CONTENT;
  if (!C) {
    console.error("content.js did not load — no content to render.");
    return;
  }

  var site = C.site || {};
  var projects = C.projects || [];
  var credentials = C.credentials || [];
  var experience = C.experience || [];
  var leadership = C.leadership || [];
  var coursework = site.coursework || [];

  /* ---------- small helpers ---------- */

  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return ESC[ch];
    });
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function tags(items) {
    return (items || []).map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join("");
  }

  function sampleBadge(item) {
    return item && item.sample ? '<span class="badge sample">Sample</span>' : "";
  }

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }

  var ICONS = {
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z"/></svg>',
    doc2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>'
  };

  function icon(name) { return ICONS[name] || ICONS.doc2; }

  function externalAttrs(link) {
    return link && link.external ? ' target="_blank" rel="noopener"' : "";
  }

  /* ---------- modal ---------- */

  function getModal() {
    var dlg = document.getElementById("modal");
    if (dlg) return dlg;

    dlg = document.createElement("dialog");
    dlg.id = "modal";
    dlg.className = "modal";

    var panel = document.createElement("div");
    panel.className = "modal-panel";

    var close = document.createElement("button");
    close.className = "modal-close";
    close.type = "button";
    close.setAttribute("aria-label", "Close");
    close.textContent = "\u00d7";

    var body = document.createElement("div");
    body.className = "modal-body";

    panel.appendChild(close);
    panel.appendChild(body);
    dlg.appendChild(panel);
    document.body.appendChild(dlg);

    close.addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (event) {
      if (event.target === dlg) dlg.close();
    });
    dlg.addEventListener("close", function () {
      document.body.classList.remove("modal-open");
      body.innerHTML = "";
    });

    return dlg;
  }

  function openModal(html) {
    var dlg = getModal();
    dlg.querySelector(".modal-body").innerHTML = html;
    document.body.classList.add("modal-open");
    if (typeof dlg.showModal === "function" && !dlg.open) dlg.showModal();
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      var open = document.getElementById("modal");
      if (open && open.open) open.close();
      var links = $(".nav-links");
      var toggle = $(".nav-toggle");
      if (links && links.classList.contains("open")) {
        links.classList.remove("open");
        document.body.classList.remove("menu-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  /* ---------- shared renderers ---------- */

  function renderContacts() {
    var host = $("[data-contacts]");
    if (!host) return;
    host.innerHTML = (site.contacts || []).map(function (c) {
      var inner = icon(c.icon) + "<span>" + esc(c.label) + "</span>";
      if (c.href) {
        return '<a href="' + esc(c.href) + '"' + externalAttrs(c) + ">" + inner + "</a>";
      }
      return "<span>" + inner + "</span>";
    }).join("");
  }

  function renderRoles() {
    var host = $("[data-hero-roles]");
    if (!host) return;
    host.innerHTML = (site.roleLines || []).map(function (r) {
      var tail = [r.org, r.meta].filter(Boolean).join(" · ");
      return '<p class="hero-role"><strong>' + esc(r.role) + "</strong>" +
        (tail ? "<span>" + esc(tail) + "</span>" : "") + "</p>";
    }).join("");
  }

  function renderStatic() {
    $$("[data-site-name]").forEach(function (el) { el.textContent = site.name || ""; });
    $$("[data-site-tagline]").forEach(function (el) { el.textContent = site.tagline || ""; });
    $$("[data-site-email]").forEach(function (el) {
      el.textContent = site.email || "";
      if (el.tagName === "A") el.setAttribute("href", "mailto:" + (site.email || ""));
    });
    $$("[data-site-location]").forEach(function (el) { el.textContent = site.location || ""; });
    $$("[data-site-caption]").forEach(function (el) { el.textContent = site.heroCaption || ""; });
    $$("[data-cv]").forEach(function (el) { el.setAttribute("href", site.cv || "#"); });
  }

  function renderBio() {
    var host = $("[data-bio]");
    if (host) {
      host.innerHTML = (site.bio || []).map(function (p) {
        return "<p>" + esc(p) + "</p>";
      }).join("");
    }
    var interests = $("[data-interests]");
    if (interests) interests.innerHTML = tags(site.interests);
  }

  function renderStats() {
    var host = $("[data-stats]");
    if (!host) return;
    host.innerHTML = (site.stats || []).map(function (s) {
      return '<div class="stat"><div class="num">' + esc(s.num) + "</div>" +
        '<div class="lbl">' + esc(s.label) + "</div>" +
        '<div class="sub">' + esc(s.sub) + "</div></div>";
    }).join("");
  }

  function renderCoursework() {
    var host = $("[data-coursework]");
    if (!host) return;
    host.innerHTML = coursework.map(function (group) {
      return '<div class="course-group">' +
        "<h3>" + esc(group.title) + "</h3>" +
        "<ul>" +
          (group.courses || []).map(function (course) {
            return "<li>" + esc(course) + "</li>";
          }).join("") +
        "</ul>" +
      "</div>";
    }).join("");
  }

  /* ---------- project list ---------- */

  function workRow(p, i) {
    var href = "project.html?id=" + encodeURIComponent(p.id);
    var domain = p.domain || (p.categories || [])[0] || "Project";
    return '<li class="work-row" data-project-item data-categories="' + esc((p.categories || []).join("|")) + '">' +
      '<a class="work-link" href="' + href + '">' +
        '<span class="work-num">' + pad(i + 1) + "</span>" +
        '<span class="work-copy">' +
          '<span class="work-meta">' + esc(domain) + "</span>" +
          '<span class="work-title">' + esc(p.title) + "</span>" +
        "</span>" +
        '<span class="work-thumb"><img src="' + esc(p.cover) + '" alt="" loading="lazy" decoding="async"></span>' +
        '<span class="work-arrow" aria-hidden="true">&rarr;</span>' +
      "</a>" +
    "</li>";
  }

  function renderFeaturedProjects() {
    var host = $("[data-featured-projects]");
    if (!host) return;
    host.innerHTML = projects.map(workRow).join("");
  }

  function renderProjects() {
    var host = $("[data-projects]");
    if (!host) return;

    host.innerHTML = projects.map(workRow).join("");

    var filterHost = $("[data-filters]");
    if (filterHost) {
      var cats = [];
      projects.forEach(function (p) {
        (p.categories || []).forEach(function (c) {
          if (cats.indexOf(c) === -1) cats.push(c);
        });
      });

      var buttons = ['<button class="filter active" type="button" data-filter="all" aria-pressed="true">All</button>'];
      cats.forEach(function (c) {
        buttons.push('<button class="filter" type="button" data-filter="' + esc(c) + '" aria-pressed="false">' + esc(c) + "</button>");
      });
      filterHost.innerHTML = buttons.join("");

      filterHost.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-filter]");
        if (!btn) return;
        var filter = btn.getAttribute("data-filter");

        $$("[data-filter]", filterHost).forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("active", active);
          b.setAttribute("aria-pressed", String(active));
        });

        var visible = 0;
        $$("[data-project-item]", host).forEach(function (item) {
          var match = filter === "all" || item.getAttribute("data-categories").split("|").indexOf(filter) !== -1;
          item.hidden = !match;
          if (match) visible++;
        });

        var empty = $("[data-project-empty]");
        if (empty) empty.hidden = visible > 0;
      });
    }
  }

  /* ---------- experience ---------- */

  function renderExperience() {
    var host = $("[data-experience]");
    if (host) {
      host.innerHTML = experience.map(function (job) {
        return '<div class="timeline-item">' +
          '<p class="timeline-date">' + esc(job.period) + "</p>" +
          "<h3>" + esc(job.role) + "</h3>" +
          '<p class="timeline-org">' + esc(job.org) + "</p>" +
          (job.points && job.points.length
            ? "<ul>" + job.points.map(function (pt) { return "<li>" + esc(pt) + "</li>"; }).join("") + "</ul>"
            : "") +
        "</div>";
      }).join("");
    }

    var lead = $("[data-leadership]");
    if (lead) {
      lead.innerHTML = leadership.map(function (item) {
        return '<div class="lead">' +
          '<p class="lead-role">' + esc(item.role) + "</p>" +
          '<p class="lead-org">' + esc(item.org) + "</p>" +
          (item.note ? '<p class="lead-note">' + esc(item.note) + "</p>" : "") +
          '<p class="lead-date">' + esc(item.period) + "</p>" +
        "</div>";
      }).join("");
    }
  }

  /* ---------- credentials ---------- */

  var credentialById = {};
  credentials.forEach(function (c) { credentialById[c.id] = c; });

  function credentialIssuer(item) {
    return item.issuer || item.affiliation || "";
  }

  function ledgerRow(item) {
    var isLetter = item.type === "Letter";
    var isImage = item.file && /\.(jpe?g|png|webp|gif|avif)($|\?)/i.test(item.file);
    var action = item.file
      ? (isLetter ? "Read letter \u2192" : (isImage ? "View \u2192" : "Open PDF \u2192"))
      : "View \u2192";
    return '<button class="ledger-row" type="button" data-credential="' + esc(item.id) + '">' +
      '<span class="ledger-year">' + esc(item.date) + "</span>" +
      '<span class="ledger-title">' + esc(item.title) + " " + sampleBadge(item) + "</span>" +
      '<span class="ledger-issuer">' + esc(credentialIssuer(item)) + "</span>" +
      '<span class="ledger-action">' + action + "</span>" +
    "</button>";
  }

  function renderCredentials() {
    var host = $("[data-credentials]");
    if (host) host.innerHTML = credentials.map(ledgerRow).join("");
  }

  function renderCredentialPreview() {
    var host = $("[data-credential-preview]");
    if (!host) return;
    host.innerHTML = credentials.map(ledgerRow).join("");
  }

  function openCredential(item) {
    var isLetter = item.type === "Letter";
    var hasFile = !!item.file;
    var isPdf = hasFile && /\.pdf($|\?)/i.test(item.file);
    var isImage = hasFile && /\.(jpe?g|png|webp|gif|avif)($|\?)/i.test(item.file);
    var kind = isLetter ? "Letter of recommendation" : "Certificate";

    var html =
      '<p class="mini-label">' + esc(kind) + "</p>" +
      '<h2 id="modal-title">' + esc(item.title) + "</h2>" +
      '<p class="modal-sub">' + esc(credentialIssuer(item)) + " \u00b7 " + esc(item.date) + " " + sampleBadge(item) + "</p>";

    if (isLetter && item.recommender) {
      html += '<p class="modal-copy"><strong>' + esc(item.recommender) + "</strong>" +
        (item.recommenderTitle ? ", " + esc(item.recommenderTitle) : "") +
        (item.affiliation ? ", " + esc(item.affiliation) : "") + "</p>";
    }

    if (item.summary) {
      html += '<p class="modal-copy">' + esc(item.summary) + "</p>";
    }

    if (hasFile && isPdf) {
      html += '<iframe class="pdf-frame" src="' + esc(item.file) + '#view=FitH" title="' + esc(item.title) + '"></iframe>';
    } else if (isImage) {
      html += '<div class="modal-figure"><img src="' + esc(item.file) + '" alt="' + esc(item.title) + '"></div>';
    } else {
      html += '<div class="modal-figure"><img src="' + esc(item.thumbnail) + '" alt="' + esc(item.title) + '"></div>';
    }

    if (item.skills && item.skills.length) {
      html += '<div class="work-tags">' + tags(item.skills) + "</div>";
    }

    html += '<div class="modal-actions">';
    if (hasFile) {
      html += '<a class="btn btn-accent" href="' + esc(item.file) + '" target="_blank" rel="noopener">' +
        (isImage ? "Open image" : "Open PDF") + '</a>' +
        '<a class="btn" href="' + esc(item.file) + '" download>Download</a>';
    } else {
      html += '<span class="muted small">A digital copy of this credential is available on request.</span>';
    }
    if (item.credentialUrl) {
      html += '<a class="btn" href="' + esc(item.credentialUrl) + '" target="_blank" rel="noopener">Verify credential</a>';
    }
    html += "</div>";

    if (isLetter && hasFile) {
      html += '<span class="note">Shared with the permission of the author.</span>';
    }

    openModal(html);
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-credential]");
    if (!trigger) return;
    var item = credentialById[trigger.getAttribute("data-credential")];
    if (item) openCredential(item);
  });

  /* ---------- project detail ---------- */

  function projectFigure(project) {
    if (!project.cover) return "";
    return '<figure class="figure">' +
      '<div class="frame"><img src="' + esc(project.cover) + '" alt="' + esc(project.title) + '" decoding="async" data-lightbox data-caption="' + esc(project.coverCaption || project.title) + '"></div>' +
      (project.coverCaption ? "<figcaption>" + esc(project.coverCaption) + "</figcaption>" : "") +
    "</figure>";
  }

  function renderProjectDetail() {
    var host = $("[data-project-detail]");
    if (!host) return;

    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var index = -1;
    var project = null;

    projects.forEach(function (p, i) {
      if (p.id === id) { project = p; index = i; }
    });

    if (!project) {
      host.innerHTML =
        '<a class="back-link" href="projects.html">&larr; All projects</a>' +
        '<div class="empty"><h1 class="empty-title">Project not found</h1>' +
        "<p>That project may have moved. <a href=\"projects.html\">Browse all projects</a>.</p></div>";
      return;
    }

    document.title = project.title + " · " + (site.name || "Portfolio");
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", project.summary);

    var previous = projects[index - 1];
    var next = projects[index + 1];
    var domain = project.domain || (project.categories || [])[0] || "Project";
    var indexLabel = pad(index + 1) + " / " + pad(projects.length);
    var tech = project.tech || [];

    var indexList = projects.map(function (p, i) {
      var current = p.id === project.id;
      return "<li><a href=\"project.html?id=" + encodeURIComponent(p.id) + "\"" +
        (current ? ' aria-current="page"' : "") + ">" +
        "<span>" + pad(i + 1) + "</span>" +
        "<span>" + esc(p.title) + "</span>" +
      "</a></li>";
    }).join("");

    host.innerHTML =
      '<header class="detail-hero">' +
        '<div class="wrap">' +
          '<a class="back-link" href="projects.html">&larr; All projects</a>' +
          '<p class="mini-label">Project ' + pad(index + 1) + " / " + pad(projects.length) + "</p>" +
          "<h1>" + esc(project.title) + "</h1>" +
          '<p class="lede">' + esc(project.summary) + "</p>" +
          '<p class="masthead-meta">' +
            "<span>" + esc(domain) + "</span><span class=\"sep\">/</span>" +
            "<span>" + esc(indexLabel) + "</span>" +
          "</p>" +
        "</div>" +
      "</header>" +
      '<div class="wrap" style="padding-top:0">' +
        '<dl class="facts">' +
          '<div class="fact"><div class="k">Domain</div><div class="v">' + esc(domain) + "</div></div>" +
          '<div class="fact"><div class="k">Tools &amp; methods</div><div class="v">' + esc(tech.join(" \u00b7 ")) + "</div></div>" +
          '<div class="fact"><div class="k">Project index</div><div class="v">' + esc(indexLabel) + "</div></div>" +
        "</dl>" +
        '<div class="detail-grid">' +
          '<div class="prose">' +
            (project.description || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
            projectFigure(project) +
          "</div>" +
          '<aside class="detail-aside">' +
            '<div class="panel"><h3>Project index</h3><ol class="index-list">' + indexList + "</ol></div>" +
            ((tech.length)
              ? '<div class="panel"><h3>Tools &amp; methods</h3><div class="chips">' + tags(tech) + "</div></div>"
              : "") +
          "</aside>" +
        "</div>" +
        ((previous || next)
          ? '<nav class="prevnext" aria-label="Project navigation">' +
              (previous
                ? '<a href="project.html?id=' + encodeURIComponent(previous.id) + '"><span class="lbl">&larr; Previous</span><span class="t">' + esc(previous.title) + "</span></a>"
                : "<span></span>") +
              (next
                ? '<a class="next" href="project.html?id=' + encodeURIComponent(next.id) + '"><span class="lbl">Next &rarr;</span><span class="t">' + esc(next.title) + "</span></a>"
                : "<span></span>") +
            "</nav>"
          : "") +
      "</div>";
  }

  /* ---------- image lightbox ---------- */

  document.addEventListener("click", function (event) {
    var img = event.target.closest("[data-lightbox]");
    if (!img) return;
    event.preventDefault();
    openModal(
      '<div class="modal-figure" style="margin:0"><img src="' + esc(img.getAttribute("src")) + '" alt="' + esc(img.getAttribute("alt") || "") + '"></div>' +
      '<p class="modal-sub" style="margin:.9rem 0 0">' + esc(img.getAttribute("data-caption") || "") + "</p>"
    );
  });

  /* ---------- chrome ---------- */

  function initChrome() {
    $$("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });

    var toggle = $(".nav-toggle");
    var links = $(".nav-links");
    if (toggle && links) {
      var setMenu = function (open) {
        links.classList.toggle("open", open);
        document.body.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", String(open));
      };
      toggle.addEventListener("click", function () {
        setMenu(!links.classList.contains("open"));
      });
      links.addEventListener("click", function (event) {
        if (event.target.closest("a")) setMenu(false);
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth > 760) setMenu(false);
      });
    }
  }

  /* ---------- boot ---------- */

  initChrome();
  renderStatic();
  renderRoles();
  renderContacts();
  renderBio();
  renderStats();
  renderCoursework();
  renderFeaturedProjects();
  renderProjects();
  renderExperience();
  renderCredentials();
  renderCredentialPreview();
  renderProjectDetail();
})();
