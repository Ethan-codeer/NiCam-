# NiCam 数据与编辑说明

当前提供 7 台相机的起始目录、6 个品牌及 20 篇原创中文入门文章。目标规模为 60–80 台；当前目录不代表已完成该目标。正式扩充时按品牌、画幅与年代分批录入，每批完成官方资料核验后上线。

`src/data.ts` 导出 `Camera`、`Brand`、`Article` 类型及同名复数数组。相机的 `brand` 对应品牌 id，文章的 `relatedCameraIds` 对应相机 id。`lab` 为实验室路由标识，null 表示没有互动实验。

## 数值口径

像素字段记录有效像素，单位为百万；不使用文件插值分辨率。宽、高、深为厂家公布的机身尺寸，单位毫米，不是传感器尺寸。不同厂家的突出部件计算方式可能不同，比较结果应结合来源脚注阅读。没有获得支持的数值保留 null，界面显示“待核验”，不能当作零。

年份是发布年。pending 条目的年份、画幅与简介属于编辑候选信息，不能作为已核验数据库引用。`verified` 仅用于本次已取得官方规格和发布年证据的完整记录。品牌时间线目前为编辑草稿，仍需逐事件核验。文章为本站原创教育内容，sourceUrl 是延伸阅读入口，不表示该页面逐句支持文章。

## 本次来源检查（2026-11-05）

使用 HTTPS 获取厂家正文并检查内容，而非仅检查链接存在。抓取临时保存在 `/tmp/nicam-sources/`，该临时目录不属于永久发布资产。

| 相机 | 获取结果与证据 | 状态 |
| --- | --- | --- |
| Nikon Z 8 | 官方产品页与 2023-05-10 发布稿均 HTTP 200；“Full frame 45.7 megapixels”；“144 x 118.5 x 83 mm”。 | verified |
| Nikon Z f | 官方产品页 HTTP 200；“Effective pixels 24.5 million”；“35.9 x 23.9 mm … full-frame”；“144 x 103 x 49 mm”。官方 2023-09-20 新闻稿确认发布年。 | verified |
| Canon EOS R5 | 官方规格页 HTTP 200；“36 x 24 mm CMOS”；“Approx. 45 megapixels”；“138.5 x 97.5 x 88mm”。本次未取得有效的官方发布日期页面。 | pending |
| Sony α7 IV | 官方规格入口返回 HTTP 403；数值字段置空。 | pending |
| FUJIFILM X100VI | 官方规格入口返回 HTTP 403；数值字段置空。 | pending |
| Leica Q3 | 官方技术页 HTTP 200；“130 x 80,3 x 92,6 mm”；“62,39 MP/60,3 MP (total/effective)”；“Digital 35 mm compact camera”。发布日期仍待核验。 | pending |
| Hasselblad X2D 100C | 官方产品页 HTTP 200；正文称中画幅无反，脚注为“102 effective megapixels”，因此记录 102，非营销名称中的 100。尺寸未取得直接证据，置空。 | pending |

规格链接均保存在各相机的 sourceUrl。补充发布年来源：

- [Nikon Z f，2023-09-20](https://www.nikon.com/company/news/2023/0920_mirrorless_01.html)
- [Nikon Z8 产品规格](https://imaging.nikon.com/imaging/lineup/mirrorless/z_8/)
- [Nikon Z8，2023-05-10](https://www.nikon.com/company/news/2023/0510_mirrorless_01.html)

## 扩充与维护

每批增加 6–10 台，先获取官方产品页、说明书或官方博物馆记录。逐字段记录有效像素、尺寸顺序与发布年，并检查名称是否对应同一代机型。缺失数据保留 null；访问失败不等于资料已核验。品牌历史也应逐事件补充官方来源。

完成核验后再将 verification 改为 verified。检查所有 id 唯一、关联可解析、尺寸为正数、像素为正数或 null，且不存在以零代替未知值。原始来源更新或撤下时保留核验日期，并重新检查受影响字段。

## 导入预检

使用 `node scripts/check-import.mjs cameras.json` 预检候选 JSON 数组。检查必填字段、唯一 ID、年份、正数或 null、HTTPS 来源与核验状态；标为 verified 的候选还必须带 evidence 和 reviewedAt。该工具不会自动发布或修改数据，也不能代替人工逐字段核验。通过预检后，经编辑审核合并到 src/data.ts，再运行 npm test 与 npm run build。
