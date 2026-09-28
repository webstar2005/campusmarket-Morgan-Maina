# CampusMarket

A campus marketplace where students buy and sell second-hand items to each other:
textbooks, electronics, dorm and living gear, transport and clothing.

- **Course:** CCS 2314 - Web Based Programming II
- **Stage:** Weeks 1-4, static catalog, client-side JavaScript, form validation, animation and media
- **Built by:** Morgan Maina

## What this build contains

Thirteen hand-written HTML pages, one stylesheet, seven small JavaScript files, eight SVG
images and one sound file. No PHP,
no database, no framework and no build step, because the first half of the course is
about static content done properly before anything dynamic arrives.

| Page | Purpose |
| --- | --- |
| `index.html` | Home page: hero, how it works, category grid, featured listings |
| `products.html` | Full catalog with all eight listings, live search, filters and sorting |
| `product.html` | Product detail page for the Casio fx-991 listing, with a live line total |
| `cart.html` | Cart page with running totals, quantity changes and item removal |
| egister.html | Registration form with client-side validation and interactive feedback |
| `gallery.html` | Week 4: picture gallery, motion notes, and the media rules |
| `category-electronics.html` | Electronics category listing |
| `category-textbooks.html` | Textbooks category listing |
| `category-dorm-living.html` | Dorm and living category listing |
| `category-transport.html` | Transport category listing |
| `category-clothing.html` | Clothing category listing |
| `about.html` | What the project is and how it grows each week |
| `contact.html` | Contact form mock and working channels |

| Script | Purpose |
| --- | --- |
| `js/filter.js` | Search, category and condition filtering, and sorting on `products.html` |
| `js/format.js` | `formatMoney()`, shared by the product and cart pages |
| `js/product-total.js` | Recalculates the quantity times price line total on `product.html` |
| `js/cart.js` | Running cart total, count and empty state on `cart.html` |
| `js/register.js` | Validation, error summary, strength meter and toggles on `register.html` |
| `js/gallery.js` | Slideshow: shows one of eight slides, dots, counter and caption |
| `js/watchlist.js` | Toggles the saved state on `product.html` and reveals the badge |

```
campusmarket-Morgan-Maina/
├── index.html
├── products.html
├── product.html
├── cart.html
├── gallery.html
├── register.html
├── category-electronics.html
├── category-textbooks.html
├── category-dorm-living.html
├── category-transport.html
├── category-clothing.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── img/
│   ├── calculator.svg     one generated placeholder illustration per listing
│   ├── keyboard.svg
│   ├── algorithms.svg
│   ├── calculus.svg
│   ├── fridge.svg
│   ├── lamp.svg
│   ├── bike.svg
│   └── hoodie.svg
├── media/
│   └── notify.wav         1.5s confirmation tone, 24KB, 8kHz mono PCM
└── js/
    ├── filter.js
    ├── format.js
    ├── product-total.js
    ├── cart.js
    ├── register.js
    ├── gallery.js
    └── watchlist.js
```

## Running it

Open the folder in VS Code and use the **Live Server** extension, or serve the folder
with anything static.

```bash
# optional, if you prefer a local server
php -S localhost:8000
```

Filtering and the cart also work by opening the files straight off the disk, because
the scripts are plain files in `js/`. Use the Live Server if you want to test the
`?q=` search links, since those need a URL to read from.

## The catalog

The same eight listings are used across every page, so the data is easy to keep
consistent and carries over into the database in Week 7. Each card on `products.html`
carries `data-id`, `data-name`, `data-price`, `data-category`, `data-condition` and
`data-order`, so the listing data the filters read is already separated from the layout.

| ID | Listing | Category | Price | Condition | Seller |
| --- | --- | --- | --- | --- | --- |
| CM-0001 | Calculus: Early Transcendentals (8th Ed.) | Textbooks | KSh 1,800 | Used - good | Amina W. |
| CM-0002 | Scientific Calculator (Casio fx-991) | Electronics | KSh 1,200 | Like new | Brian K. |
| CM-0003 | Mini Dorm Fridge (45L) | Dorm and living | KSh 6,500 | Used - fair | Chiara M. |
| CM-0004 | Mountain Bike - Size M | Transport | KSh 9,500 | Used - good | Denis O. |
| CM-0005 | LED Desk Lamp with USB Port | Dorm and living | KSh 900 | New | Eva N. |
| CM-0006 | Introduction to Algorithms (CLRS) | Textbooks | KSh 2,200 | Used - good | Faraj H. |
| CM-0007 | Wireless Keyboard and Mouse Combo | Electronics | KSh 2,500 | Like new | Grace A. |
| CM-0008 | Campus Hoodie - Navy (Size L) | Clothing | KSh 1,500 | New | Ian M. |

## How it is built

- **Semantic HTML** - one `header`, one `nav`, one `main` and one `footer` per page,
  headings in order, `article` per listing, `dl` for label and value pairs.
