# 视觉风格合集 · Visual Style Library

25 种视觉风格的设计参考库：每个风格一页独立 HTML，**画面全部用 CSS / SVG / Canvas 现场绘制**，不引用任何外部图片与视频截图，可离线打开、可直接当作分镜稿或生成提示的参考。

[**→ 打开索引页（缩略图网格）**](examples/index.html)

## 每页结构

| 区块 | 内容 |
| --- | --- |
| 风格概览 | 编号、标题、元信息、检索标签、色板 |
| 主风格综合帧 | 一条 16:9 的主视觉（索引页的缩略图即此帧） |
| 子风格拓展 | 3–4 个方向各一帧，附识别要点与参数标注 |
| AI 创作视觉规则 | 三条要点 + 可直接改写的提示词 |

## 目录

```
.
├── 视觉风格合集.md          风格文字合集（条目描述、识别要素、检索标签）
└── examples/
    ├── index.html          索引页：5×5 缩略图网格
    ├── _assets/
    │   ├── base.css        共用外壳：页面 chrome、画框容器
    │   ├── base.js         滚动动效开关等轻量脚本
    │   └── thumbs/         25 张主帧缩略图（472×266）
    └── *.html              25 个风格页
```

## 风格清单

| # | 风格 | English |
| --- | --- | --- |
| 01 | [扁平化矢量卡通](examples/扁平化矢量卡通.html) | Flat Vector Cartoon Style |
| 02 | [手绘绘本风格](examples/手绘绘本风格.html) | Hand-drawn Storybook Style |
| 03 | [日式动画](examples/日式动画.html) | Anime |
| 04 | [动漫数字拼贴](examples/动漫数字拼贴.html) | Anime-inspired Digital Collage |
| 05 | [像素艺术](examples/像素艺术.html) | Pixel Art |
| 06 | [绘画质感动画](examples/绘画质感动画.html) | Painterly Animation |
| 07 | [新粗野主义平面风格](examples/新粗野主义平面风格.html) | Neo-Brutalism |
| 08 | [朋克杂志拼贴](examples/朋克杂志拼贴.html) | Punk Zine Collage |
| 09 | [复古版画拼贴](examples/复古版画拼贴.html) | Vintage Engraving Collage |
| 10 | [极简主义书刊排版](examples/极简主义书刊排版.html) | Minimalist Editorial Typography |
| 11 | [极简主义动态图形](examples/极简主义动态图形.html) | Minimalist Motion Graphics |
| 12 | [复古桌面界面美学](examples/复古桌面界面美学.html) | Retro Desktop GUI Aesthetics |
| 13 | [复古终端与技术制图](examples/复古终端与技术制图.html) | Retro Terminal &amp; Technical Illustration |
| 14 | [技术制图美学](examples/技术制图美学.html) | Technical / Schematic Aesthetics |
| 15 | [现代商业界面风格](examples/现代商业界面风格.html) | Modern Commercial UI Aesthetics |
| 16 | [玩具感三维](examples/玩具感三维.html) | Toy-like 3D Aesthetics |
| 17 | [手工立体绘本美学](examples/手工立体绘本美学.html) | Handcrafted Pop-up Storybook |
| 18 | [电影感三维场景](examples/电影感三维场景.html) | Cinematic 3D Environments |
| 19 | [黑色电影式漫画视觉](examples/黑色电影式漫画视觉.html) | Noir Graphic-novel Aesthetics |
| 20 | [超现实主义空间](examples/超现实主义空间.html) | Surrealist Spatial Aesthetics |
| 21 | [宇宙太空美学](examples/宇宙太空美学.html) | Cosmic / Space Art |
| 22 | [锐舞美学](examples/锐舞美学.html) | Rave Aesthetics |
| 23 | [装饰艺术](examples/装饰艺术.html) | Art Deco |
| 24 | [古典奢华视觉](examples/古典奢华视觉.html) | Classical Luxury Aesthetics |
| 25 | [新中式视觉](examples/新中式视觉.html) | Contemporary Chinese-inspired Design |

## 本地查看

仓库里没有任何构建步骤，也不需要起服务：

```bash
git clone https://github.com/vichikoma/visual-style-library.git
# 直接用浏览器打开 examples/index.html
```

> 若想用 iframe 引用或脚本读取页面内容（例如自己做画廊），需要起一个静态服务：`python -m http.server`，`file://` 下浏览器会把每个文件当作独立源。

## 实现要点

- 画框用 `container-type: inline-size`，内部所有尺寸用 `cqw`，因此从 1184px 的主帧缩到 578px 的子帧、再到索引页的缩略图，构图比例不变。
- 动效只用于示意节奏，系统开启「减少动态效果」时自动停播；静态截图即为设计稿。
- 缩略图是各页主帧的真实渲染截图（2× 尺寸），不是另画的示意图。
