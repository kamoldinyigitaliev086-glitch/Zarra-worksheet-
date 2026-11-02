#!/usr/bin/env node
/* ZARRA worksheet → PNG (va ixtiyoriy PDF) eksporti.
 *
 *   node scripts/export-png.js lessons/01-atom-va-molekula.js
 *   node scripts/export-png.js lessons/*.js --out output --dpi 300 --pdf
 *
 * Har bir dars uchun: <slug>-1.png (nazariya), <slug>-2.png (mashqlar).
 * --strict : matn sig‘magan, rasm topilmagan yoki mashq soni 5 emas bo‘lsa xato bilan tugaydi (kod 2).
 */
const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");

function parseArgs(argv) {
  const o = { files: [], out: "output", dpi: 300, pdf: false, strict: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--out") o.out = argv[++i];
    else if (a === "--dpi") o.dpi = Number(argv[++i]);
    else if (a === "--pdf") o.pdf = true;
    else if (a === "--strict") o.strict = true;
    else if (a === "-h" || a === "--help") o.help = true;
    else o.files.push(a);
  }
  return o;
}

(async () => {
  const opt = parseArgs(process.argv.slice(2));
  if (opt.help || !opt.files.length) {
    console.log("Foydalanish: node scripts/export-png.js <dars.js ...> [--out papka] [--dpi 300] [--pdf] [--strict]");
    process.exit(opt.help ? 0 : 1);
  }
  const root = path.resolve(__dirname, "..");
  const html = pathToFileURL(path.join(root, "template", "worksheet.html")).href;
  const outDir = path.resolve(opt.out);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  // A4 kengligi 794 CSS px (96 dpi). dpi/96 — piksel zichligi.
  const scale = opt.dpi / 96;
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: scale });
  let failed = false;

  for (const file of opt.files.filter(f => !path.basename(f).startsWith("_"))) {
    const lessonUrl = pathToFileURL(path.resolve(file)).href;
    const page = await ctx.newPage();
    page.on("pageerror", e => console.error(`  ✗ ${file}: ${e.message}`));
    await page.goto(`${html}?export=1&lesson=${encodeURIComponent(lessonUrl)}`, { waitUntil: "load" });
    try {
      await page.waitForSelector("body[data-ready]", { timeout: 15000 });
    } catch {
      console.error(`  ✗ ${file}: sahifa tayyor bo‘lmadi (dars faylida sintaksis xatosi bormi?)`);
      failed = true; await page.close(); continue;
    }

    const { report, missing, warnings, slug } = await page.evaluate(() => ({
      report: window.ZARRA.report,
      missing: window.ZARRA.missing || [],
      warnings: window.ZARRA.warnings || [],
      slug: (window.ZARRA.data.meta && window.ZARRA.data.meta.slug) || null,
    }));
    const name = slug || path.basename(file, path.extname(file));

    const pages = page.locator(".page");
    const n = await pages.count();
    for (let i = 0; i < n; i++) {
      const p = path.join(outDir, `${name}-${i + 1}.png`);
      // Aniq A4 o‘lchami: kesish ramkasi butun pikselga yaxlitlanadi
      const b = await pages.nth(i).boundingBox();
      await page.setViewportSize({ width: 900, height: Math.ceil(b.y + b.height) + 10 });
      await page.screenshot({ path: p, animations: "disabled",
        clip: { x: Math.round(b.x), y: Math.round(b.y), width: Math.round(b.width), height: Math.round(b.height) } });
      console.log(`  ✓ ${path.relative(process.cwd(), p)}`);
    }
    if (opt.pdf) {
      const p = path.join(outDir, `${name}.pdf`);
      await page.pdf({ path: p, format: "A4", printBackground: true, preferCSSPageSize: true });
      console.log(`  ✓ ${path.relative(process.cwd(), p)}`);
    }

    warnings.forEach(w => console.warn(`  ⚠ ${w}`));
    if (warnings.length && opt.strict) failed = true;
    if (missing.length) {
      console.warn(`  ⚠ rasm topilmadi: ${missing.map(u => decodeURIComponent(u.replace(/^file:\/\//, ""))).join(", ")}`);
      if (opt.strict) failed = true;
    }
    const bad = report.filter(r => r.overflow);
    const shrunk = report.filter(r => !r.overflow && r.scale < 1);
    if (shrunk.length) console.log(`  · kichraytirildi: ${shrunk.map(r => `${r.where} (${Math.round(r.scale * 100)}%)`).join(", ")}`);
    if (bad.length) {
      console.warn(`  ⚠ sig‘madi: ${bad.map(r => r.where).join(", ")} — matnni qisqartiring.`);
      if (opt.strict) failed = true;
    }
    await page.close();
  }

  await browser.close();
  process.exit(failed ? 2 : 0);
})().catch(e => { console.error(e); process.exit(1); });
