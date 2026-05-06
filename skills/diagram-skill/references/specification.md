# XML Specification for Hand-Drawn Diagrams

This document describes the draw.io XML structure for hand-drawn swimlane diagrams.

---

## Overview

All diagrams are written as raw draw.io XML. No YAML conversion or JS engine required.

---

## Basic Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app" version="21.0.0">
  <diagram name="Page-1">
    <mxGraphModel
      dx="1120" dy="720"
      grid="1" gridSize="8"
      guides="1" tooltips="1" connect="1" arrows="1"
      fold="1" page="1" pageScale="1"
      pageWidth="1328" pageHeight="728"
      math="1" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Pool (swimlane container) -->
        <!-- Lanes (child swimlanes) -->
        <!-- Nodes (shapes) -->
        <!-- Edges (connectors) -->

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## Pool (Top-Level Container)

Top-level swimlane that contains all lanes.

```xml
<mxCell id="pool" value="【标题】"
  style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;startSize=28;horizontal=0;horizontalStack=1;fillColor=#F1F5F9;strokeColor=#E2E8F0;strokeWidth=1"
  vertex="1" parent="1">
  <mxGeometry x="48" y="64" width="1200" height="560" as="geometry"/>
</mxCell>
```

| Attribute | Value | Description |
|-----------|-------|-------------|
| `style` | `swimlane;...` | Swimlane shape |
| `childLayout` | `stackLayout` | Children stacked |
| `resizeParent` | `1` | Parent resizes with children |
| `horizontal` | `0` | Lanes arranged horizontally |
| `horizontalStack` | `1` | Enable horizontal stacking |
| `startSize` | `28` | Header row height |
| `fillColor` | `#F1F5F9` | Light gray background |
| `strokeColor` | `#E2E8F0` | Light border |

---

## Lane (Swimlane Column)

Child swimlane within the pool. Each represents a participant/role.

```xml
<mxCell id="lane_buyer" value="买家"
  style="swimlane;html=1;whiteSpace=wrap;startSize=40;horizontal=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;fontColor=#1E293B;fontSize=14;strokeWidth=1"
  vertex="1" parent="pool">
  <mxGeometry x="0" y="28" width="280" height="532" as="geometry"/>
</mxCell>
```

| Attribute | Value | Description |
|-----------|-------|-------------|
| `parent` | `pool` | Parent is the pool |
| `horizontal` | `1` | Content arranged vertically |
| `startSize` | `40` | Lane title height |
| `width` | `280` | Lane width (adjust per layout) |
| `height` | `532` | Lane height (Pool height - 28) |

### Lane Width Calculation

For N lanes in a 1200px wide pool:
```
laneWidth = (1200 - 24) / N  // minus some margin
```

Or manually set: 240, 280, 320 based on content.

---

## Node (Shape)

### Terminal (Start/End)

```xml
<mxCell id="start" value="开始"
  style="rounded=1;arcSize=50;html=1;whiteSpace=wrap;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
  vertex="1" parent="lane_buyer">
  <mxGeometry x="100" y="48" width="80" height="40" as="geometry"/>
</mxCell>
```

### Process Step

```xml
<mxCell id="step1" value="提交订单"
  style="rounded=1;arcSize=20;html=1;whiteSpace=wrap;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
  vertex="1" parent="lane_buyer">
  <mxGeometry x="80" y="128" width="120" height="60" as="geometry"/>
</mxCell>
```

### Decision (Diamond)

```xml
<mxCell id="decision1" value="支付成功？"
  style="rhombus;html=1;whiteSpace=wrap;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
  vertex="1" parent="lane_platform">
  <mxGeometry x="80" y="240" width="120" height="60" as="geometry"/>
</mxCell>
```

### Failure End

```xml
<mxCell id="end_fail" value="订单关闭"
  style="rounded=1;arcSize=50;html=1;whiteSpace=wrap;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
  vertex="1" parent="lane_platform">
  <mxGeometry x="32" y="336" width="80" height="40" as="geometry"/>
</mxCell>
```

---

## Edge (Connector)

### Standard Flow (within same lane)

```xml
<mxCell id="edge1" value=""
  style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0"
  edge="1" parent="lane_buyer" source="start" target="step1">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>
```

### Cross-Lane Flow

