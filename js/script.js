// JoTechToTech - Interactive behavior
(function () {
  const WA = "https://wa.me/2348114556256";

  // ---------- Header scroll ----------
  const header = document.getElementById("site-header");
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
      header.classList.remove("py-5", "border-white/5");
    } else {
      header.classList.remove("scrolled");
      header.classList.add("py-5", "border-white/5");
    }
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  // ---------- Mobile menu ----------
  const mt = document.getElementById("mobileToggle");
  const mm = document.getElementById("mobileMenu");
  if (mt && mm) mt.addEventListener("click", () => mm.classList.toggle("hidden"));

  // ---------- Quick contact widget ----------
  const qcToggle = document.getElementById("qcToggle");
  const qcClose = document.getElementById("qcClose");
  const qcDrawer = document.getElementById("qcDrawer");
  const scrollTop = document.getElementById("scrollTop");
  if (qcToggle && qcDrawer) qcToggle.addEventListener("click", () => qcDrawer.classList.toggle("hidden"));
  if (qcClose && qcDrawer) qcClose.addEventListener("click", () => qcDrawer.classList.add("hidden"));
  if (scrollTop) scrollTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // ---------- Hero preview: desktop/mobile switch ----------
  document.querySelectorAll(".hero-view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".hero-view-btn").forEach((b) => {
        b.classList.remove("bg-indigo-600", "text-white");
        b.classList.add("text-zinc-500", "hover:text-white");
      });
      btn.classList.add("bg-indigo-600", "text-white");
      btn.classList.remove("text-zinc-500", "hover:text-white");
      const preview = document.getElementById("heroPreview");
      if (!preview) return;
      if (btn.dataset.view === "mobile") {
        preview.classList.add("max-w-[280px]", "mx-auto");
        preview.classList.remove("w-full");
      } else {
        preview.classList.remove("max-w-[280px]", "mx-auto");
        preview.classList.add("w-full");
      }
    });
  });

  // ---------- Services: filter tabs ----------
  document.querySelectorAll(".svc-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".svc-tab").forEach((t) => {
        t.classList.remove("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-500/20");
        t.classList.add("text-zinc-400", "hover:text-white");
      });
      tab.classList.add("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-500/20");
      tab.classList.remove("text-zinc-400", "hover:text-white");
      const cat = tab.dataset.cat;
      document.querySelectorAll(".service-card").forEach((c) => {
        c.style.display = cat === "all" || c.dataset.category === cat ? "" : "none";
      });
    });
  });

  // ---------- Services modal ----------
  const servicesData = (() => {
    const el = document.getElementById("services-data");
    return el ? JSON.parse(el.textContent) : [];
  })();
  const serviceModal = document.getElementById("serviceModal");
  const serviceModalContent = document.getElementById("serviceModalContent");

  document.querySelectorAll(".view-scope-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const s = servicesData.find((x) => x.id === btn.dataset.serviceId);
      if (!s || !serviceModal || !serviceModalContent) return;
      serviceModalContent.innerHTML = `
        <button class="closeSvcModal absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/10">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
        <div class="flex items-center gap-3">
          <div class="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <i data-lucide="${s.iconName}" class="w-6 h-6"></i>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white tracking-tight">${s.title}</h3>
            <span class="text-xs text-indigo-400 font-mono font-semibold uppercase">Scope & Deliverables</span>
          </div>
        </div>
        <p class="text-sm text-zinc-300 leading-relaxed">${s.fullDesc}</p>
        <div class="grid sm:grid-cols-2 gap-4 pt-2">
          <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <h4 class="text-xs font-bold text-indigo-300 uppercase tracking-wide">Key Features</h4>
            <ul class="space-y-1.5">${s.features.map(f => `<li class="text-xs text-zinc-300 flex items-center gap-2"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-indigo-400"></i><span>${f}</span></li>`).join("")}</ul>
          </div>
          <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <h4 class="text-xs font-bold text-emerald-400 uppercase tracking-wide">Package Deliverables</h4>
            <ul class="space-y-1.5">${s.deliverables.map(d => `<li class="text-xs text-zinc-300 flex items-center gap-2"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400"></i><span>${d}</span></li>`).join("")}</ul>
          </div>
        </div>
        <div class="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <a href="contact.html?service=${encodeURIComponent(s.title)}" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2">
            Request Quote for ${s.title} <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
          <a href="${WA}?text=Hello%20JoTechToTech,%20I%20want%20to%20inquire%20about%20your%20${encodeURIComponent(s.title)}%20service." target="_blank" rel="noopener" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-sm hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2">
            <i data-lucide="message-square" class="w-4 h-4"></i> Direct WhatsApp Chat
          </a>
        </div>`;
      serviceModal.classList.remove("hidden");
      lucide.createIcons();
      serviceModalContent.querySelector(".closeSvcModal").addEventListener("click", () => serviceModal.classList.add("hidden"));
    });
  });
  if (serviceModal) serviceModal.addEventListener("click", (e) => { if (e.target === serviceModal) serviceModal.classList.add("hidden"); });

  // ---------- Portfolio filter ----------
  document.querySelectorAll(".pf-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pf-filter").forEach((b) => {
        b.classList.remove("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-500/20");
        b.classList.add("text-zinc-400", "hover:text-white");
      });
      btn.classList.add("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-500/20");
      btn.classList.remove("text-zinc-400", "hover:text-white");
      const ind = btn.dataset.industryFilter;
      document.querySelectorAll(".portfolio-card").forEach((c) => {
        c.style.display = ind === "All" || c.dataset.industry === ind ? "" : "none";
      });
    });
  });

  // ---------- Portfolio modal ----------
  const portfolioData = (() => {
    const el = document.getElementById("portfolio-data");
    return el ? JSON.parse(el.textContent) : [];
  })();
  const pfModal = document.getElementById("portfolioModal");
  const pfContent = document.getElementById("portfolioModalContent");

  const renderPortfolioModal = (item, viewMode = "desktop") => {
    const viewBtn = (mode, icon, label, active) => `
      <button data-view-mode="${mode}" class="pf-vm px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${active ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"}">
        <i data-lucide="${icon}" class="w-3.5 h-3.5"></i> ${label}
      </button>`;
    pfContent.innerHTML = `
      <button class="closePfModal absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/10">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
      <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">${item.industry} Website Inspiration</span>
          <h3 class="text-2xl font-bold text-white tracking-tight">${item.title}</h3>
        </div>
        <div class="flex items-center gap-1 bg-white/5 p-1.5 rounded-xl border border-white/10">
          ${viewBtn("desktop", "monitor", "Desktop", viewMode === "desktop")}
          ${viewBtn("mobile", "smartphone", "Mobile", viewMode === "mobile")}
        </div>
      </div>
      <div class="bg-[#020203] p-4 rounded-2xl border border-white/10 overflow-hidden">
        <div class="mx-auto transition-all duration-300 ${viewMode === "mobile" ? "max-w-[320px] border-4 border-zinc-800 rounded-3xl p-2" : "w-full"}">
          <div class="rounded-xl overflow-hidden bg-[#0e0e14] border border-white/10 shadow-2xl shadow-black/60">
            <div class="flex items-center gap-2 h-10 px-4 bg-[#191921] border-b border-white/10">
              <span class="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
              <span class="w-3 h-3 rounded-full bg-[#febc2e]"></span>
              <span class="w-3 h-3 rounded-full bg-[#28c840]"></span>
              <div class="flex-1 mx-3 h-6 rounded-full bg-[#0e0e14] border border-white/10 flex items-center gap-2 px-3">
                <i data-lucide="lock" class="w-3 h-3 text-emerald-500"></i>
                <span class="text-[10px] font-mono text-zinc-500">${item.domain || "example.com"}</span>
              </div>
              <i data-lucide="rotate-cw" class="w-3.5 h-3.5 text-zinc-600"></i>
            </div>
            <div class="pf-modal-viewport relative bg-white overflow-y-auto ${viewMode === "mobile" ? "max-h-[440px]" : "max-h-[420px]"}">
              <img src="${item.image}" alt="${item.title} website homepage preview" class="w-full block">
            </div>
          </div>
          <p class="mt-3 text-[11px] text-zinc-500 font-mono text-center">Scroll inside the browser window to view the full homepage</p>
        </div>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <h4 class="text-xs font-bold text-indigo-300 uppercase tracking-wide">Included Features</h4>
          <div class="grid grid-cols-2 gap-2">
            ${item.features.map(f => `<div class="text-xs text-zinc-300 flex items-center gap-1.5"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-indigo-400 shrink-0"></i><span class="truncate">${f}</span></div>`).join("")}
          </div>
        </div>
        <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <h4 class="text-xs font-bold text-emerald-400 uppercase tracking-wide">Client Result Impact</h4>
          <div class="space-y-1.5">
            ${item.keyHighlights.map(h => `<div class="text-xs text-zinc-300 flex items-center gap-2"><span class="text-emerald-400 font-bold">★</span><span>${h}</span></div>`).join("")}
          </div>
        </div>
      </div>
      <div class="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <a href="contact.html?service=${encodeURIComponent(item.industry + " Website")}" class="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all flex items-center gap-2">
          Request Website Built in This Style <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
        <a href="${item.exampleUrl}" target="_blank" rel="noopener" class="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 font-semibold text-sm hover:bg-white/10 transition-all flex items-center gap-2">
          Visit Live Example <i data-lucide="external-link" class="w-4 h-4"></i>
        </a>
      </div>`;
    lucide.createIcons();
    pfContent.querySelector(".closePfModal").addEventListener("click", () => pfModal.classList.add("hidden"));
    pfContent.querySelectorAll(".pf-vm").forEach((b) => b.addEventListener("click", () => renderPortfolioModal(item, b.dataset.viewMode)));
  };

  document.querySelectorAll(".portfolio-view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = portfolioData.find((x) => x.id === btn.dataset.portfolioId);
      if (!item || !pfModal) return;
      renderPortfolioModal(item, "desktop");
      pfModal.classList.remove("hidden");
    });
  });
  if (pfModal) pfModal.addEventListener("click", (e) => { if (e.target === pfModal) pfModal.classList.add("hidden"); });

  // ---------- Packages: currency switch, plan selection, add-ons, live total ----------
  const packagesData = (() => {
    const el = document.getElementById("packages-data");
    return el ? JSON.parse(el.textContent) : null;
  })();

  if (packagesData) {
    const addOns = [
      { id: "fast-delivery", name: "Express 3-Day Fast Delivery", priceNGN: 40000, priceUSD: 50 },
      { id: "whatsapp-bot", name: "WhatsApp Direct Ordering Bot", priceNGN: 35000, priceUSD: 45 },
      { id: "logo-design", name: "Full Vector Logo & Branding Kit", priceNGN: 50000, priceUSD: 65 },
      { id: "seo-booster", name: "Google My Business + Local SEO Rank", priceNGN: 45000, priceUSD: 60 },
    ];
    const state = { currency: "NGN", planId: "standard", addons: [] };

    const fmt = (n) => (state.currency === "NGN" ? `₦${n.toLocaleString()}` : `$${n.toLocaleString()}`);

    const renderPackages = () => {
      const grid = document.getElementById("packagesGrid");
      if (!grid) return;
      grid.innerHTML = packagesData.map((pkg) => {
        const isSel = pkg.id === state.planId;
        const price = state.currency === "NGN" ? pkg.priceNGN : pkg.priceUSD;
        return `
          <div data-plan="${pkg.id}" class="plan-card p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${isSel ? "border-indigo-500 bg-white/[0.05] shadow-2xl shadow-indigo-500/10 scale-[1.02]" : "bg-white/[0.03] border-white/10 hover:border-indigo-500/30"}">
            ${pkg.popular ? '<span class="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full bg-indigo-600 text-white shadow-md font-mono uppercase tracking-wider">Most Popular</span>' : ""}
            <div>
              <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 class="font-bold text-white text-lg tracking-tight">${pkg.name}</h3>
                <div class="h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${isSel ? "border-indigo-500 bg-indigo-600 text-white" : "border-zinc-600"}">
                  ${isSel ? '<i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>' : ""}
                </div>
              </div>
              <p class="text-xs text-zinc-400 mt-3 min-h-[36px] leading-relaxed">${pkg.tagline}</p>
              <div class="my-5">
                <div class="text-3xl font-bold text-white tracking-tight font-mono">${fmt(price)}</div>
                <div class="text-[11px] text-indigo-400 font-mono font-semibold mt-1 flex items-center gap-2"><span>⏱ Delivery: ${pkg.deliveryDays}</span></div>
              </div>
              <ul class="space-y-2 border-t border-white/10 pt-4 text-xs text-zinc-300">
                ${pkg.features.map(f => `<li class="flex items-start gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5"></i><span>${f}</span></li>`).join("")}
              </ul>
            </div>
            <a href="contact.html?package=${encodeURIComponent(pkg.name)}" class="w-full mt-6 py-2.5 rounded-xl font-semibold text-xs transition-all text-center ${isSel ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500" : "bg-white/5 text-white hover:bg-white/10 border border-white/10"}">${isSel ? "Selected — Get Quote" : "Choose Package"}</a>
          </div>`;
      }).join("");
      grid.querySelectorAll(".plan-card").forEach((c) => c.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        state.planId = c.dataset.plan;
        renderAll();
      }));
      lucide.createIcons();
    };

    const renderAddons = () => {
      const g = document.getElementById("addonsGrid");
      if (!g) return;
      g.innerHTML = addOns.map((a) => {
        const checked = state.addons.includes(a.id);
        const price = state.currency === "NGN" ? a.priceNGN : a.priceUSD;
        return `
          <div data-addon="${a.id}" class="addon-item p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${checked ? "bg-indigo-500/10 border-indigo-500/50 text-white" : "bg-white/[0.02] border-white/10 text-zinc-300 hover:bg-white/5"}">
            <div class="flex items-center gap-2.5">
              <div class="h-4 w-4 rounded border flex items-center justify-center ${checked ? "bg-indigo-600 border-indigo-600 text-white" : "border-zinc-600"}">
                ${checked ? '<i data-lucide="check" class="w-3 h-3 stroke-[3]"></i>' : ""}
              </div>
              <span class="text-xs font-medium">${a.name}</span>
            </div>
            <span class="text-xs font-mono font-bold text-indigo-400">+${fmt(price)}</span>
          </div>`;
      }).join("");
      g.querySelectorAll(".addon-item").forEach((el) => el.addEventListener("click", () => {
        const id = el.dataset.addon;
        state.addons = state.addons.includes(id) ? state.addons.filter(x => x !== id) : [...state.addons, id];
        renderAll();
      }));
      lucide.createIcons();
    };

    const renderTotals = () => {
      const plan = packagesData.find(p => p.id === state.planId) || packagesData[1];
      let total = state.currency === "NGN" ? plan.priceNGN : plan.priceUSD;
      state.addons.forEach((id) => {
        const a = addOns.find(x => x.id === id);
        if (a) total += state.currency === "NGN" ? a.priceNGN : a.priceUSD;
      });
      const t = document.getElementById("totalPrice");
      const n = document.getElementById("selectedBaseName");
      if (t) t.textContent = fmt(total);
      if (n) n.textContent = plan.name;
    };

    const renderAll = () => { renderPackages(); renderAddons(); renderTotals(); };

    document.querySelectorAll(".cur-btn").forEach((btn) => btn.addEventListener("click", () => {
      state.currency = btn.dataset.currency;
      document.querySelectorAll(".cur-btn").forEach((b) => {
        b.classList.remove("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-500/20");
        b.classList.add("text-zinc-400", "hover:text-white");
      });
      btn.classList.add("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-500/20");
      btn.classList.remove("text-zinc-400", "hover:text-white");
      renderAll();
    }));

    const waBtn = document.getElementById("sendQuoteWA");
    if (waBtn) waBtn.addEventListener("click", () => {
      const plan = packagesData.find(p => p.id === state.planId) || packagesData[1];
      let total = state.currency === "NGN" ? plan.priceNGN : plan.priceUSD;
      state.addons.forEach((id) => {
        const a = addOns.find(x => x.id === id);
        if (a) total += state.currency === "NGN" ? a.priceNGN : a.priceUSD;
      });
      const addonNames = state.addons.map(id => (addOns.find(a => a.id === id) || {}).name).filter(Boolean).join(", ");
      const text = `Hello JoTechToTech! I am interested in building a website with the following configuration:
