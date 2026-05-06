# diagram-skill（手绘 XML 版）

**已移除所有 JS 引擎依赖**，本技能包现在采用**纯手绘 XML** 方式生成 draw.io 图表。

## 使用方式

1. 阅读 `SKILL.md` 了解 XML 模板和门禁规则
2. 根据用户需求，手写 `.drawio` XML 文件
3. 将文件写入 **`{产出根}/diagrams/`** 目录

## 快速开始

### 泳道图核心模板

```xml
<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app" version="21.0.0">
  <diagram name="Page-1">
    <mxGraphModel dx="1120" dy="720" grid="1" gridSize="8" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1328" pageHeight="728" math="1" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- 顶层 Pool -->
        <mxCell id="pool" value="流程名称"
          style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;startSize=28;horizontal=0;fillColor=#F1F5F9;strokeColor=#E2E8F0"
          vertex="1" parent="1">
          <mxGeometry x="48" y="64" width="1200" height="560" as="geometry"/>
        </mxCell>

        <!-- 泳道1 -->
        <mxCell id="lane1" value="泳道A"
          style="swimlane;html=1;startSize=40;horizontal=1;fillColor=#F8FAFC;strokeColor=#E2E8F0"
          vertex="1" parent="pool">
          <mxGeometry x="0" y="28" width="280" height="532" as="geometry"/>
        </mxCell>

        <!-- 更多泳道... -->

        <!-- 节点（parent 指向泳道） -->
        <mxCell id="start" value="开始"
          style="rounded=1;arcSize=50;fillColor=#F1F5F9;strokeColor=#64748B"
          vertex="1" parent="lane1">
          <mxGeometry x="100" y="48" width="80" height="40" as="geometry"/>
        </mxCell>

        <!-- 边（parent=1 跨泳道） -->
        <mxCell id="edge" style="edgeStyle=orthogonalEdgeStyle;endArrow=block;exitX=1;exitY=0.5;entryX=0;entryY=0.5"
          edge="1" parent="1" source="node1" target="node2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

## 节点样式速查

| 类型 | 样式 |
|------|------|
| 开始/结束 | `rounded=1;arcSize=50;fillColor=#F1F5F9;strokeColor=#64748B` |
| 处理步骤 | `rounded=1;arcSize=20;fillColor=#DBEAFE;strokeColor=#2563EB` |
| 决策判断 | `rhombus;fillColor=#FEF3C7;strokeColor=#D97706` |

## 产出路径

遵循 `references/rules/storage.md`：图表放在 **`diagrams/`** 目录。

## 参考文件

- `SKILL.md` - 完整技能说明和门禁规则
- `references/specification.md` - XML 结构参考
- `references/rules/diagram-production.md` - 产出规则