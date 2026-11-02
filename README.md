# ZARRA worksheet — Kimyo, 7-sinf

Ikki sahifali A4 worksheet shabloni:

| Sahifa | Mazmuni |
|---|---|
| **1-sahifa · Nazariya** | sarlavha, o‘quvchi ma’lumotlari, mavzu, dars maqsadi, nazariya bo‘limlari (matn, ro‘yxat, jadval, ajratilgan qoida), «Yodda tuting», «Bilasizmi?», qaydlar uchun joy |
| **2-sahifa · Mashqlar** | 5 ta mashq kartochkasi (ball katakchasi bilan) va pastda jami ball |

## Tuzilishi

```
template/
  worksheet.html   – sahifa (brauzerda ochiladi)
  styles.css       – dizayn: tepadagi :root tokenlari + qat’iy A4 maket
  render.js        – dars ma’lumotini maketga joylaydi va matnni sig‘diradi
lessons/
  01-atom-va-molekula.js – namunaviy dars
  _shablon.js            – yangi dars uchun bo‘sh shablon
scripts/
  export-png.js    – PNG (va PDF) eksporti
```

**Mazmun va dizayn alohida saqlanadi.** Dars matni faqat `lessons/*.js` faylida turadi,
maket esa `template/` ichida. Shuning uchun yangi darsga o‘tishda maketga tegish shart emas.

## Yangi dars qo‘shish

1. `lessons/_shablon.js` dan nusxa oling, masalan: `lessons/02-moddalar.js`.
2. Qo‘shtirnoq ichidagi matnlarni almashtiring.
3. Ko‘rish uchun brauzerda oching:
   `template/worksheet.html?lesson=../lessons/02-moddalar.js`
   (parametrsiz ochilsa, namunaviy dars ko‘rsatiladi).

Matnda ishlatiladigan belgilar:

| Yozilishi | Natija |
|---|---|
| `**atom**` | **qalin** matn |
| `H_2O`, `X_{12}` | pastki indeks: H₂O |
| `Fe^3+`, `10^{21}` | yuqori indeks: Fe³⁺ |
| `___` | o‘quvchi yozadigan bo‘sh joy |

Mashq turlari (`type`):

| Turi | Maydonlari |
|---|---|
| `choice` | `items: [{ q, options: [..] }]`: test, a/b/c/d variantlar |
| `fill` | `items: ["... ___ ..."]`: gapni to‘ldirish |
| `match` | `left: [..]`, `right: [..]`: moslashtirish |
| `table` | `head: [..]`, `rows: [["berilgan"], ..]`: bo‘sh kataklarni o‘quvchi to‘ldiradi |
| `open` | `questions: [".."]`: ochiq savol va yozish chiziqlari |

Ixtiyoriy maydonlar: `points` (ball), `instruction` (ko‘rsatma), `weight` (ortib qolgan
bo‘sh joyning shu mashqqa beriladigan ulushi, standart qiymati 1), `lines: true` (istalgan
mashq ostiga yozish chiziqlari) va `minLines` (chiziqlarning eng kam soni).

## Maket nega buzilmaydi

- Sahifa o‘lchami qat’iy: 210 × 297 mm. Sarlavha, mavzu lentasi va footer joyidan siljimaydi.
- Mazmun maydonidagi barcha o‘lchamlar `em` birligida. Matn sig‘masa, `render.js` uni
  bir tekis kichraytiradi (eng kami 60% gacha). 2-sahifadagi 5 ta mashqning shrifti doim bir xil bo‘ladi.
- Mazmun kam bo‘lsa, bo‘sh joyni yozish chiziqlari to‘ldiradi va sahifa to‘liq ko‘rinadi.
- Mavzu nomi 2 qatordan, mashq sarlavhasi 1 qatordan oshmaydi.
- Matn 60% da ham sig‘masa, ekranda qizil uzuq chiziqli ramka va ogohlantirish chiqadi,
  eksport skripti esa `⚠ sig‘madi` deb xabar beradi.

## PNG sifatida chiqarish

**1-usul. Skript orqali** (tavsiya etiladi; aniq 300 dpi, A4 = 2481 × 3509 px):

```bash
npm install                 # bir marta (Playwright)
npx playwright install chromium
node scripts/export-png.js lessons/01-atom-va-molekula.js
npm run export              # lessons/ dagi barcha darslar → output/
```

Parametrlar: `--out papka`, `--dpi 300`, `--pdf` (A4 PDF ham chiqaradi), `--strict`
(matn sig‘masa, xato kodi bilan tugaydi). Natija `output/<slug>-1.png` va
`output/<slug>-2.png` fayllariga yoziladi. `_` bilan boshlanadigan fayllar eksport qilinmaydi.

**2-usul. Brauzerdan.** `worksheet.html` dagi «PNG · 1-sahifa» va «PNG · 2-sahifa»
tugmalari (internet kerak). «Chop etish / PDF» tugmasi A4 formatda chop etadi.

## Dizaynni namunaga moslash

Ranglar, shriftlar va asosiy o‘lchamlar `template/styles.css` boshidagi `:root` blokida
joylashgan (`--brand`, `--accent`, `--font-head` va boshqalar). Namunadagi dizaynga
o‘tkazish uchun shu tokenlarni almashtirish kifoya. Logotip, bezak va ikonkalar
`template/render.js` boshidagi SVG’larda turadi.
