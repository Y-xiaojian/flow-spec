---
name: diagram-skill
description: >-
  【门禁】Agent 匹配本技能后必须先澄清（泳道/参与者、主干步骤、范围与例外）；未完成澄清禁止直接生成 XML。
  【对齐】同一 CHANGE 目录 diagrams/ 内已有泳道 XML 时，必须先读并以其为结构与 meta 骨架再改标签，禁止臆造与用户规划不一致的流程。
  【引擎】本技能包已改为纯手绘 XML 版本，不依赖任何 JS 引擎。
  内嵌 draw.io 原生泳道 XML 手绘指南；触发词：泳道、流程图、架构图、时序图、draw.io、diagram。
validation_status: experimental
---

# Diagram Skill（纯手绘 XML）

本技能**不再依赖任何 JS 引擎或 CLI 工具**。所有图表通过**直接编写 draw.io XML** 生成，确保：
- 原生 `swimlane` 形状（Pool + Lane）
- 精确的布局控制
- 完全的样式定制

## 交付门禁（强制）

触发「画泳道 / 流程图 / draw.io」等任务时，**禁止**跳过下列步骤：

| 步骤 | 要求 |
|------|------|
| **1. 澄清** | 信息不足以唯一确定泳道与主干时：**必须先**产出 **概要草案**（泳道列表、起止节点、主要网关、**故意不画的范围**）或 **3～6 个关键问题**，待用户确认或补充后再生成 XML。 |
| **2. 对齐基线** | 在 **`{产出根}/changes/<CHANGE-ID>/diagrams/`** 中检索是否已有 **`.drawio`** 文件。**若存在：必须先打开阅读**，新图须与该文件 **保持同一编排层级**，禁止另起炉灶。 |
| **3. 签核后落盘** | 用户明确 **OK**（或逐条调整意见已吸收）后，再生成 XML 并写入 `.drawio` 文件。 |
| **4. 唯一例外** | 用户 **明示**「按附件 XML」「规格已齐」「步骤如下：…」→ 可直接生成，但 **仍须复述** 泳道数、起止与未覆盖范围。 |

## 产出路径

遵循 **`references/rules/storage.md`**：进行中图表放在 **`{产出根}/diagrams/`**（嵌入模式常为 **`temp/diagrams/`**）。

## XML 模板（核心参考）

### 泳道图基础模板

```xml
<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app" version="21.0.0">
  <diagram name="Page-1">
    <mxGraphModel dx="1120" dy="720" grid="1" gridSize="8" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1328" pageHeight="728" math="1" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- 顶层 Pool (horizontal=0 表示横向排列子泳道) -->
        <mxCell id="pool" value="【标题】"
          style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;startSize=28;horizontal=0;horizontalStack=1;fillColor=#F1F5F9;strokeColor=#E2E8F0;strokeWidth=1"
          vertex="1" parent="1">
          <mxGeometry x="48" y="64" width="1200" height="【高度】" as="geometry"/>
        </mxCell>

        <!-- 泳道1 (horizontal=1 表示纵向排列内容) -->
        <mxCell id="lane1" value="【泳道名称】"
          style="swimlane;html=1;whiteSpace=wrap;startSize=40;horizontal=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;fontColor=#1E293B;fontSize=14;strokeWidth=1"
          vertex="1" parent="pool">
          <mxGeometry x="0" y="28" width="【泳道宽度】" height="【高度】" as="geometry"/>
        </mxCell>

        <!-- 其他泳道类似... -->

        <!-- 节点：开始/结束（圆角50，终端样式） -->
        <mxCell id="start" value="开始"
          style="rounded=1;arcSize=50;html=1;whiteSpace=wrap;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="lane1">
          <mxGeometry x="【X】" y="【Y】" width="80" height="40" as="geometry"/>
        </mxCell>

        <!-- 节点：处理步骤（圆角20，蓝色） -->
        <mxCell id="step1" value="【步骤名称】"
          style="rounded=1;arcSize=20;html=1;whiteSpace=wrap;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="lane1">
          <mxGeometry x="【X】" y="【Y】" width="120" height="60" as="geometry"/>
        </mxCell>

        <!-- 节点：决策判断（菱形，黄色） -->
        <mxCell id="decision1" value="【判断条件？】"
          style="rhombus;html=1;whiteSpace=wrap;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="lane1">
          <mxGeometry x="【X】" y="【Y】" width="120" height="60" as="geometry"/>
        </mxCell>

        <!-- 普通边（跨泳道，正交） -->
        <mxCell id="edge1" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5"
          edge="1" parent="1" source="step1" target="step2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 带标签的边 -->
        <mxCell id="edge2" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0"
          edge="1" parent="1" source="step1" target="step2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2_label" value="【标签文字】" style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#64748B;" vertex="1" connectable="0" parent="edge2">
          <mxGeometry x="0.5" relative="1" as="geometry"><mxPoint x="0" y="-12" as="offset"/></mxGeometry>
        </mxCell>

        <!-- 否定边（虚线） -->
        <mxCell id="edge_no" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1;endArrow=open;endFill=0;exitX=0.5;exitY=1;entryX=0.5;entryY=0;dashed=1;dashPattern=2 2"
          edge="1" parent="1" source="decision1" target="end_fail">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_no_label" value="否" style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#64748B;" vertex="1" connectable="0" parent="edge_no">
          <mxGeometry x="0.5" relative="1" as="geometry"><mxPoint x="12" y="0" as="offset"/></mxGeometry>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

## 节点样式速查

| 类型 | style 关键属性 | 场景 |
|------|---------------|------|
| **开始/结束** | `rounded=1;arcSize=50` | 终端节点 |
| **处理步骤** | `rounded=1;arcSize=20` | 普通流程节点 |
| **决策判断** | `shape=rhombus` 或 `rhombus` | 条件分支 |
| **异常结束** | 同开始/结束，颜色偏灰 | 失败/取消路径 |

## 颜色主题（tech-blue）

| 用途 | fillColor | strokeColor |
|------|-----------|-------------|
| Pool 背景 | `#F1F5F9` | `#E2E8F0` |
| Lane 背景 | `#F8FAFC` | `#E2E8F0` |
| 终端（开始/结束） | `#F1F5F9` | `#64748B` |
| 处理步骤 | `#DBEAFE` | `#2563EB` |
| 决策判断 | `#FEF3C7` | `#D97706` |
| 边（默认） | - | `#1E293B` |
| 边（否定/虚线） | - | `#64748B` |

