/* 6-dars · Fizik va kimyoviy hodisalar
   (docs/namuna/06-dars-*.jpg namunasi asosida). Rasmlar: lessons/img/06/ */
ZARRA.lesson({
  meta: {
    slug: "kimyo7-06-fizik-va-kimyoviy-hodisalar",
    grade: 7,
    lessonNo: 6,
    topic: "FIZIK VA KIMYOVIY HODISALAR"
  },

  theory: [
    {
      title: "Fizik hodisa nima?",
      lead: "Fizik hodisa — moddaning tarkibi o‘zgarmasdan, faqat holati, shakli yoki ko‘rinishi o‘zgaradigan jarayon.",
      blocks: [
        { type: "gallery", items: [
          { title: "Muzning erishi",        img: "img/06/muz.jpg" },
          { title: "Suvning bug‘lanishi",   img: "img/06/bug.jpg" },
          { title: "Qog‘ozning yirtilishi", img: "img/06/qogoz.jpg" }
        ] }
      ]
    },
    {
      title: "Kimyoviy hodisa nima?",
      lead: "Kimyoviy hodisa — bir moddaning boshqa moddaga aylanishi bilan kechadigan jarayon.",
      blocks: [
        { type: "gallery", items: [
          { title: "Temirning zanglashi",     img: "img/06/zang.jpg" },
          { title: "Yog‘ochning yonishi",     img: "img/06/olov.jpg" },
          { title: "Sutning nordonlashishi",  img: "img/06/sut.jpg" }
        ] }
      ]
    },
    {
      title: "Fizik va kimyoviy hodisalarning farqi",
      blocks: [
        { type: "table",
          head: ["Taqqoslash jihati", "Fizik hodisa", "Kimyoviy hodisa"],
          rows: [
            ["Yangi modda hosil bo‘lishi", "Hosil bo‘lmaydi", "Hosil bo‘ladi"],
            ["Tarkib", "O‘zgarmaydi", "O‘zgaradi"],
            ["Misollar", "erish, bug‘lanish, maydalanish", "yonish, zanglash, nordonlashish"]
          ] }
      ]
    },
    {
      title: "Kimyoviy hodisaning belgilariga ehtiyot bo‘ling",
      blocks: [
        { type: "gallery", items: [
          { title: "Rang o‘zgarishi",              img: "img/06/rang.jpg" },
          { title: "Gaz ajralishi",                img: "img/06/gaz.jpg" },
          { title: "Cho‘kma hosil bo‘lishi",       img: "img/06/chokma.jpg" },
          { title: "Issiqlik yoki yorug‘lik ajralishi", img: "img/06/issiqlik.jpg" }
        ] },
        { type: "alert", label: "Muhim:", text: "bu belgilar har doim ham kimyoviy hodisa bo‘ldi degani emas. Asosiy savol — yangi modda hosil bo‘ldimi?" }
      ]
    },
    {
      title: "Muhim xulosa",
      color: "green",
      blocks: [
        { type: "checklist", items: [
          "Fizik hodisada moddaning tarkibi o‘zgarmaydi.",
          "Kimyoviy hodisada yangi modda hosil bo‘ladi.",
          "Erish va bug‘lanish — fizik hodisalar.",
          "Yonish va zanglash — kimyoviy hodisalar."
        ] }
      ]
    }
  ],

  exercises: [
    {
      type: "images", title: "Rasmlarni tahlil qiling.",
      instruction: "Har bir jarayonning fizik (F) yoki kimyoviy (K) hodisa ekanini yozing.",
      badges: false, lines: 1,
      items: [
        { img: "img/06/p-muz.jpg",     caption: "muzning erishi" },
        { img: "img/06/p-qaynash.jpg", caption: "suvning qaynashi" },
        { img: "img/06/p-zang.jpg",    caption: "temirning zanglashi" },
        { img: "img/06/p-sham.jpg",    caption: "shamning yonishi" },
        { img: "img/06/p-qogoz.jpg",   caption: "qog‘ozning yirtilishi" },
        { img: "img/06/p-tuxum.jpg",   caption: "tuxumning pishishi" }
      ]
    },
    {
      type: "table", title: "Jadvalni to‘ldiring.",
      instruction: "Jarayonlarni turiga qarab ajrating.",
      rowColors: true,
      head: ["Jarayon", "Fizik / Kimyoviy", "Sababi"],
      rows: [["Shakarni maydalash"], ["Sutning nordonlashishi"], ["Muzning erishi"], ["Temirning zanglashi"]]
    },
    {
      type: "truefalse", title: "To‘g‘ri yoki noto‘g‘ri?",
      instruction: "Quyidagi fikrlarni to‘g‘ri (T) yoki noto‘g‘ri (N) ekanini belgilang.",
      items: [
        "Fizik hodisada yangi modda hosil bo‘ladi.",
        "Kimyoviy hodisada moddaning tarkibi o‘zgaradi.",
        "Muzning erishi kimyoviy hodisadir.",
        "Yog‘ochning yonishi kimyoviy hodisadir.",
        "Qog‘ozni yirtish fizik hodisadir."
      ]
    },
    [
      {
        type: "questions", title: "Savollarga javob bering.",
        items: [
          { q: "Fizik hodisa bilan kimyoviy hodisaning asosiy farqi nimada?", lines: 3 },
          { q: "Kundalik hayotdan bittadan fizik va kimyoviy hodisaga misol yozing.", lines: 3 }
        ]
      },
      {
        type: "case", title: "Hayotiy vaziyat.",
        instruction: "Qaysi biri fizik, qaysi biri kimyoviy hodisa? Nima uchun?",
        images: [{ img: "img/06/v-qaynash.jpg" }, { img: "img/06/v-sham.jpg" }],
        numbered: false, lines: 4
      }
    ]
  ]
});
