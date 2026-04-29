# 原型前端样式规范（Frontend Style Guide）

## 文档定位（可替换层）

| 说明 |
|------|
| 本文件是 **yalo-note / 当前产品后台** 的定制视觉与交互规约（色板、布局尺寸、组件 CSS、Tag 映射等）。 |
| **通用**流程与交付结构见 `prototype-guidelines.md`；**通用**清单与 `annotations.md` 模板见 `prototype-spec.md`。 |
| 将 flow-spec 交付给其他产品线时：**可整文件替换**为对方的设计 Token / 组件库说明，并在技能 contract 中改路径；**不必**修改上述两份通用文档（除非对方要统一改路径前缀等）。 |

> 凡与 `prototype-design` 技能相关的静态 HTML 原型，生成前**必须读取并遵循**本文件中的视觉与交互细则；不得在本项目内自行发明另一套色板与布局。

---

## 一、技术约束


| 约束项    | 规定                                                          |
| ------ | ----------------------------------------------------------- |
| 外部依赖   | **禁止**引用任何 CDN/外部 CSS/JS，全部内联                               |
| CSS 写法 | 全部写在 `<style>` 标签内，不使用 `<link>`                             |
| JS 写法  | 全部写在 `<script>` 标签内，只用原生 JS                                 |
| 字体     | `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| 基础字号   | `14px`                                                      |
| 颜色体系   | 遵循本文件色板，禁止随意使用其他颜色                                          |


---

## 二、色板

### 主色


| 用途          | 色值        |
| ----------- | --------- |
| 主色（Primary） | `#1890ff` |
| 主色悬停        | `#40a9ff` |
| 主色背景（浅）     | `#e6f7ff` |
| 主色边框        | `#91d5ff` |


### 功能色


| 用途          | 色值        |
| ----------- | --------- |
| 成功（Success） | `#52c41a` |
| 成功背景        | `#f6ffed` |
| 成功边框        | `#b7eb8f` |
| 警告（Warning） | `#fa8c16` |
| 警告背景        | `#fff7e6` |
| 警告边框        | `#ffd591` |
| 危险（Danger）  | `#ff4d4f` |
| 危险背景        | `#fff1f0` |
| 危险边框        | `#ffa39e` |
| 紫色（审批/特殊）   | `#722ed1` |
| 紫色背景        | `#f9f0ff` |


### 中性色


| 用途       | 色值        |
| -------- | --------- |
| 页面背景     | `#f0f2f5` |
| 卡片背景     | `#ffffff` |
| 表格斑马行/表头 | `#fafafa` |
| 主要文字     | `#333333` |
| 次要文字     | `#666666` |
| 辅助文字/占位  | `#999999` |
| 禁用文字     | `#bbbbbb` |
| 分割线/边框   | `#e8e8e8` |
| 深分割线     | `#f0f0f0` |


---

## 三、布局结构

所有原型必须采用**侧边栏 + 顶部 Header + 内容区**三段式布局：

```
┌──────────┬──────────────────────────────┐
│          │  Header（56px，白底，sticky） │
│  侧边栏  ├──────────────────────────────┤
│ (200px,  │  面包屑（12px 灰色）          │
│  深色)   ├──────────────────────────────┤
│          │                              │
│          │  内容区（padding 0 24px 24px）│
│          │                              │
└──────────┴──────────────────────────────┘
```


| 区域              | 规格                                          |
| --------------- | ------------------------------------------- |
| 侧边栏宽度           | `200px`，固定定位，背景 `#001529`                   |
| 侧边栏文字           | 默认 `#d9d9d9`，激活/悬停 `#ffffff` + 背景 `#1890ff` |
| Logo 区          | 高度 `60px`，字号 `16px`，加粗                      |
| Header 高度       | `56px`，`position:sticky;top:0;z-index:10`   |
| 内容区 margin-left | `200px`                                     |
| 内容区 padding     | `0 24px 24px`                               |


---

## 四、组件规范

### 4.1 卡片（Card）

```css
background: #fff;
border-radius: 4px;
padding: 20px;
margin-bottom: 16px;
border: 1px solid #e8e8e8;
```

