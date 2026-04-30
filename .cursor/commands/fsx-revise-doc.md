---
description: fsx-revise-doc — 增量修订与一致性检查
disable-model-invocation: true
---

请按以下步骤执行：

1. 阅读 `skills/using-flow-spec/SKILL.md` 与 `references/rules/constraints.md`
2. 调用 `flow-spec:flow-spec-routing`，按用户意图选择路线 **B（变更）** 或 **C（单文档）**。
3. 按需加载 `flow-spec:requirement-doc-writing`、`flow-spec:technical-doc-writing` 或 `flow-spec:swimlane-diagram` 做增量修订。
4. 校验追溯号、交叉引用；产出路径见 **`references/rules/storage.md`**（**`changes/<CHANGE-ID>/…`** 与 **`specs/…`**）。

**路径映射：** `temp/<类别>/` → **`temp/changes/<CHANGE-ID>/<类别>/`**；**CHANGE-ID** 读 **`temp/.active-change`**。