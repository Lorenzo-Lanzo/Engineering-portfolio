# Lorenzo Lanzo’s engineering portfolio

This is a complete static website in English, using HTML, one shared stylesheet, and three small JavaScript files. No npm, build command, backend, or database is required. The files you edit are the files you upload.

The six case studies now describe your actual projects. Content is grounded in your CV, thesis, schematics, and project media. Biomedical projects use the CV year **2026**; the SoM, Eurorack module, and pedal use **2025**. The STM32 audio board is labeled **revision 0**, since the CV does not explicitly date it. Contact details and the profile are personalized from the CV. No repository URLs were supplied, so there are no invented repository links.

## 1. Folder structure

```text
portfolio/                         Folder to publish
  index.html                       Homepage, six cards, contact
  projects.html                    Project collection and filters
  about.html                       CV-based background and skills
  README.md                        Editing and publishing guide
  ASSET-NOTES.md                   Media provenance and processing
  .nojekyll                        GitHub Pages static-file marker
  projects/
    emg-acquisition.html           ADS1299 board and thesis evaluation
    ventilator-controller.html     Research ventilator control PCB
    adau1701-som.html               Shared audio-processing core
    eurorack-dsp-module.html        Modular-synthesizer carrier
    effects-pedal.html             Instrument interface and pedal
    stm32-audio-codec.html         STM32H7 audio board, revision 0
    project-template.html          Copyable template, marked noindex
  templates/project-card.html      Copyable editing snippet
  assets/
    css/styles.css                 Shared layout and both themes
    js/theme.js                    Saved/system theme
    js/main.js                     Navigation, filters, project previews, toolbox, year
    js/project.js                  Galleries and optional 3D/video
    images/projects/               WebP images, thumbnails, posters
    images/linkedin-qr.png          Supplied LinkedIn QR code
    models/                        Six GLBs and original STEP/OBJ ZIP downloads
    videos/                        Optimized MP4 documentation
    documents/                     Five optional schematic PDFs
    icons/favicon.svg
```

Your original `Actual Projects/` files remain unchanged outside the publishable folder. The complete CV and thesis are not copied into the website. The assembled EMG photo was extracted from the thesis; only that image is included. Retired demonstration assets are saved in the parent workspace’s `tmp/retired-demo/`, outside the site.

## 2. Preview locally

Double-click **Preview portfolio.cmd** in the parent workspace to start a local preview and open the portfolio in your browser. Keep its terminal window open while browsing; close it or press Ctrl+C when finished. The launcher uses Python 3 and only serves `portfolio/` on your own computer. Each launch chooses a free localhost port, opens a fresh page URL, and disables browser caching, so old preview tabs and cached pages do not hide edits. After updating the preview helper, close its old terminal window and launch it again; use the newly opened browser tab. The terminal prints the exact folder being served.

Double-clicking `index.html` still works for a quick content preview, but browsers block the interactive models from `file://` pages. Use the launcher for the 3D viewers, or open a terminal inside `portfolio/` and run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/ and leave the terminal running. Stop it with Ctrl+C. On Windows, `py -m http.server 8000 --bind 127.0.0.1` is an alternative if the Python launcher is available. This is a local preview server, not a hosting requirement.

## 3. Edit existing content

Open an HTML file in a text editor and change the text between its tags. Case sections have `EDIT … HERE` comments. Keep claims consistent with the project’s actual development stage.

- Each complete page repeats the header and footer so navigation works without JavaScript. Update shared identity text across all pages if it changes.
- Change both visible email and `mailto:` values in the three main pages. LinkedIn is the supplied profile.
- The contact sections in Home, Projects, and About share a larger LinkedIn link and a clickable QR code on its right. The supplied PNG is `assets/images/linkedin-qr.png`; update both profile links and the QR image together if the profile changes.
- Edit title, description, and Open Graph text in each page’s `<head>`.
- Edit a project's title, year/state, technology tags, and section text together with its card on both overview pages. Project images synchronize automatically over HTTP/HTTPS; keep the static card images current too for offline and no-JavaScript previews.
- Edit skills in the `data-toolbox` sidebar in `about.html`. On each homepage load over HTTP/HTTPS, `main.js` reads its skill sections and updates the `data-toolbox-source="about.html"` grid, including headings, details, and numbering. Keep the homepage's static skill entries current too for direct-file previews, visits without JavaScript, and failed requests.
- If a section is removed, remove its matching contents link too.
- Keep the thesis evaluation labeled as offline research analysis. It does not demonstrate completed EMG-triggered closed-loop ventilation.

