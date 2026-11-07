# Ved Patel — portfolio site

A static academic portfolio: home/profile, an eight-project index, project
detail pages and a merged credentials page for certificates and letters of
recommendation.

No framework, no build step, no dependencies. Plain HTML, one stylesheet, one
renderer and one content file. The visual language is editorial rather than
corporate: parchment paper, deep ink, terracotta accents, a serif display face
and a mono label face.

---

## Preview locally

Double-click `index.html`, or serve the folder:

```powershell
# from C:\Users\Ved\portfolio
python -m http.server 8080
# then open http://localhost:8080
```

Everything works from `file://` too, because the content is a JavaScript global
rather than a fetched JSON file.

---

## Files

```
index.html            Home / profile, projects, credentials and coursework
projects.html         Project list with category filters
project.html          Project detail template (reads ?id=slug)
credentials.html      Certificates and letters in one ledger
404.html              Not-found page
assets/
  css/style.css       All styling (palette lives in :root)
  js/main.js          Rendering, filters, modals, mobile nav
  data/content.js     ← edit this for almost everything
  img/                Portrait, project photos, credential thumbnails
  docs/               CV, certificates and letters (PDF)
.nojekyll             Tells GitHub Pages not to run Jekyll
```

---

## Editing content

Open `assets/data/content.js`. Search for `TODO` or `sample: true` to find the
entries that still need real details.

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

Add an object to the `projects` array. The order of the array is the order on
both the home page and `projects.html`. The home page shows only the project
name and `domain`; the full `description` and one cover image live on the
detail page.

```js
{
  id: "my-project",                       // becomes project.html?id=my-project
  title: "Project title",
  domain: "Mechanical Design",            // label shown on the home index
  categories: ["Mechanical Design"],      // drives the filter buttons
  summary: "One sentence for the detail lede and social preview.",
  description: ["Paragraph one.", "Paragraph two."],
  tech: ["SolidWorks", "ANSYS"],
  cover: "assets/img/projects/my-project.jpg",
  coverCaption: "What the image shows."
}
```

Filter groups currently in use: **Mechanical Design**, **CFD**, **Aerospace**,
**Design & Additive Manufacturing**, and **Robotics & Control**. A project can
appear under more than one group by listing multiple categories.

### Add a project photo

Drop the image into `assets/img/projects/` and point `cover` at it. Each detail
page is designed for one photograph. WebP at 1600×1200 (4:3) is preferred,
roughly 150–300 KB. Four projects currently use real photos (`chassis`,
`cfd-solver`, `rover-wheel`, `hopf-oscillator`); the other four still use themed
SVG placeholders — replace them and update the paths in `content.js` when the
photos are available.

### Add or edit a credential

Certificates and letters share one `credentials` array and one page. Each entry
needs a `type` of `"Certificate"` or `"Letter"`.

```js
{
  id: "cert-id",
  type: "Certificate",                    // "Certificate" | "Letter"
  title: "Certificate title",
  issuer: "Issuing organisation",
  date: "2026",
  summary: "One or two sentences for the preview modal.",
  skills: ["CFD"],
  credentialUrl: null,                    // optional verification link
  file: "assets/docs/certificates/cert-id.pdf",
  thumbnail: "assets/img/certificates/cert-id.jpg",
  sample: false                           // omit or false once real
}
```

For a letter, use the letter-specific fields instead of `skills`:

```js
{
  id: "lor-name",
  type: "Letter",
  title: "Letter of Recommendation — Role",
  issuer: "Organisation",
  date: "2026",
  summary: "Who wrote it and what it covers.",
  recommender: "Dr. A. Person",
  recommenderTitle: "Professor",
  affiliation: "BITS Pilani",
  relationship: "Project supervisor",
  visibility: "public",
  file: "assets/docs/lors/lor-name.pdf",
  thumbnail: "assets/img/lors/lor-name-thumb.webp",
  sample: false
}
```

A PDF `file` gives the row Preview / Open PDF actions and an embedded PDF
viewer. With `file: null`, the row still appears and the modal says a copy is
available on request.

> **Privacy:** anything with a public `file` is published and can be indexed.
> Only publish a letter with its author's permission. The DRDO letter
> (`assets/docs/lors/lor-drdo.pdf`) is the signed original and is published
> with the recommender's name on the page.

### Add coursework

Coursework lives in `site.coursework` as groups of course names:

```js
coursework: [
  { title: "Core", courses: ["Fluid Mechanics", "Heat Transfer"] },
  { title: "Electives / Robotics Minor", courses: ["Robotics"] }
]
```

The home page renders the groups in order.

### Remove the "Sample" badges

Sample entries in `credentials` have `sample: true`. Once the real details and
document are in place, delete that line — the badge disappears.

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

## Future update workflow

Every content change follows the same loop:

1. **Edit** `assets/data/content.js` (text, projects, credentials, coursework).
2. **Add files** to `assets/img/projects/` for photos and `assets/docs/` for
   PDFs, then update the matching `cover` / `file` path in `content.js`.
3. **Preview** with `python -m http.server 8080` and check the home page, the
   project detail page, the credentials modal and a narrow mobile width.
4. **Commit and push**:

   ```powershell
   cd C:\Users\Ved\portfolio
   git add -A
   git commit -m "Update projects and credentials"
   git push
   ```

5. GitHub Pages redeploys automatically from `main`; the live site updates in
   roughly a minute.

To take a project down, delete its object from the `projects` array. To hide a
credential, delete it from `credentials`; to keep the row but hide the file,
set `file: null`.

---

## Notes

- The site is print-friendly. Its colours are deliberately warm and light; a
  dark-mode variant would be a small addition to `style.css` if wanted later.
- Phone number is deliberately not published. Add it to `site.contacts` only if
  you want it public.
- The home page lists all eight projects; the filter buttons on `projects.html`
  narrow the list by category.
