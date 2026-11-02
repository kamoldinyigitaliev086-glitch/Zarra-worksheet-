/* ZARRA worksheet renderer.
 * Dars fayli (lessons/*.js) ZARRA.lesson({...}) ni chaqiradi — bu skript
 * ma’lumotni qat’iy A4 maketga joylaydi va matnni sahifaga sig‘diradi.
 * Ma’lumot formati: README.md va lessons/_shablon.js.
 */
(function () {
  "use strict";

  /* ---------- Rang tartibi (namunadagidek) ---------- */
  const SEC_COLORS = ["blue", "green", "orange", "purple", "teal"];
  const EX_COLORS = ["blue", "green", "orange", "purple", "blue"];
  const CARD_COLORS = ["blue", "green", "orange", "purple"];
  const TILE_COLORS = ["blue", "orange", "green", "orange"];
  const LETTER_COLORS = ["blue", "blue", "teal", "green", "purple", "orange"];
  const ROW_COLORS = ["blue", "green", "orange", "purple", "teal"];
  const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const SMALL = ["a", "b", "c", "d", "e", "f"];

  /* ---------- Yordamchilar ---------- */
  const arr = v => (v == null ? [] : Array.isArray(v) ? v : [v]);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  /*  **qalin**  ·  H_2O, X_{12} (pastki)  ·  Fe^3+, 10^{21} (yuqori)  ·  ___ (bo‘sh joy)  ·  \n (yangi qator) */
  function fmt(s) {
    return esc(s)
      .replace(/_{3,}/g, '<span class="blank"></span>')
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/_\{([^}]*)\}/g, "<sub>$1</sub>")
      .replace(/_(\d+)/g, "<sub>$1</sub>")
      .replace(/\^\{([^}]*)\}/g, "<sup>$1</sup>")
      .replace(/\^([0-9]*[+\-−]?)/g, (m, g) => (g ? "<sup>" + g + "</sup>" : m))
      .replace(/\n/g, "<br>");
  }
  // Bo‘sh joyli qator: matn bo‘laklari <span> ichida, ___ — cho‘ziluvchi chiziq
  const inlineRow = s => String(s ?? "").split(/_{3,}/).map(seg => seg.trim() ? `<span>${fmt(seg)}</span>` : "").join('<span class="blank"></span>');
  const paras = t => arr(t).map(p => `<p>${fmt(p)}</p>`).join("");
  const pick = (list, i) => list[i % list.length];
  function url(p) {
    try { return new URL(p, window.ZARRA.base || document.baseURI).href; } catch (_) { return p; }
  }
  const styleVars = o => Object.entries(o).filter(([, v]) => v != null && v !== "").map(([k, v]) => `--${k}:${v}`).join(";");

  const ICON_FLASK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7.5 15h9"/></svg>';

  /* Rasm joyi. Rasm bo‘lmasa — chiroyli bo‘sh joy (maket baribir saqlanadi). */
  function ph(src, o = {}) {
    const st = styleVars({ pos: o.imgPos, "ph-min": o.imgMin != null ? o.imgMin + "em" : null });
    const badge = o.badge != null ? `<span class="badge">${esc(o.badge)}</span>` : "";
    if (!src) {
      return `<div class="ph ph--empty" style="${st}">${badge}<span>${ICON_FLASK}${o.alt ? `<em>${fmt(o.alt)}</em>` : "<em>rasm</em>"}</span></div>`;
    }
    return `<div class="ph${o.imgFit === "contain" ? " ph--contain" : ""}" style="${st}">${badge}<img src="${esc(url(src))}" alt="${esc(o.alt || "")}"></div>`;
  }

  /* ---------- Logotip (assets/logo.png bo‘lsa — o‘sha ishlatiladi) ---------- */
  function logoMark() {
    let seed = 11, dots = "";
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const mix = (a, b, t) => Math.round(a + (b - a) * t);
    for (let i = 0; i < 520; i++) {
      const deg = 40 + rnd() * 280;                                   // o‘ng tomonda ochiq halqa
      const ang = deg * Math.PI / 180;
      const spread = (rnd() + rnd() + rnd() - 1.5) / 1.5;             // halqa atrofida zichroq
      const rr = 32 + spread * 13;
      const x = 50 + rr * Math.cos(ang), y = 50 - rr * Math.sin(ang);
      const near = 1 - Math.min(1, Math.abs(rr - 32) / 13);
      const edge = Math.min(1, Math.min(deg - 40, 320 - deg) / 60);    // uchlarida mayda
      const size = 0.35 + rnd() * 2.4 * near * (0.35 + 0.65 * edge) + (rnd() > .97 ? 1.6 * near : 0);
      const t = Math.min(1, Math.max(0, rnd() * .7 + (1 - near) * .4));
      dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${size.toFixed(2)}" fill="rgb(${mix(8, 90, t)},${mix(40, 185, t)},${mix(140, 255, t)})" opacity="${(0.6 + rnd() * .4).toFixed(2)}"/>`;
    }
    return `<svg class="logo__mark" viewBox="0 0 100 100">${dots}</svg>`;
  }
  function logo() {
    const custom = window.ZARRA.logo !== false
      ? `<img class="logo__img" src="${esc(new URL("assets/logo.png", document.baseURI).href)}" alt="Zarra"
           onload="this.parentNode.classList.add('has-img');this.nextElementSibling.remove()"
           onerror="this.remove()">` : "";
    return `<div class="logo">${custom}<div class="logo__default" style="display:flex;align-items:center;gap:2mm">${logoMark()}
      <div><div class="logo__name">Zarra</div><div class="logo__tag">— KIMYO ONLINE PLATFORMASI —</div></div></div></div>`;
  }

  function waveTop(id) {
    return `<svg class="wave-top" viewBox="0 0 640 40" preserveAspectRatio="none"><defs><linearGradient id="${id}" x1="0" x2="1">
      <stop offset="0" stop-color="#bfe0ff" stop-opacity="0"/><stop offset=".5" stop-color="#3f95f2"/><stop offset="1" stop-color="#bfe0ff" stop-opacity="0"/></linearGradient></defs>
      <path d="M0 0H640V5C470 32 170 32 0 5Z" fill="url(#${id})" opacity=".85"/></svg>`;
  }
  function header(m, n) {
    return `${waveTop("wt" + n)}
      <header class="hd">
        <div class="hd__top">
          ${logo()}
          <div class="pill pill--lesson">${esc(m.lessonNo ?? "?")}-DARS</div>
          <div class="pill pill--grade">${esc(m.grade ?? 7)}-SINF</div>
        </div>
        <h1 class="hd__title">${fmt(m.topic || "MAVZU NOMI")}</h1>
      </header>`;
  }
  function footer(m, n) {
    return `<footer class="ft">
        <svg class="ft__wave" viewBox="0 0 800 50" preserveAspectRatio="none"><defs>
          <linearGradient id="fa${n}" x1="0" x2="1"><stop offset="0" stop-color="#cfe7ff"/><stop offset="1" stop-color="#7cbaf7"/></linearGradient>
          <linearGradient id="fb${n}" x1="0" x2="1"><stop offset="0" stop-color="#5aa6f4"/><stop offset=".5" stop-color="#9fd0ff"/><stop offset="1" stop-color="#2f86f0"/></linearGradient></defs>
          <path d="M0 14C200 0 430 28 800 6V50H0Z" fill="url(#fa${n})" opacity=".7"/>
          <path d="M0 30C260 12 520 46 800 24V50H0Z" fill="url(#fb${n})" opacity=".9"/></svg>
        <span class="ft__page">${n}</span>
        <span class="ft__mid">— ${esc(m.footer || "KIMYO ONLINE PLATFORMASI")} —</span>
        <span class="ft__site">${esc(m.site || "zarra.uz")}</span>
      </footer>`;
  }

  /* =========================== NAZARIYA BLOKLARI =========================== */
  const GROW_BLOCKS = new Set(["cards", "gallery", "tiles", "steps"]);
  const BLOCKS = {
    text: b => `<div class="text">${paras(b.text)}</div>`,

    def(b) {
      return `<div class="def${b.img ? " has-img" : ""}" style="${styleVars({ "img-w": b.imgWidth })}">
        <div class="def__box">${paras(b.text)}</div>${b.img ? ph(b.img, b) : ""}</div>`;
    },

    cards(b) {
      const items = arr(b.items);
      return `<div class="cards" style="${styleVars({ cols: b.cols || items.length, "ph-min": b.imgMin != null ? b.imgMin + "em" : null })}">
        ${items.map((c, i) => card(c, i, b)).join("")}</div>`;
    },

    gallery(b) {
      const items = arr(b.items);
      return `<div class="gallery" style="${styleVars({ cols: b.cols || items.length, "ph-min": b.imgMin != null ? b.imgMin + "em" : null })}">
        ${items.map((g, i) => {
          const col = g.color || (b.colors ? pick(CARD_COLORS, i) : "");
          return `<div class="gitem${col ? " c-" + col : ""}">
            ${g.title ? `<div class="card__head">${fmt(g.title)}</div>` : ""}
            ${ph(g.img, g)}
            ${g.caption ? `<div class="gitem__cap">${fmt(g.caption)}</div>` : ""}</div>`;
        }).join("")}</div>`;
    },

    tiles(b) {
      const items = arr(b.items);
      return `<div class="tiles" style="${styleVars({ cols: b.cols || 4, "ph-min": b.imgMin != null ? b.imgMin + "em" : null })}">
        ${items.map((t, i) => `<div class="tile c-${t.color || pick(TILE_COLORS, i)}">
          <div class="tile__sym"><b>${fmt(t.symbol)}</b><span>${fmt(t.name)}</span></div>${ph(t.img, t)}</div>`).join("")}</div>`;
    },

    table(b) {
      return `<table class="tbl"><thead><tr>${arr(b.head).map(h => `<th>${fmt(h)}</th>`).join("")}</tr></thead>
        <tbody>${arr(b.rows).map(r => `<tr>${arr(r).map(c => `<td>${fmt(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    },

    checklist: b => `<ul class="checklist">${arr(b.items).map(x => `<li><span>${fmt(x)}</span></li>`).join("")}</ul>`,

    alert: b => `<div class="alert"><span class="alert__icon">!</span><span class="alert__label">${fmt(b.label || "Muhim!")}</span><span>${fmt(b.text)}</span></div>`,

    steps(b) { return `<div class="steps" style="${styleVars({ "ph-min": b.imgMin != null ? b.imgMin + "em" : null })}">${stepImgs(b.items, b.arrows !== false)}</div>`; },
  };

  function card(c, i, b) {
    const col = c.color || pick(CARD_COLORS, i);
    const text = (c.text || c.list)
      ? `<div class="card__text"${c.align || b.align ? ` style="--align:${c.align || b.align}"` : ""}>${paras(c.text)}${c.list ? `<ul>${arr(c.list).map(x => `<li>${fmt(x)}</li>`).join("")}</ul>` : ""}</div>` : "";
    const box = c.box ? `<div class="card__box${c.boxBig ? " big" : ""}"><span>${fmt(c.box)}</span></div>` : "";
    const img = c.img !== undefined ? ph(c.img, c) : "";
    let inner;
    if (c.imgSide === "right") {
      inner = `<div class="card__col">${text}${box ? `<div class="card__foot">${box}</div>` : ""}</div>${img ? `<div class="card__side" style="${styleVars({ "img-w": c.imgWidth })}">${img}</div>` : ""}`;
    } else if (box) {
      inner = `<div class="card__col">${text}<div class="card__foot" style="${styleVars({ "img-w": c.imgWidth })}">${box}${img}</div></div>`;
    } else {
      inner = `<div class="card__col">${text}${img}</div>`;
    }
    return `<div class="card c-${col}">${c.title ? `<div class="card__head">${fmt(c.title)}</div>` : ""}<div class="card__main">${inner}</div></div>`;
  }

  function stepImgs(items, arrows) {
    return arr(items).map((s, i) => `${i && arrows ? '<span class="arrow">➜</span>' : ""}
      <div class="step">${ph(s.img, s)}${s.caption ? `<div class="step__cap">${fmt(s.caption)}</div>` : ""}</div>`).join("");
  }

  /* =========================== MASHQ TURLARI =========================== */
  const answerBox = n => (n ? `<div class="abox"><div class="lines" style="--n:${n}"></div></div>` : "");
  function promptRows(list, numbered) {
    const pad = numbered ? '<span class="nb" style="visibility:hidden"></span>' : "";
    return arr(list).map((p, i) => {
      const nb = numbered ? `<span class="nb">${i + 1}</span>` : "";
      const s = String(p ?? "");
      if (!s) return `<div class="prow">${nb}<span class="blank"></span></div>`;
      if (/_{3,}/.test(s)) return `<div class="prow">${nb}${inlineRow(s)}</div>`;
      return `<div class="prow">${nb}<span>${fmt(s)}</span></div><div class="prow">${pad}<span class="blank"></span></div>`;
    }).join("");
  }

  const EX = {
    images(e) {
      const items = arr(e.items);
      const pics = items.map((it, i) => `<div class="pic">
          ${ph(it.img, { ...it, badge: e.badges === false ? null : i + 1 })}
          ${it.caption ? `<div class="pic__cap">${fmt(it.caption)}</div>` : ""}
          ${answerBox(it.lines ?? e.lines ?? 1)}</div>`).join("");
      const bank = e.bank ? `<div class="bank"><b>${fmt(e.bank.title || "Javoblar:")}</b>${arr(e.bank.items).map(x => `<span>${fmt(x)}</span>`).join("")}</div>` : "";
      return `<div class="pics grow" style="${styleVars({ "ph-min": e.imgMin != null ? e.imgMin + "em" : null })}">
        <div class="pics__grid" style="--cols:${e.cols || items.length}">${pics}</div>${bank}</div>`;
    },

    match(e) {
      const L = arr(e.left), R = arr(e.right);
      return `<div class="match">
        <div class="match__col">${L.map((x, i) => `<div class="mrow"><span class="mleft"><span>${i + 1}.</span><span>${fmt(x)}</span></span><i class="sq"></i></div>`).join("")}</div>
        <div class="match__col">${R.map((x, i) => `<div class="mright"><span class="lt c-${pick(LETTER_COLORS, i)}">${LETTERS[i]}</span><span>${fmt(x)}</span></div>`).join("")}</div>
      </div>`;
    },

    rewrite(e) {
      return `<div class="rw">${arr(e.items).map((x, i) => `<div class="rw__row"><span>${i + 1}.</span><span class="rw__src">${fmt(x)}</span><span class="arr">→</span><span class="rw__box"></span></div>`).join("")}</div>`;
    },

    truefalse(e) {
      return `<div class="tf">${arr(e.items).map((x, i) => `<div class="tf__row"><span class="nb">${i + 1}</span><span>${fmt(x)}</span><i class="sq"></i><i class="sq sq--n"></i></div>`).join("")}</div>`;
    },

    table(e) {
      const head = arr(e.head);
      const th = h => typeof h === "object" ? `<th>${fmt(h.text)}${h.sub ? `<small>${fmt(h.sub)}</small>` : ""}</th>` : `<th>${fmt(h)}</th>`;
      return `<table class="ftable grow"><thead><tr>${head.map(th).join("")}</tr></thead>
        <tbody>${arr(e.rows).map((r, ri) => `<tr>${head.map((_, j) => {
          const c = arr(r)[j];
          if (!c) return "<td></td>";
          const colored = e.rowColors && j === 0 ? ` colored c-${pick(ROW_COLORS, ri)}` : "";
          return `<td class="given${colored}">${fmt(c)}</td>`;
        }).join("")}</tr>`).join("")}</tbody></table>`;
    },

    questions(e) {
      return `<div class="qs" style="--cols:${e.cols || 1}">${arr(e.items).map((q, i) => {
        const it = typeof q === "object" ? q : { q };
        const body = it.prompts ? `<div class="prompts">${promptRows(it.prompts, false)}</div>`
          : e.boxed || it.boxed ? `<div class="abox" style="flex:1 0 auto"><div class="lines" style="--n:${it.lines ?? e.lines ?? 1}"></div></div>`
          : `<div class="lines" style="--n:${it.lines ?? e.lines ?? 3}"></div>`;
        return `<div class="q"><div class="q__text"><span class="nb">${i + 1}</span><span>${fmt(it.q)}</span></div>${body}</div>`;
      }).join("")}</div>`;
    },

    case(e) {
      const imgs = arr(e.images);
      const minStyle = styleVars({ "ph-min": e.imgMin != null ? e.imgMin + "em" : null, "img-w": e.imgWidth });
      const numbered = e.numbered !== false;
      const prompts = e.prompts ? arr(e.prompts) : Array.from({ length: e.lines || 3 }, () => "");
      if (e.layout === "pairs") {
        return `<div class="case" style="${minStyle}">${imgs.map(im => `<div class="pair">
          <div class="step">${ph(im.img, im)}${im.caption ? `<div class="step__cap">${fmt(im.caption)}</div>` : ""}</div>
          <div class="prompts">${promptRows(im.prompts, false)}</div></div>`).join("")}</div>`;
      }
      const imgRow = `<div class="case__imgs">${stepImgs(imgs, !!e.arrows)}</div>`;
      const pr = `<div class="prompts">${promptRows(prompts, numbered)}</div>`;
      return e.layout === "side"
        ? `<div class="case case--side" style="${minStyle}">${imgRow}${pr}</div>`
        : `<div class="case" style="${minStyle}">${imgRow}${pr}</div>`;
    },

    choice(e) {
      return arr(e.items).map((it, i) => {
        const opts = arr(it.options);
        const long = opts.some(o => String(o).length > 22);
        return `<div class="choice-q"><div class="q__text"><span class="nb">${i + 1}</span><span>${fmt(it.q)}</span></div>
          <div class="options${long ? " cols-2" : ""}">${opts.map((o, j) => `<div class="opt" data-l="${SMALL[j]}">${fmt(o)}</div>`).join("")}</div></div>`;
      }).join("");
    },

    fill: e => `<div class="fill-list">${arr(e.items).map((s, i) => `<div class="prow"><span class="nb">${i + 1}</span>${inlineRow(s)}</div>`).join("")}</div>`,

    lines: e => `<div class="lines" style="--n:${e.lines || 4}"></div>`,
  };
  const EX_WEIGHT = { images: 1, questions: 1, case: 1, table: 0.4, lines: 1 };

  /* =========================== SAHIFALAR =========================== */
  // Bo‘lim yoki mashq kartasi. kind: "sec" | "ex"
  function card5(item, n, kind) {
    const colors = kind === "sec" ? SEC_COLORS : EX_COLORS;
    const color = item.color || pick(colors, (n || 1) - 1);
    let body, weight;
    if (kind === "sec") {
      const blocks = arr(item.blocks);
      body = blocks.map(b => {
        const r = BLOCKS[b.type];
        if (!r) { console.warn(`[ZARRA] noma’lum blok turi: ${b.type}`); return ""; }
        const grow = GROW_BLOCKS.has(b.type) || (b.type === "def" && b.img !== undefined) || b.grow;
        return grow ? r(b).replace(/^\s*<(\w+) class="/, '<$1 class="grow ') : r(b);
      }).join("");
      weight = item.weight ?? (blocks.some(b => GROW_BLOCKS.has(b.type) || (b.type === "def" && b.img !== undefined)) ? 1 : 0);
    } else {
      const r = EX[item.type];
      if (!r) console.warn(`[ZARRA] noma’lum mashq turi: ${item.type}`);
      const html = (r || EX.lines)(item);
      body = /^\s*<(\w+) class="(grow|qs|case|pics)/.test(html) || ["questions", "case", "lines"].includes(item.type)
        ? html.replace(/^\s*<(\w+) class="(?!grow)/, '<$1 class="grow ') : html;
      weight = item.weight ?? EX_WEIGHT[item.type] ?? 0;
    }
    const numbered = item.number !== false;
    const aside = kind === "ex" && item.type === "truefalse" ? '<span class="tfpills"><b class="t">T</b><b class="n">N</b></span>' : "";
    const html = `<section class="sec c-${color}" style="--w:${weight};--span:${item.span || 1}">
      <div class="sec__head${numbered ? "" : " sec__head--plain"}">
        ${numbered ? `<span class="num">${n}</span>` : ""}
        <div><h2>${fmt(item.title || "")}</h2>${item.lead || item.instruction ? `<p class="lead">${fmt(item.lead || item.instruction)}</p>` : ""}</div>
        ${aside}
      </div>
      <div class="sec__body">${body}</div>
    </section>`;
    return { html, weight };
  }

  // Ro‘yxat: element — bitta karta, massiv — yonma-yon kartalar qatori
  function stack(list, kind) {
    let n = 0;
    return arr(list).map(entry => {
      if (Array.isArray(entry)) {
        const parts = entry.map(it => card5(it, it.number === false ? null : ++n, kind));
        const w = Math.max(...parts.map(p => p.weight));
        return `<div class="row" style="--w:${w}">${parts.map(p => p.html).join("")}</div>`;
      }
      return card5(entry, entry.number === false ? null : ++n, kind).html;
    }).join("");
  }

  function page(m, n, content) {
    return `<section class="page page--${n}">${header(m, n)}<div class="fit">${content}</div>${footer(m, n)}</section>`;
  }

  /* ---------- Sig‘dirish ---------- */
  function fitBox(el, min) {
    let s = 1;
    el.style.setProperty("--fit", s);
    while (el.scrollHeight > el.clientHeight + 1 && s > min) {
      s = Math.round((s - 0.02) * 100) / 100;
      el.style.setProperty("--fit", s);
    }
    const over = el.scrollHeight > el.clientHeight + 1;
    el.classList.toggle("is-overflow", over);
    return { scale: s, overflow: over };
  }
  function fitTitle(el) {
    el.classList.remove("wrap");
    el.style.fontSize = "";
    let px = parseFloat(getComputedStyle(el).fontSize);
    const min = px * 0.62;
    while (el.scrollWidth > el.clientWidth + 1 && px > min) { px -= 0.5; el.style.fontSize = px + "px"; }
    if (el.scrollWidth > el.clientWidth + 1) el.classList.add("wrap");
  }
  function fitAll() {
    document.querySelectorAll(".hd__title").forEach(fitTitle);
    return [...document.querySelectorAll(".page")].map((p, i) => {
      const r = fitBox(p.querySelector(".fit"), 0.6);
      const where = i === 0 ? "1-sahifa (nazariya)" : "2-sahifa (mashqlar)";
      if (r.overflow) console.warn(`[ZARRA] ${where}: mazmun sig‘madi — matnni qisqartiring yoki blok sonini kamaytiring.`);
      return { where, ...r };
    });
  }

  function waitImages(root, ms) {
    const imgs = [...root.querySelectorAll("img")];
    const one = img => img.complete ? Promise.resolve() : new Promise(r => { img.addEventListener("load", r); img.addEventListener("error", r); });
    return Promise.race([Promise.all(imgs.map(one)), new Promise(r => setTimeout(r, ms))]);
  }

  /* ---------- Asosiy API ---------- */
  async function lesson(data) {
    const m = data.meta || {};
    const root = document.getElementById("sheet");
    const exCount = arr(data.exercises).flat().filter(e => e.number !== false).length;
    const warnings = [];
    if (exCount !== 5) warnings.push(`2-sahifa 5 ta mashq uchun mo‘ljallangan, berilgan: ${exCount}`);
    warnings.forEach(w => console.warn("[ZARRA] " + w));

    root.innerHTML = page(m, 1, stack(data.theory, "sec")) + page(m, 2, stack(data.exercises, "ex"));
    document.title = `ZARRA · ${m.lessonNo ?? ""}-dars · ${String(m.topic || "").replace(/[*_^{}]/g, "")}`;

    try { if (document.fonts) await Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 5000))]); } catch (_) {}
    await waitImages(root, 10000);

    // Topilmagan rasm o‘rniga bo‘sh joy chiziladi (maket o‘zgarmaydi)
    const missing = [];
    root.querySelectorAll(".ph img").forEach(img => {
      if (img.naturalWidth) return;
      missing.push(img.getAttribute("src"));
      console.warn(`[ZARRA] rasm topilmadi: ${img.getAttribute("src")}`);
      const box = img.parentNode;
      box.classList.add("ph--empty");
      img.outerHTML = `<span>${ICON_FLASK}<em>rasm topilmadi</em></span>`;
    });
    const report = fitAll();

    window.ZARRA.report = report;
    window.ZARRA.missing = missing;
    window.ZARRA.warnings = warnings;
    window.ZARRA.data = data;
    document.dispatchEvent(new CustomEvent("zarra:ready", { detail: report }));
    document.body.dataset.ready = "1";
  }

  window.ZARRA = Object.assign(window.ZARRA || {}, { lesson, refit: fitAll, fmt });
})();