No contact form or repository integration is configured. Contact uses a real email link and LinkedIn profile.

## 4. Add a project from the template

1. Copy `projects/project-template.html` within `projects/` and rename it using lowercase words and hyphens.
2. Replace every bracketed value, metadata, example media, and section description. The template uses real board assets only to demonstrate markup; replace them for the new project.
3. Remove unused sections and their contents anchors.
4. Remove the copy’s `<meta name="robots" content="noindex">`. Keep it in the original template.
5. Copy `templates/project-card.html` into the collection in `projects.html`, and into `index.html` if featured.
6. Set the image’s real dimensions, alt text, category, year, and URL; update the visible counts.

The HTML is authoritative. Do not rerun the parent `tools/` one-time authoring scripts over manually edited pages.

## 5. Categories and relative links

Both the homepage and project collection offer **All work**, **Biomedical**, and **Audio DSP**. The filter words are `biomedical` and `audio`; `all` shows every card. Set a card’s `data-categories` to its application field, or both words separated by a space when relevant. Keep visible category labels consistent with the card and case study, and remove unused filter words. Technology tags describe the actual hardware and tools independently of these application filters.

Root pages use `assets/...` and `projects/...`. Case studies use `../assets/...` and `../index.html`. Preserve these relative paths for GitHub repository-subpath hosting. Match filename capitalization exactly.

## 6. Images and galleries

Put full-size WebP/JPEG/PNG images in `assets/images/projects/` and use smaller thumbnails on cards and in galleries. Processed full images are at most 1600 px and thumbnails at most 800 px; the supplied SoM main photo remains a 1920 x 1080 JPEG. Card thumbnails, the homepage hero, project covers, and gallery images display at their natural aspect ratio with `width: 100%` and `height: auto`. Their frames follow the image dimensions, without fixed-ratio letterboxing or added image padding, in both themes and at every screen size. Card hover changes the border color without zooming or cropping the image. Keep each image's HTML `width` and `height` attributes consistent with its real dimensions; do not add fixed heights or forced aspect ratios to these image frames.

On a hosted site or the local HTTP preview, `main.js` reads each linked project's `.project-cover img` once per overview page. Cards use the thumbnail inside a gallery link whose `href` matches the main image's `src`, or the main image itself when no matching gallery thumbnail exists. The homepage hero follows the linked project's full main image. Relative image URLs resolve against the project page, including when hosted in a repository subpath.

To change a preview, update the project's cover image, its alt text, and its `data-media-label` (for example `PCB PHOTO`, `CAD RENDER`, or `VIDEO STILL`). When using a gallery thumbnail, update the matching gallery link and thumbnail together. The overview image and media badge update on the next page load; a missing media label hides the badge. If a project page or replacement image cannot load, the existing static preview stays available. Automatic synchronization requires HTTP/HTTPS and JavaScript; direct file previews and visits without JavaScript use the images written in `index.html` and `projects.html`.

Gallery links point to the full image with `data-lightbox` and a `data-caption`. The enlarged image keeps its natural proportions and fits within the viewport; the dialog sizes to its content. Without JavaScript, links open the original image normally. Distinguish CAD renders, photos, layouts, and video stills in captions and alt text.

## 7. Interactive CAD

All six project pages contain interactive board models. The SoM, STM32 audio, EMG acquisition, and ventilator controller views are converted from the supplied STEP assemblies. The effects pedal and Eurorack views are prepared directly from the supplied OBJ geometry and companion MTL colors; no OBJ-to-STEP conversion is needed. Original STEP files and unchanged OBJ/MTL archives are available as ZIP downloads.

STEP-derived opaque faces are grouped by material to reduce rendering work while preserving the tessellated triangle geometry, normals, colors, and component transforms. The SoM viewer and STEP download were refreshed on 13 October 2026 from `Actual Projects/Single projects/ADAU1701 SoM/ADAU1701_SoM.step`, including its copper geometry. Some non-meshed annotations are omitted. Non-meshed CAD annotations and pin markers in the ventilator source are omitted from its web view. These are designed assembly views, not manufacturing or performance verification.

