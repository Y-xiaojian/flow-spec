# Flow-Spec 默认工作流（文档型）

本仓库技能包**仅覆盖文档交付**：头脑风暴、原型、功能清单、PRD、流程图、技术说明类文档等；不包含编码、TDD 或开发执行计划。

## CLI 入口（推荐）

| 命令 | 路线 | 说明 |
|------|------|------|
| `write-doc` | 文档写作路线 | 见 `workflows/write-doc.md` |

## 何时走完整链路

用户明确要从「想法」做到「可归档需求/流程文档包」时，按 **路线 A** 顺序加载技能；产物路径见 **`references/rules/storage.md`**（**`changes/<CHANGE-ID>/<小类>/`**；CHANGE-ID 见 **`.active-change`**）。

## 路线 A（新增文档包）— 建议顺序

| 顺序 | 阶段 | 技能或模板 |
|------|------|------------|
| 1 | 头脑风暴与方案 | `requirement-brainstorming` → `changes/<CHANGE-ID>/brainstorm/` |
| 2 | 原型设计 | `prototype-design` → `changes/<CHANGE-ID>/prototypes/`（⛔ 人工确认原型样式） |
| 3 | 功能点清单 | `feature-list` → `changes/<CHANGE-ID>/requirements/*-feature-list.csv`（⛔ 人工确认功能点） |
| 4 | 需求规格（PRD） | `requirement-doc-writing` → `changes/<CHANGE-ID>/requirements/*-prd.md`；泳道图按需 `swimlane-diagram` → `changes/<CHANGE-ID>/diagrams/*-process.drawio` |
| 5 | 技术说明（可选） | 需要单独技术说明文档时：`technical-doc-writing` → `changes/<CHANGE-ID>/technical/` |

## 路线 B（变更）

任务清单或简短澄清后做**影响分析**；用 `requirement-doc-writing` / `technical-doc-writing` / `swimlane-diagram` 对**已有文档与图表**做增量修订；一致性检查（追溯号、交叉引用、`storage.md` 路径）。

## 路线 C（单文档）

缩小范围：可选简短 `requirement-brainstorming` → 任务清单 → 只改一类文档或单张流程图 → 一致性检查。

## 路线 D（缺陷与疑难）

本包无专用排障技能：按项目既有流程处理；必要时补文档或修订 PRD/流程图。

## 单独使用某一技能

用户只要其中一环时，**只加载该技能**，不必从头脑风暴强行开始。前置条件见各 `SKILL.md` 正文。

## 扩展位

将来若增加报价单等商务文档：在 `skills/` 增加对应技能、在 `references/templates/` 增加模板，并将产出目录约定写入 `references/rules/storage.md`（如 `changes/<CHANGE-ID>/commercial/`）。
