# default.thosted.de

Default placeholder / parked domain landing page for domains hosted on the **thosted.de** infrastructure (`ternis.net` / `ternis-edv.de` / `ternis.dev`).

## Features

- **Lightweight & Fast**: Standalone static HTML5, CSS3, and vanilla ES6 JavaScript with zero runtime external dependencies.
- **Dynamic Hostname**: Automatically extracts and displays `window.location.hostname` with fallback for local testing.
- **Bilingual (DE / EN)**: Auto-detects browser locale (`de` vs `en`) with manual language switcher and persistent preference.
- **Dark & Light Mode**: Seamless dark/light theme switching with automatic system preference detection (`prefers-color-scheme`).
- **Nameserver & DNS Info**: Highlights primary nameservers (`one.ns.ternis.net`, `two.ns.ternis.net`) with one-click copy to clipboard.
- **Domain Management Links**: Direct access to management portals (`ternisdomains.de`, `dnbx.de`).
- **Hosting & Infrastructure Links**: Direct links to `thosted.de`, `ternis.net`, `ternis-edv.de`, `ternis.dev`.
- **Dynamic Legal / Imprint & Privacy Policy**: Automatically routes to `https://ternis.dev/{de|en}/legal/imprint` and `https://ternis.dev/{de|en}/legal/privacy` based on the selected language.

## Project Structure

```
├── .gitignore
├── README.md
├── index.html       # Landing page structure & semantic markup
├── style.css        # Responsive CSS with CSS custom properties (variables)
└── app.js           # Domain resolver, i18n, theme switcher & clipboard copy
```

## Deployment

Simply point your web server (Nginx, Apache, Caddy, or static bucket) default vhost / fallback root to this directory.
