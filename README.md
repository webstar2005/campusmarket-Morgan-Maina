# CampusMarket

A campus marketplace where students buy and sell second-hand items to each other:
textbooks, electronics, dorm and living gear, transport and clothing.

- **Course:** CCS 2314 - Web Based Programming II
- **Stage:** Weeks 1-4, the static catalog
- **Built by:** Morgan Maina

## What this build contains

Ten hand-written HTML pages and one stylesheet. No JavaScript, no PHP, no database,
no framework and no build step, because the first four weeks of the course are about
static content done properly.

| Page | Purpose |
| --- | --- |
| `index.html` | Home page: hero, how it works, category grid, featured listings |
| `products.html` | Full catalog with all eight listings, filter form and pagination |
| `product.html` | Product detail page for the Casio fx-991 listing |
| `category-electronics.html` | Electronics category listing |
| `category-textbooks.html` | Textbooks category listing |
| `category-dorm-living.html` | Dorm and living category listing |
| `category-transport.html` | Transport category listing |
| `category-clothing.html` | Clothing category listing |
| `about.html` | What the project is and how it grows each week |
| `contact.html` | Contact form mock and working channels |

```
campusmarket-Morgan-Maina/
├── index.html
├── products.html
├── product.html
├── category-electronics.html
├── category-textbooks.html
├── category-dorm-living.html
├── category-transport.html
├── category-clothing.html
├── about.html
├── contact.html
└── css/
    └── style.css
```

## Running it

Open the folder in VS Code and use the **Live Server** extension, or serve the folder
with anything static. Opening `index.html` straight off the disk also works, because
nothing here needs a server.

```bash
# optional, if you prefer a local server
php -S localhost:8000
```

## The catalog

The same eight listings are used across every page, so the data is easy to keep
consistent and carries over into the database in Week 7.

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
- **Responsive** - grids collapse with `auto-fit` and `minmax`, with a small number of
  breakpoints in the component that needs them.
- **Accessible** - skip link, visible focus rings, `aria-current` on the active nav
  item and breadcrumb, labelled form controls, real `button` and `a` elements, and
  colour choices that stay above contrast requirements on both light and dark panels.
- **No dependencies** - nothing to install, so the focus stays on the course material.

## Deliberate limitations

These are placeholders for later weeks, not oversights:

- Product visuals are styled CSS blocks. Real photos come with the product records in
  Week 7.
- The filter and sort controls are real form elements but do not filter yet. That
  arrives with the JavaScript weeks.
- "Add to cart" is present and disabled. The cart appears from Week 2, and gains
  accounts, sessions and persistence in Week 7.
- The contact form does not send. It needs a server, which arrives with the PHP weeks.

## Roadmap

| Weeks | What is added |
| --- | --- |
| 1-4 | Static catalog in HTML and CSS, this build |
| 2-5 | Live search, filtering, sorting and cart maths in the browser |
| 6 | CAT 1, the individual build is assessed |
| 7-10 | PHP and MySQL: accounts, sessions, live product data, persistent cart |
| 11 | CAT 2, the merged team version is assessed |
| 12-14 | Checkout, order management, seller tools, documentation and defence |

In Week 7 this repository becomes the starting point for the team build, so the
structure and the product data here are deliberately kept easy to merge.