- 卡片标题：`font-size:15px; font-weight:600; padding-bottom:12px; border-bottom:1px solid #f0f0f0`
- 卡片标题行可带右侧操作按钮（flex justify-between）

### 4.2 按钮（Button）


| 类型      | 背景        | 文字        | 边框        | 用途    |
| ------- | --------- | --------- | --------- | ----- |
| Primary | `#1890ff` | `#fff`    | `#1890ff` | 主操作   |
| Default | `#fff`    | `#333`    | `#d9d9d9` | 次要操作  |
| Danger  | `#fff`    | `#ff4d4f` | `#ff4d4f` | 删除/危险 |
| Success | `#52c41a` | `#fff`    | `#52c41a` | 通过/确认 |
| Warning | `#fa8c16` | `#fff`    | `#fa8c16` | 催单/注意 |


- 标准尺寸：`padding: 6px 14px; border-radius: 4px; font-size: 13px`
- 小尺寸（sm）：`padding: 4px 10px; font-size: 12px`
- 按钮组间距：`gap: 8px`

### 4.3 表单控件

- input/select/textarea 统一：`padding:7px 10px; border:1px solid #d9d9d9; border-radius:4px; font-size:13px`
- focus 状态：`border-color:#1890ff; box-shadow:0 0 0 2px rgba(24,144,255,.1)`
- 禁用状态：`background:#f5f5f5; color:#bbb`
- 必填标记：`<span style="color:#ff4d4f">*</span>` 放在 label 内
- 表单行布局：3列 grid，间距 `16px`；2列用 `grid-template-columns:1fr 1fr`

### 4.4 表格（Table）

```css
width: 100%;
border-collapse: collapse;
```

- `th`：`background:#fafafa; padding:10px 12px; font-size:13px; color:#666; border-bottom:1px solid #e8e8e8`
- `td`：`padding:10px 12px; border-bottom:1px solid #f0f0f0`
- `tr:hover td`：`background:#fafffe`
- 操作列按钮用 `display:flex; gap:6px`

### 4.5 状态标签（Tag）


| 状态      | 背景        | 文字        | 边框        |
| ------- | --------- | --------- | --------- |
| 草稿      | `#f5f5f5` | `#8c8c8c` | `#d9d9d9` |
| 审核中     | `#e6f7ff` | `#1890ff` | `#91d5ff` |
| 已发布/通过  | `#f6ffed` | `#52c41a` | `#b7eb8f` |
| 进行中/报价中 | `#fff7e6` | `#fa8c16` | `#ffd591` |
| 关闭/拒绝   | `#fff1f0` | `#ff4d4f` | `#ffa39e` |
| 完成/已定标  | `#f9f0ff` | `#722ed1` | `#d3adf7` |
| 比价中     | `#e6fffb` | `#13c2c2` | `#87e8de` |
| 审批中     | `#fff2e8` | `#fa541c` | `#ffbb96` |


- 统一样式：`display:inline-flex; padding:2px 8px; border-radius:2px; font-size:12px; font-weight:500; border:1px solid`

### 4.6 搜索栏

- 放在 Card 内，使用 `display:flex; gap:12px; flex-wrap:wrap`
- 每个筛选项为 `.form-item`（`flex:1; min-width:160px`）
- 操作按钮（查询/重置）右对齐，`align-items:flex-end`

### 4.7 Tabs

```css
display: flex;
border-bottom: 2px solid #e8e8e8;
margin-bottom: 16px;
```

- 每个 tab：`padding:10px 20px; font-size:13px; color:#666; cursor:pointer`
- 激活：`color:#1890ff; border-bottom:2px solid #1890ff; margin-bottom:-2px; font-weight:600`

### 4.8 弹窗（Modal）

- 遮罩：`position:fixed; inset:0; background:rgba(0,0,0,.45); z-index:1000; display:flex; align-items:center; justify-content:center`
- 弹窗体：`background:#fff; border-radius:4px; width:560px; max-height:80vh; overflow-y:auto`
- Header：`padding:16px 20px; border-bottom:1px solid #e8e8e8; font-weight:600; font-size:15px`
- Body：`padding:20px`
- Footer：`padding:12px 20px; border-top:1px solid #e8e8e8; display:flex; justify-content:flex-end; gap:8px`
- 点击遮罩关闭弹窗

