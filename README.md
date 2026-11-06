# NiCam!

Explore Beyond the Lens.

摄影百科、原理实验室与品牌博物馆。当前正式目录：**100款数码相机、逐款真实照片、6695项带来源参数**，另有20篇知识条目与三个互动实验。

React / TypeScript / Vite，hash路由支持静态托管。

```sh
npm ci
npm run dev
npm test
npm run build
```

构建输出dist。部署使用ChatGPT Sites，沿用.openai/hosting.json的站点标识和原有访问范围。

- [本次范围、来源与限制](docs/RELEASE-DIGITAL-100.md)
- [独立验收](docs/DIGITAL-FINAL-QA.md)
- [设计规范](docs/DESIGN.md)
- [数据接口](docs/DIGITAL-CONTRACT.md)

审阅后的源数据位于src/cameras，每款机型一个JSON文件，顺序位于src/camera-order.json。npm安装、测试、开发和构建时自动运行scripts/build-catalog.mjs，生成应用数据及验证所需的批次文件；生成文件不纳入版本库。只编辑逐款源文件，采集结果须再次审阅。未知信息保留未知；未执行相机实测。照片逐张保留署名与许可。
