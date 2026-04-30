---

## name: flow-spec-routing
description: 编排 flow-spec 文档交付：将用户表述映射到具体技能与路线 A～D；当用户提到头脑风暴、任务计划、原型、功能清单、需求文档、流程图、技术说明文档或需要端到端写文档时使用
validation_status: experimental

# Flow-Spec 主编排

## 快速执行

1. 阅读 `references/index.md`。
2. 将用户表述与下表对照，**加载（invoke）**对应技能。
3. 在 `workflows/default.md` 中选择路线 **A / B / C / D**。
4. 按 `references/rules/constraints.md` 与 `references/rules/storage.md` 做校验。
5. 不通过则修正后重试。

## 路线说明

| 路线      | 阶段（概念）                                                                                         |
| ------- | ---------------------------------------------------------------------------------------------- |
| A 新增文档包  | 头脑风暴 → 任务清单（模板）→ 原型 → 功能点清单 → PRD（按需泳道图）→ 可选技术说明文档 |
| B 变更    | 头脑风暴（可选）→ 任务清单 → 影响分析 → 修订需求/流程图/技术说明 → 一致性检查 |
| C 单文档   | 任务清单 → 定位与变更说明 → 修订单类文档或单图 → 一致性检查 |
| D 缺陷与异常 | 本包无专用技能：按项目流程处理；可补文档 |


## 触发词 → 技能

### 文档与流程

| 用户可能说                       | 技能                                              |
| --------------------------- | ----------------------------------------------- |
| 头脑风暴、澄清需求、拆场景               | `requirement-brainstorming`                     |
| 任务计划、排期清单                   | 使用 `references/templates/task-plan.md`（在已有上下文后） |
| 原型、静态页面演示                   | `prototype-design`                            |
| 功能点、CSV 清单                   | `feature-list`                                |
| 写 PRD、需求文档、功能规格             | `requirement-doc-writing`                       |
| PRD 泳道图、跨职能流程、draw.io 业务流程图 | `swimlane-diagram`                              |
| 技术方案、接口说明、架构说明（文档）        | `technical-doc-writing`                         |
| 报价单、商务说明、方案报价                 | `quotation-doc-writing`                          |


**优先级：** 明确意图 > 当前路线阶段 > 默认路线 A。

## 强制原则

- 先约束与留痕，再改正文；推断须标注。  
- 技术说明文档不得超出已确认需求或规格范围。  
- 单次会话尽量单一目标。

## 产出目录

默认输出根目录：`flow-spec/temp/`（可改）。子目录见 `references/rules/storage.md`。

## OpenSpec（可选）

若**业务仓库**（非本 flow-spec 包）启用 OpenSpec：变更与需求编号绑定；在 `openspec/changes/<变更ID>/` 留痕；里程碑执行校验与归档命令遵循该仓库约定。
