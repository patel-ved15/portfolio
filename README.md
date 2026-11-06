# Ved Patel — portfolio site

A static academic portfolio: home/profile, projects, project detail pages,
certificates and letters of recommendation.

No framework, no build step, no dependencies. Plain HTML, one stylesheet,
one renderer and one content file. The visual language is editorial rather
than corporate: parchment paper, deep ink, terracotta accents, a serif
display face and a mono label face.

---

## Preview locally

Double-click `index.html`, or serve the folder:

```powershell
# from C:\Users\Ved\portfolio
python -m http.server 8080
# then open http://localhost:8080
```

Everything works from `file://` too, because the content is a JavaScript
global rather than a fetched JSON file.

---

## Files

```
index.html            Home / profile
projects.html         Project list with category filters
project.html          Project detail template (reads ?id=slug)
certificates.html     Certificate ledger + preview modal
letters.html          Letters of recommendation
404.html              Not-found page
assets/
  css/style.css       All styling (palette lives in :root)
  js/main.js          Rendering, filters, modals, mobile nav
  data/content.js     ← edit this for almost everything
  img/                Portrait and placeholder artwork
  docs/               CV, sample letter PDFs, (later) certificate PDFs
.nojekyll             Tells GitHub Pages not to run Jekyll
```

---

## Editing content

Open `assets/data/content.js`. Search for `TODO` to find the sample entries.

### Change the accent colour

`assets/css/style.css`, first block:

```css
--paper:       #f3eee4;   /* page background */
--ink:         #141c19;   /* dark bands and headings */
--accent:      #b3451f;   /* terracotta — links, labels, rules */
--accent-deep: #8f3416;
```

The site uses one accent for every highlight, so changing `--accent` (and
`--accent-deep`) re-themes it. `--accent-on-dark` is the lighter tint used on
the ink-coloured hero, masthead and footer.

### Add GitHub / LinkedIn

In `content.js` → `site.contacts`, add:

```js
{ label: "GitHub", href: "https://github.com/username", icon: "github", external: true },
{ label: "LinkedIn", href: "https://linkedin.com/in/username", icon: "linkedin", external: true }
```

### Add a project

Add an object to the `projects` array. Copy an existing one and change the
fields. `id` becomes the URL (`project.html?id=your-id`), so keep it short and
unique. Drop screenshots into `assets/img/projects/` and point `cover` at one.

```js
{
  id: "my-project",
  title: "Project title",
  categories: ["Robotics"],          // drives the filter buttons
  year: "2026",
  status: "Ongoing",                 // "Ongoing" | "Completed"
  role: "Your role",
  org: "Organisation",
  summary: "One sentence for the list card.",
  description: ["Paragraph one.", "Paragraph two."],
  highlights: ["Point one", "Point two"],
  tech: ["SolidWorks", "ANSYS"],
  cover: "assets/img/projects/my-project.jpg",
  coverCaption: "What the image shows.",
  gallery: [                          // optional
    { src: "assets/img/projects/shot-2.jpg", caption: "Caption" }
  ],
  links: [                            // optional
    { label: "GitHub", href: "https://github.com/...", external: true }
  ]
}
```

### Add a certificate

Put the PDF in `assets/docs/certificates/` and a preview image in
`assets/img/certificates/`, then add:

```js
{
  id: "cert-id",
  title: "Certificate title",
  issuer: "Issuing organisation",
  date: "2026",
  credentialUrl: null,                       // optional verification link
  file: "assets/docs/certificates/cert-id.pdf",
  thumbnail: "assets/img/certificates/cert-id.jpg",
  skills: ["CFD"],
  sample: false                              // omit or set false once real
}
```

### Add a letter of recommendation

Put the signed PDF in `assets/docs/lors/`, then:

```js
{
  id: "lor-name",
  recommender: "Dr. A. Person",
  title: "Professor",
  affiliation: "BITS Pilani",
  relationship: "Project supervisor",
  date: "2026",
  visibility: "public",              // "public" (PDF shown) or "on-request"
  file: "assets/docs/lors/lor-name.pdf",
  thumbnail: "assets/img/letter-placeholder.svg"
}
```

`visibility: "public"` with a `file` gives the card Preview / Open PDF actions
and an embedded PDF viewer. `"on-request"` shows the recommender details but no
document. A `public` entry without a `file` renders “Document not uploaded yet”
rather than a broken link.

> **Privacy:** anything in `visibility: "public"` with a `file` is published and
> can be indexed. Use `"on-request"` to show the recommender details but no PDF.
> Only publish a letter with its author's permission.

Two sample PDFs ship in `assets/docs/lors/` (`sample-lor-drdo.pdf`,
`sample-lor-bits.pdf`). They are clearly marked placeholders in the document
itself. Replace them with the signed originals and update the `file` paths.

### Remove the "Sample" badges

Sample entries in `certificates` and `letters` have `sample: true`. Once the
real details and PDF are in place, delete that line — the badge disappears.

### Replace the portrait and CV

- Portrait: `assets/img/portrait.jpg` (4:5, currently 760×950).
- CV: `assets/docs/Ved_Patel_CV.pdf`.

The CV filename is referenced in the nav and footer of each page, and in
`content.js` (`site.cv`). If you rename it, search-and-replace the path.

---

## Deploy to GitHub Pages

1. Create a repository on GitHub — e.g. `portfolio`.
   - Name it `your-username.github.io` if you want the site at the root URL.
   - Any other name gives `https://your-username.github.io/portfolio/`.
     All paths in this site are relative, so both work.
2. Push this folder:

   ```powershell
   cd C:\Users\Ved\portfolio
   git remote add origin https://github.com/your-username/portfolio.git
   git branch -M main
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)**
   - Save.
4. Wait a minute, then open the URL GitHub shows.

### Custom domain (optional, later)

Add a file named `CNAME` at the root containing just your domain, then point
DNS at GitHub Pages (A records for the apex, CNAME for `www`). Enable
**Enforce HTTPS** in Settings → Pages.

---

## Notes

- The site is print-friendly. Its colours are deliberately warm and light; a
  dark-mode variant would be a small addition to `style.css` if wanted later.
- Phone number is deliberately not published. Add it to `site.contacts` only if
  you want it public.
- The resume file used for the CV is `Resume 01-11-2026_compressed.pdf`; swap it
  if a newer version exists.
