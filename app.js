(() => {
  // Translations dictionary
  const i18n = {
    de: {
      status_active: "Domain aktiv geschaltet",
      hero_description: "Diese Domain wurde erfolgreich registriert und ist auf der <strong>thosted.de</strong>(ternis-edv) Infrastruktur eingerichtet. Hier entsteht in Kürze eine neue Webpräsenz.",
      why_title: "Warum sehe ich diese Seite?",
      why_subtitle: "Mögliche Gründe für die Anzeige dieser Seite:",
      why_reason_1: "Diese Domain wurde über <strong>ternisdomains.de</strong>, verbundene Dienste oder einen Partner von ternis-edv registriert.",
      why_reason_2: "Diese Domain gehört ternis-edv und ist derzeit <span class=\"status-tag\">im Aufbau</span> / <span class=\"status-tag\">geparkt</span> / <span class=\"status-tag\">in Überarbeitung</span> / <span class=\"status-tag\">nicht aktiv genutzt</span>.",
      why_reason_3: "Die DNS-Zone dieser Domain wurde auf den Nameservern von ternis-edv eingerichtet und die Standard-DNS-Einträge wurden noch nicht vollständig geändert.",
      why_reason_4: "Diese Seite wird auf <strong>thosted.de</strong> oder anderer Infrastruktur von ternis-edv gehostet und es wurden noch keine Inhalte bereitgestellt.",
      dns_title: "DNS & Nameserver",
      dns_desc: "Zuständige primäre Nameserver für dieses System:",
      copied_text: "Kopiert!",
      mgmt_title: "Domain-Verwaltung",
      mgmt_desc: "Verwaltung und DNS-Konfiguration über die Domain-Portale:",
      infra_title: "Hosting & Infrastruktur",
      infra_desc: "Bereitgestellt durch die Ternis Hosting & Cloud Services:",
      privacy_policy: "Datenschutz",
      legal_imprint: "Impressum",
      meta_title: "Domain geparkt | thosted.de"
    },
    en: {
      status_active: "Domain active",
      hero_description: "This domain has been successfully registered and configured on the <strong>thosted.de</strong>(ternis-edv) infrastructure. A new website is coming soon.",
      why_title: "Why do I see this site?",
      why_subtitle: "There are several reasons why you might see this site:",
      why_reason_1: "This domain was registered via <strong>ternisdomains.de</strong>, an affiliate, or a partner of ternis-edv.",
      why_reason_2: "This domain is owned by ternis-edv and is currently <span class=\"status-tag\">under construction</span> / <span class=\"status-tag\">parked</span> / <span class=\"status-tag\">under rework</span> / <span class=\"status-tag\">not in active use</span>.",
      why_reason_3: "This domain's zone was added to ternis-edv nameservers and the default DNS records have not been fully updated.",
      why_reason_4: "This site is hosted on <strong>thosted.de</strong> or other ternis-edv infrastructure and no content has been uploaded yet.",
      dns_title: "DNS & Nameservers",
      dns_desc: "Primary authoritative nameservers for this system:",
      copied_text: "Copied!",
      mgmt_title: "Domain Management",
      mgmt_desc: "Manage domain and DNS configuration via our portals:",
      infra_title: "Hosting & Infrastructure",
      infra_desc: "Powered by Ternis Hosting & Cloud Services:",
      privacy_policy: "Privacy Policy",
      legal_imprint: "Imprint",
      meta_title: "Domain Parked | thosted.de"
    }
  };

  // Check if current hostname is a nameserver domain and route to nameserver page if on default root
  const isNameserverHost = /^(?:(?:one|two|three|ns\d*)\.ns\.ternis\.net|ns\.ternis\.net)$/i.test(window.location.hostname);
  if (isNameserverHost && !window.location.pathname.startsWith("/nameserver")) {
    window.location.replace("/nameserver/" + window.location.search + window.location.hash);
    return;
  }

  // 1. Resolve domain name & status link
  const domainEl = document.getElementById("domainName");
  const statusLink = document.getElementById("statusLink");
  let hostname = window.location.hostname;
  if (!hostname || hostname === "localhost" || hostname === "127.0.0.1" || hostname === "") {
    // hostname = "ihre-domain.de";
    hostname = "default.thosted.de";
  }
  if (domainEl) {
    domainEl.textContent = hostname;
  }
  if (statusLink) {
    statusLink.href = `https://tstatus.de?from=${encodeURIComponent(hostname)}`;
  }

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
    const browserLang = (navigator.language || navigator.userLanguage || "de").toLowerCase();
    return browserLang.startsWith("de") ? "de" : "en";
  }

  function setLanguage(lang) {
    if (!i18n[lang]) return;
    document.documentElement.lang = lang;
    localStorage.setItem("preferred_lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (i18n[lang][key]) {
        el.innerHTML = i18n[lang][key];
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
        // Fallback for older browsers or insecure contexts
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