```xml
<mxCell id="edge2" value=""
  style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5"
  edge="1" parent="1" source="step1" target="step2">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>
```

Note: Cross-lane edges use `parent="1"` (root) instead of a lane.

### Edge with Label

```xml
<mxCell id="edge3" value=""
  style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5"
  edge="1" parent="1" source="step1" target="step2">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>
<mxCell id="edge3_label" value="订单信息"
  style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#64748B;"
  vertex="1" connectable="0" parent="edge3">
  <mxGeometry x="0.5" relative="1" as="geometry"><mxPoint x="0" y="-12" as="offset"/></mxGeometry>
</mxCell>
```

### Negative/Branch Edge (dashed)

```xml
<mxCell id="edge_no" value=""
  style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1;endArrow=open;endFill=0;exitX=0.5;exitY=1;entryX=0.5;entryY=0;dashed=1;dashPattern=2 2"
  edge="1" parent="1" source="decision1" target="end_fail">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>
<mxCell id="edge_no_label" value="否"
  style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#64748B;"
  vertex="1" connectable="0" parent="edge_no">
  <mxGeometry x="0.5" relative="1" as="geometry"><mxPoint x="12" y="0" as="offset"/></mxGeometry>
</mxCell>
```

---

## Exit/Entry Points

| Direction | exitX/exitY | entryX/entryY |
|------------|-------------|---------------|
| Down | `0.5` / `1` | `0.5` / `0` |
| Up | `0.5` / `0` | `0.5` / `1` |
| Right | `1` / `0.5` | `0` / `0.5` |
| Left | `0` / `0.5` | `1` / `0.5` |

---

## Color Palette (tech-blue theme)

| Element | fillColor | strokeColor |
|---------|-----------|-------------|
| Pool | `#F1F5F9` | `#E2E8F0` |
| Lane | `#F8FAFC` | `#E2E8F0` |
| Terminal (start/end) | `#F1F5F9` | `#64748B` |
| Process | `#DBEAFE` | `#2563EB` |
| Decision | `#FEF3C7` | `#D97706` |
| Edge (standard) | - | `#1E293B` |
| Edge (negative) | - | `#64748B` |
| Text | - | `#1E293B` |
| Text muted | - | `#64748B` |

---

