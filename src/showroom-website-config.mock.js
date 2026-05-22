export const createMockShowroomWebsiteConfig = () => ({
  company: {
    companyId: 1,
    name: "盈泰医疗",
    nameEn: "Yingtai Medical",
    homeImageUrl: "https://cdn.example.com/company-home.png",
    subtitleZh: "盈泰医疗公开讲解（中文）",
    subtitleEn: "Yingtai Medical public narration in English",
    audioZhUrl: "https://cdn.example.com/company-zh.mp3",
    audioEnUrl: "https://cdn.example.com/company-en.mp3",
    bilingualPublicFields: [
      {
        fieldCode: "development_history",
        labelZh: "发展历程",
        labelEn: "Development History",
        valueZh: "盈泰医疗自介入器械起步，逐步形成研发、制造与平台孵化能力。",
        valueEn: "Yingtai Medical started from interventional devices and gradually formed R&D, manufacturing, and platform incubation capabilities."
      },
      {
        fieldCode: "park_introduction",
        labelZh: "园区介绍",
        labelEn: "Park Introduction",
        valueZh: "当前集团拥有上海、山东、珠海三大产业布局。",
        valueEn: "The group currently operates three major industrial bases in Shanghai, Shandong, and Zhuhai."
      },
      {
        fieldCode: "honors_awards",
        labelZh: "荣誉资质",
        labelEn: "Honors and Awards",
        valueZh: "已获上海市创新型企业总部等资质。",
        valueEn: "Recognized with qualifications such as Shanghai Innovative Enterprise Headquarters."
      }
    ]
  },
  showrooms: [
    {
      hallId: 10,
      hallCode: "CARDIOLOGY",
      name: "心内介入展厅",
      nameEn: "Cardiology Hall",
      description: "用于展示心内介入方向的公开产品。",
      descriptionEn: "Used to present public products for the cardiology intervention domain.",
      previewImageUrl: "https://cdn.example.com/hall-cardiology.png",
      products: [
        {
          productId: 101,
          productCode: "P-101",
          nameCn: "导丝系统",
          nameEn: "Guidewire System",
          incompleteFlag: false,
          previewImageUrl: "https://cdn.example.com/product-101.png",
          subtitleZh: "导丝系统中文讲解",
          subtitleEn: "Guidewire system English narration",
          audioZhUrl: "https://cdn.example.com/product-101-zh.mp3",
          audioEnUrl: "https://cdn.example.com/product-101-en.mp3",
          bilingualPublicFields: [
            {
              fieldCode: "target_market",
              labelZh: "目标市场",
              labelEn: "Target Market",
              valueZh: "心内介入",
              valueEn: "Cardiology"
            },
            {
              fieldCode: "core_selling_points",
              labelZh: "核心卖点",
              labelEn: "Core Selling Points",
              valueZh: "更顺滑的通过性",
              valueEn: "Smoother delivery performance"
            }
          ]
        },
        {
          productId: 102,
          productCode: "P-102",
          nameCn: "球囊系统",
          nameEn: "Balloon System",
          incompleteFlag: false,
          previewImageUrl: "https://cdn.example.com/product-102.png",
          subtitleZh: "球囊系统中文讲解",
          subtitleEn: "Balloon system English narration",
          audioZhUrl: "https://cdn.example.com/product-102-zh.mp3",
          audioEnUrl: "https://cdn.example.com/product-102-en.mp3",
          bilingualPublicFields: [
            {
              fieldCode: "target_market",
              labelZh: "目标市场",
              labelEn: "Target Market",
              valueZh: "冠脉扩张",
              valueEn: "Coronary dilation"
            },
            {
              fieldCode: "model_specification",
              labelZh: "型号规格",
              labelEn: "Model Specification",
              valueZh: "2.0mm - 4.0mm",
              valueEn: "2.0mm - 4.0mm"
            }
          ]
        }
      ]
    },
    {
      hallId: 20,
      hallCode: "NEUROLOGY",
      name: "神经介入展厅",
      nameEn: "Neurology Hall",
      description: "用于展示神经介入方向的公开产品。",
      descriptionEn: "Used to present public products for the neurology intervention domain.",
      previewImageUrl: "https://cdn.example.com/hall-neurology.png",
      products: [
        {
          productId: 201,
          productCode: "P-201",
          nameCn: "导管系统",
          nameEn: "Catheter System",
          incompleteFlag: false,
          previewImageUrl: "https://cdn.example.com/product-201.png",
          subtitleZh: "导管系统中文讲解",
          subtitleEn: "Catheter system English narration",
          audioZhUrl: "https://cdn.example.com/product-201-zh.mp3",
          audioEnUrl: "https://cdn.example.com/product-201-en.mp3",
          bilingualPublicFields: [
            {
              fieldCode: "target_market",
              labelZh: "目标市场",
              labelEn: "Target Market",
              valueZh: "神经介入",
              valueEn: "Neurology"
            },
            {
              fieldCode: "core_selling_points",
              labelZh: "核心卖点",
              labelEn: "Core Selling Points",
              valueZh: "更稳定的支撑表现",
              valueEn: "More stable support performance"
            }
          ]
        }
      ]
    }
  ]
})
