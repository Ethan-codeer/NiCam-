import digitalCameras from "./digital-cameras.json";
import expandedBrands from "./expanded-brands.json";
export type SpecRow = { label: string; value: string; sourceUrl: string; condition?: string; originalValue?: string };
export type SpecGroup = { id: string; title: string; rows: SpecRow[] };
export type Camera = {
  id: string; name: string; brand: string; year: number | null; format: string; type: string;
  megapixels: number | null; width: number | null; height: number | null; depth: number | null;
  description: string; sourceUrl: string; verification: 'verified' | 'pending'; digital?: boolean; specGroups?: SpecGroup[];
};
export type Brand = { id: string; name: string; description: string; timeline: { year: number; event: string }[]; sourceUrl: string };
export type Article = { id: string; title: string; english: string; summary: string; body: string[]; relatedCameraIds: string[]; lab: string | null; sourceUrl: string };

// Dimensions are manufacturer body dimensions in millimetres (width × height × depth).
// Pending records are editorial seeds awaiting a full field-by-field official-source audit.
export const cameras: Camera[] = digitalCameras as Camera[];

export const brands: Brand[] = [
  ...(expandedBrands as Brand[]),
  { id: 'nikon', name: 'Nikon 尼康', description: '从光学仪器到 F 卡口单反，再到 Z 系统，尼康的历史始终与专业影像实践交织。', timeline: [{ year: 1917, event: '日本光学工业株式会社成立' }, { year: 1959, event: 'Nikon F 发布' }, { year: 2018, event: 'Z 系统全画幅无反相机发布' }], sourceUrl: 'https://www.nikon.com/company/corporate/history/' },
  { id: 'canon', name: 'Canon 佳能', description: '以 EOS 系统连接自动对焦、数字单反与 RF 卡口无反时代，服务多样的影像创作。', timeline: [{ year: 1937, event: '精机光学工业株式会社成立' }, { year: 1987, event: 'EOS 系统诞生' }, { year: 2018, event: 'EOS R 系统发布' }], sourceUrl: 'https://global.canon/en/corporate/history/' },
  { id: 'sony', name: 'Sony 索尼', description: '将电子技术、传感器与影像系统相结合，α 系列推动了全画幅无反相机的普及。', timeline: [{ year: 1946, event: '东京通信工业成立' }, { year: 2006, event: '推出 α100 数码单反' }, { year: 2013, event: '推出 α7 与 α7R 全画幅无反' }], sourceUrl: 'https://www.sony.com/en/SonyInfo/CorporateInfo/History/' },
  { id: 'fujifilm', name: 'FUJIFILM 富士', description: '从感光材料积累走向数字影像，X 与 GFX 系列形成独特的色彩和操控语言。', timeline: [{ year: 1934, event: '富士写真胶片株式会社成立' }, { year: 2011, event: 'X100 上市' }, { year: 2017, event: 'GFX 50S 上市' }], sourceUrl: 'https://www.fujifilm.com/corporate/aboutus/history' },
  { id: 'leica', name: 'Leica 徕卡', description: '以小型相机与旁轴传统影响纪实摄影，并延伸出 M、SL 与 Q 等数字系统。', timeline: [{ year: 1914, event: '奥斯卡·巴纳克制成 Ur-Leica 原型' }, { year: 1925, event: 'Leica I 在莱比锡展出' }, { year: 1954, event: 'Leica M3 发布' }], sourceUrl: 'https://leica-camera.com/en-int/company/history' },
  { id: 'hasselblad', name: 'Hasselblad 哈苏', description: '从模块化胶片中画幅到便携数字中画幅，哈苏持续探索影像细节与色彩表达。', timeline: [{ year: 1941, event: '哈苏相机业务起步' }, { year: 1948, event: '1600F 面世' }, { year: 2016, event: 'X1D 无反中画幅发布' }], sourceUrl: 'https://www.hasselblad.com/about/history/' },
];

