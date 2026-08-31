(() => {
  const i18n = {
    en: {
      status_text: "NODE OPERATIONAL",
      node_desc: "Authoritative nameserver node in the ternis.net anycast / unicast DNS cluster.",
      cluster_title: "Authoritative Cluster",
      admin_title: "Management & Endpoints",
      role_staff: "Staff / Admin",
      admin_sub: "DNS Zone & Nameserver Administration",
      ternisdomains_sub: "Domain Registration & Zone Portal",
      status_sub: "Network & Service Health Dashboard",
      copied: "Copied",
      imprint: "Imprint",
      privacy: "Privacy",
      meta_title: "DNS Node | ternis.net"
    },
    de: {
      status_text: "KNOTEN ONLINE",
      node_desc: "Autoritativer Nameserver-Knoten im ternis.net Anycast / Unicast DNS-Cluster.",
      cluster_title: "Autoritatives Cluster",
      admin_title: "Verwaltung & Endpunkte",
      role_staff: "Mitarbeiter / Admin",
      admin_sub: "DNS-Zonen & Nameserver-Administration",
      ternisdomains_sub: "Domain-Registrierung & Zonenportal",
      status_sub: "Netzwerk- & Service-Status-Dashboard",
      copied: "Kopiert",
      imprint: "Impressum",
      privacy: "Datenschutz",
      meta_title: "DNS-Knoten | ternis.net"
    }
  };

  // 1. Resolve domain name & dynamic dig command
  const domainEl = document.getElementById("domainName");
  const statusLink = document.getElementById("statusLink");
  const digCode = document.getElementById("digCommand");
  const copyDigBtn = document.getElementById("copyDigBtn");

  let hostname = window.location.hostname;
  if (!hostname || hostname === "localhost" || hostname === "127.0.0.1" || hostname === "") {
    hostname = "one.ns.ternis.net";
  }

  if (domainEl) {
    domainEl.textContent = hostname;
  }
  if (statusLink) {
    statusLink.href = `https://tstatus.de?from=${encodeURIComponent(hostname)}`;
  }

  const digStr = `dig @${hostname} ternis.net SOA +short`;
  if (digCode) {
    digCode.textContent = digStr;
  }
  if (copyDigBtn) {
    copyDigBtn.dataset.copy = digStr;
  }

  // Highlight active node in cluster list
  const currentItems = document.querySelectorAll(".ns-item");
  currentItems.forEach((item) => {
    const itemHost = item.dataset.host;
    if (itemHost && itemHost.toLowerCase() === hostname.toLowerCase()) {
      item.classList.add("current-node");
    }
  });

  // 2. Set current year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Internationalization (Language Switcher)
  const langButtons = document.querySelectorAll(".lang-btn");
  const privacyLink = document.getElementById("privacyLink");
  const imprintLink = document.getElementById("imprintLink");

  function getPreferredLanguage() {
    const saved = localStorage.getItem("preferred_lang");
    if (saved && (saved === "de" || saved === "en")) {
      return saved;
    }
    const browserLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    return browserLang.startsWith("de") ? "de" : "en";
  }

  function setLanguage(lang) {
    if (!i18n[lang]) return;
    document.documentElement.lang = lang;
    localStorage.setItem("preferred_lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (i18n[lang][key]) {
        el.textContent = i18n[lang][key];
      }
    });

    if (i18n[lang].meta_title) {
      document.title = `${hostname} | ${i18n[lang].meta_title}`;
    }

    if (privacyLink) {
      privacyLink.href = `https://ternis.dev/${lang}/legal/privacy`;
    }
    if (imprintLink) {
      imprintLink.href = `https://ternis.dev/${lang}/legal/imprint`;
    }

    langButtons.forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // 4. Dark / Light Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  function getPreferredTheme() {
    const saved = localStorage.getItem("preferred_theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("preferred_theme", theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
    });
  }

  // 5. Copy to Clipboard functionality
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const textToCopy = btn.dataset.copy;
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        btn.classList.add("copied");
        setTimeout(() => {
          btn.classList.remove("copied");
        }, 1800);
      } catch (err) {
        const tempInput = document.createElement("input");
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        btn.classList.add("copied");
        setTimeout(() => {
          btn.classList.remove("copied");
        }, 1800);
      }
    });
  });

  // Initialize language and theme
  setTheme(getPreferredTheme());
  setLanguage(getPreferredLanguage());
})();
