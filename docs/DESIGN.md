# NiCam! design specification

Chinese photography encyclopedia, laboratory and museum. Brand line: Explore Beyond the Lens. Tone: precise, quiet, editorial; a place for both first discoveries and deep technical reading.

## Tokens

```css
:root {
  --paper:#F4F1EA; --surface:#FDFBF7; --inset:#EAE6DD;
  --ink:#242724; --muted:#76776F; --line:#D8D4CA;
  --bronze:#92704D; --bronze-soft:#E7DDCF; --dark:#232824;
  --green:#586958; --blue:#71818A;
  --font-sans:Inter,'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif;
  --font-editorial:Georgia,'Noto Serif SC','Songti SC',serif;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:24px; --space-6:32px; --space-7:48px; --space-8:64px; --space-9:96px;
  --radius:3px; --pill:100px; --content:1360px;
}
```

Keep corners almost square. No gradients, oversized shadows, glass, or neon. Use one-pixel rules and ample negative space. Card hover: image scale 1.025 and bronze border, 180ms ease. Focus ring: 2px bronze offset 3px. Body 14px/1.75; small labels 10–11px/1.4 with 0.12em tracking; h1 52px/1.15 desktop, 38px tablet, 32px mobile; h2 29px/1.25 desktop, 25px mobile. Editorial English words use serif, Chinese uses sans. Numeric specifications use tabular figures.

## Global shell

Left rail 216px wide, fixed desktop, ivory background, right rule. Logo at top: small outlined aperture icon plus `NiCam!` in 29px serif black; 10px spaced line `EXPLORE BEYOND THE LENS`. Navigation groups: 探索 / 首页, 器材百科, 器材对比; 光影档案 / 品牌博物馆, 光学实验室, 摄影知识. Nav icons thin line 17px. Active item pale bronze fill, left bronze indicator and bold dark text. Rail bottom has small bordered status card with green dot `持续探索，持续更新` and count `6 个品牌 · 3 座实验室`.

Main header 76px height, bottom rule. Left breadcrumb or section label; right search field `搜索相机、镜头或知识…` with magnifier and ⌘ K keycap, icon-only bookmark and small circular N avatar. Content horizontal padding 40px, vertical 32px. Header/search must work with accessible labels; search opens a useful local result panel.

Footer: thin top rule, wordmark, `关于 NiCam!` / `内容说明` / `反馈建议`, copyright and English motto.

## Homepage

1. Slim overline `THE PHOTOGRAPHY ATLAS / 摄影探索图鉴` with small bronze dot.
2. Split hero, left 55%, right 45%, 350–390px high. Left h1 `每一次快门，\n都是新的发现。` with one word or final phrase in warm bronze. Intro maximum 400px, 2 lines. Two compact CTA buttons: dark `探索器材百科 ↗`, text `走进品牌博物馆 →`. Beneath: small data row 由实际数据计算的器材、品牌和实验室数量（当前 7 台相机、6 个品牌、3 个实验室），禁止虚构增长数字. Right: large editorial camera photograph on light neutral background, clear silhouette, generous breathing space. Add tiny index label `OBJECT NO. 001` top and a restrained manufacturer/model caption bottom, with 1px leader line. Avoid text over busy photographs.
3. `探索，从这里开始` section heading with tiny `01 / DISCOVER` overline and `查看全部 →`. Three equal feature cards: 器材百科, 品牌博物馆, 光学实验室. Card has small index, icon, title, short description and arrow; alternate small photographic crop or diagram.
4. Featured equipment: title `值得认识的经典` and tabs `全部 / 相机 / 镜头`. Four product cards desktop. White image field, compact category and year, bold model name, 1-line Chinese annotation, bottom spec chips. Realistic product photos with contained fit. Top-right bookmark toggle; explicit compare add action.
5. Dark full-width editorial strip `让原理，看得见。` with optical ray visualization and CTA to lab, followed by three short lab entry rows.

## Catalog

Title 器材百科 and description. Top metric count. Horizontal type tabs 相机 / 镜头 / 全部; filter toolbar: brand select, sensor format, search, sorting; selected filters shown removable chips. Grid 3 columns within desktop main, 2 tablet, 1–2 mobile depending width. Count updates with filters; empty state with reset. Product cards 260–320px image field, 4 specification cells, compare checkbox. Sticky comparison tray appears when selected, shows maximum 2 cameras, clear, and `开始对比 (n)`.

