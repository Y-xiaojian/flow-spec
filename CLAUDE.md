# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## 项目概述 (Project Overview)

Flow-Spec 是一套**与业务领域解耦的文档交付工作流**技能包：头脑风暴 → 原型与功能清单 → 需求文档（PRD）→ 流程图（draw.io 泳道等）→ 可选技术说明文档。技能以 Superpowers 开源库为蓝本，部分已翻译改写为中文。

本仓库**不包含**编码、TDD、开发实现计划或代码仓库图谱类技能。

## 核心架构

### 技能系统 (`skills/`)

每个技能是一个目录，包含 `SKILL.md`。技能引用 `references/` 中的模板和规则，以及 `scripts/` 中的辅助脚本。

| 技能 | 用途 | 状态 |
|------|------|------|
| `using-flow-spec` | 总章程：如何发现、调用与组合技能 | 入口点 |
| `flow-spec-routing` | 主编排：触发词 → 路线 A～D | 入口点 |
| `requirement-brainstorming` | 文档前的协作设计与头脑风暴 | 常用 |
| `prototype-design` | 静态 HTML 原型 | write-doc 链路 |
| `feature-list` | CSV 功能清单 | write-doc 链路 |
| `requirement-doc-writing` | PRD 需求文档 | 已实战验证 |
| `swimlane-diagram` | PRD 第二章泳道（draw.io） | 与 PRD 联用 |
| `technical-doc-writing` | 技术说明/设计类文档（纯文档） | |

### 工作流路线 (`workflows/default.md`)

- **路线 A（新增文档包）**：头脑风暴 → 任务清单 → 原型 → 功能清单 → PRD（按需泳道图）→ 可选技术说明文档
- **路线 B（变更）**：影响分析 + 增量修订需求/流程图/技术说明
- **路线 C（单文档）**：修订单类文档或单图并做一致性检查
- **路线 D（缺陷）**：按项目既有流程处理（本包无内置技能）

## 如何开始

在本仓库工作时，**首先加载** `skills/using-flow-spec/SKILL.md`。

完整流水线工作时，还需阅读 `workflows/default.md` 和 `skills/flow-spec-routing/SKILL.md` 以确定适用路线。

## 产出约定

**产出目录**以 **`references/rules/storage.md`** 为准：npm 为 **`flowspec/`**，嵌入为 **`<嵌入根>/temp/`**；其下 **`specs/<小类>/`**（基线）、**`changes/<CHANGE-ID>/<小类>/`**（进行中）、**`logs/`** 会话日志；**CHANGE-ID** 见 **`.active-change`**。

**命名格式**：`<业务ID>_<文档类型>_v<版本>_<YYYYMMDD>.md`

**会话日志格式**：`{产出根}/logs/session-YYYYMMDD.md`，每行可含：`<时间> <触发词> | <路线> | <模板> | <CHANGE-ID> | <输出路径> | <校验结果>`

## 核心约束

1. 技术说明文档不得超出已确认需求或规格范围
2. 推断内容必须标注 `inferred`
3. 每次执行应记录输入、输出、路径与结果
4. 需求追溯：使用 `FT-xxx` 格式（或项目约定前缀）
5. 每条路线应产出头脑风暴或等效留痕，以及任务清单（若该路线要求）

## 辅助脚本 (`scripts/`)

- `fill_template.py` - 模板填充
- `run_task.py` - 任务执行（若保留，仅用于与本包脚本/约定一致的任务）
- `validate_doc.py` - 文档校验
- `sync_index.py` - 索引同步

## Claude Code 集成

当 Claude Code 配置使用本项目时：

- 在 `.cursor/rules/` 或 `AGENTS.md` 中设置：会话开始时阅读 `flow-spec/skills/using-flow-spec/SKILL.md`
- 技能根目录：`<项目根>/flow-spec/skills/`
- 通过 Skill 工具调用技能（如 `flow-spec:requirement-doc-writing`）

## 快捷命令（若环境支持 `commands/`）

| 文件 | 技能 |
|------|------|
| `commands/brainstorm.md` | `flow-spec:requirement-brainstorming` |
| `commands/write-requirement.md` | `flow-spec:requirement-doc-writing` |
| `commands/write-doc.md` | 文档链路（见 `workflows/write-doc.md`） |
| `commands/route-delivery.md` | `flow-spec:flow-spec-routing` |
