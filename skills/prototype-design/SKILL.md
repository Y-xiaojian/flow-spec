---

## name: prototype-design
description: 基于头脑风暴结论生成原型图，经人工确认后输出可交付静态原型；是 write-doc 流水线中 brainstorming → feature-list 之间的必经检查点
validation_status: experimental

# 原型设计技能

## 文档三层模型（必读）


| 层级         | 默认路径（本仓库）                                      | 通用性            | 职责                                |
| ---------- | ---------------------------------------------- | -------------- | --------------------------------- |
| **前端样式规范** | `references/templates/frontend-style-guide.md` | **产品定制**，可整体替换 | 色板、布局像素、组件样式、交互函数名与禁止项            |
| **原型通用规范** | `references/templates/prototype-guidelines.md` | **通用**         | 交付形态、页面类型、标注/数据原则、检查点、迁移说明        |
| **原型模板**   | `references/templates/prototype-spec.md`       | **通用**         | 页面清单表、annotations 结构、HTML 逻辑块自检清单 |


其他产品线接入时：**替换「前端样式规范」文件及本技能 contract 中的路径**；通用规范与模板保持不动即可对齐流程。

## 前置条件

加载本技能前，以下产物必须已存在：

- `changes/<CHANGE-ID>/brainstorm/` 下有本次需求的头脑风暴结论文件（`.md`）
- 结论中包含：**核心场景**、**用户角色**、**主要操作路径**

若前置缺失，先执行 `flow-spec:requirement-brainstorming`。

## 输入 → 输出 contract


| 输入          | 来源                                                            |
| ----------- | ------------------------------------------------------------- |
| 头脑风暴结论      | `changes/<CHANGE-ID>/brainstorm/<需求名>.md`                                    |
| 原型通用规范      | `references/templates/prototype-guidelines.md`                |
| 原型模板        | `references/templates/prototype-spec.md`                      |
| 前端样式规范（可替换） | 默认 `references/templates/frontend-style-guide.md` ⭐ **实现层必读** |



| 输出         | 路径                                     |
| ---------- | -------------------------------------- |
| 静态 HTML 原型 | `changes/<CHANGE-ID>/prototypes/<需求名>/index.html`     |
| 原型标注说明     | `changes/<CHANGE-ID>/prototypes/<需求名>/annotations.md` |


## 执行步骤

### Step 1 — 读规范（禁止跳过）

**顺序**：先通用、后样式，避免未读分层就写死错误假设。

1. `references/templates/prototype-guidelines.md` — 文档分层、技术基线、页面类型、标注与数据、检查点、迁移方式
2. `references/templates/prototype-spec.md` — 页面清单表、annotations 模板、HTML 逻辑块、自检清单
3. **当前项目的**《前端样式规范》（本仓库默认 `references/templates/frontend-style-guide.md`）— 所有视觉与组件实现**仅此文件**为权威；若项目另有路径，以 contract 表为准

核心约束速览（细节以三份文件为准）：

- 交付：单 HTML + `annotations.md`；依赖与内联规则以**样式规范**为准，且不得低于通用规范中的技术基线  
- 页面类型：列表 / 表单 / 详情 / 审批流 / 报表  
- 模拟数据：多状态列表、表单预填、图表占位有说明  
- 标注：`data-annotation`（除非样式规范改名）+ `annotations.md` 表格

### Step 2 — 识别页面结构

从头脑风暴结论中提取：

1. 需要哪些页面（按页面类型分类）
2. 每个页面的核心字段和操作
3. 页面间的跳转关系

按 `prototype-spec.md` 中的**页面清单模板**输出，等待确认：

```markdown
## 页面清单
| 页面 key | 页面名称 | 类型 | 核心内容 | 上游入口 |
...
```

**⛔ CHECKPOINT 1：等待人工确认页面清单后，再生成原型。**

### Step 3 — 生成静态原型

按确认的页面清单生成 `changes/<CHANGE-ID>/prototypes/<需求名>/index.html`，**视觉与交互严格遵循当前项目的《前端样式规范》**；结构、清单与标注格式遵循 `prototype-spec.md` 与 `prototype-guidelines.md`。

- 页面切换、弹窗等 API 名称以样式规范为准（本仓库默认 `showPage` / `showModal` / `closeModal`）  
- 颜色与布局不得超出样式规范允许范围

同步生成 `annotations.md`，表格列与 `prototype-spec.md` 一致。

### Step 4 — 人工样式审查

```
原型已生成：changes/<CHANGE-ID>/prototypes/<需求名>/index.html
请在浏览器打开检查，确认后输入「原型确认」继续。
```

**⛔ CHECKPOINT 2：收到「原型确认」后，才继续执行 feature-list 技能。**

## 避坑


| 情况                | 处理             |
| ----------------- | -------------- |
| 头脑风暴结论模糊          | 停下澄清后再生成       |
| 页面超过 5 个          | 分批确认           |
| 用户跳过 CHECKPOINT   | 说明返工风险，建议不跳过   |
| 颜色/布局与《前端样式规范》不一致 | 违规，按样式规范修正     |
| 引用了样式规范禁止的外部资源    | 违规，改为内联或规范允许方式 |
| 列表数据单一状态、表单全空     | 违规，按通用规范修正     |


