/* Namunaviy dars. Yangi dars uchun: _shablon.js dan nusxa oling,
   matnlarni almashtiring — maket o‘zgarmaydi. */
ZARRA.lesson({
  meta: {
    slug: "kimyo7-01-atom-va-molekula",   // PNG fayl nomi uchun
    subject: "Kimyo",
    grade: 7,
    lessonNo: 1,
    quarter: "I chorak",
    topic: "Atom va molekula. Kimyoviy element",
    subtitle: "Moddalar qanday zarrachalardan tuzilgan?"
  },

  theory: {
    goals: [
      "Atom va molekula tushunchalarini bilish",
      "Atom tuzilishini tushuntira olish",
      "Kimyoviy belgilarni o‘qiy olish",
      "Oddiy va murakkab moddalarni farqlash"
    ],
    sections: [
      {
        title: "Atom nima?",
        text: [
          "**Atom** — moddaning kimyoviy yo‘l bilan bo‘linmaydigan eng kichik zarrachasi. Atom markazida musbat zaryadli **yadro** joylashgan, uning atrofida manfiy zaryadli **elektronlar** (e^−) harakatlanadi."
        ],
        bullets: [
          "Yadro **protonlar** (p^+) va **neytronlardan** (n^0) tashkil topgan.",
          "Atomda protonlar soni elektronlar soniga teng, shuning uchun atom elektroneytral."
        ]
      },
      {
        title: "Molekula",
        text: [
          "**Molekula** — moddaning kimyoviy xossalarini saqlovchi eng kichik zarrachasi. Molekulalar atomlarning o‘zaro birikishidan hosil bo‘ladi."
        ],
        highlight: "H_2O — suv molekulasi: 2 ta vodorod (H) va 1 ta kislorod (O) atomidan iborat."
      },
      {
        title: "Kimyoviy element va uning belgisi",
        text: [
          "**Kimyoviy element** — bir xil turdagi atomlar majmui. Har bir element lotincha nomining bosh harfi (yoki bosh va keyingi harfi) bilan belgilanadi."
        ],
        table: {
          head: ["Element", "Belgisi", "Lotincha nomi", "O‘qilishi"],
          rows: [
            ["Vodorod", "H", "Hydrogenium", "ash"],
            ["Kislorod", "O", "Oxygenium", "o"],
            ["Uglerod", "C", "Carboneum", "se"],
            ["Temir", "Fe", "Ferrum", "ferrum"]
          ]
        }
      },
      {
        title: "Oddiy va murakkab moddalar",
        bullets: [
          "**Oddiy moddalar** bir xil element atomlaridan tuzilgan: O_2, H_2, Fe.",
          "**Murakkab moddalar** turli element atomlaridan tuzilgan: H_2O, CO_2, NaCl."
        ]
      }
    ],
    keyTerms: [
      { term: "Atom", def: "kimyoviy bo‘linmaydigan eng kichik zarracha" },
      { term: "Molekula", def: "modda xossalarini saqlovchi eng kichik zarracha" },
      { term: "Element", def: "bir xil turdagi atomlar majmui" }
    ],
    fact: "Bir tomchi suvda taxminan 1,7·10^{21} ta suv molekulasi bor!"
  },

  /* 5 ta mashq. type: choice | fill | match | table | open
     weight — mashqqa ajratiladigan balandlik ulushi (standart 1). */
  exercises: [
    {
      type: "choice", title: "To‘g‘ri javobni belgilang", points: 2, weight: 1.15,
      items: [
        { q: "Moddaning kimyoviy xossalarini saqlovchi eng kichik zarracha:",
          options: ["atom", "molekula", "elektron", "yadro"] },
        { q: "Atom yadrosi tarkibiga nimalar kiradi?",
          options: ["proton va elektron", "proton va neytron", "faqat elektron", "neytron va elektron"] }
      ]
    },
    {
      type: "fill", title: "Gaplarni to‘ldiring", points: 3, weight: 1,
      items: [
        "Atom markazida musbat zaryadli ___ joylashgan.",
        "Kislorodning kimyoviy belgisi — ___ .",
        "H_2O molekulasida ___ ta vodorod atomi bor."
      ]
    },
    {
      type: "match", title: "Element va uning belgisini moslang", points: 4, weight: 1,
      instruction: "Raqam va harfni juftlab yozing.",
      left: ["Temir", "Natriy", "Uglerod", "Azot"],
      right: ["C", "N", "Fe", "Na"]
    },
    {
      type: "table", title: "Jadvalni to‘ldiring", points: 4, weight: 1.3,
      head: ["Formula", "Oddiy yoki murakkab?", "Tarkibidagi elementlar"],
      rows: [["O_2"], ["CO_2"], ["Fe"], ["H_2O"]]
    },
    {
      type: "open", title: "Fikrlang va yozing", points: 2, weight: 1.05,
      questions: ["Nima uchun suv (H_2O) murakkab modda, kislorod (O_2) esa oddiy modda hisoblanadi? Javobingizni asoslang."]
    }
  ]
});
