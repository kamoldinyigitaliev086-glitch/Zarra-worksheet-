/* 9-dars · Kimyoviy formulalar
   Rasmlar: lessons/img/09/ (Canva orqali yaratiladi). Hozircha "img" bo‘sh —
   "alt" da qanday rasm kerakligi yozilgan, sahifada o‘rni chizilib turadi. */
ZARRA.lesson({
  meta: {
    slug: "kimyo7-09-kimyoviy-formulalar",
    grade: 7,
    lessonNo: 9,
    topic: "KIMYOVIY FORMULALAR"
  },

  /* ============ 1-SAHIFA · NAZARIYA ============ */
  theory: [
    {
      title: "Kimyoviy formula nima?",
      blocks: [
        { type: "def", img: "", alt: "suv molekulasi modeli (H₂O)", imgWidth: "48%", text: [
          "**Kimyoviy formula** — moddaning tarkibini kimyoviy belgilar va indekslar yordamida qisqa ifodalash.",
          "**Masalan:** H_2O — suv, CO_2 — karbonat angidrid, NaCl — osh tuzi."
        ] }
      ]
    },
    {
      title: "Formula nimalardan iborat?",
      blocks: [
        { type: "cards", align: "left", items: [
          { title: "Kimyoviy belgi", text: "Modda tarkibiga qaysi elementlar kirishini ko‘rsatadi.",
            box: "H, O", boxBig: true, img: "", alt: "H va O element kubiklari", imgWidth: "40%" },
          { title: "Indeks", text: "Belgining o‘ng tomonida pastroqda yoziladi va atomlar sonini ko‘rsatadi.",
            box: "H_2O", boxBig: true, img: "", alt: "2 ta vodorod, 1 ta kislorod sharchasi", imgWidth: "40%" },
          { title: "Koeffitsiyent", text: "Formula oldiga yoziladi va molekulalar sonini ko‘rsatadi.",
            box: "3H_2O", boxBig: true, img: "", alt: "3 ta suv molekulasi modeli", imgWidth: "40%" }
        ] }
      ]
    },
    {
      title: "Formulalar qanday o‘qiladi?",
      blocks: [
        { type: "table",
          head: ["Formula", "O‘qilishi", "Tarkibi", "Moddaning nomi"],
          rows: [
            ["H_2O", "ash-ikki-o", "2 ta H, 1 ta O", "suv"],
            ["CO_2", "se-o-ikki", "1 ta C, 2 ta O", "karbonat angidrid"],
            ["O_2", "o-ikki", "2 ta O", "kislorod"],
            ["NaCl", "natriy-xlor", "1 ta Na, 1 ta Cl", "osh tuzi"],
            ["NH_3", "en-ash-uch", "1 ta N, 3 ta H", "ammiak"]
          ] },
        { type: "alert", label: "Muhim!", text: "Indeks 1 bo‘lsa, u yozilmaydi: CO_2 da uglerod atomi 1 ta." }
      ]
    },
    {
      title: "Kundalik hayotdagi moddalar formulalari",
      blocks: [
        { type: "gallery", items: [
          { img: "", alt: "stakandagi suv",        caption: "**Suv** — H_2O" },
          { img: "", alt: "osh tuzi kristallari",  caption: "**Osh tuzi** — NaCl" },
          { img: "", alt: "gazli suv pufakchalari", caption: "**Karbonat angidrid** — CO_2" },
          { img: "", alt: "kislorod ballon",       caption: "**Kislorod** — O_2" }
        ] }
      ]
    },
    {
      title: "Muhim xulosa",
      blocks: [
        { type: "checklist", items: [
          "Kimyoviy formula modda tarkibini qisqa ko‘rinishda ifodalaydi.",
          "Indeks atomlar sonini, koeffitsiyent molekulalar sonini ko‘rsatadi.",
          "Oddiy modda formulasida bitta element bor: O_2, N_2, Fe.",
          "Murakkab modda formulasida bir nechta element bor: H_2O, CO_2, NaCl."
        ] }
      ]
    }
  ],

  /* ============ 2-SAHIFA · 5 TA MASHQ ============ */
  exercises: [
    {
      type: "images", title: "Rasmlarga qarab formulasini yozing.",
      instruction: "Rasmdagi moddaning kimyoviy formulasini katakka yozing.",
      lines: 1,
      items: [
        { img: "", alt: "stakandagi suv",       caption: "suv" },
        { img: "", alt: "osh tuzi",             caption: "osh tuzi" },
        { img: "", alt: "gazli ichimlik",       caption: "karbonat angidrid" },
        { img: "", alt: "kislorod ballon",      caption: "kislorod" },
        { img: "", alt: "ammiak shishasi",      caption: "ammiak" }
      ]
    },
    [
      {
        type: "match", title: "Moslashtiring.", span: 1.2,
        instruction: "Formulalarni moddalarning nomlari bilan moslashtiring.",
        left: ["H_2O", "NaCl", "CO_2", "O_2", "N_2"],
        right: ["kislorod", "azot", "suv", "karbonat angidrid", "osh tuzi"]
      },
      {
        type: "rewrite", title: "Formula ko‘rinishida yozing.",
        instruction: "O‘qilishiga qarab formulani yozing.",
        items: ["ash-ikki-o", "se-o-ikki", "en-ikki", "natriy-xlor", "en-ash-uch"]
      }
    ],
    {
      type: "truefalse", title: "To‘g‘ri yoki noto‘g‘ri?",
      instruction: "Quyidagi fikrlarni to‘g‘ri (T) yoki noto‘g‘ri (N) ekanini belgilang.",
      items: [
        "H_2O formulasida 2 ta kislorod atomi bor.",
        "Indeks atomlar sonini ko‘rsatadi.",
        "3H_2O — 3 ta suv molekulasi.",
        "O_2 — murakkab modda.",
        "Koeffitsiyent formula oldiga yoziladi."
      ]
    },
    [
      {
        type: "questions", title: "Savollarga javob bering.", span: 1.2,
        items: [
          { q: "Indeks va koeffitsiyentning farqi nimada?", lines: 3 },
          { q: "2CO_2 yozuvida nechta uglerod va nechta kislorod atomi bor?",
            prompts: ["Uglerod atomlari: ___", "Kislorod atomlari: ___"] }
        ]
      },
      {
        type: "case", title: "Hayotiy vaziyat.", number: false, color: "blue",
        instruction: "Oshxonadagi qaysi moddalarning formulasini bilasiz? 3 ta misol yozing.",
        images: [{ img: "", alt: "oshxona stoli: tuz, shakar, suv" }],
        lines: 3
      }
    ]
  ]
});