### 4.9 时间线（Timeline）

- 节点圆圈：`width:32px; height:32px; border-radius:50%`
- 已完成：`background:#52c41a; color:#fff`
- 进行中：`background:#1890ff; color:#fff`
- 待处理：`background:#e8e8e8; color:#999`
- 驳回：`background:#ff4d4f; color:#fff`
- 节点间连线：`::after` 伪元素，`width:2px; background:#e8e8e8`

### 4.10 步骤条（Steps）

- 步骤圆圈：`width:28px; height:28px; border-radius:50%; margin:0 auto`
- 步骤间连线：`::before` 在 `.steps` 上，`height:2px; background:#e8e8e8; top:14px`
- 已完成：`background:#52c41a; color:#fff`
- 进行中：`background:#1890ff; color:#fff`
- 待处理：`background:#e8e8e8; color:#999`

### 4.11 提示框（Alert）


| 类型      | 背景        | 边框        | 文字        |
| ------- | --------- | --------- | --------- |
| info    | `#e6f7ff` | `#91d5ff` | `#0050b3` |
| warning | `#fffbe6` | `#ffe58f` | `#8a5c00` |
| success | `#f6ffed` | `#b7eb8f` | `#135200` |
| error   | `#fff1f0` | `#ffa39e` | `#820014` |


- 统一：`padding:10px 14px; border-radius:4px; border:1px solid; font-size:13px; display:flex; align-items:center; gap:8px`

### 4.12 数据统计卡片（Stat Card）

```css
background: #fff;
border-radius: 4px;
padding: 20px;
border: 1px solid #e8e8e8;
text-align: center;
```

- 数值：`font-size:28px; font-weight:700; color:#1890ff`
- 标签：`font-size:12px; color:#999; margin-top:6px`
- 变化趋势：`font-size:12px; margin-top:4px`（上升绿色 `#52c41a`，下降红色 `#ff4d4f`）
- 4列 grid：`grid-template-columns:repeat(4,1fr); gap:16px`

---

## 五、交互规范

### 5.1 页面切换

- 使用 JS `showPage(key)` 函数控制页面显示/隐藏
- 所有页面 `display:none`，激活页面 `display:block`
- 切换时同步更新：Header 标题、面包屑、侧边栏激活项
- 切换后执行 `window.scrollTo(0,0)`

### 5.2 弹窗

- `showModal(id)` / `closeModal(id)` 控制显示
- 点击遮罩关闭
- 弹窗内的确认按钮可触发页面跳转或状态更新

### 5.3 模拟数据要求

- 列表页至少 4~6 条数据，覆盖**所有状态**
- 表单页预填合理的示例数据（不留空）
- 审批页包含完整的审批时间线（已完成+进行中+待处理节点）
- 状态标签颜色必须按本文件规范

---

## 六、页面类型模板要求


| 页面类型   | 必须包含                                |
| ------ | ----------------------------------- |
| 列表页    | 搜索栏 + Tabs + 表格 + 分页 + 新建按钮         |
| 表单页    | 步骤条（多步骤时）+ 分组Card + 必填校验提示 + 底部操作按钮 |
| 详情页    | 状态标签 + 基本信息Grid + 分区展示 + 操作按钮       |
| 审批流页   | 审批信息 + 时间线 + 审批操作区（通过/驳回）           |
| 报表/看板页 | 统计卡片 + 图表占位（含说明文字） + 数据表格           |


---

## 七、禁止事项

- ❌ 禁止引用任何外部资源（CDN、Google Fonts、图片 URL）
- ❌ 禁止使用随意颜色，所有颜色必须来自本文件色板
- ❌ 禁止图表区域留白，必须用 `chart-placeholder` 样式并注明图表类型
- ❌ 禁止表单字段全部留空（必须预填示例数据）
- ❌ 禁止只生成一种状态的数据（列表必须覆盖多种状态）