The EMG viewer and STEP download were refreshed on 13 October 2026 from the current `Actual Projects/Single projects/EMG Acquisition Board/ADS1299_Module_3D_MODEL.step`. The web model and compressed source download correspond to that same file; the original STEP remains unchanged.

The OBJ assemblies preserve every supplied triangle, are grouped by material, and have their source normals normalized for rendering. Their display coordinates are centered, uniformly scaled to a longest extent of one viewer unit, and rotated from Z-up to Y-up. OBJ does not declare physical units, so these views are for visual inspection, not measurement. The original OBJ and MTL downloads retain the source coordinates and colors.

To replace a model, update the `<model-viewer data-src="...">`, alt text, source-format note, and download links. Use GLB for the viewer; STEP and OBJ/MTL are source download formats. Prepare OBJ directly as GLB offline, keeping its MTL file alongside it. The optional Google model-viewer component is pinned to version 4.1.0 and fetched from jsDelivr, with unpkg as a fallback, only after the visitor selects **Load interactive board**. No model or viewer library is fetched on initial page load. Images and downloads remain available if the viewer cannot load.

The viewer requires HTTP/HTTPS; use the local preview launcher instead of directly opening an HTML file. The shared script explains this restriction for direct-file previews. It gives the renderer a sized viewport during loading, reports library/model timeouts, and offers **Retry interactive board** after a failed load. Retrying clears the failed model source and uses a fresh request URL to bypass the viewer's cached failure. The SoM and EMG model and download URLs also have content-version query strings; update these when replacing the files so browsers request the current assets.

The parent `tools/optimize_web_models.py` is an optional offline helper for these opaque CAD exports. It uses standard Python and writes to a separate output folder; inspect the output before replacing a model. It compares the indexed position/normal data and preserves materials and transforms. The original STEP files should remain unchanged. This helper is not required to browse or host the website.

The parent `tools/prepare_additional_models.py` records preparation of the four added models. Its `obj` mode uses standard Python for the supplied triangular, untextured OBJ/MTL archives; its `step` mode uses the existing temporary Open CASCADE authoring libraries in `tmp/cad-libs`. Both write to `tmp/additional-models/` for review. Neither helper nor authoring libraries belong in the deployed site. Routine website edits need no conversion or build command.

## 8. Local video

The real project clips are H.264 MP4, compressed to a maximum 1280-pixel dimension. Black pillarboxing was removed from the three CAD rotations. Original recording audio is retained as AAC; silent source CAD rotations stay silent. Full original videos remain in `Actual Projects/`.

When replacing a video, remove any black bars baked into the file and regenerate its poster. Keep the player aspect ratio consistent with the media: the SoM CAD rotation is 612 x 1080, with its `som-render-clip` frame styled at 17:30 in the shared stylesheet.

```html
<div class="media-frame">
  <video controls playsinline preload="none"
         poster="../assets/images/projects/your-poster.webp"
         aria-label="A descriptive video title">
    <source src="../assets/videos/your-video.mp4" type="video/mp4">
    <a href="../assets/videos/your-video.mp4">Download the video</a>
  </video>
</div>
```

Nothing autoplays. `preload="none"` keeps large video files out of the initial page download. Add meaningful captions and a transcript if you later publish clips containing speech. The responsive `project-video-grid` supports several clips without downloading them all on arrival.

## 9. Optional external video

The shared script also supports click-to-load YouTube and Vimeo. A button inside `.media-frame` needs `data-load-video`, `data-video-url`, and `data-video-title`. Accepted embed hosts are `www.youtube-nocookie.com` and `player.vimeo.com`. Use a real video ID and include a normal watch link as a fallback. No external video is configured in this site.

## 10. Schematics and downloads

The schematics sit in optional resource sections rather than interrupting the visual case studies. Update resource links when replacing PDFs or CAD files. The Eurorack folder’s schematic describes the shared SoM core, so the Eurorack page explicitly labels that download as the DSP core, not a carrier schematic.

## 11. Shared styling and themes

All colors and layout rules are in `assets/css/styles.css`. Theme variables appear at the top for light and dark modes. The default follows the operating system; the visitor’s override is saved locally. Keep global changes in this stylesheet. Stylesheet links in every complete HTML page include a `?v=` content-version query to refresh previously cached CSS. After changing the stylesheet, update that version consistently across all ten pages, including the project template; the file itself stays at the same relative path.

