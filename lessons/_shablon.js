/* =====================================================================
   YANGI DARS SHABLONI (ZARRA · 7-sinf kimyo)
   1) Nusxa oling:   lessons/09-mavzu-nomi.js
   2) Matn va rasm yo‘llarini almashtiring (rasmlar: lessons/img/09/...).
   3) Ko‘rish:       template/worksheet.html?lesson=../lessons/09-mavzu-nomi.js
   4) PNG:           node scripts/export-png.js lessons/09-mavzu-nomi.js

   Matnda:  **qalin**   H_2O (pastki indeks)   Fe^3+, 10^{21} (yuqori)   ___ (bo‘sh joy)
   Rasm ko‘rsatilmasa ("img" yo‘q yoki "") — o‘rnida bo‘sh joy chiziladi, maket buzilmaydi.

   Ro‘yxatda [ A, B ] — ikki bo‘lim/mashq YONMA-YON turadi ("span" — kenglik ulushi).
   "color": blue | green | orange | purple | teal | red | pink (berilmasa — namunadagi tartib).
   "number": false — raqamsiz bo‘lim (masalan, «Hayotiy vaziyat»).
   ===================================================================== */
ZARRA.lesson({
  meta: {
    slug: "kimyo7-09-mavzu",     // PNG fayl nomi
    grade: 7,
    lessonNo: 9,
    topic: "MAVZU NOMI"          // bir qatorga sig‘maguncha avtomatik kichrayadi
  },

  /* ======================= 1-SAHIFA · NAZARIYA ======================= */
  theory: [
    {
      title: "Ta’rif va rasm",
      blocks: [
        // def — oq ramkadagi ta’rif; img bo‘lsa, o‘ngda rasm (imgWidth — rasm kengligi)
        { type: "def", img: "", imgWidth: "50%", text: [
          "**Atama** — uning ta’rifi shu yerda yoziladi.",
          "**Masalan:** misollar."
        ] }
      ]
    },
    {
      title: "Kartochkalar",
      lead: "Bo‘lim sarlavhasi ostidagi qisqa izoh (ixtiyoriy).",
      blocks: [
        // cards — rangli sarlavhali kartochkalar. Har birida: text, list, box, img
        // imgSide: "right" — rasm o‘ngda;  box + img — pastda yonma-yon
        { type: "cards", items: [
          { title: "Birinchi", text: "Qisqa tushuntirish.", img: "" },
          { title: "Ikkinchi", text: "Qisqa tushuntirish.", box: "H, O, C", boxBig: true, img: "" },
          { title: "Uchinchi", text: "Qisqa tushuntirish.", img: "", imgSide: "right" }
        ] }
      ]
    },
    [
      {
        title: "Jadval",
        blocks: [
          { type: "table", head: ["Jihat", "Birinchi", "Ikkinchi"],
            rows: [["Tarkib", "o‘zgarmaydi", "o‘zgaradi"], ["Misol", "…", "…"]] }
        ]
      },
      {
        title: "Element plitkalari",
        blocks: [
          // tiles — katta belgi + nom + rasm
          { type: "tiles", cols: 2, items: [
            { symbol: "H", name: "Vodorod", img: "" },
            { symbol: "O", name: "Kislorod", img: "" }
          ] }
        ]
      }
    ],
    {
      title: "Galereya va bosqichlar",
      blocks: [
        // gallery — rasmlar qatori: title (ustida), caption (ostida)
        { type: "gallery", items: [
          { title: "Birinchi", img: "", caption: "**Izoh** — matn" },
          { title: "Ikkinchi", img: "", caption: "**Izoh** — matn" },
          { title: "Uchinchi", img: "", caption: "**Izoh** — matn" },
          { title: "To‘rtinchi", img: "", caption: "**Izoh** — matn" }
        ] },
        // steps — strelkali jarayon:  { type: "steps", items: [{ img, caption }, ...] }
        { type: "alert", label: "Muhim!", text: "Ogohlantirish matni." },
        // checklist — «Muhim xulosa» uslubidagi belgili ro‘yxat
        { type: "checklist", items: ["Birinchi xulosa.", "Ikkinchi xulosa."] }
        // text — oddiy paragraf:  { type: "text", text: ["..."] }
      ]
    }
  ],

  /* ======================= 2-SAHIFA · 5 TA MASHQ ======================= */
  exercises: [
    {
      // images — raqamli rasmlar + javob katagi. lines: katakdagi qatorlar soni
      // caption — rasm ostidagi yozuv; badges: false — raqamsiz; bank — o‘ngdagi so‘zlar ro‘yxati
      type: "images", title: "Rasmlarga qarab aniqlang.",
      instruction: "Ko‘rsatma matni.",
      lines: 1,
      items: [{ img: "", caption: "birinchi" }, { img: "", caption: "ikkinchi" }, { img: "", caption: "uchinchi" },
              { img: "", caption: "to‘rtinchi" }, { img: "", caption: "beshinchi" }]
      // bank: { title: "Moddalar:", items: ["Temir", "Shisha"] }
    },
    [
      {
        // match — moslashtirish (chapda raqam + katak, o‘ngda A, B, C...)
        type: "match", title: "Moslashtiring.", span: 1.2,
        instruction: "Ko‘rsatma matni.",
        left: ["Birinchi", "Ikkinchi", "Uchinchi"],
        right: ["A javob", "B javob", "C javob"]
      },
      {
        // rewrite — «fe → [ ]» ko‘rinishidagi to‘g‘rilash
        type: "rewrite", title: "To‘g‘ri yozing.",
        instruction: "Ko‘rsatma matni.",
        items: ["fe", "CU", "al"]
      }
    ],
    {
      // truefalse — T / N kataklari
      type: "truefalse", title: "To‘g‘ri yoki noto‘g‘ri?",
      instruction: "Fikrlarni o‘qing. To‘g‘ri (T) yoki noto‘g‘ri (N) ekanini belgilang.",
      items: ["Birinchi fikr.", "Ikkinchi fikr.", "Uchinchi fikr."]
    },
    // table — to‘ldiriladigan jadval. Bo‘sh katak = o‘quvchi yozadi.
    //   head elementi { text, sub } bo‘lsa — kichik izoh qo‘shiladi; rowColors: true — rangli 1-ustun
    // choice — test: items: [{ q, options: [...] }];  fill — gap to‘ldirish: items: ["... ___ ..."]
    [
      {
        // questions — savollar va yozish chiziqlari (cols: 2 — ikki ustun, boxed: true — ramkali)
        //   prompts: ["Fizik xossa: ___"] — chiziqlar o‘rniga shablonli qatorlar
        type: "questions", title: "Savollarga javob bering.",
        items: [{ q: "Birinchi savol?", lines: 3 }, { q: "Ikkinchi savol?", lines: 3 }]
      },
      {
        // case — rasm(lar) + raqamli javob qatorlari.
        //   layout: "stack" (rasm tepada) | "side" (rasm chapda) | "pairs" (har rasmga o‘z qatorlari)
        //   arrows: true — rasmlar orasida strelka;  prompts: ["Qattiq → Suyuq: ___", "Savol?"]
        type: "case", title: "Hayotiy vaziyat.", number: false,   // raqamsiz, 5-mashq yonida
        instruction: "Ko‘rsatma matni.",
        images: [{ img: "" }],
        lines: 3
      }
    ]
  ]
});
