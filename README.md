# NiCam!

Explore Beyond the Lens.

简体中文摄影百科、摄影原理实验室与品牌博物馆。React + TypeScript，静态构建；使用 hash 路由支持静态托管的直接链接。

## 开发

```sh
npm install
npm run dev
npm run build
npm test
```

构建产物为 `dist/`。依赖锁文件随代码提交；后续可使用 `npm ci`。

## 工程资料

- [设计规范](docs/DESIGN.md)
- [架构](docs/ARCHITECTURE.md)
- [数据与来源](docs/DATA.md)
- [验收记录](docs/ACCEPTANCE.md)

## 范围与发布

本版本是分阶段开发的首批成果，不代表 60–80 款相机数据库已经完成。只将实际完成来源核对的数据标为已核验；原始产品图使用原创示意图，不能作为产品外观依据。

目标托管为 ChatGPT Sites，不采用 Vercel。当前构建为静态 Vite 输出，可配置 Sites `static.directory` 为 `dist`。仅在 Sites 创建工具返回真实 project_id 后写入 `.openai/hosting.json`，不编造站点标识。

公开发布必须得到用户确认。当前环境缺少 Sites 打包辅助脚本及浏览器 QA 工具，因此在线预览和 Safari 实机兼容性尚未验证。