## Complete Example (Order to Shipment)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app" version="21.0.0">
  <diagram name="Page-1">
    <mxGraphModel dx="1120" dy="720" grid="1" gridSize="8" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1328" pageHeight="728" math="1" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Pool -->
        <mxCell id="2" value="订单到发货流程"
          style="swimlane;html=1;whiteSpace=wrap;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;startSize=28;horizontal=0;horizontalStack=1;fillColor=#F1F5F9;strokeColor=#E2E8F0;strokeWidth=1"
          vertex="1" parent="1">
          <mxGeometry x="48" y="64" width="1200" height="584" as="geometry"/>
        </mxCell>

        <!-- Lane: 买家 -->
        <mxCell id="3" value="买家"
          style="swimlane;html=1;whiteSpace=wrap;startSize=40;horizontal=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;fontColor=#1E293B;fontSize=14;strokeWidth=1"
          vertex="1" parent="2">
          <mxGeometry x="24" y="8" width="280" height="568" as="geometry"/>
        </mxCell>

        <!-- Lane: 电商平台 -->
        <mxCell id="4" value="电商平台"
          style="swimlane;html=1;whiteSpace=wrap;startSize=40;horizontal=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;fontColor=#1E293B;fontSize=14;strokeWidth=1"
          vertex="1" parent="2">
          <mxGeometry x="312" y="8" width="280" height="568" as="geometry"/>
        </mxCell>

        <!-- Lane: 仓储履约 -->
        <mxCell id="5" value="仓储履约"
          style="swimlane;html=1;whiteSpace=wrap;startSize=40;horizontal=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;fontColor=#1E293B;fontSize=14;strokeWidth=1"
          vertex="1" parent="2">
          <mxGeometry x="600" y="8" width="280" height="568" as="geometry"/>
        </mxCell>

        <!-- Lane: 承运物流 -->
        <mxCell id="6" value="承运物流"
          style="swimlane;html=1;whiteSpace=wrap;startSize=40;horizontal=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;fontColor=#1E293B;fontSize=14;strokeWidth=1"
          vertex="1" parent="2">
          <mxGeometry x="888" y="8" width="280" height="568" as="geometry"/>
        </mxCell>

        <!-- Node: 开始 (买家) -->
        <mxCell id="7" value="开始"
          style="rounded=1;arcSize=50;html=1;whiteSpace=wrap;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="3">
          <mxGeometry x="104" y="48" width="80" height="40" as="geometry"/>
        </mxCell>

        <!-- Node: 提交订单 (买家) -->
        <mxCell id="8" value="提交订单"
          style="rounded=1;arcSize=20;html=1;whiteSpace=wrap;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="3">
          <mxGeometry x="80" y="128" width="120" height="60" as="geometry"/>
        </mxCell>

        <!-- Node: 接单创建订单 (电商平台) -->
        <mxCell id="9" value="接单创建订单"
          style="rounded=1;arcSize=20;html=1;whiteSpace=wrap;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="4">
          <mxGeometry x="80" y="48" width="120" height="60" as="geometry"/>
        </mxCell>

        <!-- Node: 发起支付 (电商平台) -->
        <mxCell id="10" value="发起支付"
          style="rounded=1;arcSize=20;html=1;whiteSpace=wrap;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="4">
          <mxGeometry x="80" y="144" width="120" height="60" as="geometry"/>
        </mxCell>

        <!-- Node: 支付成功？ (电商平台) -->
        <mxCell id="11" value="支付成功？"
          style="rhombus;html=1;whiteSpace=wrap;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="4">
          <mxGeometry x="80" y="240" width="120" height="60" as="geometry"/>
        </mxCell>

        <!-- Node: 订单关闭 (电商平台 - failure) -->
        <mxCell id="12" value="订单关闭"
          style="rounded=1;arcSize=50;html=1;whiteSpace=wrap;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="4">
          <mxGeometry x="32" y="336" width="80" height="40" as="geometry"/>
        </mxCell>

        <!-- Node: 下发出库任务 (电商平台) -->
        <mxCell id="13" value="下发出库任务"
          style="rounded=1;arcSize=20;html=1;whiteSpace=wrap;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="4">
          <mxGeometry x="128" y="336" width="120" height="60" as="geometry"/>
        </mxCell>

        <!-- Node: 拣货 (仓储履约) -->
        <mxCell id="14" value="拣货"
          style="rounded=1;arcSize=20;html=1;whiteSpace=wrap;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="5">
          <mxGeometry x="80" y="48" width="120" height="60" as="geometry"/>
        </mxCell>

        <!-- Node: 库存充足？ (仓储履约) -->
        <mxCell id="15" value="库存充足？"
          style="rhombus;html=1;whiteSpace=wrap;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="5">
          <mxGeometry x="80" y="144" width="120" height="60" as="geometry"/>
        </mxCell>

        <!-- Node: 缺货待处理 (仓储履约 - failure) -->
        <mxCell id="16" value="缺货待处理/拦截"
          style="rounded=1;arcSize=50;html=1;whiteSpace=wrap;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="5">
          <mxGeometry x="32" y="240" width="80" height="40" as="geometry"/>
        </mxCell>

        <!-- Node: 复核打包 (仓储履约) -->
        <mxCell id="17" value="复核打包"
          style="rounded=1;arcSize=20;html=1;whiteSpace=wrap;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="5">
          <mxGeometry x="128" y="240" width="120" height="60" as="geometry"/>
        </mxCell>

        <!-- Node: 交接承运 (仓储履约) -->
        <mxCell id="18" value="交接承运（发货）"
          style="rounded=1;arcSize=20;html=1;whiteSpace=wrap;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="5">
          <mxGeometry x="128" y="416" width="120" height="60" as="geometry"/>
        </mxCell>

        <!-- Node: 揽收 (承运物流) -->
        <mxCell id="19" value="揽收"
          style="rounded=1;arcSize=20;html=1;whiteSpace=wrap;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="6">
          <mxGeometry x="80" y="416" width="120" height="60" as="geometry"/>
        </mxCell>

        <!-- Node: 发货完成 (承运物流) -->
        <mxCell id="20" value="发货完成（配送中）"
          style="rounded=1;arcSize=50;html=1;whiteSpace=wrap;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;fontColor=#1E293B;fontSize=13;fontFamily=Inter,Roboto,system-ui,-apple-system,sans-serif;verticalAlign=middle;align=center"
          vertex="1" parent="6">
          <mxGeometry x="104" y="512" width="80" height="40" as="geometry"/>
        </mxCell>

        <!-- Edges -->
        <!-- 开始 → 提交订单 (same lane) -->
        <mxCell id="21" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0"
          edge="1" parent="3" source="7" target="8">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 提交订单 → 接单创建订单 (cross lane) -->
        <mxCell id="22" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5"
          edge="1" parent="1" source="8" target="9">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="23" value="订单信息"
          style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#64748B;"
          vertex="1" connectable="0" parent="22">
          <mxGeometry x="0.5" relative="1" as="geometry"><mxPoint x="0" y="-12" as="offset"/></mxGeometry>
        </mxCell>

        <!-- 接单创建订单 → 发起支付 -->
        <mxCell id="24" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0"
          edge="1" parent="4" source="9" target="10">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 发起支付 → 支付成功？ -->
        <mxCell id="25" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0"
          edge="1" parent="4" source="10" target="11">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 支付成功？ → 否 → 订单关闭 -->
        <mxCell id="26" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1;endArrow=open;endFill=0;exitX=0.5;exitY=1;entryX=0.5;entryY=0;dashed=1;dashPattern=2 2"
          edge="1" parent="4" source="11" target="12">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="27" value="否"
          style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#64748B;"
          vertex="1" connectable="0" parent="26">
          <mxGeometry x="0.5" relative="1" as="geometry"><mxPoint x="12" y="0" as="offset"/></mxGeometry>
        </mxCell>

        <!-- 支付成功？ → 是 → 下发任务 -->
        <mxCell id="28" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0"
          edge="1" parent="4" source="11" target="13">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="29" value="是"
          style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#64748B;"
          vertex="1" connectable="0" parent="28">
          <mxGeometry x="0.5" relative="1" as="geometry"><mxPoint x="12" y="0" as="offset"/></mxGeometry>
        </mxCell>

        <!-- 下发任务 → 拣货 -->
        <mxCell id="30" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5"
          edge="1" parent="1" source="13" target="14">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="31" value="出库指令"
          style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#64748B;"
          vertex="1" connectable="0" parent="30">
          <mxGeometry x="0.5" relative="1" as="geometry"><mxPoint x="0" y="-12" as="offset"/></mxGeometry>
        </mxCell>

        <!-- 拣货 → 库存充足？ -->
        <mxCell id="32" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0"
          edge="1" parent="5" source="14" target="15">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 库存充足？ → 否 → 缺货 -->
        <mxCell id="33" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1;endArrow=open;endFill=0;exitX=0.5;exitY=1;entryX=0.5;entryY=0;dashed=1;dashPattern=2 2"
          edge="1" parent="5" source="15" target="16">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="34" value="否"
          style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#64748B;"
          vertex="1" connectable="0" parent="33">
          <mxGeometry x="0.5" relative="1" as="geometry"><mxPoint x="12" y="0" as="offset"/></mxGeometry>
        </mxCell>

        <!-- 库存充足？ → 是 → 复核打包 -->
        <mxCell id="35" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0"
          edge="1" parent="5" source="15" target="17">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="36" value="是"
          style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#64748B;"
          vertex="1" connectable="0" parent="35">
          <mxGeometry x="0.5" relative="1" as="geometry"><mxPoint x="12" y="0" as="offset"/></mxGeometry>
        </mxCell>

        <!-- 复核打包 → 交接承运 -->
        <mxCell id="37" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0"
          edge="1" parent="5" source="17" target="18">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 交接承运 → 揽收 -->
        <mxCell id="38" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5"
          edge="1" parent="1" source="18" target="19">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="39" value="出库交接"
          style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#64748B;"
          vertex="1" connectable="0" parent="38">
          <mxGeometry x="0.5" relative="1" as="geometry"><mxPoint x="0" y="-12" as="offset"/></mxGeometry>
        </mxCell>

        <!-- 揽收 → 发货完成 -->
        <mxCell id="40" value=""
          style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0"
          edge="1" parent="6" source="19" target="20">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## Migration Notes

- This replaces the old YAML-based specification format
- No JS engine required - pure hand-drawn XML
- All swimlanes use `shape=swimlane` (not rounded rectangles)
- Cross-lane edges use `parent="1"` (root cell)