- **One stylesheet** - `css/style.css` holds colour, type scale, spacing, radius and
  shadow as custom properties in `:root`, so a change there restyles every page.
  Components are named by block, for example `.product-card__title`.
- **Plain client-side JavaScript** - each script finds elements with
  `getElementById` or `querySelector`, then rewrites them with `textContent`,
  `style.display` or a `data-` attribute.
- **`addEventListener` only** - there is not one inline `onclick`, `onchange` or
  `oninput` attribute left in the project. Week 2 used them because that is what the
  course had introduced; Week 3 replaced them, because a handler in the markup can only
  ever hold one function and mixes behaviour into the HTML.
- **Progressive enhancement** - the filter form is a real `GET` form whose submit
  handler calls `event.preventDefault()`. With JavaScript switched off it still submits
  and reloads with the chosen values in the query string, and `js/filter.js` reads them
  back out of `window.location.search` on load.
- **Validation in two layers, honestly** - `register.html` carries `required`,
  `minlength`, `pattern` and `type="email"` in the markup, but also `novalidate`, so the
  messages come from `js/register.js` and look identical in every browser instead of
  native bubbles that cannot be styled. These checks are for experience only. PHP has
  to repeat every one of them in Week 7.
- **Responsive** - grids collapse with `auto-fit` and `minmax`, with a small number of
  breakpoints in the component that needs them.
- **Accessible** - skip link, visible focus rings, `aria-current` on the active nav
  item and breadcrumb, labelled form controls, `aria-invalid` plus `aria-describedby`
  on fields that fail, a `role="alert"` summary that takes focus on submit, and colour
  choices that stay above contrast requirements on both light and dark panels.
- **No dependencies** - nothing to install, so the focus stays on the course material.

## Form validation, Week 3

`register.html` and `js/register.js` demonstrate the three kinds of check the brief asks
for, plus the interaction patterns:

| Kind | Rule | Where |
| --- | --- | --- |
| Required | Every field, and at least one role | `checkName`, `checkEmail`, `checkPhone`, `checkPassword`, `checkConfirm`, `checkRole`, `checkTerms` |
| Format | Email shape, and a Kenyan mobile number starting 07 or 01 | `EMAIL_PATTERN`, `PHONE_PATTERN` |
| Custom | Passwords must match | `checkConfirm` |
| Custom | Password needs 8 characters, a letter and a number | `checkPassword` |
| Custom | Full name needs two words | `checkName` |
| Custom | Pickup-only terms must be accepted | `checkTerms` |

Interaction patterns, all driven by `addEventListener`:

- **Show and hide** - `togglePasswordVisibility` flips the password field between
  `password` and `text` and keeps `aria-pressed` in step; `toggleDetails` does the same
  for the "What happens to my data?" panel with `aria-expanded`.
- **Update instantly** - a live character counter on the name field, and a five-step
  password strength meter driven by a `data-score` attribute on the bar.
- **Validate on blur, correct on input** - `blur` checks the field you just left;
  `input` re-checks it only if it is already showing a message, so the page never
  complains while you are still typing the first letter.
- **One summary, not seven popups** - submit collects every problem, lists them at the
  top as links to the offending field, and moves focus to the list.

## Motion and media, Week 4

### Transitions and animations, used for different jobs

A transition has exactly two states, needs a trigger, and runs once. An animation can have
as many stops as you like, needs no trigger, and can repeat forever.

| What | Type | Why it is there |
| --- | --- | --- |
| Product cards lift 6px on `:hover` and `:focus-within` | `transition` on `transform` and `box-shadow` | Confirms the card is the target of the click before you commit to it |
| Buttons lift 2px, and press down 1px on `:active` | `transition` on `transform` | The press is felt, so a tap feels connected to the action |
| The active gallery dot widens from 10px to 30px | `transition` on `width` | Shows position in a set of eight without needing a number |
| The green dot in the results bar | `@keyframes pulse-live`, infinite | Means "results update as you type". A looping animation is right here because the fact is permanent |
| Slide fade-in, caption slide-up | `@keyframes`, run once per change | Signals that the content actually changed, which matters most for screen reader users |
| The "Saved to watchlist" badge | `@keyframes pop-in`, run once | The brief's third case: CSS cannot react to an action, so `js/watchlist.js` toggles a class and CSS does the rest |

Two deliberate decisions:

- **Hover effects are inside `@media (hover: hover) and (pointer: fine)`.** Without that
  guard, a card on a touch screen stays lifted after a tap, because the browser keeps the
  `:hover` state until you tap somewhere else.
- **Everything stops under `prefers-reduced-motion: reduce`.** The Week 3 block only
  neutralised `transition-duration`, which was enough then. Week 4 adds
  `animation-duration` and `animation-iteration-count`, so the pulse and the pop stop too.
  No motion on this site carries information the text does not also carry.

### The gallery

`gallery.html` and `js/gallery.js` are the brief's example, built with the same
select-and-manipulate pattern as the filter:

