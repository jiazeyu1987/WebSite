const palette = {
  blue: "#1b5ad9",
  sky: "#6bb8ff",
  green: "#24b06d",
  mint: "#7ee5c1",
  purple: "#7c64ff",
  gold: "#f5bc3b",
  graphite: "#21314f",
  silver: "#94a5c2"
}

const makeProducts = (prefix, names, specs) =>
  names.map((name, index) => {
    const spec = specs[index % specs.length]

    return {
      id: `${prefix}-${index + 1}`,
      name,
      code: `${prefix.toUpperCase()}-${String(index + 1).padStart(2, "0")}`,
      art: spec
    }
  })

const sharedSpecs = [
  { kind: "sheath", stroke: palette.blue, accent: palette.sky },
  { kind: "loop", stroke: palette.green, accent: palette.sky },
  { kind: "catheter", stroke: palette.graphite, accent: palette.blue },
  { kind: "kit", stroke: palette.sky, accent: palette.purple },
  { kind: "balloon", stroke: palette.sky, accent: palette.blue },
  { kind: "loop", stroke: palette.green, accent: palette.gold },
  { kind: "wire", stroke: palette.sky, accent: palette.blue },
  { kind: "catheter", stroke: palette.gold, accent: palette.sky },
  { kind: "arc", stroke: palette.blue, accent: palette.green },
  { kind: "balloon", stroke: palette.sky, accent: palette.blue },
  { kind: "stent", stroke: palette.silver, accent: palette.blue },
  { kind: "coil", stroke: palette.silver, accent: palette.blue },
  { kind: "wire", stroke: palette.blue, accent: palette.gold },
  { kind: "line-kit", stroke: palette.sky, accent: palette.green },
  { kind: "connector", stroke: palette.sky, accent: palette.blue },
  { kind: "ring", stroke: palette.silver, accent: palette.blue }
]