## 12. Browser enhancements

Core navigation, cards, descriptions, tables, videos, and downloads work without JavaScript. Themes, filters, automatic project previews, toolbox synchronization, image dialogs, and the interactive viewer are enhancements. The mobile navigation remains visible when scripts are unavailable.

## 13. Domain and sharing metadata

Once you choose the public address, add absolute canonical and `og:url` URLs to each complete page. Add an absolute `og:image` URL if you prepare a suitable social-sharing image. The template remains noindex. Internal relative links do not need to change when the domain changes.

## 14. Publish by dragging the folder to Netlify

1. Review the project descriptions, contact details, and public downloads before publishing.
2. Go to [Netlify Drop](https://app.netlify.com/drop) or your Netlify dashboard's manual deployment option.
3. Drag the **`portfolio` folder** onto the upload area. That folder must contain `index.html` immediately inside it.
4. Netlify provides a site address. Open it and check the pages, images, download, and contact links.
5. For changes, edit the local files and upload the updated folder to the **same project's** manual deploy area.

No build command is needed. If connecting a repository rather than dragging files, leave the build command empty and set the publish directory to `portfolio` when the repository contains this parent workspace, or `.` when it contains only the portfolio contents. No environment variables are needed.

Reference: [Netlify's official manual deployment instructions](https://docs.netlify.com/manage/projects/add-new-project/). Service plans and account options are controlled by Netlify; the website itself requires no paid infrastructure.

## 15. Publish with GitHub Pages

The simplest method uses a repository containing **the contents of `portfolio/` at its root**, not another nested `portfolio/` folder.

1. Create a repository for your website. A public repository is the simplest option for GitHub Free.
2. Upload `index.html`, `projects.html`, `about.html`, the entire `projects/` and `assets/` folders, and `.nojekyll` to the repository root. You may keep the README and templates there too.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose your branch, normally `main`, and the folder **`/(root)`**, then save.
6. Wait for GitHub to publish, then open the address displayed in Pages settings. A project site generally lives under your account's domain at a repository subpath.
7. Edit/upload new files to that same branch to update the site.

Keep `.nojekyll`, an intentionally empty file. It tells Pages to serve the static files without processing them as a Jekyll site. If your upload interface hides dotfiles, enable their display or create `.nojekyll` through GitHub's “Add file” interface.

GitHub Pages' branch publishing supports the repository root or a `docs/` folder. If retaining the **entire parent workspace repository**, copy the portfolio contents into `docs/` and select that folder instead. Simply selecting a nested `portfolio/` folder is not supported by that publishing option. A custom Actions workflow is possible, but unnecessary for the recommended root-folder setup.

Reference: [GitHub's official publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## 16. Upload only what belongs to the site

Upload the finished HTML, CSS, JavaScript, favicon, and referenced public media. Keep their folder structure and exact filename capitalization. `.nojekyll` should accompany GitHub Pages deployments. README and templates can stay in the source repository; they are optional for hosting, but the template is handy for future edits.

Do not upload the parent workspace's `.git/`, `tools/`, `tmp/`, screenshots, raw camera files, unoptimized videos, unused CAD archives, API keys, credentials, or private documents. Do not upload `portfolio.zip` into the website folder. That archive is just a convenient transport copy; extract it before drag-and-drop publishing. Its `index.html` is at the archive root.

## 17. Verification and practical limits

- The parent `tools/verify_site.py` checks HTML structure, local references, anchors, image alt text, and GLB containers using standard Python. It does not modify the site.
- Use focused browser checks after changing cards, filters, media, or layouts. Check both themes and mobile widths.
- Only `portfolio/` is publishable. Parent source documents, authoring tools, temporary CAD dependencies, and QA screenshots stay outside it.
- The larger local clips and models are loaded on demand. Full source STEP assemblies are compressed downloads, not initial-page assets.
- The site has no backend, database, analytics, credentials, default external fonts, or trackers. Google model-viewer is the only optional JavaScript dependency.
- No external deployment was performed. `portfolio.zip` is a transport copy: extract it before uploading. Its `index.html` is at the archive root.
- Browser QA covers Chromium. Safari and Firefox were not directly tested.

Keep a local backup. Future edits can be made directly in the HTML without a framework or build step.
