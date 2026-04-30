---
name: swimlane-diagram
description: 生成需求文档第二章所需的跨职能泳道业务流程图（draw.io XML）；与 requirement-doc-writing 配合使用，也可在流程已澄清时单独调用
validation_status: experimental
---

# 泳道业务流程图（draw.io）

## 与 `requirement-doc-writing` 的关系

- **PRD 第二章（2.2）** 中的跨职能泳道图由本技能规约；`requirement-doc-writing` **不重复**泳道绘制细则，仅引用本技能路径与产出位置。
- 执行顺序：编写 PRD 至「二、需求范围」需插图时，**加载本技能**并按本文生成/修订 `.drawio`；再回到 PRD 中写路径、脚注与流程说明表。

## 与通用 draw.io 规约（成熟 skill 摘录）的关系

- 仓库内 **`references/external/draw-io/SKILL.md`** 来自 [softaworks/agent-toolkit draw-io](https://github.com/softaworks/agent-toolkit/tree/main/skills/draw-io)，覆盖 **XML 编辑、坐标、导出、字体、箭头图层、无障碍与版式细节**。
- **执行方式**：维护 PRD 泳道时 **本技能优先**（泳道语义、配色、连线语义）；涉及 **改 XML 坐标、导出高清 PNG、箭头与标签叠压** 时，**叠加遵循**上述 `draw-io` 摘录中与泳道兼容的条款（见下节「叠加要点」）。AWS 图标、Quarto/reveal.js 等与本包 PRD 泳道无关的可忽略。

## 输入 → 输出 contract


| 输入   | 说明                                            |
| ---- | --------------------------------------------- |
| 流程来源 | `changes/<CHANGE-ID>/brainstorm/<需求名>.md` 中的主流程/角色，或已定稿的流程说明 |
| 泳道角色 | 用户确认的角色/系统列表（如：采购员、审批人、供应商、系统）                |


| 输出    | 路径                                                         |
| ----- | ---------------------------------------------------------- |
| 泳道图文件 | `changes/<CHANGE-ID>/diagrams/<需求名>-process.drawio`（文件名与 PRD contract 一致；相对 **`{产出根}`**） |


⛔ **CHECKPOINT（建议）**：输出或大幅修改泳道前，列出拟采用的**泳道列顺序**与**主分支**，等用户确认后再写入 XML。

## 格式与使用方式

- **格式**：draw.io 原生 **XML**（`mxfile` / `mxGraphModel`），UTF-8，便于版本管理与二次编辑。
- **使用方式**：生成后在 [draw.io](https://app.diagrams.net/) 打开、微调布局，**截图插入 PRD** 第二章；文中保留 `.drawio` 文件路径供研发打开源文件。
- **导出 PNG（可选）**：本机已安装 draw.io 桌面 CLI 时：`drawio -x -f png -s 2 -t -o <输出>.png <输入>.drawio`（`-s 2` 提高清晰度，`-t` 透明底，便于贴 PRD）。

## 叠加要点（与 `draw-io` 摘录对齐，泳道场景）

- **只编辑 `.drawio` 源文件**；不要手改已导出的 `.png`。
- **画布**：优先透明底（避免写死 `background="#ffffff"`），适配 PRD 深浅主题。
- **字体**：可在 `mxGraphModel` 上设 `defaultFontFamily`（中文常用如 `Microsoft YaHei` / 项目规范字体）；步骤节点 `style` 中显式 `fontSize`，**插入 PRD 的截图建议 ≥18px** 级可读性。
- **版式**：用 `mxGeometry` 的 `x/y/width/height` 调整；元素竖直居中可参考 `y + height/2` 对齐多节点。泳道 **内容区**内活动块距泳道边界（含圆角与线宽）**≥30px**，避免导出裁切或贴边。
- **图层顺序（XML 顺序）**：在 `mxCell` 列表中，**连线尽量排在被遮挡的矩形之后、或按摘录建议把标题→连线→前景块排序**，减少标签被线贯穿；连线端点距步骤文字底边 **≥20px**。
- **连线与文本**：本技能规定 `orthogonalEdgeStyle`；若连接纯文本节点时 `exitX/exitY` 异常，改用 `mxGeometry` 内 `sourcePoint`/`targetPoint` 与 `Array` 折点（详见 `references/external/draw-io/SKILL.md` §6.5）。
- **复杂度**：步骤过多时 **拆多张泳道图** 或 **降低单图细节**，与摘录中 progressive disclosure 一致。

## 泳道图绘制风格（跨职能流程图）

**布局规则**（与 `material-outbound-process`、`contract-process` 等参考图保持一致）：

- **泳道横向并排**：每个角色一列，从左到右依次排列（非上下堆叠）
- **horizontal=1**：泳道标题在**上方**，流程在**下方**
- **startSize=80**：顶部角色名区域高度 80px
- **泳道 geometry**：`x` 依次 20、240、460、680、900…（步长 220）；`y=40`；`width=220`；`height=560`（内容增多时按比例加高并同步 **30px 内边距**）
- **流程方向**：列内自上而下（y 递增），列间从左到右（x 递增）

**泳道结构：**

- 每泳道对应一个角色/系统，使用**彩色泳道标题**与**浅色背景**区分
- 泳道示例配色：采购/业务（蓝 `#e8f4fc`）、审批人（绿 `#f6ffed`）、供应商（橙 `#fff7e6`）、系统（灰 `#fafafa`）等
- 泳道使用 `swimlane;horizontal=1;fillColor=…;strokeColor=…;startSize=80`

**形状与符号：**

- **起始点**：绿色实心圆（`fillColor=#52c41a`）
- **结束点**：黑色实心圆（`fillColor=#595959`）
- **流程步骤**：圆角矩形（`rounded=1`）
- **决策点 / 汇合点**：菱形（`rhombus`）
- **系统处理（SRM 等）**：浅蓝色圆角矩形（`fillColor=#e6f7ff`），突出系统环节
- **驳回/拒绝**：红色填充圆角矩形（`fillColor=#fff5f5`），表示负面结果

**连接线：**

- **edgeStyle=orthogonalEdgeStyle**：直角折线（非直线）
- **主流程**：黑色实线 `strokeColor=#595959`，`strokeWidth=2`
- **通过**：绿色实线 `strokeColor=#52c41a`
- **驳回/拒绝**：红色虚线 `strokeColor=#f5222d`，`dashed=1`
- **分支/系统流**：灰色虚线 `strokeColor=#8c8c8c`，`dashed=1`
- **方向**：优先单向箭头；双向交互拆成两条单向边（与通用 skill 一致）

**文本与脚注：**

- 步骤文案简短、含关键信息（如「参考 ERP」「可多次」）；多行用 `<br>`。
- 图底加一行概括脚注：`主流程:xxx→xxx→xxx|分支:xxx`
- 图内可保留**标题 / 版本或日期**元信息，便于评审（对应通用 skill 的 metadata 要求）

## draw.io XML 输出要点

- 输出 draw.io 可解析的 `mxfile` / `mxGraphModel` XML
- 泳道：`swimlane;horizontal=1;startSize=80`，横向并排列（x 递增）
- 活动节点：`rounded=1`；网关：`rhombus` 菱形
- 连线：`edgeStyle=orthogonalEdgeStyle`，主流程黑实线、驳回红虚线、分支灰虚线
- 角色泳道按颜色区分，系统操作用浅蓝突出，拒绝路径用红色

**参考**：历史项目中的泳道 `.drawio` 可放在 `changes/<CHANGE-ID>/diagrams/` 或业务仓库约定路径，保持与当前 PRD 引用路径一致即可。

## 交付前自检（泳道 + 通用叠加）

- [ ] 仅维护 `.drawio`；PRD 插图来自导出或截图且清晰
- [ ] UTF-8、`mxfile` 根结构正确，可在 app.diagrams.net 打开
- [ ] 字体与字号满足 PRD 印刷/屏读；透明底未误设死白底
- [ ] 泳道内边距 ≥30px；连线不压盖步骤主文案（必要时调 `mxGeometry` 或 XML 中 cell 顺序）
- [ ] 箭头端点与标签间距 ≥20px；边标签需偏移时用 `offset`（见 `draw-io` 摘录 §6.6）
- [ ] 主/驳/分支线型与配色符合本节「连接线」约定
- [ ] 脚注与 PRD「流程说明表」、头脑风暴角色一致

## 避坑


| 情况                 | 处理                        |
| ------------------ | ------------------------- |
| 泳道数过多              | 合并「系统」为单列，或拆成多张图          |
| XML 无法在 draw.io 打开 | 校验 `mxfile` 根节点与编码为 UTF-8 |
| 与头脑风暴角色不一致         | 以用户确认的泳道列表为准并回写 PRD 流程说明表 |
| 导出 PNG 模糊或裁切        | 提高 `height`、加大边距，或用 `-s 2` 导出  |
