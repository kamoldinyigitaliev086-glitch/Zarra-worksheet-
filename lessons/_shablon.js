/* ===== YANGI DARS SHABLONI =====
   1) Shu faylni nusxalang:  lessons/02-mavzu-nomi.js
   2) Faqat qo‘shtirnoq ichidagi matnlarni almashtiring.
   3) Ko‘rish:  template/worksheet.html?lesson=../lessons/02-mavzu-nomi.js
   4) PNG:      node scripts/export-png.js lessons/02-mavzu-nomi.js

   Matn belgilari:  **qalin**   H_2O (pastki indeks)   Fe^3+ yoki 10^{21} (yuqori)
                    ___ (yozish uchun bo‘sh joy)
   Keraksiz blokni o‘chirib tashlash mumkin — maket o‘zi moslashadi.
*/
ZARRA.lesson({
  meta: {
    slug: "kimyo7-02-mavzu",
    subject: "Kimyo",
    grade: 7,
    lessonNo: 2,
    quarter: "I chorak",
    topic: "Mavzu nomi",
    subtitle: "Qisqa savol yoki izoh"            // ixtiyoriy
  },

  theory: {
    goals: ["Maqsad 1", "Maqsad 2", "Maqsad 3", "Maqsad 4"],
    sections: [
      {
        title: "Birinchi bo‘lim",
        text: ["Asosiy matn. **Muhim atama** qalin yoziladi."],
        bullets: ["Band 1", "Band 2"],               // ixtiyoriy
        highlight: "Ajratib ko‘rsatiladigan qoida"  // ixtiyoriy
      },
      {
        title: "Ikkinchi bo‘lim",
        text: ["Matn..."],
        table: {                                    // ixtiyoriy
          head: ["Ustun 1", "Ustun 2"],
          rows: [["…", "…"], ["…", "…"]]
        }
      }
    ],
    keyTerms: [
      { term: "Atama", def: "ta’rifi" }
    ],
    fact: "Qiziqarli fakt",                         // ixtiyoriy
    notes: true                                      // false — qaydlar joyini o‘chiradi
  },

  exercises: [
    { type: "choice", title: "To‘g‘ri javobni belgilang", points: 2,
      items: [{ q: "Savol?", options: ["A", "B", "C", "D"] }] },

    { type: "fill", title: "Gaplarni to‘ldiring", points: 3,
      items: ["Gap ___ bilan.", "Ikkinchi ___ gap."] },

    { type: "match", title: "Moslang", points: 4,
      left: ["1-chi", "2-chi", "3-chi"], right: ["x", "y", "z"] },

    { type: "table", title: "Jadvalni to‘ldiring", points: 4,
      head: ["Berilgan", "Javob 1", "Javob 2"],
      rows: [["…"], ["…"], ["…"]] },                 // bo‘sh katak — o‘quvchi yozadi

    { type: "open", title: "Fikrlang va yozing", points: 2,
      questions: ["Ochiq savol?"] }
  ]
});
