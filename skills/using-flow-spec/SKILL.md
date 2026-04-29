---

## name: using-flow-spec
description: 任意可能涉及 flow-spec 文档交付的会话开始时使用——约定如何发现、调用与组合技能；行动前须查阅 workflows/default.md 并先加载相关技能

若任务与任意 flow-spec 技能可能相关（哪怕只有粗略匹配），须通过当前平台的「技能」机制加载该技能并遵循。**流程类技能**（头脑风暴、编排、具体文档技能）优先于泛泛的自由撰写。

技能 frontmatter 中 `validation_status: production` 表示已在真实项目验证；`experimental` 表示可用但尚未充分验证——仍须按技能执行，不确定时向用户说明。


## 如何加载技能

在支持 **Skill 工具** 的环境中：按技能名加载（例如 `flow-spec:requirement-doc-writing`）。加载后**以正文为准**。优先用技能加载，避免用 Read 重复打开同一路径敷衍执行。

**路径约定：** 本包内 `references/` 均相对于仓库中的 `**flow-spec/`** 目录。

## 规则

1. **进入实质工作前：** 阅读 `references/index.md`；全链路时再读 `workflows/default.md`。
2. **先加载适用技能**，再动手。
3. **单点与流水线：** 用户只要某一类产出时，只加载对应技能（例如仅 PRD 则 `requirement-doc-writing`），除非用户明确要求端到端。
4. **完整流水线：** 按 `workflows/default.md` 中的路线与顺序；遵守 `references/rules/constraints.md`、`references/rules/storage.md`。
5. **OpenSpec（可选）：** 若业务仓库使用 OpenSpec，变更与校验方式遵循该仓库约定。

## 多技能可能同时适用时的优先级（文档）

1. **澄清与设计：** `requirement-brainstorming`
2. **原型设计：** `prototype-design`（brainstorming 结论 → 静态 HTML 原型，含人工确认检查点）
3. **功能点清单：** `feature-list`（原型确认后 → PRD 前的结构化清单）
4. **需求文档：** `requirement-doc-writing`（本包中唯一标记为 production 的技能，正文以该 SKILL 为准）
5. **PRD 泳道图（draw.io）：** `swimlane-diagram`（第二章跨职能流程；编写 PRD 第二章时与 `requirement-doc-writing` 联用或单独加载）
6. **技术说明文档（可选）：** `technical-doc-writing`（在需求范围已冻结或用户明确要求时）

## 路线入口

- 文档路线完整链路：见 `workflows/write-doc.md`

## 禁止偷懒


| 想法             | 实际情况                            |
| -------------- | ------------------------------- |
| 「我按自己习惯写需求/设计」 | 应使用对应技能，其中含结构与检查点。              |
| 「这次很简单」        | 仍须满足约束与产出路径约定。                  |
| 「模板稍后再看」       | 须先按已加载技能读取其要求的 `references` 文件。 |


## 相关文件

- `workflows/default.md` — 路线与建议顺序  
- `skills/flow-spec-routing/SKILL.md` — 触发词与主编排

