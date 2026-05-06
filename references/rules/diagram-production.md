# 图示手绘交付（`diagram-skill`）

本文件说明如何使用技能 **`diagram-skill`** 手绘生成 draw.io XML 格式的泳道、流程、架构、时序等图表。

## 能力边界

- **主要路径**：**直接手写 draw.io XML**，确保使用原生 `swimlane` 形状
- **不包含**：学术论文插图规范、公式排版、云厂商图标库——若项目另有要求，参考 draw.io 官方文档

## 产出路径

见 **`references/rules/storage.md`**：**`{产出根}/diagrams/`**。

## 手绘 XML 方式

不需要安装任何依赖。直接编写 `.drawio` XML 文件。

## 核心元素

| 元素 | 说明 |
|------|------|
| Pool | 顶层泳道容器（`shape=swimlane`） |
| Lane | 子泳道列（参与者/角色） |
| Node | 形状节点（开始、步骤、决策） |
| Edge | 连接线（带标签和样式） |

## 常见问题

| 现象 | 优先动作 |
|------|----------|
| 边标签重叠 | 调整 `mxPoint x, y as offset` 偏移量 |
| 连线过密 | 拆图、多 Page、增大节点坐标间距 |
| 双向语义 | 拆两条单向边并分别标注 |

### 泳道布局要点

- **泳道内**连线：`mxCell parent` = **该 Lane**
- **跨泳道**连线：`parent` = **1**（根节点）
- **跨泳道锚点**：右缘中点出（`exitX=1;exitY=0.5`）→ 左缘中点进（`entryX=0;entryY=0.5`）

## 自检（交付前）

- [ ] 已完成澄清门禁
- [ ] 已对齐基线（若目录内有既有 .drawio）
- [ ] 使用原生 swimlane 形状（非圆角矩形）
- [ ] 用 diagrams.net 或 VS Code draw.io 插件验证可打开

## XML 参考

完整模板和示例见 **`references/specification.md`**。