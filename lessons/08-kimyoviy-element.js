/* 8-dars · Kimyoviy element va kimyoviy belgilar
   (docs/namuna/08-dars-*.jpg namunasi asosida). Rasmlar: lessons/img/08/ */
ZARRA.lesson({
  meta: {
    slug: "kimyo7-08-kimyoviy-element",
    grade: 7,
    lessonNo: 8,
    topic: "KIMYOVIY ELEMENT VA KIMYOVIY BELGILAR"
  },

  /* ============ 1-SAHIFA · NAZARIYA ============ */
  theory: [
    {
      title: "Kimyoviy element nima?",
      blocks: [
        { type: "def", img: "img/08/elementlar.jpg", imgWidth: "54%", text: [
          "**Kimyoviy element** — yadrosidagi protonlar soni bir xil bo‘lgan atomlar turi.",
          "**Masalan:** H, O, Fe, Cu, Al, Au — kimyoviy element belgilaridir."
        ] }
      ]
    },
    {
      title: "Kimyoviy belgilarni yozish qoidalari",
      blocks: [
        { type: "cards", align: "left", items: [
          { title: "1-harf katta yoziladi", text: "Element belgisining birinchi harfi har doim katta yoziladi.",
            box: "H, O, C", boxBig: true, img: "img/08/tile-c.jpg", imgWidth: "34%", imgFit: "contain" },
          { title: "2-harf kichik yoziladi", text: "Agar element belgisida ikkinchi harf bo‘lsa, u kichik yoziladi.",
            box: "Na, Fe, Cl", boxBig: true, img: "img/08/tile-na.jpg", imgWidth: "34%", imgFit: "contain" },
          { title: "Belgilar qisqa yoziladi", text: "Har bir elementning o‘ziga xos qisqa belgisi bor. U 1 yoki 2 harfdan iborat bo‘ladi.",
            box: "Har bir elementning o‘z belgisi bor.", img: "img/08/kolbalar.jpg", imgSide: "right", imgWidth: "30%" }
        ] }
      ]
    },
    {
      title: "Ba’zi muhim elementlar va ularning belgilari",
      blocks: [
        { type: "tiles", cols: 4, items: [
          { symbol: "H",  name: "Vodorod",   img: "img/08/h.jpg" },
          { symbol: "O",  name: "Kislorod",  img: "img/08/o.jpg" },
          { symbol: "C",  name: "Uglerod",   img: "img/08/c.jpg" },
          { symbol: "N",  name: "Azot",      img: "img/08/n.jpg" },
          { symbol: "Fe", name: "Temir",     img: "img/08/fe.jpg" },
          { symbol: "Cu", name: "Mis",       img: "img/08/cu.jpg" },
          { symbol: "Al", name: "Alyuminiy", img: "img/08/al.jpg" },
          { symbol: "Au", name: "Oltin",     img: "img/08/au.jpg" }
        ] }
      ]
    },
    {
      title: "Element, atom va oddiy modda farqi",
      blocks: [
        { type: "cards", align: "left", items: [
          { title: "Kimyoviy element", text: "Protonlar soni bir xil bo‘lgan atomlar turi.", img: "img/08/fe-sharlar.jpg", imgFit: "contain" },
          { title: "Atom", text: "Musbat zaryadlangan yadro va uning atrofida harakatlanadigan manfiy zaryadli elektronlardan iborat elektroneytral zarracha.", img: "img/08/atom.jpg", imgFit: "contain" },
          { title: "Oddiy modda", text: "Bir xil kimyoviy element atomlaridan tashkil topgan modda.", img: "img/08/metall.jpg", imgFit: "contain" }
        ].map(c => ({ ...c, imgPos: "center" })) }
      ]
    },
    {
      title: "Elementlarning hayotdagi ahamiyati",
      blocks: [
        { type: "gallery", items: [
          { img: "img/08/qurilish.jpg",  caption: "**Temir (Fe)** — qurilish va mashinasozlikda" },
          { img: "img/08/mis-sim.jpg",   caption: "**Mis (Cu)** — elektr simlarida" },
          { img: "img/08/alyuminiy.jpg", caption: "**Alyuminiy (Al)** — idishlar va qadoqlarda" },
          { img: "img/08/oltin.jpg",     caption: "**Oltin (Au)** — zargarlik buyumlarida" }
        ] }
      ]
    }
  ],

  /* ============ 2-SAHIFA · 5 TA MASHQ ============ */
  exercises: [
    {
      type: "images", title: "Rasmlarga qarab belgilang.",
      instruction: "Quyidagi rasmlarda ko‘rsatilgan elementlarni aniqlang va ularning kimyoviy belgilarini yozing.",
      lines: 2,
      items: [
        { img: "img/08/r1.jpg" }, { img: "img/08/r2.jpg" }, { img: "img/08/r3.jpg" },
        { img: "img/08/r4.jpg" }, { img: "img/08/r5.jpg" }
      ]
    },
    [
      {
        type: "match", title: "Moslashtiring.", span: 1.25,
        instruction: "Element nomlarini ularning kimyoviy belgilari bilan moslashtiring.",
        left: ["Temir", "Mis", "Alyuminiy", "Oltin", "Uglerod"],
        right: ["Au", "Fe", "C", "Al", "Cu"]
      },
      {
        type: "rewrite", title: "Belgilarni to‘g‘ri yozing.",
        instruction: "Noto‘g‘ri yozilgan belgilarni to‘g‘rilang.",
        items: ["fe", "CU", "al", "AU", "cU"]
      }
    ],
    {
      type: "truefalse", title: "To‘g‘ri yoki noto‘g‘ri?",
      instruction: "Fikrlarni o‘qing. To‘g‘ri (T) yoki noto‘g‘ri (N) ekanini belgilang.",
      items: [
        "Kimyoviy element — protonlar soni bir xil bo‘lgan atomlar turidir.",
        "Har bir elementning faqat bitta belgisi bo‘ladi.",
        "Element belgisi 1 yoki 2 harfdan iborat bo‘lishi mumkin.",
        "Element belgisining ikkinchi harfi hamisha katta yoziladi.",
        "**Fe** — temir elementining belgisidir."
      ]
    },
    [
      {
        type: "questions", title: "Savollarga javob bering.", span: 1.2,
        items: [
          { q: "Kimyoviy element va atom orasidagi farqni qisqacha yozing.", lines: 4 },
          { q: "Nima uchun kimyoviy belgilarni bilish muhim?", lines: 3 }
        ]
      },
      {
        type: "case", title: "Hayotiy vaziyat.", number: false, color: "blue",
        instruction: "Rasmdagi buyumlardan 3 tasini tanlang va ular qaysi element bilan bog‘liqligini yozing.",
        images: [{ img: "img/08/vaziyat.jpg" }],
        lines: 3
      }
    ]
  ]
});