// Original Chinese educational notes; sourceUrl points to further reading, not a quotation source.
export const articles: Article[] = [
  {
    "id": "exposure",
    "title": "曝光三角",
    "english": "The exposure triangle",
    "summary": "理解光圈、快门与 ISO 如何共同影响画面。",
    "body": [
      "光圈决定单位时间内通过镜头的光量，也影响景深。快门控制曝光持续时间，同时决定运动留下怎样的痕迹。先决定画面需要怎样的运动感和景深，再调整曝光组合。",
      "ISO 改变相机处理信号的方式，并不增加到达传感器的光子。光线不足时，先考虑是否能延长曝光或打开光圈；动态场景则可能需要提高 ISO 来守住快门。"
    ],
    "relatedCameraIds": [
      "nikon-zf"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "aperture",
    "title": "光圈与景深",
    "english": "Aperture & depth of field",
    "summary": "虚化取决于光圈，也取决于距离与画幅。",
    "body": [
      "较小的光圈数值代表较大的相对孔径。在相同拍摄条件下，大光圈通常带来较浅景深，但人物与背景的距离同样影响虚化程度。",
      "拍摄多人合影时，应先保证眼睛处于可接受的清晰范围。收小光圈并检查画面边缘；极小光圈也可能因衍射降低细节表现。"
    ],
    "relatedCameraIds": [
      "canon-r5"
    ],
    "lab": "dof",
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "shutter",
    "title": "让时间进入照片",
    "english": "Working with shutter speed",
    "summary": "用快门决定冻结、流动或跟随。",
    "body": [
      "冻结运动所需的快门取决于主体速度、移动方向和拍摄距离。横向穿过画面的主体通常比迎面移动更容易产生明显拖影。",
      "慢门拍摄时可以固定相机，让主体运动留下轨迹。摇摄则跟随主体移动，使背景拉成线条；连续尝试并比较不同快门的效果。"
    ],
    "relatedCameraIds": [
      "sony-a7iv"
    ],
    "lab": "motion",
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "iso",
    "title": "正确理解 ISO",
    "english": "Understanding ISO",
    "summary": "在亮度、噪声与运动之间作出选择。",
    "body": [
      "提高 ISO 可以让相机输出更亮的影像，但低光下的噪声首先与收集到的光量有关。不要为了低 ISO 而让运动主体模糊。",
      "比较噪声时应使用相同输出尺寸。曝光不足后大幅提亮往往暴露暗部问题；合理曝光并保留重要高光，通常比执着某个 ISO 数字更有用。"
    ],
    "relatedCameraIds": [
      "nikon-zf"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "focal-length",
    "title": "焦距与观看距离",
    "english": "Focal length & viewpoint",
    "summary": "分清视角变化与透视变化。",
    "body": [
      "焦距影响取景范围，拍摄位置决定透视关系。从同一位置更换镜头并裁切到相同范围，物体之间的透视关系基本不变。",
      "广角近拍会突出前景，长焦远拍常让前后景看起来更接近。练习时固定一个主体，分别改变焦距和站位，观察背景比例。"
    ],
    "relatedCameraIds": [
      "leica-q3"
    ],
    "lab": "fov",
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "crop-factor",
    "title": "画幅与等效焦距",
    "english": "Sensor size & equivalence",
    "summary": "用统一的视角语言比较不同系统。",
    "body": [
      "等效焦距用于比较不同画幅的视角，并不改变镜头的实际焦距。APS-C 相机上的 23mm 镜头，其视角大致接近全画幅的 35mm。",
      "比较系统时还要考虑镜头、机身尺寸、所需景深和输出用途。单独看传感器大小，无法判断一套器材是否适合你的工作方式。"
    ],
    "relatedCameraIds": [
      "fujifilm-x100vi"
    ],
    "lab": "fov",
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "raw-jpeg",
    "title": "RAW 还是 JPEG",
    "english": "RAW or JPEG",
    "summary": "让文件格式服务拍摄流程。",
    "body": [
      "JPEG 已经过相机的色彩、锐化和压缩处理，方便直接分享。RAW 保留更多原始采样信息，需要软件解释，通常提供更灵活的白平衡和色调调整空间。",
      "重要拍摄可使用 RAW+JPEG，但要预留存储容量。RAW 也无法恢复完全溢出的高光或不存在的细节，拍摄时的曝光仍然关键。"
    ],
    "relatedCameraIds": [
      "canon-r5"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "white-balance",
    "title": "白平衡不只关乎准确",
    "english": "White balance",
    "summary": "在还原色彩与保留气氛之间选择。",
    "body": [
      "白平衡决定相机如何解释光源的颜色。自动模式适合快速拍摄，但混合光源下，一次整体调整很难同时让所有区域都呈现中性。",
      "拍摄一组需要统一的照片时，可固定白平衡或使用灰卡作为参考。黄昏的温暖、蓝调时刻的冷意也可以保留，技术上的中性并非唯一目标。"
    ],
    "relatedCameraIds": [
      "fujifilm-x100vi"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "histogram",
    "title": "读懂直方图",
    "english": "Reading the histogram",
    "summary": "用亮度分布辅助判断曝光。",
    "body": [
      "直方图展示像素在不同亮度区间的分布。左侧偏暗、右侧偏亮，分布形状取决于场景，夜景偏左并不自动意味着曝光错误。",
      "检查重要高光是否越过右边界，同时观察暗部是否仍包含所需细节。机内直方图常基于 JPEG 预览，其警告与 RAW 的实际余量可能不同。"
    ],
    "relatedCameraIds": [
      "hasselblad-x2d"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "metering",
    "title": "测光与曝光补偿",
    "english": "Metering & compensation",
    "summary": "理解相机为什么会误判雪地与黑色背景。",
    "body": [
      "反射式测光根据场景反射的光估计曝光。大面积白色或黑色物体可能影响判断，因此相机给出的建议不一定符合主体应有的明暗。",
      "在自动曝光模式下，曝光补偿告诉相机让输出更亮或更暗。先确认测光区域覆盖了什么，再根据主体和高光情况调整。"
    ],
    "relatedCameraIds": [
      "nikon-zf"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "autofocus",
    "title": "选择合适的对焦模式",
    "english": "Autofocus modes",
    "summary": "让对焦区域与主体运动相匹配。",
    "body": [
      "静止主体适合单次对焦，持续移动的主体通常需要连续对焦。人物识别可以帮助锁定眼睛，但遮挡、逆光和复杂背景仍可能造成误判。",
      "拍摄前检查对焦区域和主体识别设置，避免把决定权完全交给大范围自动选择。回看时放大关键位置，确认清晰度来自准确对焦而非缩略图错觉。"
    ],
    "relatedCameraIds": [
      "sony-a7iv"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "stabilization",
    "title": "防抖能做什么",
    "english": "Image stabilization",
    "summary": "区分手抖与主体运动。",
    "body": [
      "机身或镜头防抖通过补偿相机移动，帮助在较慢快门下保持静态主体清晰。它不能冻结行走的人、奔跑的动物或被风吹动的树叶。",
      "实际安全快门取决于握持、焦距和输出要求。使用三脚架时参照设备说明选择防抖模式，长曝光拍摄也要留意风和地面振动。"
    ],
    "relatedCameraIds": [
      "hasselblad-x2d"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "composition",
    "title": "构图从边缘开始",
    "english": "Composition from the edges",
    "summary": "在按快门前检查画面边界。",
    "body": [
      "主体吸引注意力，画面边缘却常藏着干扰：半截路牌、突出的亮点或被切断的手。先检查四角，再决定哪些元素需要留下。",
      "三分法只是安排关系的一种工具。通过前后、左右移动改变重叠关系，通常比事后裁切更能改善空间层次。"
    ],
    "relatedCameraIds": [
      "leica-q3"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "street",
    "title": "街头摄影的等待",
    "english": "Waiting in street photography",
    "summary": "让光线、背景与人物在同一时刻相遇。",
    "body": [
      "先找到有结构的背景或一束稳定的光，再观察人如何经过。预先决定站位和曝光，可以把注意力留给动作与关系。",
      "尊重他人的边界和当地规则，避免干扰现场。整理照片时寻找姿态、影子与背景的呼应，而不只是挑出最锐利的一张。"
    ],
    "relatedCameraIds": [
      "fujifilm-x100vi"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "portrait",
    "title": "环境人像的距离",
    "english": "Environmental portraits",
    "summary": "用背景讲述人物所处的世界。",
    "body": [
      "环境人像需要平衡人物与场所。拍得太近可能丢失语境，背景太复杂又会分散注意；先决定场景中哪些信息与人物有关。",
      "让人物与背景拉开距离，并观察脸部光线。沟通和等待自然动作，比不断更换器材更有助于得到可信的表情。"
    ],
    "relatedCameraIds": [
      "canon-r5"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "landscape",
    "title": "风光摄影的层次",
    "english": "Layers in landscape",
    "summary": "用前景、中景与远景组织空间。",
    "body": [
      "前景可以提供尺度和进入画面的路径，但并非每个场景都需要贴近地面的石头。寻找自然的线条、色块和明暗变化。",
      "对焦位置与光圈应结合所需清晰范围决定。拍摄后检查近处和远处细节，必要时使用不同对焦位置的多张照片进行景深合成。"
    ],
    "relatedCameraIds": [
      "hasselblad-x2d"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "color",
    "title": "建立自己的色彩关系",
    "english": "Color relationships",
    "summary": "从现场观察走向克制的调整。",
    "body": [
      "先观察主色、辅色和最醒目的色点。颜色的面积与明度会影响视觉权重，一小块高饱和颜色就可能改变整个画面的注意中心。",
      "后期先校正整体白平衡和曝光，再调整局部色彩。避免只追求统一滤镜；让肤色、环境和拍摄时的光线保持可信的关系。"
    ],
    "relatedCameraIds": [
      "fujifilm-x100vi"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "dynamic-range",
    "title": "动态范围与取舍",
    "english": "Dynamic range",
    "summary": "面对强烈明暗反差时保护重要信息。",
    "body": [
      "动态范围描述能够记录的明暗跨度。逆光场景可能超出相机一次曝光的能力，需要明确哪些区域可以变成剪影，哪些细节必须保留。",
      "静态场景可尝试包围曝光并合成，但移动的人和树叶可能产生重影。渐变滤镜、补光和改变拍摄时间也是实际可用的选择。"
    ],
    "relatedCameraIds": [
      "nikon-zf"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "contact-sheet",
    "title": "用接触表编辑照片",
    "english": "Editing with a contact sheet",
    "summary": "把单张选择变成一组照片的叙事。",
    "body": [
      "将同一主题的照片以统一大小排列，先看重复和节奏，再看单张细节。相邻照片的方向、色彩和距离会改变观看顺序。",
      "建立初选、复选和最终序列，并隔一段时间重新观看。删去信息重复的照片，常常比加入更多照片更能让主题清楚。"
    ],
    "relatedCameraIds": [
      "leica-q3"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  },
  {
    "id": "camera-choice",
    "title": "选择第一台相机",
    "english": "Choosing a first camera",
    "summary": "从拍摄需求出发建立器材清单。",
    "body": [
      "先写下主要题材、携带频率与总预算。镜头、存储卡、备份和后期设备都属于使用成本；机身参数只是选择的一部分。",
      "尽可能实际握持并试用取景器、按键与菜单。适合你的相机应让你愿意带出门，并能支持你正在学习的拍摄方式。"
    ],
    "relatedCameraIds": [
      "sony-a7iv"
    ],
    "lab": null,
    "sourceUrl": "https://www.nikonusa.com/learn-and-explore"
  }
];
