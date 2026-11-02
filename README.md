# ZARRA worksheet: Kimyo, 7-sinf

ZARRA kimyo online platformasi darslari uchun ikki sahifali A4 worksheet shabloni.
Dizayn `docs/namuna/` papkasidagi ZARRA namunalaridan olingan: logotip, «N-DARS» va
«7-SINF» belgilari, katta to‘q ko‘k sarlavha, rangli raqamlangan bo‘limlar
(1 ko‘k, 2 yashil, 3 to‘q sariq, 4 binafsha), rasmli kartochkalar va pastki to‘lqin.

| Sahifa | Mazmuni |
|---|---|
| **1-sahifa · Nazariya** | raqamlangan bo‘limlar: ta’rif, kartochkalar, element plitkalari, galereya, jadval, «Muhim!», «Muhim xulosa» |
| **2-sahifa · Mashqlar** | 5 ta mashq: rasmlar bo‘yicha, moslashtirish, to‘g‘rilash, to‘g‘ri/noto‘g‘ri, jadval, savollar, hayotiy vaziyat |

Tayyor namunalar: `lessons/08-kimyoviy-element.js` va `lessons/06-fizik-va-kimyoviy-hodisalar.js`
(natijasi `examples/` papkasida).

## Tuzilishi

```
template/
  worksheet.html   – sahifa (brauzerda ochiladi)
  styles.css       – dizayn: tepadagi :root tokenlari va qat’iy A4 maket
  render.js        – dars ma’lumotini maketga joylaydi va sahifaga sig‘diradi
  assets/logo.png  – (ixtiyoriy) asl ZARRA logotipi; bo‘lsa, avtomatik ishlatiladi
lessons/
  _shablon.js      – yangi dars uchun shablon (barcha blok turlari izohi bilan)
  08-….js, 06-….js – namunaviy darslar
  img/<dars>/      – dars rasmlari
scripts/
  export-png.js    – PNG (va PDF) eksporti
docs/namuna/       – asl dizayn namunalari
```

Mazmun (`lessons/*.js`) va dizayn (`template/`) alohida saqlanadi. Yangi dars uchun faqat dars faylini yozasiz.

## Yangi dars qo‘shish

1. `lessons/_shablon.js` dan nusxa oling, masalan `lessons/09-mavzu.js`.
2. Rasmlarni `lessons/img/09/` papkasiga qo‘ying. Ularning yo‘li dars fayliga nisbatan yoziladi: `img: "img/09/temir.jpg"`.
3. Matnlarni almashtiring.
4. Ko‘rish: `template/worksheet.html?lesson=../lessons/09-mavzu.js`.

Matnda ishlatiladigan belgilar: `**qalin**`, `H_2O` → H₂O, `Fe^3+` → Fe³⁺, `10^{21}`, `___` (bo‘sh joy).

### 1-sahifa: bo‘lim bloklari (`theory`)

| `type` | Ko‘rinishi |
|---|---|
| `def` | oq ramkadagi ta’rif, o‘ngda rasm (`img`, `imgWidth`) |
| `cards` | rangli sarlavhali kartochkalar: `text`, `list`, `box`, `img`, `imgSide: "right"` |
| `tiles` | element plitkalari: katta belgi, nom va rasm |
| `gallery` | rasmlar qatori: `title` (rasm ustida), `caption` (rasm ostida) |
| `steps` | strelkali jarayon (rasm ➜ rasm ➜ rasm) |
| `table` | ma’lumot jadvali |
| `alert` | pushti «Muhim!» qatori |
| `checklist` | yashil belgili xulosa ro‘yxati |
| `text` | oddiy paragraf |

### 2-sahifa: mashq turlari (`exercises`)

| `type` | Ko‘rinishi |
|---|---|
| `images` | raqamli rasmlar va javob kataklari (`caption`, `lines`, `bank`) |
| `match` | moslashtirish: chapda raqam va katak, o‘ngda A, B, C… |
| `rewrite` | `fe → [ ]` ko‘rinishida to‘g‘rilash |
| `truefalse` | to‘g‘ri (T) / noto‘g‘ri (N) kataklari |
| `table` | to‘ldiriladigan jadval (`rowColors`, `{ text, sub }` sarlavhalar) |
| `questions` | savollar va chiziqlar (`cols: 2`, `boxed`, `prompts`) |
| `case` | hayotiy vaziyat: rasm(lar) va javob qatorlari (`layout: stack / side / pairs`, `arrows`) |
| `choice`, `fill` | test va gapni to‘ldirish |

Umumiy maydonlar:

| Maydon | Vazifasi |
|---|---|
| `title`, `lead` / `instruction` | sarlavha va uning ostidagi izoh |
| `color` | rangni o‘zgartirish |
| `number: false` | raqamsiz bo‘lim yoki mashq |
| `[A, B]` | ikkita bo‘lim yoki mashqni yonma-yon qo‘yish |
| `span` | yonma-yon turganda kenglik ulushi |
| `weight` | bo‘sh joy ulushi |

## Maket nega buzilmaydi

- Sahifa o‘lchami qat’iy (210 × 297 mm). Sarlavha, logotip va pastki to‘lqin joyidan siljimaydi.
- Mavzu nomi bir qatorga sig‘maguncha kichrayadi. Juda uzun bo‘lsa, 2 qatorga o‘tadi.
- Bo‘limlar ichidagi barcha o‘lchamlar `em` birligida. Mazmun ko‘p bo‘lsa, sahifa bir tekis
  kichraytiriladi (eng kami 60% gacha).
- Rasmlar o‘z kartochkasini to‘ldiradi (`object-fit: cover`), shuning uchun rasm o‘lchami maketga ta’sir qilmaydi.
- Rasm berilmasa yoki topilmasa, o‘rnida bo‘sh joy chiziladi. Eksport skripti buni ogohlantiradi.
- Mazmun kam bo‘lsa, rasmlar va yozish chiziqlari kattalashib, bo‘sh joyni to‘ldiradi.

## PNG sifatida chiqarish

**1-usul. Skript orqali** (tavsiya etiladi; 300 dpi, A4 = 2481 × 3509 px):

```bash
npm install && npx playwright install chromium     # bir marta
node scripts/export-png.js lessons/08-kimyoviy-element.js
npm run export                                      # barcha darslar → output/
```

Parametrlar:

| Parametr | Vazifasi |
|---|---|
| `--out papka` | natijalar papkasi |
| `--dpi 300` | aniqlik |
| `--pdf` | A4 PDF ham chiqaradi |
| `--strict` | matn sig‘masa yoki rasm topilmasa, xato kodi bilan tugaydi |

Natija `<slug>-1.png` va `<slug>-2.png` fayllariga yoziladi.

**2-usul. Brauzerdan.** Sahifadagi «PNG · 1-sahifa», «PNG · 2-sahifa» va «Chop etish / PDF» tugmalari.

## Dizaynni sozlash

- **Ranglar va shriftlar:** `template/styles.css` boshidagi `:root` va `.c-blue`, `.c-green`… bloklari.
  Asosiy shrift Roboto Condensed, logotip shrifti Poppins.
- **Logotip:** asl ZARRA logotipini `template/assets/logo.png` nomi bilan qo‘ysangiz, chizilgan logotip o‘rniga o‘sha ishlatiladi.
- **Pastki yozuvlar:** `meta.footer` («KIMYO ONLINE PLATFORMASI») va `meta.site` («zarra.uz»).