export const categories = [
  {
    id: "home",
    label: "首页",
    icon: "home",
    heroTag: "产品总览",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "欢迎来到本公司的产品展示平台。这个 demo 以参考图的轻盈蓝白医疗风格为基底，呈现分类切换、产品卡片浏览与侧边讲解联动。",
      "左侧区域模拟器械展示墙，采用高留白、淡蓝渐层卡片与悬浮式排布；右侧区域模拟语音介绍面板，用于承载当前分类的文字讲解与重点摘要。",
      "点击顶部分类后，页面会切换对应的器械组合与说明文案，方便用于方案演示、客户接待、展厅导览或触屏一体机交互预演。"
    ],
    products: makeProducts(
      "home",
      [
        "导入鞘套组",
        "亲水导管",
        "塑形导管",
        "输送组件",
        "球囊扩张导管",
        "微导丝",
        "支架系统",
        "血栓回收装置",
        "封堵器组件",
        "三通连接件",
        "压力延长管",
        "冲洗回路"
      ],
      sharedSpecs
    )
  },
  {
    id: "cardiology",
    label: "心内介入类",
    icon: "heart",
    heroTag: "心内方案",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "心内介入类产品强调轨迹稳定性、推送响应与末端精控，适合展示导管、导丝、球囊及连接附件的完整组合关系。",
      "页面切换后保留统一的视觉框架，只替换产品阵列与说明文本，从而让不同学科目录仍然维持一致的品牌观感。",
      "如果后续补齐真实产品摄影，本模块可以直接替换卡片中的示意图层，而不需要重写切换逻辑。"
    ],
    products: makeProducts(
      "car",
      [
        "冠脉导引导管",
        "亲水导丝",
        "压力球囊",
        "球囊扩张导管",
        "造影导管",
        "三联三通",
        "延长管套件",
        "扭控器",
        "微导管",
        "止血阀组件",
        "造影注射器",
        "压力监测接头"
      ],
      sharedSpecs.slice(2).concat(sharedSpecs.slice(0, 2))
    )
  },
  {
    id: "neuro",
    label: "神经介入类",
    icon: "brain",
    heroTag: "神经介入",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "神经介入目录更强调柔顺过弯、远端显影与精细输送，因此在视觉上保持细线条、弧线器械与高洁净底色的组合。",
      "本 demo 用程序生成的线稿模拟微导管、取栓支架、弹簧圈和输送系统，目的是先验证版式、信息节奏与切换体验。",
      "缺失的真实资产会在交付说明里单列，避免把演示素材误当作可直接投产的正式商品图。"
    ],
    products: makeProducts(
      "neu",
      [
        "微导管系统",
        "支撑导管",
        "取栓支架",
        "封堵弹簧圈",
        "抽吸导管",
        "输送导丝",
        "颅内球囊",
        "远端通路导管",
        "造影导管",
        "加压连接组件",
        "冲洗延长管",
        "止血阀"
      ],
      sharedSpecs.slice(4).concat(sharedSpecs.slice(0, 4))
    )
  },
  {
    id: "peripheral",
    label: "外周介入类",
    icon: "profile",
    heroTag: "外周介入",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "外周介入页面延续蓝白底色，但通过更长的导丝与支架形态增强器械尺度感，适合演示下肢、肿瘤或通路相关器械组合。",
      "右侧讲解面板可承接展厅播报、触屏语音脚本、销售讲稿或培训摘要，在结构上与左侧产品矩阵解耦。",
      "整个页面的交互核心是分类切换和信息联动，因此即使以后接入真实 CMS，也可以沿用这一前端骨架。"
    ],
    products: makeProducts(
      "per",
      [
        "外周导引鞘",
        "超滑导丝",
        "外周球囊",
        "自膨式支架",
        "抽吸导管",
        "微穿刺套件",
        "延长管组",
        "三通阀",
        "造影连接件",
        "封堵器输送器",
        "Y 形接头",
        "压力延长管"
      ],
      sharedSpecs.slice(1).concat(sharedSpecs.slice(0, 1))
    )
  },
  {
    id: "orthopedic",
    label: "骨科介入类",
    icon: "bone",
    heroTag: "骨科介入",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "骨科介入类保留统一的页面语言，同时通过更稳重的线条密度与器械轮廓，表达穿刺、输送与支撑类组件的专业感。",
      "卡片使用统一圆角和淡阴影，可以保证图片资源替换前后版面节奏稳定，不会因为单张素材尺寸不同而跳动。",
      "这一版更适合做风格验证与交互演示，正式上线前建议补充真实产品渲染图、编号体系和分类层级说明。"
    ],
    products: makeProducts(
      "ort",
      [
        "骨穿刺针",
        "扩张鞘组件",
        "输送导管",
        "封堵附件",
        "连接阀组",
        "球囊导管",
        "弯头导丝",
        "冲洗组件",
        "延长管",
        "三通阀",
        "通路接头",
        "支撑件"
      ],
      sharedSpecs.slice(6).concat(sharedSpecs.slice(0, 6))
    )
  },
  {
    id: "urology",
    label: "泌尿介入类",
    icon: "kidney",
    heroTag: "泌尿介入",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "泌尿介入类延续顶部导航和卡片矩阵结构，适合展示导管、导丝、取石相关附件等轻量型器械的组合。",
      "页面整体避免厚重容器和夸张装饰，主要依靠留白、渐变、轻边框和高对比图标来还原参考图的展厅屏风格。",
      "后续如果需要加入二级切换、筛选或详情抽屉，也可以在不破坏当前主视图的前提下继续扩展。"
    ],
    products: makeProducts(
      "uro",
      [
        "输尿管导管",
        "亲水导丝",
        "扩张球囊",
        "取石网篮",
        "斑马导丝",
        "双 J 管",
        "造影连接件",
        "三通阀",
        "压力延长管",
        "冲洗套组",
        "输送鞘",
        "止血阀"
      ],
      sharedSpecs.slice(3).concat(sharedSpecs.slice(0, 3))
    )
  },
  {
    id: "nonvascular",
    label: "非血管介入类及其他",
    icon: "bulb",
    heroTag: "非血管介入",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "非血管介入类及其他模块适合作为多学科集合入口，因此文案采用更概括的介绍方式，产品阵列也更偏综合示意。",
      "演示中保持了同一套网格和面板比例，以便快速比较不同分类之间的信息密度和可视节奏。",
      "如果你后面提供真实 SKU 列表、主图和分类图标，这一页可以较低成本升级为更接近正式发布状态的版本。"
    ],
    products: makeProducts(
      "nvi",
      [
        "引流导管",
        "穿刺针",
        "输送器",
        "封堵组件",
        "介入附件",
        "微导丝",
        "冲洗回路",
        "造影管",
        "连接三通",
        "延长管",
        "输送鞘",
        "导入器"
      ],
      sharedSpecs.slice(5).concat(sharedSpecs.slice(0, 5))
    )
  },
  {
    id: "prefabrication",
    label: "医疗预制件",
    icon: "microscope",
    heroTag: "医疗预制件",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "医疗预制件页面偏向展示零部件、接头与基础组件，因此卡片内容上更强调接口、管路和装配关系的线性表达。",
      "右侧文案可以切换成能力介绍、制造工艺、材料体系或代工服务说明，适合作为官网中的业务能力展示模块。",
      "目前 demo 只复刻了视觉语气与交互结构，尚未绑定真实产品素材和企业品牌资产，这部分会在缺失清单中明确列出。"
    ],
    products: makeProducts(
      "pre",
      [
        "三通阀体",
        "延长管路",
        "连接接头",
        "止血阀壳体",
        "输送手柄",
        "组件套管",
        "精密管件",
        "注塑接头",
        "模块阀组",
        "医用软管",
        "旋转接头",
        "装配组件"
      ],
      sharedSpecs.slice(7).concat(sharedSpecs.slice(0, 7))
    )
  }
]