Package: ${plan.name} (${fmt(state.currency === "NGN" ? plan.priceNGN : plan.priceUSD)})
${addonNames ? `Selected Add-ons: ${addonNames}` : ""}
Estimated Total Quote: ${fmt(total)}

Can we get started?`;
      window.open(`${WA}?text=${encodeURIComponent(text)}`, "_blank");
    });

    renderAll();
  }

  // ---------- Testimonials filter ----------
  document.querySelectorAll(".tm-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tm-filter").forEach((b) => {
        b.classList.remove("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-500/20");
        b.classList.add("text-zinc-400", "hover:text-white");
      });
      btn.classList.add("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-500/20");
      btn.classList.remove("text-zinc-400", "hover:text-white");
      const ind = btn.dataset.tmFilter;
      document.querySelectorAll(".testimonial-card").forEach((c) => {
        c.style.display = ind === "All" || c.dataset.industry === ind ? "" : "none";
      });
    });
  });

  // ---------- FAQ accordion + search ----------
  document.querySelectorAll(".faq-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const body = item.querySelector(".faq-body");
      const chev = item.querySelector(".faq-chevron");
      const open = !body.classList.contains("hidden");
      // Close all
      document.querySelectorAll(".faq-item .faq-body").forEach(b => b.classList.add("hidden"));
      document.querySelectorAll(".faq-item .faq-chevron").forEach(c => { c.classList.remove("rotate-180", "text-indigo-400"); });
      if (!open) {
        body.classList.remove("hidden");
        body.classList.add("animate-fade-in");
        chev.classList.add("rotate-180", "text-indigo-400");
      }
    });
  });
  // open first by default
  const firstFaq = document.querySelector(".faq-item");
  if (firstFaq) {
    firstFaq.querySelector(".faq-body")?.classList.remove("hidden");
    firstFaq.querySelector(".faq-chevron")?.classList.add("rotate-180", "text-indigo-400");
  }
  const faqSearch = document.getElementById("faqSearch");
  if (faqSearch) faqSearch.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll(".faq-item").forEach((el) => {
      const match = el.dataset.faqQ.includes(q) || el.dataset.faqA.includes(q);
      el.style.display = match ? "" : "none";
    });
  });

  // ---------- Contact form: prefill from ?service= / ?package= and submit via WhatsApp ----------
  const params = new URLSearchParams(window.location.search);
  const svc = params.get("service");
  const pkg = params.get("package");
  const svcSel = document.getElementById("serviceSelect");
  const pkgSel = document.getElementById("packageSelect");
  if (svc && svcSel) {
    let matched = false;
    [...svcSel.options].forEach(o => { if (o.value === svc || o.text === svc) { o.selected = true; matched = true; } });
    if (!matched) {
      const opt = document.createElement("option");
      opt.value = svc; opt.text = svc; opt.selected = true;
      svcSel.appendChild(opt);
    }
  }
  if (pkg && pkgSel) {
    [...pkgSel.options].forEach(o => { if (o.text.startsWith(pkg)) o.selected = true; });
  }
  const cf = document.getElementById("contactForm");
  const cs = document.getElementById("contactStatus");
  if (cf) cf.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(cf);
    const name = (d.get("name") || "").toString().trim();
    const email = (d.get("email") || "").toString().trim();
    const phone = (d.get("phone") || "").toString().trim();
    if (!name || (!email && !phone)) {
      if (cs) {
        cs.className = "p-3 rounded-xl text-xs bg-rose-500/10 border border-rose-500/30 text-rose-300";
        cs.textContent = "Please provide your name and either email or phone.";
        cs.classList.remove("hidden");
      }
      return;
    }
    const text = `Hello JoTechToTech! I want to start a web project.
