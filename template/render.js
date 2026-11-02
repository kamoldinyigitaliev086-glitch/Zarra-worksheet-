/* ZARRA worksheet renderer.
 * Dars fayli (lessons/*.js) ZARRA.lesson({...}) ni chaqiradi —
 * bu skript ma’lumotni qat’iy A4 maketga joylaydi va matnni sig‘diradi.
 */
(function () {
  "use strict";

  /* ---------- Ikonkalar ---------- */
  const ICON_ATOM =
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6">' +
    '<ellipse cx="24" cy="24" rx="21" ry="8"/>' +
    '<ellipse cx="24" cy="24" rx="21" ry="8" transform="rotate(60 24 24)"/>' +
    '<ellipse cx="24" cy="24" rx="21" ry="8" transform="rotate(120 24 24)"/>' +
    '<circle cx="24" cy="24" r="4" fill="currentColor" stroke="none"/></svg>';
  const ICON_HEX =
    '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5">' +
    '<polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5"/>' +
    '<circle cx="50" cy="50" r="22"/></svg>';
  const ICON_MOLECULE =
    '<svg viewBox="0 0 100 100" fill="currentColor" stroke="currentColor" stroke-width="4">' +
    '<line x1="50" y1="50" x2="20" y2="25"/><line x1="50" y1="50" x2="82" y2="30"/>' +
    '<line x1="50" y1="50" x2="45" y2="88"/><circle cx="50" cy="50" r="13"/>' +
    '<circle cx="20" cy="25" r="9"/><circle cx="82" cy="30" r="9"/><circle cx="45" cy="88" r="9"/></svg>';

  /* ---------- Matn formatlash ----------
   *  **qalin**   →  qalin
   *  H_2O, X_{12} →  pastki indeks
   *  Fe^3+, 10^{21} → yuqori indeks
   *  ___ (3+ pastki chiziq) → yozish uchun bo‘sh joy
   */
  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function fmt(s) {
    return esc(s)
      .replace(/_{3,}/g, '<span class="blank"></span>')
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/_\{([^}]*)\}/g, "<sub>$1</sub>")
      .replace(/_(\d+)/g, "<sub>$1</sub>")
      .replace(/\^\{([^}]*)\}/g, "<sup>$1</sup>")
      .replace(/\^([0-9]*[+\-−]?)/g, (m, g) => (g ? "<sup>" + g + "</sup>" : m));
  }
  const arr = v => (v == null ? [] : Array.isArray(v) ? v : [v]);
  const LETTERS = ["a", "b", "c", "d", "e", "f"];

  /* ---------- Umumiy bloklar ---------- */
  function header(m) {
    return `
      <header class="ws-header">
        <div class="brand">
          <span class="brand__icon">${ICON_ATOM}</span>
          <div><div class="brand__name">ZARRA</div>
               <div class="brand__sub">${esc(m.subject || "Kimyo")} · ${esc(m.grade || 7)}-sinf</div></div>
        </div>
        <div class="meta">
          ${m.quarter ? `<span class="chip">${esc(m.quarter)}</span>` : ""}
          ${m.lessonNo != null ? `<span class="chip chip--accent">${esc(m.lessonNo)}-dars</span>` : ""}
        </div>
      </header>
      <div class="student-row">
        <span>Ism-familiya:</span><span>Sinf:</span><span>Sana:</span>
      </div>`;
  }
  function titleBand(kicker, m) {
    return `
      <div class="title-band">
        <div class="title-band__kicker">${esc(kicker)}</div>
        <h1>${fmt(m.topic || "Mavzu nomi")}</h1>
        ${m.subtitle ? `<p>${fmt(m.subtitle)}</p>` : ""}
        <span class="title-band__hex">${ICON_HEX}</span>
      </div>`;
  }
  function footer(m, n, extra) {
    return `
      <footer class="ws-footer">
        <span>ZARRA · ${esc(m.subject || "Kimyo")} · ${esc(m.grade || 7)}-sinf${m.footerNote ? " · " + esc(m.footerNote) : ""}</span>
        ${extra || ""}
        <span>${n} / 2</span>
      </footer>`;
  }

  /* ---------- 1-sahifa: nazariya ---------- */
  function theoryPage(d) {
    const m = d.meta || {}, t = d.theory || {};
    const goals = arr(t.goals);
    const sections = arr(t.sections).map((s, i) => `
      <div class="section">
        <h2><span class="num">${i + 1}</span>${fmt(s.title)}</h2>
        ${arr(s.text).map(p => `<p>${fmt(p)}</p>`).join("")}
        ${s.bullets ? `<ul>${arr(s.bullets).map(b => `<li>${fmt(b)}</li>`).join("")}</ul>` : ""}
        ${s.table ? dataTable(s.table) : ""}
        ${s.highlight ? `<div class="highlight">${fmt(s.highlight)}</div>` : ""}
      </div>`).join("");
    const terms = arr(t.keyTerms);

    return `
      <section class="page page--theory">
        <span class="page__decor">${ICON_MOLECULE}</span>
        ${header(m)}
        ${titleBand("1-sahifa · Nazariya", m)}
        <div class="fit theory">
          ${goals.length ? `<div class="box goals"><div class="box__title"><i>★</i>Dars maqsadi</div>
            <ul>${goals.map(g => `<li>${fmt(g)}</li>`).join("")}</ul></div>` : ""}
          ${sections}
          ${(terms.length || t.fact) ? `<div class="bottom-boxes">
            ${terms.length ? `<div class="box terms"><div class="box__title"><i>!</i>Yodda tuting</div>
              <dl>${terms.map(k => `<dt>${fmt(k.term)}</dt><dd>${fmt(k.def)}</dd>`).join("")}</dl></div>` : "<div></div>"}
            ${t.fact ? `<div class="box fact"><div class="box__title"><i>?</i>Bilasizmi?</div><p>${fmt(t.fact)}</p></div>` : ""}
          </div>` : ""}
          ${t.notes === false ? "" : `<div class="notes"><div class="box__title">✎ Qaydlar</div><div class="lines" style="--min-lines:1"></div></div>`}
        </div>
        ${footer(m, 1)}
      </section>`;
  }
  function dataTable(tb) {
    return `<table class="data"><thead><tr>${arr(tb.head).map(h => `<th>${fmt(h)}</th>`).join("")}</tr></thead>
      <tbody>${arr(tb.rows).map(r => `<tr>${arr(r).map(c => `<td>${fmt(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }

  /* ---------- 2-sahifa: mashqlar ---------- */
  const EX = {
    choice(e) {
      return arr(e.items).map((it, i, all) => {
        const opts = arr(it.options);
        const long = opts.some(o => String(o).length > 22);
        return `<div class="choice-q"><div class="q">${all.length > 1 ? i + 1 + ". " : ""}${fmt(it.q)}</div>
          <div class="options${long ? " cols-2" : ""}">${opts.map((o, j) => `<div class="opt" data-l="${LETTERS[j]}">${fmt(o)}</div>`).join("")}</div></div>`;
      }).join("");
    },
    fill(e) {
      return `<ol class="fill">${arr(e.items).map(s => `<li>${fmt(s)}</li>`).join("")}</ol>`;
    },
    match(e) {
      const L = arr(e.left), R = arr(e.right);
      return `<div class="match">
        <ul>${L.map((x, i) => `<li><b>${i + 1}.</b>${fmt(x)}</li>`).join("")}</ul>
        <ul>${R.map((x, i) => `<li><b>${LETTERS[i] || i + 1})</b>${fmt(x)}</li>`).join("")}</ul>
        <div class="answers">${L.map((_, i) => `<span>${i + 1} –</span>`).join("")}</div>
      </div>`;
    },
    table(e) {
      const head = arr(e.head);
      return `<table class="ex-table"><thead><tr>${head.map(h => `<th>${fmt(h)}</th>`).join("")}</tr></thead>
        <tbody>${arr(e.rows).map(r => `<tr>${head.map((_, j) => {
          const c = arr(r)[j];
          return c ? `<td class="given">${fmt(c)}</td>` : "<td></td>";
        }).join("")}</tr>`).join("")}</tbody></table>`;
    },
    open(e) {
      return `${arr(e.questions || e.q).map(q => `<div class="open-q">${fmt(q)}</div>`).join("")}`;
    },
  };

  function exercisePage(d) {
    const m = d.meta || {};
    const list = arr(d.exercises);
    if (list.length !== 5) console.warn(`[ZARRA] 2-sahifa 5 ta mashq uchun mo‘ljallangan, berilgan: ${list.length}`);
    const total = list.reduce((s, e) => s + (Number(e.points) || 0), 0);

    const cards = list.slice(0, 5).map((e, i) => {
      const render = EX[e.type] || EX.open;
      // Mashq ostidagi yozish chiziqlari: open uchun doim, boshqalar uchun "lines: true" bo‘lsa
      const wantLines = e.lines ?? (e.type === "open" || !EX[e.type]);
      return `
        <article class="ex" style="--w:${Number(e.weight) || 1}">
          <div class="ex__head">
            <span class="ex__num">${i + 1}</span>
            <span class="ex__title">${fmt(e.title || "Mashq")}</span>
            ${e.points != null ? `<span class="ex__score"><b></b> / ${esc(e.points)} ball</span>` : ""}
          </div>
          <div class="ex__body">
            ${e.instruction ? `<div class="ex__instr">${fmt(e.instruction)}</div>` : ""}
            ${render(e)}
            ${wantLines ? `<div class="lines" style="--min-lines:${Number(e.minLines) || 2}"></div>` : ""}
          </div>
        </article>`;
    }).join("");

    const totalBox = total ? `<span class="total">Jami: <b></b> / ${total} ball</span>` : "";
    return `
      <section class="page page--exercises">
        <span class="page__decor">${ICON_MOLECULE}</span>
        ${header(m)}
        ${titleBand("2-sahifa · Mashqlar", m)}
        <div class="exercises fit">${cards}</div>
        ${footer(m, 2, totalBox)}
      </section>`;
  }

  /* ---------- Sig‘dirish ---------- */
  function fit(el, min) {
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

  function fitAll() {
    const report = [];
    document.querySelectorAll(".fit").forEach(el => {
      const r = fit(el, 0.6);
      const where = el.classList.contains("theory") ? "1-sahifa (nazariya)" : "2-sahifa (mashqlar)";
      report.push({ where, ...r });
      if (r.overflow) console.warn(`[ZARRA] ${where}: matn juda uzun, sig‘madi — qisqartiring.`);
    });
    return report;
  }

  /* ---------- Asosiy API ---------- */
  async function lesson(data) {
    const root = document.getElementById("sheet");
    root.innerHTML = theoryPage(data) + exercisePage(data);
    document.title = `ZARRA · ${data.meta?.topic || "Worksheet"}`;
    try { if (document.fonts) await Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 4000))]); } catch (_) {}
    const report = fitAll();
    window.ZARRA.report = report;
    window.ZARRA.data = data;
    document.dispatchEvent(new CustomEvent("zarra:ready", { detail: report }));
    document.body.dataset.ready = "1";
  }

  window.ZARRA = { lesson, refit: fitAll, fmt };
})();