1. `querySelectorAll("[data-gallery-slide]")` grabs all eight at once.
2. `classList.toggle("is-active", ...)` puts the class on one slide and takes it off the
   rest. The brief's version sets `style.display` inline; a class is used here instead so
   the appearance stays in the stylesheet, where the rest of the design lives.
3. The counter is taken modulo the slide count, so Previous on the first picture wraps to
   the last one.
4. Next, Previous and all eight dots call the same `showSlide`, which also updates the
   counter, the caption, `aria-hidden` on each slide and `aria-current` on each dot.
5. Left and right arrow keys work anywhere inside the gallery.

With scripting off, the first picture still shows and the caption still reads correctly,
because `is-active` is in the markup rather than added by the script.

### Media, and the one rule that matters

```css
img,
svg,
video {
  max-width: 100%;
  height: auto;
}
```

Without it, one full-resolution phone photo is wider than a phone screen and pushes the
whole page sideways. This is the most common way a marketplace page breaks on a small
screen. `audio` gets `max-width: 100%` too, plus an explicit `width: 100%`, because a
media player with no width falls back to its own intrinsic size.

- **Alt text on all nine images.** Not decoration: it is what a screen reader announces
  and what shows if a file fails to load. Every `role="img"` placeholder block also has
  an `aria-label`, so nothing on the site is an unlabelled graphic.
- **`width` and `height` on every image.** The browser reserves the right box before the
  file arrives, so the caption does not jump as pictures load.
- **The audio element** on `product.html` uses `controls` for play, pause and volume, and
  `preload="none"` so the 24 KB file is only fetched when someone presses play.
  Autoplay is deliberately not used: browsers block it, and surprise noise is unpleasant.
- **`format.js` and the video tag.** The brief's video markup is documented on
  `gallery.html` in the rules section, but no `<video>` element ships, because there is
  no video file to point at and a player pointing at a missing file is worse than none.
  MP4 cannot be hand-written, and shipping broken markup to look complete would be
  dishonest. Week 7 brings real assets.

### Why the images are SVG, and what replaces them

There are no real photographs, so the eight gallery images are vector placeholders I
generated: simple shapes on a category-tinted background, all eight together 10 KB. SVG
was chosen because it stays sharp at any size and is small enough that the file-size
lesson is demonstrated rather than described. Real seller photos arrive in Week 7 and
will be `.webp` with a `.jpg` fallback, resized to the box they display in.

The listing cards on `products.html` and the category pages deliberately still use the
lightweight coloured `.media` blocks, so browsing the catalog still costs zero image
downloads. Only the gallery and the product detail page load real files.

## Deliberate limitations

These are placeholders for later weeks, not oversights:

- Product visuals are generated SVG placeholders or styled CSS blocks. Real photos come
  with the product records in Week 7, as `.webp` with a `.jpg` fallback.
- No `<video>` element ships, because no video file exists yet. The rules it would need
  are documented on `gallery.html` rather than shipping a player pointing at nothing.
- The "Save to watchlist" button on `product.html` changes a class and nothing else.
  There is no storage, so reloading clears it. The cart is still three hard-coded rows in
  `cart.html` and does not save either. Accounts, sessions and persistence arrive with
  the database in Week 7.
- The gallery does not auto-advance. A timer was left out on purpose: motion that changes
  content on its own is disorienting, fights reduced-motion preferences, and cannot be
  paused by a keyboard user. Next, Previous and the dots are control enough.
- No Web 2.0 feature is faked. Star ratings appear once on `gallery.html`, marked
  `aria-hidden`, purely to show what one would need. Real reviews need a `reviews` table
  and a one-rating-per-user rule in Week 9.
- Quantities are capped at 9 on both the product and cart pages, because this week is
  about the arithmetic, not the stock rules.
- The registration form validates but creates nothing. There is no `users` table and no
  password hashing, both of which are Week 7 work.
- Listings still live in the HTML, not in a table, so the catalog cannot be edited from
  the site. That is the Week 7 change.
- The contact form does not send. It needs a server, which arrives with the PHP weeks.

## Roadmap

| Weeks | What is added |
| --- | --- |
| 1 | Static catalog in HTML and CSS |
| 2 | Live search, filtering, sorting, cart maths and a cart page |
| 3 | `addEventListener`, a validated registration form, and interactive UI |
| 4 | Transitions, `@keyframes`, a picture gallery, and embedded media, this build |
| 5 | AJAX and JSON, then the foundation gate before CAT 1 |
| 6 | CAT 1, the individual build is assessed |
| 7-10 | PHP and MySQL: accounts, sessions, live product data, persistent cart |
| 11 | CAT 2, the merged team version is assessed |
| 12-14 | Checkout, order management, seller tools, documentation and defence |

In Week 7 this repository becomes the starting point for the team build, so the
structure and the product data here are deliberately kept easy to merge.