Name: ${name}
${phone ? `Phone/WhatsApp: ${phone}` : ""}
${email ? `Email: ${email}` : ""}
Service: ${d.get("service")}
Package: ${d.get("package")}
${d.get("message") ? `Brief: ${d.get("message")}` : ""}`;
    window.open(`${WA}?text=${encodeURIComponent(text)}`, "_blank");
    if (cs) {
      cs.className = "p-3 rounded-xl text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2";
      cs.innerHTML = '<span>Opening WhatsApp with your inquiry — thanks! We’ll reply promptly.</span>';
      cs.classList.remove("hidden");
    }
    cf.reset();
  });
})();

// Clean URL routing — removes .html from the address bar
(function () {
  // ----- Helper: get clean path without .html -----
  function getCleanPath(path) {
    if (path.endsWith('.html')) {
      return path.slice(0, -5) || '/';
    }
    return path;
  }

  // ----- 1. Clean the current URL on page load -----
  const currentPath = window.location.pathname;
  if (currentPath.endsWith('.html')) {
    const cleanPath = getCleanPath(currentPath);
    window.history.replaceState(
      null,
      '',
      cleanPath + window.location.search + window.location.hash
    );
  }

  // ----- 2. Navigation: fetch page content and update DOM -----
  let isNavigating = false;

  function navigateTo(url, pushState = true) {
    if (isNavigating) return;
    isNavigating = true;

    // Build the .html URL for fetching
    let htmlUrl = url;
    if (!url.endsWith('.html')) {
      htmlUrl = url + '.html';
    }

    // Clean URL for the address bar
    const cleanUrl = getCleanPath(url);

    if (pushState) {
      window.history.pushState(null, '', cleanUrl);
    }

    fetch(htmlUrl)
      .then(res => {
        if (!res.ok) throw new Error('Page not found');
        return res.text();
      })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Replace head and body
        document.head.innerHTML = doc.head.innerHTML;
        document.body.innerHTML = doc.body.innerHTML;

        // Re-run all scripts
        document.querySelectorAll('script').forEach(oldScript => {
          const newScript = document.createElement('script');
          for (const attr of oldScript.attributes) {
            newScript.setAttribute(attr.name, attr.value);
          }
          newScript.textContent = oldScript.textContent;
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });

        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
          lucide.createIcons();
        }

        // Re-run pricing cards renderer (if on packages page)
        if (typeof renderCards === 'function') {
          renderCards();
        }

        // Re-run FAQ search init (if on packages page)
        if (typeof initFaqSearch === 'function') {
          initFaqSearch();
        }

        isNavigating = false;
      })
      .catch(() => {
        // Fallback: normal navigation if fetch fails
        window.location.href = htmlUrl;
        isNavigating = false;
      });
  }

  // ----- 3. Intercept internal link clicks -----
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    let href = link.getAttribute('href');
    if (!href) return;

    // Skip external links, anchors, and target="_blank"
    if (href.startsWith('http') && !href.includes(window.location.hostname)) return;
    if (href.startsWith('#')) return;
    if (link.target === '_blank') return;

    // Only handle .html links or clean paths (no extension)
    const isHtml = href.endsWith('.html');
    const isClean = !href.includes('.') && !href.includes('://');

    if (!isHtml && !isClean) return;

    e.preventDefault();

    const cleanUrl = isHtml ? href.replace(/\.html$/, '') : href;
    navigateTo(cleanUrl, true);
  });

  // ----- 4. Handle back/forward browser buttons -----
  window.addEventListener('popstate', function () {
    const url = window.location.pathname;
    if (url && url !== '/') {
      navigateTo(url, false);
    }
  });
})();