## 布局参数

| 参数 | 值 | 说明 |
|------|-----|------|
| Pool 起始 X | 48 | 画布左边距 |
| Pool 起始 Y | 64 | 画布上边距 |
| 单泳道宽度 | 280 | 4泳道时约 1200px 总宽 |
| Lane startSize | 40 | 标题栏高度 |
| 节点间距 Y | 40-80 | 步骤间垂直间距 |
| 边距 | 24 | 节点到泳道边框 |

## 长节点文案处理（脚注系统）

当节点文案较长（如 SOP 条文、系统名称、完整规则说明），可采用**节点+脚注**分离策略：

### 核心原则

| 要素 | 约定 |
|------|------|
| **节点内** | 只写 **精简动作名**（8～16 字），动词开头，避免长句 |
| **编号角标** | 左上角放置小号编号徽章 **❶❷❸❹** 与脚注对应 |
| **底部脚注区** | 独立矩形区域，标题 **「【交接说明】」**，逐项展开完整说明 |

### 脚注区 XML 模板

```xml
<!-- 脚注区（放在 Pool 下方或单独 Page） -->
<mxCell id="footnote_title" value="【交接说明】"
  style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#1E293B;fontSize=14;fontStyle=1"
  vertex="1" parent="1">
  <mxGeometry x="48" y="【底部Y】" width="200" height="24" as="geometry"/>
</mxCell>

<!-- 脚注项 -->
<mxCell id="footnote_1" value="❶ 指定交接人并监督移交签字"
  style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;fontColor=#64748B;fontSize=12"
  vertex="1" parent="1">
  <mxGeometry x="48" y="【底部Y+24】" width="1100" height="24" as="geometry"/>
</mxCell>
```

### 节点文案规则

- **节点**：动词开头或「名词+动词」短句；避免一段话塞进矩形
- **连线标签**：分支写 **结果状态**（完成/未完成、同意/驳回），不写长理由
- **脚注**：允许完整句与文档引用；编号列表可用 **①②③④** 或 **1）2）3）**

### 示例映射

| 角标 | 节点短文案 | 脚注长文案方向 |
|------|-----------|---------------|
| ❶ | 指定交接人 | 指定交接人、跟进待办/项目/资产、监督执行、移交完成签字 |
| ❷ | 办理交接手续 | 依据 `QT-SOP-XXX-01` 办理部门内交接 |
| ❸ | 核对交接结果 | 依据清单核实是否交接完成 |
| ❹ | 系统自动发起 | 系统自动发起流程、通知各部门交接人等 |

### 交付前自检

- [ ] **已完成澄清门禁**（或用户明示例外且已复述边界）
- [ ] **已对齐基线**（若目录内有既有 .drawio 文件）
- [ ] swimlane 形状使用正确（不是圆角矩形）
- [ ] 边标签与节点无明显重叠
- [ ] 用 diagrams.net 或 VS Code draw.io 插件验证可打开
- [ ] 每个角标在脚注区中有对应条目；脚注条目编号与图中一致
- [ ] 决策出口两条以上时有清晰标签

## 常见布局公式

### 4泳道横向排列
```
Pool 总宽度 = 1200
单泳道宽度 = 280
泳道X = 0, 280, 560, 840（相对于 Pool 内）
```

### 垂直流程节点
```
节点Y = 48, 128, 208, 288... （每步 +80）
```

### 决策分支
```
是 → 下（exitY=1, entryY=0）
否 → 左/右（虚线，dashed=1）
```

## 上游参考

原生 draw.io 泳道语法见 https://www.diagrams.net/doc/faq/s泳道-editing

## 与飞书泳道技能的关系

**`skills/feishu-board-swimlane-flowchart/SKILL.md`** 定义了飞书画板上的等价版式（纵向泳道、❶❷❸❹ 角标、脚注系统）。两份技能的**节点文案规则与脚注逻辑一致**，可交叉参考：

- **本技能**（diagram-skill）：产出 `.drawio` 文件，适合归档与文档引用
- **飞书技能**：产出飞书画板上的等价手绘规范，样式与脚注逻辑对齐

长节点文案处理（脚注系统）已整合至本技能，无需切换技能。