# default.thosted.de

Default placeholder / parked domain landing page for domains hosted on the **thosted.de** infrastructure (`ternis.net` / `ternis-edv.de` / `ternis.dev`).

## Features

- **Lightweight & Fast**: Standalone static HTML5, CSS3, and vanilla ES6 JavaScript with zero runtime external dependencies.
- **Status Indicator & Health Link**: Interactive status badge linking directly to `https://tstatus.de?from=<domain>` for live infrastructure health.
- **Bilingual (DE / EN)**: Segmented control with globe icon, auto-detecting browser locale with manual persistence.
- **Dark & Light Mode**: Seamless dark/light theme switching with automatic system preference detection (`prefers-color-scheme`).
- **Nameserver & DNS Info**: Highlights primary nameservers (`one.ns.ternis.net`, `two.ns.ternis.net`, `three.ns.ternis.net`) with one-click copy to clipboard.
- **Dedicated Nameserver Node Site**: Standalone landing page in `/nameserver/` for nameserver domains (`one.ns.ternis.net`, `two.ns.ternis.net`, `three.ns.ternis.net`, etc.) with authoritative DNS node info and admin routing.
- **Nameserver Management for Administrators**: Direct access to `https://ns-admin.ternis.net` for ternis.net employees and administrators.
- **Domain Management Links**: Direct access to management portals (`ternisdomains.de`, `dnbx.de`).
- **Hosting & Infrastructure Links**: Direct links to `thosted.de`, `ternis.net`, `ternis-edv.de`, `ternis.dev`, and `ternis.org`.
- **Dynamic Legal / Imprint & Privacy Policy**: Automatically routes to `https://ternis.dev/{de|en}/legal/imprint` and `https://ternis.dev/{de|en}/legal/privacy` based on the selected language.

## Project Structure

```
├── .gitignore
├── README.md
├── index.html           # Default parked/placeholder domain landing page
├── style.css            # Responsive CSS with CSS custom properties
├── app.js               # Domain resolver, i18n, theme switcher & auto-routing
└── nameserver/          # Dedicated Nameserver Node landing site
    ├── index.html       # Nameserver node landing page markup
    ├── style.css        # Stylesheet with admin portal badge styling
    └── app.js           # DNS node resolver, node highlighter, i18n & theme toggle
```

## Deployment

### 1. Default Parked Vhost / Catch-all Root
Point your default web server vhost (Nginx, Apache, Caddy, or static bucket) to the repository root directory. Nameserver domains will automatically route to `/nameserver/` if accessed via the shared root.

### 2. Dedicated Nameserver Vhost
For nameserver subdomains (`*.ns.ternis.net` / `one.ns.ternis.net`, `two.ns.ternis.net`, `three.ns.ternis.net`), you can point the document root directly to the `nameserver/` subfolder:
```nginx
server {
    server_name one.ns.ternis.net two.ns.ternis.net three.ns.ternis.net;
    root /var/www/default.thosted.de/nameserver;
    index index.html;
}
```

