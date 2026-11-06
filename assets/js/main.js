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
  var certificates = C.certificates || [];
  var letters = C.letters || [];
  var experience = C.experience || [];
  var leadership = C.leadership || [];

  /* ---------- small helpers ---------- */

  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return ESC[ch];
    });
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function chips(items) {
    return (items || []).map(function (t) {
      return '<span class="chip">' + esc(t) + "</span>";
    }).join("");
  }

  function statusBadge(status) {
    var map = { Ongoing: "acc", Completed: "pub", Sample: "sample" };
    if (!status) return "";
    return '<span class="badge ' + (map[status] || "muted-badge") + '">' + esc(status) + "</span>";
  }

  function sampleBadge(item) {
    return item && item.sample ? '<span class="badge sample">Sample</span>' : "";
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
    var host = $("[data-roles]");
    if (!host) return;
    host.innerHTML = (site.roleLines || []).map(function (r) {
      var tail = [r.org, r.meta].filter(Boolean).join(" · ");
      return '<p class="role"><strong>' + esc(r.role) + "</strong>" +
        (tail ? ", " + esc(tail) : "") + "</p>";
    }).join("");
  }

  function renderBio() {
    var host = $("[data-bio]");
    if (host) {
      host.innerHTML = (site.bio || []).map(function (p) {
        return "<p>" + esc(p) + "</p>";
      }).join("");
    }
    var interests = $("[data-interests]");
    if (interests) interests.innerHTML = chips(site.interests);
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

  function projectItem(p) {
    return '<div class="ritem" data-project-item data-categories="' + esc((p.categories || []).join("|")) + '">' +
      '<a class="rthumb" href="project.html?id=' + encodeURIComponent(p.id) + '" tabindex="-1" aria-hidden="true">' +
        '<img src="' + esc(p.cover) + '" alt="" loading="lazy">' +
      "</a>" +
      "<div>" +
        "<h3><a href=\"project.html?id=" + encodeURIComponent(p.id) + "\">" + esc(p.title) + "</a></h3>" +
        '<div class="venue">' + esc(p.org) + " · " + esc(p.year) + " " + statusBadge(p.status) + "</div>" +
        "<p>" + esc(p.summary) + "</p>" +
        '<div class="meta-row">' + chips(p.tech) + "</div>" +
      "</div>" +
    "</div>";
  }

  function renderFeaturedProjects() {
    var host = $("[data-featured-projects]");
    if (!host) return;
    var featured = projects.filter(function (p) { return p.featured !== false; }).slice(0, 3);
    host.innerHTML = featured.map(projectItem).join("");
  }

  function renderProjects() {
    var host = $("[data-projects]");
    if (!host) return;

    host.innerHTML = projects.map(function (p) {
      var item = projectItem(p);
      return item;
    }).join("");

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

  function renderExperience() {
    var host = $("[data-experience]");
    if (host) {
      host.innerHTML = experience.map(function (job) {
        return "<li>" +
          '<span class="d">' + esc(job.period) + "</span>" +
          "<div>" +
            '<span class="r">' + esc(job.role) + "</span><br>" +
            '<span class="o">' + esc(job.org) + "</span>" +
            (job.points && job.points.length
              ? '<div class="x"><ul>' + job.points.map(function (pt) { return "<li>" + esc(pt) + "</li>"; }).join("") + "</ul></div>"
              : "") +
          "</div>" +
        "</li>";
      }).join("");
    }

    var lead = $("[data-leadership]");
    if (lead) {
      lead.innerHTML = leadership.map(function (item) {
        return "<li>" +
          '<span class="d">' + esc(item.period) + "</span>" +
          "<div>" +
            '<span class="r">' + esc(item.role) + "</span><br>" +
            '<span class="o">' + esc(item.org) + "</span>" +
            (item.note ? '<div class="x">' + esc(item.note) + "</div>" : "") +
          "</div>" +
        "</li>";
      }).join("");
    }
  }

  /* ---------- certificates ---------- */

  var certById = {};
  certificates.forEach(function (c) { certById[c.id] = c; });

  function certificateCard(cert) {
    return '<article class="cert-card">' +
      '<button class="cert-media" type="button" data-cert="' + esc(cert.id) + '" aria-label="Preview ' + esc(cert.title) + '">' +
        '<img src="' + esc(cert.thumbnail) + '" alt="' + esc(cert.title) + '" loading="lazy">' +
      "</button>" +
      '<div class="cert-body">' +
        '<div class="cert-top"><span>' + esc(cert.issuer) + '</span><span class="when">' + esc(cert.date) + "</span></div>" +
        "<h3>" + esc(cert.title) + " " + sampleBadge(cert) + "</h3>" +
        '<div class="meta-row">' + chips(cert.skills) + "</div>" +
        '<div class="cert-links">' +
          '<button class="linkish" type="button" data-cert="' + esc(cert.id) + '">Preview</button>' +
          (cert.credentialUrl
            ? '<a href="' + esc(cert.credentialUrl) + '" target="_blank" rel="noopener">Verify credential</a>'
            : '<span class="muted small">Copy available on request</span>') +
        "</div>" +
      "</div>" +
    "</article>";
  }

  function renderCertificates() {
    var host = $("[data-certificates]");
    if (host) host.innerHTML = certificates.map(certificateCard).join("");
  }

  function renderCertificatePreview() {
    var host = $("[data-cert-preview]");
    if (!host) return;
    host.innerHTML = certificates.slice(0, 3).map(certificateCard).join("");
  }

  function openCertificate(cert) {
    var hasFile = !!cert.file;
    openModal(
      '<p class="kicker">Certificate</p>' +
      '<h2 id="modal-title">' + esc(cert.title) + "</h2>" +
      '<p class="modal-sub">' + esc(cert.issuer) + " · " + esc(cert.date) + " " + sampleBadge(cert) + "</p>" +
      '<div class="modal-figure"><img src="' + esc(cert.thumbnail) + '" alt="' + esc(cert.title) + '"></div>' +
      (cert.skills && cert.skills.length ? '<div class="meta-row">' + chips(cert.skills) + "</div>" : "") +
      '<div class="modal-actions">' +
        (hasFile
          ? '<a class="btn btn-primary" href="' + esc(cert.file) + '" target="_blank" rel="noopener">Open PDF</a>' +
            '<a class="btn" href="' + esc(cert.file) + '" download>Download</a>'
          : '<span class="muted small">A digital copy of this certificate is available on request.</span>') +
        (cert.credentialUrl
          ? '<a class="btn" href="' + esc(cert.credentialUrl) + '" target="_blank" rel="noopener">Verify credential</a>'
          : "") +
      "</div>"
    );
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-cert]");
    if (!trigger) return;
    var cert = certById[trigger.getAttribute("data-cert")];
    if (cert) openCertificate(cert);
  });

  /* ---------- letters ---------- */

  var letterById = {};
  letters.forEach(function (l) { letterById[l.id] = l; });

  function letterItem(letter) {
    var isPublic = letter.visibility === "public" && !!letter.file;
    var onRequest = letter.visibility === "on-request";
    return '<article class="letter-item">' +
      '<div class="letter-preview">' +
        '<img src="' + esc(letter.thumbnail) + '" alt="" loading="lazy">' +
        (isPublic ? '<span class="badge acc">PDF</span>' : '<span class="badge muted-badge">On request</span>') +
      "</div>" +
      "<div>" +
        '<p class="kicker">Letter of recommendation</p>' +
        "<h3>" + esc(letter.recommender) + " " + sampleBadge(letter) + "</h3>" +
        '<p class="letter-role">' + esc(letter.title) + ", " + esc(letter.affiliation) + "</p>" +
        '<p class="letter-rel">' + esc(letter.relationship) + " · " + esc(letter.date) + "</p>" +
        '<div class="letter-actions">' +
          (isPublic
            ? '<button class="linkish" type="button" data-letter="' + esc(letter.id) + '">Preview</button>' +
              '<a href="' + esc(letter.file) + '" target="_blank" rel="noopener">Open PDF</a>' +
              '<a href="' + esc(letter.file) + '" download>Download</a>'
            : '<span class="muted small">' +
              (onRequest ? "Available on request — please get in touch by email." : "A digital copy is available on request.") +
              "</span>") +
        "</div>" +
      "</div>" +
    "</article>";
  }

  function renderLetters() {
    var host = $("[data-letters]");
    if (host) host.innerHTML = letters.map(letterItem).join("");
  }

  function openLetter(letter) {
    if (!letter || !letter.file) return;
    openModal(
      '<p class="kicker">Letter of recommendation</p>' +
      '<h2 id="modal-title">' + esc(letter.recommender) + "</h2>" +
      '<p class="modal-sub">' + esc(letter.title) + ", " + esc(letter.affiliation) + " · " + esc(letter.date) + "</p>" +
      '<iframe class="pdf-frame" src="' + esc(letter.file) + '#view=FitH" title="Letter of recommendation from ' + esc(letter.recommender) + '"></iframe>' +
      '<div class="modal-actions">' +
        '<a class="btn btn-primary" href="' + esc(letter.file) + '" target="_blank" rel="noopener">Open in new tab</a>' +
        '<a class="btn" href="' + esc(letter.file) + '" download>Download</a>' +
      "</div>" +
      '<span class="note">Shared with the permission of the author.</span>'
    );
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-letter]");
    if (!trigger) return;
    openLetter(letterById[trigger.getAttribute("data-letter")]);
  });

  /* ---------- project detail ---------- */

  function projectFigure(project) {
    if (!project.cover) return "";
    return '<figure class="figure">' +
      '<div class="frame"><img src="' + esc(project.cover) + '" alt="' + esc(project.title) + '" data-lightbox data-caption="' + esc(project.coverCaption || project.title) + '"></div>' +
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

    host.innerHTML =
      '<a class="back-link" href="projects.html">&larr; All projects</a>' +
      '<header class="detail-head">' +
        '<p class="kicker">' + esc((project.categories || [])[0] || "Project") + "</p>" +
        "<h1>" + esc(project.title) + "</h1>" +
        '<p class="detail-meta">' + esc(project.org) + " · " + esc(project.year) + " " + statusBadge(project.status) + "</p>" +
      "</header>" +
      '<dl class="facts">' +
        '<div class="fact"><div class="k">Role</div><div class="v">' + esc(project.role) + "</div></div>" +
        '<div class="fact"><div class="k">Organisation</div><div class="v">' + esc(project.org) + "</div></div>" +
        '<div class="fact"><div class="k">Timeline</div><div class="v">' + esc(project.year) + "</div></div>" +
        '<div class="fact"><div class="k">Status</div><div class="v">' + esc(project.status) + "</div></div>" +
      "</dl>" +
      '<div class="detail-grid">' +
        '<div class="prose">' +
          (project.description || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
          projectFigure(project) +
          ((project.gallery && project.gallery.length)
            ? '<div class="gallery">' + project.gallery.map(function (g) {
                return '<figure class="figure">' +
                  '<div class="frame"><img src="' + esc(g.src) + '" alt="' + esc(g.caption || project.title) + '" loading="lazy" data-lightbox data-caption="' + esc(g.caption || project.title) + '"></div>' +
                  (g.caption ? "<figcaption>" + esc(g.caption) + "</figcaption>" : "") +
                "</figure>";
              }).join("") + "</div>"
            : "") +
        "</div>" +
        '<aside class="detail-aside">' +
          ((project.highlights && project.highlights.length)
            ? '<div class="panel"><h3>Highlights</h3><ul>' +
              project.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") +
              "</ul></div>"
            : "") +
          ((project.tech && project.tech.length)
            ? '<div class="panel"><h3>Tools &amp; methods</h3><div class="chips">' + chips(project.tech) + "</div></div>"
            : "") +
          ((project.links && project.links.length)
            ? '<div class="panel"><h3>Links</h3><div class="links">' +
              project.links.map(function (l) {
                return '<a href="' + esc(l.href) + '"' + externalAttrs(l) + ">" + esc(l.label) + " &rarr;</a>";
              }).join("") +
              "</div></div>"
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
        : "");
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
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      links.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          links.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  /* ---------- boot ---------- */

  initChrome();
  renderRoles();
  renderContacts();
  renderBio();
  renderStats();
  renderFeaturedProjects();
  renderProjects();
  renderExperience();
  renderCertificates();
  renderCertificatePreview();
  renderLetters();
  renderProjectDetail();
})();
