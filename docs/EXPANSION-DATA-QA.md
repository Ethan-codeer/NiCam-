# 新增10款数码单反参数核查

核查日期：2026-11-06（UTC）。范围：本次新增的10款Nikon数码单反；不含既有100款翻译内容及照片授权复核。

## 来源和核查范围

本次实际下载并阅读尼康日本官方规格页面；各参数行的 `sourceUrl` 指向对应型号页面。临时采集证据在 `/tmp/nicam-expand/{型号}.html`，解析摘录在 `/tmp/nicam-expand/{型号}-rows.json`。临时目录不属于发布产物。

| 型号 | 官方规格页面 | 分组 / 参数行 |
| --- | --- | --- |
| D700 | https://nij.nikon.com/products/lineup/slr/d700/spec.html | 8 / 43 |
| D300 | https://nij.nikon.com/products/lineup/slr/d300/spec.html | 8 / 43 |
| D90 | https://nij.nikon.com/products/lineup/slr/d90/spec.html | 9 / 46 |
| D7000 | https://nij.nikon.com/products/lineup/slr/d7000/spec.html | 10 / 47 |
| D7100 | https://nij.nikon.com/products/lineup/slr/d7100/spec.html | 10 / 49 |
| D600 | https://nij.nikon.com/products/lineup/slr/d600/spec.html | 10 / 47 |
| D5300 | https://nij.nikon.com/products/lineup/slr/d5300/spec.html | 10 / 49 |
| D5500 | https://nij.nikon.com/products/lineup/slr/d5500/spec.html | 10 / 49 |
| D5600 | https://nij.nikon.com/products/lineup/slr/d5600/spec.html | 10 / 50 |
| D3400 | https://nij.nikon.com/products/lineup/slr/d3400/spec.html | 10 / 49 |

逐项复核了有效及总像素、传感器尺寸、主要照片尺寸、存储介质、取景器视野率与放大倍率测试条件、眼点及屈光度、显示屏、快门和同步速度、连拍、测光、ISO、AF点与范围、接口、电源、机身尺寸、重量口径及工作环境。没有发现数值矛盾。

另外核对以下容易误套模板的差异：

- D700：单机EN-EL3e约5张/秒；约8张/秒需要指定外接电源或MB-D10的其他兼容供电，且保留AF-C、S/M、1/250秒等测试条件。未添加视频参数。
- D300：单机约6张/秒、指定供电约8张/秒；14位RAW最高约2.5张/秒。未添加视频参数；HDMI为Type A。
- D90：HD视频为24fps；720p约5分钟，低分辨率约20分钟，AVI/Motion-JPEG。
- D7000：全高清24p；720p和低分辨率帧率依NTSC/PAL设置；单次约20分钟。
- D7100：DX与1.3倍裁切、12位与14位RAW的连拍速度不同；1080/60i、50i需1.3倍裁切；f/8时中央1个AF点可用。
- D600：FX与DX取景器视野率不同；AF可用点受镜头最大光圈限制；全高清最高30p。
- D5300、D5500、D5600：JPEG/12位RAW约5张/秒，14位RAW约4张/秒；仅后两款在本次数据中标为触摸屏。续航分别按官方CIPA数值600、820、970张。
- D3400：RAW仅12位；单声道内置录音；1080/60p及50p会缩小记录视角；约5张/秒注明手动对焦、S/M、1/250秒等条件；CIPA续航约1200张。

## 来源覆盖问题

核查时D90的“画质格式”一行写为“12位压缩RAW、JPEG；可同时记录RAW+JPEG”。实际引用的官方规格页仅明确RAW和JPEG，未写出RAW位深或压缩方式。这不构成已证实的数值错误，但超出当前行来源的支持范围。建议删去“12位压缩”，保留“RAW、JPEG；可同时记录RAW+JPEG”，或补充实际取得并核对的官方说明书来源。已按上述建议修正为“RAW、JPEG；可同时记录RAW+JPEG”。其余9款的RAW位深及压缩类型均由已取得的型号规格页明确支持。

## 完整性和限制

- 10个JSON可解析，均达到至少7组、30行；每行具有非空值及对应型号的官方来源。
- 可见参数文字无日文假名；保留AF、RAW、HDMI及专有模块名等通用缩写。
- `year` 保持 `null`：本次未取得并核对官方发布日期来源，不以记忆补全年份。
- 当前依据官方规格页，未声称逐款取得完整说明书；更深入的镜头兼容、特定模式行为及官方后续固件变化不属于此次参数覆盖范围。
- 连拍、续航和无线距离为官方条件下的标称值，保留主要条件，不等同于所有使用环境的实际表现。
