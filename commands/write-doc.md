---
description: 启动文档写作完整流水线：头脑风暴 → 原型设计 → 功能点清单 → 需求文档，对应技能链 write-doc
disable-model-invocation: true
---

请按以下步骤执行：

1. 阅读并遵循 `flow-spec/skills/using-flow-spec/SKILL.md`
2. 阅读 `flow-spec/workflows/write-doc.md` 了解完整状态机路线
3. 从 Stage 1 开始执行：加载 `flow-spec:requirement-brainstorming` 技能，开始头脑风暴

**注意：** 每个阶段的 CHECKPOINT 必须等待人工确认，不得自动跳过。  
编写 PRD 第二章业务流程图时加载 **`flow-spec:diagram-skill`**（与 `requirement-doc-writing` 配合）；`.drawio` 落在 **`changes/<CHANGE-ID>/diagrams/`**（相对 **`{产出根}`**，见 **`references/rules/storage.md`**）。
