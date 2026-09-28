# CampusMarket

A campus marketplace where students buy and sell second-hand items to each other:
textbooks, electronics, dorm and living gear, transport and clothing.

- **Course:** CCS 2314 - Web Based Programming II
- **Stage:** Weeks 1-3, static catalog, client-side JavaScript, and form validation
- **Built by:** Morgan Maina

## What this build contains

Twelve hand-written HTML pages, one stylesheet and five small JavaScript files. No PHP,
no database, no framework and no build step, because the first half of the course is
about static content done properly before anything dynamic arrives.

| Page | Purpose |
| --- | --- |
| `index.html` | Home page: hero, how it works, category grid, featured listings |
| `products.html` | Full catalog with all eight listings, live search, filters and sorting |
| `product.html` | Product detail page for the Casio fx-991 listing, with a live line total |
| `cart.html` | Cart page with running totals, quantity changes and item removal |
| `register.html` | Registration form with client-side validation and interactive feedback |
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

```
campusmarket-Morgan-Maina/
├── index.html
├── products.html
├── product.html
├── cart.html
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
└── js/
    ├── filter.js
    ├── format.js
    ├── product-total.js
    ├── cart.js
    └── register.js
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

## Deliberate limitations

These are placeholders for later weeks, not oversights:

- Product visuals are styled CSS blocks. Real photos come with the product records in
  Week 7.
- The cart is three hard-coded rows in `cart.html`. It does not save, and adding an item
  from a product page only links to the cart. Accounts, sessions and persistence arrive
  with the database in Week 7.
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
| 3 | `addEventListener`, a validated registration form, and interactive UI, this build |
| 4-5 | Animation, media, Web 2.0, then the rest of the interaction layer |
| 6 | CAT 1, the individual build is assessed |
| 7-10 | PHP and MySQL: accounts, sessions, live product data, persistent cart |
| 11 | CAT 2, the merged team version is assessed |
| 12-14 | Checkout, order management, seller tools, documentation and defence |

In Week 7 this repository becomes the starting point for the team build, so the
structure and the product data here are deliberately kept easy to merge.