## Equipment detail

Breadcrumb → split object presentation: large product photograph left 52%, right model overline, title, short description, year/brand/category and 4 metrics. Actions `加入对比` and `收藏器材`. Thin chapter navigation `概览 / 核心参数 / 设计故事 / 相关器材`. Below: clean 2-column specification table with alternating subtle rows, editorial history paragraph, related items. Back link retains catalog navigation.

## Comparison

Title 器材对比 with 2 equal camera columns; add-product placeholder if fewer than 2. Each product has image, model and remove action. Left label column 150px desktop; grouped rows 基础信息 / 传感器与成像 / 性能 / 机身. Highlight differing values with pale bronze background when `仅看差异` enabled. Horizontally scroll table on small screens; keep row labels sticky. Empty state explains selecting models and gives 2 suggested cameras with add buttons.

## Six-brand museum

Landing `六种视角，一段影像史。` with large serif `The Houses of Photography` secondary line. Six brand cards: Canon 佳能, Nikon 尼康, Sony 索尼, Fujifilm 富士, Leica 徕卡, Hasselblad 哈苏. Use typographic wordmarks, not invented logos. Each card has founded year, country, a short philosophy and image crop. 3×2 desktop, 2×3 tablet, 1×6 mobile. Brand detail selection opens real page/view with wordmark, founding story, vertical timeline 3–5 milestones, 2 iconic cameras and philosophy quote. Use bronze progress dots on fine vertical line.

## Three science labs

Lab index has 3 cards: 景深实验室 / 快门运动实验室 / 焦距与视角. Each opens interactive panel with visual left, parameter controls right. Visible numeric readouts update immediately.

Depth of field: aperture f/1.4–f/16 slider, focus distance 0.5–10m, focal length 24–135mm; scene has foreground focus object and background, background blur responds to controls. Show near/far sharpness approximation or explanatory text without pretending to be calibrated measurement.

Shutter motion: shutter speed, subject speed, focal length and subject distance controls change the displayed motion trail; show exposure duration and approximate blur width with explicit units and a clear educational approximation note. Reset button restores defaults.

Field of view: focal slider 16–200mm; central scene crop changes with focal length and computed full-frame horizontal angle `2 atan(36/(2f))`. Present 24 / 35 / 50 / 85mm presets.

Controls: range track 3px bronze, thumb 15px ivory with bronze border, label/value on same line, at least 44px hit target. Reduced motion supported. Show units.

## Knowledge

Editorial title `理解光，才能创造影像。` and category tabs `全部 / 摄影基础 / 光学原理 / 器材指南 / 影像故事`. Featured article with image left, eyebrow, 32px title and excerpt right. Article list 3 columns with cover image 16:10, category, read time, title and 2-line summary. Article detail has breadcrumb, title, intro, reading time, narrow reading column max 740px, meaningful headings and figure captions. Related reading footer. Categories filter actual data.

## Responsive behavior

Desktop ≥1200: rail 216px, 40px main padding, 4 homepage products, 3 catalog columns. Tablet 768–1199: rail collapsed to 72px icon column, 24px main padding, header 68px, hero 50/50 and 38px title, 2–3 products. Nav labels available as accessible tooltips. Mobile <768: rail becomes fixed 60px bottom nav with 5 entries 首页 / 器材 / 对比 / 博物馆 / 更多; 更多 opens drawer for labs and knowledge. Top header 60px logo and search icon. Main padding 20px, reserve 76px bottom. Hero stacked with 260px image after text; CTA wraps; metrics three equal columns. Feature cards stack. At 480px+, catalog two columns; below 480 one column. Filters wrap and search full width. Museum one column; all laboratory controls stack under visualization; comparison scrolls. No page-level horizontal overflow. Images have alt text, interactive controls keyboard access, and visible selected state.

## Content and interaction requirements

Every navigation destination renders substantive content. Search, filters, comparison, bookmarks, museum brand selection, article selection and laboratory sliders must change visible state. Use consistent camera dataset across catalog/detail/compare. Do not surface implementation notes. Chinese is primary; English acts as quiet editorial metadata. Main buttons 40px height, 16px horizontal padding, 12px type; mobile tap target 44px. Use lucide-like simple line icons consistently. Prefer licensed remote photography or bundled assets with robust fallback; photography is crucial to the visual result.
